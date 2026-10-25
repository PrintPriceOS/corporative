# Registro Consolidado de Decisiones y Verificaciones Pendientes (Decisions Required)

**Fecha de consolidación:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Propósito:** Matriz unificada y priorizada para la toma de decisiones por parte del propietario de la plataforma, el equipo técnico y la asesoría jurídica.  

---

### Principio Rector de Gobernanza Comercial y Técnica

A fecha 25 de octubre de 2026, el **propietario de la plataforma ha aprobado formalmente las siguientes decisiones comerciales** para el marketplace:

1. **Base imponible de la comisión del 4 %:** Se fija estrictamente en el **4 % sobre el importe neto de impresión y acabados**, excluyendo expresamente impuestos y costes de transporte debidamente desglosados.
2. **Generación sobre cobros efectivos y facturación mensual posterior:** La comisión se genera sobre los **importes efectivamente cobrados por la imprenta**, procediendo PrintPrice a su facturación mensual posterior agrupada. En supuestos de **cobros parciales**, la comisión aplica exclusivamente sobre la parte cobrada que corresponda a los conceptos sujetos a comisión (impresión y acabados).
3. **Tratamiento de devoluciones:** **No se devenga ni cobra comisión sobre importes devueltos al cliente.** En caso de haberse facturado previamente la comisión, se practicará el ajuste corrector (abono/nota de crédito) en la liquidación mensual inmediatamente posterior.
4. **Tratamiento de impagos y cobros pendientes:** **No se cobra comisión sobre cantidades no efectivamente cobradas.** Si posteriormente se cobran, generarán la comisión correspondiente en el ciclo mensual aplicable.
5. **Obligación de registro y conciliación por la imprenta:** Dado que la imprenta factura y cobra directamente al cliente, la imprenta asume la obligación de registrar verazmente en la plataforma todos los cobros y devoluciones vinculados a cada pedido para hacer posible la conciliación mensual.  
   *(Aviso técnico de rigor: El mecanismo específico y panel para este registro y conciliación en el Control Plane consta como **[PENDIENTE DE DEFINICIÓN TÉCNICA E IMPLEMENTACIÓN EN CONTROL PLANE; NO PRESENTAR COMO FUNCIONALIDAD YA IMPLEMENTADA]**).*

**Distinción entre comisión comercial e impuestos propios de PrintPrice:**  
La base comercial del 4 % se calcula sobre importes netos de fabricación cobrados. Los impuestos que correspondan a la factura emitida por PrintPrice a la imprenta por los servicios de intermediación/software (como el IVA según el régimen fiscal letono, intracomunitario o nacional que resulte aplicable) se liquidarán adicionalmente con arreglo a la normativa tributaria vigente en el momento de facturación, sin alterar la base comercial neta.

**Todo lo demás constituye una PROPUESTA NO APROBADA o un DATO PENDIENTE DE VERIFICACIÓN.** Ningún borrador presenta la gratuidad definitiva de herramientas, la suscripción de papeleras, los SLA de API o las tolerancias como condiciones vigentes.

---

## 1. Ejemplos Numéricos de Liquidación Comercial Aprobada

A efectos de coherencia contractual y contable en todos los borradores, rigen los siguientes ejemplos ilustrativos:

- **Ejemplo 1 (Pedido estándar con desglose completo):**  
  - Concepto impresión y acabados: 1.000 € netos.  
  - Concepto transporte desglosado: 100 € netos.  
  - Impuestos: Separados según tipo aplicable al cliente.  
  - **Liquidación al cobrar la producción íntegra:** Base comisionable = 1.000 € (el transporte de 100 € y los impuestos quedan excluidos). Comisión devengada a favor de PrintPrice = **40 €** (4 % de 1.000 €).

- **Ejemplo 2 (Cobro parcial de producción):**  
  - Se formaliza un pedido con 1.000 € netos de impresión y acabados.  
  - La imprenta percibe un cobro a cuenta del 50 % de la producción (500 € netos correspondientes a impresión y acabados).  
  - **Liquidación mensual:** Base comisionable devengada = 500 €. Comisión facturada por PrintPrice = **20 €** (4 % de 500 €). El 50 % restante devengará su comisión únicamente si y cuando la imprenta efectúe el cobro.

