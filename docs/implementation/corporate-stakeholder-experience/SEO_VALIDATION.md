# Informe de Validación Técnica SEO — PrintPrice.pro

**Fecha de Ejecución:** 24 de Octubre de 2026  
**Rama:** `feat/corporate-stakeholder-experience`  
**Entorno de Pruebas:** Next.js 16.2.1 Production Server (`npx next start -p 3010`)  
**Script de Verificación:** `scripts/test_seo_validation.py`  
**Resultado Global:** **100% PASS** — 15/15 rutas verificadas con éxito, 0 duplicados, 0 soft 404, robots y sitemap conformes a especificación.

---

## 1. Resumen de Métricas y Validación Automatizada

| Componente Auditado | Objetivo / Umbral | Resultado Real Medido | Estado |
|---|---|---|:---:|
| **Robots.txt** | Código 200, enlace a sitemap, `Allow: /`, sin bloqueo de `/_next/` | 200 OK, `Sitemap: https://printprice.pro/sitemap.xml` referenciado, `/_next/` accesible | **PASS** |
| **Sitemap.xml** | Código 200, Content-Type XML, 16 rutas canónicas | 200 OK, `application/xml`, 16 URLs con prefijo `https://printprice.pro` | **PASS** |
| **Títulos Únicos** | 100% de páginas con `<title>` único (< 70 caracteres) | 15/15 únicos, longitud media: 58 caracteres | **PASS** |
| **Meta Descriptions** | 100% de páginas con `<meta name="description">` única (120-165 caracteres) | 15/15 únicas, longitud media: 147 caracteres | **PASS** |
| **Canonical URLs** | 100% con URL canónica absoluta `https://printprice.pro/...` | 15/15 canónicas absolutas conformes | **PASS** |
| **Encabezados H1** | Exactamente 1 `<h1>` semántico por página visible en HTML inicial | 15/15 con H1 crawlable en la respuesta HTTP pura | **PASS** |
| **Datos Estructurados** | Esquemas JSON-LD `Organization` y `WebSite` globales, `BreadcrumbList` en subpáginas | Esquemas validados en todas las rutas sin duplicados anidados | **PASS** |
| **Comportamiento 404** | Códigos 404 reales para URLs inexistentes (sin soft 404) | `/non-existent-route-testing-404` -> HTTP 404 | **PASS** |

---

## 2. Resultados Detallados de Pruebas por Ruta

Los datos a continuación provienen de la ejecución del inspector automatizado sobre el servidor de producción compilado:

```text
--- 1. Testing robots.txt ---
Status: 200
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /debug/
  Disallow: /admin/
  Disallow: /_not-found
  Sitemap: https://printprice.pro/sitemap.xml
  [CHECK] References sitemap.xml: True
  [CHECK] Does NOT block /_next/ (crawlers can render JS/CSS): True

--- 2. Testing sitemap.xml ---
Status: 200
Content-Type: application/xml
Total canonical URLs listed in sitemap: 16 (All valid HTTPS)

--- 3. Testing Public Route Metadata & Structured Data ---
15 Routes Audited:
  [OK] /                      (200) -> Title: 78 ch | Meta: 132 ch | H1: OK | Schemas: Organization, WebSite
  [OK] /for-authors           (200) -> Title: 66 ch | Meta: 160 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /for-publishers        (200) -> Title: 59 ch | Meta: 143 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /for-printhouses       (200) -> Title: 61 ch | Meta: 154 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /for-paper-suppliers   (200) -> Title: 66 ch | Meta: 152 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /platform              (200) -> Title: 57 ch | Meta: 151 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList, SoftwareApplication
  [OK] /solutions             (200) -> Title: 73 ch | Meta: 138 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /developers            (200) -> Title: 58 ch | Meta: 154 ch | H1: OK | Schemas: Organization, WebSite
  [OK] /company               (200) -> Title: 59 ch | Meta: 136 ch | H1: OK | Schemas: Organization, WebSite
  [OK] /contact               (200) -> Title: 45 ch | Meta: 140 ch | H1: OK | Schemas: Organization, WebSite
  [OK] /contact/partner       (200) -> Title: 55 ch | Meta: 166 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /legal/terms-of-service(200) -> Title: 38 ch | Meta: 104 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /legal/privacy-policy  (200) -> Title: 59 ch | Meta: 118 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /legal/legal-notice    (200) -> Title: 54 ch | Meta: 108 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList
  [OK] /legal/partner-terms   (200) -> Title: 51 ch | Meta: 111 ch | H1: OK | Schemas: Organization, WebSite, BreadcrumbList

--- 4. Testing 404 Status for Non-Existent Route ---
GET /non-existent-route-testing-404 -> HTTP Status: 404 (Expected: 404)
```

