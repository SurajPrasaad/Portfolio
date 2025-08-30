import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile data
        const profileResponse = await api.get('/users/profile');
        setProfile(profileResponse.data);
        
        // Fetch skills
        const skillsResponse = await api.get('/skills');
        setSkills(skillsResponse.data);
        
        // Fetch experiences
        const experiencesResponse = await api.get('/experience');
        setExperiences(experiencesResponse.data);
        
        // Fetch education
        const educationResponse = await api.get('/education');
        setEducation(educationResponse.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="lg:flex lg:items-center lg:justify-between mb-12">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            About Me
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            {profile?.tagline || 'Full Stack Developer'}
          </p>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            A brief introduction about myself and my professional journey.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.name || 'N/A'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.email || 'N/A'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.location || 'N/A'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile?.phone || 'N/A'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile?.bio || 'No biography available.'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('skills')}
              className={`${
                activeTab === 'skills'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`${
                activeTab === 'experience'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`${
                activeTab === 'education'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Education
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'skills' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Technical Skills
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Technologies and tools I'm proficient in.
                </p>
                
                {skills.length > 0 ? (
                  <div className="mt-6">
                    {skills
                      .filter(skill => skill.category === 'technical')
                      .map((skill) => (
                        <div key={skill._id} className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">No skills to display.</p>
                )}
                
                <h4 className="mt-8 text-md font-medium text-gray-900">
                  Soft Skills
                </h4>
                
                {skills.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills
                      .filter(skill => skill.category === 'soft')
                      .map((skill) => (
                        <span 
                          key={skill._id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                ) : (
                  <p className="mt-2 text-gray-500">No soft skills to display.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Work Experience
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  My professional journey and work history.
                </p>
                
                {experiences.length > 0 ? (
                  <div className="mt-6 space-y-8">
                    {experiences.map((exp) => (
                      <div key={exp._id} className="relative pb-8">
                        {exp !== experiences[experiences.length - 1] && (
                          <span 
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" 
                            aria-hidden="true"
                          ></span>
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                              <svg 
                                className="h-5 w-5 text-white" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {exp.company} • {exp.position}
                              </p>
                              <p className="text-sm text-gray-900">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 ml-11">
                          <p className="text-sm text-gray-500">
                            {exp.description}
                          </p>
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {exp.technologies.map((tech, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">No work experience to display.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Education
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  My academic background and qualifications.
                </p>
                
                {education.length > 0 ? (
                  <div className="mt-6 space-y-8">
                    {education.map((edu) => (
                      <div key={edu._id} className="relative pb-8">
                        {edu !== education[education.length - 1] && (
                          <span 
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" 
                            aria-hidden="true"
                          ></span>
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                              <svg 
                                className="h-5 w-5 text-white" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 01.287.33 1 1 0 00.8.6 1 1 0 01.4 1.7l-2.2 1.8a1 1 0 11-1.4-1.4l1.6-1.6-1.6-1.6a1 1 0 011.4-1.4l1.6 1.6.2.2-1.6-1.6a1 1 0 010-1.4l1.6-1.6-1.6-1.6a1 1 0 011.4-1.4l1.6 1.6 1.6-1.6a1 1 0 011.4 0z" />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900 font-medium">
                                {edu.degree} in {edu.fieldOfStudy}
                              </p>
                              <p className="text-sm text-gray-500">
                                {edu.school}
                              </p>
                              <p className="text-sm text-gray-500">
                                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        {edu.description && (
                          <div className="mt-2 ml-11">
                            <p className="text-sm text-gray-500">
                              {edu.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">No education information to display.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-indigo-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900">
          Want to know more about my professional experience?
        </h3>
        <div className="mt-4">
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
