import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Interior');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  }

  fetchProjects();
}, []);

useEffect(() => {
  setSelectedProject(null);
}, [activeFilter]);

  const defaultProjects: Project[] = [
    {
      id: '1',
      image_url: '/interior1.jpeg',
      category: 'Interior',
      sort_order: 1,
      is_active: true,
      created_at: ''
    },
    {
      id: '2',
      image_url: '/exterior1.jpeg',
      category: 'Exterior',
      sort_order: 2,
      is_active: true,
      created_at: ''
    },
    {
      id: '3',
      image_url: '/interior2.jpeg',
      category: 'Interior',
      sort_order: 3,
      is_active: true,
      created_at: ''
    },
    {
      id: '4',
      image_url: '/exterior2.jpeg',
      category: 'Exterior',
      sort_order: 4,
      is_active: true,
      created_at: ''
    }
  ];

  const baseProjects = projects.length > 0 ? projects : defaultProjects;

  const displayProjects = baseProjects.map((project, index) => ({
    ...project,
    image_url:
      project.image_url && project.image_url.trim() !== ''
        ? project.image_url
        : defaultProjects[index]?.image_url
  }));
    
  const filteredProjects = displayProjects.filter(
    (project) => project.category === activeFilter
  );

    const handlePrevious = () => {
    if (selectedProject !== null) {
      setSelectedProject(
        (selectedProject - 1 + filteredProjects.length) % filteredProjects.length
      );
    }
  };

  const handleNext = () => {
    if (selectedProject !== null) {
      setSelectedProject(
        (selectedProject + 1) % filteredProjects.length
      );
    }
  };

  return (
    <>
      <section id="our-projects" className="py-32 md:py-40 lg:py-48 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-28">
            <p className="text-xs tracking-[0.3em] text-gray-500 mb-4 uppercase">Portfolio</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] mb-12">
              Our Projects
            </h2>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setActiveFilter('Interior')}
                className={`px-8 py-3 text-xs font-medium tracking-[0.2em] transition-all duration-500 uppercase ${
                  activeFilter === 'Interior'
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-transparent border border-gray-300 text-gray-700 hover:border-[#1a1a1a]'
                }`}
              >
                Interior
              </button>
              <button
                onClick={() => setActiveFilter('Exterior')}
                className={`px-8 py-3 text-xs font-medium tracking-[0.2em] transition-all duration-500 uppercase ${
                  activeFilter === 'Exterior'
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-transparent border border-gray-300 text-gray-700 hover:border-[#1a1a1a]'
                }`}
              >
                Exterior
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden h-[400px] md:h-[500px] cursor-pointer"
                onClick={() => setSelectedProject(index)}
              >
                <img
                  src={project.image_url}
                  alt={`Project ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-700 m-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight size={48} />
          </button>

          <img
            src={filteredProjects[selectedProject].image_url}
            alt={`Project ${selectedProject + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
}
