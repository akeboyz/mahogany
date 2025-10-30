'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    // Check if src is HLS
    const isHLS = src.includes('.m3u8');
    
    if (isHLS && Hls.isSupported()) {
      // Use hls.js for HLS playback
      hlsRef.current = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      
      hlsRef.current.loadSource(src);
      hlsRef.current.attachMedia(video);
      
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(console.error);
      });
      
      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS Fatal Error:', data);
          // Fallback to direct MP4 if available
          if (src.includes('.m3u8')) {
            video.src = src.replace('.m3u8', '.mp4');
            video.play().catch(console.error);
          }
        }
      });
    } else if (isHLS && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      video.play().catch(console.error);
    } else {
      // Direct MP4 playback
      const mp4Src = isHLS ? src.replace('.m3u8', '.mp4') : src;
      video.src = mp4Src;
      video.play().catch(console.error);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
        poster={poster}
        onEnded={() => {
          // Video will be changed by parent component timer
        }}
      />
    </div>
  );
}