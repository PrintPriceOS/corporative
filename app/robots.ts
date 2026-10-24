import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/debug/',
          '/admin/',
          '/_not-found',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
