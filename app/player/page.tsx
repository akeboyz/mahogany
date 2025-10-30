'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PlayerPage() {
  const searchParams = useSearchParams();
  const deviceId = searchParams.get('device');
  const [currentView, setCurrentView] = useState<'demo' | 'menu'>('demo');

  if (!deviceId) {
    return (
      <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">❌ No Device ID</h1>
          <p className="text-gray-400">Please add ?device=DEVICE_ID to the URL</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      {currentView === 'demo' ? (
        <DemoVideo deviceId={deviceId} onMenuOpen={() => setCurrentView('menu')} />
      ) : (
        <MainMenu deviceId={deviceId} onBack={() => setCurrentView('demo')} />
      )}
    </div>
  );
}

function DemoVideo({ deviceId, onMenuOpen }: { deviceId: string; onMenuOpen: () => void }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎬 Digital Signage Player</h1>
        <p className="text-xl mb-2">Device: {deviceId}</p>
        <p className="text-gray-300 mb-8">Demo video loop running...</p>
        
        {/* CTA Button */}
        <button
          onClick={onMenuOpen}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-200 hover:scale-105"
        >
          👆 Touch for Main Menu
        </button>
      </div>
      
      {/* Status indicator */}
      <div className="absolute bottom-4 left-4 text-sm opacity-75">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live • {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

function MainMenu({ deviceId, onBack }: { deviceId: string; onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const menuItems = [
    { id: 'dine', label: '🍽️ Dine', color: 'bg-orange-600 hover:bg-orange-700' },
    { id: 'marketplace', label: '🛍️ Marketplace', color: 'bg-green-600 hover:bg-green-700' },
    { id: 'property', label: '🏢 Property', color: 'bg-blue-600 hover:bg-blue-700' },
  ];

  if (selectedCategory) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-center">
        <h1 className="text-3xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-xl text-gray-300 mb-8">{menuItems.find(item => item.id === selectedCategory)?.label} features</p>
        <button
          onClick={() => setSelectedCategory(null)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
        >
          ← Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <span>← Back</span>
        </button>
        <h1 className="text-2xl font-bold">Main Menu</h1>
        <div className="text-sm text-gray-400">Device: {deviceId}</div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-1 gap-6 w-full max-w-md">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`${item.color} text-white p-8 rounded-xl text-center shadow-xl transition-all duration-200 hover:scale-105`}
            >
              <div className="text-2xl font-bold">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-return notice */}
      <div className="p-4 text-center text-gray-500 text-sm">
        Will return to video in 45 seconds of inactivity
      </div>
    </div>
  );
}