- **Ejemplo 3 (Devolución sobre producción previamente comisionada):**  
  - Sobre un pedido de 1.000 € cuya producción ya fue cobrada y cuya comisión de 40 € ya fue facturada en el mes anterior, la imprenta efectúa una devolución al cliente de 200 € netos por defecto de encuadernación.  
  - **Ajuste en la siguiente liquidación:** Base de ajuste = 200 € devueltos. Ajuste de comisión a favor de la imprenta = **−8 €** (4 % de 200 €), reduciendo el saldo a abonar en la factura mensual siguiente.

---

## 2. Tabla Consolidada de Decisiones y Pendientes

| Categoría | Asunto / Propuesta | Resumen del Estado y Cuestión | Documentos Afectados | ¿Bloquea su Revisión Interna? |
| :--- | :--- | :--- | :--- | :--- |
| **Decisión Comercial (Aprobada Propietario 25/10/2026)** | **Base de comisión del 4 %** | 4 % sobre neto de impresión y acabados, excluyendo transporte desglosado e impuestos. | `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md` | **No bloquea su revisión interna** (aprobada). |
| **Decisión Comercial (Aprobada Propietario 25/10/2026)** | **Devengo sobre cobros efectivos** | Comisión generada sobre cobro real. En cobro parcial, aplica a la parte proporcional cobrada sujeta. | `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md` | **No bloquea su revisión interna** (aprobada). |
| **Decisión Comercial (Aprobada Propietario 25/10/2026)** | **Exclusión de devoluciones e impagos** | Cero comisión sobre importes devueltos o impagados; ajuste en ciclo posterior si ya se facturó. | `03_condiciones_autores_particulares.md`, `05_condiciones_adhesion_imprentas.md` | **No bloquea su revisión interna** (aprobada). |
| **Dato Operativo (Equipo Técnico)** | **Detalles operativos de comisiones** | Pendiente definir: documentación justificativa, conciliación, día de emisión/cierre, vencimiento y no desglosados. | `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md` | **No bloquea su revisión interna**; bloquea cobro efectivo. |
| **Decisión Comercial (Pendiente Propietario)** | **Modelo web vs API REST** | Decidir si se mantiene cálculo web libre y se tarifica por volumen en API REST empresarial. | `01_aviso_legal.md`, `02_terminos_generales_uso.md`, `04_condiciones_editoriales_profesionales.md` | **No bloquea su revisión interna**. |
| **Decisión Comercial (Pendiente Propietario)** | **Monetización de papeleras (Paper Hub)** | Decidir entre cuota anual de suscripción técnica por catálogo o comisión porcentual sobre volumen. | `06_condiciones_proveedores_papel.md` | **No bloquea su revisión interna**. |
| **Decisión Comercial (Pendiente Propietario)** | **Objetivo de SLA (99,5 % API)** | Decidir si se ofrece meta comercial de disponibilidad del 99,5 % para editoriales o si se omite. | `04_condiciones_editoriales_profesionales.md` | **No bloquea su revisión interna**. |
| **Dato Operativo (Verificado Técnicamente 25/10/2026)** | **Ciclo de vida de archivos de preflight** | **[CÓDIGO OBSERVADO]:** Retención temporal en disco local (`PPOS_UPLOADS_DIR`) con purga periódica horaria por `StorageCleanupWorker` para estados `COMPLETED`/`FAILED` según `created_at < NOW() - 24h`. La descarga no borra el archivo. Pendiente auditar backups en Plesk y evaluar propuestas de borrado post-descarga y saneamiento de trabajos bloqueados. | `02_terminos_generales_uso.md`, `07_politica_privacidad.md`, `10_acuerdo_encargo_tratamiento_dpa.md` | **Desbloqueado para redacción técnica veraz**; SÍ bloquea asegurar ausencia en backups. |

