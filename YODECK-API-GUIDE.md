# Yodeck API Upload Guide

## Quick Start (Premium/Enterprise Account Required)

### Step 1: Get Your API Token

1. Log into https://app.yodeck.com
2. Go to **Account Settings** → **Advanced Settings** → **API Tokens**
3. Click **Generate Token** and name it (e.g., "Mahogany Deploy")
4. **Copy the token immediately** (it won't be shown again!)

### Step 2: Set Environment Variable

**Windows Command Prompt:**
```cmd
set YODECK_API_TOKEN=your_token_here && npm run deploy:yodeck
```

**Windows PowerShell:**
```powershell
$env:YODECK_API_TOKEN="your_token_here"; npm run deploy:yodeck
```

**Or create `.env.yodeck` file:**
```env
YODECK_API_TOKEN=your_token_here
```

### Step 3: Run Upload

```bash
npm run deploy:yodeck
```

The script will:
1. ✅ Verify your API token
2. 📦 Create a ZIP of `public/deploy/prj004-mahogany/`
3. ⬆️ Upload to Yodeck servers
4. 🎉 Return the Media ID

### Step 4: Use in Yodeck

1. Go to https://app.yodeck.com/media
2. Find "Mahogany Digital Signage" in your media library
3. Add it to a playlist
4. Deploy to your screens

## Benefits Over Manual Upload

- ✅ No manual ZIP creation
- ✅ No browser upload needed
- ✅ Can integrate into CI/CD pipelines
- ✅ Automatic version management
- ✅ Scriptable deployments

## Troubleshooting

### "YODECK_API_TOKEN not set"
Make sure you set the environment variable before running the script.

### "Token verification failed"
- Check token is correct (no extra spaces)
- Verify Premium/Enterprise account status
- Generate a new token if needed

### "Upload failed"
- Check internet connection
- Verify deployment folder exists
- Check Yodeck API status

## What Gets Uploaded

```
prj004-mahogany/
├── index.html          # Main signage player
├── data/
│   ├── playlist.json   # Content schedule
│   ├── medias.json     # Media metadata
│   └── announce.json   # Announcements
├── images/
│   └── announcements/  # Announcement images
├── medias/             # Video files
└── version.txt         # Version tracking
```

## API Documentation

Full docs: https://app.yodeck.com/api-docs/ (login required)
