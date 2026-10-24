# Inventario Técnico Real de Cookies, Almacenamiento Local y Telemetría
## PrintPrice Pro — Resultados de Auditoría Empírica en Navegador

**Fecha de Auditoría Técnica:** 24 de octubre de 2026  
**Build Objetivo Auditado:** `http://localhost:3033` (Next.js 16.2.1 Turbopack, compilación de candidato)  
**Herramienta de Verificación:** Playwright Chromium Headless (`scripts/test_cookie_lifecycle.py`)  
**Archivo de Evidencias:** [`scripts/cookie_lifecycle_results.json`](../../../scripts/cookie_lifecycle_results.json)

---

### 1. Inventario Real de Claves de Almacenamiento en la Web Corporativa

| Identificador / Clave | Mecanismo | Origen / Ámbito | Clasificación Funcional | Finalidad Técnica Acreditada | Tratamiento al Rechazar / Revocar |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ppp_consent_v1_audit` | **LocalStorage** | `printprice.pro` (local al navegador) | **Técnica / Esencial** | Almacena el estado de consentimiento (`essential: true`, `analytics: boolean`, `timestamp`, `version: "v1.1"`). Impide que el banner se muestre repetidamente. | Se almacena con `analytics: false`. |
| `ppp_audit_consent_proof` | **LocalStorage** | `printprice.pro` (local al navegador) | **Técnica / Esencial** | Registro de auditoría local que vincula la decisión a un identificador temporal (`proof_id`). | Registra el evento de rechazo o revocación. |
| `ppp_locale` | **LocalStorage** | `printprice.pro` (local al navegador) | **Preferencia del Usuario** | Guarda la selección de idioma (`es`, `en`, `de`) para mantener la reactividad en la navegación sin recargar página. | Persiste según la selección de idioma del usuario. |
| `ppos_session_id` | **SessionStorage** | `printprice.pro` (sesión activa) | **Técnica de Sesión** | Identificador efímero generado aleatoriamente para agrupar peticiones de la pestaña actual. Se destruye al cerrar la pestaña. | Purgado automáticamente por el navegador al cerrar sesión. |
| `ppos_telemetry_history` | **LocalStorage** | `printprice.pro` (local al navegador) | **Analítica Técnica Opcional** | Registro de eventos de usabilidad e interacción (latencia de cálculo, vistas). | **PURGADO INMEDIATO Y BLOQUEO:** No se crea antes de consentir ni al rechazar. Si existía y el usuario revoca consentimiento, se elimina inmediatamente. |
| `ppos_project_results` | **LocalStorage** | `printprice.pro` (local al navegador) | **Funcional / Voluntaria** | Almacena cálculos de proyectos guardados por el usuario para su consulta posterior. | Solo se crea mediante acción voluntaria de guardado. |

---

### 2. Resultados Reales de las Pruebas en Navegador

El script de prueba automatizada ejecutó el ciclo completo de vida del consentimiento sobre el build candidato:

#### A. Estado 1: Antes de Consentir (Fresh Context)
- **Cookies HTTP:** 0 cookies emitidas.
- **LocalStorage:** Vacío (`keys: []`).
- **`ppos_telemetry_history` presente:** **False** (comprobado que ningún evento se escribe antes del consentimiento).
- **Solicitudes de red a terceros:** 0 solicitudes (ninguna conexión a dominios externos ni píxeles publicitarios).
- **Visualización:** El banner de cookies se despliega tras el retardo de 1,2 segundos con opciones de *Aceptar todas*, *Rechazar no esenciales* y *Configurar*.

#### B. Estado 2: Tras pulsar «Rechazar no esenciales»
- **Consentimiento guardado:** `{"essential": true, "analytics": false, "version": "v1.1"}` en `ppp_consent_v1_audit`.
- **Interacciones simuladas:** Se realizaron desplazamientos de scroll y eventos de clic.
- **`ppos_telemetry_history`:** **None / Ausente**. Se verificó que el motor bloquea la escritura de eventos analíticos al no existir consentimiento.

#### C. Estado 3: Aceptar por Categorías (Opt-in Analytics)
- **Activación:** Se reabrió el panel de configuración, se activó la casilla de analítica técnica y se guardó la preferencia.
- **Consentimiento guardado:** `{"essential": true, "analytics": true, "version": "v1.1"}`.
- **Telemetría permitida:** Se registró el evento de prueba interactivo en `ppos_telemetry_history`.

#### D. Estado 4: Retirar el Consentimiento (Revocación)
- **Acción:** Reapertura mediante el enlace del footer y desactivación de la casilla de analítica.
- **Consentimiento actualizado:** `{"essential": true, "analytics": false}`.
- **Verificación de purga:** `ppos_telemetry_history` **fue inmediatamente eliminado de LocalStorage**.
- **Bloqueo posterior:** Nuevos eventos ejecutados tras la revocación fueron ignorados y no se almacenaron.

#### E. Estado 5: Recarga de Página y Persistencia
- **Recarga:** `page.reload(wait_until="networkidle")`.
- **Reaparición del banner:** **False** (el banner no reaparece, respetando la elección previa del usuario).
- **Persistencia de revocación:** `ppp_consent_v1_audit` mantuvo `analytics: false` y el almacenamiento de telemetría continuó limpio.

---

### 3. Delimitación de Ámbito: Corporativa Auditada vs. Subdominios Pendientes

- **Web Corporativa (`printprice.pro` / localhost):** Auditada íntegramente. No utiliza cookies de terceros, píxeles de seguimiento publicitario ni librerías de perfilado comercial intrusivo.
- **Subdominios de Aplicación Pendientes de Auditoría Independiente:**
  - `control.printprice.pro` (Control Plane): Utilizará cookies de autenticación segura (`auth_session`, *HTTPOnly*, *SameSite=Lax/Strict*).
  - `budget.printprice.pro` (Price It): Almacenamiento técnico de especificaciones de cálculo.
  - `preflight.printprice.pro` (Fix It): Almacenamiento de tokens de inspección PDF.
  - `mockup.printprice.pro` (Visor 3D): Aplicación externa independiente.
- Cada subdominio deberá someterse a su propia auditoría técnica de cookies al desplegarse en sus respectivos entornos operativos.
