import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Generador de Maquetas 3D de Libros (Mockup) | PrintPrice Pro',
  description: 'Herramienta complementaria de visualización 3D para libros. Genera previsualizaciones comerciales de tu cubierta antes de imprenta.',
  image: '/og/mockup.png',
  canonical: '/products/mockup',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Maqueta 3D', path: '/products/mockup' },
]);

export default function MockupLayout({ children }: { children: React.ReactNode }) {
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
