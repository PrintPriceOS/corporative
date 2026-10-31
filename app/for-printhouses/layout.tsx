import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd, OG_IMAGES, OG_IMAGE_ALTS } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Control Plane para Imprentas — ERP Gráfico, Maquinaria y Cubicaje 3D EPAL | PrintPrice Pro',
  description:
    'Conecta tu imprenta a Control Plane (control.printprice.pro): onboarding guiado de 12 módulos, perfilado offset/digital, Paper Supplier Hub, matriz de cubicaje 3D EPAL (Zeitfracht / VVA) y pedidos con PDF auditados.',
  canonical: '/for-printhouses',
  image: OG_IMAGES.printIt,
  imageAlt: OG_IMAGE_ALTS.printIt,
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Imprentas y Talleres (Control Plane)', path: '/for-printhouses' },
]);

const controlPlaneAppJsonLd = getSoftwareApplicationJsonLd({
  name: 'PrintPriceOS Control Plane — Printhouse Hub & 3D Logistics ERP',
  description:
    'Industrial operating system for print houses and bindery plants featuring 12-module guided onboarding, offset/digital fleet profiling, Paper Supplier Hub integration, and 3D EUR-EPAL pallet cubing.',
  path: '/for-printhouses',
});

export default function ForPrinthousesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(controlPlaneAppJsonLd) }}
      />
      {children}
    </>
  );
}
