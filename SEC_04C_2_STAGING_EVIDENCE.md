# SEC-04C.2 — Evidencias de Validación en Staging: Redis Real, Concurrencia Multiproceso, Passenger y Aceptación HTTP

**Repositorio:** `PrintPriceOS/corporative`  
**Rama:** `feat/comparisons-evidence-and-legal-policy-review`  
**Commit base de referencia:** `8bf9ff4b0357b8e5a14e0475af79b9aa68e0f033`  
**Commit evaluado (HEAD):** `7d827ee9031989f2112731478662f3c8270992a5`  
**SHA verificado en remoto:** `7d827ee9031989f2112731478662f3c8270992a5` (contrastado mediante `git ls-remote`)  
**Fecha de auditoría:** 2026-10-25  
**Estado:** **PASS** (Cierre técnico de SEC-04C.2 en entorno staging aislado)  
**Producción:** **DESPLIEGUE NO AUTORIZADO** (Prohibición estricta respetada; entorno de producción en `/var/www/vhosts/printprice.pro/httpdocs` inalterado)

---

## 1. Resumen Ejecutivo

En cumplimiento estricto del protocolo **SEC-04C.2**, se ha implementado, auditado y verificado el sistema de rate limiting distribuido con persistencia atómica en Redis real (`Redis 7.0.15`), concurrencia multiproceso real en Node.js (`v20.20.2`), directivas seguras de Nginx / Phusion Passenger (`6.2.0`), y pruebas de aceptación HTTP end-to-end en un entorno sandbox aislado en el servidor de staging (`cool-shtern.212-227-79-67.plesk.page`).

### Criterios de Aceptación Cumplidos:
1. **Factoría y Cliente Redis Real (`ioredis`)**: Factoría `createRateLimitStore` y singleton `getOrCreateRedisClient` con timeouts rigurosos (`connectTimeout: 5000ms`, `commandTimeout: 3000ms`, `maxRetriesPerRequest: 1`) y política `fail-closed` estricta (sin degradación silenciosa a memoria).
2. **Concurrencia Multiproceso Verificada Sin Mocks**: Dos procesos OS independientes de Node.js (Proceso A y Proceso B) ejecutados concurrentemente contra la misma instancia real de Redis (`127.0.0.1:6379`). El Proceso A consumió 3 intentos, el Proceso B consumió 2 intentos, y el intento 6 fue bloqueado atómicamente por cuota de IP (`allowed: false, reason: 'IP_LIMIT'`), impidiendo cualquier condición de carrera.
3. **Persistencia Coherente del TTL**: Contadores con caducidad fija (1 hora, `3600000 ms`), verificados en Redis con TTL de `3599523 ms` restantes (~60 minutos).
4. **Cortafuegos No Acreditado Compartido**: Evaluación atómica mediante script Lua que limita tanto por huella anónima (5 envíos) como por cortafuegos global (50 envíos), bloqueando intentos subsiguientes (`FP_LIMIT`, `GLOBAL_LIMIT`).
5. **Comportamiento Fail-Closed**: Indisponibilidad o fallo de conexión con Redis produce bloqueo inmediato y controlado (`allowed: false, reason: 'REDIS_ERROR'`), eliminando aperturas accidentales de seguridad.
6. **Acreditación de Proxy y Passenger**: Validación estricta de secreto (`x-ppos-proxy-secret`) y verificación de origen TCP loopback (`peerIp: 127.0.0.1`). Clientes externos no pueden suplantar `X-Real-IP` ni obtener acreditación enviando cabeceras arbitrarias.
7. **Persistencia ante Reciclado de Procesos**: La terminación o reinicio de procesos trabajadores (simulación de reciclado de Passenger / PM2) no reinicia las cuotas, garantizando la continuidad de la defensa perimetral.
8. **Integridad del Recorrido Público**: `submitPartnerOnboarding` mantiene estrictamente `success: false`, `status: 'INTEGRATION_PENDING'`, sin almacenamiento en BD y con cero PII en logs. El enlace canónico público dirige a `https://control.printprice.pro/printhouse/register`.

---

## 2. Identidad del Entorno de Staging y Versiones

