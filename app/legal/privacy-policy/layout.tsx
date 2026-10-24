import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Política de Privacidad y Protección de Datos (RGPD) | PrintPrice Pro',
  description: 'Tratamiento de datos personales, bases jurídicas, derechos de los usuarios y política de cookies de Print Price Pro SIA.',
  canonical: '/legal/privacy-policy',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Legal', path: '/legal/privacy-policy' },
  { name: 'Política de Privacidad', path: '/legal/privacy-policy' },
]);

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {children}
    </>
  );
}
