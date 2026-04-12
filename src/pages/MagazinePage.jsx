import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getOptimizedImageUrl } from '../utils/imageHelper'
import './MagazinePage.css'

const MagazinePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/magazine')
      const data = await response.json()
      if (data.success && data.data.length > 0) {
        setStories(data.data)
      }
    } catch (error) {
      console.error('Error fetching magazine stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (stories.length === 0) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 7000)

    return () => clearInterval(interval)
  }, [stories.length, currentIndex])

  if (loading) {
    return (
      <div className="magazine-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading Magazine...</p>
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="magazine-page-empty">
        <h2>No Stories Available</h2>
        <p>Check back soon for our latest stories and culture insights.</p>
      </div>
    )
  }

  const currentStory = stories[currentIndex]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="magazine-page">
      {/* Header */}
      <motion.div 
        className="magazine-page-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="magazine-page-title">Magazine</h1>
        <p className="magazine-page-subtitle">Discover Our Culture, Heritage & Stories</p>
      </motion.div>

      {/* Slideshow Container */}
      <div className="magazine-slideshow">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="magazine-slide"
          >
            {/* Background Image */}
            <div className="magazine-slide-bg">
              <img 
                src={getOptimizedImageUrl(currentStory.image, 'hero')} 
                alt={currentStory.title}
              />
              <div className="magazine-slide-overlay"></div>
            </div>

            {/* Content */}
            <div className="magazine-slide-content">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="magazine-content-wrapper"
              >
                <span className="magazine-slide-number">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
                </span>
                <h2 className="magazine-slide-title">{currentStory.title}</h2>
                <p className="magazine-slide-description">{currentStory.description}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          className="magazine-nav-btn magazine-nav-prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          className="magazine-nav-btn magazine-nav-next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="magazine-indicators">
          {stories.map((_, index) => (
            <button
              key={index}
              className={`magazine-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="indicator-line"></span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Grid Preview */}
      <div className="magazine-grid">
        <h3 className="magazine-grid-title">All Stories</h3>
        <div className="magazine-grid-items">
          {stories.map((story, index) => (
            <motion.div
              key={story._id}
              className={`magazine-grid-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="grid-item-image">
                <img src={getOptimizedImageUrl(story.image, 'thumbnail')} alt={story.title} />
                <div className="grid-item-overlay">
                  <span className="grid-item-number">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <h4 className="grid-item-title">{story.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MagazinePage
