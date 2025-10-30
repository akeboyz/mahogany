'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SearchSection() {
  const [selectedCategory, setSelectedCategory] = useState('condo');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    let targetUrl = '/';
    
    switch(selectedCategory) {
      case 'condo':
        targetUrl = '/condo';
        break;
      case 'foodies':
        targetUrl = '/foodies';
        break;
      case 'marketplace':
        targetUrl = '/marketplace';
        break;
    }

    if (searchKeyword.length > 0) {
      targetUrl += `?q=${encodeURIComponent(searchKeyword)}`;
      if (searchLocation.length > 0) {
        targetUrl += `&location=${encodeURIComponent(searchLocation)}`;
      }
    } else if (searchLocation.length > 0) {
      targetUrl += `?location=${encodeURIComponent(searchLocation)}`;
    }

    window.location.href = targetUrl;
  };

  return (
    <section 
      className="relative min-h-[65vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/center/images/search-bg.jpeg')"
      }}
    >
      {/* Search Title */}
      <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-semibold pointer-events-none z-10"
           style={{ textShadow: '0 0 8px rgba(0,0,0,0.7)' }}>
        find anything...
      </div>

      {/* Search Container */}
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl z-10">
        {/* Category Buttons */}
        <div className="flex mb-4">
          <button 
            onClick={() => handleCategoryClick('condo')}
            className={`px-6 py-3 font-semibold border-r border-gray-300 transition-all duration-300 ${
              selectedCategory === 'condo' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-blue-900 hover:bg-blue-50'
            }`}
          >
            Condo
          </button>
          <button 
            onClick={() => handleCategoryClick('foodies')}
            className={`px-6 py-3 font-semibold border-r border-gray-300 transition-all duration-300 ${
              selectedCategory === 'foodies' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-blue-900 hover:bg-blue-50'
            }`}
          >
            Foodies
          </button>
          <button 
            onClick={() => handleCategoryClick('marketplace')}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              selectedCategory === 'marketplace' 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-blue-900 hover:bg-blue-50'
            }`}
          >
            Marketplace
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
            <span className="text-xl mr-3">🔍</span>
            <input 
              type="text" 
              placeholder="What are you looking for? (e.g. Sushi)" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full text-blue-900 text-lg outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
            <span className="text-xl mr-3">📍</span>
            <input 
              type="text" 
              placeholder="Where (e.g. Sukhumvit 24)" 
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              list="locations"
              className="w-full text-blue-900 text-lg outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <datalist id="locations">
              <option value="Sukhumvit 24" />
              <option value="Sukhumvit 26" />
              <option value="Sukhumvit 38" />
              <option value="Sukhumvit 39" />
            </datalist>
          </div>
          <button 
            onClick={handleSearch}
            className="bg-orange-500 text-white px-8 py-3 font-bold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}