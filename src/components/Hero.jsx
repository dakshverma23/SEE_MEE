import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const thumbnails = [
    { img: 'categories_anarkali.jpg', category: 'Anarkali', desc: 'Elegant Flowing Silhouettes' },
    { img: 'ANARKALI.png', category: 'Anarkali', desc: 'Traditional Grace' },
    { img: 'categories_plazzo.jpg', category: 'Palazzo', desc: 'Contemporary Comfort' },
    { img: 'download (1).jpg', category: 'Straight Cut', desc: 'Classic Sophistication' },
    { img: 'download (2).jpg', category: 'Sharara', desc: 'Festive Glamour' }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const menuItems = [
    { label: 'FABRICS', target: 'fabrics' },
    { label: 'CATEGORIES', target: 'categories' },
    { label: 'NEW ARRIVALS', target: 'new-arrivals' },
    { label: 'COLLECTIONS', target: 'featured-collection' },
    { label: 'MAGAZINE', target: 'magazine' },
    { label: 'ABOUT', target: 'about' }
  ]

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Get position for each image relative to center
  const getImagePosition = (index) => {
    const diff = index - activeIndex
    if (diff > 2) return diff - thumbnails.length
    if (diff < -2) return diff + thumbnails.length
    return diff
  }

  // Auto-slideshow every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % thumbnails.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [thumbnails.length])

  return (
    <section className="hero-jewelry" id="home">
      {/* Large Text - Left: SEE */}
      <div className="hero-text-left">SEE</div>

      {/* Large Text - Right: MEE */}
      <div className="hero-text-right">MEE</div>

      {/* Top Left - Small Circular Thumbnails */}
      <div className="hero-thumbnails">
        {thumbnails.map((item, idx) => (
          <div 
            key={idx} 
            className={`hero-thumb ${activeIndex === idx ? 'active' : ''}`}
            style={{ left: `${idx * 35}px` }}
            onClick={() => setActiveIndex(idx)}
          >
            <img src={`/images/${item.img}`} alt="" />
          </div>
        ))}
      </div>

      {/* Center - 5 Arch Carousel with Flowing Animation */}
      <div className="hero-carousel">
        {thumbnails.map((item, idx) => {
          const position = getImagePosition(idx)
          
          // Calculate position to maintain equal visual gaps between image edges
          // Center image is 380px wide, side images scale down
          const baseGap = 24 // Gap between image edges (reduced from 50)
          const centerWidth = 380
          const sideWidth = centerWidth * 0.72 // 285px
          const outerWidth = centerWidth * 0.52 // 209px
          
          const getGap = (pos) => {
            if (pos === 0) return 0
            if (pos === 1) return (centerWidth / 2) + baseGap + (sideWidth / 2)
            if (pos === -1) return -((centerWidth / 2) + baseGap + (sideWidth / 2))
            if (pos === 2) return (centerWidth / 2) + baseGap + sideWidth + baseGap + (outerWidth / 2)
            if (pos === -2) return -((centerWidth / 2) + baseGap + sideWidth + baseGap + (outerWidth / 2))
            return 0
          }
          
          return (
            <motion.div 
              key={idx}
              className={`carousel-arch position-${position}`}
              animate={{
                x: getGap(position),
                scale: position === 0 ? 1 : position === -1 || position === 1 ? 0.75 : 0.55,
                zIndex: position === 0 ? 5 : position === -1 || position === 1 ? 4 : 3,
                opacity: Math.abs(position) > 2 ? 0 : 1
              }}
              transition={{
                duration: 1.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={() => position !== 0 && setActiveIndex(idx)}
            >
              <div className="carousel-image-container">
                <motion.img 
                  src={`/images/${item.img}`} 
                  alt="Featured"
                  animate={{ scale: [1, 1.01] }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              <motion.div 
                className="carousel-label"
                animate={{
                  opacity: position === 0 ? 1 : 0.7
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="label-category">{item.category}</span>
                <span className="label-desc">{item.desc}</span>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Right Menu */}
      <div className="hero-menu">
        {menuItems.map((item, idx) => (
          <button 
            key={idx} 
            className="hero-menu-item"
            onClick={() => scrollToSection(item.target)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default Hero
