import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          My Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/projects" className="text-gray-700 hover:text-indigo-600">
            Projects
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-indigo-600">
            Blog
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-indigo-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 space-y-2">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          {user ? (
            <div className="py-2">
              <p className="text-gray-700 py-2">Welcome, {user.name}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-2 text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block py-2 text-indigo-600 hover:text-indigo-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
