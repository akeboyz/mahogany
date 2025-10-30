#!/usr/bin/env node

/**
 * Yodeck API Upload Script
 * Uploads digital signage content to Yodeck platform via REST API
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');
const archiver = require('archiver');

// Configuration
const YODECK_API_BASE = 'https://api.yodeck.com/v1';
const API_TOKEN = process.argv[2] || process.env.YODECK_API_TOKEN;
const DEPLOY_DIR = path.join(__dirname, '../public/deploy/prj004-mahogany');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Validate configuration
function validateConfig() {
  if (!API_TOKEN) {
    log('❌ Error: YODECK_API_TOKEN environment variable is not set', 'red');
    log('\nTo fix this:', 'yellow');
    log('1. Go to Yodeck → Account Settings → Advanced Settings → API Tokens', 'yellow');
    log('2. Generate a new token', 'yellow');
    log('3. Set environment variable: YODECK_API_TOKEN=your_token_here', 'yellow');
    log('\nExample usage:', 'blue');
    log('  set YODECK_API_TOKEN=your_token_here && node scripts/deploy-yodeck.js', 'blue');
    process.exit(1);
  }

  if (!fs.existsSync(DEPLOY_DIR)) {
    log(`❌ Error: Deploy directory not found: ${DEPLOY_DIR}`, 'red');
    process.exit(1);
  }
}

// Create ZIP archive of deployment files
async function createZipArchive() {
  return new Promise((resolve, reject) => {
    log('📦 Creating ZIP archive...', 'blue');

    const zipPath = path.join(__dirname, '../temp-yodeck-upload.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      log(`✅ Archive created: ${sizeMB} MB`, 'green');
      resolve(zipPath);
    });

    archive.on('error', (err) => {
      log(`❌ Archive error: ${err.message}`, 'red');
      reject(err);
    });

    archive.pipe(output);

    // Add all files from deploy directory
    archive.directory(DEPLOY_DIR, false);
    archive.finalize();
  });
}

// Upload media to Yodeck using 3-step process
async function uploadMedia(zipPath) {
  log('⬆️  Uploading to Yodeck (3-step process)...', 'blue');

  try {
    // Step 1: Create app resource
    log('   Step 1: Creating HTML app resource...', 'blue');
    const createResponse = await fetch(`${YODECK_API_BASE}/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Mahogany Digital Signage',
        type: 'app',
        source: 'local'
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Create media failed (${createResponse.status}): ${errorText}`);
    }

    const mediaData = await createResponse.json();
    const mediaId = mediaData.id || mediaData.uuid;
    log(`   ✅ Media created with ID: ${mediaId}`, 'green');

    // Step 2: Get upload URL
    log('   Step 2: Retrieving upload URL...', 'blue');
    const uploadUrlResponse = await fetch(`${YODECK_API_BASE}/media/${mediaId}/upload_url`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${API_TOKEN}`
      }
    });

    if (!uploadUrlResponse.ok) {
      const errorText = await uploadUrlResponse.text();
      throw new Error(`Get upload URL failed (${uploadUrlResponse.status}): ${errorText}`);
    }

    const uploadUrlData = await uploadUrlResponse.json();
    const uploadUrl = uploadUrlData.upload_url;
    log(`   ✅ Upload URL retrieved`, 'green');

    // Step 3: Upload file to S3
    log('   Step 3: Uploading file to S3...', 'blue');
    const fileBuffer = fs.readFileSync(zipPath);
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/zip'
      },
      body: fileBuffer
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`S3 upload failed (${uploadResponse.status}): ${errorText}`);
    }

    log(`   ✅ File uploaded to S3`, 'green');

    // Step 4: Complete the upload
    log('   Step 4: Completing upload...', 'blue');
    const completeResponse = await fetch(`${YODECK_API_BASE}/media/${mediaId}/complete_upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        upload_url: uploadUrl
      })
    });

    if (!completeResponse.ok) {
      const errorText = await completeResponse.text();
      throw new Error(`Complete upload failed (${completeResponse.status}): ${errorText}`);
    }

    log('✅ Upload complete!', 'green');
    log(`📋 Media ID: ${mediaId}`, 'green');

    return mediaData;
  } catch (error) {
    log(`❌ Upload failed: ${error.message}`, 'red');
    throw error;
  }
}

// Get account info to verify token
async function verifyToken() {
  log('🔐 Verifying API token...', 'blue');
  log(`   Using token: ${API_TOKEN.substring(0, 20)}...`, 'blue');

  // Try different endpoints to verify
  const endpoints = [
    '/account',
    '/account/metadata',
    '/media'
  ];

  for (const endpoint of endpoints) {
    try {
      log(`   Trying endpoint: ${YODECK_API_BASE}${endpoint}`, 'blue');
      const response = await fetch(`${YODECK_API_BASE}${endpoint}`, {
        headers: {
          'Authorization': `Token ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      log(`   Response status: ${response.status}`, 'blue');

      if (response.ok) {
        const data = await response.json();
        log(`✅ Token verified using: ${endpoint}`, 'green');
        return data;
      }
    } catch (error) {
      log(`   ${endpoint} failed: ${error.message}`, 'yellow');
    }
  }

  log('⚠️  Token verification inconclusive, proceeding with upload...', 'yellow');
  return null;
}

// Cleanup temporary files
function cleanup(zipPath) {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    log('🧹 Cleaned up temporary files', 'blue');
  }
}

// Main execution
async function main() {
  log('\n🚀 Yodeck API Upload Tool\n', 'blue');

  validateConfig();

  let zipPath;
  try {
    // Verify token first (but don't fail if it doesn't work)
    try {
      await verifyToken();
    } catch (e) {
      log('⚠️  Verification failed, continuing anyway...', 'yellow');
    }

    // Create archive
    zipPath = await createZipArchive();

    // Upload to Yodeck
    const result = await uploadMedia(zipPath);

    log('\n✅ Deployment complete!', 'green');
    log('📺 Your content is now available in Yodeck', 'green');
    log('   Go to app.yodeck.com → Media to see your uploaded content', 'blue');

  } catch (error) {
    log(`\n❌ Deployment failed: ${error.message}`, 'red');
    log(`   Error details: ${error.stack}`, 'red');
    process.exit(1);
  } finally {
    if (zipPath) cleanup(zipPath);
  }
}

// Run the script
main();
