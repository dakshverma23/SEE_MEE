# Quick Start Guide - Fix Server Issues

## The Problem
Your server isn't starting, causing "Unexpected end of JSON input" errors in the admin panel.

## Quick Fix - Run These Commands:

### Option 1: Fresh Install (RECOMMENDED)
```bash
# Terminal 1 - Backend Server
cd server
rm -rf node_modules
npm install
npm start
```

Wait for "✅ MongoDB Connected" and "🚀 Server running on port 5000"

```bash
# Terminal 2 - Admin Panel (open new terminal)
cd admin
npm run dev
```

### Option 2: If MongoDB Connection Fails

If you see "MongoDB Connection Error", your MongoDB isn't running or the connection string is wrong.

**Check your `.env` file:**
```
MONGODB_URI=mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority
```

Make sure this connection string is correct and your MongoDB Atlas cluster is running.

### Option 3: Use Local MongoDB (if Atlas doesn't work)

1. Install MongoDB locally
2. Change `.env` to:
```
MONGODB_URI=mongodb://localhost:27017/seemee
```

## Verify Server is Running

Open browser and go to: `http://localhost:5000/api/products`

You should see: `{"success":true,"data":[]}`

If you see this, the server is working!

## Then Start Admin Panel

```bash
cd admin
npm run dev
```

Go to: `http://localhost:3001`

## Common Issues:

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "Cannot find module"
```bash
cd server
npm install
```

### "MongoDB connection error"
- Check if MongoDB Atlas cluster is running
- Verify connection string in `.env`
- Check if your IP is whitelisted in MongoDB Atlas

## Test Upload After Server Starts

1. Go to `http://localhost:3001`
2. Login with admin credentials
3. Click "Products" tab
4. Click "+ Add Product"
5. Try uploading an image

If it still fails, check the browser console (F12) and server terminal for error messages.
