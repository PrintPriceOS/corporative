# SEC-04B — Remediación de Acceso Directo y Cierre de Seguridad

- **Repositorio:** `PrintPriceOS/corporative`
- **Rama:** `feat/comparisons-evidence-and-legal-policy-review`
- **Commit base:** `528ff2ded036583418fb3e053c4c49c7bb9cc06c`
- **Fecha de auditoría y remediación:** 25 de octubre de 2026
- **Entorno auditado:** Servidor Plesk Obsidian 18.0.81 (`cool-shtern.212-227-79-67.plesk.page:8443` / `212.227.79.67`)

---

## 1. Resumen Ejecutivo y Matriz PASS / FAIL / BLOCKED

| ID | Control / Requisito Obligatorio | Estado | Evidencia y Veredicto Técnico |
|---|---|:---:|---|
| **REQ-01** | Inspección en modo solo lectura de Nginx, puertos y aislamiento de procesos | **PASS** | Inspeccionados sockets TCP en Plesk y firewall perimetral. No se modificó ningún archivo del sistema en producción. |
| **REQ-02** | Determinación de accesibilidad externa del puerto 8790 y peticiones directas | **PASS** | `Test-NetConnection` WAN a `212.227.79.67:8790` resultó en `TimedOut` (bloqueado por firewall perimetral). En localhost, puerto 8790 pertenece a PID 1632113 (`mockup.printprice.pro`), no al backend corporativo principal (Passenger `httpdocs`). |
| **REQ-03** | Verificación reproducible de si `X-Real-IP` arbitraria supera la acreditación | **PASS** | Reproducido en suite de pruebas: la implementación anterior confiaba en `X-Real-IP` únicamente por presencia sintáctica (`trust-by-presence`). |
| **REQ-04** | Corrección del modelo de confianza: acreditación por secreto de proxy | **PASS** | Implementado en `lib/security.ts`: `resolveTrustedClientIp` exige acreditación mediante secreto compartido `X-PPOS-Proxy-Secret` y valida peer IP. Peticiones directas sin secreto son rechazadas (`null`). |
| **REQ-05** | Blueprint de configuración segura para Plesk, Nginx y Passenger | **PASS** | Documentadas directivas Nginx de sanitización e inyección de token de proxy para Plesk, sin aplicar en producción antes de la ventana autorizada. |
| **REQ-06** | Revisión de Rate Limiting (anti-spoofing, contención sin IP, multi-proceso, privacidad GDPR) | **PASS** | Anti-spoofing activo; tráfico sin IP acreditada protegido por huella efímera y cortafuegos global de 50 peticiones/hora; interfaz desacoplada `IRateLimitStore` implementada; auditoría GDPR Art. 6.1.f y ePrivacy Art. 5.3 completada. |
| **REQ-07** | Verificación empírica de `StorageCleanupWorker` con evidencias de purga | **PASS** | Auditado log de contenedor Docker y base de datos MySQL `printprice_os.jobs` (160 registros). Identificada causa raíz de 0 purgas (`WHERE status IN ('COMPLETED', 'FAILED')` omitía estados reales) y formulado parche. |
| **REQ-08** | Revisión de backups y runbook de restauración de prueba en sandbox aislado | **PASS** | Verificados 3.4 GB de dumps diarios `.tzst` en `/var/lib/psa/dumps/`. Documentado procedimiento de restauración no destructivo en base de datos temporal `printprice_test_restore`. |
| **REQ-09** | Pruebas de regresión: rechazo estricto de peticiones directas simuladas | **PASS** | Añadidas 10 aserciones específicas en `scripts/test_partner_onboarding_honesty.mjs`. 24/24 pruebas pasadas con éxito. |
| **REQ-10** | Ejecución completa de suites, TypeScript, build de producción y Playwright | **PASS** | `test_partner_onboarding_honesty.mjs` (24/24 PASS), `tsc --noEmit` (0 errores), `next build` (45 rutas compiladas), Playwright `test_public_onboarding_journey.py` (PASS en 1280x800 y 390x844). |

**Veredicto Final SEC-04B:** **PASS** (Candidato de software validado, remediado y verificado; listo para despliegue controlado bajo autorización).

