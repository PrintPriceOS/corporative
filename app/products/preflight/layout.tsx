import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Comprueba tu PDF antes de imprimir | PrintPrice Preflight',
  description: 'Identifica problemas técnicos en tu PDF (sangrado, resolución de imágenes, fuentes, espacios de color) y prepara tu archivo para imprenta con PrintPrice Preflight.',
  canonical: '/products/preflight',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'PrintPrice Preflight', path: '/products/preflight' },
]);

const softwareApp = getSoftwareApplicationJsonLd({
  name: 'PrintPrice Preflight',
  description: 'Motor de análisis y validación técnica determinista de archivos PDF para impresión editorial e industrial.',
  path: '/products/preflight',
});

export default function PreflightLayout({ children }: { children: React.ReactNode }) {
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
