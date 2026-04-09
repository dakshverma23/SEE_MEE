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
let cachedConnection = null

const connectDB = async () => {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection')
    return cachedConnection
  }

  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  try {
    // Disconnect if in connecting state
    if (mongoose.connection.readyState === 2) {
      await mongoose.disconnect()
    }

    // Connect with proper options for serverless
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false, // Disable buffering - wait for connection
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    })
    
    cachedConnection = connection
    console.log('✅ MongoDB Connected (Serverless)')
    return connection
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    cachedConnection = null
    throw new Error(`MongoDB connection failed: ${error.message}`)
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
  // Set JSON content type
  res.setHeader('Content-Type', 'application/json')
  
  try {
    // Check if environment variables are set
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not set')
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error: MONGODB_URI not set',
        hint: 'Please set environment variables in Vercel dashboard'
      })
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not set')
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error: JWT_SECRET not set',
        hint: 'Please set environment variables in Vercel dashboard'
      })
    }

    // Connect to MongoDB BEFORE handling request
    await connectDB()
    
    // Wait a bit to ensure connection is ready
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection not ready')
    }
    
    // Handle the request with Express
    return app(req, res)
  } catch (error) {
    console.error('❌ Serverless function error:', error.message)
    
    // Return proper JSON error
    return res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message,
      hint: error.message.includes('MONGODB_URI') 
        ? 'Check environment variables in Vercel dashboard'
        : error.message.includes('connection')
        ? 'Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)'
        : 'Check Vercel function logs for details'
    })
  }
}
