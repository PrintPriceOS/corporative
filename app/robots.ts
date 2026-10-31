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
          '/_next/',
          '/debug/',
          '/admin/',
          '/_not-found',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Claude-Web',
          'ClaudeBot',
          'Anthropic-AI',
          'PerplexityBot',
          'Google-Extended',
          'cohere-ai',
          'Applebot-Extended',
        ],
        allow: [
          '/',
          '/developers',
          '/solutions',
          '/products',
          '/products/budget',
          '/products/preflight',
          '/products/print',
          '/products/control',
          '/products/mockup',
          '/for-printhouses',
          '/for-publishers',
          '/for-authors',
          '/for-paper-suppliers',
          '/docs',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/debug/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