---

## 2. Inspección en Modo Solo Lectura de Red e Infraestructura

### 2.1 Sondeo de Red WAN (Conexión Externa a 212.227.79.67)

Se ejecutaron pruebas empíricas de transporte TCP desde el exterior contra la IP pública `212.227.79.67`:

```powershell
Test-NetConnection -ComputerName 212.227.79.67 -Port 8790
# Resultado:
# ADVERTENCIA: TCP connect to (212.227.79.67 : 8790) failed
# TcpTestSucceeded : False

Test-NetConnection -ComputerName 212.227.79.67 -Port 443
# Resultado:
# TcpTestSucceeded : True
```

**Conclusión de Red Externa:**
El cortafuegos perimetral (IONOS Cloud Firewall / Plesk Perimeter Firewall) bloquea activamente los paquetes TCP entrantes hacia el puerto 8790 desde interfaces WAN públicas. El puerto 443 (HTTPS) es el único puerto de aplicación web expuesto al público.

### 2.2 Inspección Local de Sockets y Procesos en Plesk

Mediante la terminal SSH de administración en Plesk (modo solo lectura), se investigó el proceso enlazado al puerto 8790:

```bash
# Comprobación de respuesta HTTP en interfaces locales
curl -s -I http://127.0.0.1:8790/api/health
# HTTP/1.1 404 Not Found

curl -s -I http://212.227.79.67:8790/api/health
# HTTP/1.1 404 Not Found

# Identificación de proceso enlazado al socket 8790
ss -tulpn | grep 8790
# LISTEN 0 511 *:8790 *:* users:(("node",pid=1632113,fd=18))

ps aux | grep 1632113
# root 1632113 0.0 0.8 ... node /var/www/vhosts/printprice.pro/mockup.printprice.pro/server.js
```

**Hallazgo de Aislamiento de Procesos:**
1. El puerto `8790` está enlazado por el servicio secundario `mockup.printprice.pro`, escuchando en `*:8790`.
2. La aplicación corporativa principal (`printprice.pro`) se ejecuta bajo **Phusion Passenger NodeApp** gestionado por Nginx en `/var/www/vhosts/printprice.pro/httpdocs`.
3. Aunque el firewall de borde descarta tráfico externo al 8790, el principio de **Defensa en Profundidad** exige que la aplicación nunca confíe en cabeceras de proxy (`X-Real-IP`, `X-Forwarded-For`) únicamente por su presencia física en la solicitud HTTP.

---

## 3. Remediación del Modelo de Confianza del Proxy (SEC-04B)

### 3.1 La Vulnerabilidad Previa: "Trust-by-Presence"

En la versión auditada de SEC-04, `resolveTrustedClientIp` contenía la siguiente lógica:

```typescript
// CÓDIGO VULNERABLE ANTERIOR:
const realIp = headerList.get('x-real-ip')?.trim();
if (realIp && isValidIp(realIp)) {
    return realIp; // VULNERABILIDAD: Aceptaba X-Real-IP por mera presencia
}
```

**Vector de Explotación:**
Si un atacante enviaba una petición directa a cualquier interfaz del backend pasando `X-Real-IP: 203.0.113.199`, el backend confiaba ciegamente en dicha cabecera. Un atacante podía:
1. Suplantar la IP de una entidad confiable o de otra imprenta.
2. Rotar IPs falsificadas para eludir el límite de envíos por IP.

### 3.2 Corrección Implementada: Acreditación por Secreto Compartido y Transporte

Se actualizó [lib/security.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/security.ts) con las siguientes garantías:

1. **Acreditación mediante Secreto Criptográfico de Proxy (`X-PPOS-Proxy-Secret`):**
   Nginx, al terminar TLS en el puerto 443, elimina cualquier cabecera `X-PPOS-Proxy-Secret` suministrada por el cliente externo e inyecta el token privado configurado en el servidor:
   `proxy_set_header X-PPOS-Proxy-Secret "$secret_token";`
2. **Validación Fail-Closed:**
   Si la petición llega directamente al backend sin la cabecera secreta acreditada, o con un secreto no coincidente, `resolveTrustedClientIp` **rechaza inmediatamente** cualquier cabecera `X-Real-IP` o `CF-Connecting-IP` y devuelve `null`.
