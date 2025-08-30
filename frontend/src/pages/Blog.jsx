import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blog');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Thoughts, stories and ideas from my journey as a developer.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try a different search term.' : 'No blog posts available yet.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-12 lg:grid-cols-2">
            {currentPosts.map((post) => (
              <article key={post._id} className="flex flex-col">
                <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
                  {post.featuredImage && (
                    <div className="h-48 bg-gray-200">
                      <img
                        className="w-full h-full object-cover"
                        src={post.featuredImage}
                        alt={post.title}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {Math.ceil(post.readingTime || 5)} min read
                      </span>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">
                      <Link
                        to={`/blog/${post.slug || post._id}`}
                        className="hover:text-indigo-600 transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base text-gray-500">
                      {post.excerpt || 'No excerpt available...'}
                    </p>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{post.author?.name || 'Author'}</span>
                        {post.author?.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {(post.author?.name || 'A').charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {post.author?.name || 'Anonymous'}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <span>{post.author?.role || 'Writer'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex justify-center" aria-label="Pagination">
              <ul className="inline-flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-indigo-600 hover:text-indigo-900'
                    }`}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === number
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-indigo-600 hover:text-indigo-900'
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
