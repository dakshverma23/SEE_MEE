# 🎯 Separate Admin Panel Setup

## ✅ Three Separate Applications Running

### 1. Backend API
- **URL**: http://localhost:5000
- **Purpose**: Handles all API requests, database operations, Cloudinary uploads
- **Status**: ✅ Running

### 2. Main Website (Customer-facing)
- **URL**: http://localhost:3000
- **Purpose**: Public website for customers to browse and shop
- **Features**: 
  - Home page with hero carousel
  - Product categories
  - Collection slider
  - Magazine section
  - User authentication
  - Shopping cart
- **Status**: ✅ Running

### 3. Admin Panel (Separate Application)
- **URL**: http://localhost:3002
- **Purpose**: Admin-only dashboard for managing products, orders, etc.
- **Features**:
  - Product management (CRUD)
  - Collection management
  - New arrivals management
  - Order management
  - Cloudinary image uploads
- **Status**: ✅ Running

## Access URLs

### For Customers:
```
Main Website: http://localhost:3000
User Login:   http://localhost:3000/auth
Categories:   http://localhost:3000/anarkali
              http://localhost:3000/palazzo
              http://localhost:3000/straight-cut
              http://localhost:3000/sharara
```

### For Admin:
```
Admin Panel:  http://localhost:3002
Admin Login:  http://localhost:3002/login
Dashboard:    http://localhost:3002/dashboard
```

### For API:
```
Backend API:  http://localhost:5000/api
Health Check: http://localhost:5000/api/health
```

## Admin Panel Features

### Login
- URL: http://localhost:3002/login
- Credentials:
  - Email: `admin@seemee.com`
  - Password: `admin123`

### Dashboard Tabs
1. **Overview** - Statistics and metrics
2. **New Arrivals** - Manage homepage arrivals
3. **Products** - Full product management with Cloudinary uploads
4. **Orders** - View and manage customer orders

## Testing Cloudinary Upload

1. Go to: http://localhost:3002/login
2. Login with admin credentials
3. Click **"Products"** tab
4. Click **"Add New Product"**
5. Fill in product details
6. Upload image - will go to Cloudinary
7. Submit
8. Check Cloudinary dashboard to see uploaded image

## Architecture Benefits

### Separation of Concerns:
✅ **Main Website** - Optimized for customers, fast loading
✅ **Admin Panel** - Feature-rich, separate bundle, doesn't affect customer site
✅ **Backend API** - Serves both applications

### Deployment:
- Main website: Deploy to Vercel (main domain)
- Admin panel: Deploy to Vercel (subdomain or separate URL)
- Backend API: Serverless functions on Vercel

### Security:
- Admin panel can be on restricted subdomain
- Separate authentication flows
- Admin routes protected by middleware

## File Structure

```
seemee/
├── src/                    # Main website (customer-facing)
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── admin/                  # Admin panel (separate app)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Backend API
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── api/                    # Vercel serverless functions
    └── index.js
```

## Starting All Services

### Option 1: Manual (Current)
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Main Website
npm run dev

# Terminal 3 - Admin Panel
cd admin
npm run dev
```

### Option 2: Using FIX-AND-START.bat
Double-click `FIX-AND-START.bat` to start all three services automatically.

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=seemee_super_secret...
CLOUDINARY_CLOUD_NAME=dnuucbhwa
CLOUDINARY_API_KEY=448247935292231
CLOUDINARY_API_SECRET=AGJ7USkkALHvZ4Q7LErHZHOXSk8
```

### For Vercel Deployment
Add all backend env vars to Vercel dashboard for both deployments.

## Current Status

✅ Backend running on port 5000
✅ Main website running on port 3000
✅ Admin panel running on port 3002
✅ Cloudinary configured and ready
✅ All three applications working independently

---

**Ready to test!** 🚀

Go to http://localhost:3002/login to access the admin panel.
