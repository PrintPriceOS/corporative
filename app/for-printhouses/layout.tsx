import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Motor de Captación y Modelado para Imprentas | PrintPrice Pro',
  description: 'Recibe órdenes de trabajo verificadas con trazabilidad técnica garantizada, modelado de maquinaria gráfica y preflight determinista.',
  canonical: '/for-printhouses',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Imprentas y Talleres', path: '/for-printhouses' },
]);

export default function ForPrinthousesLayout({ children }: { children: React.ReactNode }) {
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
