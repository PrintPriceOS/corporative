import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Calculador de Costes de Impresión y Geometría de Lomo (Price It) | PrintPrice Pro',
  description:
    'Calcula presupuestos de impresión de libros en segundos en budget.printprice.pro. Imposición en servidor BPE, selector de papel con micras (µm), calculadora de lomo SPINE-04, diagnóstico PDF y asistente IA.',
  canonical: '/products/budget',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Price It (Calculador Budget)', path: '/products/budget' },
]);

const budgetAppJsonLd = getSoftwareApplicationJsonLd({
  name: 'PrintPrice Budget — Book Price Calculator & Spine Geometry Workstation',
  description:
    'Server-side Book Pricing Engine (BPE), micron-verified SPINE-04 cover spread calculator, federated paper catalog selector, client-side PDF binary diagnostics, and AI specification assistant.',
  path: '/products/budget',
});

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(budgetAppJsonLd) }}
      />
      {children}
    </>
  );
}