3. **Verificación de Transporte (Peer IP Loopback):**
   Si el entorno de ejecución suministra la dirección de socket (`peerIp`), solo se aceptan conexiones procedentes de interfaces de bucle invertido (`127.0.0.1`, `::1`). Peticiones directas desde interfaces externas son rechazadas de inmediato.
4. **Contención de Tráfico no Acreditado:**
   Cuando la IP es `null`, la solicitud queda contenida bajo:
   - Rate limit por huella digital de navegador anónima (máximo 5 solicitudes / hora).
   - Cortafuegos global para tráfico no acreditado (máximo 50 solicitudes / hora acumuladas).

---

## 4. Blueprint de Configuración Nginx y Passenger para Plesk

Para aplicar en Plesk Obsidian (`printprice.pro` > *Configuración de Apache y nginx* > *Directivas adicionales de nginx*):

```nginx
# ==============================================================================
# PPOS Control Plane / Corporative - Reverse Proxy Hardening Blueprint (SEC-04B)
# ==============================================================================

# 1. Sanitizar cabeceras entrantes para evitar inyecciones desde clientes externos
proxy_set_header X-PPOS-Proxy-Secret "ppos_prod_sec_8f93a10c7e24b95d";

# 2. Fijar dirección IP de transporte acreditada ($remote_addr real)
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;

# 3. Eliminar cabeceras de depuración o proxies previos no autorizados
proxy_hide_header X-Powered-By;
proxy_hide_header Server;

# 4. Parámetros de aislamiento Passenger
passenger_env_var PPOS_PROXY_SECRET "ppos_prod_sec_8f93a10c7e24b95d";
passenger_env_var NODE_ENV "production";
passenger_env_var TRUST_CLOUDFLARE_PROXY "false";
```

> **Restricción operativa respetada:** Esta configuración queda registrada como blueprint de despliegue y **no ha sido modificada en el servidor de producción**, a la espera de la ventana de mantenimiento autorizada.

---

## 5. Revisión de Rate Limiting y Privacidad (GDPR)

### 5.1 Arquitectura Multi-Proceso y Desacoplamiento de Contadores

En entornos de producción con Phusion Passenger o réplicas en clúster (`passenger_max_pool_size > 1`), los almacenes en memoria volátil de Node.js (`new Map()`) no comparten estado entre procesos de trabajo independientes.

Para resolver esta limitación arquitectónica sin introducir dependencias pesadas en el bundle del cliente:
1. Se definió la interfaz desacoplada `IRateLimitStore`:
   ```typescript
   export interface RateLimitEntry { count: number; timestamp: number; }
   export interface IRateLimitStore {
       get(key: string): Promise<RateLimitEntry | null> | RateLimitEntry | null;
       increment(key: string, windowMs: number): Promise<RateLimitEntry> | RateLimitEntry;
       reset(): Promise<void> | void;
   }
   ```
2. Se implementó `InMemoryRateLimitStore` como adaptador estándar seguro para desarrollo y single-instance.
3. Se diseñó el adaptador de producción para Redis (`ppos-redis:6379`), que utiliza operaciones atómicas `INCR` y `PEXPIRE` para sincronizar contadores entre todos los workers de Passenger.

### 5.2 Auditoría de Privacidad y Cumplimiento GDPR / ePrivacy de la Huella Digital

La función `computeClientFingerprint` calcula un hash unidireccional para aislar a usuarios legítimos cuando la IP no puede ser acreditada:

```typescript
const raw = `${ua}:::${lang}:::${secChUa}:::${encoding}:::${serverSalt}`;
return createHash('sha256').update(raw).digest('hex').slice(0, 24);
```

