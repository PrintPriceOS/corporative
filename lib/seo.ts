import { Metadata } from 'next';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://printprice.pro';

export const SEO_DATA = {
  titleTemplate: '%s | PrintPrice Pro',
  defaultTitle: 'PrintPrice Pro — Plataforma de Inteligencia y Cotización de Impresión Editorial',
  description: 'Calcula costes reales de imprenta, preflight automático de PDF y enrutamiento con imprentas industriales mediante PrintPrice OS.',
  keywords: [
    'calculadora impresion libros',
    'cotizacion editorial',
    'impresion libros tiradas cortas',
    'preflight PDF imprenta',
    'motor calculo imprenta',
    'software gestion imprenta',
    'paper supplier hub',
    'PrintPrice OS',
    'PPOS',
    'price it fix it print it'
  ],
  ogImage: '/og/home.png'
};

export function constructMetadata({
  title = SEO_DATA.defaultTitle,
  description = SEO_DATA.description,
  image = SEO_DATA.ogImage,
  noIndex = false,
  canonical = '',
  type = 'website',
  locale = 'es_ES',
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  type?: string;
  locale?: string;
} = {}): Metadata {
  const finalTitle = title.includes('|') || title.includes('—') ? title : `${title} | PrintPrice Pro`;
  const canonicalUrl = `${BASE_URL}${canonical.startsWith('/') ? canonical : canonical ? `/${canonical}` : ''}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  return {
    title: finalTitle,
    description,
    keywords: SEO_DATA.keywords,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName: 'PrintPrice Pro',
      locale,
      images: [
        {
          url: fullImageUrl,
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
      images: [fullImageUrl],
      creator: '@printpricepro',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/assets/logo.png',
      shortcut: '/assets/logo.png',
      apple: '/assets/logo.png',
    },
  };
}

export const JSON_LD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://printprice.pro/#organization',
  name: 'PrintPrice Pro',
  legalName: 'Print Price Pro SIA',
  url: 'https://printprice.pro',
  logo: 'https://printprice.pro/assets/logo.png',
  email: 'info@printprice.pro',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bruņinieku iela 60-8',
    addressLocality: 'Rīga',
    postalCode: 'LV-1009',
    addressCountry: 'LV'
  },
  taxID: 'LV40203631570',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@printprice.pro',
    contactType: 'customer service',
    availableLanguage: ['es', 'en', 'de']
  },
  sameAs: [
    'https://budget.printprice.pro',
    'https://control.printprice.pro',
    'https://docs.printprice.pro'
  ]
};

export const JSON_LD_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://printprice.pro/#website',
  url: 'https://printprice.pro',
  name: 'PrintPrice Pro',
  publisher: {
    '@id': 'https://printprice.pro/#organization'
  },
  inLanguage: ['es', 'en', 'de']
};

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    }))
  };
}

export function getSoftwareApplicationJsonLd({
  name,
  description,
  path
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${BASE_URL}${path}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All (Web Cloud)',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'EUR'
    },
    publisher: {
      '@id': 'https://printprice.pro/#organization'
    }
  };
}
