import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprime tu libro | PrintPrice Pro para Autores y Particulares',
  description: 'Calcula tu presupuesto online, comprueba tus archivos PDF con preflight técnico y visualiza tu libro en 3D antes de imprimir.',
};

export default function ForAuthorsPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '780px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              Autores y Particulares
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
              Imprime tu libro, comprueba tus archivos y visualiza cómo quedará.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Sin mínimos obligatorios, sin requisitos de empresa ni trámites B2B complejos.
              Calcula el presupuesto en segundos, comprueba si tu PDF está listo para imprenta
              y visualiza una maqueta 3D de tu portada y lomo.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
              >
                Imprimir mi libro ➔
              </a>
              <a
                href="https://budget.printprice.pro/"
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
              >
                Calcular presupuesto
              </a>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
              ✓ Abierto a cualquier particular · Sin compromiso · Estimación técnica inmediata
            </p>
          </div>
        </Container>
      </section>

      {/* Qué puedes hacer hoy */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Todo lo que necesitas antes de entrar a imprenta
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Herramientas de precisión para que tu libro se imprima exactamente como lo imaginaste.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                €
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Presupuesto Transparente</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Configura formato, número de páginas, tipo de papel y encuadernación (tapa blanda, tapa dura o grapa).
                El sistema resuelve el coste estimado al instante según opciones de tirada digital u offset.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                ✓
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Comprobación Técnica (Preflight)</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Verifica automáticamente que tu archivo PDF cumple las exigencias técnicas: sangres de 3 mm,
                imágenes a 300 DPI, modo de color CMYK y cobertura total de tinta (TAC).
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📖
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Maqueta 3D Interactiva</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Genera una vista previa tridimensional de tu libro con portada, contraportada y grosor de lomo
                estimado según el gramaje del papel elegido antes de enviar a taller.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cómo empezar en 4 pasos */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
              Cómo imprimir tu libro en 4 pasos
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Un proceso guiado, sin sorpresas y con control total en cada fase.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 1</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Configura tu libro</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Entra a Budget, indica tamaño (p. ej. 15×21 cm), páginas interiores, tipo de papel y acabado de cubierta.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 2</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Estima tu coste</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Revisa los escalados de tirada (desde 25 ejemplares hasta miles) y elige la opción que mejor se ajuste.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 3</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Comprueba tu PDF</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Pasa tu archivo por el análisis de preflight para detectar cualquier error de sangres o resolución antes de imprimir.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 4</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Revisa la maqueta 3D</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Comprueba la apariencia espacial de tu libro y confirma tu pedido con talleres de impresión homologados.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Preguntas Frecuentes */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              Preguntas Frecuentes de Autores
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿Necesito ser empresa o tener CIF para imprimir?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  No. PrintPrice Budget está abierto a cualquier particular o autor independiente. Puedes calcular tu presupuesto y realizar pedidos a título individual sin trámites de empresa.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿La comprobación de PDF corrige las faltas de ortografía de mi libro?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  No. El preflight realiza una comprobación estrictamente técnica del archivo para imprenta (resolución de imágenes, sangres de 3 mm, tipografías incrustadas y perfiles de color CMYK). No sustituye la corrección ortotipográfica ni la revisión editorial del texto.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿La maqueta 3D sustituye a una prueba física en papel?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  La maqueta digital en 3D permite visualizar el lomo estimado y la disposición de cubiertas de forma interactiva en pantalla. Sin embargo, no equivale a una prueba física de contrato en papel, ya que los monitores RGB difieren de la absorción de tintas en prensa.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿Hay un número mínimo de ejemplares obligatorio?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Puedes calcular desde tiradas reducidas en impresión digital (adecuadas para pruebas o autopublicación) hasta tiradas medias y grandes en offset con costes unitarios decrecientes.
                </p>
              </div>
            </div>

            {/* CTA Final */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card-lg)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>¿Listo para presupuestar tu libro?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Introduce los datos de tu proyecto en el cotizador y obtén una estimación inmediata.
              </p>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                Calcular mi presupuesto en Budget ➔
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
