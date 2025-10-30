import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen relative">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass-card px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-white/90 font-medium">Admin Dashboard Active</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Control
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Center</span>
          </h1>
          <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
            Comprehensive management dashboard for your digital signage ecosystem
          </p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Devices */}
          <div className="admin-card text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-3 transition-transform">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Devices</h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">Monitor and manage all connected kiosk devices in real-time</p>
            <div className="inline-flex items-center bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-xl border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              <span className="font-semibold">1 Online</span>
            </div>
          </div>

          {/* Playlists */}
          <div className="admin-card text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-3 transition-transform">
              <span className="text-2xl">📺</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Playlists</h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">Create and manage dynamic video content playlists</p>
            <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-xl border border-blue-500/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2"></div>
              <span className="font-semibold">1 Active</span>
            </div>
          </div>

          {/* Shops */}
          <div className="admin-card text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-3 transition-transform">
              <span className="text-2xl">🏪</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Shops</h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">Manage restaurants and marketplace integrations</p>
            <div className="inline-flex items-center bg-orange-500/20 text-orange-300 px-4 py-2 rounded-xl border border-orange-500/30">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-2"></div>
              <span className="font-semibold">2 Shops</span>
            </div>
          </div>

          {/* Projects */}
          <Link href="/admin/projects" className="admin-card text-center group hover:scale-105 transition-all duration-300 block">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-3 transition-transform">
              <span className="text-2xl">🏗️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Projects</h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">Comprehensive project management and overview</p>
            <div className="inline-flex items-center bg-purple-500/20 text-purple-300 px-4 py-2 rounded-xl border border-purple-500/30">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2"></div>
              <span className="font-semibold">All Projects</span>
            </div>
          </Link>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Status Section */}
          <div className="admin-card">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 w-10 h-10 rounded-xl flex items-center justify-center mr-4">
                📊
              </span>
              System Status
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Server Status</div>
                    <div className="text-sm text-white/70">All systems operational</div>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold">Online</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Environment</div>
                    <div className="text-sm text-white/70">Development mode active</div>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold">Demo</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Configuration</div>
                    <div className="text-sm text-white/70">Ready for production setup</div>
                  </div>
                </div>
                <div className="text-blue-400 font-bold">Ready</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-card">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 w-10 h-10 rounded-xl flex items-center justify-center mr-4">
                ⚡
              </span>
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 text-left hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mr-3">
                      📱
                    </div>
                    <div>
                      <div className="font-semibold text-white">View Live Devices</div>
                      <div className="text-sm text-white/70">Monitor real-time status</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30 text-left hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-emerald-500/30 rounded-lg flex items-center justify-center mr-3">
                      📺
                    </div>
                    <div>
                      <div className="font-semibold text-white">Manage Content</div>
                      <div className="text-sm text-white/70">Update playlists & media</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30 text-left hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center mr-3">
                      📊
                    </div>
                    <div>
                      <div className="font-semibold text-white">View Analytics</div>
                      <div className="text-sm text-white/70">Performance insights</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="admin-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6">Getting Started</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-300">1</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Configure Firebase credentials</div>
                    <div className="text-white/70 text-sm">Add your Firebase config to .env.local</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-300">2</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Initialize sample data</div>
                    <div className="text-white/70 text-sm">Run <code className="bg-white/10 px-2 py-1 rounded text-blue-300 font-mono text-xs">npm run seed</code> to populate your database</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-300">3</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Test the player interface</div>
                    <div className="text-white/70 text-sm">Visit <code className="bg-white/10 px-2 py-1 rounded text-blue-300 font-mono text-xs">/player?device=NRF-26-L1-01</code> to see the kiosk</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-300">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Full admin features activated</div>
                    <div className="text-white/70 text-sm">Complete setup will unlock all management capabilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}