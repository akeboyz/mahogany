'use client';

import { useEffect, useRef } from 'react';

interface IdleTimerProps {
  timeout: number;
  onTimeout: () => void;
}

export default function IdleTimer({ timeout, onTimeout }: IdleTimerProps) {
  const timerRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      onTimeout();
    }, timeout);
  };

  useEffect(() => {
    resetTimer();

    const events = ['click', 'touchstart', 'touchend', 'mousemove', 'keypress'];
    
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [timeout, onTimeout]);

  return null;
}