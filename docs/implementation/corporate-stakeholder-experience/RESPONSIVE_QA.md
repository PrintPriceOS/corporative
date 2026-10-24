# Informe de Auditoría y Verificación de Responsividad — PrintPrice Pro

**Fecha de ejecución:** 24 de octubre de 2026  
**Rama de trabajo:** `feat/corporate-stakeholder-experience`  
**Entorno de prueba:** Servidor de producción local (`next start -p 3010`)  
**Motor de verificación automatizada:** Playwright Chromium (Headless Real Browser Automation)

---

## 1. Resumen Ejecutivo de la Auditoría

Se ha ejecutado una auditoría exhaustiva de responsividad y reflow sobre las 12 rutas públicas clave de la web corporativa en los 9 viewports reglamentarios de la matriz (108 combinaciones página/viewport), además de pruebas funcionales de interacción para menú móvil, bloqueo de scroll en drawer y modales, y cambios de idioma en tiempo real.

| Métrica | Resultado |
|---|---|
| **Páginas evaluadas** | 12 páginas públicas representativas |
| **Viewports comprobados** | 9 tamaños de pantalla (320px hasta 1920px) |
| **Combinaciones probadas** | 108 combinaciones |
| **Pruebas superadas (PASS)** | **108 (100 %)** |
| **Desbordamientos horizontales no contenidos** | **0** |
| **Interacción Menú Móvil (Escape + Scroll Lock)** | **100 % verificado** |
| **Interacción Modales (Escape + Scroll Lock)** | **100 % verificado** |
| **Paridad de reflow en alemán (DE)** | **100 % verificado (sin desbordamiento)** |

---

## 2. Matriz de Comprobación y Resultados

Todos los viewports fueron evaluados verificando la condición matemática:  
`document.documentElement.scrollWidth <= document.documentElement.clientWidth` (tolerancia 1.5 px por subpíxeles).

