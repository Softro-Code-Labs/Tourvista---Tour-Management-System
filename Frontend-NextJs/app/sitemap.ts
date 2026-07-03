import type { MetadataRoute } from 'next';

interface SitemapRoute {
  path: string;
  priority: number;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tourvistatours.com';
  const now = new Date();

  const routes: SitemapRoute[] = [
    {
      path: '',
      priority: 1.0,
    },
    {
      path: '/packages',
      priority: 0.9,
    },
    {
      path: '/reservations',
      priority: 0.9,
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
      path: '/showcases',
      priority: 0.8,
    },
    {
      path: '/contact',
      priority: 0.5,
      changeFrequency: 'yearly',
    },
    {
      path: '/policies/privacy',
      priority: 0.3,
      changeFrequency: 'yearly',
    },
    {
      path: '/policies/terms',
      priority: 0.3,
      changeFrequency: 'yearly',
    },
    {
      path: '/policies/cancellation-policy',
      priority: 0.3,
      changeFrequency: 'yearly',
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now.toISOString(),
    changeFrequency: route.changeFrequency ?? 'weekly',
    priority: route.priority,
  }));
}
