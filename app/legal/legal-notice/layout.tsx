import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aviso Legal e Identidad Mercantil (Imprint) | PrintPrice Pro',
  description: 'Datos registrales, CIF/NIF intracomunitario, domicilio social y responsabilidad editorial de Print Price Pro SIA.',
  canonical: '/legal/legal-notice',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Legal', path: '/legal/legal-notice' },
  { name: 'Aviso Legal', path: '/legal/legal-notice' },
]);

export default function LegalNoticeLayout({ children }: { children: React.ReactNode }) {
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
