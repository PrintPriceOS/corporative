# Estado de Implementación: Web Corporativa PrintPrice.pro

**Fecha:** 24 de Octubre de 2026  
**Rama:** `feat/corporate-stakeholder-experience`  
**Repositorio GitHub:** `https://github.com/PrintPriceOS/corporative`  
**Servidor Hosting:** Plesk Obsidian Debian (`212.227.79.67`) en `/var/www/vhosts/printprice.pro/httpdocs/`  
**Estado General:** COMPLETADO CON ÉXITO — Todas las iteraciones C0 a C5 ejecutadas, compiladas y validadas visualmente con soporte trilingüe (ES / EN / DE), Hero banners de partículas rojas y eslogan corporativo.

---

## 1. Resumen de Iteraciones Ejecutadas

| Iteración | Descripción | Estado | Resultado |
|---|---|:---:|---|
| **C0** | **Inventario y Referencia Visual** | **COMPLETADO** | Repositorio real `PrintPriceOS/corporative` clonado y analizado. Tokens del onboarding canónico de Control Plane extraídos e integrados. Documentación en `docs/implementation/corporate-stakeholder-experience/` generada. |
| **C1** | **Arquitectura para 4 Stakeholders** | **COMPLETADO** | Creadas las 4 páginas de perfil: `/for-authors`, `/for-publishers`, `/for-printhouses`, `/for-paper-suppliers`. Header actualizado con menú desplegable "Para quién", enlaces directos, modal accesible "Iniciar sesión" (Budget vs Control Plane) y modal "Empezar". Footer renovado con enlaces canónicos y 4 columnas temáticas. |
| **C2** | **Rediseño de Portada y Hero Banners con Partículas Rojas** | **COMPLETADO** | Integrado `HeroPlatform` con `variant="particles"` (partículas rojas flotantes WebGL) en la portada y en cada una de las 4 subsecciones. Animación de marca con el eslogan `PRICE IT. FIX IT. PRINT IT.` (con `FIX IT.` en rojo corporativo `#dc0000`). Tarjetas redondeadas (`--radius-card: 16px`, `--radius-card-lg: 24px`), tipografía legible y eliminación de brutalismo forzado. |
| **C3** | **Contenido Confiable, Comparativas y Slogan Corporativo** | **COMPLETADO** | Depuración rigurosa de claims en `CLAIMS_AND_COMPARISONS.md` y `app/contact/partner/page.tsx` (retirados: 12-18% fees, 15-day payouts, 21-day trial, chargeback immunity, 1,280 nodes, zero lead time errors). Eslogan invariable `PRICE IT. FIX IT. PRINT IT.` integrado permanentemente en el footer, hero banners y llamadas a la acción. Tablas comparativas objetivas estructuradas con selector interactivo: Autores/Editoriales (vs Lulu, GelatoConnect) e Imprentas/Proveedores (vs printIQ, PrintVis, Tharstern). |
| **C4** | **Subsecciones con Flujo "How It Works" & Registros** | **COMPLETADO** | En cada subsección (`/for-authors`, `/for-publishers`, `/for-printhouses`, `/for-paper-suppliers`) se implementa el Hero banner con partículas rojas y su CTA principal, seguido de su sección "How it works" (Cómo funciona) en 4 pasos adaptados al perfil. Validación de todos los destinos: Budget (`https://budget.printprice.pro/`), Registro de Imprenta en Control Plane (`https://control.printprice.pro/printhouse/register`), Registro de Proveedores (`https://control.printprice.pro/supplier/register`), Documentación (`https://docs.printprice.pro/`). Sin duplicidad de formularios ficticios. |
| **C5** | **Soporte Trilingüe (ES / EN / DE), Accesibilidad y QA Visual** | **COMPLETADO** | Implementado sistema reactivo de internacionalización (`lib/i18n.tsx`) con selector accesible `ES | EN | DE` en el Header (`components/ui/LanguageSelector.tsx`). Diccionarios completos en `lib/translations/` (`es.ts`, `en.ts`, `de.ts`). Compilación con `npm run build` exitosa (0 errores TypeScript, 43 rutas estáticas generadas). Verificación E2E en navegador real en escritorio (1920x1080) y móvil (390x844). `sitemap.ts` actualizado. |
| **C6** | **Validación y Remediación de Responsividad (Prompt 1)** | **COMPLETADO** | Matriz exhaustiva de 9 viewports (320x568 a 1920x1080) sobre 12 páginas públicas (108 combinaciones probadas: 108 PASS / 0 FAIL / 0 desbordamiento horizontal). Corregidos: cabecera colapsable, colisión de botones en 320px, scroll locking en drawer móvil, z-index de CookieBanner y centrado de modal login en pantallas estrechas. Documentado en `RESPONSIVE_QA.md` con 24 capturas. |
| **C7** | **Implementación y Verificación Técnica de SEO (Prompt 2)** | **COMPLETADO** | `robots.ts` y `sitemap.ts` con 16 rutas canónicas. Metadatos únicos y descripciones segmentadas por intención de búsqueda para los 4 stakeholders. Esquemas estructurados JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`, `SoftwareApplication`). Renderizado completo de H1 y contenido principal en SSR/SSG sin bloqueo de JavaScript en `/contact`. Documentado en `SEO_AUDIT.md`, `SEO_ROUTE_MATRIX.md` y `SEO_VALIDATION.md`. |
| **C8** | **Arquitectura de Producto en Dos Dimensiones & Preflight como Pilar Central** | **COMPLETADO** | Jerarquía de 3 productos principales: **1. PRICE IT** (Calculador de precios), **2. FIX IT** (Preflight técnico de PDF), **3. PRINT IT** (Marketplace de producción con talleres homologados). Navegación y portada organizadas en dos dimensiones: **PRODUCTOS** (Qué puedes hacer) y **PÚBLICOS** (Para quién: Autores, Editoriales, Imprentas, Proveedores). Roles subordinados preservados: Maqueta 3D como herramienta complementaria de visualización; Control Plane como back-office operativo para talleres; Paper Hub como federación de catálogo de papel. Comparativas organizadas por producto (Price it, Fix it, Print it). Verificación: 117/117 responsive PASS (0 desbordamiento horizontal de 320px a 1920px), 19/19 rutas SEO PASS con títulos y metas únicos, `npm run build` limpio con 44 rutas estáticas. |

---

## 2. Evidencias de Verificación en Navegador Real

La verificación se ejecutó mediante un subagente de navegación automatizado sobre `http://localhost:3010/`:
1. **Hero Banner de Portada con Partículas Rojas**: Partículas flotantes en 3D (`#c70000`) y animación secuencial del eslogan `PRICE IT. FIX IT. PRINT IT.` (`homepage_hero_1792800602441.png`).
2. **Conmutación Reactiva de Idioma a Inglés (EN)**: Cambio instantáneo a textos en inglés sin recarga de página (`en_language_page_1792800679814.png`).
3. **Conmutación Reactiva de Idioma a Alemán (DE)**: Cambio instantáneo a textos en alemán (`de_language_page_1792800697422.png`).
4. **Conmutación Reactiva de Idioma a Español (ES)**: Cambio instantáneo a textos en español (`es_language_page_1792800716055.png`).
5. **Subsección de Autores (`/for-authors`)**: Hero banner con partículas rojas, CTA principal y bloque de 4 pasos "Cómo funciona" (`for_authors_page_1792800659381.png`).
6. **Presencia Permanente del Eslogan en Footer**: Presencia destacada de `PRICE IT. FIX IT. PRINT IT.` en el pie de página (`footer_slogan_1792800642232.png`).
7. **Grabación de Sesión E2E**: Archivo WebP generado en `hero_i18n_audit_1792800592965.webp`.

---

## 3. Instrucciones de Despliegue en Plesk (Producción)

> [!IMPORTANT]
> Siguiendo las directrices del proyecto, **no se ha realizado despliegue automático a producción**. El despliegue definitivo se ejecuta desde el panel Plesk o mediante la terminal SSH del servidor cuando el usuario lo determine.

### Procedimiento en el Servidor Plesk (`212.227.79.67`):

1. **Conexión SSH**:
   ```bash
   ssh root@212.227.79.67
   ```

2. **Actualizar el Working Tree desde GitHub**:
   ```bash
   cd /var/www/vhosts/printprice.pro/httpdocs
   git fetch origin
   git checkout feat/corporate-stakeholder-experience
   # O merge hacia main una vez validado:
   # git checkout main && git merge feat/corporate-stakeholder-experience
   ```

3. **Compilar los Artefactos de Producción**:
   ```bash
   npm install --production=false
   npm run build
   ```

4. **Reiniciar la Aplicación Node.js en Phusion Passenger**:
   ```bash
   mkdir -p tmp && touch tmp/restart.txt
   # O a través de la CLI de Plesk:
   # plesk bin nodejs --restart-app -domain printprice.pro
   ```
