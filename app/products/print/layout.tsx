import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Marketplace de Impresión y Fabricación Gráfica | PrintPrice Pro',
  description: 'Encuentra la imprenta industrial homologada para tu libro o catálogo. Enrutamiento algorítmico (Matchmaker) según pliegos, maquinaria y evidencia técnica inmutable.',
  canonical: '/products/print',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Print it (Marketplace)', path: '/products/print' },
]);

const softwareApp = getSoftwareApplicationJsonLd({
  name: 'PrintPrice Print Marketplace',
  description: 'Marketplace y motor de enrutamiento algorítmico hacia talleres gráficos homologados para la fabricación editorial e industrial.',
  path: '/products/print',
});

export default function PrintProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      {children}
    </>
  );
}
