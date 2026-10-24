import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'API para Fabricación Gráfica y Automatización | PrintPrice Pro',
  description: 'Integra presupuesto, preflight PDF y enrutamiento de producción directamente en tu aplicación. Explora la API de PrintPrice OS.',
  canonical: '/developers',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Desarrolladores', path: '/developers' },
]);

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
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
