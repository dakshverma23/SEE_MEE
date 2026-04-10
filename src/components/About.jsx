import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)

  return (
    <section className="about ornamental-pattern" id="about" ref={sectionRef}>
      <div className="about-container">
        <motion.div 
          className="about-image"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="image-frame">
            <div className="about-placeholder">
              <img src="/images/about.jpg" alt="About See Mee" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="about-content"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-subtitle">Our Story</span>
          <h2 className="section-title">Crafting Elegance Since Generations</h2>
          
          <p className="about-text">
            We believe in preserving the rich heritage of ethnic fashion while embracing 
            contemporary aesthetics. Each piece in our collection is a testament to the 
            skilled artisans who pour their heart into creating timeless masterpieces.
          </p>

          <p className="about-text">
            From intricate embroidery to luxurious fabrics, every detail is carefully 
            curated to ensure you feel like royalty. Our commitment to quality and 
            authenticity has made us a trusted name in ethnic women's fashion.
          </p>

          <div className="about-features">
            <motion.div 
              className="feature"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Premium Quality</h3>
              <p>Finest fabrics and materials</p>
            </motion.div>

            <motion.div 
              className="feature"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Authentic Designs</h3>
              <p>Traditional craftsmanship</p>
            </motion.div>

            <motion.div 
              className="feature"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3>Made with Love</h3>
              <p>Handcrafted perfection</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
