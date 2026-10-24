import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Federación de Catálogo y Sustratos para Papeleras | PrintPrice Pro',
  description: 'Conecta tu catálogo maestro de bobinas y resmas directamente con el motor de cálculo editorial. Visibilidad en millones de presupuestos gráficos.',
  canonical: '/for-paper-suppliers',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Proveedores de Papel', path: '/for-paper-suppliers' },
]);

export default function ForPaperSuppliersLayout({ children }: { children: React.ReactNode }) {
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
