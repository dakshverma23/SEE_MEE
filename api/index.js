// Vercel serverless function entry point
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import routes
import authRoutes from '../server/routes/auth.js'
import productRoutes from '../server/routes/products.js'
import orderRoutes from '../server/routes/orders.js'
import uploadRoutes from '../server/routes/upload.js'
import newArrivalRoutes from '../server/routes/newArrivals.js'

dotenv.config()

// MongoDB connection for serverless
let isConnected = false

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
      })
    }
    isConnected = true
    console.log('✅ MongoDB Connected (Serverless)')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
    isConnected = false
    throw error
  }
}

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/new-arrivals', newArrivalRoutes)

// Catch-all for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// Export handler for Vercel
export default async (req, res) => {
  try {
    // Connect to MongoDB
    await connectDB()
    
    // Handle the request with Express
    return app(req, res)
  } catch (error) {
    console.error('Serverless function error:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    })
  }
}
