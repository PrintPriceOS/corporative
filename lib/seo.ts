import { Metadata } from 'next';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://printprice.pro';

export const SEO_DATA = {
  titleTemplate: '%s | PrintPrice Pro',
  defaultTitle:
    'PrintPrice Pro — Industrial Print Pricing Engine, 3D Pallet Cubing & Book Manufacturing ERP',
  description:
    'Industrial Intelligence Layer for book printing and 3D editorial logistics. Deterministic Book Pricing Engine (BPE), SPINE-04 cover geometry, automated PDF preflight, and EUR-EPAL 3D pallet cubing compliant with Zeitfracht, VVA Arvato, and Amazon FBA.',
  keywords: [
    'Industrial Print Pricing Engine',
    '3D Pallet Cubing',
    'Editorial Warehouse Logistics',
    'Book Manufacturing ERP',
    'Book Pricing Engine BPE',
    'SPINE-04 book spine calculator',
    'Zeitfracht Erfurt pallet compliance',
    'VVA Arvato Gütersloh book logistics',
    'FEFCO 0201 book cartonization',
    'calculadora impresion libros',
    'cotizacion editorial',
    'preflight PDF imprenta',
    'paper supplier hub',
    'PrintPrice OS',
    'PrintPrice Pro',
    'price it fix it print it',
  ],
  ogImage: '/og/home.png',
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
  const finalTitle =
    title.includes('|') || title.includes('—') ? title : `${title} | PrintPrice Pro`;
  const cleanPath = canonical.startsWith('/')
    ? canonical
    : canonical
    ? `/${canonical}`
    : '';
  const canonicalUrl = `${BASE_URL}${cleanPath}`;
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  return {
    title: finalTitle,
    description,
    keywords: SEO_DATA.keywords,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName: 'PrintPriceOS (PrintPrice Pro)',
      locale,
      alternateLocale: ['en_US', 'de_DE'],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: 'PrintPriceOS — Industrial Intelligence Layer for Book Printing & 3D Logistics',
        },
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
      languages: {
        en: `${canonicalUrl}?lang=en`,
        es: `${canonicalUrl}?lang=es`,
        de: `${canonicalUrl}?lang=de`,
      },
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
  name: 'PrintPriceOS',
  alternateName: 'PrintPrice Pro',
  legalName: 'Print Price Pro SIA',
  url: 'https://printprice.pro',
  logo: 'https://printprice.pro/assets/logo.png',
  email: 'info@printprice.pro',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bruņinieku iela 60-8',
    addressLocality: 'Rīga',
    postalCode: 'LV-1009',
    addressCountry: 'LV',
  },
  taxID: 'LV40203631570',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@printprice.pro',
    contactType: 'customer service',
    availableLanguage: ['es', 'en', 'de'],
  },
  sameAs: [
    'https://github.com/PrintPriceOS',
    'https://docs.printprice.pro',
    'https://budget.printprice.pro',
    'https://control.printprice.pro',
  ],
};

export const JSON_LD_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://printprice.pro/#website',
  url: 'https://printprice.pro',
  name: 'PrintPriceOS — Industrial Print Pricing & 3D Logistics Platform',
  publisher: {
    '@id': 'https://printprice.pro/#organization',
  },
  inLanguage: ['es', 'en', 'de'],
};

export const JSON_LD_SOFTWARE_APPLICATION = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://printprice.pro/#application',
  name: 'PrintPriceOS Industrial Platform',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Book Manufacturing ERP & 3D Print Logistics Engine',
  operatingSystem: 'Web, Cloud',
  url: 'https://printprice.pro',
  description:
    'Industrial intelligence layer, deterministic Book Pricing Engine (BPE), SPINE-04 cover geometry calculator, automated PDF preflight, and 3D EUR-EPAL cubing logistics engine for book printing manufacturing.',
  featureList: [
    'Deterministic Sheetfed & Digital Book Pricing Engine (BPE)',
    'Micron-Verified Spine & Cover Spread Geometry Calculator (SPINE-04)',
    '3D FEFCO 0201 Cartonization & EUR-EPAL Pallet Cubing',
    'Zeitfracht Erfurt (1200mm), VVA Arvato (1300mm) & Amazon FBA Compliance',
    'Federated Paper Supplier Hub & Multi-Tenant Printhouse Control Plane',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  publisher: {
    '@id': 'https://printprice.pro/#organization',
  },
};

export const JSON_LD_GLOBAL_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [JSON_LD_ORGANIZATION, JSON_LD_WEBSITE, JSON_LD_SOFTWARE_APPLICATION],
};

export const JSON_LD_DEVELOPERS_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'APIReference',
      '@id': 'https://printprice.pro/developers#api-reference',
      name: 'PrintPriceOS Control Plane & 3D Logistics REST API',
      description:
        'High-precision REST endpoints for 3D packaging cubing (POST /api/logistics/calculate-quote), EUR-EPAL pallet calculation, spine geometry (POST /api/v1/spine/calculate), and deterministic print production pricing (POST /api/marketplace/offers).',
      url: 'https://printprice.pro/developers',
      targetUrl: 'https://printprice.pro/developers',
      documentation: 'https://docs.printprice.pro/docs/api/overview',
      termsOfService: 'https://printprice.pro/legal/terms-of-service',
      executableLibraryName: 'PrintPriceOS REST API v1',
      programmingModel: 'REST / JSON / OpenAPI 3.1',
      provider: {
        '@id': 'https://printprice.pro/#organization',
      },
    },
    {
      '@type': 'TechArticle',
      '@id': 'https://printprice.pro/developers#tech-article',
      headline:
        'Programmatic Infrastructure for Print Manufacturing, Spine Geometry & 3D Pallet Logistics',
      description:
        'Technical developer guide for integrating the PrintPriceOS Book Pricing Engine (BPE :8004), Control Plane (:8081), FEFCO 0201 cartonization, and editorial warehouse dock profiles (Zeitfracht, VVA Arvato, Amazon FBA).',
      url: 'https://printprice.pro/developers',
      proficiencyLevel: 'Expert',
      author: {
        '@id': 'https://printprice.pro/#organization',
      },
      publisher: {
        '@id': 'https://printprice.pro/#organization',
      },
      about: [
        'Industrial Print Pricing Engine',
        '3D Pallet Cubing',
        'Editorial Warehouse Logistics',
        'Book Manufacturing ERP',
      ],
    },
  ],
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
    })),
  };
}

export function getSoftwareApplicationJsonLd({
  name,
  description,
  path,
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
      priceCurrency: 'EUR',
    },
    publisher: {
      '@id': 'https://printprice.pro/#organization',
    },
  };
}
