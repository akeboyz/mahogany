/**
 * QR Code Pre-Generation Script for Yodeck Deployment
 * Generates QR codes for all restaurant/shop locations offline
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const DATA_DIR = path.join(__dirname, '../public/data');
const QR_OUTPUT_DIR = path.join(__dirname, '../public/images/qr-codes');
const QR_API_BASE = 'https://api.qrserver.com/v1/create-qr-code/';

// Ensure QR output directory exists
if (!fs.existsSync(QR_OUTPUT_DIR)) {
  fs.mkdirSync(QR_OUTPUT_DIR, { recursive: true });
}

// Helper function to generate Map URL
function generateMapUrl(product) {
  if (product.coordinates) {
    return `https://maps.google.com/maps?q=${product.coordinates.lat},${product.coordinates.lng}`;
  }

  if (product.map_embed_url) {
    // Extract from Google Maps embed URL
    const qMatch = product.map_embed_url.match(/[?&]q=([^&]*)/);
    const pbMatch = product.map_embed_url.match(/!2d([0-9.-]+)!3d([0-9.-]+)/);

    if (qMatch) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(qMatch[1])}`;
    } else if (pbMatch) {
      const lng = pbMatch[1];
      const lat = pbMatch[2];
      return `https://maps.google.com/maps?q=${lat},${lng}`;
    }
  }

  if (product.address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(product.address)}`;
  }

  return null;
}

// Download QR code
function downloadQRCode(url, filename) {
  return new Promise((resolve, reject) => {
    const qrUrl = `${QR_API_BASE}?size=160x160&data=${encodeURIComponent(url)}`;
    const filepath = path.join(QR_OUTPUT_DIR, filename);

    console.log(`Generating QR for: ${filename}`);

    const file = fs.createWriteStream(filepath);

    https.get(qrUrl, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Generated: ${filename}`);
          resolve(filepath);
        });
      } else {
        file.close();
        fs.unlinkSync(filepath); // Delete the file async
        reject(new Error(`Failed to download QR code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(filepath); // Delete the file async
      reject(err);
    });
  });
}

// Process data files
async function generateQRCodes() {
  console.log('🎯 Starting QR code generation...\n');

  const dataFiles = [
    { file: 'rest.json', key: 'restaurants', type: 'rest' },
    { file: 'shop.json', key: 'shops', type: 'shop' },
    { file: 'unit.json', key: 'units', type: 'unit' }
  ];

  let totalGenerated = 0;
  let errors = [];

  for (const { file, key, type } of dataFiles) {
    const filepath = path.join(DATA_DIR, file);

    if (!fs.existsSync(filepath)) {
      console.log(`⚠️  Skipping ${file} - file not found`);
      continue;
    }

    try {
      const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      const items = Array.isArray(data) ? data : (data[key] || []);

      console.log(`📁 Processing ${file} (${items.length} items)`);

      for (const item of items) {
        const mapUrl = generateMapUrl(item);

        if (mapUrl) {
          const itemId = item.id || item.unit_id || item.name_en?.toLowerCase().replace(/[^a-z0-9]/g, '-');
          const filename = `${type}-${itemId}-map.png`;

          try {
            await downloadQRCode(mapUrl, filename);
            // Add small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
            totalGenerated++;
          } catch (err) {
            errors.push(`${filename}: ${err.message}`);
          }
        } else {
          console.log(`⚠️  No map data for ${item.name_en || item.name_th || 'Unknown'}`);
        }
      }

      console.log('');
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
      errors.push(`${file}: ${err.message}`);
    }
  }

  // Generate summary report
  const reportPath = path.join(QR_OUTPUT_DIR, 'generation-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    totalGenerated,
    errors,
    outputDirectory: QR_OUTPUT_DIR
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('📊 QR Code Generation Summary:');
  console.log(`✓ Successfully generated: ${totalGenerated} QR codes`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`📁 Output directory: ${QR_OUTPUT_DIR}`);
  console.log(`📄 Full report: ${reportPath}`);

  if (errors.length > 0) {
    console.log('\n🔍 Errors encountered:');
    errors.forEach(error => console.log(`  • ${error}`));
  }

  console.log('\n🎉 QR code generation completed!');
}

// Run the script
generateQRCodes().catch(console.error);