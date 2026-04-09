import express from 'express'
import multer from 'multer'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

// Configure multer for memory storage (base64 conversion)
const storage = multer.memoryStorage()

const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

const videoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB for videos (reduced for MongoDB)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else {
      cb(new Error('Only video files are allowed'))
    }
  }
})

// Upload single image (returns base64)
router.post('/image', protect, admin, imageUpload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    // Convert buffer to base64
    const base64Data = req.file.buffer.toString('base64')
    const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`
    
    res.json({
      success: true,
      data: {
        data: base64Data,
        dataUrl: dataUrl,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
        size: req.file.size
      }
    })
  } catch (error) {
    console.error('Image upload error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// Upload multiple images (returns base64 array)
router.post('/images', protect, admin, imageUpload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' })
    }

    const results = req.files.map(file => {
      const base64Data = file.buffer.toString('base64')
      const dataUrl = `data:${file.mimetype};base64,${base64Data}`
      
      return {
        data: base64Data,
        dataUrl: dataUrl,
        contentType: file.mimetype,
        filename: file.originalname,
        size: file.size
      }
    })

    res.json({
      success: true,
      data: results
    })
  } catch (error) {
    console.error('Multiple images upload error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// Upload video (returns base64)
router.post('/video', protect, admin, videoUpload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    // Convert buffer to base64
    const base64Data = req.file.buffer.toString('base64')
    const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`
    
    res.json({
      success: true,
      data: {
        data: base64Data,
        dataUrl: dataUrl,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
        size: req.file.size
      }
    })
  } catch (error) {
    console.error('Video upload error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
