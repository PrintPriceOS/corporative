import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://printprice.pro';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/platform',
    '/products/budget',
    '/products/preflight',
    '/products/control',
    '/ai-agent',
    '/developers',
    '/solutions/commercial',
    '/solutions/large-format',
    '/solutions/packaging',
    '/company',
    '/governance',
    '/contact',
    '/contact/partner',
    '/legal/privacy-policy',
    '/legal/terms-of-service',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as any,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
