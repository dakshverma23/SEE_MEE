import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './NewArrivals.css'

const NewArrivals = () => {
  const [arrivals, setArrivals] = useState([
    {
      id: 1,
      category: 'anarkali',
      imagePath: '/images/ANARKALI.png',
      alt: 'Anarkali Suit',
      fallbackText: 'Anarkali'
    },
    {
      id: 2,
      category: 'palazzo',
      imagePath: '/images/Plazzo_suit.jpg',
      alt: 'Palazzo Suit',
      fallbackText: 'Palazzo'
    },
    {
      id: 3,
      category: 'straight-cut',
      imagePath: '/images/Straightcut.jpg',
      alt: 'Straight Cut Suit',
      fallbackText: 'Straight Cut'
    }
  ])
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    fetchArrivals()
  }, [])

  const fetchArrivals = async () => {
    try {
      const response = await fetch('/api/new-arrivals')
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        const updatedArrivals = arrivals.map(arrival => {
          const dbArrival = data.data.find(item => item.category === arrival.category)
          if (dbArrival && dbArrival.image) {
            return {
              ...arrival,
              imagePath: dbArrival.image
            }
          }
          return arrival
        })
        setArrivals(updatedArrivals)
      }
    } catch (error) {
      console.error('Error fetching arrivals:', error)
    }
  }

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const handleCategoryClick = (category) => {
    const element = document.getElementById('categories')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="new-arrivals" id="new-arrivals">
      <div className="new-arrivals-container">
        <motion.div 
          className="arrivals-banner"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative Border Frame */}
          <div className="banner-frame">
            <div className="frame-corner top-left"></div>
            <div className="frame-corner top-right"></div>
            <div className="frame-corner bottom-left"></div>
            <div className="frame-corner bottom-right"></div>
            
            {/* Floral Decorations */}
            <div className="floral-decoration left-top"></div>
            <div className="floral-decoration right-top"></div>
            <div className="floral-decoration left-bottom"></div>
            <div className="floral-decoration right-bottom"></div>
          </div>

          {/* Content Area */}
          <div className="banner-content">
            {/* Left Side - Images */}
            <div className="arrivals-images">
              {arrivals.map((arrival, index) => (
                <motion.div
                  key={arrival.id}
                  className="arrival-image-wrapper"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => handleCategoryClick(arrival.category)}
                >
                  <div className="arrival-image-placeholder">
                    {!imageErrors[arrival.id] ? (
                      <img 
                        src={arrival.imagePath} 
                        alt={arrival.alt}
                        onError={() => handleImageError(arrival.id)}
                      />
                    ) : (
                      <div className="image-upload-hint">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span>{arrival.fallbackText}</span>
                        <span className="upload-instruction">Upload Image</span>
                      </div>
                    )}
                  </div>
                  <div className="arrival-overlay">
                    <span>View {arrival.alt}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Text & CTA */}
            <motion.div 
              className="arrivals-text"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-content">
                <h2 className="arrivals-title">NEW ARRIVALS</h2>
                <motion.button 
                  className="shop-arrivals-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick('all')}
                >
                  Shop New Arrivals Now
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="decorative-leaves">
            <div className="leaf leaf-1"></div>
            <div className="leaf leaf-2"></div>
            <div className="leaf leaf-3"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewArrivals
