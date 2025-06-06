# 🚀 TripGo Production Deployment Checklist

## Pre-Deployment Preparation

### ✅ Environment Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with read/write permissions
- [ ] IP whitelist configured (0.0.0.0/0 for production platforms)
- [ ] Connection string obtained
- [ ] Paystack account set up (if using payments)
- [ ] JWT secret generated (64+ characters)

### ✅ Code Preparation
- [ ] All code committed to GitHub
- [ ] Environment example files created
- [ ] README.md updated with deployment instructions
- [ ] Dependencies updated and tested
- [ ] Build process tested locally

## Deployment Steps

### 🗄️ Database Setup
1. **MongoDB Atlas:**
   ```
   Connection String Format:
   mongodb+srv://username:password@cluster.mongodb.net/TripGo
   ```

2. **Create Admin User:**
   ```bash
   cd backend
   npm run create-admin
   ```

3. **Seed Sample Data (Optional):**
   ```bash
   npm run seed-tours
   ```

### 🔧 Backend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend:**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - `MONGODB_URL`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: 64-character random string
   - `PAYSTACK_SECRET_KEY`: Your Paystack secret key

4. **Verify Backend:**
   - Visit: `https://your-backend-url.vercel.app`
   - Should display: "API is Working!"

### 🎨 Frontend Deployment

1. **Update Environment Variables:**
   ```bash
   # Create frontend/.env.production
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   ```

2. **Deploy Frontend:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Verify Frontend:**
   - Visit: `https://your-frontend-url.vercel.app`
   - Test navigation and responsiveness

## Post-Deployment Verification

### ✅ Functionality Tests
- [ ] Homepage loads correctly
- [ ] Tours page displays tours
- [ ] Tour details page works
- [ ] User registration/login works
- [ ] Booking flow functions
- [ ] Payment integration works (if configured)
- [ ] Admin login works (`/admin/login`)
- [ ] Admin dashboard displays stats
- [ ] Tour management works
- [ ] Booking management works
- [ ] User management works
- [ ] Mobile responsiveness verified

### ✅ Admin Access
- **URL:** `https://your-frontend-url.vercel.app/admin/login`
- **Email:** `admin@tripgo.com`
- **Password:** `admin123`

### ✅ API Endpoints Test
- [ ] `GET /` - API health check
- [ ] `GET /api/tours` - Tours list
- [ ] `GET /api/tours/featured` - Featured tours
- [ ] `POST /api/user/register` - User registration
- [ ] `POST /api/user/login` - User login
- [ ] `POST /api/admin/login` - Admin login
- [ ] `GET /api/admin/dashboard` - Dashboard stats

## Alternative Deployment Platforms

### Railway + Netlify
1. **Backend on Railway:**
   - Connect GitHub repository
   - Set environment variables
   - Auto-deploy from main branch

2. **Frontend on Netlify:**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`

### Render (Full Stack)
1. **Backend Web Service:**
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

2. **Frontend Static Site:**
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

## Security Checklist

### ✅ Production Security
- [ ] Strong JWT secret (64+ characters)
- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS properly configured
- [ ] Database credentials secured
- [ ] Admin credentials changed from defaults
- [ ] Rate limiting considered (if needed)
- [ ] Input validation in place
- [ ] Error messages don't expose sensitive info

## Performance Optimization

### ✅ Frontend Optimization
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Lazy loading implemented where needed
- [ ] Caching headers configured
- [ ] CDN utilized (automatic on Vercel)

### ✅ Backend Optimization
- [ ] Database queries optimized
- [ ] Indexes created where needed
- [ ] Response compression enabled
- [ ] Connection pooling configured

## Monitoring & Maintenance

### ✅ Post-Launch Monitoring
- [ ] Error tracking set up
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Backup strategy in place
- [ ] Update schedule planned

## Troubleshooting Common Issues

### CORS Errors
- Check `VITE_BACKEND_URL` is correct
- Verify backend CORS configuration

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist settings
- Confirm database user permissions

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

### Environment Variable Issues
- Confirm all required variables are set
- Check for typos in variable names
- Verify variable values are correct

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **MongoDB Atlas Documentation:** https://docs.atlas.mongodb.com/
- **Railway Documentation:** https://docs.railway.app/
- **Netlify Documentation:** https://docs.netlify.com/

## Emergency Rollback Plan

1. **Revert to Previous Deployment:**
   ```bash
   vercel rollback
   ```

2. **Database Backup Restoration:**
   - Use MongoDB Atlas backup features
   - Restore from previous backup point

3. **DNS/Domain Issues:**
   - Check domain configuration
   - Verify DNS propagation

---

**Note:** Keep this checklist updated as your application evolves and new features are added.
