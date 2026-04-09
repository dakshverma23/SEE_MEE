# Vercel MongoDB Connection Fix

## Problem
The MongoDB URI is being truncated in Vercel. The error shows:
```
querySrv ENOTFOUND _mongodb._tcp.seemee
```

Instead of the full hostname:
```
_mongodb._tcp.seemee.d8uqovf.mongodb.net
```

## Solution

### Option 1: Use Standard Connection String (Recommended)

Instead of the SRV connection string, use the standard format:

1. Go to MongoDB Atlas → Your Cluster → Connect → Connect your application
2. Select "Driver: Node.js" and "Version: 5.5 or later"
3. Copy the **standard connection string** (not the SRV one)

It should look like:
```
mongodb://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee-shard-00-00.d8uqovf.mongodb.net:27017,seemee-shard-00-01.d8uqovf.mongodb.net:27017,seemee-shard-00-02.d8uqovf.mongodb.net:27017/seemee?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

### Option 2: Escape Special Characters in SRV String

If you want to keep using the SRV string, make sure there are NO special characters that could be misinterpreted:

Current (might have issues):
```
mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority
```

### Option 3: URL Encode the Password

If your password has special characters, URL encode it:
- Original password: `1165yXLEmoXV3HZN`
- This one looks fine, but if it had special chars like `@`, `#`, `$`, etc., you'd need to encode them

## Steps to Fix in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `MONGODB_URI`
3. **DELETE** the existing variable
4. **ADD NEW** variable:
   - Key: `MONGODB_URI`
   - Value: Paste the FULL connection string (use Option 1 standard format)
   - Apply to: All Environments (Production, Preview, Development)
5. Click "Save"
6. Go to Deployments tab
7. Click "..." on the latest deployment → "Redeploy"

## Verify

After redeployment, check:
1. `https://your-domain.vercel.app/api/health` - Should show MongoDB connected
2. Try admin login again

## Current Working Local URI
```
mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority
```
