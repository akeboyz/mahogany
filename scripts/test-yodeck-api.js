#!/usr/bin/env node

const fetch = require('node-fetch');

const API_TOKEN = process.argv[2] || process.env.YODECK_API_TOKEN;

if (!API_TOKEN) {
  console.log('Usage: node test-yodeck-api.js YOUR_TOKEN');
  process.exit(1);
}

// Try different API base URLs and endpoints
const testCases = [
  { base: 'https://app.yodeck.com/api/v1', endpoints: ['/media', '/apps', '/account', '/content'] },
  { base: 'https://app.yodeck.com/api', endpoints: ['/media', '/apps', '/account', '/content'] },
  { base: 'https://api.yodeck.com/v1', endpoints: ['/media', '/apps', '/account', '/content'] },
  { base: 'https://api.yodeck.com', endpoints: ['/media', '/apps', '/account', '/content'] }
];

async function testEndpoint(base, endpoint) {
  try {
    const url = `${base}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    const status = response.status;
    let result = { url, status };

    if (response.ok) {
      try {
        const data = await response.json();
        result.success = true;
        result.data = data;
      } catch (e) {
        result.success = true;
        result.note = 'Success but non-JSON response';
      }
    } else if (status === 401 || status === 403) {
      result.note = 'Auth issue';
    } else if (status === 404) {
      result.note = 'Not found';
    } else {
      try {
        const text = await response.text();
        result.error = text.substring(0, 100);
      } catch (e) {}
    }

    return result;
  } catch (error) {
    return { url: `${base}${endpoint}`, error: error.message };
  }
}

async function runTests() {
  console.log('🔍 Testing Yodeck API endpoints...\n');
  console.log(`Token: ${API_TOKEN.substring(0, 20)}...\n`);

  for (const testCase of testCases) {
    console.log(`\n📍 Testing base: ${testCase.base}`);
    console.log('─'.repeat(60));

    for (const endpoint of testCase.endpoints) {
      const result = await testEndpoint(testCase.base, endpoint);

      if (result.success) {
        console.log(`✅ ${endpoint.padEnd(20)} → ${result.status} SUCCESS`);
        if (result.data && typeof result.data === 'object') {
          const keys = Object.keys(result.data);
          if (keys.length > 0) {
            console.log(`   Response keys: ${keys.slice(0, 5).join(', ')}`);
          }
        }
      } else if (result.note === 'Auth issue') {
        console.log(`⚠️  ${endpoint.padEnd(20)} → ${result.status} (Check token permissions)`);
      } else if (result.note === 'Not found') {
        console.log(`❌ ${endpoint.padEnd(20)} → ${result.status} Not Found`);
      } else if (result.error) {
        console.log(`💥 ${endpoint.padEnd(20)} → Error: ${result.error}`);
      } else {
        console.log(`❓ ${endpoint.padEnd(20)} → ${result.status}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('💡 Tip: Look for the base URL with ✅ SUCCESS responses');
  console.log('    That\'s the correct API base to use!');
}

runTests();
