# Auditoría Técnica de Tratamiento Real de Archivos, Ciclo de Vida y Proveedores Externos

**Fecha de emisión:** 25 de octubre de 2026  
**Repositorio principal:** `PrintPriceOS/corporative`  
**Rama de trabajo:** `feat/comparisons-evidence-and-legal-policy-review`  
**Repositorios auditados:**
- `PrintPriceOS/corporative` (Web pública y portal corporativo)
- `ppos-preflight-service` (Servicio Fastify de orquestación y API de Preflight)
- `ppos-preflight-worker-phase-10-intelligence-layer` (Worker asíncrono BullMQ de ejecución de análisis y reparación)
- `ppos-preflight-engine` (Motor determinista CLI de auditoría PDF y normalización)
- `ppos-control-plane-phase-10-intelligence-layer` (Control Plane B2B, ingesta de evidencia de cotización y servicios de calibración)
- `ppos-pricing-engine-main` (Motor matemático de cálculo de presupuestos)

---

## Resumen Ejecutivo

La presente auditoría técnica ha sido realizada a nivel de código fuente, archivos de configuración, esquemas de migración SQL y variables de entorno en los repositorios locales del ecosistema PrintPrice OS.

Su finalidad es contrastar empíricamente la operativa real del software frente a las declaraciones públicas contenidas en la web corporativa (`corporative`), determinando con precisión qué hechos están acreditados y qué compromisos deben corregirse o matizarse en las políticas de privacidad y transparencia de inteligencia artificial.

### Conclusiones Principales:
1. **El motor de Preflight (Fix it) no utiliza Inteligencia Artificial:** Es 100% determinista. Se sustenta exclusivamente en binarios industriales locales de código abierto (`gs` - Ghostscript, `qpdf`, `mutool`, `pdfinfo`, `pdffonts`, `pdfimages`, `exiftool`) y bibliotecas de parsing (`pdf-lib`, `pdfjs-dist`). Cero redes neuronales, cero LLMs y cero llamadas de red externas.
2. **Discrepancia frontal en el ciclo de vida de archivos de Preflight:** La web corporativa afirma actualmente que los archivos se borran «tras la descarga o generación del informe» y que operan en «entornos volátiles». **La realidad del código demuestra lo contrario:** los archivos se escriben en disco persistente (`PPOS_UPLOADS_DIR`) con una estructura segregada por inquilino y trabajo, y su purga la ejecuta un worker periódico en segundo plano (`StorageCleanupWorker`) con un **TTL de 24 horas**. La descarga no borra el archivo.
3. **Riesgo crítico no resuelto en copias de seguridad (Backups):** Al residir los archivos temporales en el sistema de archivos del servidor durante 24 horas, si los respaldos programados de Plesk Obsidian o snapshots del servidor IONOS no excluyen expresamente la ruta `/opt/printprice-os/temp-staging`, los documentos de los usuarios se incorporan a las copias de seguridad del servidor, persistiendo durante semanas o meses.
4. **Inteligencia Artificial en Control Plane (Google Gemini):** A diferencia de Preflight, el módulo de calibración comercial B2B en Control Plane (`calibrationAssistantService.js`) sí consume un modelo de IA generativa (`gemini-3.5-flash` a través de `generativelanguage.googleapis.com`). Dicho servicio envía mensajes de chat y fragmentos de texto de presupuestos B2B a Google, lo que exige formalizar contractualmente un DPA corporativo con Google Cloud / Vertex AI para garantizar la exclusión de entrenamiento (*Zero Data Retention*).

---

## 1. Qué Archivos y Datos se Almacenan, Dónde y Durante Cuánto Tiempo

### 1.1. Archivos PDF de Preflight / Validación Técnica (Fix it)

