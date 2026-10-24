import type { Metadata } from 'next';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Contacto y Soporte Técnico | PrintPrice Pro',
  description: 'Ponte en contacto con nuestro equipo técnico de ingeniería gráfica y operaciones. Asistencia en cotizaciones e integración de imprentas.',
  canonical: '/contact',
});


export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
