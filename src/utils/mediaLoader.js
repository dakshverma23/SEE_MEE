/**
 * Media Loader Utility
 * Automatically loads images and videos based on naming conventions
 */

// Image naming conventions:
// - hero-background.jpg/png - Hero section background
// - anarkali-arrival.jpg - New Arrivals Anarkali
// - palazzo-arrival.jpg - New Arrivals Palazzo
// - straight-arrival.jpg - New Arrivals Straight Cut
// - anarkali-{number}.jpg - Category Anarkali images
// - palazzo-{number}.jpg - Category Palazzo images
// - straight-{number}.jpg - Category Straight Cut images
// - sharara-{number}.jpg - Category Sharara images
// - product-{number}.jpg - Featured products
// - about-{number}.jpg - About section images

/**
 * Load image with fallback
 * @param {string} imagePath - Path to image
 * @param {string} fallback - Fallback image path
 * @returns {string} - Image path or fallback
 */
export const loadImage = (imagePath, fallback = null) => {
  return imagePath
}

/**
 * Get all images for a specific category
 * @param {string} category - Category name (anarkali, palazzo, straight, sharara)
 * @returns {Array} - Array of image paths
 */
export const getCategoryImages = (category) => {
  const images = []
  // This will be populated dynamically when images are added
  // Format: category-1.jpg, category-2.jpg, etc.
  for (let i = 1; i <= 10; i++) {
    images.push(`/images/${category}-${i}.jpg`)
  }
  return images
}

/**
 * Get product images
 * @param {number} count - Number of products
 * @returns {Array} - Array of product image paths
 */
export const getProductImages = (count = 6) => {
  const images = []
  for (let i = 1; i <= count; i++) {
    images.push(`/images/product-${i}.jpg`)
  }
  return images
}

/**
 * Get video path
 * @param {string} videoName - Video name
 * @returns {string} - Video path
 */
export const getVideo = (videoName) => {
  return `/videos/${videoName}.mp4`
}

/**
 * Check if media file exists
 * @param {string} path - Media path
 * @returns {Promise<boolean>} - True if exists
 */
export const checkMediaExists = async (path) => {
  try {
    const response = await fetch(path, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get all arrival images
 * @returns {Object} - Object with arrival images
 */
export const getArrivalImages = () => {
  return {
    anarkali: '/images/ANARKALI.png',
    palazzo: '/images/Plazzo_suit.jpg',
    straight: '/images/Straightcut.jpg'
  }
}

/**
 * Get about section images
 * @returns {Array} - Array of about image paths
 */
export const getAboutImages = () => {
  return [
    '/images/about-1.jpg',
    '/images/about-2.jpg',
    '/images/about-3.jpg'
  ]
}

export default {
  loadImage,
  getCategoryImages,
  getProductImages,
  getVideo,
  checkMediaExists,
  getArrivalImages,
  getAboutImages
}
