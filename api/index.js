// Vercel serverless function entry point
import mongoose from 'mongoose'
import app from '../server/server.js'

// MongoDB connection for serverless
let isConnected = false

const connectDB = async () => {
  if (isConnected) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log('✅ MongoDB Connected (Serverless)')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
    throw error
  }
}

// Export handler for Vercel
export default async (req, res) => {
  try {
    await connectDB()
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