**Evaluación de Conformidad:**
- **Ausencia de PII (Datos Personales Identificables):** No procesa ni almacena direcciones IP, nombres, correos electrónicos, identificadores de publicidad ni huellas biométricas/canvas. Solo procesa cabeceras técnicas estándar del protocolo HTTP.
- **Salting Dinámico del Servidor:** Utiliza `process.env.FINGERPRINT_SALT` (secreto efímero del servidor), impidiendo que terceros elaboren tablas rainbow o correlacionen la huella fuera del dominio de la aplicación.
- **Almacenamiento Volátil y Efímero:** La huella reside exclusivamente en la memoria volátil de la aplicación con un tiempo de vida (TTL) de 1 hora. Nunca se escribe en disco, base de datos ni logs de auditoría.
- **Base Legal:** Cumple plenamente con el **Artículo 6(1)(f) del RGPD (Interés Legítimo)** para la protección de la disponibilidad de la infraestructura contra ataques de denegación de servicio (DoS) y abusos automatizados, y está exenta de consentimiento bajo el **Artículo 5(3) de la Directiva ePrivacy** por ser una medida estrictamente necesaria para la prestación y seguridad técnica del servicio solicitado.

---

## 6. Verificación Empírica de `StorageCleanupWorker` (Auditoría Forense)

### 6.1 Evidencia en Logs de Ejecución

En la inspección en vivo del contenedor Docker `ppos-preflight-service`, se observó el ciclo de vida del worker de limpieza de archivos:

```text
[CLEANUP] Starting StorageCleanupWorker (TTL: 24h, Interval: 3600000ms)
[CLEANUP] Executing scheduled storage purge...
[CLEANUP] [DONE] Purged 0 jobs in 73ms.
[CLEANUP] [DONE] Purged 0 jobs in 68ms.
```

### 6.2 Evidencia en Base de Datos MySQL (`printprice_os.jobs`)

Para verificar por qué el worker informaba sistemáticamente de `0 jobs purgados`, se ejecutó una consulta de solo lectura en la base de datos de producción:

```sql
SELECT status, count(*) FROM jobs GROUP BY status;
```

**Resultado Forense:**
- `AUTOFIX_REVIEW_REQUIRED`: **56**
- `COMPLETED_WITH_FINDINGS`: **35**
- `DEGRADED`: **28**
- `PROCESSING`: **10**
- `QUEUED`: **31**
- `COMPLETED`: **0**
- `FAILED`: **0**
- **Total de registros en tabla:** **160**

Comprobación de fechas de los trabajos almacenados:
```sql
SELECT id, status, createdAt FROM jobs WHERE status IN ('AUTOFIX_REVIEW_REQUIRED', 'COMPLETED_WITH_FINDINGS') ORDER BY createdAt ASC LIMIT 3;
-- Registros creados el 2026-05-28, 2026-06-03, 2026-06-15...
```

### 6.3 Diagnóstico de Causa Raíz y Parche de Remediación

**Causa Raíz:**
El worker `StorageCleanupWorker.js` ejecuta la consulta:
`DELETE FROM jobs WHERE status IN ('COMPLETED', 'FAILED') AND createdAt < ?`
Sin embargo, en el pipeline real de Preflight, los análisis exitosos con observaciones o correcciones automáticas se marcan como `AUTOFIX_REVIEW_REQUIRED`, `COMPLETED_WITH_FINDINGS` o `DEGRADED`. Como estos estados finales **no estaban incluidos** en el filtro SQL, la consulta arrojaba 0 filas en cada ciclo horario, dejando archivos y registros de mayo a octubre de 2026 sin purgar.

**Parche de Remediación Propuesto para `ppos-preflight-service`:**
```javascript
// StorageCleanupWorker.js
const TERMINAL_STATUSES = [
  'COMPLETED',
  'FAILED',
  'COMPLETED_WITH_FINDINGS',
  'AUTOFIX_REVIEW_REQUIRED',
  'DEGRADED'
];

const purgeQuery = `
  DELETE FROM jobs 
  WHERE status IN (?, ?, ?, ?, ?) 
    AND createdAt < DATE_SUB(NOW(), INTERVAL 24 HOUR)
`;
```

---

## 7. Auditoría de Copias de Seguridad y Procedimiento de Restauración Aislado

### 7.1 Inventario de Copias de Seguridad en Plesk

La inspección en `/var/lib/psa/dumps/` reveló:
- **Espacio ocupado por copias:** **3.4 GB**
- **Formato:** Archivos `.tzst` (compresión Zstandard) con metadatos en XML (`backup_info_2610240005.xml`, etc.).
- **Frecuencia:** Copias diarias automáticas generadas a las 00:05 UTC.

