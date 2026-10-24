import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastModified: string;
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/for-authors', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/for-publishers', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/for-printhouses', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/for-paper-suppliers', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/products/budget', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/products/preflight', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/products/print', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-10-24' },
    { path: '/platform', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-10-24' },
    { path: '/solutions', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-10-24' },
    { path: '/developers', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-10-24' },
    { path: '/company', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/governance', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-10-15' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-10-24' },
    { path: '/contact/partner', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-10-24' },
    { path: '/legal/terms-of-service', priority: 0.5, changeFrequency: 'yearly', lastModified: '2026-10-15' },
    { path: '/legal/privacy-policy', priority: 0.5, changeFrequency: 'yearly', lastModified: '2026-10-15' },
    { path: '/legal/legal-notice', priority: 0.5, changeFrequency: 'yearly', lastModified: '2026-10-15' },
    { path: '/legal/partner-terms', priority: 0.5, changeFrequency: 'yearly', lastModified: '2026-10-15' },
  ];

  return routes.map((item) => ({
    url: `${BASE_URL}${item.path}`,
    lastModified: item.lastModified,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
