# Registro de Comprobaciones y Validación Técnica
## PrintPrice Pro — Verificación de Calidad, Enlaces, Consentimiento e i18n

**Fecha de Ejecución:** 24 de octubre de 2026  
**Entorno Verificado:** `printprice-pro-corporate` (Localhost 3010 / Build estático)  
**Herramientas:** Next.js Compiler (Turbopack), TypeScript 5.x, Auditor de traducciones Python, Playwright/DOM Inspector.

---

### 1. Cuadro de Verificación de Requisitos Críticos

| Prueba / Criterio | Procedimiento de Verificación | Resultado Observado | Estado |
| :--- | :--- | :--- | :--- |
| **Ausencia de Pruebas Gratuitas (14/21 días)** | Búsqueda recursiva con regex en todo el árbol de código (`14-day`, `21-day`, `prueba gratuita`, `kostenlose Testversion`). | 0 ocurrencias en código de producción y páginas públicas. | **SUPERADO** |
| **Coherencia del Flujo de Venta y Cobro** | Auditoría textual en `/products/print`, `/for-printhouses`, `/legal/terms-of-service`, `/legal/partner-terms`. | La imprenta figura de manera consistente como vendedora directa y perceptora del cobro. PrintPrice factura su 4 % mensual de comisión técnica. | **SUPERADO** |
| **Ausencia de Garantías Absolutas y Sellos Falsos** | Búsqueda de `SOC-2`, `EEA CERTIFIED`, `CANNOT FAIL`, `100% guarantee`. | Textos sustituidos por descripciones técnicas comprobables («Alojamiento en la UE», «Validación determinista»). | **SUPERADO** |
| **Paridad Multilingüe ES / EN / DE** | Ejecución de `scripts/audit_translations.py` y verificación reactiva de `useLocale()`. | Paridad 100 % en cabecera, pie de página, modales, páginas principales, soluciones y Centro Legal. Cambio reactivo inmediato sin recarga de página. | **SUPERADO** |
| **Compilación y Tipado Estático** | Ejecución de `npm run build`. | Compilación limpia de 44 rutas estáticas con Turbopack, 0 errores de TypeScript. | **SUPERADO** |
| **Comportamiento del Consentimiento de Cookies** | Inspección de `localStorage` y eventos `monolith_telemetry`. | Antes de consentir: 0 eventos enviados, `ppp_consent_v1` ausente. Al pulsar rechazar: telemetría desactivada. Enlace en footer reabre el panel interactivo. | **SUPERADO** |
| **Responsive y Ausencia de Desbordamiento** | Inspección en resoluciones estándar (1440x900, 1280x720, 768x1024, 390x844). | `overflow-x: hidden` en contenedor raíz, uso de `clamp()` en tipografía y maquetación fluida en rejillas CSS. | **SUPERADO** |
| **Marcado de Borradores Jurídicos** | Comprobación de cabeceras en todos los documentos legales públicos y en `drafts/`. | Mención visible: *«BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA / DRAFT PENDING LEGAL APPROVAL»*. | **SUPERADO** |

---

### 2. Diferenciación de Estados

- **Comprobado y Verificado Técnicamente:**
  - Código fuente Next.js en `app/` y `components/`.
  - Rutas, metadatos SEO y JSON-LD de breadcrumbs.
  - Almacenamiento local de consentimiento y cambio reactivo de idioma.
  - Generación estática sin errores.
- **Pendiente de Decisión Comercial:**
  - Calendario exacto de devengo y días de vencimiento de la factura mensual del 4 %.
  - Fijación de precios definitivos de suscripciones o créditos cuando se decida comercializarlos.
  - Definición del idioma prevalente para litigios internacionales.
- **Fuera de Alcance / No Accesible Directamente:**
  - Despliegue en producción o modificación de base de datos de producción (expresamente prohibido en esta misión).