---

### 6.1. Verificación Técnica del Ciclo de Vida de Archivos de Preflight
- **Estado:** **[CÓDIGO OBSERVADO EN REPOSITORIO] (25/10/2026)**. Auditoría técnica documentada en `AUDIT_FILE_PROCESSING_AND_PROVIDERS.md`.
- **Hechos verificados en código:**
  1. *Servicio responsable:* `ppos-preflight-service` (`server.js`, `routes/preflight.js`, `services/PreflightService.js`).
  2. *Almacenamiento:* Sistema de archivos en disco local configurado por `PPOS_UPLOADS_DIR` (por defecto `temp-staging` o ruta de host), organizado jerárquicamente por inquilino y trabajo (`/storage/tenants/{tenantId}/jobs/{jobId}/[input|output|temp|reports|previews]`).
  3. *Mecanismo de limpieza:* Worker recurrente `StorageCleanupWorker` (`services/StorageCleanupWorker.js`), ejecutado cada 1 hora (`intervalMs = 3600000`).
  4. *Criterio SQL literal:* `SELECT id, tenant_id FROM jobs WHERE status IN ('COMPLETED', 'FAILED') AND created_at < NOW() - INTERVAL 24 HOUR`. El cómputo toma como referencia `created_at` (inicio de carga), no el fin del procesamiento. La descarga del archivo o la generación del reporte **no disparan el borrado**.
  5. *Manejo de errores y estados:* Los trabajos en `COMPLETED` y `FAILED` son seleccionados en el bucle y purgados mediante `deleteJobStorage(tenantId, jobId)` y borrado en BD. Los trabajos que queden bloqueados en `PROCESSING` o `QUEUED` no entran en la consulta SQL actual.
  6. *Copias de seguridad:* **[PENDIENTE DE AUDITORÍA OPERATIVA EN SERVIDOR]:** Se desconoce si la herramienta de backup de Plesk Obsidian o snapshots de IONOS SE excluyen la ruta de almacenamiento temporal de preflight.
- **Decisiones y acciones pendientes:**
  1. *Decisión de Producto:* Evaluar si se mantiene el modelo actual de purga periódica horaria o si se requiere un mecanismo de borrado bajo demanda / post-descarga.
  2. *Propuesta Técnica (No Aprobada):* Evaluar la propuesta de saneamiento automático para trabajos estancados en `PROCESSING`/`QUEUED` tras un plazo prudencial (p. ej., 48 horas).
  3. *Auditoría de Sistemas:* Verificar en Plesk Obsidian y el hipervisor de IONOS SE el alcance y programación de backups respecto a `/opt/printprice-os/temp-staging`.
  4. *Revisión Documental Frontend:* Mantener preparadas las redacciones trilingües revisadas para `app/products/preflight/page.tsx` y `app/legal/privacy-policy/page.tsx` para su eventual incorporación cuando se apruebe la modificación de la web pública.
