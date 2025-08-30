import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CodeIcon,
  BookOpenIcon,
  UserIcon,
  PlusIcon,
  PencilAltIcon,
  TrashIcon,
  ChartBarIcon,
  MailIcon,
  DocumentTextIcon
} from '@heroicons/react/outline';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    skills: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch these stats from your API
        // const response = await api.get('/dashboard/stats');
        // setStats(response.data);
        
        // Mock data for now
        setStats({
          projects: 5,
          posts: 3,
          skills: 8,
          messages: 12,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <BriefcaseIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Projects
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.projects}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <Link to="/dashboard/projects" className="text-indigo-600 hover:text-indigo-900 text-sm">
                          View all
                        </Link>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <BookOpenIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Blog Posts
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.posts}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <Link to="/dashboard/posts" className="text-indigo-600 hover:text-indigo-900 text-sm">
                          View all
                        </Link>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <CodeIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Skills
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.skills}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <Link to="/dashboard/skills" className="text-indigo-600 hover:text-indigo-900 text-sm">
                          Manage
                        </Link>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <MailIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Messages
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.messages}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <Link to="/dashboard/messages" className="text-indigo-600 hover:text-indigo-900 text-sm">
                          View all
                        </Link>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <ChartBarIcon
                  className={`${
                    activeTab === 'overview' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Overview
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <UserIcon
                  className={`${
                    activeTab === 'profile' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Profile
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`${
                  activeTab === 'projects'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <BriefcaseIcon
                  className={`${
                    activeTab === 'projects' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Projects
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`${
                  activeTab === 'blog'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <DocumentTextIcon
                  className={`${
                    activeTab === 'blog' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Blog Posts
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`${
                  activeTab === 'skills'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <CodeIcon
                  className={`${
                    activeTab === 'skills' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Skills
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`${
                  activeTab === 'experience'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <BriefcaseIcon
                  className={`${
                    activeTab === 'experience' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Experience
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`${
                  activeTab === 'education'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group w-full flex items-center pl-3 py-2 text-sm font-medium border-l-4`}
              >
                <AcademicCapIcon
                  className={`${
                    activeTab === 'education' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                Education
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'profile' && 'Profile Settings'}
                  {activeTab === 'projects' && 'Manage Projects'}
                  {activeTab === 'blog' && 'Blog Posts'}
                  {activeTab === 'skills' && 'Skills'}
                  {activeTab === 'experience' && 'Work Experience'}
                  {activeTab === 'education' && 'Education'}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {activeTab === 'overview' && 'Welcome to your dashboard. Here\'s what\'s happening with your portfolio.'}
                  {activeTab === 'profile' && 'Update your personal information and preferences.'}
                  {activeTab === 'projects' && 'Manage your portfolio projects.'}
                  {activeTab === 'blog' && 'Create and manage your blog posts.'}
                  {activeTab === 'skills' && 'Manage your technical and professional skills.'}
                  {activeTab === 'experience' && 'Update your work experience.'}
                  {activeTab === 'education' && 'Manage your education history.'}
                </p>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                {activeTab === 'overview' && (
                  <div>
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-indigo-700">
                            Welcome to your portfolio dashboard! This is where you can manage all aspects of your portfolio website.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                          <div className="mt-4 space-y-4">
                            <button
                              onClick={() => setActiveTab('projects')}
                              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <span>Add New Project</span>
                              <PlusIcon className="h-4 w-4 text-gray-500" />
                            </button>
                            <button
                              onClick={() => setActiveTab('blog')}
                              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <span>Write New Blog Post</span>
                              <PlusIcon className="h-4 w-4 text-gray-500" />
                            </button>
                            <button
                              onClick={() => setActiveTab('profile')}
                              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <span>Update Profile</span>
                              <PencilAltIcon className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                          <div className="mt-4 flow-root">
                            <ul className="-mb-8">
                              <li>
                                <div className="relative pb-8">
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                        <PencilAltIcon className="h-4 w-4 text-white" />
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          You updated your <span className="font-medium text-gray-900">profile</span>
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime="2023-04-06">2d ago</time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="relative pb-8">
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                        <PlusIcon className="h-4 w-4 text-white" />
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          You added a new <span className="font-medium text-gray-900">project</span>
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime="2023-04-05">3d ago</time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="relative pb-8">
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                                        <DocumentTextIcon className="h-4 w-4 text-white" />
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          You published a new <span className="font-medium text-gray-900">blog post</span>
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime="2023-04-04">4d ago</time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div>
                    <p className="text-gray-600">Profile settings will be available here.</p>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Your Projects</h4>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        New Project
                      </button>
                    </div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {[1, 2, 3].map((project) => (
                          <li key={project}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  Project {project}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Published
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    Last updated on June 22, 2023
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                                    <PencilAltIcon className="h-5 w-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {['blog', 'skills', 'experience', 'education'].includes(activeTab) && (
                  <div className="text-center py-12">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} content</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new {activeTab === 'blog' ? 'blog post' : activeTab === 'skills' ? 'skill' : activeTab}.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        New {activeTab === 'blog' ? 'Post' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
