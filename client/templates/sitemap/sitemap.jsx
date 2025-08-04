import React, { useState, useEffect } from 'react';

const Sitemap = () => {
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // In a Meteor React setup, you would use useTracker here
    // For now, this is a template showing the structure
    
    // Example data structure - replace with actual Meteor data
    const sampleProjects = [
      { sku: 'KonakSeasideHomes', name: 'Konak Seaside Homes' },
      { sku: 'KonakCityTower', name: 'Konak City Tower' },
      { sku: 'KonakSeasidePremium', name: 'Konak Seaside Premium' },
      { sku: 'KonakSeasideResort', name: 'Konak Seaside Resort' },
      { sku: 'KonakTower', name: 'Konak Tower' }
    ];
    
    const sampleNews = [
      { id: '1', title: 'Latest Construction Updates' },
      { id: '2', title: 'New Project Announcement' },
      { id: '3', title: 'Award Recognition' }
    ];
    
    setProjects(sampleProjects);
    setNews(sampleNews);
  }, []);

  const mainPages = [
    { name: 'Home', path: '/' },
    { name: 'Brand', path: '/brand' },
    { name: 'Investment', path: '/invest' },
    { name: 'Contacts', path: '/contacts' }
  ];

  return (
    <div className="sitemap-wrapper bg-gradient-to-br from-green-200 via-gray-100 to-orange-100 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Site Map</h1>
          <p className="text-lg text-gray-600">Navigate through all pages of our website</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Pages Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">
              <i className="fas fa-home mr-2"></i>Main Pages
            </h2>
            <ul className="space-y-3">
              {mainPages.map((page, index) => (
                <li key={index}>
                  <a 
                    href={page.path} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-sm"></i>
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & News Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              <i className="fas fa-newspaper mr-2"></i>Blog & News
            </h2>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/news" 
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                >
                  <i className="fas fa-chevron-right mr-2 text-sm"></i>
                  All News
                </a>
              </li>
              {news.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`/news/${item.id}`} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center text-sm"
                  >
                    <i className="fas fa-dot-circle mr-2 text-xs"></i>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
              <i className="fas fa-building mr-2"></i>Projects
            </h2>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.sku}>
                  <a 
                    href={`/projects/${project.sku}`} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-sm"></i>
                    {project.name}
                  </a>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>
                      <a 
                        href={`/projects/${project.sku}/gallery`} 
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center text-sm"
                      >
                        <i className="fas fa-images mr-2 text-xs"></i>
                        Gallery
                      </a>
                    </li>
                    <li>
                      <a 
                        href={`/projects/${project.sku}/map`} 
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center text-sm"
                      >
                        <i className="fas fa-map-marker-alt mr-2 text-xs"></i>
                        Location
                      </a>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">About Our Website</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Konak Construction has been delivering high-quality construction projects since 1971. 
              Browse through our portfolio of award-winning projects, latest news, and investment opportunities.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <i className="fas fa-check-circle mr-1"></i>
                {projects.length} Projects
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <i className="fas fa-newspaper mr-1"></i>
                {news.length} News Articles
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
