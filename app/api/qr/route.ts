import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const { url, size = 256 } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const qrDataUrl = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    return NextResponse.json({ qrCode: qrDataUrl });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}