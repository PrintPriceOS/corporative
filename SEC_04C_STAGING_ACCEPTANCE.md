# SEC-04C — Preproducción, Integración Atómica y Aceptación de Despliegue

- **Repositorio:** `PrintPriceOS/corporative`
- **Rama:** `feat/comparisons-evidence-and-legal-policy-review`
- **Commit base de auditoría:** `9d0c1c371f98fabd567aee54abdfd4bad9246d2e`
- **Estado de misión:** **IN_PROGRESS**
- **Estado de producción:** **DESPLIEGUE BLOQUEADO** (Prohibición estricta de aplicar cambios en producción sin autorización explícita y validación previa en staging).

---

## 1. Resumen de Estado de Controles SEC-04C

| Componente / Control | Estado | Detalle de Implementación y Verificación |
|---|:---:|---|
| **Almacén Atómico Redis** | **IMPLEMENTADO** | Archivo [`lib/redisRateLimitStore.ts`](file:///c:/Users/KIKE/Downloads/corporative/lib/redisRateLimitStore.ts). Scripts Lua atómicos para incremento y evaluación de cuota en una sola operación. |
| **Eliminación de Carrera en `actions.ts`** | **IMPLEMENTADO** | Eliminado el patrón vulnerable "check-then-record". [`lib/actions.ts`](file:///c:/Users/KIKE/Downloads/corporative/lib/actions.ts) invoca `checkAndRecordRateLimit()` atómico. |
| **Política ante Caída de Redis** | **IMPLEMENTADO** | Política `fail-closed` por defecto en producción: ante error de red o timeout de Redis, la puerta se cierra por seguridad (`REDIS_ERROR`). |
| **Concurrencia Multi-Worker Comprobada** | **PASS** | Prueba de concurrencia: dos workers independientes (A y B) comparten cuota Redis; el intento 6 es bloqueado atómicamente por ambos. |
| **Directivas Nginx/Passenger** | **DOCUMENTADO** | Confirmado uso de `passenger_set_header` en cada bloque `location` activo para evitar la pérdida de cabeceras no heredadas. |
| **Garantía de Onboarding Honesto** | **CONFIRMADO** | `submitPartnerOnboarding()` mantiene `success: false` y estado `INTEGRATION_PENDING`. Registro oficial canónico en Control Plane. |
| **Pruebas de Regresión y Build** | **PASS** | 30/30 aserciones superadas; `tsc --noEmit` (0 errores); `npm run build` (45 rutas compiladas). |
| **Verificación HTTP en Staging Real** | **PENDIENTE** | Pendiente despliegue de prueba en vhost aislado antes de autorizar producción. |

---

## 2. Integración Atómica de Rate Limiting (Redis y Memoria)

### 2.1 Eliminación de la Condición de Carrera "Check-Then-Record"

En la versión previa, `actions.ts` ejecutaba:
```typescript
// PATRÓN VULNERABLE ANTERIOR:
if (isRateLimited(clientIp, clientFingerprint)) { ... } // 1. Lectura
recordSubmissionAttempt(clientIp, clientFingerprint);   // 2. Escritura posterior
```
Si dos o más procesos de Passenger recibían solicitudes simultáneas en el límite de la cuota (por ejemplo, en el intento 4 de 5), ambos leían `count < 5` y ambos permitían la operación, registrando 5 y 6 y superando la cuota permitida.

**Remediación implementada (SEC-04C):**
1. Se unificó la comprobación y el incremento en la función atómica `checkAndRecordRateLimit(clientIp, clientFingerprint)`:
   ```typescript
   // EN LIB/ACTIONS.TS:
   const admission = await checkAndRecordRateLimit(clientIp, clientFingerprint);
   if (!admission.allowed) {
       return { success: false, status: 'RATE_LIMIT_EXCEEDED', ... };
   }
   ```
2. La operación de incremento se realiza de manera indivisible mediante Lua en Redis o mediante mutación síncrona en memoria. El intento 6 es **rechazado atómicamente**.

### 2.2 Scripts Lua de Evaluación Atómica en Redis

En [`lib/redisRateLimitStore.ts`](file:///c:/Users/KIKE/Downloads/corporative/lib/redisRateLimitStore.ts):

1. **Admisión de IP Acreditada (`ATOMIC_ADMIT_SCRIPT`):**
   ```lua
   local current = redis.call('INCR', key)
   if current == 1 then redis.call('PEXPIRE', key, window_ms) end
   local ttl = redis.call('PTTL', key)
   local allowed = (current <= max_allowed) and 1 or 0
   return {allowed, current, ttl}
   ```
2. **Admisión de Tráfico no Acreditado (`ATOMIC_UNACCREDITED_ADMIT_SCRIPT`):**
   Evalúa simultáneamente la cuota por huella digital (`fp:<hash>`, máx 5) y el cortafuegos global de tráfico no acreditado (`unaccredited:global`, máx 50). Si cualquiera de los dos ha alcanzado su límite, rechaza la solicitud sin quemar cuota ajena. Si ambos están dentro del umbral, incrementa atómicamente ambos contadores.

### 2.3 Política Explícita ante Fallo de Redis (Fail-Closed)

Si Redis se encuentra inaccesible (`ECONNREFUSED`, timeout o error de clúster):
- En producción, `failPolicy: 'closed'` garantiza que no se produzca una degradación silenciosa a memoria local desincronizada. Se rechaza la solicitud con `reason: 'REDIS_ERROR'`, emitiendo alerta de seguridad en logs.
- En entornos de desarrollo donde Redis no esté configurado expresamente, el sistema opera con `InMemoryRateLimitStore` de forma transparente.

---

## 3. Decisión Técnica de Infraestructura: Phusion Passenger y Nginx

### 3.1 `passenger_set_header` vs `proxy_set_header`

La investigación técnica en la documentación oficial de Phusion Passenger establece:
1. `proxy_set_header` es una directiva del módulo estándar `ngx_http_proxy_module` de Nginx y **solo tiene efecto cuando se utiliza `proxy_pass`**.
2. Cuando una aplicación se sirve mediante el módulo nativo de Passenger (`passenger_enabled on;`), las cabeceras HTTP que deben inyectarse en el entorno de la aplicación Node.js deben declararse mediante:
   ```nginx
   passenger_set_header X-PPOS-Proxy-Secret "configured_secret";
   passenger_set_header X-Real-IP $remote_addr;
   passenger_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   passenger_set_header X-Forwarded-Proto $scheme;
   ```
3. **Regla de Ámbito y Herencia en Nginx:**
   `passenger_set_header` **no se hereda** en bloques `location` anidados si dicho bloque define sus propias directivas de cabecera. Por tanto, en la configuración de Plesk, estas directivas deben colocarse tanto en el contexto `server` como dentro de cada `location` gestionada por Passenger.
4. **Semántica de Sockets en Next.js Server Actions:**
   La función `headers()` de Next.js (`next/headers`) lee exclusivamente cabeceras HTTP del protocolo. No expone directamente el descriptor de socket raw (`req.socket.remoteAddress`) del proceso Node. Por ello, la autenticidad del origen descansa de forma fiable en la cabecera `X-PPOS-Proxy-Secret` inyectada y sobrescrita obligatoriamente por Passenger.

---

## 4. Resultados de Pruebas de Integración (30 Aserciones Verificadas)

Ejecución de `node --experimental-strip-types scripts/test_partner_onboarding_honesty.mjs`:

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

[6/6] Verificando SEC-04C: Concurrencia de rate limit atómico y adaptador Redis...
  ✓ [TEST 25] SEC-04C: Puerta de admisión atómica bloquea intento 6 en IP acreditada
  ✓ [TEST 26] SEC-04C: Tráfico no acreditado bloqueado atómicamente por huella al intento 6
  ✓ [TEST 27] SEC-04C: Concurrencia multiproceso demostrada: Workers A y B comparten cuota Redis y bloquean intento 6
  ✓ [TEST 28] SEC-04C: Cortafuegos global para tráfico no acreditado opera atómicamente en Redis
  ✓ [TEST 29] SEC-04C: Política fail-closed comprobada: indisponibilidad de Redis no abre la puerta silenciosamente
  ✓ [TEST 30] SEC-04C: actions.ts integrado con la puerta de admisión atómica (cero condiciones de carrera)

═════════════════════════════════════════════════════════════════════════════
🎉 TODAS LAS PRUEBAS FUNCIONALES SUPERADAS: 30 aserciones verificadas.
═════════════════════════════════════════════════════════════════════════════
```

---

## 5. Verificación de Compilación y Tipado

1. **TypeScript (`npx tsc --noEmit`):**
   - Código de salida: `0` (Cero errores de compilación).
2. **Build de Producción (`npm run build`):**
   - Optimización exitosa con Turbopack.
   - 45 rutas estáticas y dinámicas compiladas sin advertencias ni dependencias rotas.
3. **Playwright E2E (`scripts/test_public_onboarding_journey.py`):**
   - Comprobación reactiva multilingüe (ES, EN, DE) en `/contact/partner` y `/for-printhouses`.
   - Cero desbordamiento horizontal en móvil (390x844) y escritorio (1280x800).
   - Enlaces canónicos verificados apuntando a `https://control.printprice.pro/printhouse/register`.

---

## 6. Pasos para la Aceptación Final y Apertura de Despliegue

1. **Staging Vhost Validation:**
   Antes de solicitar autorización de producción, desplegar este paquete en un subdominio o vhost aislado de staging para validar la inyección de `passenger_set_header` con tráfico HTTP real.
2. **Conexión de Redis en Servidor:**
   Definir `REDIS_URL` en el entorno de preproducción (`ppos-redis:6379`) y verificar la persistencia de claves con prefijo `ppos:corporative:rl:`.
3. **Revisión de Seguridad Final:**
   Comprobar que ninguna cabecera secreta ni PII se filtre en endpoints públicos ni registros de consola.
