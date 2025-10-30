'use client';

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, inform user
                  console.log('New content available! Please refresh.');
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export const sendMessageToSW = (message: any) => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
};

export const prefetchPlaylist = (playlistId: string) => {
  sendMessageToSW({
    type: 'PREFETCH_PLAYLIST',
    playlistId
  });
};

export const cacheVideo = (videoUrl: string) => {
  sendMessageToSW({
    type: 'CACHE_VIDEO',
    videoUrl
  });
};

export const clearCache = () => {
  sendMessageToSW({
    type: 'CLEAR_CACHE'
  });
};