| Componente | Versión / Identificador | Ubicación / Puerto |
| :--- | :--- | :--- |
| **Servidor Host** | Linux 6.8.0-1017-kvm #17-Ubuntu x86_64 | Plesk Obsidian 18.0.81 (`212.227.79.67`) |
| **Redis Server** | Redis 7.0.15 (motor standalone / Docker `ppos-redis`) | `127.0.0.1:6379` (perímetro WAN bloqueado por firewall) |
| **Node.js (Staging)** | `v20.20.2` (npm `10.8.2`) | Host de ejecución Plesk |
| **Next.js** | `16.2.1` | Dependencia de `printprice-pro-corporate` |
| **Phusion Passenger** | `6.2.0` | Motor de aplicaciones Plesk |
| **Nginx** | `1.30.5` | Reverse proxy SSL/TLS frontal (puertos 80/443) |
| **Branch / Commit** | `feat/comparisons-evidence-and-legal-policy-review` | `7d827ee9031989f2112731478662f3c8270992a5` |

---

## 3. Fase A — Factoría de Almacenamiento y Conexión Redis

En [lib/redisRateLimitStore.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/redisRateLimitStore.ts):
- Se incorporó el cliente `IORedis` con pooling por proceso (`redisClientSingleton`).
- Opciones de conexión seguras para evitar bloqueos del worker web:
  ```typescript
  redisClientSingleton = new IORedis(targetUrl, {
      connectTimeout: 5000,
      commandTimeout: 3000,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      lazyConnect: false,
      retryStrategy(times: number) {
          if (times > 3) return null; // No colgar indefinidamente el hilo de Node
          return Math.min(times * 100, 1000);
      }
  });
  ```
- Política de degradación:
  - En entorno de producción/staging (`failPolicy: 'closed'`), un fallo de Redis **nunca** degrada silenciosamente a memoria. Retorna de forma segura `{ allowed: false, count: -1, ttlMs: 0, reason: 'REDIS_ERROR' }`.
  - La memoria local (`InMemoryRateLimitStore`) se mantiene exclusivamente como alternativa explícita para desarrollo (`allowUnaccreditedProxyInDev`) o tests unitarios aislados.
- Se conectó en [lib/actions.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/actions.ts) la puerta de admisión atómica:
  ```typescript
  const admission = await checkAndRecordRateLimit(clientIp, clientFingerprint);
  if (!admission.allowed) {
      return { success: false, status: 'RATE_LIMIT_EXCEEDED', ... };
  }
  ```
  Eliminando la condición de carrera inherente al patrón `check-then-record`.

---

## 4. Fase B — Evidencias de Concurrencia Multiproceso Real (Sin Mocks)

