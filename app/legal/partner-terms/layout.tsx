import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Condiciones para Partners de Producción | PrintPrice Pro',
  description: 'Estándares de calidad de fabricación, SLAs de entrega y protocolo de resolución técnica con hash de evidencia.',
  canonical: '/legal/partner-terms',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Legal', path: '/legal/partner-terms' },
  { name: 'Condiciones para Partners', path: '/legal/partner-terms' },
]);

export default function PartnerTermsLayout({ children }: { children: React.ReactNode }) {
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
