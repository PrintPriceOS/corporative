import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Únete a la Red de Partners de Impresión | PrintPrice Pro',
  description: 'Forma parte de la red de talleres gráficos asociados y distribuidores de papel en Europa. Recibe trabajos verificados y listos para producción con PrintPrice OS.',
  canonical: '/contact/partner',
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Contacto', path: '/contact' },
  { name: 'Red de Partners', path: '/contact/partner' },
]);

export default function ContactPartnerLayout({ children }: { children: React.ReactNode }) {
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
