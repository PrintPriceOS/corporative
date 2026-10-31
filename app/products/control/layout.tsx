import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd, OG_IMAGES, OG_IMAGE_ALTS } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Control Plane (:8081) — Consola Operativa Multi-Tenant, RBAC & Logística 3D | PrintPrice Pro',
  description:
    'Consola operativa oficial de PrintPrice OS (control.printprice.pro): configuración de 12 módulos de taller, Paper Supplier Hub, motor de cubicaje 3D EPAL (Zeitfracht / Arvato) y API REST gobernada.',
  canonical: '/products/control',
  image: OG_IMAGES.printIt,
  imageAlt: OG_IMAGE_ALTS.printIt,
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Control Plane', path: '/products/control' },
]);

const controlAppJsonLd = getSoftwareApplicationJsonLd({
  name: 'PrintPriceOS Control Plane (:8081)',
  description:
    'Multi-tenant B2B operating console for print houses and paper suppliers featuring RBAC governance, 12-module facility setup, 3D EPAL logistics cubing, and preflight worker orchestration.',
  path: '/products/control',
});

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(controlAppJsonLd) }}
      />
      {children}
    </>
  );
}
