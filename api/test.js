// Simple test endpoint
export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: 'Test endpoint working',
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }
  })
}
