// Vercel serverless function with dynamic imports
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

// Global connection cache
let cachedDb = null
let app = null

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
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

    cachedDb = await mongoose.connect(process.env.MONGODB_URI, opts)
    console.log('✅ MongoDB connected')
    return cachedDb
  } catch (error) {
    console.error('❌ MongoDB error:', error.message)
    throw error
  }
}

async function createApp() {
  if (app) return app

  app = express()

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
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasJwtSecret: !!process.env.JWT_SECRET
      }
    })
  })

  // Dynamically import routes
  try {
    const { default: authRoutes } = await import('../server/routes/auth.js')
    const { default: productRoutes } = await import('../server/routes/products.js')
    const { default: orderRoutes } = await import('../server/routes/orders.js')
    const { default: uploadRoutes } = await import('../server/routes/upload.js')
    const { default: newArrivalRoutes } = await import('../server/routes/newArrivals.js')

    app.use('/api/auth', authRoutes)
    app.use('/api/products', productRoutes)
    app.use('/api/orders', orderRoutes)
    app.use('/api/upload', uploadRoutes)
    app.use('/api/new-arrivals', newArrivalRoutes)
  } catch (error) {
    console.error('❌ Route import error:', error)
    throw error
  }

  // 404 handler
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`
    })
  })

  // Error handler
  app.use((err, req, res, next) => {
    console.error('Express error:', err)
    res.status(err.status || 500).json({ 
      success: false, 
      message: err.message || 'Internal server error'
    })
  })

  return app
}

// Vercel handler
export default async function handler(req, res) {
  try {
    // Connect to database first
    await connectToDatabase()
    
    // Create/get Express app
    const expressApp = await createApp()
    
    // Handle request
    return expressApp(req, res)
  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server initialization error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
