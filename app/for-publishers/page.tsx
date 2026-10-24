import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espacio para Editoriales | PrintPrice Pro',
  description: 'Prepara presupuestos editoriales, compara tiradas offset y digitales y organiza tus proyectos de impresión con matrices de producción reales.',
};

export default function ForPublishersPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '780px' }}>
            <span className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              Editoriales &amp; Publishers
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
              Prepara presupuestos y organiza tus proyectos de impresión.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Diseñado para sellos editoriales, directores de producción y gestores de catálogo.
              Compara costes escalonados por tirada, valida artes finales con preflight técnico
              y mantén el control técnico de cada reedición.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
              >
                Empezar un proyecto ➔
              </a>
              <Link
                href="/contact"
                className="btn-secondary"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem' }}
              >
                Hablar con un asesor editorial
              </Link>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
              ✓ Presupuestos en vivo · Catálogos de papel estandarizados · Soporte para múltiples títulos
            </p>
          </div>
        </Container>
      </section>

      {/* Qué puede hacer el equipo editorial */}
      <Section showGrid={false}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Capacidades para la gestión de catálogo editorial
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Precisión industrial para que tus tiradas no se desvíen ni un euro de la previsión de costes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📊
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Matrices de Coste Escalonadas</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Evalúa en una sola pantalla los costes por unidad según diferentes volúmenes de impresión (300, 500, 1.000, 3.000 ejemplares), identificando con exactitud el punto de cruce entre tecnología digital y offset.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                📚
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Encuadernación Profesional</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Soporte integral para los principales estándares editoriales: rústica cosida con hilo vegetal, fresada con cola PUR, tapa dura (cartoné con cabezadas y cintas de registro) y grapa para catálogos.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-container)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                🔍
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Auditoría Técnica de PDF</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Comprueba las artes finales de maquetadores y diseñadores antes del envío a imprenta. Detecta transparencias no acopladas, sobreimpresiones conflictivas y tintas directas no convertidas.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Flujo en 3 pasos */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
              Cómo gestionar tus títulos en 3 pasos
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Flujo unificado para la coordinación de producción editorial.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="rounded-card" style={{ padding: '1.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 1</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Especifica el formato del título</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Introduce las dimensiones de corte, páginas de tripa, tipo de papel interior (offset ahuesado, estucado, etc.) y plastificado de cubierta.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 2</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Compara tramos de tirada</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Analiza las curvas de coste unitario y guarda el presupuesto en tu espacio editorial para revisiones de equipo.
              </p>
            </div>

            <div className="rounded-card" style={{ padding: '1.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paso 3</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Valida archivos y produce</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Comprueba las artes finales con el motor de preflight y lanza la orden de producción con talleres especializados homologados.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Editoriales */}
      <Section showGrid={false}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.85rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              Preguntas Frecuentes de Editoriales
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿Podemos solicitar papeles o marcas específicas de editorial?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Sí. A través de la vinculación con el Hub de Proveedores de Papel, el sistema soporta papeles estándar (offset blanco, ahuesado/coral, estucados mate/brillo) y gamas de fabricantes certificados con sellos FSC/PEFC.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿Cómo se gestionan las reediciones de un título?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Cada presupuesto aprobado conserva una evidencia técnica inmutable (`evidenceId`). Para una segunda o tercera edición, puedes reabrir las especificaciones y recalcular el coste según las nuevas cantidades sin tener que volver a definir el libro desde cero.
                </p>
              </div>

              <div className="rounded-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>¿Se admiten acabados de cubierta especiales?</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  El cotizador contempla plastificados (mate, brillo, soft-touch o antirayado), y puedes consultar opciones para barniz UVI selectivo, serigrafía y estampación en golpe seco o stamping metálico.
                </p>
              </div>
            </div>

            {/* CTA Final */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-card-lg)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>¿Quieres cotizar tu próximo título editorial?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Accede a Budget y calcula el coste de tu proyecto con matrices de taller en tiempo real.
              </p>
              <a
                href="https://budget.printprice.pro/"
                className="btn-primary"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                Entrar al espacio editorial en Budget ➔
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
