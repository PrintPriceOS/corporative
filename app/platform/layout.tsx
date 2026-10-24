import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, getSoftwareApplicationJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Arquitectura de PrintPrice OS | Infraestructura Gráfica',
  description: 'Descubre los motores técnicos que componen PrintPrice OS: cálculo de imposición, validación preflight y enrutamiento algorítmico de producción.',
  canonical: '/platform',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Plataforma', path: '/platform' },
]);

const softwareApp = getSoftwareApplicationJsonLd({
  name: 'PrintPrice OS Platform',
  description: 'Plataforma modular para cálculo, imposición, preflight y matchmaker en producción editorial.',
  path: '/platform',
});

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
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
