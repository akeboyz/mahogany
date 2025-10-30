'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'Condo', href: '/condo' },
    { name: 'Foodies', href: '/foodies' },
    { name: 'Marketplace', href: '/marketplace' },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 relative">
        <Link href="/" className="flex items-center ml-2">
          <img src="/center/images/logo.png" alt="AquaMx Logo" className="h-8 mr-2" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className={`font-semibold text-lg hover:text-blue-700 transition-colors ${
                currentPage === item.name.toLowerCase() 
                  ? 'text-blue-800 border-b-2 border-blue-800' 
                  : 'text-blue-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-blue-900 font-bold cursor-pointer">TH / EN</div>
          <div 
            className="md:hidden text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          >
            &#9776;
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 md:hidden">
            <div className="py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-6 py-3 font-semibold hover:bg-gray-50 transition-colors ${
                    currentPage === item.name.toLowerCase() 
                      ? 'text-blue-800 bg-blue-50' 
                      : 'text-blue-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}