import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd, JSON_LD_DEVELOPERS_SCHEMA, OG_IMAGES, OG_IMAGE_ALTS } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Developer Hub & REST API — Industrial Print Pricing & 3D Pallet Cubing | PrintPrice Pro',
  description:
    'Integrate the deterministic Book Pricing Engine (BPE), SPINE-04 cover geometry, 3D FEFCO 0201 / EUR-EPAL pallet cubing, and editorial warehouse compliance (Zeitfracht, VVA Arvato, Amazon FBA) via REST API.',
  canonical: '/developers',
  image: OG_IMAGES.printIt,
  imageAlt: OG_IMAGE_ALTS.printIt,
});

const breadcrumbs = getBreadcrumbJsonLd([
  { name: 'Inicio', path: '/' },
  { name: 'Desarrolladores & API', path: '/developers' },
]);

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DEVELOPERS_SCHEMA) }}
      />
      {children}
    </>
  );
}
