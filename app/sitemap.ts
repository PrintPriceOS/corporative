import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/developers', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/budget', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/for-printhouses', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/for-publishers', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/for-authors', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/for-paper-suppliers', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/preflight', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/print', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/control', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/products/mockup', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/solutions', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/platform', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/docs', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/company', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/governance', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact/partner', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/legal', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/legal/terms-of-service', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/legal/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/legal/legal-notice', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/legal/partner-terms', priority: 0.5, changeFrequency: 'yearly' },
  ];

  return routes.map((item) => {
    const fullUrl = `${BASE_URL}${item.path}`;
    return {
      url: fullUrl,
      lastModified: now,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      alternates: {
        languages: {
          en: `${fullUrl}?lang=en`,
          es: `${fullUrl}?lang=es`,
          de: `${fullUrl}?lang=de`,
        },
      },
    };
  });
}