| Parámetro | Realidad Acreditada en Código | Evidencia en Repositorio y Líneas |
| :--- | :--- | :--- |
| **Archivos almacenados** | • Archivo PDF original subido por el usuario (`input/<uuid>.pdf`).<br>• Archivo PDF reparado / certificado (`output/fixed.pdf`, `output/certified.pdf`).<br>• Reporte técnico forense en formato JSON (`output/report.json`).<br>• Registro de auditoría de reparaciones (`output/fix_audit.json`).<br>• Previsualizaciones rasterizadas de páginas (`previews/p1.png`). | [ppos-preflight-service/utils/StorageManager.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/utils/StorageManager.js#L35-L72)<br>[ppos-preflight-service/services/PreflightService.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/PreflightService.js#L187-L190)<br>[ppos-preflight-service/services/PreflightService.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/PreflightService.js#L244-L258) |
| **Ubicación física en almacenamiento** | **Sistema de archivos local (Disco del servidor):**<br>Ruta configurada mediante la variable de entorno `PPOS_UPLOADS_DIR` (por defecto `/opt/printprice-os/temp-staging` en producción Linux o `./temp-staging` local).<br>Estructura de aislamiento jerárquico estricto por inquilino y trabajo:<br>`$PPOS_UPLOADS_DIR/tenants/{tenantId}/jobs/{jobId}/[input\|output\|temp\|reports\|previews]` | [ppos-preflight-service/server.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/server.js#L37-L39)<br>[ppos-preflight-service/utils/StorageManager.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/utils/StorageManager.js#L24-L40)<br>[ppos-control-plane-phase-10-intelligence-layer/docs/CANONICAL_STORAGE_ROLLOUT.md](file:///c:/Users/KIKE/Downloads/ppos-control-plane-phase-10-intelligence-layer/docs/CANONICAL_STORAGE_ROLLOUT.md#L3-L12) |
| **Metadatos en Base de Datos** | **MySQL (Tabla `jobs`):**<br>Se registran: `id` (identificador único del trabajo), `tenant_id`, `deployment_id`, `user_id`, `job_type` (`ANALYZE`, `AUTOFIX`), `status` (`PROCESSING`, `COMPLETED`, `FAILED`, `QUEUED`), `input_bytes`, `idempotency_key`, `created_at`, y `result` (objeto JSON que contiene los findings, repairs, rutas relativas de artefactos y métricas de conformidad). | [ppos-preflight-service/routes/preflight.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/routes/preflight.js#L293-L315)<br>[ppos-preflight-service/services/PreflightService.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/PreflightService.js#L207-L213)<br>[ppos-preflight-service/services/PreflightService.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/PreflightService.js#L300-L309) |
| **Tiempo real de conservación (TTL)** | **24 horas desde la creación del trabajo:**<br>El servicio instancia un worker de limpieza con parámetro de 24 horas: `new StorageCleanupWorker(storage, 24)`.<br>Los archivos permanecen en disco durante todo este intervalo para permitir la descarga del PDF corregido, la consulta del informe interactivo y la re-descarga de previsualizaciones. | [ppos-preflight-service/server.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/server.js#L53-L56)<br>[ppos-preflight-service/services/StorageCleanupWorker.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/StorageCleanupWorker.js#L10-L15)<br>[ppos-preflight-service/services/StorageCleanupWorker.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/StorageCleanupWorker.js#L29-L35) |

---

### 1.2. Documentos de Evidencia de Cotización B2B (Control Plane / Quote Evidence)

| Parámetro | Realidad Acreditada en Código | Evidencia en Repositorio y Líneas |
| :--- | :--- | :--- |
| **Archivos y datos tratados** | • Presupuestos en formato PDF subidos por imprentas en el proceso de calibración de costes.<br>• **El archivo binario PDF NO se guarda en disco:** se procesa íntegramente en memoria mediante `multer.memoryStorage()` con un límite de 10 MB (`fileSize: 10 * 1024 * 1024`).<br>• En MySQL (tablas `quote_evidence_documents` y `quote_evidence_extractions`) se almacena:<br>  - Hash SHA-256 (`document_sha256`) para idempotencia y prevención de duplicados.<br>  - Nombre original del archivo (`original_filename`) y número de páginas.<br>  - Texto extraído del documento (`raw_text`, limitado a 500 KB).<br>  - Estructuras normalizadas en JSON (`extracted_json`, `normalized_json`) con cantidades, precios de fabricación y desglose de transporte. | [ppos-control-plane-phase-10-intelligence-layer/src/api/routes/quoteEvidenceUploadRoutes.js](file:///c:/Users/KIKE/Downloads/ppos-control-plane-phase-10-intelligence-layer/src/api/routes/quoteEvidenceUploadRoutes.js#L22-L27)<br>[ppos-control-plane-phase-10-intelligence-layer/src/api/routes/quoteEvidenceUploadRoutes.js](file:///c:/Users/KIKE/Downloads/ppos-control-plane-phase-10-intelligence-layer/src/api/routes/quoteEvidenceUploadRoutes.js#L59-L135)<br>[ppos-control-plane-phase-10-intelligence-layer/src/api/services/pdfQuoteExtractionService.js](file:///c:/Users/KIKE/Downloads/ppos-control-plane-phase-10-intelligence-layer/src/api/services/pdfQuoteExtractionService.js#L21-L24)<br>[ppos-control-plane-phase-10-intelligence-layer/src/api/services/pdfQuoteExtractionService.js](file:///c:/Users/KIKE/Downloads/ppos-control-plane-phase-10-intelligence-layer/src/api/services/pdfQuoteExtractionService.js#L111-L132) |
| **Ubicación y retención** | **Base de datos MySQL:** Tablas `quote_evidence_documents` y `quote_evidence_extractions`.<br>Permanecen vinculadas al inquilino (*tenant*) de la imprenta mientras dure su configuración comercial en la plataforma (eliminación en cascada mediante `ON DELETE CASCADE`). | [ppos-control-plane-phase-10-intelligence-layer/migrations/150_phase194_quantity_economics_and_quote_evidence.sql](file:///c:/Users/KIKE/Downloads/ppos-control-plane-phase-10-intelligence-layer/migrations/150_phase194_quantity_economics_and_quote_evidence.sql#L16-L72) |

---

### 1.3. Datos en la Web Corporativa (`corporative`)

| Parámetro | Realidad Acreditada en Código | Evidencia en Repositorio y Líneas |
| :--- | :--- | :--- |
| **Archivos de usuario** | **Ninguno.** La aplicación web `corporative` (Next.js) es informativa y comercial. No dispone de campos `<input type="file">`, ni controladores de carga de archivos en disco, ni volúmenes persistentes de PDFs de clientes. Los formularios de Preflight en la web son páginas de información y marketing con enlaces a los subdominios de producto (`budget.printprice.pro`). | [corporative/app/products/preflight/page.tsx](file:///c:/Users/KIKE/Downloads/corporative/app/products/preflight/page.tsx)<br>[corporative/app/products/budget/page.tsx](file:///c:/Users/KIKE/Downloads/corporative/app/products/budget/page.tsx) |
| **Telemetría y navegación** | **Almacenamiento exclusivo en el navegador del usuario (`localStorage` / `sessionStorage`):**<br>• `ppos_telemetry_history`: almacena un máximo de 100 eventos locales de navegación y clics.<br>• `ppos_project_results`: guarda hasta 20 estimaciones de cálculo que el usuario decide conservar localmente.<br>• `ppos_session_id`: identificador de sesión efímero.<br>• **Cero transmisión a endpoints remotos:** La función `persistEvent` escribe únicamente en `localStorage`. Cumple con el consentimiento previo (`hasAnalyticsConsent()`) y purga los datos de inmediato al revocar. | [corporative/lib/telemetry.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/telemetry.ts#L44-L52)<br>[corporative/lib/telemetry.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/telemetry.ts#L92-L104)<br>[corporative/lib/telemetry.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/telemetry.ts#L109-L133) |
| **Formulario de Adhesión / Contacto (`submitPartnerOnboarding`)** | **Procesamiento volátil en memoria del servidor:**<br>Valida con Zod, comprueba honeypot y retraso temporal, asigna un nivel de scoring (`high`, `mid`, `low`), registra un log en consola (`[AUDIT][ONBOARDING]`) y retorna el resultado. **No persiste en base de datos ni envía correos automáticos.** | [corporative/lib/actions.ts](file:///c:/Users/KIKE/Downloads/corporative/lib/actions.ts#L13-L107) |

---

## 2. Cómo se Eliminan los Archivos y qué Sucede con Errores y Copias de Seguridad (Backups)

### 2.1. Mecanismo Real de Eliminación
- **Clase responsable:** `StorageCleanupWorker` ([ppos-preflight-service/services/StorageCleanupWorker.js](file:///c:/Users/KIKE/Downloads/ppos-preflight-service/services/StorageCleanupWorker.js#L10-L60)).
- **Ciclo de ejecución:** Tarea recurrente programada mediante `setInterval` que se ejecuta **cada 1 hora** (`intervalMs = 3600000`), además de una pasada inicial obligatoria al iniciar el servicio.
- **Criterio de selección SQL:**
  ```sql
  SELECT id, tenant_id FROM jobs 
  WHERE status IN ('COMPLETED', 'FAILED') 
  AND created_at < NOW() - INTERVAL 24 HOUR
  ```
- **Procedimiento de purga:**
  1. Invoca `storage.deleteJobStorage(job.tenant_id, job.id)`, ejecutando `fs.remove()` sobre la ruta física completa del trabajo (`/storage/tenants/{tenantId}/jobs/{jobId}`).
  2. Ejecuta `DELETE FROM jobs WHERE id = ?` para suprimir la referencia en MySQL.
- **Conclusión crítica sobre el disparador:** La eliminación **no se activa cuando el usuario descarga el archivo** ni en el instante en que finaliza el análisis. El archivo permanece accesible para descargas durante toda la ventana de 24 horas.

---

### 2.2. Tratamiento de Fallos y Errores Operativos

1. **Trabajos finalizados con error explícito (`status = 'FAILED'`):**
   - El código de `PreflightService.js` marca el trabajo como `FAILED` en la base de datos si ocurre un fallo en el motor o un timeout.
   - Dado que la consulta de limpieza incluye explícitamente `status IN ('COMPLETED', 'FAILED')`, estos trabajos y sus archivos residuales **sí se eliminan automáticamente tras 24 horas**.
2. **Trabajos bloqueados o interrumpidos (`status = 'PROCESSING'` o `'QUEUED'`):**
   - **Brecha de retención detectada:** Si un trabajo queda bloqueado (por ejemplo, por caída del proceso Node.js, reinicio del servidor o fallo de comunicación con Redis/BullMQ), su estado permanece en `PROCESSING` o `QUEUED`.
   - Como la consulta SQL filtra estrictamente por `COMPLETED` o `FAILED`, **los trabajos colgados nunca son seleccionados por el worker de limpieza**, dejando carpetas y archivos huérfanos en disco de forma indefinida hasta su saneamiento manual.
3. **Caídas durante la subida multipart:**
   - Si la conexión del cliente se corta a mitad de la subida antes de completar el registro del trabajo en MySQL, el archivo parcial que haya comenzado a escribirse en disco no tiene fila asociada en la base de datos, por lo que el `StorageCleanupWorker` basado en DB no puede detectarlo.

---

### 2.3. Tratamiento de Copias de Seguridad (Backups)

- **Riesgo crítico de persistencia documental:**
  1. La ruta de almacenamiento temporal `/opt/printprice-os/temp-staging` se encuentra en el disco local del servidor dedicado administrado por Plesk Obsidian en IONOS SE (`212.227.79.67`).
  2. Las herramientas estándar de backup de Plesk y las instantáneas (*snapshots*) de infraestructura realizan copias de seguridad automáticas programadas (diarias o semanales) del sistema de archivos y bases de datos.
  3. **No existe en la configuración del repositorio ninguna directiva o script que excluya `/opt/printprice-os/temp-staging` de las copias de seguridad del servidor.**
  4. En consecuencia, si se ejecuta un backup del servidor durante la ventana de retención de 24 horas de un archivo, **dicho archivo PDF se incorpora al archivo de copia de seguridad del host**, donde permanecerá almacenado durante el periodo de retención de backups del servidor (habitualmente entre 30 y 90 días), invalidando la garantía de borrado a las 24 horas.

---

## 3. Proveedores Externos: Destinatarios, Finalidad y Evaluación de IA

| Proveedor / Destinatario | Ubicación / Entorno | Datos que Recibe | Finalidad Operativa | ¿Interviene en Fix It (Preflight)? | Estado de Garantías y DPA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IONOS SE** | Fráncfort am Main, Alemania (UE).<br>Sede: Montabaur, Alemania. | Tráfico web, direcciones IP, bases de datos MySQL, archivos temporales en disco y registros del sistema. | Alojamiento físico del servidor dedicado / VPS (`212.227.79.67`), panel Plesk Obsidian y ejecución de contenedores. | **SÍ (Alojamiento físico).** Aloja el servidor donde corre el servicio. | **Comprobada IP pública en Alemania.** Contrato formal de hosting con DPA europeo y política de backups clasificada como **[PENDIENTE DE AUDITORÍA CONTRACTUAL]**. |
| **Google LLC (Google Generative AI / Gemini API)** | Servidores de Google (EE. UU. / Global). | Textos de mensajes en lenguaje natural y fragmentos de texto de cotizaciones B2B (`rawTextSnippet`, ofertas). | Inferencia lingüística para el asistente conversacional de calibración de imprentas en Control Plane (`calibrationAssistantService.js`). | **NO.** Fix it no utiliza Google Gemini ni ningún otro modelo de IA. | **[CRÍTICO / PENDIENTE CONTRACTUAL]:** La llamada se realiza vía REST en `aiProviderAdapter.js` (`gemini-3.5-flash`). Si se usa una API Key estándar de AI Studio, los términos del proveedor pueden permitir el uso de datos para mejora del servicio. Se requiere suscribir cuenta corporativa de Google Cloud Vertex AI con cláusula de *Zero Data Retention* y DPA conforme al RGPD. |
| **Cloudflare, Inc.** | Red Anycast Global. | Direcciones IP, cabeceras HTTP y eventos de navegación (si se activa Turnstile o Web Analytics). | Reglas declaradas en la cabecera CSP de `corporative/proxy.ts` (`static.cloudflareinsights.com`, `challenges.cloudflare.com`) para mitigación de bots y analítica de rendimiento. | **NO.** | Autorizado en cabeceras CSP. Pendiente de verificar si la proxyficación DNS o el widget interactivo están desplegados en producción. |
| **Stripe, Inc.** | Irlanda (UE) / EE. UU. | Identificadores de usuario y datos de facturación de suscripciones SaaS B2B. | Cobro de planes mensuales de software para imprentas (Starter, Growth, Enterprise). | **NO.** | Implementado en código (`adminBilling.js`), pero configurado en modo simulado/deshabilitado en staging (`PAYMENT_EXECUTION_ENABLED=false`). |
| **Slack Technologies / Salesforce** | EE. UU. / Global. | Cargas útiles de eventos de plataforma (`webhook_deliveries`). | Notificaciones operativas a canales internos de los talleres configurados por los administradores. | **NO.** | Esquema implementado en migración SQL 159 (`slack_integrations`). Desactivado por defecto. |
| **Imprentas Asociadas de la Red** | Espacio Económico Europeo. | Especificación técnica validada, archivos PDF listos para máquina (`certified.pdf`), datos de envío y facturación del comprador. | Fabricación material de libros y transporte físico al cliente. | **SÍ (Solo pedidos contratados).** Reciben el archivo únicamente si el cliente formaliza la orden de compra. | **Responsables independientes del tratamiento** al perfeccionar el contrato mercantil directo de compraventa con el cliente. |

---

## 4. Afirmaciones Actuales de la Web Corporativa que Necesitan Corregirse

A partir de las discrepancias acreditadas, se detallan las afirmaciones de la web corporativa que resultan inexactas o engañosas y las correcciones de redacción requeridas:

### 4.1. Discrepancia en el Borrado de Archivos de Preflight

- **Ubicación:** `app/products/preflight/page.tsx` (líneas 289, 584, 879) y `app/legal/privacy-policy/page.tsx` (líneas 57, 93, 129).
- **Texto actual publicado:**
  - *Español:* «Borrado automático de archivos temporales tras la generación del informe o descarga del documento corregido.» / «Los archivos PDF cargados temporalmente para comprobaciones de preflight se purgan automáticamente tras concluir el procesamiento operativo.»
  - *Inglés:* «Automatic permanent purge of all files once the report or repaired file is downloaded.» / «Temporary PDF files uploaded for preflight inspection are purged automatically after technical processing.»
  - *Alemán:* «Automatische Löschung aller temporären Dokumente nach Abschluss des Vorgangs oder Ablauf des Download-Tokens.» / «Für reine Preflight-Tests hochgeladene PDF-Dateien werden nach der technischen Analyse automatisch gelöscht.»
- **Causa de inexactitud:** El archivo no se borra al descargar ni al terminar el análisis; permanece almacenado en disco durante un TTL de 24 horas gobernado por `StorageCleanupWorker`.
- **Corrección requerida:**
  - *Español:* «Borrado automático y programado de archivos temporales tras una ventana de retención técnica de 24 horas desde su carga, ejecutado periódicamente por el servicio de saneamiento de almacenamiento.»
  - *Inglés:* «Automated scheduled purge of temporary files following a 24-hour technical retention window from upload, executed periodically by our storage cleanup service.»
  - *Alemán:* «Automatische, planmäßige Löschung temporärer Dateien nach einem technischen Aufbewahrungsfenster von 24 Stunden ab Upload, periodisch ausgeführt durch unseren Speicherbereinigungsdienst.»

---

### 4.2. Discrepancia sobre «Entornos Volátiles»

- **Ubicación:** `app/products/preflight/page.tsx` (líneas 288, 583).
- **Texto actual publicado:**
  - *Español:* «Los archivos subidos se procesan en entornos volátiles y aislados exclusivamente para el análisis y la corrección técnica.»
  - *Inglés:* «Files are processed in isolated, ephemeral environments exclusively for analysis and repair.»
- **Causa de inexactitud:** Los archivos se graban en disco físico persistente (`PPOS_UPLOADS_DIR`), organizados en carpetas jerárquicas con nombres de archivo UUID. No se procesan en memoria RAM pura (*in-memory*) ni en contenedores efímeros sin disco.
- **Corrección requerida:**
  - *Español:* «Los archivos subidos se procesan en espacios de almacenamiento aislados lógicamente por usuario/trabajo exclusivamente para el análisis y la corrección técnica, con supresión programada a las 24 horas.»
  - *Inglés:* «Files are processed in logically isolated storage directories per job/tenant exclusively for analysis and technical correction, with scheduled purge at 24 hours.»
  - *Alemán:* «Hochgeladene Dateien werden in logisch isolierten Speicherverzeichnissen pro Auftrag ausschließlich für die Analyse und technische Korrektur verarbeitet, mit geplanter Löschung nach 24 Stunden.»

---

### 4.3. Discrepancia Técnica sobre «Cifrado TLS 1.3 en el Análisis»

- **Ubicación:** `app/products/preflight/page.tsx` (líneas 291, 586, 881).
- **Texto actual publicado:**
  - *Español:* «Cifrado de extremo a extremo mediante TLS 1.3 tanto en la subida como en el análisis y la descarga.»
  - *Inglés:* «Full TLS 1.3 encryption during upload, processing, and download.»
  - *Alemán:* «Vollständige SSL/TLS-Verschlüsselung während Upload, forensischer Prüfung und Download.»
- **Causa de inexactitud:** TLS 1.3 es un protocolo criptográfico de transporte en red. No existe «cifrado TLS en el análisis local de un archivo en disco». El procesamiento lo ejecutan procesos del servidor local leyendo bloques de disco.
- **Corrección requerida:**
  - *Español:* «Comunicaciones seguras mediante cifrado en tránsito HTTPS (TLS 1.2 / TLS 1.3) tanto en la subida del documento como en la descarga de informes y archivos corregidos.»
  - *Inglés:* «Secure communications via HTTPS encryption in transit (TLS 1.2 / TLS 1.3) during document upload and retrieval of reports and repaired files.»
  - *Alemán:* «Sichere Kommunikation durch HTTPS-Transportverschlüsselung (TLS 1.2 / TLS 1.3) beim Dokumentenupload sowie beim Herunterladen von Berichten und korrigierten Dateien.»

---

### 4.4. Delimitación Rigurosa sobre «No Entrenamiento de Modelos de IA»

- **Ubicación:** `app/products/preflight/page.tsx` (líneas 290, 585, 880) y `app/legal/privacy-policy/page.tsx`.
- **Texto actual publicado:**
  - «Tus archivos nunca se utilizan para entrenar modelos de inteligencia artificial ni se comparten con terceros no autorizados.»
- **Evaluación técnica:**
  - **Para Fix it (Preflight):** Es estrictamente cierto, ya que el motor de preflight es 100% determinista y no utiliza componentes de IA.
  - **Para el ecosistema global de PrintPrice OS:** Para blindar esta afirmación frente a la Ley de IA de la UE (*EU AI Act*) y el RGPD, debe precisarse que Fix It opera con herramientas deterministas locales sin IA, y que las funciones asistidas por IA en el panel de gestión B2B (Control Plane) operan bajo acuerdos empresariales con exclusión expresa de entrenamiento.

---

## 5. Matriz de Pendientes Técnicos y Operativos Concretos

| ID | Asunto | Descripción del Pendiente | Responsable | Impacto en Políticas Legales |
| :---: | :--- | :--- | :--- | :--- |
| **P-01** | **Exclusión de Backups en Plesk** | Configurar en Plesk Obsidian (`212.227.79.67`) una regla estricta de exclusión para que la ruta de almacenamiento temporal `/opt/printprice-os/temp-staging` no sea incluida en las copias de seguridad periódicas del servidor ni en snapshots de disco. | Administrador de Sistemas (SysAdmin) | **Bloquea** garantizar el borrado definitivo en 24 horas sin persistencia residual en copias de respaldo. |
| **P-02** | **Decisión de Arquitectura: TTL 24h vs. Borrado Inmediato** | Decidir formalmente si el producto mantiene la retención técnica de 24 horas (recomendada para permitir al cliente revisar informes y descargar el PDF corregido con calma) o si se implementa un endpoint de borrado bajo demanda / post-descarga. | Propietario de Producto / Lead Architect | Permite fijar el texto legal definitivo sin contradicciones. |
| **P-03** | **Saneamiento de Trabajos Huérfanos en Preflight** | Ampliar la lógica de `StorageCleanupWorker.js` para que busque también directorios huérfanos en disco con fecha de modificación superior a 24 horas y trabajos con estado `PROCESSING` o `QUEUED` estancados más de 24 horas. | Equipo Backend (`ppos-preflight-service`) | Garantiza la eficacia real del borrado ante fallos del servidor. |
| **P-04** | **DPA y Contratación Corporativa con Google Cloud** | Suscribir formalmente una cuenta Google Cloud / Vertex AI para el uso de la API de Gemini en Control Plane, garantizando por contrato la política de *Zero Data Retention* (no uso de prompts para entrenamiento) y la firma del DPA europeo. | Dirección / Asesoría Jurídica | **Bloquea** declarar «cero entrenamiento» en la suite B2B de Control Plane. |
| **P-05** | **Actualización de Textos Públicos en Web Corporativa** | Aplicar las correcciones redactadas en el punto 4 de este documento sobre `app/products/preflight/page.tsx` y `app/legal/privacy-policy/page.tsx` en sus tres idiomas (ES, EN, DE). | Equipo de Frontend (`corporative`) | Elimina el riesgo de publicidad engañosa y falsedad documental frente al RGPD. |
