import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Software de Cotización y Gestión Editorial | PrintPrice Pro',
  description: 'Optimiza presupuestos de novedades y reediciones con matrices multi-cantidad, curvas de coste offset/digital y auditoría técnica de archivos.',
  canonical: '/for-publishers',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Editoriales', path: '/for-publishers' },
]);

export default function ForPublishersLayout({ children }: { children: React.ReactNode }) {
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
