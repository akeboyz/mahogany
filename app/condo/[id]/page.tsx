'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

export default function CondoDetailPage() {
  const params = useParams();
  const id = params.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const condoData: { [key: number]: any } = {
    1: {
      id: 1,
      name: 'The Lumpini 24',
      location: 'Sukhumvit 24',
      address: '123 Sukhumvit 24, Klongtan, Klongtoei, Bangkok 10110',
      price: '8.5M THB',
      type: '2 Bed, 2 Bath',
      size: '75 sqm',
      floor: '15th Floor',
      view: 'City View',
      status: 'For Sale',
      developer: 'Lumpini Property',
      completionPeriod: 'Q4 2024',
      facilities: 'Pool, Gym, Garden, Security',
      totalUnits: '500 units',
      description: 'Modern condominium in the heart of Sukhumvit with easy access to BTS and shopping centers.',
      images: [
        '/images/unit001-01.jpeg',
        '/images/unit001-02.jpeg',
        '/images/unit001-03.jpeg',
        '/images/unit001-04.jpeg',
        '/images/unit001-05.jpeg'
      ],
      logo: '/center/images/logo.png',
      mapUrl: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Sukhumvit%2024%2C%20Bangkok%2C%20Thailand&t=&z=14&ie=UTF8&iwloc=&output=embed'
    }
  };

  const condo = condoData[parseInt(id as string)] || condoData[1];
  const images = condo.images;

  return (
    <div>
      <Header currentPage="condo" />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-2">{condo.name}</h1>
                <p className="text-gray-600 mb-4">{condo.address}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {condo.status}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {condo.type}
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {condo.price}
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
            {/* Left Column - Property Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Property Details</h3>
                <table className="w-full">
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600 w-1/3">Type</td>
                      <td className="py-2 text-gray-700">{condo.type}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Size</td>
                      <td className="py-2 text-gray-700">{condo.size}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Floor</td>
                      <td className="py-2 text-gray-700">{condo.floor}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">View</td>
                      <td className="py-2 text-gray-700">{condo.view}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Project Details</h3>
                <table className="w-full">
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600 w-1/3">Developer</td>
                      <td className="py-2 text-gray-700">{condo.developer}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Completion</td>
                      <td className="py-2 text-gray-700">{condo.completionPeriod}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Facilities</td>
                      <td className="py-2 text-gray-700">{condo.facilities}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-bold text-gray-600">Total Units</td>
                      <td className="py-2 text-gray-700">{condo.totalUnits}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{condo.description}</p>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="relative">
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {condo.logo && (
                      <div className="absolute top-3 left-3 z-10">
                        <img src={condo.logo} alt="Logo" className="h-10 bg-white rounded p-1 shadow-sm" />
                      </div>
                    )}
                    <img 
                      src={images[selectedImageIndex]} 
                      alt={condo.name}
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
                    src={condo.mapUrl}
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
              href="/condo"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Condo Listings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}