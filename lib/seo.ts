import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://printprice.pro';

export const SEO_DATA = {
  titleTemplate: '%s | PrintPrice Pro',
  defaultTitle: 'Print Cost Calculator & File Validation | PrintPrice Pro',
  description: 'Calculate exact print costs, validate files, and find the best print partner instantly through PrintPrice OS.',
  keywords: [
    'print cost calculator',
    'book printing cost',
    'PDF preflight',
    'print file validation',
    'print production software',
    'print workflow automation',
    'PPOS',
    'print manufacturing OS'
  ],
  ogImage: '/og/home.png'
};

export function constructMetadata({
  title = SEO_DATA.defaultTitle,
  description = SEO_DATA.description,
  image = SEO_DATA.ogImage,
  noIndex = false,
  canonical = '',
  type = 'website'
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  type?: string;
} = {}): Metadata {
  const finalTitle = title.includes('|') ? title : `${title} | PrintPrice Pro`;
  
  return {
    title: finalTitle,
    description,
    keywords: SEO_DATA.keywords,
    openGraph: {
      title: finalTitle,
      description,
      url: `${BASE_URL}${canonical}`,
      siteName: 'PrintPrice Pro',
      images: [
        {
          url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      images: [image.startsWith('http') ? image : `${BASE_URL}${image}`],
      creator: '@printpricepro',
    },
    alternates: {
      canonical: `${BASE_URL}${canonical}`,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}

export const JSON_LD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'PrintPrice Pro',
  'url': 'https://printprice.pro',
  'logo': 'https://printprice.pro/logo.png',
  'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'sales@printprice.pro',
      'contactType': 'customer service'
  }
};
