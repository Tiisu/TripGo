# 🚀 Quick Start: Deploy TripGo Backend to Render

## 1. Pre-Deployment Check
```bash
cd backend
npm run deploy:render
```
This script will check your setup and provide deployment guidance.

## 2. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/TripGo`

## 3. Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `tripgo-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

## 4. Environment Variables
Set these in Render dashboard:
```env
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/TripGo
JWT_SECRET=your_64_character_random_string
PAYSTACK_SECRET_KEY=your_paystack_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

## 5. Post-Deployment
1. **Test API:** Visit `https://your-backend-url.onrender.com/`
2. **Create Admin:** Use Render shell to run `npm run create-admin`
3. **Seed Tours:** Run `npm run seed-tours` (optional)
4. **Update Frontend:** Set `VITE_BACKEND_URL=https://your-backend-url.onrender.com`

## 6. Verification
- ✅ Health check returns JSON response
- ✅ Admin login works at `/api/admin/login`
- ✅ Tours API returns data at `/api/tours`
- ✅ CORS allows your frontend domain

## Support
- 📖 Detailed guide: `RENDER_DEPLOYMENT.md`
- 🔧 Troubleshooting: Check Render logs
- 💬 Issues: Review environment variables and database connection

Your TripGo backend will be live at: `https://your-service-name.onrender.com` 🎉
