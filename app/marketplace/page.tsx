import Link from 'next/link';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';

export default function MarketplacePage() {
  const products = [
    {
      id: 1,
      name: 'Laundry Detergent',
      category: 'Household',
      price: '299 THB',
      originalPrice: '399 THB',
      brand: 'CleanFresh',
      rating: 4.6,
      inStock: true,
      images: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=250&h=250&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'Premium Dog Food',
      category: 'Pet Supplies',
      price: '1,299 THB',
      originalPrice: '1,599 THB',
      brand: 'PetNutrition',
      rating: 4.8,
      inStock: true,
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1605594420084-0e0ba0d3f7e8?w=250&h=250&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Office Paper A4',
      category: 'Office Supplies',
      price: '189 THB',
      originalPrice: '249 THB',
      brand: 'PaperPro',
      rating: 4.3,
      inStock: true,
      images: [
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=250&h=250&fit=crop'
      ]
    },
    {
      id: 4,
      name: 'Hand Sanitizer',
      category: 'Health & Beauty',
      price: '89 THB',
      originalPrice: '129 THB',
      brand: 'SafeHands',
      rating: 4.5,
      inStock: false,
      images: [
        'https://images.unsplash.com/photo-1556909075-f3e64d0ad1a4?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=250&h=250&fit=crop'
      ]
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: '2,499 THB',
      originalPrice: '3,299 THB',
      brand: 'SoundMax',
      rating: 4.7,
      inStock: true,
      images: [
        'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1491927570842-0261e477d937?w=250&h=250&fit=crop'
      ]
    },
    {
      id: 6,
      name: 'Organic Coffee Beans',
      category: 'Food & Beverage',
      price: '450 THB',
      originalPrice: '580 THB',
      brand: 'CoffeePlus',
      rating: 4.9,
      inStock: true,
      images: [
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=250&h=250&fit=crop',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=250&h=250&fit=crop'
      ]
    }
  ];

  const categories = [
    { name: 'Household', icon: '🏠', count: 45 },
    { name: 'Pet Supplies', icon: '🐕', count: 23 },
    { name: 'Office Supplies', icon: '📋', count: 38 },
    { name: 'Health & Beauty', icon: '💄', count: 29 },
    { name: 'Electronics', icon: '📱', count: 15 },
    { name: 'Food & Beverage', icon: '🍕', count: 52 },
    { name: 'Sports & Outdoor', icon: '⚽', count: 18 },
    { name: 'Fashion', icon: '👕', count: 34 }
  ];

  return (
    <div>
      <Header currentPage="marketplace" />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Marketplace</h1>
            <p className="text-gray-600">Shop from a wide variety of products and brands</p>
          </div>

          {/* Categories Grid */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Shop by Category</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="text-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-xs font-medium text-blue-900">{category.name}</div>
                  <div className="text-xs text-gray-500">({category.count})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search/Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <input 
                  type="text" 
                  placeholder="Search for products..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Categories</option>
                  <option>Household</option>
                  <option>Pet Supplies</option>
                  <option>Office Supplies</option>
                  <option>Health & Beauty</option>
                  <option>Electronics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any Price</option>
                  <option>Under 100 THB</option>
                  <option>100 - 500 THB</option>
                  <option>500 - 1,000 THB</option>
                  <option>Above 1,000 THB</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Search Products
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">{products.length} products found</p>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">📋</button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-blue-50">⊞</button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image Slider */}
                <div className="relative h-48">
                  <ImageSlider 
                    images={product.images} 
                    alt={product.name}
                    className="w-full h-full"
                  />
                  {/* Discount Badge */}
                  {product.originalPrice !== product.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold z-20">
                      SALE
                    </div>
                  )}
                  {/* Brand Overlay */}
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <div className="font-bold text-sm drop-shadow-lg">{product.name}</div>
                    <div className="text-xs drop-shadow-lg">{product.brand}</div>
                  </div>
                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
                      <div className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-bold text-blue-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-400 ml-2">({Math.floor(Math.random() * 100 + 20)} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-green-600">{product.price}</span>
                      {product.originalPrice !== product.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                        product.inStock 
                          ? 'bg-orange-500 text-white hover:bg-orange-600' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Load More Products
            </button>
          </div>

          {/* Featured Deals */}
          <section className="mt-16 py-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">Today's Special Deals</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="font-semibold text-blue-900">Flash Sale</h3>
                <p className="text-sm text-gray-600">Up to 70% off</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📦</div>
                <h3 className="font-semibold text-blue-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">Orders over 500 THB</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="font-semibold text-blue-900">Bundle Deals</h3>
                <p className="text-sm text-gray-600">Buy 2 Get 1 Free</p>
              </div>
            </div>
          </section>

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