'use client';

import { useEffect, useState, useRef } from 'react';
import { Device, Playlist, PlaylistItem } from '../../../lib/types';
import { trackImpression, trackTap } from '../../../lib/analytics';
import VideoPlayer from './VideoPlayer';
import CTAOverlay from './CTAOverlay';

interface VideoLoopProps {
  device: Device;
  playlist: Playlist;
  onCTAAction: (action: string, data?: any) => void;
}

export default function VideoLoop({ device, playlist, onCTAAction }: VideoLoopProps) {
  const [currentItemKey, setCurrentItemKey] = useState<string>('');
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Determine current daypart based on time
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    let activeItems: string[] = [];
    
    for (const daypart of playlist.dayparts) {
      if (currentTime >= daypart.start && currentTime <= daypart.end) {
        activeItems = daypart.items;
        break;
      }
    }
    
    // Fallback to first daypart if no match
    if (activeItems.length === 0 && playlist.dayparts.length > 0) {
      activeItems = playlist.dayparts[0].items;
    }
    
    setCurrentItems(activeItems);
    if (activeItems.length > 0) {
      setCurrentItemKey(activeItems[0]);
      setCurrentIndex(0);
    }
  }, [playlist]);

  useEffect(() => {
    if (currentItems.length === 0) return;

    const currentItem = playlist.items[currentItemKey];
    if (!currentItem) return;

    // Track impression
    trackImpression(device.device_id, currentItemKey);

    // Set timer for next video
    timerRef.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % currentItems.length;
      setCurrentIndex(nextIndex);
      setCurrentItemKey(currentItems[nextIndex]);
    }, currentItem.duration * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentItemKey, currentItems, currentIndex, device.device_id, playlist.items]);

  const handleCTAClick = (cta: PlaylistItem['cta']) => {
    if (!cta) return;
    
    trackTap(device.device_id, cta.open);
    onCTAAction(cta.open, cta);
  };

  const currentItem = playlist.items[currentItemKey];

  if (!currentItem) {
    return (
      <div className="kiosk-layout flex items-center justify-center">
        <div className="text-2xl">No content available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <VideoPlayer
        src={currentItem.src}
        poster="/placeholder-video.jpg"
      />
      
      {currentItem.cta && (
        <CTAOverlay
          cta={currentItem.cta}
          onClick={() => handleCTAClick(currentItem.cta)}
          device={device}
        />
      )}
      
      <div className="absolute bottom-4 left-4 text-sm opacity-50">
        {currentIndex + 1} / {currentItems.length}
      </div>
    </div>
  );
}