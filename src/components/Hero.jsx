import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../utils/imageHelper'
import './Hero.css'

const Hero = () => {
  const [thumbnails, setThumbnails] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Default fallback images
  const defaultThumbnails = [
    { img: '/images/coll_1_NBG.png', category: 'Anarkali', desc: 'Timeless Grace' },
    { img: '/images/coll2_NBG.jpg', category: 'Anarkali', desc: 'Contemporary Elegance' },
    { img: '/images/coll3_NBG.png', category: 'Palazzo', desc: 'Contemporary Comfort' },
    { img: '/images/coll4_NBG.png', category: 'Straight Cut', desc: 'Classic Sophistication' },
    { img: '/images/coll5_NBG.png', category: 'Sharara', desc: 'Regal Charm' }
  ]

  useEffect(() => {
    fetchCarouselImages()
  }, [])

  const fetchCarouselImages = async () => {
    try {
      const response = await fetch('/api/carousel')
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        // Transform API data to match component format
        const carouselData = data.data.map(item => ({
          img: item.image,
          category: item.title || 'Featured',
          desc: item.subtitle || 'Elegant Collection'
        }))
        setThumbnails(carouselData)
      } else {
        // Use fallback images
        setThumbnails(defaultThumbnails)
      }
    } catch (error) {
      console.error('Error fetching carousel images:', error)
      // Use fallback images on error
      setThumbnails(defaultThumbnails)
    } finally {
      setLoading(false)
    }
  }

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

  // Auto-slideshow every 5 seconds
  useEffect(() => {
    if (thumbnails.length === 0) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % thumbnails.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [thumbnails.length])

  if (loading) {
    return (
      <section className="hero-jewelry" id="home">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-jewelry" id="home">
      {/* Large Text - Left: SEE */}
      <div className="hero-text-left">SEE</div>

      {/* Large Text - Right: MEE */}
      <div className="hero-text-right">MEE</div>

      {/* Top Left - Small Circular Thumbnails */}
      <div className="hero-thumbnails">
        {thumbnails.map((item, idx) => (
          <button 
            key={idx} 
            className={`hero-thumb ${activeIndex === idx ? 'active' : ''}`}
            style={{ left: `${idx * 35}px` }}
            onClick={() => setActiveIndex(idx)}
            aria-label={`View ${item.category} collection`}
          >
            <img src={getImageUrl(item.img)} alt={item.category} />
          </button>
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
                duration: 2.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              onClick={() => position !== 0 && setActiveIndex(idx)}
            >
              <div className="carousel-image-container">
                <motion.img 
                  src={getImageUrl(item.img)} 
                  alt={`${item.category} - ${item.desc}`}
                  fetchpriority={position === 0 ? "high" : "auto"}
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
