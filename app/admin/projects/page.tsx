'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  project_id: string;
  project_name: string;
  project_logo: string;
  pm_id: string;
  project_address: string;
  developer_name: string;
  completion_period: string;
  facility_list: string[];
  total_units: number;
  total_building: number;
  total_floor: number;
  total_parking: number;
  project_status: string;
  project_type: string;
}

interface PM {
  pm_id: string;
  name_th: string;
  name_en: string;
  logo: string;
}

interface ProjectData {
  project: Project;
  pm: PM | null;
  counts: {
    units: number;
    foodies: number;
    markets: number;
    announces: number;
  };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      
      // Load all required data
      const [projectsRes, pmsRes] = await Promise.all([
        fetch('/project/ann/data/project.json').then(res => res.json()),
        fetch('/project/ann/data/pm.json').then(res => res.json())
      ]);

      const projectsList = projectsRes.projects || [];
      const pmsList = pmsRes.property_management_companies || [];
      
      // Create PM lookup map
      const pmMap = new Map(pmsList.map((pm: PM) => [pm.pm_id, pm]));

      // Transform data
      const transformedData: ProjectData[] = projectsList.map((project: Project) => ({
        project,
        pm: pmMap.get(project.pm_id) || null,
        counts: {
          units: Math.floor(Math.random() * 50) + 10, // Mock data for now
          foodies: Math.floor(Math.random() * 20) + 5,
          markets: Math.floor(Math.random() * 15) + 3,
          announces: Math.floor(Math.random() * 25) + 5
        }
      }));

      setProjects(transformedData);
    } catch (err) {
      console.error('Failed to load project data:', err);
      setError('Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProjects = () => {
    let filtered = projects.filter(item => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      
      const name = item.project.project_name.toLowerCase();
      const id = item.project.project_id.toLowerCase();
      return name.includes(query) || id.includes(query);
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.project.project_name.localeCompare(b.project.project_name);
        case 'units':
          return b.counts.units - a.counts.units;
        case 'foodies':
          return b.counts.foodies - a.counts.foodies;
        case 'markets':
          return b.counts.markets - a.counts.markets;
        case 'announces':
          return b.counts.announces - a.counts.announces;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const displayProjects = filteredAndSortedProjects();

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="glass-card p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/80">Loading projects data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center glass-card px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
            <Link href="/admin" className="text-white/90 hover:text-white transition-colors">← Back to Admin</Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Projects
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Overview</span>
          </h1>
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
            Comprehensive project management dashboard for all development projects
          </p>
        </div>

        {/* Controls */}
        <div className="glass-card p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Search Projects</label>
              <input
                type="search"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
              >
                <option value="name" className="bg-slate-800">Name (A→Z)</option>
                <option value="units" className="bg-slate-800">Most Units</option>
                <option value="foodies" className="bg-slate-800">Most Foodies</option>
                <option value="markets" className="bg-slate-800">Most Markets</option>
                <option value="announces" className="bg-slate-800">Most Announcements</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🏢</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{projects.length}</div>
            <div className="text-white/60 text-sm">Total Projects</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🏠</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{projects.reduce((sum, p) => sum + p.counts.units, 0)}</div>
            <div className="text-white/60 text-sm">Total Units</div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🍜</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{projects.reduce((sum, p) => sum + p.counts.foodies, 0)}</div>
            <div className="text-white/60 text-sm">Total Foodies</div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🛍️</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{projects.reduce((sum, p) => sum + p.counts.markets, 0)}</div>
            <div className="text-white/60 text-sm">Total Markets</div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left p-4 font-semibold text-white/90">Logo</th>
                  <th className="text-left p-4 font-semibold text-white/90">Project</th>
                  <th className="text-left p-4 font-semibold text-white/90">PM</th>
                  <th className="text-left p-4 font-semibold text-white/90">Units</th>
                  <th className="text-left p-4 font-semibold text-white/90">Foodies</th>
                  <th className="text-left p-4 font-semibold text-white/90">Markets</th>
                  <th className="text-left p-4 font-semibold text-white/90">Announcements</th>
                  <th className="text-left p-4 font-semibold text-white/90">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayProjects.map((item, index) => (
                  <tr key={item.project.project_id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    {/* Logo */}
                    <td className="p-4">
                      {item.project.project_logo ? (
                        <div className="relative">
                          <img 
                            src={`/project/ann/${item.project.project_logo}`}
                            alt={item.project.project_name}
                            className="w-10 h-10 rounded-lg object-cover border border-white/20"
                          />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-white/10 rounded-lg border border-white/20"></div>
                      )}
                    </td>
                    
                    {/* Project Info */}
                    <td className="p-4">
                      <a
                        href={`/project/projects.html?project_id=${item.project.project_id}`}
                        className="font-semibold text-white mb-1 hover:text-blue-300 transition-colors cursor-pointer block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.project.project_name}
                      </a>
                      <div className="text-sm text-white/60">
                        {item.project.project_id}
                      </div>
                      <div className="text-xs text-white/40 mt-1">
                        {item.project.project_address}
                      </div>
                    </td>
                    
                    {/* PM */}
                    <td className="p-4">
                      {item.pm ? (
                        <div className="text-purple-300 font-medium">
                          {item.pm.name_en}
                        </div>
                      ) : (
                        <span className="text-white/40">ไม่ระบุ</span>
                      )}
                    </td>
                    
                    {/* Counts */}
                    <td className="p-4">
                      {item.counts.units > 0 ? (
                        <a 
                          href={`/project/unit.html?project_id=${item.project.project_id}`}
                          className="inline-flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-300 rounded-lg font-bold hover:bg-blue-500/30 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.counts.units}
                        </a>
                      ) : (
                        <span className="text-white/30">{item.counts.units}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {item.counts.foodies > 0 ? (
                        <a 
                          href={`/project/foodie.html?project_id=${item.project.project_id}`}
                          className="inline-flex items-center justify-center w-8 h-8 bg-orange-500/20 text-orange-300 rounded-lg font-bold hover:bg-orange-500/30 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.counts.foodies}
                        </a>
                      ) : (
                        <span className="text-white/30">{item.counts.foodies}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {item.counts.markets > 0 ? (
                        <a 
                          href={`/project/marketplace.html?project_id=${item.project.project_id}`}
                          className="inline-flex items-center justify-center w-8 h-8 bg-purple-500/20 text-purple-300 rounded-lg font-bold hover:bg-purple-500/30 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.counts.markets}
                        </a>
                      ) : (
                        <span className="text-white/30">{item.counts.markets}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {item.counts.announces > 0 ? (
                        <a 
                          href={`/project/ann/index.html?project_id=${item.project.project_id}`}
                          className="inline-flex items-center justify-center w-8 h-8 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold hover:bg-emerald-500/30 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.counts.announces}
                        </a>
                      ) : (
                        <span className="text-white/30">{item.counts.announces}</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                        item.project.project_status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {item.project.project_status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-white/60">
                {searchQuery ? 'No projects found matching your search.' : 'No projects available.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}