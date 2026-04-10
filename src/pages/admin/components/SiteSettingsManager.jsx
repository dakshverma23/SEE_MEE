import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './SiteSettingsManager.css'

const SiteSettingsManager = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('logo')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [editingFabric, setEditingFabric] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings')
      const data = await response.json()
      if (data.success) {
        setSettings(data.data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const token = localStorage.getItem('adminToken')
    
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    
    const data = await response.json()
    if (!data.success) throw new Error('Upload failed')
    return data.data.url
  }

  const updateSettings = async (updatedSettings) => {
    const token = localStorage.getItem('adminToken')
    const response = await fetch('/api/site-settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedSettings)
    })
    
    const data = await response.json()
    if (data.success) {
      setSettings(data.data)
      setMessage({ type: 'success', text: 'Settings updated successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }
  }

  const handleLogoUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setMessage({ type: '', text: '' })
    try {
      const url = await uploadImage(file)
      await updateSettings({ ...settings, logo: url })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload logo' })
    } finally {
      setUploading(false)
    }
  }

  const handleAboutImageUpload = async (file) => {
    if (!file) return
    setUploading(true)
    setMessage({ type: '', text: '' })
    try {
      const url = await uploadImage(file)
      await updateSettings({ ...settings, aboutImage: url })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload about image' })
    } finally {
      setUploading(false)
    }
  }

  const handleFabricImageUpload = async (index, file) => {
    if (!file) return
    setUploading(true)
    setMessage({ type: '', text: '' })
    try {
      const url = await uploadImage(file)
      const updatedFabrics = [...settings.fabrics]
      updatedFabrics[index].image = url
      await updateSettings({ ...settings, fabrics: updatedFabrics })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload fabric image' })
    } finally {
      setUploading(false)
    }
  }

  const handleFabricUpdate = async (index, updatedFabric) => {
    const updatedFabrics = [...settings.fabrics]
    updatedFabrics[index] = updatedFabric
    await updateSettings({ ...settings, fabrics: updatedFabrics })
    setEditingFabric(null)
  }

  const handleCategoryImageUpload = async (index, file) => {
    if (!file) return
    setUploading(true)
    setMessage({ type: '', text: '' })
    try {
      const url = await uploadImage(file)
      const updatedCategories = [...settings.categorySlides]
      updatedCategories[index].image = url
      await updateSettings({ ...settings, categorySlides: updatedCategories })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload category image' })
    } finally {
      setUploading(false)
    }
  }

  const handleCategoryUpdate = async (index, updatedCategory) => {
    const updatedCategories = [...settings.categorySlides]
    updatedCategories[index] = updatedCategory
    await updateSettings({ ...settings, categorySlides: updatedCategories })
    setEditingCategory(null)
  }

  if (loading) {
    return <div className="loading-state">Loading settings...</div>
  }

  if (!settings) {
    return <div className="error-state">Failed to load settings</div>
  }

  return (
    <div className="site-settings-manager">
      <div className="manager-header">
        <h1>Site Settings</h1>
        <p>Manage logo, images, and content across your website</p>
      </div>

      {message.text && (
        <motion.div 
          className={`message ${message.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      <div className="settings-tabs">
        <button 
          className={activeTab === 'logo' ? 'active' : ''}
          onClick={() => setActiveTab('logo')}
        >
          Logo
        </button>
        <button 
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => setActiveTab('about')}
        >
          About Section
        </button>
        <button 
          className={activeTab === 'fabrics' ? 'active' : ''}
          onClick={() => setActiveTab('fabrics')}
        >
          Fabrics ({settings.fabrics.length})
        </button>
        <button 
          className={activeTab === 'categories' ? 'active' : ''}
          onClick={() => setActiveTab('categories')}
        >
          Category Slides ({settings.categorySlides.length})
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'logo' && (
          <div className="logo-section">
            <h2>Website Logo</h2>
            <p>This logo appears in the navbar and auth page</p>
            
            <div className="image-preview-large">
              <img src={settings.logo} alt="Logo" />
            </div>

            <div className="upload-section">
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e.target.files[0])}
                disabled={uploading}
              />
              <label htmlFor="logo-upload" className="upload-btn">
                {uploading ? 'Uploading...' : 'Upload New Logo'}
              </label>
              <span className="file-info">Recommended: PNG with transparent background • Max 5MB</span>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-section">
            <h2>About Section Image</h2>
            <p>Main image displayed in the About section</p>
            
            <div className="image-preview-large">
              <img src={settings.aboutImage} alt="About" />
            </div>

            <div className="upload-section">
              <input
                type="file"
                id="about-upload"
                accept="image/*"
                onChange={(e) => handleAboutImageUpload(e.target.files[0])}
                disabled={uploading}
              />
              <label htmlFor="about-upload" className="upload-btn">
                {uploading ? 'Uploading...' : 'Upload New Image'}
              </label>
              <span className="file-info">Recommended: 800x1000px • Max 5MB</span>
            </div>
          </div>
        )}

        {activeTab === 'fabrics' && (
          <div className="fabrics-section">
            <h2>Fabrics Section</h2>
            <p>Manage the 4 fabric types displayed on your website</p>
            
            <div className="items-grid">
              {settings.fabrics.map((fabric, index) => (
                <motion.div 
                  key={index}
                  className="item-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card-header">
                    <h3>{fabric.title}</h3>
                    <button 
                      className="edit-btn"
                      onClick={() => setEditingFabric(index)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="image-preview">
                    <img src={fabric.image} alt={fabric.title} />
                  </div>

                  <p className="item-description">{fabric.description}</p>

                  <div className="upload-section">
                    <input
                      type="file"
                      id={`fabric-upload-${index}`}
                      accept="image/*"
                      onChange={(e) => handleFabricImageUpload(index, e.target.files[0])}
                      disabled={uploading}
                    />
                    <label htmlFor={`fabric-upload-${index}`} className="upload-btn-small">
                      {uploading ? 'Uploading...' : 'Change Image'}
                    </label>
                  </div>

                  {editingFabric === index && (
                    <div className="edit-modal">
                      <div className="modal-content">
                        <h3>Edit {fabric.title}</h3>
                        <input
                          type="text"
                          value={fabric.title}
                          onChange={(e) => {
                            const updated = [...settings.fabrics]
                            updated[index].title = e.target.value
                            setSettings({ ...settings, fabrics: updated })
                          }}
                          placeholder="Title"
                        />
                        <textarea
                          value={fabric.description}
                          onChange={(e) => {
                            const updated = [...settings.fabrics]
                            updated[index].description = e.target.value
                            setSettings({ ...settings, fabrics: updated })
                          }}
                          placeholder="Description"
                          rows="4"
                        />
                        <div className="modal-actions">
                          <button onClick={() => handleFabricUpdate(index, fabric)}>
                            Save
                          </button>
                          <button onClick={() => setEditingFabric(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="categories-section">
            <h2>Category Slides</h2>
            <p>Manage the 4 category slides in the slider section</p>
            
            <div className="items-grid">
              {settings.categorySlides.map((category, index) => (
                <motion.div 
                  key={index}
                  className="item-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card-header">
                    <h3>{category.title}</h3>
                    <button 
                      className="edit-btn"
                      onClick={() => setEditingCategory(index)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="image-preview">
                    <img src={category.image} alt={category.title} />
                  </div>

                  <p className="item-subtitle">{category.subtitle}</p>
                  <p className="item-description">{category.description}</p>
                  <div className="features-list">
                    {category.features.map((feature, idx) => (
                      <span key={idx} className="feature-badge">{feature}</span>
                    ))}
                  </div>

                  <div className="upload-section">
                    <input
                      type="file"
                      id={`category-upload-${index}`}
                      accept="image/*"
                      onChange={(e) => handleCategoryImageUpload(index, e.target.files[0])}
                      disabled={uploading}
                    />
                    <label htmlFor={`category-upload-${index}`} className="upload-btn-small">
                      {uploading ? 'Uploading...' : 'Change Image'}
                    </label>
                  </div>

                  {editingCategory === index && (
                    <div className="edit-modal">
                      <div className="modal-content">
                        <h3>Edit {category.title}</h3>
                        <input
                          type="text"
                          value={category.title}
                          onChange={(e) => {
                            const updated = [...settings.categorySlides]
                            updated[index].title = e.target.value
                            setSettings({ ...settings, categorySlides: updated })
                          }}
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={category.subtitle}
                          onChange={(e) => {
                            const updated = [...settings.categorySlides]
                            updated[index].subtitle = e.target.value
                            setSettings({ ...settings, categorySlides: updated })
                          }}
                          placeholder="Subtitle"
                        />
                        <textarea
                          value={category.description}
                          onChange={(e) => {
                            const updated = [...settings.categorySlides]
                            updated[index].description = e.target.value
                            setSettings({ ...settings, categorySlides: updated })
                          }}
                          placeholder="Description"
                          rows="4"
                        />
                        <div className="modal-actions">
                          <button onClick={() => handleCategoryUpdate(index, category)}>
                            Save
                          </button>
                          <button onClick={() => setEditingCategory(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SiteSettingsManager
