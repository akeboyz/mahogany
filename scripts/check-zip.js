#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const zipPath = path.join(__dirname, '../temp-yodeck-upload.zip');

console.log('📦 Checking ZIP structure...\n');

const AdmZip = require('adm-zip');

try {
  const zip = new AdmZip(zipPath);
  const zipEntries = zip.getEntries();

  console.log(`Total files: ${zipEntries.length}\n`);
  console.log('First 30 files:');
  console.log('─'.repeat(60));

  zipEntries.slice(0, 30).forEach((entry, index) => {
    const icon = entry.isDirectory ? '📁' : '📄';
    console.log(`${icon} ${entry.entryName}`);
  });

  // Check for index.html at root
  const hasRootIndex = zipEntries.some(e => e.entryName === 'index.html');
  console.log('\n' + '='.repeat(60));
  console.log(hasRootIndex ? '✅ index.html found at root level' : '❌ index.html NOT at root level');

  // Check for nested folders
  const nestedFiles = zipEntries.filter(e => e.entryName.includes('/') && !e.isDirectory);
  console.log(`📂 Files in subdirectories: ${nestedFiles.length}`);

} catch (error) {
  console.error('Error:', error.message);
  console.log('\n💡 Install adm-zip: npm install adm-zip');
}