| Página | 320×568 | 375×812 | 390×844 | 430×932 | 768×1024 | 1024×768 | 1280×800 | 1440×900 | 1920×1080 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Home (`/`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Autores (`/for-authors`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Editoriales (`/for-publishers`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Imprentas (`/for-printhouses`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Proveedores Papel (`/for-paper-suppliers`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Contacto (`/contact`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Contacto Partners (`/contact/partner`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Plataforma (`/platform`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Soluciones (`/solutions`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Términos de Servicio (`/legal/terms-of-service`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Política de Privacidad (`/legal/privacy-policy`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| **Aviso Legal (`/legal/legal-notice`)** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

---

## 3. Diagnóstico de Causa Raíz y Correcciones Aplicadas

En cumplimiento estricto de las directrices operativas (prohibido usar `overflow-x: hidden` en `body` para ocultar fallos de layout; corregir siempre en la causa raíz), se localizaron y solventaron los siguientes defectos:

### Defecto 1: Falta de reglas CSS para visibilidad responsiva (`.desktop-only` y `.mobile-only`)
- **Síntoma:** En resoluciones móviles (<1024px), el navbar completo de escritorio (`nav.desktop-only`) y los botones de inicio de sesión de escritorio se renderizaban simultáneamente junto a los controles móviles, ensanchando el `scrollWidth` a 1288px.
- **Causa raíz:** Las clases `desktop-only` y `mobile-only` se utilizaban en el marcado JSX pero carecían de reglas CSS en `app/globals.css`.
- **Corrección en causa raíz:** Se añadieron las reglas de visibilidad por media queries:
  ```css
  @media (max-width: 1023px) {
    .desktop-only { display: none !important; }
  }
  @media (min-width: 1024px) {
    .mobile-only { display: none !important; }
  }
  ```

### Defecto 2: Colisión horizontal en cabecera ultra-compacta (320px – 430px)
- **Síntoma:** En 320px y 375px, el logo ("PrintPrice Pro"), el selector de idioma (3 botones píldora `ES|EN|DE`), el botón de cambio de tema con texto ("LIGHT"/"DARK") y el botón hamburguesa superaban los 288px disponibles.
- **Causa raíz:** Falta de jerarquización responsiva de controles en la barra superior.
- **Corrección en causa raíz:**
  - Ocultación del texto "LIGHT"/"DARK" en móviles (`.mobile-hide-text { display: none !important; }`), transformando el `ThemeToggle` en un control táctil compacto y cuadrado de 36×36px.
  - En móviles ultra-compactos (`< 480px`), el selector de idiomas se oculta de la barra superior mediante `.header-lang-wrapper { display: none !important; }` y se reubica de forma prioritaria y táctil como primer bloque interactivo dentro del menú drawer móvil.
  - En tabletas y pantallas amplias (`>= 480px`), el selector permanece visible en la barra superior.

### Defecto 3: Desbordamiento leve en Tablet Landscape / Netbook (1024×768)
- **Síntoma:** A 1024px exactos, el `scrollWidth` medía 1038px (+14px de desbordamiento).
- **Causa raíz:** Gaps fijos (`gap: 1.75rem` en navbar y `gap: 0.85rem` en acciones) que forzaban la barra de navegación más allá del ancho disponible entre el logo y los botones de acción.
- **Corrección en causa raíz:** Se sustituyeron los espaciados fijos por funciones fluidas `clamp()`:
  - Navbar: `gap: clamp(0.5rem, 1vw, 1.35rem)` y `font-size: 0.875rem`.
  - Acciones: `gap: clamp(0.4rem, 0.8vw, 0.75rem)`.
  - Botón primario: `padding: 0.5rem clamp(0.75rem, 1vw, 1.25rem)`.

### Defecto 4: Doble padding en contenedores anidados
- **Síntoma:** En pantallas móviles estrechas (320px), las secciones (`Section`) y las páginas aplicaban cada una un padding horizontal de 32px (64px total en cada lado), dejando apenas 192px de ancho útil.
- **Causa raíz:** Anidamiento de `<Container>` dentro del contenedor automático de `<Section>`.
- **Corrección en causa raíz:**
  - Se añadió en `globals.css`: `.container .container { padding-left: 0 !important; padding-right: 0 !important; }`.
  - `Container.tsx` se actualizó a padding fluido: `padding: '0 clamp(1rem, 3.5vw, 2rem)'`.

### Defecto 5: Palabras compuestas en alemán desbordaban cajas
- **Síntoma:** Cadenas en alemán como `Produktionsinfrastruktur` y `Registrierungspflicht` rompían el ancho de tarjetas en 320px.
- **Causa raíz:** Ausencia de regla de partición controlada de palabras largas.
- **Corrección en causa raíz:** Se configuró en `app/globals.css`:
  ```css
  h1, h2, h3, h4, h5, h6, p, a, span, button, td, th {
    overflow-wrap: break-word;
  }
  ```

### Defecto 6: Tablas comparativas accesibles en móvil
- **Síntoma:** Las tablas comparativas técnicas tienen un ancho intrínseco de 640px.
- **Causa raíz:** En pantallas móviles requieren scroll horizontal contenido, pero el usuario no tenía indicación visual ni accesible de que la tabla continuaba hacia la derecha.
- **Corrección en causa raíz:**
  - Se aseguró que `.comparison-table-wrapper` tenga `max-width: 100%`, `overflow-x: auto; box-sizing: border-box; -webkit-overflow-scrolling: touch;`.
  - Se incorporó un indicador accesible `table-scroll-hint` bajo cada tabla (`⇄ Desliza horizontalmente para ver todas las columnas / Horizontal wischen für alle Spalten / Scroll horizontally to view all columns`) visible exclusivamente en pantallas `<= 768px`.

### Defecto 7: Banner de Cookies y jerarquía de z-index
- **Síntoma:** El banner de cookies emergía con `zIndex: 9999` e interceptaba toques en el pie del menú drawer móvil (`zIndex: 1400`). Además, tenía esquinas rectas industriales del antiguo diseño Monolith.
- **Causa raíz:** Falta de gobernanza en la escala de capas Z y falta de armonización visual con el nuevo estilo de onboarding.
- **Corrección en causa raíz:**
  - Escala Z unificada:
    - Modales (`.modal-overlay`): `zIndex: 2000`.
    - Drawer móvil: `zIndex: 1800`.
    - Cabecera fija: `zIndex: 1600`.
    - Cookie Banner: `zIndex: 1200`.
  - Se adaptó `CookieBanner.tsx` al estilo de onboarding aprobado: tarjetas redondeadas (`var(--radius-card, 16px)`), sombreado suave, tipografía amigable y soporte multilingüe completo (ES, DE, EN).

---

## 4. Pruebas de Interacción, Accesibilidad y Teclado

Las pruebas automatizadas de Playwright validaron los siguientes flujos de interacción en 320px y 390px:

1. **Apertura de Menú Hamburguesa:**
   - Clic en botón hamburguesa abre el drawer a pantalla completa.
   - Bloqueo de scroll activo en `document.body` (`overflow: hidden`).
2. **Cierre con tecla Escape:**
   - Pulsación de `Escape` cierra el drawer inmediatamente.
   - Restauración automática del scroll en `document.body`.
3. **Selector de Idioma Reactivo en Drawer:**
   - Cambio de idioma a Alemán (DE) y verificación de reactividad sin recarga de página.
4. **Disparo de Modal de Inicio de Sesión desde Móvil:**
   - Apertura del modal desde el drawer.
   - Modal centrado en el viewport con `max-height: 90dvh` y scroll interno accesible.
   - Bloqueo de scroll activo durante la visualización del modal.
   - Cierre con tecla `Escape` y retorno de foco sin pérdida de estado.

---

## 5. Capturas Representativas Generadas

Las capturas de pantalla de la auditoría se han archivado en:  
`docs/implementation/corporate-stakeholder-experience/screenshots/`

- **320×568 (Ultra-compact mobile):**
  - `home_320x568.png`
  - `for-authors_320x568.png`
  - `for-publishers_320x568.png`
  - `for-printhouses_320x568.png`
  - `for-paper-suppliers_320x568.png`
  - `contact_320x568.png`
- **390×844 (Standard mobile):**
  - `home_390x844.png`, `for-authors_390x844.png`, `for-publishers_390x844.png`, `for-printhouses_390x844.png`, `for-paper-suppliers_390x844.png`, `contact_390x844.png`
- **768×1024 (Tablet portrait):**
  - `home_768x1024.png`, `for-authors_768x1024.png`, `for-publishers_768x1024.png`, etc.
- **1440×900 (Desktop Standard):**
  - `home_1440x900.png`, `for-authors_1440x900.png`, etc.

---

## 6. Verificación de Compilación

- **Comando:** `npm run build`
- **Compilador:** Next.js 16.2.1 (Turbopack)
- **TypeScript:** 0 errores de tipos
- **Páginas estáticas generadas:** 43/43 prerenderizadas correctamente
- **Rutas dinámicas:** `/api/v1/[[...path]]` compilada sin incidencias
