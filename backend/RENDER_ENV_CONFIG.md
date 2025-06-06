# 🔧 Render Environment Variables Configuration

## Environment Variables for Render Dashboard

When deploying to Render, set these environment variables in your Render dashboard:

### Required Environment Variables

```env
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://tiisusharif:DOFZgiGklmA0wVSy@cluster0.n5dee9v.mongodb.net/TripGo?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=28bf6b94ddeb154b23a517b7d987b2160682614700c48db96abaeccaa6d36bd76dd2c4fd653645c3a8e9044bb3895ecc1715a9361f157705a07911a46946c1b244
PAYSTACK_SECRET_KEY=sk_test_f6d4a31b77bb6002e1a40856808d897891c2552b
FRONTEND_URL=https://trip-go-rose.vercel.app
```

### Optional Environment Variables

```env
PAYSTACK_PUBLIC_KEY=pk_test_0d42789d5e674f5ba322ab3df0f9878195966439
ADDITIONAL_ORIGINS=http://localhost:5173,https://localhost:5173
```

## How to Set Environment Variables in Render

### Step 1: Access Environment Variables
1. Go to your Render dashboard
2. Select your web service
3. Click on "Environment" tab
4. Click "Add Environment Variable"

### Step 2: Add Each Variable
For each variable above, add:
- **Key:** Variable name (e.g., `NODE_ENV`)
- **Value:** Variable value (e.g., `production`)

### Step 3: Important Notes
- ✅ **NODE_ENV:** Must be `production` for Render
- ✅ **PORT:** Must be `10000` (Render's default)
- ✅ **MONGODB_URL:** Include database name `TripGo` in the connection string
- ✅ **JWT_SECRET:** Use the strong 128-character secret provided
- ✅ **FRONTEND_URL:** Your deployed frontend URL

## Database Configuration

### MongoDB Atlas Setup
Your current MongoDB connection is configured for:
- **Cluster:** cluster0.n5dee9v.mongodb.net
- **Database:** TripGo
- **User:** tiisusharif

### Verify Database Access
1. Ensure IP whitelist includes `0.0.0.0/0` (all IPs)
2. Confirm database user has read/write permissions
3. Test connection string in MongoDB Compass (optional)

## Security Considerations

### JWT Secret
- ✅ **Length:** 128 characters (very secure)
- ✅ **Randomness:** Cryptographically secure
- ✅ **Uniqueness:** Generated specifically for your app

### Paystack Keys
- ✅ **Test Keys:** Currently using test keys (safe for development)
- ⚠️ **Production:** Replace with live keys when going live
- 🔒 **Security:** Never expose secret keys in frontend

### CORS Configuration
- ✅ **Frontend URL:** Configured for your Vercel deployment
- ✅ **Local Development:** Includes localhost for testing
- 🔒 **Security:** Restricts API access to authorized domains

## Verification Checklist

After setting environment variables:

### ✅ Required Variables Set
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URL` (with TripGo database)
- [ ] `JWT_SECRET` (128-character string)
- [ ] `PAYSTACK_SECRET_KEY`
- [ ] `FRONTEND_URL`

### ✅ Database Connection
- [ ] MongoDB Atlas cluster accessible
- [ ] IP whitelist includes `0.0.0.0/0`
- [ ] Database user has proper permissions
- [ ] Connection string includes database name

### ✅ API Testing
- [ ] Health check: `https://your-app.onrender.com/`
- [ ] Tours API: `https://your-app.onrender.com/api/tours`
- [ ] Admin login: `POST https://your-app.onrender.com/api/admin/login`

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB Atlas IP whitelist
   - Verify connection string format
   - Confirm database user permissions

2. **JWT Errors**
   - Ensure JWT_SECRET is set correctly
   - Check for extra spaces or characters
   - Verify secret length (should be long)

3. **CORS Errors**
   - Verify FRONTEND_URL matches your deployed frontend
   - Check for trailing slashes
   - Ensure protocol (https://) is included

4. **Port Issues**
   - Render requires PORT=10000
   - Don't use PORT=4000 in production
   - Let Render handle port binding

### Debug Commands

Use Render's web shell to debug:

```bash
# Check environment variables
echo $NODE_ENV
echo $MONGODB_URL
echo $JWT_SECRET

# Test database connection
npm run debug-bookings

# Create admin user
npm run create-admin

# Seed sample data
npm run seed-tours
```

## Production Deployment Flow

1. **Set Environment Variables** (this guide)
2. **Deploy to Render** (automatic from GitHub)
3. **Verify Health Check** (API responds)
4. **Create Admin User** (via Render shell)
5. **Test API Endpoints** (tours, admin, bookings)
6. **Update Frontend** (VITE_BACKEND_URL)
7. **Test Full Application** (end-to-end)

## Support

- 📖 **Detailed Guide:** `RENDER_DEPLOYMENT.md`
- 🚀 **Quick Start:** `RENDER_QUICK_START.md`
- 🔧 **Deployment Helper:** `npm run deploy:render`
- 💬 **Render Docs:** https://render.com/docs

Your environment is now configured for production deployment! 🎉
