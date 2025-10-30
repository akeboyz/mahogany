import Link from 'next/link';
import Header from './components/Header';
import SearchSection from './components/SearchSection';

export default function HomePage() {
  return (
    <div>
      <Header />

      <main>
        <SearchSection />

        {/* Popular Categories */}
        <section className="py-16 px-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Popular Categories</h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Condo Category */}
            <Link href="/condo" className="group">
              <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center group-hover:text-blue-700">
                  <span className="mr-3">🏢</span> Condo
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="py-2 border-b border-dotted border-gray-300">The Lumpini 24</li>
                  <li className="py-2 border-b border-dotted border-gray-300">Noble Refine</li>
                  <li className="py-2 border-b border-dotted border-gray-300">Rhythm Sukhumvit</li>
                </ul>
              </div>
            </Link>

            {/* Foodies Category */}
            <Link href="/foodies" className="group">
              <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center group-hover:text-blue-700">
                  <span className="mr-3">🍽</span> Foodies
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="py-2 border-b border-dotted border-gray-300">Sushi Hiro</li>
                  <li className="py-2 border-b border-dotted border-gray-300">After You</li>
                  <li className="py-2 border-b border-dotted border-gray-300">Fire Tiger</li>
                </ul>
              </div>
            </Link>

            {/* Marketplace Category */}
            <Link href="/marketplace" className="group">
              <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center group-hover:text-blue-700">
                  <span className="mr-3">🛒</span> Marketplace
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="py-2 border-b border-dotted border-gray-300">Laundry Detergent</li>
                  <li className="py-2 border-b border-dotted border-gray-300">Pet Food</li>
                  <li className="py-2 border-b border-dotted border-gray-300">Office Supplies</li>
                </ul>
              </div>
            </Link>
          </div>
        </section>

        {/* Admin Access */}
        <section className="py-12 bg-blue-900 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Digital Signage System</h2>
          <p className="text-blue-200 mb-6">Access admin panel for digital signage management</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/player?device=NRF-26-L1-01"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Player Demo
            </Link>
            <Link 
              href="/admin"
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}