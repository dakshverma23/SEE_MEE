// Vercel serverless function entry point
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

// Import routes
import authRoutes from '../server/routes/auth.js'
import productRoutes from '../server/routes/products.js'
import orderRoutes from '../server/routes/orders.js'
import uploadRoutes from '../server/routes/upload.js'
import newArrivalRoutes from '../server/routes/newArrivals.js'

// MongoDB connection cache
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection')
    return cachedDb
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }

  try {
    mongoose.set('strictQuery', false)
    
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, opts)
    cachedDb = db
    console.log('New database connection established')
    return db
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

// Create Express app
const app = express()

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET
    }
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/new-arrivals', newArrivalRoutes)

// Catch-all for undefined routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err)
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
})

// Vercel serverless handler
export default async function handler(req, res) {
  try {
    // Connect to database
    await connectToDatabase()
    
    // Pass request to Express
    return app(req, res)
  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}
