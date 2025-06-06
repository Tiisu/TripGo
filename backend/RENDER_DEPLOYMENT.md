# 🚀 TripGo Backend Deployment on Render

## Prerequisites

### 1. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create database user with read/write permissions
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/TripGo`
5. Whitelist all IPs: `0.0.0.0/0` (Network Access → Add IP Address)

### 2. GitHub Repository
- Ensure your code is pushed to GitHub
- Make sure the backend folder contains all necessary files

## Render Deployment Steps

### Step 1: Create Web Service on Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect GitHub repository**
4. **Configure Service:**
   - **Name:** `tripgo-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 2: Environment Variables

Add these environment variables in Render dashboard:

```env
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/TripGo
JWT_SECRET=your_64_character_random_string_here
PAYSTACK_SECRET_KEY=your_paystack_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Advanced Settings

1. **Auto-Deploy:** Enable (deploys on every push to main branch)
2. **Health Check Path:** `/`
3. **Instance Type:** Free (or upgrade as needed)

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Your backend will be available at: `https://your-service-name.onrender.com`

## Post-Deployment Setup

### 1. Create Admin User
```bash
# Using Render Shell (in dashboard)
npm run create-admin
```

### 2. Seed Sample Tours (Optional)
```bash
npm run seed-tours
```

### 3. Test API Endpoints
- Health check: `https://your-backend-url.onrender.com/`
- Tours: `https://your-backend-url.onrender.com/api/tours`
- Admin login: `POST https://your-backend-url.onrender.com/api/admin/login`

## Frontend Configuration

Update your frontend environment variables:

```env
# frontend/.env.production
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

## Monitoring & Logs

### View Logs
1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab
4. Monitor real-time logs

### Metrics
- CPU usage
- Memory usage
- Response times
- Error rates

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Verify package.json scripts
   - Review build logs

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist (should include 0.0.0.0/0)
   - Confirm database user permissions

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify values are correct

4. **CORS Issues:**
   - Update FRONTEND_URL environment variable
   - Check CORS configuration in server.js

### Debug Commands

```bash
# Check environment variables
echo $MONGODB_URL

# Test database connection
npm run debug-bookings

# Create test booking
npm run create-test-booking
```

## Performance Optimization

### 1. Database Optimization
- Create indexes for frequently queried fields
- Use connection pooling
- Optimize query performance

### 2. Caching
- Implement Redis for session storage
- Cache frequently accessed data
- Use CDN for static assets

### 3. Monitoring
- Set up error tracking (Sentry)
- Monitor performance metrics
- Set up alerts for downtime

## Security Best Practices

1. **Environment Variables:**
   - Never commit secrets to Git
   - Use strong, unique passwords
   - Rotate secrets regularly

2. **Database Security:**
   - Use MongoDB Atlas security features
   - Enable authentication
   - Regular security updates

3. **API Security:**
   - Rate limiting
   - Input validation
   - HTTPS only

## Scaling

### Free Tier Limitations
- 750 hours/month
- Sleeps after 15 minutes of inactivity
- Limited CPU and memory

### Upgrade Options
- **Starter:** $7/month - No sleep, more resources
- **Standard:** $25/month - Autoscaling, more CPU/memory
- **Pro:** $85/month - High performance, priority support

## Backup Strategy

1. **Database Backups:**
   - MongoDB Atlas automatic backups
   - Point-in-time recovery
   - Cross-region backups

2. **Code Backups:**
   - GitHub repository
   - Multiple branches
   - Release tags

## Support Resources

- **Render Documentation:** https://render.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Node.js Best Practices:** https://nodejs.org/en/docs/guides/

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` |
| `MONGODB_URL` | Database connection | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing key | `64-char-random-string` |
| `PAYSTACK_SECRET_KEY` | Payment processor key | `sk_live_...` |
| `FRONTEND_URL` | Frontend domain | `https://app.com` |

---

**Note:** Keep this documentation updated as your deployment evolves.
