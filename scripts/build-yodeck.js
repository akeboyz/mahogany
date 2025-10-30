#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const sourceDir = path.join(__dirname, '..', 'public');
const buildDir = path.join(__dirname, '..', 'yodeck-build');
const zipPath = path.join(__dirname, '..', 'yodeck-signage-package.zip');

// Clean build directory
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true });
}
fs.mkdirSync(buildDir, { recursive: true });

// Copy all files from public directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying files...');
copyDir(sourceDir, buildDir);

// Copy ann/signage.html as index.html
const signageHtmlPath = path.join(sourceDir, 'ann', 'signage.html');
const indexHtmlPath = path.join(buildDir, 'index.html');

if (fs.existsSync(signageHtmlPath)) {
  console.log('Creating index.html from ann/signage.html...');
  let signageContent = fs.readFileSync(signageHtmlPath, 'utf8');

  // Update relative paths to work from root
  signageContent = signageContent
    .replace(/src="\.\/data\//g, 'src="ann/data/')
    .replace(/href="\.\/data\//g, 'href="ann/data/')
    .replace(/fetch\('\.\/data\//g, "fetch('ann/data/")
    .replace(/src="\.\/medias\//g, 'src="ann/medias/')
    .replace(/href="\.\/medias\//g, 'href="ann/medias/')
    .replace(/\.\/menu\.html/g, 'ann/menu.html')
    .replace(/\.\/category\.html/g, 'ann/category.html')
    .replace(/\.\/product\.html/g, 'ann/product.html');

  fs.writeFileSync(indexHtmlPath, signageContent);
  console.log('index.html created successfully');
} else {
  console.error('ann/signage.html not found!');
  process.exit(1);
}

// Create ZIP file
console.log('Creating ZIP file...');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Yodeck package created: ${zipPath}`);
  console.log(`Total bytes: ${archive.pointer()}`);
  console.log('\nReady for Yodeck upload!');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(buildDir, false);
archive.finalize();