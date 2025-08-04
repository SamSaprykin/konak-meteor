// Sitemap data structure and utilities for the Konak Construction website

export interface SitemapPage {
  name: string;
  path: string;
  description?: string;
  lastModified?: Date;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export interface SitemapCategory {
  name: string;
  description: string;
  icon: string;
  pages: SitemapPage[];
}

export interface ProjectPage extends SitemapPage {
  sku: string;
  subPages: SitemapPage[];
}

export interface NewsPage extends SitemapPage {
  id: string;
  title: string;
  publishDate?: Date;
}

// Main pages configuration
export const mainPages: SitemapPage[] = [
  {
    name: 'Home',
    path: '/',
    description: 'Welcome to Konak Construction - Premium construction projects since 1971',
    priority: 1.0,
    changeFreq: 'weekly'
  },
  {
    name: 'Brand',
    path: '/brand',
    description: 'Learn about Konak Construction\'s history and values',
    priority: 0.8,
    changeFreq: 'monthly'
  },
  {
    name: 'Investment',
    path: '/invest',
    description: 'Investment opportunities in Konak Construction projects',
    priority: 0.9,
    changeFreq: 'weekly'
  },
  {
    name: 'Contacts',
    path: '/contacts',
    description: 'Get in touch with Konak Construction',
    priority: 0.7,
    changeFreq: 'monthly'
  },
  {
    name: 'Site Map',
    path: '/sitemap',
    description: 'Navigate through all pages of our website',
    priority: 0.5,
    changeFreq: 'monthly'
  }
];

// Project-related pages structure
export const getProjectPages = (projects: any[]): ProjectPage[] => {
  return projects.map(project => ({
    name: project.name || `Project ${project.sku}`,
    path: `/projects/${project.sku}`,
    sku: project.sku,
    description: `Details about ${project.name || project.sku} construction project`,
    priority: 0.8,
    changeFreq: 'monthly',
    subPages: [
      {
        name: 'Gallery',
        path: `/projects/${project.sku}/gallery`,
        description: `Photo gallery for ${project.name || project.sku}`,
        priority: 0.6,
        changeFreq: 'monthly'
      },
      {
        name: 'Location',
        path: `/projects/${project.sku}/map`,
        description: `Location and map for ${project.name || project.sku}`,
        priority: 0.6,
        changeFreq: 'yearly'
      }
    ]
  }));
};

// News/Blog pages structure
export const getNewsPages = (newsItems: any[]): NewsPage[] => {
  return newsItems.map(item => ({
    id: item.id,
    name: item.title || `News Article ${item.id}`,
    title: item.title || `News Article ${item.id}`,
    path: `/news/${item.id}`,
    description: item.excerpt || `Read more about ${item.title}`,
    priority: 0.7,
    changeFreq: 'yearly',
    publishDate: item.publishDate || new Date()
  }));
};

// Sitemap categories for organized display
export const getSitemapCategories = (projects: any[], newsItems: any[]): SitemapCategory[] => {
  return [
    {
      name: 'Main Pages',
      description: 'Core website pages and navigation',
      icon: 'fas fa-home',
      pages: mainPages
    },
    {
      name: 'Blog & News',
      description: 'Latest news and updates from Konak Construction',
      icon: 'fas fa-newspaper',
      pages: [
        {
          name: 'All News',
          path: '/news',
          description: 'Browse all news articles',
          priority: 0.8,
          changeFreq: 'weekly'
        },
        ...getNewsPages(newsItems)
      ]
    },
    {
      name: 'Projects',
      description: 'Construction projects and developments',
      icon: 'fas fa-building',
      pages: getProjectPages(projects).flatMap(project => [
        project,
        ...project.subPages
      ])
    }
  ];
};

// Utility functions for sitemap generation
export const getAllPages = (projects: any[], newsItems: any[]): SitemapPage[] => {
  const categories = getSitemapCategories(projects, newsItems);
  return categories.flatMap(category => category.pages);
};

export const getPagesByPriority = (projects: any[], newsItems: any[]): SitemapPage[] => {
  return getAllPages(projects, newsItems).sort((a, b) => (b.priority || 0) - (a.priority || 0));
};

export const getRecentlyUpdatedPages = (projects: any[], newsItems: any[], limit: number = 10): SitemapPage[] => {
  return getAllPages(projects, newsItems)
    .filter(page => page.lastModified)
    .sort((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0))
    .slice(0, limit);
};

// SEO-friendly sitemap data
export const getSEOSitemapData = (projects: any[], newsItems: any[]) => {
  return {
    pages: getAllPages(projects, newsItems),
    totalPages: getAllPages(projects, newsItems).length,
    categories: getSitemapCategories(projects, newsItems).length,
    lastUpdated: new Date(),
    website: {
      name: 'Konak Construction',
      description: 'Premium construction projects since 1971',
      url: 'https://konak-construction.com', // Replace with actual domain
      logo: '/images/konak-logo.png' // Replace with actual logo path
    }
  };
};
