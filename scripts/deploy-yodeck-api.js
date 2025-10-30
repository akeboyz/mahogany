#!/usr/bin/env node

// Yodeck API Deployment Script
// Note: This is a template - actual endpoints need to be confirmed from Yodeck API docs

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

class YodeckDeployer {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = 'https://app.yodeck.com/api';  // Verify this endpoint
    this.headers = {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Upload HTML App to Yodeck
   * @param {string} zipPath - Path to ZIP file
   * @param {Object} appConfig - App configuration
   */
  async uploadHTMLApp(zipPath, appConfig) {
    try {
      console.log('🚀 Starting Yodeck deployment...');

      // Verify ZIP file exists
      if (!fs.existsSync(zipPath)) {
        throw new Error(`ZIP file not found: ${zipPath}`);
      }

      // Read ZIP file
      const zipBuffer = fs.readFileSync(zipPath);
      console.log(`📦 ZIP file loaded: ${path.basename(zipPath)} (${zipBuffer.length} bytes)`);

      // Create form data for upload
      const formData = new FormData();
      formData.append('app_file', zipBuffer, {
        filename: path.basename(zipPath),
        contentType: 'application/zip'
      });
      formData.append('name', appConfig.name);
      formData.append('description', appConfig.description || '');
      formData.append('zoom', appConfig.zoom || '100%');

      // Upload request (endpoint needs confirmation)
      const uploadResponse = await fetch(`${this.baseURL}/custom-apps`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`
        },
        body: formData
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${uploadResponse.status} - ${errorText}`);
      }

      const uploadResult = await uploadResponse.json();
      console.log('✅ HTML App uploaded successfully');
      console.log('📱 App ID:', uploadResult.id);

      return uploadResult;

    } catch (error) {
      console.error('❌ Yodeck deployment failed:', error.message);
      throw error;
    }
  }

  /**
   * Deploy app to specific screens
   * @param {string} appId - Uploaded app ID
   * @param {Array} screenIds - Array of screen IDs to deploy to
   */
  async deployToScreens(appId, screenIds) {
    try {
      console.log(`🎯 Deploying app ${appId} to ${screenIds.length} screens...`);

      for (const screenId of screenIds) {
        const deployResponse = await fetch(`${this.baseURL}/screens/${screenId}/deploy`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            app_id: appId,
            action: 'deploy'
          })
        });

        if (!deployResponse.ok) {
          console.warn(`⚠️ Failed to deploy to screen ${screenId}`);
          continue;
        }

        console.log(`✅ Deployed to screen ${screenId}`);
      }

      // Push changes to all screens
      const pushResponse = await fetch(`${this.baseURL}/screens/push-changes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          screen_ids: screenIds
        })
      });

      if (pushResponse.ok) {
        console.log('🔄 Changes pushed to screens');
      }

    } catch (error) {
      console.error('❌ Screen deployment failed:', error.message);
      throw error;
    }
  }

  /**
   * Get list of available screens
   */
  async getScreens() {
    try {
      const response = await fetch(`${this.baseURL}/screens`, {
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to get screens: ${response.status}`);
      }

      const screens = await response.json();
      console.log(`📺 Found ${screens.length} screens`);

      return screens;

    } catch (error) {
      console.error('❌ Failed to get screens:', error.message);
      throw error;
    }
  }
}

// CLI Usage
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
Usage: node deploy-yodeck-api.js <project> <action>

Examples:
  node deploy-yodeck-api.js mahogany upload     # Upload HTML app
  node deploy-yodeck-api.js mahogany deploy     # Deploy to screens
  node deploy-yodeck-api.js mahogany full       # Upload + Deploy

Environment Variables:
  YODECK_API_TOKEN=your_api_token_here
`);
    process.exit(1);
  }

  const [projectName, action] = args;
  const apiToken = process.env.YODECK_API_TOKEN;

  if (!apiToken) {
    console.error('❌ YODECK_API_TOKEN environment variable required');
    console.error('Get your token from: https://app.yodeck.com/settings/api');
    process.exit(1);
  }

  const deployer = new YodeckDeployer(apiToken);
  const zipPath = path.join(__dirname, '..', 'deployments', 'yodeck', `${projectName}-signage.zip`);

  try {
    switch (action) {
      case 'upload':
        await deployer.uploadHTMLApp(zipPath, {
          name: `${projectName} Digital Signage`,
          description: `Signage app for ${projectName} project`,
          zoom: '100%'
        });
        break;

      case 'deploy':
        // Get screens and deploy (you'd need to specify screen IDs)
        const screens = await deployer.getScreens();
        console.log('Available screens:', screens.map(s => `${s.name} (${s.id})`));
        break;

      case 'full':
        // Upload then deploy
        const uploadResult = await deployer.uploadHTMLApp(zipPath, {
          name: `${projectName} Digital Signage`,
          description: `Signage app for ${projectName} project`,
        });

        const allScreens = await deployer.getScreens();
        if (allScreens.length > 0) {
          await deployer.deployToScreens(uploadResult.id, allScreens.map(s => s.id));
        }
        break;

      default:
        console.error('❌ Invalid action. Use: upload, deploy, or full');
        process.exit(1);
    }

    console.log('🎉 Yodeck deployment completed successfully!');

  } catch (error) {
    console.error('💥 Deployment failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { YodeckDeployer };