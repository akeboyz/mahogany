#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const DEPLOY_DIR = path.join(__dirname, '../public/deploy/prj004-mahogany');
const zipPath = path.join(__dirname, '../temp-yodeck-upload.zip');

console.log('📦 Creating ZIP archive...');
console.log(`   Source: ${DEPLOY_DIR}`);

const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`✅ Archive created: ${sizeMB} MB`);
  console.log(`📁 Location: ${zipPath}`);
});

archive.on('error', (err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

archive.pipe(output);
archive.directory(DEPLOY_DIR, false);
archive.finalize();
