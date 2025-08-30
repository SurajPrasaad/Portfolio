import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        setError('Failed to load project details');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">{error}</h2>
          <Link 
            to="/projects" 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <Link 
            to="/projects" 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {project.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {project.subtitle}
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Projects
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Project Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {project.type || 'N/A'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Technologies</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tech}
                    </span>
                  )) || 'N/A'}
                </div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Project URL</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {project.projectUrl ? (
                  <a 
                    href={project.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {project.projectUrl}
                  </a>
                ) : 'N/A'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">GitHub Repository</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {project.githubUrl ? (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {project.githubUrl}
                  </a>
                ) : 'N/A'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <div className="prose max-w-none">
                  {project.description || 'No description available.'}
                </div>
              </dd>
            </div>
            {project.features && project.features.length > 0 && (
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Key Features</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-5 space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 mb-4">Screenshots</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <img 
                          src={screenshot} 
                          alt={`Screenshot ${index + 1}`} 
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
