import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Sobre PrintPrice Pro | Misión y Principios de Ingeniería',
  description: 'Conoce los principios de ingeniería detrás de PrintPrice OS: determinación de costes, evidencias verificables y conectividad industrial.',
  canonical: '/company',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Empresa', path: '/company' },
]);

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
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
