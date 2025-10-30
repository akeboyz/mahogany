'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const restaurantData: { [key: number]: any } = {
    1: {
      id: 1,
      name: 'Sushi Hiro',
      category: 'Japanese',
      type: 'Fine Dining',
      location: 'Sukhumvit 24',
      address: '456 Sukhumvit 24, Klongtan, Klongtoei, Bangkok 10110',
      contact: {
        phone: '02-123-4567',
        line: '@sushihiro'
      },
      serviceTypes: ['Dine-in', 'Delivery', 'Reservation'],
      status: 'Open',
      projects: ['Main Branch', 'Catering Service'],
      rating: 4.8,
      price: '$$$$',
      description: 'Authentic Japanese sushi restaurant featuring fresh ingredients imported directly from Japan. Our master chef has over 20 years of experience in traditional sushi preparation.',
      images: [
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563612892811-fc75ba04521c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=800&h=600&fit=crop'
      ],
      logo: '/center/images/logo.png',
      promotions: [
        {
          title: 'Happy Hour Special',
          description: '20% off all sashimi sets between 3-6 PM',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=200&fit=crop'
        }
      ],
      mapUrl: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Sukhumvit%2024%2C%20Bangkok%2C%20Thailand&t=&z=14&ie=UTF8&iwloc=&output=embed'
    }
  };

  const restaurant = restaurantData[parseInt(id as string)] || restaurantData[1];
  const images = restaurant.images;

  return (
    <div>
      <Header currentPage="foodies" />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-4">{restaurant.address}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {restaurant.category}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {restaurant.rating}
                  </span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {restaurant.price}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Save
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Restaurant Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Restaurant Info</h3>
                <table className="w-full">
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600 w-1/3">Category</td>
                      <td className="py-2 text-gray-700">{restaurant.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Type</td>
                      <td className="py-2 text-gray-700">{restaurant.type}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Contact</td>
                      <td className="py-2 text-gray-700">
                        📞 {restaurant.contact.phone}<br />
                        Line: {restaurant.contact.line}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Services</td>
                      <td className="py-2 text-gray-700">{restaurant.serviceTypes.join(' • ')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Details</h3>
                <table className="w-full">
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600 w-1/3">Location</td>
                      <td className="py-2 text-gray-700">{restaurant.location}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Projects</td>
                      <td className="py-2 text-gray-700">{restaurant.projects.join(', ')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Status</td>
                      <td className="py-2 text-gray-700">{restaurant.status}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Description</td>
                      <td className="py-2 text-gray-700">{restaurant.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Promotions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Promotions</h3>
                {restaurant.promotions.map((promo: any, index: number) => (
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
                    {restaurant.logo && (
                      <div className="absolute top-3 left-3 z-10">
                        <img src={restaurant.logo} alt="Logo" className="h-10 bg-white rounded p-1 shadow-sm" />
                      </div>
                    )}
                    <img 
                      src={images[selectedImageIndex]} 
                      alt={restaurant.name}
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
                <h3 className="text-lg font-bold text-blue-900 mb-4">Location</h3>
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={restaurant.mapUrl}
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
              href="/foodies"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Restaurant Listings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}