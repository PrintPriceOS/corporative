import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Calculador de Costes de Impresión (Price It) | PrintPrice Pro',
  description: 'Calcula presupuestos de impresión de libros en segundos con matrices de máquinas reales. Desglose técnico de papel, encuadernación y acabados.',
  canonical: '/products/budget',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Price It (Presupuestos)', path: '/products/budget' },
]);

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
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
