'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Device } from '@/lib/types';

interface QRHandoffProps {
  device: Device;
  currentRoute: string;
  params?: Record<string, string>;
}

export default function QRHandoff({ device, currentRoute, params = {} }: QRHandoffProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const lang = device.app_config.lang_default;

  useEffect(() => {
    const generateQR = async () => {
      try {
        const baseUrl = device.app_config.qr_base_url || process.env.PLAYER_QR_BASE || 'https://aquamx.biz/kiosk';
        const paramString = new URLSearchParams(params).toString();
        const fullUrl = `${baseUrl}${currentRoute}${paramString ? '?' + paramString : ''}`;
        
        const qrUrl = await QRCode.toDataURL(fullUrl, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
        
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    };

    generateQR();
  }, [device, currentRoute, params]);

  if (!qrCodeUrl) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse bg-gray-700 w-32 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="bg-white p-4 rounded-xl inline-block mb-4">
        <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
      </div>
      
      <p className="text-sm text-gray-400 max-w-xs">
        {lang === 'th' 
          ? 'สแกน QR Code เพื่อดูข้อมูลบนมือถือ'
          : 'Scan QR Code to view on mobile'
        }
      </p>
    </div>
  );
}