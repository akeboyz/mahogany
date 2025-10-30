#!/usr/bin/env node

const fetch = require('node-fetch');

const API_TOKEN = process.argv[2] || process.env.YODECK_API_TOKEN;

if (!API_TOKEN) {
  console.log('Usage: node debug-yodeck.js YOUR_TOKEN');
  process.exit(1);
}

async function debugApi() {
  const url = 'https://api.yodeck.com/v1/media';

  console.log('🔍 Debugging Yodeck API call\n');
  console.log(`URL: ${url}`);
  console.log(`Token: ${API_TOKEN.substring(0, 20)}...\n`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('\nResponse Headers:');
    response.headers.forEach((value, name) => {
      console.log(`  ${name}: ${value}`);
    });

    const text = await response.text();
    console.log('\nResponse Body (first 500 chars):');
    console.log(text.substring(0, 500));

    // Check if it's JSON
    try {
      const json = JSON.parse(text);
      console.log('\n✅ Valid JSON response!');
      console.log('Data:', JSON.stringify(json, null, 2).substring(0, 300));
    } catch (e) {
      console.log('\n❌ Not JSON - likely HTML or error page');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugApi();
