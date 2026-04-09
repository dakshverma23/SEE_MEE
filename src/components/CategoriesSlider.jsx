import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './CategoriesSlider.css'

const categories = [
  {
    id: 1,
    title: 'Anarkali Suits',
    slug: 'anarkali',
    subtitle: 'Timeless Elegance',
    description: 'Experience the grace of flowing silhouettes with our exquisite Anarkali collection. Perfect for weddings, festivals, and special occasions, these suits blend traditional craftsmanship with contemporary designs.',
    features: ['Flowing Silhouette', 'Intricate Embroidery', 'Premium Fabrics'],
    image: 'categories_anarkali.jpg'
  },
  {
    id: 2,
    title: 'Palazzo Suits',
    slug: 'palazzo',
    subtitle: 'Contemporary Comfort',
    description: 'Discover the perfect fusion of style and comfort with our Palazzo suits. Featuring wide-leg pants and elegant kurtas, these outfits are ideal for both casual gatherings and formal events.',
    features: ['Wide-Leg Comfort', 'Versatile Styling', 'Modern Appeal'],
    image: 'categories_plazzo.jpg'
  },
  {
    id: 3,
    title: 'Straight Cut Suits',
    slug: 'straight-cut',
    subtitle: 'Classic Sophistication',
    description: 'Embrace timeless elegance with our Straight Cut collection. These suits offer a sleek, sophisticated look that works beautifully for office wear, parties, and everyday occasions.',
    features: ['Sleek Design', 'Easy to Wear', 'Versatile Choice'],
    image: 'categories_straight.jpg'
  },
  {
    id: 4,
    title: 'Sharara Suits',
    slug: 'sharara',
    subtitle: 'Regal Grandeur',
    description: 'Make a statement with our stunning Sharara suits. Featuring flared pants and ornate detailing, these outfits bring royal elegance to weddings, celebrations, and festive occasions.',
    features: ['Flared Elegance', 'Rich Embellishments', 'Festive Appeal'],
    image: 'categories_sharara.jpg'
  }
]

const CategoriesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length)
    }, 4000) // Change every 4 seconds (slower)

    return () => clearInterval(interval)
  }, [])

  const activeCategory = categories[activeIndex]

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length)
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }

  const handleViewCollection = (slug) => {
    navigate(`/category/${slug}`)
  }

  return (
    <section className="categories-slider" id="categories">
      <div className="categories-slider-container">
        <div className="slider-header">
          <span className="slider-subtitle">Explore Our</span>
          <h2 className="slider-title">Categories</h2>
        </div>

        <div className="slider-content">
          {/* Previous Arrow */}
          <button className="slider-arrow slider-arrow-prev" onClick={goToPrev} aria-label="Previous category">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              className="slider-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="slider-image-wrapper">
                <img 
                  src={`/images/${activeCategory.image}`} 
                  alt={activeCategory.title}
                />
              </div>

              <div className="slider-info">
                <span className="slider-subtitle-text">{activeCategory.subtitle}</span>
                <h3>{activeCategory.title}</h3>
                <p>{activeCategory.description}</p>
                
                <div className="category-features">
                  {activeCategory.features.map((feature, idx) => (
                    <div key={idx} className="feature-tag">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="view-collection-btn"
                  onClick={() => handleViewCollection(activeCategory.slug)}
                >
                  View Collection
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Arrow */}
          <button className="slider-arrow slider-arrow-next" onClick={goToNext} aria-label="Next category">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Progress Indicators - Outside slider-content */}
        <div className="slider-indicators">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSlider
