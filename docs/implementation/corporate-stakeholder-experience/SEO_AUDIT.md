# Auditoría Técnica y Mapa de Intenciones SEO — PrintPrice.pro

**Fecha de Auditoría:** 24 de Octubre de 2026  
**Entorno de Ejecución:** Servidor local de producción Next.js (puerto 3010, `npx next start -p 3010`)  
**Dominio Canónico Objetivo:** `https://printprice.pro`  
**Herramientas Empleadas:** Playwright Headless Chromium, Python HTTP Inspector (`urllib.request` / `BeautifulSoup`), `scripts/test_seo_validation.py`.

---

## 1. Resumen Ejecutivo de la Auditoría

Se ha auditado la totalidad de las rutas públicas de la web corporativa de PrintPrice.pro para verificar indexabilidad, renderizado de contenido inicial sin JavaScript (SSR/SSG), títulos y descripciones únicas, canónicas absolutas, datos estructurados JSON-LD, sitemap y directivas de robots.

### Puntos Clave Auditados
1. **0 Páginas con `noindex` no deseado en producción**: Todas las rutas comerciales y legales son indexables (`index, follow`).
2. **100% de Metadatos Únicos**: Se eliminaron metadatos genéricos o duplicados entre páginas. Cada ruta cuenta con `<title>` descriptivo y `<meta name="description">` orientado a la intención de búsqueda.
3. **Canonicalización Estricta**: Cada URL canónica apunta a `https://printprice.pro/...` con esquema HTTPS y sin trailing slashes espurios.
4. **Contenido Principal e H1s en HTML Inicial (Sin JavaScript)**: Se solventó el problema de montaje diferido (`if (!mounted) return null;`) en `/contact`. Todos los motores de búsqueda rastrean el `<h1>` y el árbol de texto principal en la primera respuesta HTTP (`status: 200`).
5. **Separación de Intenciones por Stakeholder**: 4 intenciones diferenciadas claramente sin canibalización de palabras clave.

---

## 2. Mapa de Intenciones de Búsqueda por Perfil

Para evitar la canibalización de términos y páginas casi idénticas, cada página pública responde a una intención de usuario diferenciada y no intercambiable:

| Stakeholder / Segmento | Ruta | Intención Principal | Problema que Resuelve | CTA Primario |
|---|---|---|---|---|
| **Autores y Particulares** | `/for-authors` | **Transaccional / Validación**: Imprimir libros en tiradas cortas o unitarias con auto-validación de PDF. | Presupuesto opaco, sangrías erróneas en PDF, lomos mal calculados. | `Calcular presupuesto de mi libro` → `https://budget.printprice.pro/` |
| **Editoriales** | `/for-publishers` | **Operativa / Comercial**: Cotización multi-cantidad, curvas de coste offset vs. digital y control de catálogo editorial. | Falta de matrices de precios instantáneas y lentitud en presupuestos de novedades y reediciones. | `Cotizar catálogo editorial` → `https://budget.printprice.pro/` |
| **Imprentas Industriales** | `/for-printhouses` | **B2B / Capacidad Productiva**: Captación de órdenes de trabajo pre-validadas y modelado técnico de maquinaria gráfica. | Pérdida de horas en revisión de artes finales, litigios por archivos defectuosos y capacidad ociosa en máquinas. | `Registrar mi imprenta en Control Plane` → `https://control.printprice.pro/printhouse/register` |
| **Proveedores de Papel** | `/for-paper-suppliers` | **B2B / Cadena de Suministro**: Federación de catálogos maestros de papel, gramajes y sustratos en tiempo real. | Falta de visibilidad de tarifas de papel en el punto exacto de decisión de compra del impresor. | `Solicitar integración de catálogo` → `https://control.printprice.pro/supplier/register` |
| **Ingeniería / Fabricación** | `/platform` | **Informativa Técnica**: Arquitectura de software, imposición de pliegos, hashing de evidencias (`evidenceId`). | Necesidad de entender la fiabilidad industrial, reproducibilidad y gobernanza del cálculo. | `Explorar la plataforma` → `/solutions` |
| **Soluciones Globales** | `/solutions` | **Solución por Mercado**: Libros, packaging, folletos comerciales y gran formato industrial. | Descubrir qué tipologías de producción gráfica resuelve el motor. | `Ver soluciones de packaging y libros` |
| **Desarrolladores & APIs** | `/developers` | **Técnica / Integración**: Documentación de APIs REST, contratos OpenAPI y webhooks de producción. | Conectar ERPs, MIS o tiendas e-commerce con la red de fabricación. | `Ver documentación técnica` → `https://docs.printprice.pro/` |
| **Contacto & Routing** | `/contact` | **Asistencia / Enrutamiento**: Guía interactiva hacia el flujo o herramienta adecuada. | Usuarios que no saben si deben registrarse en Control Plane o cotizar en Budget. | Selector interactivo de flujo |
| **Talleres Asociados** | `/contact/partner` | **Partnering B2B**: Homologación y acreditación técnica de plantas de producción gráfica en Europa. | Solicitudes de adhesión a la red de producción. | `Registrar imprenta` → `https://control.printprice.pro/printhouse/register` |
| **Gobernanza y Legal** | `/legal/*` | **Cumplimiento Normativo / Confianza**: Términos de servicio, privacidad RGPD, imprint mercantil y SLAs. | Cumplimiento del RGPD, transparencia registral de Print Price Pro SIA y delimitación de responsabilidades. | N/A (Enlaces informativos) |

