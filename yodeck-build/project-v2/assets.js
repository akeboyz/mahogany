/**
 * Unified Asset Path Resolver v2.0
 * Handles all asset paths consistently across environments
 */

// Environment detection
const ENV = {
  isYodeck: window.location.protocol === 'file:' ||
            window.navigator.userAgent.includes('Yodeck') ||
            window.location.hostname === '',
  isNetlify: window.location.hostname.includes('netlify'),
  isDevelopment: window.location.hostname === 'localhost',
  isProduction: !window.location.hostname.includes('localhost') &&
                !window.location.hostname.includes('netlify') &&
                window.location.protocol !== 'file:'
};

// Asset type configurations
const ASSET_CONFIG = {
  media: ENV.isYodeck ? './assets/medias/' : '/project-v2/assets/medias/',
  logo: ENV.isYodeck ? './assets/medias/' : '/project-v2/assets/medias/',
  video: ENV.isYodeck ? './assets/medias/' : '/project-v2/assets/medias/',
  thumb: ENV.isYodeck ? './assets/thumbs/' : '/project-v2/assets/thumbs/',
  image: ENV.isYodeck ? './assets/medias/' : '/project-v2/assets/medias/'
};

/**
 * Get asset URL for any file
 * @param {string} filename - Just the filename (e.g., "logo.png")
 * @param {string} type - Asset type: media, logo, video, thumb, image
 * @returns {string} Complete asset URL
 */
function asset(filename, type = 'media') {
  if (!filename) return '';

  // Already a full URL
  if (filename.startsWith('http') || filename.startsWith('https')) {
    return filename;
  }

  // Already an absolute path
  if (filename.startsWith('/')) {
    return filename;
  }

  // Get base path for asset type
  const basePath = ASSET_CONFIG[type] || ASSET_CONFIG.media;

  return basePath + filename;
}

/**
 * Preload asset for better performance
 * @param {string} filename
 * @param {string} type
 * @param {string} asType - 'image', 'video', 'audio'
 */
function preloadAsset(filename, type = 'media', asType = 'image') {
  const url = asset(filename, type);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = asType;
  document.head.appendChild(link);
}

/**
 * Check if asset exists (for fallback handling)
 * @param {string} filename
 * @param {string} type
 * @returns {Promise<boolean>}
 */
async function assetExists(filename, type = 'media') {
  try {
    const response = await fetch(asset(filename, type), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Debug info
console.log('🎯 Asset Resolver v2.0 Loaded');
console.log('📍 Environment:', ENV);
console.log('📁 Asset Config:', ASSET_CONFIG);

// Export for use in other scripts
window.asset = asset;
window.preloadAsset = preloadAsset;
window.assetExists = assetExists;
window.ENV = ENV;