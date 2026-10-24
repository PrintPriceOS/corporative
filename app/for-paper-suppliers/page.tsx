import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Para Proveedores y Distribuidores de Papel | PrintPrice Pro',
  description: 'Publica tu catálogo técnico de sustratos, conecta tus ofertas comerciales con talleres de impresión y agiliza las cotizaciones de papel.',
};

export default function ForPaperSuppliersPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              Proveedores &amp; Distribuidores de Papel
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
              Publica tu catálogo y conecta tus ofertas con las imprentas.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Conecta tu catálogo maestro de sustratos con los motores de cálculo de las imprentas. 
              Estandariza especificaciones técnicas (gramaje, mano, certificaciones FSC/PEFC) y publica 
              tus tarifas con separación transparente entre materia prima y logística de transporte.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://control.printprice.pro/supplier/register"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
              >
                Registrar mi empresa proveedora ➔
              </a>
              <a
                href="https://control.printprice.pro/"
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
              >
                Acceso a Control Plane
              </a>
              <a
                href="https://docs.printprice.pro/docs/platform/paper-supplier-hub"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', textDecoration: 'underline', marginLeft: '0.5rem' }}
              >
                Documentación técnica de Paper Supplier Hub ↗
              </a>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
              ✓ Catálogo técnico federado · Separación transparente de costes · Solicitudes de cotización (RFQ)
            </p>
          </div>
        </Container>
      </section>

      {/* Capacidades clave para distribuidores y fabricantes */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Visibilidad directa en el momento exacto del presupuesto
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Tus calidades de papel pasan a formar parte de las opciones reales que evalúan talleres y editoriales.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📄
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Catálogo Maestro de Sustratos</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Define papeles estucados (brillo, semimate, mate), offsets blancos y ahuesados, cartulinas gráficas y folding. 
                Cada referencia incluye gramaje (g/m²), volumen específico (mano), fibra y certificaciones de sostenibilidad.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                🚚
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Fabricación vs. Transporte</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                En PrintPrice OS el precio del papel y el coste de transporte están rigurosamente disociados. 
                Evita confusiones tarifarias permitiendo que el taller conozca con certeza el coste franco fábrica y el porte logístico.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📈
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Ofertas Comerciales y Tarifas</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Gestiona tarifas por escalones de volumen (palets completos, resmas sueltas o toneladas) 
                y mantén sincronizados los precios en los motores de presupuestación sin necesidad de cruzar hojas de cálculo manuales.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Proceso en 3 pasos */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
              Cómo federar tu catálogo en 3 pasos
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Incorpora tus productos a la red de cálculo de PrintPrice OS.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>01</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Registro de Proveedor</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Crea tu cuenta de empresa proveedora en el formulario oficial de Control Plane.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>02</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Carga de Sustratos</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Publica tus familias de papel con datos técnicos normalizados: marcas, gramajes y formatos.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>03</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Conexión con Talleres</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Las imprentas vinculan tus referencias a sus máquinas y reciben presupuestos con tus materiales exactos.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ específica */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '2rem', textAlign: 'center' }}>
              Preguntas frecuentes de proveedores y distribuidores
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Es PrintPrice un intermediario de venta de papel?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  No. PrintPrice OS es la plataforma de software operativo que conecta el catálogo técnico y las tarifas del proveedor directamente con las matrices de cálculo de las imprentas. La relación comercial y la facturación de aprovisionamiento se gestionan según vuestros acuerdos.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Cómo se distinguen el catálogo técnico y las ofertas comerciales?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  El catálogo maestro define la ficha técnica inmutable del papel (gramaje, mano, blancura CIE, opacidad, certificación). Las ofertas comerciales definen tus precios por volumen, plazos de expedición y tarifas de transporte para diferentes destinos geográficos.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Se requiere integración API para empezar?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  No es obligatorio para comenzar. Puedes gestionar y cargar tus sustratos mediante el asistente visual de Paper Supplier Hub en Control Plane o conectar tus sistemas ERP a través de nuestra API REST si deseas sincronización automática de tarifas.
                </p>
              </div>
            </div>

            {/* CTA Final */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                Publica tu catálogo técnico en la red de PrintPrice OS
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Date de alta en el portal oficial de proveedores y conecta con imprentas asociadas.
              </p>
              <a
                href="https://control.printprice.pro/supplier/register"
                className="btn-primary"
                style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
              >
                Registrar empresa proveedora ➔
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
