import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Magazine.css'

const Magazine = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const magazineStories = [
    {
      image: '/images/MAGAZINE1.jpg',
      title: 'Timeless Elegance',
      description: 'Crafted with passion, designed for grace. Every stitch tells a story of tradition and artistry.'
    },
    {
      image: '/images/MAGAZINE2.jpg',
      title: 'Heritage Redefined',
      description: 'Where ancient craftsmanship meets contemporary style, creating pieces that transcend time.'
    },
    {
      image: '/images/MAGAZINE3.jpg',
      title: 'Artisan Excellence',
      description: 'Hand-picked fabrics, intricate embroidery, and attention to detail that defines luxury.'
    },
    {
      image: '/images/MAGAZINE4.jpg',
      title: 'Your Story, Our Creation',
      description: 'Each piece is a celebration of individuality, designed to make you feel extraordinary.'
    }
  ]

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
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
              className="magazine-slide-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="magazine-image-container">
                <img
                  src={magazineStories[currentIndex].image}
                  alt={magazineStories[currentIndex].title}
                  className="magazine-img"
                />
                <div className="magazine-gradient-overlay" />
                
                {/* Story Text Overlay */}
                <motion.div 
                  className="magazine-story-overlay"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <motion.h3 
                    className="story-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {magazineStories[currentIndex].title}
                  </motion.h3>
                  <motion.p 
                    className="story-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {magazineStories[currentIndex].description}
                  </motion.p>
                </motion.div>
              </div>
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
