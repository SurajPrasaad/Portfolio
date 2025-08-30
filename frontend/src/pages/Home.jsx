import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 sm:py-24">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Hi, I'm John Doe</span>
          <span className="block text-indigo-600">Full Stack Developer</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          I build exceptional digital experiences. Currently focused on building accessible, human-centered products.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link to="/projects" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              View My Work
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link to="/contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Skills</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Technologies I Work With
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
              {[
                { name: 'React', icon: '⚛️' },
                { name: 'Node.js', icon: '🟢' },
                { name: 'Express', icon: '🚀' },
                { name: 'MongoDB', icon: '🍃' },
                { name: 'JavaScript', icon: '📜' },
                { name: 'TypeScript', icon: '🔷' },
                { name: 'Python', icon: '🐍' },
                { name: 'Docker', icon: '🐳' },
                { name: 'AWS', icon: '☁️' },
                { name: 'GraphQL', icon: '🔷' },
                { name: 'Redux', icon: '🔄' },
                { name: 'Next.js', icon: '⏭️' },
              ].map((skill) => (
                <div key={skill.name} className="flex flex-col items-center">
                  <span className="text-4xl mb-2">{skill.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects Preview */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Work</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Recent Projects
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A selection of my recent projects and contributions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((project) => (
              <div key={project} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={`https://source.unsplash.com/random/400x300?tech,project${project}`}
                    alt="Project"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      Project Category
                    </p>
                    <Link to={`/projects/${project}`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        Project {project}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        Brief description of the project and the technologies used. This would be a short summary of the project.
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={`/projects/${project}`}>
                        <span className="sr-only">View Project</span>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Project
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start a project?</span>
            <span className="block">Let's work together.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Have a project in mind? I'd love to hear about it.
          </p>
          <Link
            to="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
