import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Soluciones de Fabricación Gráfica Editorial y Comercial | PrintPrice Pro',
  description: 'Flujos de automatización técnica para libros, packaging, folletos comerciales y gran formato industrial con registro técnico de especificaciones.',
  canonical: '/solutions',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Soluciones', path: '/solutions' },
]);

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
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