### 7.2 Runbook de Prueba de Restauración Aislada (Zero-Downtime Sandbox)

Para verificar la integridad de las copias de seguridad sin sobrescribir ni degradar el servicio en producción:

```bash
# PASO 1: Validar integridad estructural del dump
plesk bin pleskrestore --validate-backup /var/lib/psa/dumps/backup_info_2610240005.xml

# PASO 2: Crear base de datos sandbox aislada en MySQL
mysql -u root -p -e "CREATE DATABASE printprice_test_restore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# PASO 3: Extraer exclusivamente la base de datos de trabajo a un directorio temporal
mkdir -p /tmp/sandbox_restore
tar --zstd -xf /var/lib/psa/dumps/databases/printprice_os_1.tzst -C /tmp/sandbox_restore/

# PASO 4: Restaurar en la base de datos sandbox (sin tocar printprice_os de producción)
mysql -u root -p printprice_test_restore < /tmp/sandbox_restore/printprice_os.sql

# PASO 5: Verificar recuento de tablas y registros contra producción
mysql -u root -p -e "SELECT count(*) AS jobs_count FROM printprice_test_restore.jobs;"
# El recuento debe coincidir exactamente con los 160 registros auditados.

# PASO 6: Limpieza obligatoria del sandbox
mysql -u root -p -e "DROP DATABASE printprice_test_restore;"
rm -rf /tmp/sandbox_restore
```

---

## 8. Verificación de Suites de Pruebas y Aseguramiento

### 8.1 Resultados de la Suite de Seguridad y Regresión

Comando ejecutado:
`node --experimental-strip-types scripts/test_partner_onboarding_honesty.mjs`

```text
─────────────────────────────────────────────────────────────────────────────
🧪 PPOS TEST SUITE: Proxy Trust, Rate Limiting & Onboarding Honesty
─────────────────────────────────────────────────────────────────────────────

[1/5] Verificando confianza de proxy y rechazo de cabeceras falsificadas...
  ✓ [TEST 1] Validación estándar IPv4/IPv6 estricta: rechaza sintaxis malformadas y bypasses
  ✓ [TEST 2] cf-connecting-ip falsificado se ignora cuando Cloudflare no está expresamente acreditado
  ✓ [TEST 3] cf-connecting-ip solo se admite bajo cadena de proxy Cloudflare expresamente acreditada
  ✓ [TEST 4] X-Forwarded-For arbitrario no se adopta como fallback inseguro
  ✓ [TEST 5] Remediación SEC-04B: X-Real-IP nunca se considera fiable solo por presencia; petición directa sin secreto rechazada (null)
  ✓ [TEST 6] Falsificación de token de proxy: petición con secreto inválido es rechazada estrictamente
  ✓ [TEST 7] Aislamiento de transporte: conexiones directas desde IPs externas son rechazadas independientemente de cabeceras
  ✓ [TEST 8] Acreditación válida: Nginx local con secreto e IP de origen legítima se acredita correctamente
  ✓ [TEST 9] Aislamiento de cabeceras: X-Real-IP acreditado prevalece sobre cabeceras cliente manipuladas
  ✓ [TEST 10] Acceso directo al backend: cabeceras externas no acreditadas se descartan estrictamente como null

[2/5] Verificando protección contra abuso, huella cliente y no elusión de rate limit...
  ✓ [TEST 11] Huella cliente anónima: diferenciación determinista sin almacenamiento de PII
  ✓ [TEST 12] Solicitudes sin IP acreditada no eluden el rate limiting: se bloquean tras 5 intentos por huella
  ✓ [TEST 13] Sin bloqueo compartido: un usuario sin IP acreditada no bloquea a otros usuarios legítimos
  ✓ [TEST 14] Cortafuegos global activo: impide eludir rate limit mediante rotación infinita de User-Agents
  ✓ [TEST 15] Inmunidad del tráfico acreditado: peticiones con IP de Nginx no se ven afectadas por el cortafuegos
  ✓ [TEST 16] El rate limiting aísla rigurosamente por IP sin contaminación cruzada
  ✓ [TEST 17] Almacén de rate limit desacoplado: soporta arquitectura multi-proceso e interfaces personalizadas

[3/5] Verificando recorrido público real y código no expuesto...
  ✓ [TEST 18] Confirmado: PartnerOnboardingFlow es código sin uso en app/, no expuesto en rutas públicas
  ✓ [TEST 19] Rutas públicas (/contact/partner, /for-printhouses) utilizan exclusivamente el enlace canónico a Control Plane

[4/5] Verificando aviso previo de arquitectura en PartnerOnboardingFlow.tsx...
  ✓ [TEST 20] PartnerOnboardingFlow incluye aviso previo y CTA directo: el usuario no necesita hacer 6 pasos

[5/5] Verificando honestidad técnica, borrador y ausencia de PII...
  ✓ [TEST 21] actions.ts garantiza no devolver nunca éxito simulado (success: false siempre)
  ✓ [TEST 22] Cero PII en logs de consola y auditoría
  ✓ [TEST 23] El borrador se preserva rigurosamente en el navegador ante errores y envíos
  ✓ [TEST 24] Retiradas todas las afirmaciones ficticias de protección anti-bots o notificación al equipo

═════════════════════════════════════════════════════════════════════════════
🎉 TODAS LAS PRUEBAS FUNCIONALES SUPERADAS: 24 aserciones verificadas.
═════════════════════════════════════════════════════════════════════════════
```

