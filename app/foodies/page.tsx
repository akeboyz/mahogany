'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';

interface Restaurant {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  price: string;
  description: string;
  images: string[];
}

export default function FoodiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const addSearchTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase();
    if (cleanTag && !searchTags.includes(cleanTag)) {
      setSearchTags([...searchTags, cleanTag]);
    }
    setSearchInput('');
  };

  const removeSearchTag = (tagToRemove: string) => {
    setSearchTags(searchTags.filter((tag: string) => tag !== tagToRemove));
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      addSearchTag(searchInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Sushi Hiro',
      category: 'Japanese',
      location: 'Sukhumvit 24',
      rating: 4.8,
      price: '$$$$',
      description: 'Authentic Japanese sushi with fresh ingredients',
      images: [
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1563612892811-fc75ba04521c?w=300&h=200&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'After You',
      category: 'Dessert & Cafe',
      location: 'Sukhumvit 26',
      rating: 4.5,
      price: '$$',
      description: 'Famous Thai dessert chain with signature honey toast',
      images: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Fire Tiger',
      category: 'Thai BBQ',
      location: 'Sukhumvit 38',
      rating: 4.6,
      price: '$$$',
      description: 'Premium Thai BBQ with authentic flavors',
      images: [
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop'
      ]
    },
    {
      id: 4,
      name: 'Pasta Fresca',
      category: 'Italian',
      location: 'Sukhumvit 39',
      rating: 4.7,
      price: '$$$',
      description: 'Fresh Italian pasta and authentic recipes',
      images: [
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=300&h=200&fit=crop'
      ]
    },
    {
      id: 5,
      name: 'Banana Leaf',
      category: 'Indian',
      location: 'Sukhumvit 24',
      rating: 4.4,
      price: '$$',
      description: 'Traditional Indian cuisine with aromatic spices',
      images: [
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&h=200&fit=crop'
      ]
    },
    {
      id: 6,
      name: 'Burger House',
      category: 'American',
      location: 'Sukhumvit 26',
      rating: 4.3,
      price: '$$',
      description: 'Gourmet burgers with premium ingredients',
      images: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1550317138-10000687a72b?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop'
      ]
    }
  ];

  return (
    <div>
      <Header currentPage="foodies" />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Foodies</h1>
            <p className="text-gray-600">Discover amazing restaurants and culinary experiences</p>
          </div>

          {/* Project Overview - Search Section */}
          <div className="bg-gray-50 -mx-4 px-4 py-8 mb-8">
            <div className="max-w-4xl mx-auto">
              {/* Category Buttons */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-white rounded-lg shadow-sm border overflow-hidden">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-3 font-semibold transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedCategory('walk_in')}
                    className={`px-6 py-3 font-semibold transition-colors border-l ${
                      selectedCategory === 'walk_in'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    Walk-in
                  </button>
                  <button
                    onClick={() => setSelectedCategory('delivery')}
                    className={`px-6 py-3 font-semibold transition-colors border-l ${
                      selectedCategory === 'delivery'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-900 hover:bg-blue-50'
                    }`}
                  >
                    Delivery
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
                <div className="flex">
                  <div className="flex-1 flex items-center px-4 border-r">
                    <span className="mr-3 text-gray-500">🔍</span>
                    <input
                      type="text"
                      placeholder="Restaurant, Cuisine, Address, Anything…"
                      value={searchInput}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full p-2 border-none outline-none text-blue-900 font-medium"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white px-8 py-3 font-bold hover:bg-orange-600 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Search Tags */}
              {searchTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {searchTags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => removeSearchTag(tag)}
                        className="text-white hover:text-gray-200 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-4">Restaurants</h2>
            <p className="text-gray-600 text-center">{restaurants.length} restaurants found</p>
          </div>

          {/* Restaurant Listings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {restaurants.map((restaurant: Restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {/* Restaurant Image Slider */}
                <div className="relative h-48">
                  <ImageSlider 
                    images={restaurant.images} 
                    alt={restaurant.name}
                    className="w-full h-full"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-0 bg-orange-500 text-white px-4 py-1 rounded-r-lg font-bold text-sm z-20">
                    {restaurant.category}
                  </div>
                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-semibold z-20">
                    ⭐ {restaurant.rating}
                  </div>
                  {/* Restaurant Info Overlay */}
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <div className="font-bold text-sm drop-shadow-lg">{restaurant.name}</div>
                    <div className="text-xs drop-shadow-lg">{restaurant.price}</div>
                  </div>
                </div>

                {/* Restaurant Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-blue-900">{restaurant.name}</h3>
                    <span className="text-green-600 font-bold">{restaurant.price}</span>
                  </div>
                  
                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{restaurant.location}</span>
                    </div>
                    <p className="text-sm">{restaurant.description}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/foodies/${restaurant.id}`}
                      className="text-blue-900 font-semibold underline hover:text-blue-700"
                    >
                      View Details →
                    </Link>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Categories */}
          <section className="mt-16 py-12 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">Popular Cuisines</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🍱</div>
                <h3 className="font-semibold text-blue-900">Japanese</h3>
                <p className="text-sm text-gray-600">12 restaurants</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🍜</div>
                <h3 className="font-semibold text-blue-900">Thai</h3>
                <p className="text-sm text-gray-600">8 restaurants</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🍝</div>
                <h3 className="font-semibold text-blue-900">Italian</h3>
                <p className="text-sm text-gray-600">6 restaurants</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🍛</div>
                <h3 className="font-semibold text-blue-900">Indian</h3>
                <p className="text-sm text-gray-600">4 restaurants</p>
              </div>
            </div>
          </section>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Load More Restaurants
            </button>
          </div>

          {/* Back to Digital Signage */}
          <div className="mt-12 p-6 bg-blue-900 text-white rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Digital Signage System</h3>
            <p className="mb-4">Access the digital signage player and admin panel</p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/player?device=NRF-26-L1-01"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Player Demo
              </Link>
              <Link 
                href="/admin"
                className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}