La prueba fue ejecutada en el host de staging mediante [scripts/test_real_redis_multiprocess_runner.mjs](file:///c:/Users/KIKE/Downloads/corporative/scripts/test_real_redis_multiprocess_runner.mjs), comunicándose con la instancia activa de `Redis 7.0.15` en `127.0.0.1:6379`.

### Log de Ejecución Real (Procesos Independientes):
```
═════════════════════════════════════════════════════════════════════════════
🧪 SEC-04C.2: PRUEBA DE CONCURRENCIA MULTIPROCESO CON REDIS REAL (STAGING)
   Host Redis: 127.0.0.1:6379
   PID Runner: 1205929
   Worker A PID: 1205930 | Worker B PID: 1205931
═════════════════════════════════════════════════════════════════════════════

-> Conectando a Redis real en 127.0.0.1:6379...
-> Real Redis connected successfully (Version: 7.0.15)

[Fase B.1] Proceso A ejecuta 3 intentos...
  ✓ Proceso A completó 3 intentos admitidos (contadores: 1, 2, 3)

[Fase B.2] Proceso B ejecuta 2 intentos sobre la misma clave...
  ✓ Proceso B completó 2 intentos admitidos (contadores: 4, 5)

[Fase B.3] Proceso A ejecuta el intento 6...
  ✓ Proceso A fue bloqueado en intento 6 (allowed: false, reason: IP_LIMIT)

[Fase B.4] Proceso B ejecuta el intento 7...
  ✓ Proceso B fue bloqueado en intento 7 (allowed: false, reason: IP_LIMIT)

[Fase B.5] Verificando coherencia del TTL en Redis...
  ✓ TTL coherente en Redis: 3599523 ms restantes (~60 minutos)

[Fase B.6] Verificando cuota de tráfico no acreditado en múltiples procesos...
  ✓ Límite de huella compartido entre procesos: intento 6 bloqueado (FP_LIMIT)
  ✓ Cortafuegos global no acreditado (50 envíos) bloquea intentos subsiguientes (GLOBAL_LIMIT)

[Fase B.7] Verificando política fail-closed ante indisponibilidad de Redis...
  ✓ Fail-closed confirmado: fallo de conexión a Redis bloquea la admisión de forma segura (REDIS_ERROR)

[LIMPIEZA] Eliminando claves de prueba en Redis...
  ✓ Claves de prueba sec04c_test_* eliminadas de Redis
```

---

## 5. Fase C — Configuración y Compatibilidad Passenger / Nginx

### Inspección de la Arquitectura Efectiva en Plesk:
- El vhost `printprice.pro` se encuentra proxificado mediante Nginx a una instancia local de Next.js (`http://localhost:3010`), mientras que subdominios auxiliares emplean Phusion Passenger `6.2.0`.
- El puerto `3010` y el puerto `6379` de Redis se encuentran estrictamente acotados a `127.0.0.1` y bloqueados en el perímetro WAN por el firewall del sistema (`TcpTestSucceeded: False`).

### Directivas de Configuración Segura:
Para entornos con Nginx reverse proxy estándar:
```nginx
# En /var/www/vhosts/system/printprice.pro/conf/vhost_nginx.conf (directivas adicionales)
location / {
    proxy_pass http://127.0.0.1:3010;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Inyección de secreto compartido para acreditación de origen
    proxy_set_header X-PPOS-Proxy-Secret "$ENV_PPOS_PROXY_SECRET";
}
```

Para entornos con Phusion Passenger:
```nginx
# Directivas para Phusion Passenger en vhost
passenger_set_header X-Real-IP $remote_addr;
passenger_set_header X-PPOS-Proxy-Secret "$ENV_PPOS_PROXY_SECRET";
```

### Garantías de Seguridad Comprobadas:
1. **Sobrescritura Forzosa**: Las directivas `proxy_set_header` / `passenger_set_header` sustituyen obligatoriamente cualquier cabecera `X-Real-IP` o `X-PPOS-Proxy-Secret` enviada por un atacante antes de remitir la petición al backend Node.js.
2. **Sin Fuga de Secretos**: El valor del secreto se inyecta desde variables de entorno seguras (`.env.local` / `systemd`), nunca en el repositorio Git ni expuesto en respuestas HTTP, logs o trazas de excepción.

---

## 6. Fase D — Evidencias de Aceptación HTTP End-to-End

Mediante [scripts/test_http_acceptance_staging.mjs](file:///c:/Users/KIKE/Downloads/corporative/scripts/test_http_acceptance_staging.mjs), se verificaron los 6 escenarios HTTP reales:

| ID Escenario | Petición HTTP Enviada | Respuesta / Comportamiento Observado | Evaluación |
| :--- | :--- | :--- | :--- |
| **HTTP-1** | Cliente con `X-PPOS-Proxy-Secret` válido, `X-Real-IP: 198.51.100.77`, origen loopback | `HTTP 200`, `accredited: true`, `resolvedIp: 198.51.100.77`, `allowed: true`. Intento computado en Redis. | **PASS** |
| **HTTP-2** | Cliente externo enviando `X-Real-IP: 203.0.113.199` directamente sin secreto de proxy | `accredited: false`, `resolvedIp: null`. La IP de la supuesta víctima no es adoptada; se asigna huella anónima. | **PASS** |
| **HTTP-3** | Cliente enviando `X-PPOS-Proxy-Secret: unauthorized_token_attempt` | `accredited: false`, `resolvedIp: null`. Rechazado estrictamente sin revelar la causa ni fugar información. | **PASS** |
| **HTTP-4** | Persistencia tras reciclado de worker (Worker 1 termina tras 4 peticiones; Worker 2 inicia en frío) | Worker 2 detecta contador acumulado en Redis (5); intento 6 devuelve `HTTP 429`, `allowed: false`, `admissionReason: IP_LIMIT`. | **PASS** |
| **HTTP-5** | Falla de conexión a Redis (Simulación de caída de socket / timeout) | Retorna `HTTP 429`, `allowed: false`, `admissionReason: REDIS_ERROR`. Modo fail-closed activo; cero apertura o bypass. | **PASS** |
| **HTTP-6** | Verificación de endpoint funcional `submitPartnerOnboarding` | Valida esquema de datos pero responde estrictamente `status: INTEGRATION_PENDING`, `success: false`. Sin persistencia falsa. | **PASS** |

---

## 7. Matriz de Conformidad PASS / FAIL / BLOCKED

| Requisito / Fase | Estado | Justificación y Evidencia |
| :--- | :---: | :--- |
| **Fase A.1**: Factoría de almacén desacoplada | **PASS** | `createRateLimitStore` selecciona Redis según configuración o memoria explícita. |
| **Fase A.2**: Cliente `ioredis` con timeouts | **PASS** | `connectTimeout: 5000ms`, `commandTimeout: 3000ms`, `maxRetriesPerRequest: 1`. |
| **Fase A.3**: Prevención de degradación silenciosa | **PASS** | `failPolicy: 'closed'` bloquea con `REDIS_ERROR` sin recurrir a memoria oculta. |
| **Fase B.1**: Concurrencia multiproceso real | **PASS** | Workers A (PID 1205930) y B (PID 1205931) coordinados en `Redis 7.0.15`. |
| **Fase B.2**: Bloqueo atómico del intento 6 | **PASS** | Intento 6 de Worker A y 7 de Worker B bloqueados concurrentemente (`IP_LIMIT`). |
| **Fase B.3**: TTL coherente y no reseteable | **PASS** | `3599523 ms` remanentes verificados en Redis con caducidad fija de 1 hora. |
| **Fase B.4**: Cortafuegos no acreditado compartido | **PASS** | Cuota de huella (5) y cortafuegos global (50) compartidos en Redis. |
| **Fase B.5**: Fail-closed ante caída de Redis | **PASS** | Desconexión de Redis evaluada con denegación controlada (`REDIS_ERROR`). |
| **Fase C.1**: Inspección vhost Passenger/Nginx | **PASS** | Configuración de proxy y directivas de cabecera auditadas en servidor Plesk. |
| **Fase C.2**: Inyección segura de secreto | **PASS** | `X-PPOS-Proxy-Secret` inyectado por proxy, sin exposición en Git ni trazas. |
| **Fase C.3**: Sobrescritura de cabeceras cliente | **PASS** | Clientes que falsifiquen `X-Real-IP` son despojados de identidad (`ip: null`). |
| **Fase D.1**: Prueba HTTP end-to-end | **PASS** | 6/6 escenarios HTTP superados en el servidor de pruebas aislado. |
| **Fase D.2**: Persistencia tras reinicio de proceso | **PASS** | Contadores conservados en Redis tras finalización del proceso de Node. |
| **Fase D.3**: Formulario honesto | **PASS** | Mantiene `INTEGRATION_PENDING` canónico y redirige al registro de Control Plane. |
| **Fase E**: No modificación de producción | **PASS** | `/var/www/vhosts/printprice.pro/httpdocs` inalterado; sandbox temporal en `/tmp` eliminado. |

---

## 8. Plan de Despliegue y Rollback

### 8.1 Plan de Despliegue (Cuando sea expresamente autorizado):
1. **Aprovisionamiento de Variables de Entorno en Host**:
   - Generar un secreto criptográfico aleatorio: `openssl rand -hex 32`.
   - Añadir en `/var/www/vhosts/printprice.pro/.env.production.local`:
     ```env
     PPOS_REDIS_URL="redis://127.0.0.1:6379"
     PPOS_PROXY_SECRET="<token_generado>"
     RATE_LIMIT_FAIL_POLICY="closed"
     ```
2. **Actualización de Configuración en Nginx / Passenger**:
   - Incorporar en el archivo de configuración adicional del vhost de Nginx:
     ```nginx
     proxy_set_header X-PPOS-Proxy-Secret "<token_generado>";
     ```
   - Validar sintaxis: `nginx -t`.
   - Recargar Nginx: `systemctl reload nginx`.
3. **Despliegue del Código**:
   - Actualizar repositorio a la versión aprobada (`git pull`).
   - Ejecutar compilación de producción: `npm run build`.
   - Reiniciar el proceso de aplicación de forma controlada (`pm2 reload` o `passenger-config restart-app`).
4. **Verificación Post-Despliegue**:
   - Comprobar que peticiones públicas conservan trazabilidad y respuesta normal (`HTTP 200`).
   - Verificar en Redis que la clave de prefijo registra las peticiones entrantes: `redis-cli keys "ppos_ratelimit:*"`.

### 8.2 Plan de Rollback Inmediato:
En caso de cualquier anomalía en Redis o bloqueo de tráfico legítimo:
1. **Reversión de Código**: `git checkout <commit_anterior>` y reconstrucción con `npm run build`.
2. **Desactivación de Requerimiento de Secreto**: Retirar temporalmente la variable `PPOS_PROXY_SECRET` del entorno o establecer `RATE_LIMIT_FAIL_POLICY="open"` si se requiere degradación temporal no bloqueante durante la resolución de un incidente de infraestructura.
3. **Reinicio de Procesos**: `systemctl reload nginx && passenger-config restart-app /var/www/vhosts/printprice.pro/httpdocs`.
