# 🚀 TripGo Deployment Guide

## Quick Deployment Steps

### 1. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/TripGo`
5. Whitelist all IPs: `0.0.0.0/0` (for production deployment platforms)

### 2. Backend Deployment (Vercel - Recommended)

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend
cd backend

# Deploy to Vercel
vercel --prod

# Follow prompts and set up project
```

#### Option B: Using Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   - `MONGODB_URL`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - `PAYSTACK_SECRET_KEY`: Your Paystack secret key

### 3. Frontend Deployment

#### Update Environment Variables
Create `frontend/.env.production`:
```env
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

#### Deploy to Vercel
```bash
cd frontend
vercel --prod
```

### 4. Post-Deployment Setup

#### Create Admin User
After backend deployment, create admin user:
```bash
# If using Vercel CLI, you can run:
vercel env pull .env.local
npm run create-admin
```

Or manually create admin user in MongoDB Atlas with:
- Email: `admin@tripgo.com`
- Password: `admin123` (hashed with bcrypt)
- Role: `admin`

#### Seed Sample Data (Optional)
```bash
npm run seed-tours
```

## Alternative Deployment Options

### Railway (Backend) + Netlify (Frontend)

#### Railway Backend:
1. Connect GitHub to [Railway](https://railway.app)
2. Select backend folder
3. Set environment variables
4. Auto-deploy from GitHub

#### Netlify Frontend:
1. Connect GitHub to [Netlify](https://netlify.com)
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`
3. Set `VITE_BACKEND_URL` environment variable

### Render (Full Stack)

#### Backend:
1. Create Web Service on [Render](https://render.com)
2. Connect GitHub repository
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Set environment variables

#### Frontend:
1. Create Static Site on Render
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variables

## Environment Variables Reference

### Backend (.env)
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/TripGo
JWT_SECRET=your_64_character_random_string
PAYSTACK_SECRET_KEY=sk_test_or_live_key
PORT=4000
```

### Frontend (.env.production)
```env
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

## Verification Steps

1. **Backend Health Check:**
   - Visit: `https://your-backend-url.vercel.app`
   - Should see: "API is Working!"

2. **Admin Login:**
   - Visit: `https://your-frontend-url.vercel.app/admin/login`
   - Login with: `admin@tripgo.com` / `admin123`

3. **Frontend Functionality:**
   - Browse tours
   - Test booking flow
   - Check responsive design

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure backend CORS is configured for your frontend domain
   - Check `VITE_BACKEND_URL` is correct

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist includes `0.0.0.0/0`

3. **Environment Variables:**
   - Ensure all required env vars are set
   - Check for typos in variable names

4. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Support:
- Check deployment platform logs
- Verify environment variables
- Test API endpoints individually
- Check browser console for frontend errors

## Security Notes for Production:
- Use strong JWT secret (64+ characters)
- Use HTTPS for all communications
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use environment-specific configurations
- Enable rate limiting if needed
