#!/usr/bin/env node

import 'dotenv/config';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEnvironment() {
  log('🔧 TripGo Backend - Environment Validation', 'bright');
  log('==========================================', 'bright');
  
  const requiredVars = [
    'MONGODB_URL',
    'JWT_SECRET',
    'PAYSTACK_SECRET_KEY',
    'FRONTEND_URL'
  ];
  
  const optionalVars = [
    'PORT',
    'NODE_ENV',
    'PAYSTACK_PUBLIC_KEY',
    'ADDITIONAL_ORIGINS'
  ];
  
  let allValid = true;
  
  log('\n✅ Required Environment Variables:', 'cyan');
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      log(`  ✅ ${varName}: ${maskSensitive(varName, value)}`, 'green');
    } else {
      log(`  ❌ ${varName}: NOT SET`, 'red');
      allValid = false;
    }
  });
  
  log('\n📋 Optional Environment Variables:', 'cyan');
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      log(`  ✅ ${varName}: ${maskSensitive(varName, value)}`, 'green');
    } else {
      log(`  ⚠️  ${varName}: Not set (using default)`, 'yellow');
    }
  });
  
  log('\n🔍 Environment Analysis:', 'cyan');
  
  // Check MongoDB URL
  const mongoUrl = process.env.MONGODB_URL;
  if (mongoUrl) {
    if (mongoUrl.includes('mongodb+srv://')) {
      log('  ✅ MongoDB: Using Atlas (recommended)', 'green');
    } else if (mongoUrl.includes('mongodb://')) {
      log('  ⚠️  MongoDB: Using local/self-hosted', 'yellow');
    }
    
    if (mongoUrl.includes('TripGo')) {
      log('  ✅ Database: TripGo database specified', 'green');
    } else {
      log('  ⚠️  Database: No specific database in connection string', 'yellow');
    }
  }
  
  // Check JWT Secret
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret) {
    if (jwtSecret.length >= 64) {
      log('  ✅ JWT Secret: Strong (64+ characters)', 'green');
    } else if (jwtSecret.length >= 32) {
      log('  ⚠️  JWT Secret: Moderate (32+ characters)', 'yellow');
    } else {
      log('  ❌ JWT Secret: Weak (less than 32 characters)', 'red');
      allValid = false;
    }
  }
  
  // Check Paystack
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (paystackSecret) {
    if (paystackSecret.startsWith('sk_test_')) {
      log('  ⚠️  Paystack: Using test keys', 'yellow');
    } else if (paystackSecret.startsWith('sk_live_')) {
      log('  ✅ Paystack: Using live keys', 'green');
    } else {
      log('  ❌ Paystack: Invalid key format', 'red');
    }
  }
  
  // Check Frontend URL
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) {
    if (frontendUrl.startsWith('https://')) {
      log('  ✅ Frontend URL: Secure (HTTPS)', 'green');
    } else if (frontendUrl.startsWith('http://localhost')) {
      log('  ⚠️  Frontend URL: Local development', 'yellow');
    } else {
      log('  ⚠️  Frontend URL: Not using HTTPS', 'yellow');
    }
  }
  
  // Check Node Environment
  const nodeEnv = process.env.NODE_ENV || 'development';
  log(`  📍 Environment: ${nodeEnv}`, nodeEnv === 'production' ? 'green' : 'yellow');
  
  // Check Port
  const port = process.env.PORT || '4000';
  if (nodeEnv === 'production' && port !== '10000') {
    log('  ⚠️  Port: Consider using 10000 for Render deployment', 'yellow');
  } else {
    log(`  ✅ Port: ${port}`, 'green');
  }
  
  log('\n🎯 Deployment Readiness:', 'cyan');
  if (allValid) {
    log('  ✅ All required variables are set', 'green');
    log('  🚀 Ready for deployment!', 'green');
  } else {
    log('  ❌ Some required variables are missing', 'red');
    log('  🔧 Please set missing variables before deployment', 'red');
  }
  
  log('\n📖 For Render deployment:', 'blue');
  log('  - See: RENDER_ENV_CONFIG.md', 'blue');
  log('  - Run: npm run deploy:render', 'blue');
  
  return allValid;
}

function maskSensitive(varName, value) {
  const sensitiveVars = ['JWT_SECRET', 'PAYSTACK_SECRET_KEY', 'MONGODB_URL'];
  
  if (sensitiveVars.includes(varName)) {
    if (value.length > 20) {
      return value.substring(0, 10) + '...' + value.substring(value.length - 6);
    } else {
      return '*'.repeat(value.length);
    }
  }
  
  return value;
}

// Run validation
const isValid = validateEnvironment();
process.exit(isValid ? 0 : 1);
