# SEC-04D.1 — Release Candidate y Dictamen de Preparación Definitivo (Go / No-Go)

**Repositorio:** `PrintPriceOS/corporative`  
**Rama:** `feat/comparisons-evidence-and-legal-policy-review`  
**Commit de referencia SEC-04D inicial:** `ad42f9e421a1170d306b3a9cfa8cfa103328e352`  
**Commit Release Candidate Evaluado (SHA inmutable):** `91e8f7cfaa50f0ef0494f5c79c8a692a9bfef947`  
**Fecha de emisión:** 25 de Octubre de 2026  
**Auditor:** Antigravity (Google DeepMind)  

---

## 1. Dictamen de Ingeniería y Decisión Ejecutiva

### Dictamen Técnico de Ingeniería: **GO DEFINITIVO**
Ambos bloqueos identificados en SEC-04D han sido subsanados y validados con evidencia reproducible en el entorno de staging Plesk con servicios reales:
1. **Bloqueo 1 (Fail-open en producción)**: Resuelto taxativamente en el código. En producción (`NODE_ENV=production`), `createRateLimitStore()` impone siempre `failPolicy: 'closed'` con desprecio estricto de cualquier opción recibida, manteniendo `forceMemory` e `inMemoryFallback` bloqueados con excepción.
2. **Bloqueo 2 (Server Actions verificadas E2E)**: Resuelto en el build real de Next.js 16.2.1 compilado con Turbopack. La validación atraviesa Nginx real, acredita la identidad, evalúa la Server Action en el proceso interno de Next.js, conecta con Redis 7.0.15 real, admite los primeros 5 intentos, bloquea atómicamente el sexto, comprueba la denegación controlada ante pérdida de Redis (fail-closed) y verifica que el mecanismo de diagnóstico responde HTTP 404 en producción estándar.

### Autorización Operativa de Despliegue: **BLOQUEADO (NO-GO OPERATIVO TEMPORAL)**
> [!IMPORTANT]
> **SEPARACIÓN EXPRESA ENTRE CALIFICACIÓN TÉCNICA Y AUTORIZACIÓN DE DESPLIEGUE:**  
> A pesar de que el dictamen técnico es **GO**, **el despliegue en el entorno productivo (`printprice.pro`) permanece rigurosamente BLOQUEADO**. Ningún archivo ha sido desplegado a producción (`/var/www/vhosts/printprice.pro/httpdocs` permanece inalterado en el commit `8a333d7`) ni se modificará la configuración de Plesk sin la orden explícita y formal del operador responsable.

---

## 2. Remediación de los Dos Bloqueos Finales (SEC-04D.1)

### 2.1 Bloqueo 1 — Imposición Incondicional de `failPolicy: 'closed'` en Producción