- **Documentos afectados:** `02_terminos_generales_uso.md`, `07_politica_privacidad.md`, `10_acuerdo_encargo_tratamiento_dpa.md`.
- **¿Bloquea su revisión interna?:** **Desbloqueado para redacción técnica veraz**; SÍ bloquea asegurar ausencia en backups.
| **Dato Operativo (Equipo Técnico)** | **Infraestructura, backups y transferencias** | Auditar contrato con IONOS SE, almacenamiento secundario de backups y accesos remotos de soporte. | `07_politica_privacidad.md`, `11_registro_subencargados_proveedores.md` | **No bloquea su revisión interna**; SÍ transferencias cero. |
| **Dato Operativo (Equipo Técnico)** | **Pasarelas de cobro y correo** | Formalizar cuenta corporativa para SEPA B2B e inventariar servidores SMTP/IMAP (@printprice.pro). | `05_condiciones_adhesion_imprentas.md`, `11_registro_subencargados_proveedores.md` | **No bloquea su revisión interna**; SÍ cobros B2B reales. |
| **Dato Operativo (Equipo Técnico)** | **Tolerancias de taller (±1,5 mm / ±3–5%)** | Recabar especificaciones técnicas reales de maquinaria de los primeros talleres asociados adscritos. | `03_condiciones_autores_particulares.md`, `04_condiciones_editoriales_profesionales.md` | **No bloquea su revisión interna**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Ratificación de Print Price Pro SIA** | Comprobación registral ordinaria de razón social, Reg. No. 40203631570 y VAT ID en *Uzņēmumu reģistrs* y VIES. | `01_aviso_legal.md`, `07_politica_privacidad.md` | **SÍ bloquea la publicación del Aviso Legal definitivo**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Excepción de desistimiento B2C** | Análisis de aplicabilidad del Art. 16.c Directiva 2011/83/UE y fórmula de renuncia previa en pedidos a medida. | `03_condiciones_autores_particulares.md` | **SÍ bloquea cobros a autores particulares**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Umbrales y reporte fiscal DAC7** | Consulta neutral sobre aplicabilidad, umbrales de exención y obligaciones formales ante la *VID* letona. | `05_condiciones_adhesion_imprentas.md` | **No bloquea su revisión interna**; SÍ antes de umbrales. |
| **Cuestión Jurídica (Asesoría Legal)** | **Designación de DPO (Art. 37 RGPD)** | Consulta neutral sobre obligatoriedad o idoneidad de nombramiento formal de DPO frente a contacto interno. | `01_aviso_legal.md`, `07_politica_privacidad.md` | **No bloquea su revisión interna**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Clasificación bajo el AI Act** | Consulta neutral sobre calificación regulatoria y deberes de transparencia bajo el Reglamento (UE) 2024/1689. | `09_politica_transparencia_ia.md` | **No bloquea su revisión interna**. |

---

## 3. Decisiones Comerciales Aprobadas por el Propietario (25/10/2026)

### 3.1. Base Imponible de la Comisión de Marketplace (4 %)
- **Estado:** **APROBADO POR EL PROPIETARIO (25/10/2026)**.
- **Alcance:** La comisión del 4 % aplica estrictamente sobre el importe neto cobrado por los conceptos de **impresión y acabados**. Se excluyen de forma expresa los costes de transporte debidamente desglosados y cualesquiera impuestos repercutidos al cliente final.
- **Documentos actualizados:** `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea su revisión interna?:** No bloquea su revisión interna.

### 3.2. Devengo sobre Cobros Efectivos y Cobros Parciales
- **Estado:** **APROBADO POR EL PROPIETARIO (25/10/2026)**.
- **Alcance:** La comisión no se genera al presupuestar ni al aceptar la orden técnica, sino en función de los importes efectivamente cobrados por la imprenta. En cobros parciales (p. ej. anticipos o hitos), la comisión del 4 % se devenga exclusivamente sobre la fracción cobrada que corresponda a los conceptos sujetos a comisión.
- **Documentos actualizados:** `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea su revisión interna?:** No bloquea su revisión interna.

### 3.3. Régimen de Devoluciones e Impagados
- **Estado:** **APROBADO POR EL PROPIETARIO (25/10/2026)**.
- **Alcance:** 
  - **Devoluciones:** No se cobra comisión sobre importes devueltos al comprador. Si la comisión ya fue incluida en una liquidación mensual anterior, se practicará el ajuste proporcional correspondiente (abono/nota de crédito) en la liquidación inmediatamente posterior.
  - **Impagos y cobros pendientes:** No se cobra comisión sobre cantidades no efectivamente cobradas. Si posteriormente se cobran, generarán la comisión correspondiente en el ciclo mensual aplicable.
