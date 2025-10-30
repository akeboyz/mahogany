import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    server: 'Next.js 14',
    message: 'Digital Signage System is running!'
  });
}