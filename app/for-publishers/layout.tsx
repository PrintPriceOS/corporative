import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Software Editorial, Coste Landed y Logística 3D (Zeitfracht / Arvato) | PrintPrice Pro',
  description:
    'Optimiza tiradas editoriales y reediciones con matrices Digital vs. Offset, desglose estricto Mfg ≠ Pack ≠ Freight, optimizador de tirada ΔQ- / ΔQ+ y cumplimiento logístico 3D EPAL para Zeitfracht Erfurt, VVA Arvato y Amazon FBA.',
  canonical: '/for-publishers',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Editoriales y Sellos (Publishers)', path: '/for-publishers' },
]);

const publishersAppJsonLd = getSoftwareApplicationJsonLd({
  name: 'PrintPriceOS for Publishers — Landed Cost, SPINE-04 & Editorial Warehouse Compliance',
  description:
    'Publishing production and landed-cost optimization platform with Digital/Offset crossover matrices, ΔQ- / ΔQ+ pallet run optimization, SPINE-04 cover spread geometry, and Zeitfracht/Arvato/Amazon FBA dock compliance.',
  path: '/for-publishers',
});

export default function ForPublishersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publishersAppJsonLd) }}
      />
      {children}
    </>
  );
}
