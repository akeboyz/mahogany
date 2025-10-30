'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

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

export default function ProjectsOverviewPage() {
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

  if (loading) {
    return (
      <div>
        <Header currentPage="projects" />
        <main className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">Loading projects...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header currentPage="projects" />
        <main className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center text-red-600">Error: {error}</div>
          </div>
        </main>
      </div>
    );
  }

  const displayProjects = filteredAndSortedProjects();

  return (
    <div>
      <Header currentPage="projects" />
      
      <main className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">ภาพรวมโครงการ (Projects Overview)</h1>
            <p className="text-gray-600">รูปแบบตัวอักษร/สี/พื้นหลัง และสไตล์ตาราง ถูกปรับให้เหมือนกับหน้า Announcements เพื่อความคงเส้นคงวา</p>
          </div>

          {/* Toolbar */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input
              type="search"
              placeholder="ค้นหาโครงการ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Sort: ชื่อ (A→Z)</option>
              <option value="units">Sort: จำนวนยูนิต</option>
              <option value="foodies">Sort: จำนวน Foodies</option>
              <option value="markets">Sort: จำนวน Marketplace</option>
              <option value="announces">Sort: จำนวน Announcements</option>
            </select>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-blue-900">Logo</th>
                    <th className="text-left p-4 font-semibold text-blue-900">Project ID</th>
                    <th className="text-left p-4 font-semibold text-blue-900">Project name</th>
                    <th className="text-left p-4 font-semibold text-blue-900">PM</th>
                    <th className="text-left p-4 font-semibold text-blue-900">No. of listed units</th>
                    <th className="text-left p-4 font-semibold text-blue-900">No. of foodies</th>
                    <th className="text-left p-4 font-semibold text-blue-900">No. of marketplace</th>
                    <th className="text-left p-4 font-semibold text-blue-900">No. of announcement</th>
                  </tr>
                </thead>
                <tbody>
                  {displayProjects.map((item, index) => (
                    <tr key={item.project.project_id} className="border-b hover:bg-blue-50/50">
                      {/* Logo */}
                      <td className="p-4">
                        {item.project.project_logo ? (
                          <img 
                            src={`/project/ann/${item.project.project_logo}`}
                            alt={item.project.project_name}
                            className="w-8 h-8 rounded object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        )}
                      </td>
                      
                      {/* Project ID */}
                      <td className="p-4 font-mono text-gray-700">
                        {item.project.project_id}
                      </td>
                      
                      {/* Project Name */}
                      <td className="p-4">
                        <a 
                          href={`/project/projects.html?project_id=${item.project.project_id}`}
                          className="font-semibold text-blue-900 hover:text-blue-700 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.project.project_name}
                        </a>
                        <div className="text-sm text-gray-500">
                          {item.project.project_address}
                        </div>
                      </td>
                      
                      {/* PM */}
                      <td className="p-4">
                        {item.pm ? (
                          <a 
                            href={`/project/pm.html?pm_id=${item.pm.pm_id}`}
                            className="text-blue-600 font-medium hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.pm.name_en}
                          </a>
                        ) : (
                          <span className="text-gray-400">ไม่ระบุ</span>
                        )}
                      </td>
                      
                      {/* Counts */}
                      <td className="p-4">
                        {item.counts.units > 0 ? (
                          <a 
                            href={`/project/unit.html?project_id=${item.project.project_id}`}
                            className="font-bold text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.counts.units}
                          </a>
                        ) : (
                          <span className="font-bold text-gray-400">{item.counts.units}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {item.counts.foodies > 0 ? (
                          <a 
                            href={`/project/foodie.html?project_id=${item.project.project_id}`}
                            className="font-bold text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.counts.foodies}
                          </a>
                        ) : (
                          <span className="font-bold text-gray-400">{item.counts.foodies}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {item.counts.markets > 0 ? (
                          <a 
                            href={`/project/marketplace.html?project_id=${item.project.project_id}`}
                            className="font-bold text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.counts.markets}
                          </a>
                        ) : (
                          <span className="font-bold text-gray-400">{item.counts.markets}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {item.counts.announces > 0 ? (
                          <a 
                            href={`/project/ann/index.html?project_id=${item.project.project_id}`}
                            className="font-bold text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.counts.announces}
                          </a>
                        ) : (
                          <span className="font-bold text-gray-400">{item.counts.announces}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {displayProjects.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                {searchQuery ? 'ไม่พบโครงการที่ตรงกับการค้นหา' : 'ยังไม่มีโครงการในระบบ'}
              </div>
            )}
          </div>

          {/* Stats Summary */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-gray-500 mb-1">Total Projects</div>
              <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-gray-500 mb-1">Total Units</div>
              <div className="text-2xl font-bold text-blue-600">
                {projects.reduce((sum, p) => sum + p.counts.units, 0)}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-gray-500 mb-1">Total Foodies</div>
              <div className="text-2xl font-bold text-blue-600">
                {projects.reduce((sum, p) => sum + p.counts.foodies, 0)}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-sm text-gray-500 mb-1">Total Marketplace</div>
              <div className="text-2xl font-bold text-blue-600">
                {projects.reduce((sum, p) => sum + p.counts.markets, 0)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}