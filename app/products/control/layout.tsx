import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Control Plane | Consola Operativa para Imprentas y Proveedores',
  description: 'Espacio operativo oficial de PrintPrice OS para imprentas y proveedores de papel: perfilado de máquinas, matrices de acabado y recepción de trabajos preflight.',
  canonical: '/products/control',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Control Plane', path: '/products/control' },
]);

export default function ControlLayout({ children }: { children: React.ReactNode }) {
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