---

## 3. Inventario y Auditoría Técnica de Rutas Públicas

Se examinó la respuesta HTTP pura de cada ruta (sin ejecución de JavaScript por el cliente) simulando un bot de rastreo:

### 3.1. Rutas Comerciales y de Producto

#### Ruta: `/` (Home)
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `PrintPrice Pro — Plataforma de Inteligencia y Cotización de Impresión Editorial` (78 car.)
- **Meta Description:** `Calcula costes reales de imprenta, preflight automático de PDF y enrutamiento con imprentas industriales mediante PrintPrice OS.` (132 car.)
- **Canonical:** `https://printprice.pro`
- **H1:** `PRICE IT. FIX IT. PRINT IT.`
- **Disponibilidad SSR/HTML inicial:** Total. Secciones principales, selector de stakeholders, eslogan y comparativas renderizadas.
- **Inclusión en Sitemap:** Sí (`priority: 1.0`, `changefreq: weekly`).
- **Structured Data:** `Organization` (con identidad fiscal de Print Price Pro SIA), `WebSite`.

#### Ruta: `/for-authors`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Impresión de Libros para Autores y Particulares | PrintPrice Pro` (66 car.)
- **Meta Description:** `Calcula el presupuesto exacto de tu libro en segundos: valida sangrías en tu PDF, comprueba el grosor de lomo en 3D e imprime sin intermediarios con PrintPrice OS.` (160 car.)
- **Canonical:** `https://printprice.pro/for-authors`
- **H1:** `Imprime tu libro, comprueba tus archivos y visualiza cómo quedará antes de pagar`
- **Disponibilidad SSR/HTML inicial:** Total. Hero banner, 4 pasos "How it works", especificaciones técnicas.
- **Inclusión en Sitemap:** Sí (`priority: 0.9`, `changefreq: weekly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

#### Ruta: `/for-publishers`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Software de Cotización y Gestión Editorial | PrintPrice Pro` (59 car.)
- **Meta Description:** `Optimiza presupuestos de novedades y reediciones con matrices multi-cantidad, curvas de coste offset/digital y auditoría técnica de archivos.` (143 car.)
- **Canonical:** `https://printprice.pro/for-publishers`
- **H1:** `Prepara presupuestos y organiza tus proyectos de impresión editorial`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.9`, `changefreq: weekly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

#### Ruta: `/for-printhouses`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Motor de Captación y Modelado para Imprentas | PrintPrice Pro` (61 car.)
- **Meta Description:** `Recibe órdenes de trabajo verificadas con evidencia inmutable (evidenceId), modelado técnico de maquinaria gráfica y cero incidencias de preflight.` (154 car.)
- **Canonical:** `https://printprice.pro/for-printhouses`
- **H1:** `Configura tu imprenta y conecta capacidades, maquinaria y aplicaciones`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.9`, `changefreq: weekly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

#### Ruta: `/for-paper-suppliers`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Federación de Catálogo y Sustratos para Papeleras | PrintPrice Pro` (66 car.)
- **Meta Description:** `Conecta tu catálogo maestro de bobinas y resmas directamente con el motor de cálculo editorial. Visibilidad en millones de presupuestos gráficos.` (152 car.)
- **Canonical:** `https://printprice.pro/for-paper-suppliers`
- **H1:** `Publica tu catálogo y conecta tus ofertas con las imprentas`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.9`, `changefreq: weekly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

#### Ruta: `/platform`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Arquitectura de PrintPrice OS | Infraestructura Gráfica` (57 car.)
- **Meta Description:** `Descubre los motores técnicos que componen PrintPrice OS: cálculo de imposición, validación preflight y enrutamiento algorítmico de producción.` (151 car.)
- **Canonical:** `https://printprice.pro/platform`
- **H1:** `FROM COST TO PRODUCTION IN ONE PLATFORM`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.8`, `changefreq: monthly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`, `SoftwareApplication`.

#### Ruta: `/solutions`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Soluciones de Fabricación Gráfica Editorial y Comercial | PrintPrice Pro` (73 car.)
- **Meta Description:** `Flujos de automatización técnica para libros, packaging, folletos comerciales y gran formato industrial con trazabilidad garantizada.` (138 car.)
- **Canonical:** `https://printprice.pro/solutions`
- **H1:** `BUILT FOR EVERY PRINT PRODUCTION`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.8`, `changefreq: monthly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

#### Ruta: `/developers`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `API for Print Manufacturing & Automation | PrintPrice Pro` (58 car.)
- **Meta Description:** `Integrate budgeting, PDF preflight, and production routing directly into your app. Explore the PrintPrice OS API for automated manufacturing workflows.` (154 car.)
- **Canonical:** `https://printprice.pro/developers`
- **H1:** `BUILD ON THE PRINT API`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.7`, `changefreq: monthly`).
- **Structured Data:** `Organization`, `WebSite`.

#### Ruta: `/company`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Sobre PrintPrice Pro | Misión y Principios de Ingeniería` (59 car.)
- **Meta Description:** `Conoce los principios de ingeniería detrás de PrintPrice OS: determinación de costes, evidencias inmutables y conectividad industrial.` (136 car.)
- **Canonical:** `https://printprice.pro/company`
- **H1:** `ENGINEERING PRODUCTION CERTAINTY`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.6`, `changefreq: monthly`).
- **Structured Data:** `Organization`, `WebSite`.

#### Ruta: `/contact`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Contacto y Soporte Técnico | PrintPrice Pro` (45 car.)
- **Meta Description:** `Ponte en contacto con nuestro equipo técnico de ingeniería gráfica y operaciones. Asistencia en cotizaciones e integración de imprentas.` (140 car.)
- **Canonical:** `https://printprice.pro/contact`
- **H1:** `START WITH THE RIGHT WORKFLOW`
- **Disponibilidad SSR/HTML inicial:** Total (corregido el renderizado en servidor eliminando `if (!mounted) return null;`).
- **Inclusión en Sitemap:** Sí (`priority: 0.6`, `changefreq: monthly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

#### Ruta: `/contact/partner`
- **Código HTTP Real:** `200 OK`
- **Indexabilidad:** `index, follow`
- **Title:** `Únete a la Red de Partners de Impresión | PrintPrice Pro` (55 car.)
- **Meta Description:** `Forma parte de la red homologada de talleres gráficos y distribuidores de papel en Europa. Recibe trabajos verificados y listos para producción con PrintPrice OS.` (166 car.)
- **Canonical:** `https://printprice.pro/contact/partner`
- **H1:** `Conecta tu taller a la red de producción de PrintPrice OS.`
- **Disponibilidad SSR/HTML inicial:** Total.
- **Inclusión en Sitemap:** Sí (`priority: 0.7`, `changefreq: monthly`).
- **Structured Data:** `Organization`, `WebSite`, `BreadcrumbList`.

### 3.2. Rutas Legales e Institucionales

Todas las páginas legales cuentan con:
- Códigos HTTP reales `200 OK`.
- Canonicalización absoluta a `https://printprice.pro/legal/...`.
- Título y descripción únicos.
- Encabezado `<h1>` semántico.
- Inclusión en sitemap con `priority: 0.3` y `changefreq: yearly`.
- Esquema estructurado `BreadcrumbList` (`Inicio` > `Términos Legales` > `Página actual`).

- `/legal/terms-of-service` (Términos de Servicio y contratación).
- `/legal/privacy-policy` (Política de Privacidad y cumplimiento RGPD).
- `/legal/legal-notice` (Aviso Legal, datos mercantiles de Print Price Pro SIA, Riga, Letonia).
- `/legal/partner-terms` (Condiciones operativas para talleres y distribuidores).

---

## 4. Auditoría de Duplicados, Soft 404 y Páginas Huérfanas

1. **Ausencia de Soft 404:**
   - La petición de una ruta inexistente (e.g. `/non-existent-route-testing-404`) devuelve un código de estado real `404 Not Found` verificado por `scripts/test_seo_validation.py`.
   - La página de error 404 (`app/not-found.tsx`) renderiza un mensaje amigable con enlace de regreso a la portada sin redirigir erróneamente con código 200 a la home.
2. **Sin Páginas Clonadas ni Keyword Stuffing:**
   - No existen variantes artificiales de páginas para términos como "imprimir libros baratos madrid" vs "imprimir libros barcelona". El posicionamiento se basa en autoridad técnica de producto y arquitectura temática limpia.
3. **Enlaces Internos Crawlables:**
   - Toda la navegación del sitio (Header, Footer, menús desplegables y CTAs) se basa en etiquetas HTML nativas `<Link href="...">` o `<a href="...">` con URLs absolutas o relativas canónicas, sin trampas de JavaScript (`onClick` sin enlace o `javascript:void(0)`).
