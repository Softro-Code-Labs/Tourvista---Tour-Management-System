import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tourvistatours.com';
  const now = new Date();

  const routes = [
    {
      path: '',
      priority: 1.0,
    },
    {
      path: '/attractions',
      priority: 0.8,
    },
    {
      path: '/culture',
      priority: 0.8,
    },
    {
      path: '/tours',
      priority: 0.8,
    },
    {
      path: '/contact',
      priority: 0.5,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route.priority,
  }));
}
