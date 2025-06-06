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
  log('🔍 Checking prerequisites...', 'cyan');
  
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    log('✅ Vercel CLI is installed', 'green');
  } catch (error) {
    log('❌ Vercel CLI not found. Installing...', 'yellow');
    execSync('npm install -g vercel', { stdio: 'inherit' });
    log('✅ Vercel CLI installed', 'green');
  }
}

function deployBackend() {
  log('\n🚀 Deploying backend to Vercel...', 'cyan');
  
  process.chdir('backend');
  
  try {
    execSync('vercel --prod --yes', { stdio: 'inherit' });
    log('✅ Backend deployed successfully!', 'green');
  } catch (error) {
    log('❌ Backend deployment failed', 'red');
    throw error;
  }
  
  process.chdir('..');
}

function deployFrontend() {
  log('\n🚀 Deploying frontend to Vercel...', 'cyan');
  
  process.chdir('frontend');
  
  try {
    execSync('vercel --prod --yes', { stdio: 'inherit' });
    log('✅ Frontend deployed successfully!', 'green');
  } catch (error) {
    log('❌ Frontend deployment failed', 'red');
    throw error;
  }
  
  process.chdir('..');
}

function checkEnvironmentFiles() {
  log('\n🔧 Checking environment files...', 'cyan');
  
  const backendEnv = path.join('backend', '.env');
  const frontendEnv = path.join('frontend', '.env.production');
  
  if (!fs.existsSync(backendEnv)) {
    log('⚠️  Backend .env file not found. Please create it from .env.example', 'yellow');
    log('   Required variables: MONGODB_URL, JWT_SECRET, PAYSTACK_SECRET_KEY', 'yellow');
  } else {
    log('✅ Backend .env file found', 'green');
  }
  
  if (!fs.existsSync(frontendEnv)) {
    log('⚠️  Frontend .env.production file not found.', 'yellow');
    log('   Please create it with VITE_BACKEND_URL after backend deployment', 'yellow');
  } else {
    log('✅ Frontend .env.production file found', 'green');
  }
}

function showPostDeploymentSteps() {
  log('\n📋 Post-deployment steps:', 'magenta');
  log('1. Set environment variables in Vercel dashboard:', 'bright');
  log('   - MONGODB_URL (MongoDB Atlas connection string)', 'yellow');
  log('   - JWT_SECRET (64-character random string)', 'yellow');
  log('   - PAYSTACK_SECRET_KEY (your Paystack secret)', 'yellow');
  log('\n2. Create admin user by running:', 'bright');
  log('   npm run create-admin', 'yellow');
  log('\n3. Optionally seed sample tours:', 'bright');
  log('   npm run seed-tours', 'yellow');
  log('\n4. Test your deployment:', 'bright');
  log('   - Backend: https://your-backend-url.vercel.app', 'yellow');
  log('   - Frontend: https://your-frontend-url.vercel.app', 'yellow');
  log('   - Admin: https://your-frontend-url.vercel.app/admin/login', 'yellow');
}

async function main() {
  try {
    log('🚀 TripGo Deployment Script', 'bright');
    log('================================', 'bright');
    
    checkPrerequisites();
    checkEnvironmentFiles();
    
    const deployBoth = process.argv.includes('--all');
    const deployBackendOnly = process.argv.includes('--backend');
    const deployFrontendOnly = process.argv.includes('--frontend');
    
    if (deployBoth || (!deployBackendOnly && !deployFrontendOnly)) {
      deployBackend();
      deployFrontend();
    } else if (deployBackendOnly) {
      deployBackend();
    } else if (deployFrontendOnly) {
      deployFrontend();
    }
    
    log('\n🎉 Deployment completed!', 'green');
    showPostDeploymentSteps();
    
  } catch (error) {
    log('\n💥 Deployment failed!', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

main();
