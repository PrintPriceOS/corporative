import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Paper Supplier Hub — Federación de Sustratos, Calibre (µm) y Tarifas Ex-Works | PrintPrice Pro',
  description:
    'Conecta tu catálogo maestro de bobinas y pliegos en Paper Supplier Hub (control.printprice.pro/supplier): calibre físico (µm) sincronizado con SPINE-04, tarifas escalonadas y separación estricta Ex-Works vs. porte logístico.',
  canonical: '/for-paper-suppliers',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Proveedores y Distribuidores de Papel', path: '/for-paper-suppliers' },
]);

const suppliersAppJsonLd = getSoftwareApplicationJsonLd({
  name: 'PrintPriceOS Paper Supplier Hub — Substrate Catalog & Mill-to-Press Federation',
  description:
    'B2B substrate federation portal for paper mills and distributors featuring normalized GSM/bulk/caliper (µm) catalogs, decoupled ex-works vs. regional freight pricing, and live integration into printhouse BPE & SPINE-04 engines.',
  path: '/for-paper-suppliers',
});

export default function ForPaperSuppliersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(suppliersAppJsonLd) }}
      />
      {children}
    </>
  );
}
