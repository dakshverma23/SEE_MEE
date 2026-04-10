import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getImageUrl } from '../utils/imageHelper'
import './Magazine.css'

const Magazine = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [magazineStories, setMagazineStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMagazineStories()
  }, [])

  const fetchMagazineStories = async () => {
    try {
      const response = await fetch('/api/magazine')
      const data = await response.json()
      if (data.success && data.data.length > 0) {
        setMagazineStories(data.data)
      } else {
        // Fallback to default stories if no data
        setMagazineStories([
          {
            image: '/images/MAGAZINE1.jpg',
            title: 'Timeless Elegance',
            description: 'Crafted with passion, designed for grace. Every stitch tells a story of tradition and artistry.',
            order: 0
          },
          {
            image: '/images/MAGAZINE2.jpg',
            title: 'Heritage Redefined',
            description: 'Where ancient craftsmanship meets contemporary style, creating pieces that transcend time.',
            order: 1
          },
          {
            image: '/images/MAGAZINE3.jpg',
            title: 'Artisan Excellence',
            description: 'Hand-picked fabrics, intricate embroidery, and attention to detail that defines luxury.',
            order: 2
          },
          {
            image: '/images/MAGAZINE4.jpg',
            title: 'Your Story, Our Creation',
            description: 'Each piece is a celebration of individuality, designed to make you feel extraordinary.',
            order: 3
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching magazine stories:', error)
      // Use fallback stories on error
      setMagazineStories([
        {
          image: '/images/MAGAZINE1.jpg',
          title: 'Timeless Elegance',
          description: 'Crafted with passion, designed for grace. Every stitch tells a story of tradition and artistry.',
          order: 0
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    if (magazineStories.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === magazineStories.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [magazineStories.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <section className="magazine-section" id="magazine">
        <div className="magazine-container">
          <div className="loading-state">Loading magazine...</div>
        </div>
      </section>
    )
  }

  if (magazineStories.length === 0) {
    return null
  }

  const currentStory = magazineStories[currentIndex]
  const isImageLeft = currentStory.order % 2 === 0

  return (
    <section className="magazine-section" id="magazine">
      <div className="magazine-container">
        <motion.div 
          className="magazine-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="magazine-subtitle">Our Story</span>
          <h2 className="magazine-title">Magazine</h2>
          <div className="magazine-underline"></div>
        </motion.div>

        <div className="magazine-slideshow-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={`magazine-slide-wrapper ${isImageLeft ? 'image-left' : 'image-right'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div 
                className="magazine-image-container"
                initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <img
                  src={getImageUrl(currentStory.image)}
                  alt={currentStory.title}
                  className="magazine-img"
                />
                <div className="magazine-gradient-overlay" />
              </motion.div>

              <motion.div 
                className="magazine-story-content"
                initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.h3 
                  className="story-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {currentStory.title}
                </motion.h3>
                <motion.p 
                  className="story-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {currentStory.description}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Pagination */}
          <div className="magazine-dots-pagination">
            {magazineStories.map((_, index) => (
              <motion.button
                key={index}
                className={`magazine-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Magazine
