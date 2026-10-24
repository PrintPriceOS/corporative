# Inventario Técnico Real de Cookies y Tecnologías de Almacenamiento
## PrintPrice Pro — Auditoría de Almacenamiento Local y Telemetría

**Fecha de Auditoría Técnica:** 24 de octubre de 2026  
**Entorno Auditado:** `printprice.pro`, subdominios técnicos asociados (`budget.printprice.pro`, `control.printprice.pro`, `mockup.printprice.pro`)  
**Metodología:** Inspección de fuentes de código (`lib/consent.ts`, `lib/i18n.tsx`, `lib/telemetry.ts`, componentes Next.js), análisis de DOM y almacenamiento en navegador.

---

### 1. Inventario Técnico Completo de Almacenamiento

| Clave / Nombre | Mecanismo | Dominio / Ámbito | Proveedor / Origen | Finalidad Concreta | Categoría Jurídica | Duración | Condición de Activación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ppp_consent_v1` | **LocalStorage** | `printprice.pro` (local al navegador) | PrintPrice Pro (propio) | Almacena el estado de la decisión de consentimiento del usuario (`analytics: boolean`, fecha y versión del banner). Evita volver a mostrar el banner en cada navegación. | **Técnica / Esencial** (Art. 5.3 Directiva ePrivacy) | Persistente hasta limpieza manual o 12 meses. | Se crea en el momento en que el usuario pulsa Aceptar, Rechazar o Guardar preferencias. |
| `ppos_locale` | **LocalStorage** | `printprice.pro` (local al navegador) | PrintPrice Pro (propio) | Registra la preferencia de idioma seleccionada por el usuario (`es`, `en`, `de`) para mantener la coherencia lingüística reactiva en las distintas páginas. | **Técnica / Esencial** (Preferencia explícita del usuario) | Persistente hasta que el usuario cambie de idioma o limpie datos locales. | Se genera al hacer clic en el selector de idioma. |
| `ppos_telemetry_history` | **LocalStorage** | `printprice.pro` (local al navegador) | PrintPrice Pro (propio) | Registra el histórico de navegación dentro de la sesión (páginas visitadas, interacciones de cotización) para asistir al router interactivo de `/contact` y medir usabilidad. | **Analítica Técnica / No esencial** | 30 días o hasta su revocación. | **Solo se activa y consulta si el usuario ha otorgado consentimiento de analítica (`analytics: true`).** |
| `next-auth.session-token` / `auth_session` *(en Control Plane y Budget)* | **Cookie HTTPOnly / Secure** | `.printprice.pro` o subdominio específico | PrintPrice Pro (propio) | Mantiene la sesión de usuario autenticado en la consola técnica de Control Plane y el espacio de Budget de forma segura contra ataques XSS. | **Técnica / Esencial** | Sesión o 30 días con renovación activa. | Únicamente tras el login voluntario del usuario con credenciales autorizadas. |

---

### 2. Comprobación del Comportamiento Antes y Después del Consentimiento

#### A. Estado Previo al Consentimiento (Primera Visita)
- **Cookies no esenciales:** **0 activadas**.
- **Píxeles de terceros:** Ninguno (no se cargan scripts de Meta Pixel, Google Ads, TikTok ni redes publicitarias).
- **Rastreo externo:** Ninguna petición HTTP se dispara hacia dominios de terceros para perfilado publicitario.
- **Visualización del Banner:** El banner aparece tras 1,2 segundos con tres opciones visibles y de contraste accesible:
  1. *Aceptar todas*
  2. *Rechazar no esenciales*
  3. *Configurar* (despliega interruptores de detalle)

#### B. Tras pulsar «Rechazar no esenciales»
- Se almacena `{"analytics": false}` en `ppp_consent_v1`.
- El sistema de telemetría interna desactiva inmediatamente el registro de eventos analíticos en el cliente.
- No se realiza ninguna petición de telemetría.
- El banner se oculta de inmediato.

#### C. Tras pulsar «Aceptar todas»
- Se almacena `{"analytics": true}` en `ppp_consent_v1`.
- Se permite el registro de eventos técnicos de rendimiento (latencia de cálculo, apertura de modales).
- La telemetría se procesa exclusivamente en servidores propios de PrintPrice Pro alojados en la UE.

#### D. Retirada del Consentimiento
- En el pie de página de todo el sitio existe un enlace persistente y accesible por teclado: **«Configuración de Cookies»** (`onClick={() => window.dispatchEvent(new CustomEvent('ppp_reopen_consent'))}`).
- Al pulsar el enlace, se abre de nuevo el panel modal de preferencias con el estado actual preseleccionado, permitiendo cambiar de opinión y guardar en cualquier momento.

---

### 3. Alcance entre Subdominios
- El almacenamiento en `localStorage` está confinado por el estándar del navegador al origen (`protocol://domain:port`). Por consiguiente, la preferencia de cookies en `printprice.pro` no se transfiere de forma invisible a `budget.printprice.pro` ni `control.printprice.pro` mediante mecanismos encubiertos de rastreo entre sitios.
- Cada aplicación mantiene su propio control o hereda sesiones autenticadas exclusivamente mediante cookies de sesión técnicas seguras (*SameSite=Lax/Strict, Secure, HTTPOnly*).
