# 🧪 Cloudinary Testing Guide

## ✅ Servers Running

**Backend**: http://localhost:5000
**Frontend**: http://localhost:3000

## Test Steps

### 1. Test Admin Login
1. Go to: http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@seemee.com`
   - Password: `admin123`
3. Should redirect to admin dashboard

### 2. Test Image Upload to Cloudinary
1. In admin dashboard, go to **Products Manager**
2. Click **"Add New Product"**
3. Fill in product details:
   - Name: Test Product
   - Description: Testing Cloudinary upload
   - Category: anarkali
   - Price: 1000
   - Add size stock (e.g., M: 10)
4. **Upload an image** (click image upload button)
5. Submit the form

### 3. Verify Upload
**Check Backend Console:**
- Should see upload success message
- No errors

**Check Cloudinary Dashboard:**
1. Go to: https://console.cloudinary.com
2. Login with your account
3. Go to Media Library
4. Look for folder: `my_app/images`
5. Your uploaded image should be there!

### 4. Test Image Display
1. Go to main website: http://localhost:3000
2. Scroll to **Collection** section
3. If you added product to collection, it should display
4. Image should load from Cloudinary CDN
5. Check browser DevTools Network tab:
   - Image URL should be `res.cloudinary.com/dnuucbhwa/...`

### 5. Test Category Pages
1. Click on any category (Anarkali, Palazzo, etc.)
2. Products should display with Cloudinary images
3. Images should load fast from CDN

## API Endpoints to Test

### Upload Single Image
```bash
POST http://localhost:5000/api/upload/image
Headers: Authorization: Bearer {your_admin_token}
Body: form-data with "image" file
```

### Upload Multiple Images
```bash
POST http://localhost:5000/api/upload/images
Headers: Authorization: Bearer {your_admin_token}
Body: form-data with "images" files (max 10)
```

### Upload Video
```bash
POST http://localhost:5000/api/upload/video
Headers: Authorization: Bearer {your_admin_token}
Body: form-data with "video" file
```

## What to Look For

### ✅ Success Indicators:
- Image uploads without errors
- Product saves with Cloudinary URL in database
- Images display on frontend
- Images load from `res.cloudinary.com` domain
- Fast image loading (CDN)
- No console errors

### ❌ Potential Issues:
- **401 Unauthorized**: Not logged in as admin
- **400 Bad Request**: File format not supported
- **500 Server Error**: Cloudinary credentials wrong
- **Image not displaying**: Check URL in database

## Cloudinary URL Format

Uploaded images will have URLs like:
```
https://res.cloudinary.com/dnuucbhwa/image/upload/v1234567890/my_app/images/abc123.jpg
```

## Database Check

To verify URLs are saved correctly:
```bash
# In MongoDB Compass or Atlas
# Check products collection
# Look at images field - should contain Cloudinary URLs
```

## Troubleshooting

### Images not uploading?
1. Check Cloudinary credentials in `.env`
2. Check backend console for errors
3. Verify admin token is valid

### Images not displaying?
1. Check browser console for errors
2. Verify image URL in database
3. Check if Cloudinary URL is accessible
4. Test URL directly in browser

### Old base64 images still showing?
- That's normal! `getImageUrl()` is backward compatible
- New uploads will use Cloudinary
- Old products keep base64 until re-uploaded

## Next Steps

Once testing is successful:
1. Add Cloudinary env vars to Vercel
2. Push code to GitHub
3. Redeploy on Vercel
4. Test on production

---

**Happy Testing!** 🚀
