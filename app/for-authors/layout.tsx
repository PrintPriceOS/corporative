import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Impresión de Libros para Autores y Particulares | PrintPrice Pro',
  description: 'Calcula el presupuesto técnico de tu libro en segundos: valida sangrías en tu PDF, comprueba el grosor de lomo en 3D e imprime con talleres homologados.',
  canonical: '/for-authors',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Autores y Particulares', path: '/for-authors' },
]);

export default function ForAuthorsLayout({ children }: { children: React.ReactNode }) {
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
