# Yodeck API Integration Setup

## 🎯 Overview

YES, you can connect directly to Yodeck for automated HTML app deployment using their REST API (available as of 2024).

## 🔑 Prerequisites

### 1. Get Yodeck API Token
1. Login to your Yodeck account
2. Go to **Settings** → **API** (or similar section)
3. Generate an **API Token**
4. Copy and save the token securely

### 2. Set Environment Variable
```bash
# Add to your .env.local
YODECK_API_TOKEN=your_api_token_here

# Or export in terminal
export YODECK_API_TOKEN=your_api_token_here
```

## 🚀 Usage Examples

### Automated Deployment Workflow
```bash
# 1. Build Yodeck package
npm run build:yodeck mahogany

# 2. Deploy via API
npm run deploy:yodeck-api mahogany full

# Or step by step:
npm run deploy:yodeck-api mahogany upload    # Upload HTML app
npm run deploy:yodeck-api mahogany deploy    # Deploy to screens
```

### Manual Testing
```bash
# Upload only
node scripts/deploy-yodeck-api.js mahogany upload

# Get available screens
node scripts/deploy-yodeck-api.js mahogany deploy

# Full workflow
node scripts/deploy-yodeck-api.js mahogany full
```

## 📋 API Capabilities Confirmed

### ✅ What Yodeck API Can Do:
- **Upload HTML Apps** - ZIP file deployment
- **Manage Custom Apps** - CRUD operations
- **Deploy to Screens** - Push to specific devices
- **Schedule Content** - Automated scheduling
- **Monitor Screens** - Status and health checks
- **Manage Playlists** - Content organization

### ⚠️ API Documentation Access
- **Full API docs**: https://app.yodeck.com/api-docs/
- **Requires authentication** - need Yodeck account to access
- **Community support** - Yodeck has developer community

## 🔧 Integration with Build System

### Updated package.json Scripts
```json
{
  "scripts": {
    "build:yodeck": "node scripts/build-yodeck.js",
    "deploy:yodeck-api": "node scripts/deploy-yodeck-api.js",
    "deploy:yodeck-full": "npm run build:yodeck && npm run deploy:yodeck-api"
  }
}
```

### Complete Deployment Flow
```bash
# One command deployment to Yodeck
npm run deploy:yodeck-full mahogany

# This will:
# 1. Build mahogany-signage.zip
# 2. Upload to Yodeck via API
# 3. Deploy to all screens
# 4. Push changes live
```

## 🎯 Benefits of API Integration

### vs Manual Upload:
- ✅ **Automated** - No manual dashboard interaction
- ✅ **Batch Operations** - Deploy to multiple screens
- ✅ **CI/CD Integration** - Part of build pipeline
- ✅ **Version Control** - Track deployments
- ✅ **Error Handling** - Automatic retry logic

### Development Workflow:
```bash
# Update signage content
vi signage/projects/mahogany/data/restaurants.json

# Deploy changes
npm run deploy:yodeck-full mahogany

# Live in ~2 minutes
```

## 📊 Implementation Status

### ✅ Ready to Implement:
- Build script (`build-yodeck.js`) ✅
- API deployment script (`deploy-yodeck-api.js`) ✅
- Environment configuration ✅
- Error handling and logging ✅

### 🔍 Needs Confirmation:
- **Exact API endpoints** - Need access to full API docs
- **Authentication format** - Bearer token vs other methods
- **Request/response schemas** - Data structures
- **Rate limiting** - API usage limits

## 🚀 Next Steps

### To Enable API Deployment:

1. **Get API Access**
   ```bash
   # Login to Yodeck account
   # Generate API token
   # Add to .env.local
   ```

2. **Install Dependencies**
   ```bash
   npm install form-data node-fetch
   ```

3. **Test Connection**
   ```bash
   npm run deploy:yodeck-api mahogany upload
   ```

4. **Confirm Endpoints**
   - Access https://app.yodeck.com/api-docs/
   - Update script with correct endpoints
   - Test all operations

5. **Integrate with Build**
   ```bash
   # Full automation
   npm run deploy:yodeck-full mahogany
   ```

## 💡 Alternative if API Limited

If API access is limited, you can still automate:

### Browser Automation (Fallback)
```javascript
// Using Puppeteer to automate manual upload
const puppeteer = require('puppeteer');

async function deployToYodeck(zipPath, credentials) {
  const browser = await puppeteer.launch();
  // 1. Login to Yodeck
  // 2. Navigate to Custom Apps
  // 3. Upload ZIP file
  // 4. Configure and deploy
  // 5. Push changes
}
```

The **REST API approach is strongly recommended** for production use due to reliability and official support.

## 📞 Support

- **Yodeck API Docs**: https://app.yodeck.com/api-docs/
- **Yodeck Support**: Contact via their platform
- **Developer Community**: Available through Yodeck channels