import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Centro Legal y de Confianza | PrintPrice Pro',
  description: 'Marco contractual, privacidad, cookies, inteligencia artificial y derechos de usuarios y profesionales en PrintPrice OS. Información transparente por perfil.',
  canonical: '/legal',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Centro Legal y de Confianza', path: '/legal' },
]);

export default function LegalLayout({ children }: { children: React.ReactNode }) {
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