En [`lib/redisRateLimitStore.ts`](file:///c:/Users/KIKE/Downloads/corporative/lib/redisRateLimitStore.ts), se garantizó que cuando `NODE_ENV=production`, `failPolicy` queda fijado rígidamente en `'closed'`, ignorando cualquier parámetro que intente habilitar `failPolicy: 'open'`:

```typescript
// Constructor de RedisRateLimitStore:
const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
this.failPolicy = isProduction ? 'closed' : (options?.failPolicy ?? 'open');

// Factory createRateLimitStore():
const effectiveFailPolicy: 'closed' | 'open' = isProduction ? 'closed' : (options?.failPolicy ?? 'open');
return new RedisRateLimitStore(client, {
    prefix: options?.prefix,
    windowMs: options?.windowMs,
    failPolicy: effectiveFailPolicy
});
```

#### Reglas de comportamiento verificadas:
- `options.failPolicy: 'open'` solicitado en producción **no produce admisión** ante fallos de Redis (`allowed: false, reason: 'REDIS_ERROR'`).
- `forceMemory` e `inMemoryFallback` en producción lanzan de inmediato una excepción explícita impidiendo cualquier degradación en memoria.
- Redis desconectado impide admitir nuevas solicitudes (fail-closed).
- En desarrollo (`NODE_ENV=development` o no fijado), se respetan las opciones explícitas (`failPolicy: 'open'` admite degradación controlada con `allowed: true, reason: 'ALLOWED'`).

Evidencia en [`scripts/test_create_rate_limit_store.mjs`](file:///c:/Users/KIKE/Downloads/corporative/scripts/test_create_rate_limit_store.mjs):
```text
  ✓ [TEST 4] En producción, forceMemory e inMemoryFallback son bloqueados taxativamente con excepción
  ✓ [TEST 5] Redis caído con failPolicy=closed deniega admisión controladamente (REDIS_ERROR) sin abrir la puerta
  ✓ [TEST 6] failPolicy: 'open' solicitado en producción es ignorado e impone estrictamente fail-closed (allowed: false)
  ✓ [TEST 7] Desarrollo conserva opciones explícitas: failPolicy: 'open' permite admisión degradada controlada
  ✓ [TEST 8] Tráfico no acreditado con Redis caído aplica fail-closed riguroso
  ✓ [TEST 9] Concurrencia en InMemoryRateLimitStore: admite exactamente 5 y bloquea 5
🎉 TODAS LAS PRUEBAS DE LA FACTORÍA SUPERADAS (9 verificaciones)
```

---

### 2.2 Bloqueo 2 — Validación E2E de Server Actions en Proceso Real Next.js

Para verificar la ejecución de Server Actions dentro del proceso real de Next.js sin reactivar el formulario público huérfano (`submitPartnerOnboarding` permanece desacoplado de las páginas públicas), se implementó:

1. **Server Action en Proceso ([`lib/actions.ts`](file:///c:/Users/KIKE/Downloads/corporative/lib/actions.ts))**:
   ```typescript
   'use server';
   export async function checkActionRateLimit(): Promise<{
     accredited: boolean;
     resolvedIp: string | null;
     allowed: boolean;
     admissionReason?: string;
     count: number;
     storeType: string;
   }> {
     const headerList = await headers();
     const clientIp = resolveTrustedClientIp(headerList);
     const clientFingerprint = clientIp ? null : computeClientFingerprint(headerList);
     const admission = await checkAndRecordRateLimit(clientIp, clientFingerprint);
     const store = getActiveRateLimitStore();

     return {
       accredited: clientIp !== null,
       resolvedIp: clientIp,
       allowed: admission.allowed,
       admissionReason: admission.reason,
       count: admission.count,
       storeType: store.storeType || store.constructor.name
     };
   }
   ```
2. **Propiedad `storeType` inmune a minificación de producción**:
   Tanto [`InMemoryRateLimitStore`](file:///c:/Users/KIKE/Downloads/corporative/lib/inMemoryRateLimitStore.ts) como [`RedisRateLimitStore`](file:///c:/Users/KIKE/Downloads/corporative/lib/redisRateLimitStore.ts) declaran explícitamente `readonly storeType: string`, evitando que la ofuscación de nombres de clase (`store.constructor.name` -> `'a'`) altere las validaciones de tipo en producción.
3. **Mecanismo Diagnóstico Condicional ([`app/api/diagnostic/rate-limit/route.ts`](file:///c:/Users/KIKE/Downloads/corporative/app/api/diagnostic/rate-limit/route.ts))**:
   Protegido estrictamente por variable de entorno:
   ```typescript
   if (process.env.ENABLE_TEST_DIAGNOSTICS !== 'true') {
     return new NextResponse(null, { status: 404 });
   }
   ```
   En cualquier entorno de producción donde `ENABLE_TEST_DIAGNOSTICS` no esté explícitamente fijado a `'true'`, el endpoint devuelve de inmediato `HTTP 404 Not Found`.

---

## 3. Evidencia Reproducible en Staging Plesk Real

Se ejecutó la prueba completa [`scripts/test_real_nextjs_nginx_redis_e2e.mjs`](file:///c:/Users/KIKE/Downloads/corporative/scripts/test_real_nextjs_nginx_redis_e2e.mjs) en el servidor Plesk (`cool-shtern.212-227-79-67`):

```
[Petición Externa de Prueba]
           │
           ▼ (puerto 3890 - Loopback Nginx Real)
[Nginx Staging Real (/etc/nginx/conf.d/sec04d_test_nextjs_proxy.conf)]
  - proxy_pass http://127.0.0.1:3892;
  - proxy_set_header X-Real-IP $remote_addr;
  - proxy_set_header X-PPOS-Proxy-Secret "<secreto_efímero_56_bytes>";
           │
           ▼ (puerto 3892 - Loopback HTTP)
[Servidor Real Next.js 16.2.1 en Producción (server.js con Turbopack)]
  - PID: 3739104
  - Server Action: checkActionRateLimit() ejecutada en runtime Next.js
  - Almacén activo: RedisRateLimitStore con scripts Lua atómicos
           │
           ▼ (puerto 6379)
[Redis 7.0.15 Real de Staging]
```

### Registro de Ejecución Certificado en Staging (Terminal Plesk)
```text
root@cool-shtern:/tmp/sec04d1_test_env/repo# npx tsx scripts/test_real_nextjs_nginx_redis_e2e.mjs
🚀 SEC-04D.1: VALIDACIÓN E2E REAL: SERVER ACTIONS + NGINX REAL + REDIS REAL
   Host Nginx: 127.0.0.1:3890
   Host Next.js Real: 127.0.0.1:3892
   Host Redis Real: redis://127.0.0.1:6379
   Secreto de Proxy: Efímero (sec04d1_ae4820... longitud: 56)
═════════════════════════════════════════════════════════════════════════════

[Paso 1] Verificando build de Next.js en .next/...
  ✓ Build de producción localizado (BUILD_ID: C4asLmfcVXOvni6ZCzlld)

[Paso 2] Configurando vhost en Nginx (/etc/nginx/conf.d/)...
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
  ✓ Vhost Nginx desplegado y recargado con éxito.

[Paso 3] Arrancando Next.js en modo producción con diagnóstico de pruebas activo...
  [Next.js stdout] > Servidor Next.js listo en puerto 3892 (RELEASE_ID: sec04d1-release-1792931444858)
  ✓ Next.js activo en PID: 3739104

[Criterio 1 & 2] Petición a través de Nginx y verificación de acreditación...
  ✓ [SEC04D1-1] Petición atraviesa Nginx con éxito y Next.js acredita identidad (127.0.0.1) vía Server Action

[Criterio 3] Verificando que la Server Action utiliza RedisRateLimitStore...
  ✓ [SEC04D1-2] La Server Action inicializa y utiliza RedisRateLimitStore con Redis 7.0.15

[Criterio 4] Consumiendo intentos 2 al 5 a través de Nginx en la Server Action...
  ✓ [SEC04D1-3] Los primeros 5 intentos son admitidos correctamente por Redis a través de Nginx (HTTP 200)

[Criterio 5] Ejecutando intento 6 a través de Nginx...
  ✓ [SEC04D1-4] Intento 6 bloqueado atómicamente por la Server Action en Next.js (HTTP 429, IP_LIMIT)

[Criterio 6] Reiniciando Next.js con Redis caído (fail-closed)...
  [Next.js stdout] > Servidor Next.js listo en puerto 3892 (RELEASE_ID: sec04d1-release-1792931446812)
  [Next.js stderr] [SECURITY][REDIS_CONNECTION] Redis client connection error: connect ECONNREFUSED 127.0.0.1:49999
  [Next.js stderr] [SECURITY][REDIS_STORE] Admission check failed: Reached the max retries per request limit
  ✓ [SEC04D1-5] Pérdida de Redis provoca denegación controlada fail-closed en Next.js (HTTP 429, REDIS_ERROR)

[Criterio 7] Reiniciando Next.js en producción estándar (ENABLE_TEST_DIAGNOSTICS=false)...
  [Next.js stdout] > Servidor Next.js listo en puerto 3892 (RELEASE_ID: sec04d1-release-1792931448842)
  ✓ [SEC04D1-6] Mecanismo de diagnóstico estrictamente inaccesible (HTTP 404) en producción estándar

[LIMPIEZA] Deteniendo servidor Next.js (PID: 3739192)...
  ✓ Servidor Next.js detenido.
[LIMPIEZA] Eliminando /etc/nginx/conf.d/sec04d_test_nextjs_proxy.conf...
  ✓ Nginx recargado tras limpieza de vhost de prueba.
[LIMPIEZA] Eliminadas 1 claves de prueba en Redis.

═════════════════════════════════════════════════════════════════════════════
🎉 PRUEBA SEC-04D.1 SUPERADA: TODOS LOS CRITERIOS VERIFICADOS
═════════════════════════════════════════════════════════════════════════════
```

---

## 4. Estado Limpio del Servidor e Inalterabilidad de Producción

Tras la ejecución de las pruebas, se verificó formalmente el estado del servidor Plesk:
```bash
root@cool-shtern:/tmp# ls -la /etc/nginx/conf.d/ && nginx -t && redis-cli keys "*sec04*" && git -C /var/www/vhosts/printprice.pro/httpdocs log -n 1 --oneline && git -C /var/www/vhosts/printprice.pro/httpdocs status
total 32
drwxr-xr-x  2 root root 4096 Oct 25 12:30 .
drwxr-xr-x 10 root root 4096 Oct 22 00:57 ..
-rw-r--r--  1 root root  949 Mar 19  2026 api.printprice.pro.conf.disabled
-rw-------  1 root root  171 Feb  3  2025 brotli.conf
-rw-r--r--  1 root root  147 Jul 17  2025 fixssl.conf
-rw-r--r--  1 root root  147 Jul 17  2025 fixssl.conf.default
lrwxrwxrwx  1 root root   45 Mar 17  2026 phusion-passenger.conf -> ../modules.available.d/phusion-passenger.conf
-rw-r--r--  1 root root  475 Feb  3  2025 ssl.conf
-rw-------  1 root nginx 391 Oct 23 14:14 zz010_psa_nginx.conf
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
(empty array)
8a333d7 (HEAD, origin/feat/public-experience-i18n-quality) fix(ux): complete rigorous comparison tables with verified sources and neutral claims
HEAD detached at 8a333d7
nothing to commit, working tree clean
```
- **Vhosts temporales**: Cero archivos residuales en `/etc/nginx/conf.d/`.
- **Sintaxis Nginx**: Válida y funcional.
- **Claves Redis**: Cero claves residuales de test.
- **Código en producción (`/var/www/vhosts/printprice.pro/httpdocs`)**:
  - Permanece intacto en el commit `8a333d7`.
  - Ninguna línea de código del candidato SEC-04D.1 ha sido copiada ni desplegada en producción.

---

## 5. Matriz de Decisión Go / No-Go Definitiva

| Criterio de Aceptación | Estado | Evidencia y Justificación Técnica | Decisión |
| :--- | :---: | :--- | :---: |
| **1. Fail-open imposible en producción** | CUMPLIDO | `createRateLimitStore()` impone `failPolicy: 'closed'` incondicionalmente. `forceMemory` bloqueado con error. 9/9 tests PASS. | **GO** |
| **2. Server Actions verificadas E2E en Next.js** | CUMPLIDO | Ejecutado en proceso real de Next.js 16.2.1 sobre Nginx y Redis 7.0.15; los 7 criterios superados. | **GO** |
| **3. Acreditación de identidad vía Nginx** | CUMPLIDO | `127.0.0.1` acreditada mediante cabeceras de Nginx con secreto efímero (56 bytes); sin exposición de secretos. | **GO** |
| **4. Almacén Redis 7.0.15 y scripts Lua** | CUMPLIDO | `RedisRateLimitStore` atómico; intentos 1-5 admitidos (HTTP 200); intento 6 bloqueado (HTTP 429, `IP_LIMIT`). | **GO** |
| **5. Tolerancia a fallos fail-closed** | CUMPLIDO | Caída simulada de Redis genera denegación controlada (`HTTP 429, REDIS_ERROR`) sin admitir peticiones. | **GO** |
| **6. Mecanismos de diagnóstico protegidos** | CUMPLIDO | `/api/diagnostic/rate-limit` devuelve `HTTP 404` en producción estándar (`ENABLE_TEST_DIAGNOSTICS != 'true'`). | **GO** |
| **7. Servidor Staging limpio y sin residuos** | CUMPLIDO | Vhost eliminado, Nginx recargado, Redis limpio, procesos terminados. | **GO** |
| **8. Producción inalterada** | CUMPLIDO | Directorio `/var/www/vhosts/printprice.pro/httpdocs` conservado en commit `8a333d7` sin modificar. | **GO** |
| **9. Autorización Operativa de Despliegue** | **BLOQUEADO** | Restricción de seguridad activa: prohibido desplegar a producción sin autorización formal. | **NO-GO (OP)** |

---

## 6. SHA Final Inmutable y Trazabilidad

- **Rama:** `feat/comparisons-evidence-and-legal-policy-review`
- **SHA Candidato Definitivo de Código (Evaluado en Staging):** `91e8f7cfaa50f0ef0494f5c79c8a692a9bfef947`
- **Conclusión de la Auditoría:**  
  Ambos bloqueos de SEC-04D quedan formal y técnicamente **RESUELTOS Y SUPERADOS**. El dictamen técnico de ingeniería es **GO DEFINITIVO**.  
  De conformidad con la política de seguridad operativa, **la producción se mantiene estrictamente sin cambios y el despliegue permanece bloqueado** a la espera de la autorización explícita del operador responsable.
