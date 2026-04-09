import React from 'react'
import './Categories.css'

const fabrics = [
  {
    id: 1,
    title: 'Premium Silk',
    description: 'Luxurious silk fabrics with natural sheen and smooth texture. Perfect for elegant ethnic wear that drapes beautifully and adds sophistication.',
    image: 'silk.jpg'
  },
  {
    id: 2,
    title: 'Pure Cotton',
    description: 'Soft, breathable cotton fabrics ideal for everyday comfort. Lightweight and perfect for all-season wear with easy maintenance.',
    image: 'cotton.jpg'
  },
  {
    id: 3,
    title: 'Georgette',
    description: 'Lightweight and flowing georgette fabrics with slightly crinkled texture. Ideal for creating graceful silhouettes and elegant drapes.',
    image: 'georgette.jpg'
  },
  {
    id: 4,
    title: 'Velvet',
    description: 'Rich and luxurious velvet fabrics with soft pile. Perfect for festive and special occasion wear with premium quality finish.',
    image: 'velvet.jpg'
  }
]

const Fabrics = () => {
  return (
    <section className="fabrics-section" id="fabrics">
      <div className="fabrics-container">
        <div className="fabrics-header">
          <h2 className="fabrics-title">FABRICS</h2>
        </div>

        <div className="fabrics-grid">
          {fabrics.map((fabric, index) => (
            <div 
              key={fabric.id} 
              className={`fabric-item ${index % 2 === 0 ? 'left-align' : 'right-align'}`}
            >
              <div className="fabric-circle">
                <img src={`/images/${fabric.image}`} alt={fabric.title} />
              </div>
              <div className="fabric-info-box">
                <h3>{fabric.title.toUpperCase()}</h3>
                <p>{fabric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Fabrics