- **Documentos actualizados:** `03_condiciones_autores_particulares.md`, `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea su revisión interna?:** No bloquea su revisión interna.

---

## 4. Detalles Operativos Pendientes de Definición (Equipo Técnico / Operaciones)

A pesar de la aprobación de los principios comerciales anteriores, constan como **pendientes de definición operativa** los siguientes aspectos antes de la ejecución real:

1. **Documentación justificativa:** Definir los requisitos de soporte documental exigibles a las imprentas para acreditar devoluciones, cobros parciales o impagos (p. ej., facturas rectificativas, justificantes de transferencia bancaria de devolución o comunicaciones fehacientes de mora).
2. **Mecanismo técnico de registro y conciliación en Control Plane:** Diseñar y desarrollar en el panel de taller el flujo para que la imprenta declare los cobros efectivos y devoluciones por cada pedido, así como el protocolo de cotejo periódico frente a las órdenes de marketplace. *(No presentar como funcionalidad ya implementada)*.
3. **Día de emisión/cierre y vencimiento de la factura mensual:** Fijar el día exacto de emisión/cierre del ciclo mensual de facturación de PrintPrice, así como el plazo de vencimiento exigible para el pago de dicha factura (p. ej., a 15, 30 días naturales desde emisión o mediante cargo recurrente SEPA B2B).
4. **Tratamiento de conceptos no desglosados:** Establecer la regla de liquidación aplicable si una imprenta emite un pedido o factura global sin desglose explícito de los costes de transporte respecto a la producción.

---

## 5. Decisiones Comerciales Pendientes del Propietario

### 5.1. Modelo de Tarifas para Servicios SaaS Independientes (Standalone)
- **Propuesta:** Libre acceso de uso al cálculo web (Price it) y validación básica (Fix it) para captación técnica; tarificación por volumen exclusivamente en integraciones de API REST / ERP industrial.
- **Estado:** **[PROPUESTA PENDIENTE DE DECISIÓN DEL PROPIETARIO]**. No se introducen promesas de gratuidad definitiva ni suscripciones vigentes.
- **Documentos afectados:** `01_aviso_legal.md`, `02_terminos_generales_uso.md`, `04_condiciones_editoriales_profesionales.md`.
- **¿Bloquea su revisión interna?:** No bloquea su revisión interna.

### 5.2. Modelo de Monetización con Fabricantes y Distribuidores de Papel (Paper Hub)
- **Propuesta:** Suscripción fija anual por gama de papel/perfiles ICC homologados frente a comisión porcentual sobre venta de bobinas/palés.
- **Estado:** **[PROPUESTA PENDIENTE DE DECISIÓN DEL PROPIETARIO]**.
- **Documentos afectados:** `06_condiciones_proveedores_papel.md`.
- **¿Bloquea su revisión interna?:** No bloquea su revisión interna.

### 5.3. Objetivo de Disponibilidad (SLA) para Clientes de API
- **Propuesta:** Meta técnica comercial del 99,5 % mensual para clientes API empresariales sin penalización indemnizatoria directa.
- **Estado:** **[PROPUESTA PENDIENTE DE DEFINICIÓN TÉCNICA Y COMERCIAL]**.
- **Documentos afectados:** `04_condiciones_editoriales_profesionales.md`.
- **¿Bloquea su revisión interna?:** No bloquea su revisión interna.

---

## 6. Datos Operativos por Verificar (Equipo Técnico)

### 6.1. Verificación Técnica del Ciclo de Vida de Archivos de Preflight
- **Estado:** **VERIFICADO EN CÓDIGO (25/10/2026)**. Auditoría técnica completa documentada en `AUDIT_FILE_PROCESSING_AND_PROVIDERS.md`.
- **Hechos verificados en código y configuración:**
  1. *Servicio responsable:* `ppos-preflight-service` (`server.js`, `routes/preflight.js`, `services/PreflightService.js`).
  2. *Almacenamiento:* Sistema de archivos en disco local configurado por `PPOS_UPLOADS_DIR` (por defecto `/opt/printprice-os/temp-staging`), organizado jerárquicamente por inquilino y trabajo (`/storage/tenants/{tenantId}/jobs/{jobId}/[input|output|temp|reports|previews]`).
  3. *Mecanismo de limpieza:* Worker asíncrono recurrente `StorageCleanupWorker` (`services/StorageCleanupWorker.js`), ejecutado cada 1 hora (`intervalMs = 3600000`).
  4. *Disparador y TTL:* **Temporal de 24 horas** (`created_at < NOW() - INTERVAL 24 HOUR`) para trabajos con estado `COMPLETED` o `FAILED`. La descarga del archivo o la generación del reporte **no disparan el borrado**.
  5. *Tratamiento de fallos:* Trabajos en `FAILED` se purgan a las 24 horas. Trabajos colgados en `PROCESSING` o `QUEUED` requieren ampliación del worker para evitar archivos huérfanos.
  6. *Copias de seguridad:* **Riesgo no resuelto:** La ruta `/opt/printprice-os/temp-staging` no está explícitamente excluida en las directivas de backup de Plesk Obsidian, pudiendo incorporarse a los respaldos del servidor.
- **Decisiones y acciones pendientes:**
  1. *Decisión de Producto:* Confirmar si se mantiene la retención técnica de 24 horas (recomendada para experiencia de usuario y re-descargas) o si se desarrolla una purga inmediata post-descarga.
  2. *Acción de Sistemas:* Excluir `/opt/printprice-os/temp-staging` en la configuración de backups de Plesk.
  3. *Acción de Frontend:* Actualizar los textos públicos en `app/products/preflight/page.tsx` y `app/legal/privacy-policy/page.tsx` para corregir las afirmaciones de borrado inmediato tras descarga y «entornos volátiles».
- **Documentos afectados:** `02_terminos_generales_uso.md`, `07_politica_privacidad.md`, `10_acuerdo_encargo_tratamiento_dpa.md`.
- **¿Bloquea su revisión interna?:** **Desbloqueado para redacción técnica veraz**; SÍ bloquea asegurar ausencia en backups.

### 6.2. Auditoría de Infraestructura, Copias de Seguridad y Transferencias
- **Estado:** Comprobada la resolución de red de la web corporativa hacia la IP `212.227.79.67` (IONOS SE, Fráncfort, Alemania).
- **Criterio rector:** No deducir «cero transferencias» de una dirección IP, geolocalización o capturas de red del navegador del cliente.
- **Evidencia requerida:**
  1. Contrato formal de hosting con DPA europeo vinculante suscrito con IONOS SE.
  2. Configuración de copias de seguridad remotas (ubicación geográfica del servidor de backup y cifrado en reposo).
  3. Inventario de accesos de soporte administrativo (SSH / Plesk) y herramientas de telemetría de servidor.
- **Documentos afectados:** `07_politica_privacidad.md`, `11_registro_subencargados_proveedores.md`.
- **¿Bloquea su revisión interna?:** **No bloquea su revisión interna**; SÍ bloquea declarar ausencia total de transferencias en producción.

### 6.3. Pasarelas de Pago y Configuración de Servidores de Correo
- **Estado:** **[PENDIENTE DE CONTRATACIÓN Y DEFINICIÓN OPERATIVA]**.
- **Evidencia requerida:** Contrato de pasarela de pago bancaria o cuenta SEPA B2B para la emisión y cobro de recibos mensuales a talleres; inventario de configuración de puertos y autenticación SPF/DKIM/DMARC del servidor SMTP/IMAP propio en Alemania.
- **Documentos afectados:** `05_condiciones_adhesion_imprentas.md`, `11_registro_subencargados_proveedores.md`.
- **¿Bloquea su revisión interna?:** **No bloquea su revisión interna**; SÍ para activar cobros B2B reales.

### 6.4. Tolerancias Industriales Mecánicas (Corte ±1,5 mm y Merma ±3–5%)
- **Estado:** **[PROPUESTAS OPERATIVAS NO APROBADAS - SUJETAS A ESPECIFICACIONES DE TALLER]**.
- **Evidencia requerida:** Recabar las especificaciones técnicas particulares de los talleres que se adhieran al marketplace para contrastar si las tolerancias mecánicas de ±1,5 mm y sobreproducción de ±3–5 % concuerdan con sus condiciones reales de taller.
- **Documentos afectados:** `03_condiciones_autores_particulares.md`, `04_condiciones_editoriales_profesionales.md`.
- **¿Bloquea su revisión interna?:** **No bloquea su revisión interna**.

---

## 7. Cuestiones para Asesoría Jurídica (Formulación Neutral)

Las siguientes cuestiones deben ser sometidas a criterio de la asesoría jurídica de forma neutral, sin prejuzgar ni anticipar conclusiones normativas:

### 7.1. Ratificación Registral y Fiscal de Print Price Pro SIA
- **Cuestión:** Realizar el cotejo administrativo de los datos mercantiles y societarios de la entidad (denominación Print Price Pro SIA, número de registro 40203631570, VAT ID LV40203631570 y domicilio en Bruņinieku iela 60-8, Rīga) ante el Registro de Empresas de la República de Letonia (*Latvijas Republikas Uzņēmumu reģistrs*) y el censo VIES de operadores intracomunitarios.
- **Documentos afectados:** `01_aviso_legal.md`, `07_politica_privacidad.md`.
- **¿Bloquea su revisión interna?:** **SÍ bloquea la publicación del Aviso Legal vinculante en producción**.

### 7.2. Delimitación del Derecho de Desistimiento en Contratos B2C (Autores Particulares)
- **Cuestión:** Examinar la aplicabilidad y redactado de la excepción al derecho de desistimiento regulada en el artículo 16, letra c) de la Directiva 2011/83/UE para la producción de libros a medida de autores independientes, así como la validez del mecanismo de consentimiento previo expreso y renuncia al inicio de la impresión física.
- **Documentos afectados:** `03_condiciones_autores_particulares.md`.
- **¿Bloquea su revisión interna?:** **SÍ bloquea la activación de cobros a consumidores particulares en producción**.

### 7.3. Aplicabilidad y Umbrales de Reporte Fiscal DAC7 (Directiva UE 2021/514)
- **Cuestión:** Solicitar criterio jurídico sobre el encuadre de la plataforma como operador sujeto a las obligaciones de comunicación de datos de vendedores a la administración tributaria letona (*Valsts ieņēmumu dienests* — VID) bajo la transposición de la Directiva DAC7, verificando los umbrales de exención por volumen o número de transacciones y el calendario exigible.
- **Documentos afectados:** `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea su revisión interna?:** **No bloquea su revisión interna**; debe resolverse con anterioridad a que los talleres asociados alcancen los umbrales de actividad comercial.

