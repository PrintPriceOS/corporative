import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Gobernanza y Trazabilidad Técnica | PrintPrice Pro',
  description: 'Descubre los principios de trazabilidad y gobernanza de PrintPrice OS: validación determinista de archivos, políticas técnicas de taller y registro auditable.',
  canonical: '/governance',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Gobernanza', path: '/governance' },
]);

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
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
