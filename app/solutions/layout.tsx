import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, OG_IMAGES, OG_IMAGE_ALTS } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Soluciones de Fabricación Gráfica Editorial y Comercial | PrintPrice Pro',
  description: 'Flujos de automatización técnica para libros, packaging, folletos comerciales y gran formato industrial con registro técnico de especificaciones.',
  canonical: '/solutions',
  image: OG_IMAGES.printIt,
  imageAlt: OG_IMAGE_ALTS.printIt,
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
