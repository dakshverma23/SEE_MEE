import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './ProductsManager.css'

const ProductsManager = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'anarkali',
    price: '',
    stock: '',
    sizes: [],
    colors: [],
    featured: false,
    images: [],
    video: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleImageUpload = async (files) => {
    if (files.length === 0 || files.length > 10) {
      alert('Please select 1-10 images')
      return
    }

    setUploading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const formData = new FormData()
      
      Array.from(files).forEach(file => {
        formData.append('images', file)
      })

      const response = await fetch('http://localhost:5000/api/upload/images', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: data.data.map(img => img.url || img.path)
        }))
      }
    } catch (error) {
      alert('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoUpload = async (file) => {
    if (!file) return

    setUploading(true)
    try {
      const token = localStorage.getItem('adminToken')
      const formDataVideo = new FormData()
      formDataVideo.append('video', file)

      const response = await fetch('http://localhost:5000/api/upload/video', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataVideo
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, video: data.data.url || data.data.path }))
      }
    } catch (error) {
      alert('Failed to upload video')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('adminToken')
      const url = editingProduct 
        ? `http://localhost:5000/api/products/${editingProduct._id}`
        : 'http://localhost:5000/api/products'
      
      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        })
      })

      const data = await response.json()
      if (data.success) {
        fetchProducts()
        resetForm()
        alert(editingProduct ? 'Product updated!' : 'Product created!')
      }
    } catch (error) {
      alert('Failed to save product')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()
      if (data.success) {
        fetchProducts()
        alert('Product deleted!')
      }
    } catch (error) {
      alert('Failed to delete product')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'anarkali',
      price: '',
      stock: '',
      sizes: [],
      colors: [],
      featured: false,
      images: [],
      video: ''
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const startEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      sizes: product.sizes || [],
      colors: product.colors || [],
      featured: product.featured,
      images: product.images,
      video: product.video || ''
    })
    setEditingProduct(product)
    setShowForm(true)
  }

  return (
    <div className="products-manager">
      <div className="manager-header">
        <div>
          <h1>Products Management</h1>
          <p>Manage your product inventory and stock</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <motion.div 
          className="product-form-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="anarkali">Anarkali</option>
                  <option value="palazzo">Palazzo</option>
                  <option value="straight-cut">Straight Cut</option>
                  <option value="sharara">Sharara</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Images (Max 10) *</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                disabled={uploading}
              />
              {formData.images.length > 0 && (
                <div className="uploaded-images">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="thumb">
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Video (Optional)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(e.target.files[0])}
                disabled={uploading}
              />
              {formData.video && <span className="file-name">Video uploaded</span>}
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                />
                Featured Product
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={uploading}>
                {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="products-list">
        <h2>All Products ({products.length})</h2>
        <div className="products-grid">
          {products.map((product) => (
            <motion.div 
              key={product._id}
              className="product-card"
              whileHover={{ y: -5 }}
            >
              <div className="product-image">
                {product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                {product.featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <div className="product-meta">
                  <span className="price">₹{product.price}</span>
                  <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="product-actions">
                  <button onClick={() => startEdit(product)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsManager
