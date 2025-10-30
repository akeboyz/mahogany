#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DEPLOY_DIR = path.join(__dirname, '../public/deploy/prj004-mahogany');
const faviconLine = '  <link rel="icon" href="data:,">';

// HTML files that need favicon
const htmlFiles = [
  'menu.html',
  'category.html',
  'product.html'
];

console.log('🔧 Adding favicon to HTML files...\n');

htmlFiles.forEach(filename => {
  const filePath = path.join(DEPLOY_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped: ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if favicon already exists
  if (content.includes('rel="icon"')) {
    console.log(`✓ ${filename} already has favicon`);
    return;
  }

  // Add favicon after <title> tag
  content = content.replace(
    /(<title>.*?<\/title>)/,
    `$1\n${faviconLine}`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${filename} - favicon added`);
});

console.log('\n✅ Done!');
