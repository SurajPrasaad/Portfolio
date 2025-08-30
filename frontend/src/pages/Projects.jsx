import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiFilter, FiSearch } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filters, setFilters] = useState(['all', 'web', 'mobile', 'full-stack']);

  // Sample data - replace with your API call
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API call
        const mockProjects = [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'A full-featured e-commerce platform with payment integration and admin dashboard.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=E-commerce',
            github: 'https://github.com/yourusername/ecommerce',
            demo: 'https://your-ecommerce-demo.com',
            category: 'web'
          },
          {
            id: 2,
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates.',
            tags: ['React', 'Firebase', 'Tailwind CSS'],
            image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Task+App',
            github: 'https://github.com/yourusername/task-app',
            demo: 'https://your-task-app-demo.com',
            category: 'web'
          },
          {
            id: 3,
            title: 'Mobile Fitness Tracker',
            description: 'Cross-platform mobile app for tracking workouts and nutrition.',
            tags: ['React Native', 'Redux', 'Firebase'],
            image: 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Fitness+App',
            github: 'https://github.com/yourusername/fitness-tracker',
            demo: 'https://your-fitness-app-demo.com',
            category: 'mobile'
          },
          {
            id: 4,
            title: 'Portfolio Website',
            description: 'A modern portfolio website built with Next.js and Framer Motion.',
            tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
            image: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Portfolio',
            github: 'https://github.com/yourusername/portfolio',
            demo: 'https://your-portfolio.com',
            category: 'web'
          },
          {
            id: 5,
            title: 'Social Media Dashboard',
            description: 'Analytics dashboard for social media metrics and insights.',
            tags: ['React', 'D3.js', 'Express', 'MongoDB'],
            image: 'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Dashboard',
            github: 'https://github.com/yourusername/social-dashboard',
            demo: 'https://your-dashboard-demo.com',
            category: 'full-stack'
          },
          {
            id: 6,
            title: 'Recipe Finder App',
            description: 'Find recipes based on ingredients you have at home.',
            tags: ['React', 'Spoonacular API', 'Material-UI'],
            image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Recipe+App',
            github: 'https://github.com/yourusername/recipe-finder',
            demo: 'https://your-recipe-app-demo.com',
            category: 'web'
          }
        ];

        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
        
        // Extract unique categories
        const categories = ['all', ...new Set(mockProjects.map(project => project.category))];
        setFilters(categories);
        
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search term and active filter
  useEffect(() => {
    let result = [...projects];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(project => project.category === activeFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredProjects(result);
  }, [searchTerm, activeFilter, projects]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Projects</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of my recent work and side projects. Each project represents a unique challenge and learning opportunity.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          aria-label="View on GitHub"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          aria-label="View live demo"
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Have a project in mind?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing product design work or partnership opportunities.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Let's Talk
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
