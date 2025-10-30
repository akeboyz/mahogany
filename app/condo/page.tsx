import Link from 'next/link';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';

export default function CondoPage() {
  const condoListings = [
    {
      id: 1,
      name: 'The Lumpini 24',
      location: 'Sukhumvit 24',
      price: '8.5M THB',
      type: '2 Bed, 2 Bath',
      size: '75 sqm',
      status: 'For Sale',
      images: [
        '/images/unit001-01.jpeg',
        '/images/unit001-02.jpeg',
        '/images/unit001-03.jpeg'
      ]
    },
    {
      id: 2,
      name: 'Noble Refine',
      location: 'Sukhumvit 26',
      price: '12.2M THB',
      type: '3 Bed, 2 Bath',
      size: '95 sqm',
      status: 'For Rent',
      images: [
        '/images/unit002-01.jpeg',
        '/images/unit002-02.jpeg',
        '/images/unit002-03.jpeg'
      ]
    },
    {
      id: 3,
      name: 'Rhythm Sukhumvit',
      location: 'Sukhumvit 38',
      price: '6.8M THB',
      type: '1 Bed, 1 Bath',
      size: '45 sqm',
      status: 'For Sale',
      images: [
        '/images/unit003-01.jpeg',
        '/images/unit003-02.jpeg',
        '/images/unit003-03.jpeg'
      ]
    },
    {
      id: 4,
      name: 'Circle Condominium',
      location: 'Sukhumvit 39',
      price: '15.5M THB',
      type: '4 Bed, 3 Bath',
      size: '120 sqm',
      status: 'Both',
      images: [
        '/images/unit004-01.jpeg',
        '/images/unit004-02.jpeg',
        '/images/unit004-03.jpeg'
      ]
    }
  ];

  return (
    <div>
      <Header currentPage="condo" />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Condo Listings</h1>
            <p className="text-gray-600">Find your perfect condominium in Bangkok</p>
          </div>

          {/* Search/Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Locations</option>
                  <option>Sukhumvit 24</option>
                  <option>Sukhumvit 26</option>
                  <option>Sukhumvit 38</option>
                  <option>Sukhumvit 39</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any Price</option>
                  <option>Under 5M</option>
                  <option>5M - 10M</option>
                  <option>10M - 15M</option>
                  <option>Above 15M</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any</option>
                  <option>1 Bed</option>
                  <option>2 Beds</option>
                  <option>3 Beds</option>
                  <option>4+ Beds</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Search Properties
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">{condoListings.length} properties found</p>
          </div>

          {/* Property Listings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {condoListings.map((condo) => (
              <div key={condo.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {/* Property Image Slider */}
                <div className="relative h-48">
                  <ImageSlider 
                    images={condo.images} 
                    alt={condo.name}
                    className="w-full h-full"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 left-0 bg-orange-500 text-white px-4 py-1 rounded-r-lg font-bold text-sm z-20">
                    {condo.status}
                  </div>
                  {/* Property Info Overlay */}
                  <div className="absolute bottom-3 left-3 text-white z-20">
                    <div className="font-bold text-sm drop-shadow-lg">{condo.name}</div>
                    <div className="text-xs drop-shadow-lg">{condo.type}</div>
                  </div>
                  {/* Price Overlay */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-bold z-20">
                    {condo.price}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{condo.name}</h3>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{condo.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📐</span>
                      <span>{condo.size}</span>
                    </div>
                    <div className="flex items-center text-lg font-bold text-blue-900">
                      <span className="mr-2">💰</span>
                      <span>{condo.price}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/condo/${condo.id}`}
                    className="text-blue-900 font-semibold underline hover:text-blue-700"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Load More Properties
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