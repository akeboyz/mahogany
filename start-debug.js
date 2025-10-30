#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Digital Signage System - Debug Startup');
console.log('==========================================');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this from the project root.');
  process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  const install = spawn('npm', ['install'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  console.log('🔧 Starting development server...');
  
  // Set environment variables
  process.env.NODE_ENV = 'development';
  
  const nextDev = spawn('npx', ['next', 'dev', '--port', '3000'], { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  nextDev.on('error', (err) => {
    console.error('❌ Failed to start server:', err.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure Node.js is installed (version 18 or higher)');
    console.log('2. Run: npm install');
    console.log('3. Check if port 3000 is available');
    console.log('4. Try: npm run dev');
  });
  
  nextDev.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Server exited with code ${code}`);
    }
  });
}