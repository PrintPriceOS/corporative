# Plan de Implementación: Renovación de la Web Corporativa PrintPrice.pro

**Rama de Trabajo:** `feat/corporate-stakeholder-experience`  
**Objetivo:** Transformar https://printprice.pro/ en una plataforma web clara, accesible y de alta conversión, organizada en torno a 4 perfiles clave (Autores/Particulares, Editoriales, Imprentas y Proveedores de Papel), adoptando el nuevo sistema visual amable del onboarding de Control Plane.

---

## 1. Fases e Iteraciones

### Iteración C0 — Inventario y Referencia Visual
- [x] Identificación del repositorio real (`PrintPriceOS/corporative` en GitHub, `/var/www/vhosts/printprice.pro/httpdocs` en Plesk).
- [x] Creación de la rama `feat/corporate-stakeholder-experience`.
- [x] Auditoría de stack: Next.js 16.2.1 (App Router), React 19.2.4, TypeScript 5, CSS global / variables personalizadas.
- [x] Extracción de tokens y directrices del onboarding de Control Plane (`GuidedPrinthouseJourney.tsx`, `GuidedStepCompany.tsx`, `AuthShell.tsx`).
- [x] Creación de los documentos base: `PLAN.md`, `STATUS.md`, `ROUTE_CTA_MATRIX.md`, `CLAIMS_AND_COMPARISONS.md`.

### Iteración C1 — Arquitectura para Cuatro Stakeholders
- [ ] Construcción de las 4 páginas de destino dedicadas por perfil:
  - `/for-authors`: Autores y particulares (Cálculo de presupuesto, comprobación de PDF, visualización 3D sin requisitos B2B).
  - `/for-publishers`: Editoriales (Presupuestación de títulos, catálogo de formatos, gestión de proyectos).
  - `/for-printhouses`: Imprentas (Configuración de planta, maquinarias, sustratos, enlace a `/printhouse/register`).
  - `/for-paper-suppliers`: Proveedores de papel (Catálogo técnico federado, alta autoservicio, enlace a `/supplier/register`).
- [ ] Reestructuración de la cabecera (`Header.tsx`):
  - Selector de stakeholder "Para quién" (Autores, Editoriales, Imprentas, Proveedores).
  - "Cómo funciona", "Comparativas", "Recursos" (Docs, API), "Contacto".
  - Botón "Iniciar sesión" con selector explícito de espacio (`Budget` / `Control Plane`).
  - Botón "Empezar" con selector claro de destino.
- [ ] Actualización del pie de página (`Footer.tsx`) con rutas directas y sin enlaces rotos.

### Iteración C2 — Rediseño de Portada y Sistema Visual
- [ ] Actualización de tokens globales en `globals.css`:
  - Derogación de la regla obligatoria de esquinas a 0px (`border-radius: 0px !important`).
  - Adopción de tarjetas redondeadas (`border-radius: 16px`), inputs (`border-radius: 12px`), botones y píldoras.
  - Tipografía `Manrope` humanista y legible, reduciendo tracking agresivo y mayúsculas sistemáticas.
  - Superficies discretas (modo claro `#ffffff` / `#f8fafc`, modo oscuro `#131314` / `#18181b`, rojo corporativo `#dc0000`).
- [ ] Rediseño de `app/page.tsx`:
  - Hero con valor diferencial, slogan (*PRICE IT. FIX IT. PRINT IT.*) y acceso directo a los 4 perfiles.
  - Bloque explicativo "Cómo funciona" adaptado al visitante.
  - Capacidades disponibles verificadas: Budget, Preflight, Mockup, Control Plane y Paper Hub.
  - Bloque de comparativas estructuradas y objetivas.
  - Preguntas frecuentes segmentadas.
  - Llamadas a la acción claras y honestas.

### Iteración C3 — Contenido Confiable y Comparativas
- [ ] Depuración de claims inflados ("Exact print cost" -> "Presupuesto y cálculo técnico de producción", "Zero lead time errors", "1,280 nodes", etc.).
- [ ] Matriz de comparativa objetiva basada en fuentes oficiales verificadas (Lulu para autores/editoriales; PrintVis, printIQ, Tharstern, GelatoConnect para imprentas/proveedores).

### Iteración C4 — Registros, Recursos y Coherencia entre Dominios
- [ ] Verificación exhaustiva de destinos de todos los CTA.
- [ ] Conexión limpia con `https://budget.printprice.pro/`, `https://control.printprice.pro/`, `https://docs.printprice.pro/`.
- [ ] Preservación de parámetros y eliminación de exposición de tokens o identificadores sensibles en URL.

### Iteración C5 — Accesibilidad, SEO y Verificación en Navegador
- [ ] Auditoría de contraste WCAG AA, navegación con teclado y accesibilidad de modales.
- [ ] Configuración SEO (metatags, OpenGraph, canonical, sitemap).
- [ ] Verificación visual y funcional en resoluciones de escritorio (1920x1080, 1366x768) y móvil (390x844).
- [ ] Compilación `next build` exitosa y confirmación de commits limpios en GitHub.
