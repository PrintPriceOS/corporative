# Auditoría Técnica de Tratamiento Real de Archivos, Ciclo de Vida y Proveedores Externos

**Versión:** v2.0 (Revisión de Rigor Metodológico y Grado de Certeza)  
**Fecha de emisión:** 25 de octubre de 2026  
**Repositorio principal:** `PrintPriceOS/corporative`  
**Rama de trabajo:** `feat/comparisons-evidence-and-legal-policy-review`  
**Estado:** Documento de trabajo interno para decisiones de producto y revisión jurídica. Sin publicación ni despliegue.

---

## 1. Trazabilidad de Fuentes y Taxonomía de Evidencia

### 1.1. Inventario de Repositorios y Fuentes Locales Inspeccionadas

Todas las afirmaciones de esta auditoría se fundamentan en la inspección directa de los repositorios locales clonados del ecosistema PrintPrice OS, en los commits permanentes que se detallan a continuación:

| Repositorio / Módulo | Repositorio Remoto (GitHub) | SHA de Referencia Inspeccionado | Estado de Trabajo Local | Enlace Permanente de Referencia |
| :--- | :--- | :--- | :--- | :--- |
| **`corporative`** | `PrintPriceOS/corporative` | `a98d13e1376be777a50db5aca7a8a9f58e3faf4e` | Limpio (rama `feat/comparisons-evidence-and-legal-policy-review`) | [Commit a98d13e](https://github.com/PrintPriceOS/corporative/commit/a98d13e1376be777a50db5aca7a8a9f58e3faf4e) |
| **`ppos-preflight-service`** | `PrintPriceOS/ppos-preflight-service` | `1a9619886f5e117c2326880b44890d0a3794e17e` | Limpio (`main`) | [Commit 1a96198](https://github.com/PrintPriceOS/ppos-preflight-service/commit/1a9619886f5e117c2326880b44890d0a3794e17e) |
| **`ppos-preflight-worker`** | `PrintPriceOS/ppos-preflight-worker` | `5df3435116636737f280517dfae475860d1bbe51` | Limpio (`main`) | [Commit 5df3435](https://github.com/PrintPriceOS/ppos-preflight-worker/commit/5df3435116636737f280517dfae475860d1bbe51) |
| **`ppos-preflight-engine`** | `PrintPriceOS/ppos-preflight-engine` | `45f797e53792d44265f61247b2f2b8528854f8be` | Limpio (`main`) | [Commit 45f797e](https://github.com/PrintPriceOS/ppos-preflight-engine/commit/45f797e53792d44265f61247b2f2b8528854f8be) |
| **`ppos-control-plane`** | `PrintPriceOS/ppos-control-plane` | `44598a32f1713b9a6344f6d376ed0a4dbaa93b43` | Archivos seguidos limpios (`main`) | [Commit 44598a3](https://github.com/PrintPriceOS/ppos-control-plane/commit/44598a32f1713b9a6344f6d376ed0a4dbaa93b43) |
| **`ppos-pricing-engine`** | `PrintPriceOS/ppos-pricing-engine` | `261e369a6c2239c70bf0b1cf2e7e6471d3642541` | Limpio (`main`) | [Commit 261e369](https://github.com/PrintPriceOS/ppos-pricing-engine/commit/261e369a6c2239c70bf0b1cf2e7e6471d3642541) |

---

### 1.2. Taxonomía de Certeza y Grado de Evidencia

Para evitar atribuciones infundadas o sobreestimaciones de seguridad, los hechos de este informe se clasifican estrictamente en cuatro categorías:

1. **[CÓDIGO OBSERVADO]:** Lógica, consultas SQL, middleware, controladores y estructuras de datos explícitamente presentes en el código fuente versionado.
2. **[CONFIGURACIÓN DE PRODUCCIÓN COMPROBADA]:** Parámetros directamente verificados en la instancia activa en producción (p. ej., resolución DNS del dominio a IP `212.227.79.67` en IONOS SE Fráncfort, panel Plesk Obsidian 18.0.81).  
   *Aviso metodológico:* Los archivos de plantilla o staging (`.env.example`, `.env.staging.example`, `docker-compose.staging.yml`) **no** se describen como configuración de producción activa.
3. **[PRUEBA EJECUTADA]:** Comportamiento verificado mediante la ejecución de suites de test automatizadas o simulaciones reproducibles (p. ej., pruebas de almacenamiento local en Playwright).
4. **[HIPÓTESIS O PENDIENTE]:** Circunstancias operativas, contractuales o de infraestructura cuya verificación requiere acceso administrativo o contractual aún no disponible.

---

## 2. Almacenamiento, Retención y Eliminación de Archivos

### 2.1. Fix it / Preflight: Datos y Archivos Almacenados

| Concepto | Detalle Técnico Observado | Clasificación | Evidencia en Repositorio y Líneas |
| :--- | :--- | :---: | :--- |
| **Archivos en disco** | • Archivo de entrada: `$PPOS_UPLOADS_DIR/tenants/{tenantId}/jobs/{jobId}/input/<uuid>.pdf`<br>• Archivo reparado / final: `output/fixed.pdf` o `output/certified.pdf`<br>• Informes forenses: `reports/` o `output/report.json`, `output/fix_audit.json`<br>• Previsualizaciones: `previews/p1.png`... | **[CÓDIGO OBSERVADO]** | [`StorageManager.js:34-40`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/utils/StorageManager.js#L34-L40), [`StorageManager.js:85-106`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/utils/StorageManager.js#L85-L106), [`PreflightService.js:187-190`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/PreflightService.js#L187-L190) |
| **Ubicación en disco** | Variable `PPOS_UPLOADS_DIR` (por defecto `temp-staging` relativo al servicio o ruta absoluta configurada en el host). Estructura jerárquica con carpetas por inquilino y trabajo. | **[CÓDIGO OBSERVADO]** | [`server.js:37`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/server.js#L37), [`StorageManager.js:24-29`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/utils/StorageManager.js#L24-L29) |
| **Metadatos en base de datos** | Tabla `jobs` en MySQL: `id`, `tenant_id`, `deployment_id`, `user_id`, `job_type`, `status`, `input_bytes`, `idempotency_key`, `created_at`, `result` (JSON con findings, repairs y rutas de artefactos). | **[CÓDIGO OBSERVADO]** | [`routes/preflight.js:293-315`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/routes/preflight.js#L293-L315), [`routes/preflight.js:346-350`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/routes/preflight.js#L346-L350) |
| **Descarga de archivos** | La ruta `GET /api/preflight/jobs/:id/artifacts/:artifactId` resuelve el archivo y emite un stream binario mediante `fs.createReadStream(finalPath)`. **No contiene lógica de borrado tras la descarga ni reduce el tiempo de permanencia.** | **[CÓDIGO OBSERVADO]** | [`routes/preflight.js:720-730`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/routes/preflight.js#L720-L730) |

---

### 2.2. Lógica Literal del Worker de Saneamiento (`StorageCleanupWorker`)

La purga de archivos la gestiona la clase `StorageCleanupWorker` en `ppos-preflight-service`:

1. **Instanciación y frecuencia:**
   - En [`server.js:54-55`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/server.js#L54-L55), se instancia:  
     `const cleanupWorker = new StorageCleanupWorker(storage, 24);`  
     `cleanupWorker.start();`
   - El método `start(intervalMs = 3600000)` arranca un temporizador recurrente mediante `setInterval` cada **1 hora** (`3.600.000 ms`), ejecutando además una primera pasada inmediata en el arranque.

2. **Criterio de selección SQL:**
   - En [`StorageCleanupWorker.js:30-35`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/StorageCleanupWorker.js#L30-L35), la consulta literal es:
     ```sql
     SELECT id, tenant_id FROM jobs 
     WHERE status IN ('COMPLETED', 'FAILED') 
       AND created_at < NOW() - INTERVAL ? HOUR
     ```
     donde `?` corresponde a `this.ttlHours` (fijado en `24`).

3. **Análisis técnico del criterio y matices temporales:**
   - **Timestamp de referencia (`created_at`):** El contador de 24 horas comienza cuando se crea el registro del trabajo en la base de datos (al inicio de la carga), **no** cuando concluye el procesamiento ni cuando el usuario recibe el enlace de descarga. Si el análisis o reparación tarda varios minutos, la ventana de descarga disponible posterior al procesamiento es inferior a 24 horas.
   - **Estados incluidos:** Únicamente trabajos en estado `'COMPLETED'` o `'FAILED'`. Los estados `'PROCESSING'`, `'QUEUED'`, o variantes no entran en la selección.
   - **Ventana real de borrado (24 a 25+ horas):** Al ejecutarse el worker a intervalos de 1 hora, un trabajo que cumpla las 24 horas inmediatamente después de un pase no será procesado hasta la siguiente iteración (hasta 59 minutos después). Por tanto, el umbral de 24 horas no representa un plazo exacto ni un máximo garantizado de permanencia.
   - **Terminología inapropiada:** No procede calificar este umbral en documentos legales o comerciales como «improrrogable», «irrecuperable» o «máximo garantizado».

4. **Métodos reales de borrado físico y en base de datos:**
   - Para cada trabajo seleccionado en el bucle:
     ```javascript
     await this.storage.deleteJobStorage(job.tenant_id, job.id);
     await db.execute("DELETE FROM jobs WHERE id = ?", [job.id]);
     ```
   - El método `this.storage.deleteJobStorage(tenantId, jobId)` en [`StorageManager.js:124-128`](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/utils/StorageManager.js#L124-L128) ejecuta `await fs.remove(base)`, donde `base` es la ruta del directorio del trabajo.

5. **Manejo de errores:**
   - **A nivel de trabajo individual:** Bloque `try / catch` dentro del bucle. Si falla `deleteJobStorage` o `db.execute`, se emite `console.error('[CLEANUP-ERR] Failed to purge job ...')` y el bucle continúa con los demás trabajos. Si la eliminación en disco se completó pero la sentencia SQL falló, el trabajo reaparecerá en la siguiente consulta del worker.
   - **A nivel de ciclo general:** Si la consulta inicial de búsqueda de trabajos arroja error, se captura con `[CLEANUP-FATAL]` y la ejecución concluye de forma silenciosa para ese ciclo, esperando al siguiente intervalo.

6. **Comportamiento ante anomalías y fallos de servicio:**
   - **Trabajos bloqueados (`PROCESSING` / `QUEUED`):** Si el worker o el servidor se detienen por una anomalía imprevista dejando un trabajo en estado `PROCESSING` o `QUEUED`, dicho trabajo **nunca** es seleccionado por la consulta SQL actual. Los archivos permanecen en disco hasta que se intervenga manualmente o se añada una rutina de saneamiento por antigüedad absoluta de directorio.
   - *Propuesta técnica (sujeta a decisión de producto, no acordada):* Añadir una regla para seleccionar trabajos bloqueados con antigüedad superior a un umbral determinado (p. ej., 48 horas) o purgar directorios huérfanos sin fila en la tabla `jobs`.

---

## 3. Estado de Copias de Seguridad (Backups)

| Aspecto | Estado Actual | Clasificación | Justificación y Grado de Certeza |
| :--- | :--- | :---: | :--- |
| **Configuración en repositorios** | No se encuentran scripts de backup ni reglas de exclusión en los repositorios de código. | **[CÓDIGO OBSERVADO]** | La configuración de copias de seguridad de la máquina reside en el panel de administración del servidor o en el hipervisor, no en el repositorio git. |
| **Alcance y exclusiones en Plesk Obsidian** | **No verificado.** Se desconoce si la herramienta de backup de Plesk Obsidian tiene excluida la ruta de almacenamiento temporal (`temp-staging` / `PPOS_UPLOADS_DIR`). | **[PENDIENTE]** | La ausencia de reglas de exclusión en Git no demuestra la configuración activa en Plesk ni el alcance de instantáneas (*snapshots*) de IONOS SE. |
| **Frecuencia y retención de copias de seguridad** | **Pendiente de auditoría directa.** Se retira cualquier estimación no comprobada sobre plazos de conservación (como los supuestos 30–90 días). | **[PENDIENTE]** | Requiere consultar la programación real de copias en Plesk / IONOS SE antes de declarar compromisos contractuales de borrado en copias de respaldo. |

---

## 4. Proveedores Externos, Integraciones e Inteligencia Artificial

Para evitar confusiones en los compromisos legales, se distingue con rigor entre dependencias declaradas en paquetes, destinos permitidos por directivas de seguridad (CSP), integraciones implementadas en backend y transmisiones efectivamente verificadas:

```
[ Dependencias en package.json ]
  └── [ Integraciones en Backend ] (Configuradas o simuladas)
        └── [ Destinos autorizados por CSP ] (Permitidos en cabeceras de red)
              └── [ Transmisiones verificadas en tiempo de ejecución ]
```

### 4.1. Desglose Estructurado de Proveedores y Servicios

| Proveedor / Destinatario | Dependencia / Módulo | Estado de Integración | Destino en CSP | Transmisión Verificada | Función y Evaluación |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **IONOS SE** (Alemania) | Infraestructura de hosting | Activo en producción | N/A | **SÍ** | **[CONFIGURACIÓN DE PRODUCCIÓN COMPROBADA]:** Servidor en Fráncfort am Main (IP `212.227.79.67`). Aloja el sistema y correo. Requiere formalizar DPA europeo. |
| **Google LLC** (Gemini API) | `axios` (REST) en `ppos-control-plane` (`aiProviderAdapter.js`) | Integrado para asistente B2B (`calibrationAssistantService.js`). Requiere `GEMINI_API_KEY`. | No (llamada backend) | No verificada en este ciclo (requiere credencial activa) | **[CÓDIGO OBSERVADO]:** Llama al endpoint `https://generativelanguage.googleapis.com/v1beta/` (Google AI Studio / Gemini Developer API), **no** a Google Cloud Vertex AI.<br>*Distinción técnica y contractual:* En Gemini Developer API de pago, Google no entrena con datos del cliente, pero puede aplicar retenciones operativas temporales (distintas de la retención cero). No se debe imponer una contratación concreta (como Vertex AI) sin evaluar el servicio y contrato efectivamente utilizados. Fix it (Preflight) **no** utiliza este servicio. |
| **Cloudflare, Inc.** | Cabeceras en `proxy.ts` | Parcial / UI Placeholder | `https://static.cloudflareinsights.com`<br>`https://challenges.cloudflare.com` | **NO** | **[CÓDIGO OBSERVADO]:** Autorizado en directivas CSP (`script-src`, `frame-src`). En `PartnerOnboardingFlow.tsx:631` existe únicamente un elemento decorativo estático (`Cloudflare Turnstile Verified`) con el comentario explícito: *«Real Turnstile would inject here. This is the PPOS v2.5 UI placeholder»*. No hay widget activo transmitiendo datos. |
| **Report-URI** (`report-uri.com`) | Ninguna en código | No configurado | No | **NO** | **[CÓDIGO OBSERVADO]:** Servicio externo independiente de recolección de reportes de seguridad web (no perteneciente a Cloudflare). No está configurado en las directivas CSP de `proxy.ts`. No debe asociarse a Cloudflare ni a la configuración actual sin evidencia. |
| **Stripe, Inc.** | SDK Stripe en `ppos-control-plane` (`adminBilling.js`) | Integrado en backend | No (llamada backend) | **NO** | **[CÓDIGO OBSERVADO]:** Implementación con comportamiento fail-closed (deshabilitado si falta configuración o si `PAYMENT_EXECUTION_ENABLED=false`). |
| **Imprentas Asociadas de la Red** | Modelo de marketplace de Print it | Comercial | N/A | Condicionado a pedido | Destinatarios comerciales que reciben los archivos de fabricación y datos de envío únicamente tras la compra efectiva. |

---

### 4.2. Delimitación de Ausencia de IA en Preflight (Fix it)

- **Alcance de la conclusión:** La afirmación de ausencia de modelos de aprendizaje automático, redes neuronales o llamadas externas se circunscribe estrictamente al código y recorrido de ejecución analizados en `ppos-preflight-service`, `ppos-preflight-worker` y `ppos-preflight-engine`.
- **Componentes analizados en dicho flujo:**
  - Binarios CLI ejecutados localmente: `gs` (Ghostscript), `qpdf`, `mutool`, `pdfinfo`, `pdffonts`, `pdfimages`, `exiftool`.
  - Librerías JavaScript de manipulación: `pdf-lib`, `pdfjs-dist`.
  - Operativa: La inspección y reparación geométrica, corrección de sangrado, remapeo de espacios de color e incrustación de perfiles ICC se resuelven mediante parámetros deterministas de dichas herramientas locales, sin invocación de endpoints remotos ni modelos predictivos.

---

## 5. Datos Corporativos: Telemetría Local, Formularios y Logs de Servidor

### 5.1. Telemetría Técnica vs. Formularios de Servidor en `corporative`

1. **Telemetría técnica (`lib/telemetry.ts`):**
   - **[CÓDIGO OBSERVADO]:** Opera íntegramente en el cliente (`'use client'`).
   - Escribe en `localStorage` del navegador del usuario (`ppos_telemetry_history`, `ppos_project_results`) y `sessionStorage` (`ppos_session_id`).
   - Condicionada al consentimiento explícito mediante `hasAnalyticsConsent()`. Si se revoca, no se registran eventos y se suprimen los datos locales.
   - **No se envía por red a ningún servidor propio o externo.**

2. **Formulario de adhesión de imprentas (`lib/actions.ts`):**
   - **[CÓDIGO OBSERVADO]:** Se ejecuta en el servidor como una Server Action de Next.js (`submitPartnerOnboarding`).
   - Valida la carga útil mediante Zod, aplica comprobaciones de reputación de dominio de correo y filtros de calidad.
   - **No almacena datos en base de datos** en la versión inspeccionada.
   - **Emisión de registros en consola (`console.log`, `console.warn`, `console.error`):**
     - Línea 41: Registra errores de validación asociados a la IP del cliente (`[SECURITY][VALIDATION] Failed submission from ${clientIp}`).
     - Línea 49: Registra el correo electrónico rechazado (`Disposable email rejected from ${clientIp}: ${validatedData.email}`).
     - Línea 55: Registra el nombre de la empresa rechazado (`Submission rejected from ${clientIp}: ${validatedData.companyName}`).
     - Línea 94: Registra el correo electrónico en envíos exitosos (`[AUDIT][ONBOARDING] Submission processed. Tier: ${tier}. Email: ${validatedData.email}`).
   - **[PENDIENTE OPERATIVO]:** Estos registros se imprimen en los flujos estándar (stdout/stderr) del proceso Node.js. Su almacenamiento, rotación y período de retención dependen del supervisor de procesos del servidor (p. ej., extensiones de Plesk, Phusion Passenger, Docker o systemd), extremo que permanece **pendiente de auditoría operativa en el servidor**.

3. **Alcance de las restricciones de integridad referencial (`ON DELETE CASCADE`):**
   - **[CÓDIGO OBSERVADO]:** En los esquemas SQL de Control Plane existen claves foráneas con la directiva `ON DELETE CASCADE`.
   - *Matiz jurídico-técnico:* La existencia de `ON DELETE CASCADE` garantiza la consistencia referencial en la base de datos relacional cuando se elimina una fila padre, pero **no acredita por sí sola una política de retención temporal automatizada ni un procedimiento formalizado de baja o supresión de datos conforme al artículo 17 del RGPD**.

---

## 6. Textos Propuestos para la Web Corporativa (Borrador de Revisión)

Las siguientes redacciones están formuladas para su valoración interna y eventual incorporación futura en `corporative`, sin prometer plazos fijos, versiones TLS fijas, aislamiento garantizado ni coberturas contractuales no acreditadas. **No sustituyen las políticas actualmente publicadas en esta iteración.**

### 6.1. Ciclo de Vida y Tratamiento Temporal de Archivos (Preflight / Fix it)

*Sustituye la afirmación de «borrado automático tras la descarga o generación del informe» y «entornos volátiles».*

* **Español (ES):**  
  «Los documentos PDF cargados para verificación técnica se almacenan de forma temporal en el servidor con el fin exclusivo de permitir el análisis forense, la aplicación de reparaciones y la puesta a disposición de los informes y archivos resultantes para su descarga. El sistema ejecuta rutinas periódicas de saneamiento automatizado para la eliminación programada de dichos archivos y sus registros asociados, sin conservación indefinida. Los archivos no se transfieren a terceros ajenos a la prestación técnica solicitada.»

* **Inglés (EN):**  
  "PDF documents uploaded for technical verification are stored temporarily on the server solely to enable preflight analysis, automated corrections, and the retrieval of resulting reports and files. The system runs routine automated cleanup processes for scheduled deletion of these files and related records, without indefinite retention. Files are not shared with third parties beyond the requested technical service."

* **Alemán (DE):**  
  "Zur technischen Prüfung hochgeladene PDF-Dokumente werden temporär auf dem Server gespeichert, ausschließlich um die Druckdatenprüfung, automatische Korrekturen sowie den Abruf von Prüfberichten und Ergebnisdateien zu ermöglichen. Das System führt regelmäßige, automatisierte Bereinigungsroutinen zur planmäßigen Löschung dieser Dateien und zugehörigen Datensätze durch, ohne unbefristete Aufbewahrung. Dateien werden nicht an Dritte außerhalb der angeforderten technischen Verarbeitung weitergegeben."

---

### 6.2. Seguridad en las Comunicaciones

*Sustituye la mención a «cifrado TLS 1.3 tanto en la subida como en el análisis y la descarga».*

* **Español (ES):**  
  «Las transmisiones de datos entre su navegador y nuestra plataforma se realizan mediante conexiones seguras HTTPS con cifrado en tránsito. El procesamiento técnico interno se lleva a cabo directamente en la infraestructura del servicio mediante herramientas de inspección y normalización orientadas a la integridad de los documentos.»

* **Inglés (EN):**  
  "Data transmissions between your browser and our platform take place over secure HTTPS connections with encryption in transit. Internal technical processing is carried out directly on service infrastructure using inspection and normalization tools focused on document integrity."

* **Alemán (DE):**  
  "Die Datenübertragung zwischen Ihrem Browser und unserer Plattform erfolgt über sichere HTTPS-Verbindungen mit Transportverschlüsselung. Die interne technische Verarbeitung wird direkt auf der Serviceinfrastruktur mithilfe von Prüf- und Normalisierungswerkzeugen zur Sicherung der Dokumentenintegrität durchgeführt."

---

### 6.3. Delimitación del Uso de Modelos de Inteligencia Artificial

*Sustituye declaraciones genéricas o absolutas sobre IA en todo el ecosistema.*

* **Español (ES):**  
  «Las comprobaciones técnicas y correcciones de archivos en Fix it se fundamentan en herramientas deterministas de código abierto y reglas de ingeniería gráfica, sin emplear modelos de lenguaje ni redes neuronales para modificar el contenido de sus obras. Los documentos aportados para la comprobación gráfica no se destinan al entrenamiento de modelos de inteligencia artificial.»

* **Inglés (EN):**  
  "Technical preflight checks and corrections in Fix it rely on deterministic open-source tools and graphic engineering standards, without using language models or neural networks to alter manuscript content. Documents submitted for preflight inspection are not used to train artificial intelligence models."

* **Alemán (DE):**  
  "Die technische Prüfung und Korrektur in Fix it basiert auf deterministischen Open-Source-Werkzeugen und Standards der Druckvorstufe, ohne Sprachmodelle oder neuronale Netze zur inhaltlichen Veränderung Ihrer Werke einzusetzen. Zur Druckdatenprüfung eingereichte Dokumente werden nicht für das Training von KI-Modellen verwendet."

---

## 7. Matriz de Hechos Verificados frente a Pendientes Concretos

| Área de Revisión | Hecho Verificado (Evidencia de Código o Configuración) | Pendiente Concreto (Aspecto Operativo o Jurídico) | Clasificación de Certeza |
| :--- | :--- | :--- | :---: |
| **Ciclo de vida Preflight** | `StorageCleanupWorker` consulta cada 1 hora trabajos en estado `COMPLETED` o `FAILED` con `created_at < NOW() - 24h` y ejecuta `deleteJobStorage()` y borrado en BD. La descarga no borra el archivo. | Decidir formalmente si se mantiene este modelo de purga periódica o si se añade un mecanismo de borrado inmediato tras descarga o por solicitud del usuario. Evaluar propuesta de saneamiento de trabajos bloqueados. | **[CÓDIGO OBSERVADO]** / Pendiente de decisión de producto |
| **Copias de seguridad** | Los archivos residen en almacenamiento local del servidor host durante el ciclo del worker. No existen reglas de backup ni exclusiones en los repositorios de código. | Auditar en Plesk Obsidian y en el hipervisor de IONOS SE el alcance, programación, retención y posibles reglas de exclusión de las copias de seguridad de la ruta de almacenamiento temporal. | **[PENDIENTE]** |
| **Inteligencia Artificial en Preflight** | Fix it utiliza exclusivamente binarios locales deterministas (`gs`, `qpdf`, `mutool`, `exiftool`) y librerías de parsing locales en el recorrido inspeccionado. | Ninguno en este flujo específico. La ausencia de IA está acreditada en el código inspeccionado. | **[CÓDIGO OBSERVADO]** |
| **Inteligencia Artificial en Control Plane** | `aiProviderAdapter.js` invoca la API REST de Google Gemini (`generativelanguage.googleapis.com`) para el asistente de calibración de matrices en B2B. | Evaluar las condiciones contractuales del servicio efectivamente utilizado (Gemini Developer API vs. alternativas) y formalizar el DPA con las garantías pertinentes de tratamiento de datos antes del lanzamiento comercial. | **[CÓDIGO OBSERVADO]** / Pendiente contractual |
| **Proveedores y CSP** | `proxy.ts` autoriza orígenes de Cloudflare en cabeceras CSP. El componente de onboarding incluye un elemento estático decorativo de Turnstile sin integración activa. | Determinar si se implementará la integración funcional de Cloudflare Turnstile antes de formalizarlo en políticas públicas. Aclarar que `report-uri.com` no forma parte de la configuración. | **[CÓDIGO OBSERVADO]** |
| **Datos y Formularios Corporativos** | `telemetry.ts` almacena eventos únicamente en `localStorage` bajo consentimiento. `actions.ts` valida el formulario en servidor e imprime logs en consola con correos y nombres de empresa, sin persistencia en BD. | Auditar la retención y rotación de los registros de consola en el supervisor de procesos del servidor de producción. | **[CÓDIGO OBSERVADO]** / Pendiente operativo |
