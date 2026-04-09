# Image & Video Naming Guide

## 📁 File Organization

Place all images in `public/images/` and videos in `public/videos/`

## 🖼️ Image Naming Conventions

### Hero Section
- **hero-background.jpg** - Main hero background image
  - Recommended: 1920x1080px or higher
  - Format: JPG, PNG, WebP

### New Arrivals Section
- **anarkali-arrival.jpg** - Anarkali suit for new arrivals banner
- **palazzo-arrival.jpg** - Palazzo suit for new arrivals banner
- **straight-arrival.jpg** - Straight cut suit for new arrivals banner
  - Recommended: 400x560px (5:7 ratio)
  - Format: JPG, PNG

### Category Images
Use numbered format for multiple images per category:

- **anarkali-1.jpg, anarkali-2.jpg, anarkali-3.jpg** - Anarkali category
- **palazzo-1.jpg, palazzo-2.jpg, palazzo-3.jpg** - Palazzo category
- **straight-1.jpg, straight-2.jpg, straight-3.jpg** - Straight cut category
- **sharara-1.jpg, sharara-2.jpg, sharara-3.jpg** - Sharara category
  - Recommended: 600x800px
  - Format: JPG, PNG

### Featured Products
- **product-1.jpg** through **product-20.jpg** - Featured collection items
  - Recommended: 600x800px
  - Format: JPG, PNG

### About Section
- **about-1.jpg, about-2.jpg, about-3.jpg** - About section images
  - Recommended: 800x600px
  - Format: JPG, PNG

## 🎥 Video Naming Conventions

### Product Videos
- **product-showcase.mp4** - Main product showcase video
- **anarkali-video.mp4** - Anarkali category video
- **palazzo-video.mp4** - Palazzo category video
- **collection-{name}.mp4** - Collection videos
  - Recommended: 1920x1080px, H.264 codec
  - Format: MP4, WebM
  - Keep under 50MB for web performance

## 📝 Naming Rules

1. **Use lowercase** - All filenames should be lowercase
2. **Use hyphens** - Separate words with hyphens (-)
3. **No spaces** - Never use spaces in filenames
4. **Be descriptive** - Use clear, descriptive names
5. **Use numbers** - For multiple items, use sequential numbers

## ✅ Good Examples
```
hero-background.jpg
anarkali-arrival.jpg
product-1.jpg
palazzo-3.jpg
collection-summer.mp4
```

## ❌ Bad Examples
```
Hero Background.jpg (has spaces)
Anarkali_Arrival.JPG (uppercase, underscore)
product.jpg (not numbered)
video 1.mp4 (has space)
```

## 🔄 Auto-Loading

The website automatically loads images based on these naming conventions:
- Images are loaded dynamically from the `/images/` folder
- Videos are loaded from the `/videos/` folder
- If an image is missing, a placeholder will be shown
- You can add new images anytime by following the naming convention

## 📊 Recommended Sizes

| Section | Size | Aspect Ratio |
|---------|------|--------------|
| Hero Background | 1920x1080px | 16:9 |
| New Arrivals | 400x560px | 5:7 |
| Categories | 600x800px | 3:4 |
| Products | 600x800px | 3:4 |
| About | 800x600px | 4:3 |

## 💡 Tips

1. Optimize images before uploading (use tools like TinyPNG)
2. Keep file sizes under 500KB for images
3. Use WebP format for better compression
4. Test images on different screen sizes
5. Maintain consistent quality across all images
