import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Términos de Servicio | PrintPrice Pro',
  description: 'Condiciones de contratación, uso de la plataforma, delimitación de responsabilidades y términos de fabricación.',
  canonical: '/legal/terms-of-service',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Legal', path: '/legal/terms-of-service' },
  { name: 'Términos de Servicio', path: '/legal/terms-of-service' },
]);

export default function TermsLayout({ children }: { children: React.ReactNode }) {
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
