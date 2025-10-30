'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  price: string;
  originalPrice: string;
  brand: string;
  rating: number;
  inStock: boolean;
  contact: {
    phone: string;
    line: string;
  };
  serviceTypes: string[];
  status: string;
  projects: string[];
  description: string;
  images: string[];
  logo: string;
  promotions: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    image?: string;
  }[];
  mapUrl: string;
}

interface ProductData {
  [key: number]: Product;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const productData: ProductData = {
    1: {
      id: 1,
      name: 'Laundry Detergent',
      category: 'Household',
      type: 'Cleaning Supplies',
      price: '299 THB',
      originalPrice: '399 THB',
      brand: 'CleanFresh',
      rating: 4.6,
      inStock: true,
      contact: {
        phone: '02-987-6543',
        line: '@cleanfresh'
      },
      serviceTypes: ['Walk-in', 'Delivery', 'Mobile Order'],
      status: 'Available',
      projects: ['Home Care', 'Professional Cleaning'],
      description: 'Premium laundry detergent with advanced stain removal technology. Safe for all fabric types and environmentally friendly formula.',
      images: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop'
      ],
      logo: '/center/images/logo.png',
      promotions: [
        {
          title: 'Buy 2 Get 1 Free',
          description: 'Special promotion for bulk purchases',
          startDate: '2024-01-01',
          endDate: '2024-03-31',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop'
        }
      ],
      mapUrl: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Sukhumvit%2024%2C%20Bangkok%2C%20Thailand&t=&z=14&ie=UTF8&iwloc=&output=embed'
    }
  };

  const product = productData[parseInt(id as string)] || productData[1];
  const images = product.images;

  return (
    <div>
      <Header currentPage="marketplace" />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">by {product.brand}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.category}
                  </span>
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {product.rating}
                  </span>
                  {product.originalPrice !== product.price && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  ❤️ Save
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Product Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Product Info</h3>
                <table className="w-full">
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600 w-1/3">Category</td>
                      <td className="py-2 text-gray-700">{product.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Type</td>
                      <td className="py-2 text-gray-700">{product.type}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Contact</td>
                      <td className="py-2 text-gray-700">
                        📞 {product.contact.phone}<br />
                        Line: {product.contact.line}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Services</td>
                      <td className="py-2 text-gray-700">{product.serviceTypes.join(' • ')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Details</h3>
                <table className="w-full">
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600 w-1/3">Brand</td>
                      <td className="py-2 text-gray-700">{product.brand}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Projects</td>
                      <td className="py-2 text-gray-700">{product.projects.join(', ')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Status</td>
                      <td className="py-2 text-gray-700">{product.status}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Description</td>
                      <td className="py-2 text-gray-700">{product.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Price and Purchase */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Purchase</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    {product.originalPrice !== product.price && (
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                  </p>
                </div>
                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    product.inStock 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Promotions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Promotions</h3>
                {product.promotions.map((promo, index: number) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-blue-900 mb-2">{promo.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{promo.description}</p>
                    <p className="text-gray-500 text-xs">{promo.startDate} — {promo.endDate}</p>
                    {promo.image && (
                      <img src={promo.image} alt={promo.title} className="w-full rounded mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="relative">
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {product.logo && (
                      <div className="absolute top-3 left-3 z-10">
                        <img src={product.logo} alt="Logo" className="h-10 bg-white rounded p-1 shadow-sm" />
                      </div>
                    )}
                    <img 
                      src={images[selectedImageIndex]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Thumbnail Slider */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto pb-1">
                      {images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`View ${index + 1}`}
                          className={`h-15 w-24 object-cover rounded cursor-pointer border-2 transition-all ${
                            selectedImageIndex === index 
                              ? 'border-orange-500 opacity-100' 
                              : 'border-transparent opacity-70 hover:opacity-90'
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Store Location</h3>
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={product.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/marketplace"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}