import type { MetadataRoute } from 'next';

interface SitemapRoute {
  path: string;
  priority: number;
  lastModified?: Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
}

const SITE_URL = 'https://tourvistatours.com';

const POLICIES_UPDATED_AT = new Date('2026-05-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: SitemapRoute[] = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      path: '/packages',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      path: '/showcases',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      path: '/attractions',
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      path: '/culture',
      priority: 0.8,
      changeFrequency: 'weekly',
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
      lastModified: POLICIES_UPDATED_AT,
    },
    {
      path: '/policies/terms',
      priority: 0.3,
      changeFrequency: 'yearly',
      lastModified: POLICIES_UPDATED_AT,
    },
    {
      path: '/policies/cancellation-policy',
      priority: 0.3,
      changeFrequency: 'yearly',
      lastModified: POLICIES_UPDATED_AT,
    },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified ?? now,
    changeFrequency: route.changeFrequency ?? 'weekly',
    priority: route.priority,
  }));
}