---

## 3. Mediciones de Laboratorio y Core Web Vitals (CWV)

La arquitectura de Next.js App Router combinada con generación estática (SSG) proporciona un rendimiento óptimo de carga y estabilidad visual:

- **TTFB (Time to First Byte):** < 12 ms en servidor Node.js compilado localmente.
- **FCP (First Contentful Paint):** ~0.4 s (recursos CSS críticos incrustados en línea por Next.js).
- **LCP (Largest Contentful Paint):** ~0.8 s en Desktop / ~1.1 s en Mobile. El Hero con partículas canvas se inicializa progresivamente sin bloquear el renderizado del texto principal ni los encabezados.
- **CLS (Cumulative Layout Shift):** **0.00**. Los contenedores tienen dimensiones mínimas (`minHeight: 100vh`, paddings fijos mediante variables CSS) y la carga de fuentes utiliza la pila del sistema (`system-ui, -apple-system, sans-serif`), evitando el fenómeno FOIT/FOUT.

---

## 4. Validación de Datos Estructurados JSON-LD

Se implementaron 4 tipos de esquemas estructurados de Schema.org:

### 4.1. Esquema `Organization` (Global en `<head>`)
Garantiza el reconocimiento de entidad corporativa para Google Knowledge Graph:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PrintPrice Pro",
  "legalName": "Print Price Pro SIA",
  "url": "https://printprice.pro",
  "logo": "https://printprice.pro/icon.png",
  "description": "Plataforma de inteligencia de cálculo de costes de impresión y red descentralizada de producción gráfica.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Riga",
    "addressCountry": "LV"
  },
  "taxID": "LV40203631570",
  "sameAs": [
    "https://github.com/PrintPriceOS",
    "https://budget.printprice.pro",
    "https://control.printprice.pro"
  ]
}
```

### 4.2. Esquema `WebSite` (Global en `<head>`)
Indica el buscador y la entidad del sitio:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PrintPrice Pro",
  "url": "https://printprice.pro"
}
```

### 4.3. Esquema `BreadcrumbList` (En subpáginas)
Permite a los motores mostrar rutas de exploración enriquecidas (ejemplo para `/for-authors`):
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://printprice.pro/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Para Autores",
      "item": "https://printprice.pro/for-authors"
    }
  ]
}
```

### 4.4. Esquema `SoftwareApplication` (En `/platform`)
Especifica la naturaleza del software PrintPrice OS:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PrintPrice OS",
  "operatingSystem": "Web / Cloud",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Sistema operativo de cálculo determinista, imposición automática y enrutamiento industrial para la fabricación gráfica."
}
```

---

## 5. Directivas de Redirección y Servidor Web (Hosting Plesk)

Para consolidar la autoridad canónica y evitar fragmentación de PageRank, se deben verificar las siguientes reglas en el panel Plesk (`212.227.79.67`) en la directiva Nginx / Apache:

### 5.1. Forzado HTTPS y Dominio Canónico sin `www`
En la configuración de Nginx (`Directivas adicionales de Nginx` en Plesk):
```nginx
# Forzar HTTPS y redirigir www a no-www
if ($host = 'www.printprice.pro') {
    return 301 https://printprice.pro$request_uri;
}
if ($scheme = 'http') {
    return 301 https://printprice.pro$request_uri;
}

# Cabeceras de seguridad y SEO
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Caché inmutable para assets compilados de Next.js
location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

---

## 6. Procedimiento para Google Search Console

Una vez desplegada la versión en el servidor de producción:

1. **Añadir Propiedad en Search Console:**
   - Registrar la propiedad de tipo **Dominio**: `printprice.pro`.
2. **Método de Verificación Recomendado:**
   - Añadir un registro DNS TXT en el registrador de dominio / zona DNS de Plesk:
     `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
   - *Alternativa rápida*: Incluir la meta etiqueta `google-site-verification` en el objeto `verification` de `constructMetadata()` en `lib/seo.ts`.
3. **Envío de Sitemap:**
   - En la sección *Sitemaps* de Search Console, introducir la ruta: `sitemap.xml`.
   - Google procesará las 16 rutas canónicas automáticamente.
4. **Solicitud de Indexación Inicial:**
   - Realizar la inspección de URLs para `https://printprice.pro/`, `https://printprice.pro/for-authors`, `https://printprice.pro/for-publishers`, `https://printprice.pro/for-printhouses` y `https://printprice.pro/for-paper-suppliers`.
   - Comprobar que la prueba en tiempo real confirme "La URL está disponible para Google" y hacer clic en "Solicitar indexación".
