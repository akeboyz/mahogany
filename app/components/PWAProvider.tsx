'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/sw-registration';

export default function PWAProvider() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}