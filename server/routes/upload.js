import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure upload directories exist
const imagesDir = path.join(__dirname, '../../public/images')
const videosDir = path.join(__dirname, '../../public/videos')

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true })
}

// Configure multer for local storage
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videosDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const imageUpload = multer({
  storage: imageStorage,
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
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB for videos
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else {
      cb(new Error('Only video files are allowed'))
    }
  }
})

// Upload single image
router.post('/image', protect, admin, imageUpload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const url = `/images/${req.file.filename}`
    
    res.json({
      success: true,
      data: {
        url,
        path: url,
        filename: req.file.filename
      }
    })
  } catch (error) {
    console.error('Image upload error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// Upload multiple images
router.post('/images', protect, admin, imageUpload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' })
    }

    const results = req.files.map(file => ({
      url: `/images/${file.filename}`,
      path: `/images/${file.filename}`,
      filename: file.filename
    }))

    res.json({
      success: true,
      data: results
    })
  } catch (error) {
    console.error('Multiple images upload error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// Upload video
router.post('/video', protect, admin, videoUpload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const url = `/videos/${req.file.filename}`
    
    res.json({
      success: true,
      data: {
        url,
        path: url,
        filename: req.file.filename
      }
    })
  } catch (error) {
    console.error('Video upload error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete image
router.delete('/image/:filename', protect, admin, (req, res) => {
  try {
    const filename = req.params.filename
    const filePath = path.join(imagesDir, filename)
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.json({
        success: true,
        message: 'Image deleted successfully'
      })
    } else {
      res.status(404).json({ success: false, message: 'File not found' })
    }
  } catch (error) {
    console.error('Image deletion error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete video
router.delete('/video/:filename', protect, admin, (req, res) => {
  try {
    const filename = req.params.filename
    const filePath = path.join(videosDir, filename)
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      res.json({
        success: true,
        message: 'Video deleted successfully'
      })
    } else {
      res.status(404).json({ success: false, message: 'File not found' })
    }
  } catch (error) {
    console.error('Video deletion error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