### 7.4. Necesidad de Designación Formal de Delegado de Protección de Datos (DPO)
- **Cuestión:** Solicitar dictamen jurídico sobre si, conforme al artículo 37 del RGPD y a la legislación letona de protección de datos personales (*Fizisko personu datu apstrādes likums*), la empresa está legalmente obligada a designar formalmente un Delegado de Protección de Datos (DPO) ante la autoridad de control (*Datu valsts inspekcija* — DVI), o si resulta jurídicamente adecuado mantener la figura de un responsable interno de privacidad con buzón de contacto específico (`privacy@printprice.pro`).
- **Documentos afectados:** `01_aviso_legal.md`, `07_politica_privacidad.md`.
- **¿Bloquea su revisión interna?:** **No bloquea su revisión interna**.

### 7.5. Clasificación y Obligaciones bajo el Reglamento Europeo de IA (AI Act - Reglamento UE 2024/1689)
- **Cuestión:** Solicitar análisis jurídico sobre la calificación regulatoria que corresponde atribuir a las diferentes herramientas de software de la plataforma (motores deterministas de cálculo de costes, algoritmos de preflight, renderizador gráfico 3D en cliente WebGL y posibles asistentes conversacionales) a la luz de las definiciones del AI Act, determinando las obligaciones de transparencia (como el Art. 50), catalogación o gobernanza técnica que en su caso resulten aplicables.
- **Documentos afectados:** `09_politica_transparencia_ia.md`.
- **¿Bloquea su revisión interna?:** **No bloquea su revisión interna**.