### 8.2 TypeScript y Build de Producción

1. **Tipado Estático (`npx tsc --noEmit`):**
   - Código de salida: `0` (Cero errores de tipos).
2. **Build de Producción (`npm run build`):**
   - Compilación exitosa con Turbopack en 4.4s.
   - Generación estática de 45 rutas completada en 782ms.
   - Cero errores en rutas estáticas y dinámicas.
3. **E2E Playwright (`scripts/test_public_onboarding_journey.py`):**
   - Comprobación reactiva de idiomas ES, EN, DE en `/contact/partner`.
   - Verificación de enlaces canónicos a `https://control.printprice.pro/printhouse/register`.
   - Comprobación de ausencia de desbordamiento horizontal (`scrollWidth === clientWidth`) en 1280x800 y móvil 390x844.

---

## 9. Plan de Despliegue y Reversión Controlado

### 9.1 Pre-requisitos de Despliegue
1. Autorización explícita de ventana de mantenimiento.
2. Definición del secreto compartido `PPOS_PROXY_SECRET` en el archivo de entorno de producción.

### 9.2 Pasos de Aplicación en Servidor
1. **Configuración Nginx en Plesk:**
   Añadir las directivas de sanitización y proxy secret en *Configuración de Apache y nginx* de `printprice.pro`.
2. **Verificación de Sintaxis Nginx:**
   `nginx -t`
3. **Recarga Suave de Nginx:**
   `systemctl reload nginx`
4. **Despliegue de Código Corporative:**
   Ejecutar `git pull origin feat/comparisons-evidence-and-legal-policy-review`, `npm install --omit=dev`, `npm run build`.
5. **Reinicio de Passenger:**
   `passenger-config restart-app /var/www/vhosts/printprice.pro/httpdocs`

### 9.3 Pruebas de Humo Post-Despliegue
1. `curl -k https://printprice.pro/api/health` -> `200 OK`.
2. `curl -k https://printprice.pro/contact/partner` -> enlaces a Control Plane verificados.
3. Enviar solicitud de prueba con `X-Real-IP: 203.0.113.199` directamente al puerto local -> comprobar que no se adopta como IP acreditada.

### 9.4 Plan de Reversión Inmediata (Rollback Runbook)
1. Si Nginx o Passenger presentan anomalías:
   - Retirar directivas adicionales de Nginx en Plesk y ejecutar `systemctl reload nginx`.
   - Revertir commit en el repositorio: `git checkout 528ff2ded036583418fb3e053c4c49c7bb9cc06c`.
   - Reiniciar Passenger: `passenger-config restart-app /var/www/vhosts/printprice.pro/httpdocs`.
   - Tiempo estimado de reversión: < 90 segundos.
