import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Productos de Fabricación Gráfica: Price it, Fix it, Print it | PrintPrice Pro',
  description: 'Conoce los tres pilares de PrintPrice Pro: calculador de precios (Price it), preflight forense (Fix it) y marketplace de impresión industrial (Print it).',
  canonical: '/products',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
]);

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
