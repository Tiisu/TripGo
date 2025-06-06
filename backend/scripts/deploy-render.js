#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPrerequisites() {
  log('🔍 Checking Render deployment prerequisites...', 'cyan');
  
  // Check if we're in the backend directory
  if (!fs.existsSync('package.json')) {
    log('❌ package.json not found. Make sure you\'re in the backend directory.', 'red');
    process.exit(1);
  }
  
  // Check if required files exist
  const requiredFiles = ['server.js', 'package.json'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      log(`❌ Required file ${file} not found.`, 'red');
      process.exit(1);
    }
  }
  
  log('✅ All required files found', 'green');
}

function validateEnvironmentVariables() {
  log('\n🔧 Environment Variables Checklist:', 'cyan');
  
  const requiredEnvVars = [
    'MONGODB_URL',
    'JWT_SECRET', 
    'PAYSTACK_SECRET_KEY',
    'FRONTEND_URL'
  ];
  
  log('Required environment variables for Render:', 'bright');
  requiredEnvVars.forEach(envVar => {
    log(`  - ${envVar}`, 'yellow');
  });
  
  log('\nMake sure to set these in your Render dashboard!', 'bright');
}

function showDeploymentSteps() {
  log('\n📋 Render Deployment Steps:', 'magenta');
  
  log('\n1. 🗄️ Database Setup (MongoDB Atlas):', 'bright');
  log('   - Create MongoDB Atlas account', 'yellow');
  log('   - Create cluster and database user', 'yellow');
  log('   - Whitelist all IPs (0.0.0.0/0)', 'yellow');
  log('   - Get connection string', 'yellow');
  
  log('\n2. 🚀 Render Web Service:', 'bright');
  log('   - Go to https://dashboard.render.com', 'yellow');
  log('   - Click "New +" → "Web Service"', 'yellow');
  log('   - Connect your GitHub repository', 'yellow');
  log('   - Configure service settings:', 'yellow');
  log('     * Name: tripgo-backend', 'cyan');
  log('     * Root Directory: backend', 'cyan');
  log('     * Build Command: npm install', 'cyan');
  log('     * Start Command: npm start', 'cyan');
  
  log('\n3. ⚙️ Environment Variables:', 'bright');
  log('   Set these in Render dashboard:', 'yellow');
  log('   - NODE_ENV=production', 'cyan');
  log('   - PORT=10000', 'cyan');
  log('   - MONGODB_URL=your_mongodb_atlas_connection_string', 'cyan');
  log('   - JWT_SECRET=your_64_character_random_string', 'cyan');
  log('   - PAYSTACK_SECRET_KEY=your_paystack_secret', 'cyan');
  log('   - FRONTEND_URL=your_frontend_domain', 'cyan');
  
  log('\n4. 🎯 Deploy:', 'bright');
  log('   - Click "Create Web Service"', 'yellow');
  log('   - Wait for deployment (5-10 minutes)', 'yellow');
  log('   - Your API will be at: https://your-service-name.onrender.com', 'yellow');
  
  log('\n5. ✅ Post-Deployment:', 'bright');
  log('   - Test health check: https://your-backend-url.onrender.com/', 'yellow');
  log('   - Create admin user: npm run create-admin', 'yellow');
  log('   - Seed tours: npm run seed-tours', 'yellow');
  log('   - Update frontend VITE_BACKEND_URL', 'yellow');
}

function generateJWTSecret() {
  log('\n🔐 Generate JWT Secret:', 'cyan');
  try {
    const secret = execSync('node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"', 
      { encoding: 'utf8' }).trim();
    log('Copy this JWT secret for your environment variables:', 'bright');
    log(secret, 'green');
  } catch (error) {
    log('❌ Failed to generate JWT secret. Use online generator instead.', 'red');
  }
}

function checkGitStatus() {
  log('\n📦 Git Repository Status:', 'cyan');
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      log('⚠️  You have uncommitted changes:', 'yellow');
      log(status, 'yellow');
      log('Consider committing changes before deployment.', 'yellow');
    } else {
      log('✅ Git repository is clean', 'green');
    }
    
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    log(`📍 Current branch: ${branch}`, 'blue');
  } catch (error) {
    log('⚠️  Not a git repository or git not available', 'yellow');
  }
}

function showTroubleshooting() {
  log('\n🔧 Troubleshooting Common Issues:', 'magenta');
  
  log('\n1. Build Failures:', 'bright');
  log('   - Check Node.js version (>=16.0.0)', 'yellow');
  log('   - Verify package.json scripts', 'yellow');
  log('   - Review build logs in Render dashboard', 'yellow');
  
  log('\n2. Database Connection:', 'bright');
  log('   - Verify MongoDB Atlas connection string', 'yellow');
  log('   - Check IP whitelist (0.0.0.0/0)', 'yellow');
  log('   - Confirm database user permissions', 'yellow');
  
  log('\n3. CORS Issues:', 'bright');
  log('   - Set correct FRONTEND_URL', 'yellow');
  log('   - Check CORS configuration in server.js', 'yellow');
  
  log('\n4. Environment Variables:', 'bright');
  log('   - Ensure all required variables are set', 'yellow');
  log('   - Check for typos in variable names', 'yellow');
  log('   - Verify values are correct', 'yellow');
}

async function main() {
  try {
    log('🚀 TripGo Backend - Render Deployment Helper', 'bright');
    log('==============================================', 'bright');
    
    checkPrerequisites();
    validateEnvironmentVariables();
    generateJWTSecret();
    checkGitStatus();
    showDeploymentSteps();
    showTroubleshooting();
    
    log('\n🎉 Ready for Render deployment!', 'green');
    log('📖 For detailed instructions, see: RENDER_DEPLOYMENT.md', 'blue');
    
  } catch (error) {
    log('\n💥 Deployment preparation failed!', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

main();
