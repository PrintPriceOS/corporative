import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://printprice.pro';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0 },
    { path: '/for-authors', priority: 0.9 },
    { path: '/for-publishers', priority: 0.9 },
    { path: '/for-printhouses', priority: 0.9 },
    { path: '/for-paper-suppliers', priority: 0.9 },
    { path: '/platform', priority: 0.8 },
    { path: '/products/budget', priority: 0.8 },
    { path: '/products/preflight', priority: 0.8 },
    { path: '/products/mockup', priority: 0.8 },
    { path: '/products/control', priority: 0.8 },
    { path: '/developers', priority: 0.8 },
    { path: '/company', priority: 0.7 },
    { path: '/governance', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
    { path: '/contact/partner', priority: 0.7 },
    { path: '/legal/privacy-policy', priority: 0.5 },
    { path: '/legal/terms-of-service', priority: 0.5 },
    { path: '/legal/legal-notice', priority: 0.5 },
  ].map((item) => ({
    url: `${BASE_URL}${item.path}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as any,
    priority: item.priority,
  }));

  return routes;
}
