import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Para Imprentas y Talleres Gráficos | PrintPrice Pro Control Plane',
  description: 'Configura tu imprenta, perfila tu maquinaria offset y digital, calibra matrices de encuadernación y conecta aprovisionamiento de papel.',
};

export default function ForPrinthousesPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              Imprentas &amp; Talleres Gráficos
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
              Configura tu imprenta y conecta capacidades, materiales y aprovisionamiento.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Diseñado para directores de producción y talleres de artes gráficas. Perfila tu parque de maquinaria 
              (offset, digital e inkjet), define matrices de preparación y merma, y recibe trabajos con artes finales 
              ya comprobadas técnicamente.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
              >
                Registrar mi imprenta ➔
              </a>
              <a
                href="https://control.printprice.pro/"
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
              >
                Acceso a Control Plane
              </a>
              <a
                href="https://docs.printprice.pro/docs/repositories/ppos-control-plane"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', textDecoration: 'underline', marginLeft: '0.5rem' }}
              >
                Guía de arquitectura y onboarding ↗
              </a>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
              ✓ Alta por correo y CIF de taller · Configuración guiada en Control Plane · Aislamiento estricto de datos de producción
            </p>
          </div>
        </Container>
      </section>

      {/* Capacidades reales de Control Plane */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Control técnico total sobre tus costes y flujos de taller
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              PrintPrice OS calcula costes en base a tus capacidades reales de fabricación, no con aproximaciones genéricas.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                ⚙️
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Perfilado de Maquinaria</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Modela prensas digitales de hoja o bobina, cuerpos offset planos (B1, B2, B3) y rotativas. 
                Configura tiempos de puesta a punto (makeready), velocidad de tirada por hora, mermas de arranque y costes por pasada.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                ✂️
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Matrices de Postimpresión</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Establece costes exactos para plegado de pliegos, alzado, cosido con hilo vegetal, fresado PUR, 
                confección de tapas duras, plastificados (mate, brillo, soft-touch) y acabados especiales.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📦
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Aprovisionamiento de Papel</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Vincula las referencias comerciales de tus proveedores de papel al cálculo de coste. 
                Los costes de fabricación y los costes de transporte de materia prima se calculan por separado con transparencia auditable.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Flujo de Configuración en 4 pasos */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
              Cómo comenzar con tu imprenta en 4 pasos
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              El onboarding guiado de Control Plane te acompaña en cada etapa de configuración.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>01</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Registro de Taller</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Crea tu cuenta con correo profesional y datos fiscales en Control Plane.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>02</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Parque de Maquinaria</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Registra tus máquinas de imprimir: formatos mínimos/máximos de pliego, pinzas y costes horarios.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>03</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Encuadernación y Papel</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Configura los tipos de encuadernación disponibles y activa sustratos de papel homologados.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.25, lineHeight: 1, marginBottom: '0.5rem' }}>04</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Producción y Pedidos</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Recibe presupuestos resueltos por servidor y archivos preflight validados con identificador de evidencia.
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
              Preguntas frecuentes de talleres e imprentas
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Quién calcula los costes y con qué fórmulas?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Los cálculos son resueltos exclusivamente por el motor de cálculo del servidor de PrintPrice OS. 
                  Se aplican tus matrices de imposición de pliegos, horas de máquina, consumo de papel con mermas y procesos de taller.
                  No hay intermediarios ni algoritmos opacos.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Mis tarifas y márgenes son públicos para otros talleres?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  No. PrintPrice OS mantiene un aislamiento estricto de tenants (multi-tenant con RBAC estricto). 
                  Tus datos de máquinas, costes horarios, márgenes y acuerdos comerciales son completamente confidenciales y privados para tu organización.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Cómo recibo los archivos listos para imprimir?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Los trabajos recibidos cuentan con un informe técnico de Preflight asociado a un identificador único (evidenceId). 
                  Esto certifica que el archivo cumple las dimensiones de corte, sangres, resolución y perfiles de color requeridos por tus máquinas.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¿Tengo que dar de baja mi sistema MIS/ERP actual?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  No. PrintPrice OS puede convivir como motor de tarificación inteligente y canal de captación técnica o integrarse con tu flujo de preprensa y gestión a través de API y especificaciones OpenAPI estándar.
                </p>
              </div>
            </div>

            {/* CTA Final */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                ¿Listo para integrar la potencia de PrintPrice OS en tu taller?
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Completa el registro canónico de imprenta y accede a la consola de Control Plane.
              </p>
              <a
                href="https://control.printprice.pro/printhouse/register"
                className="btn-primary"
                style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
              >
                Registrar mi imprenta ahora ➔
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
