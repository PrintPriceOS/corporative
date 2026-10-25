# Registro Consolidado de Decisiones y Verificaciones Pendientes (Decisions Required)

**Fecha de consolidación:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Propósito:** Matriz unificada y priorizada para la toma de decisiones por parte del propietario de la plataforma, el equipo técnico y la asesoría jurídica.  

---

### Principio Rector de Gobernanza Comercial y Técnica
En el estado actual del proyecto, se mantiene como **ÚNICAMENTE CONFIRMADO**:
1. **Comisión del 4 % en el marketplace** abonada por la imprenta a PrintPrice.
2. **Cobro directo de la imprenta al cliente final** (PrintPrice no custodia fondos de fabricación).
3. **Facturación mensual posterior de la comisión** emitida por PrintPrice al taller.

**Todo lo demás constituye una PROPUESTA NO APROBADA o un DATO PENDIENTE DE VERIFICACIÓN.** Ningún borrador presenta la gratuidad de herramientas, la cuota de papeleras, la base imponible sobre portes, el hito de devengo, las notas de crédito, los SLA o las tolerancias como condiciones vigentes.

---

## 1. Tabla Breve Consolidada de Pendientes para Decidir

| Categoría | Asunto / Propuesta No Aprobada | Resumen de la Cuestión | Documentos Afectados | ¿Bloquea Publicación de Borradores? |
| :--- | :--- | :--- | :--- | :--- |
| **Decisión Comercial (Propietario)** | **Base imponible de la comisión** | Decidir si el 4 % aplica solo sobre producción industrial o sobre el total con transporte (excluyendo IVA). | `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md` | No para borrador; **SÍ para contrato de imprentas**. |
| **Decisión Comercial (Propietario)** | **Momento de devengo de comisión** | Decidir si se devenga al aceptar la orden técnica en taller o tras la entrega de la mercancía. | `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md` | No para borrador; **SÍ para liquidación mensual**. |
| **Decisión Comercial (Propietario)** | **Cancelaciones, mermas e impagos** | Establecer si PrintPrice emite abono de comisión en ciclo posterior si se cancela antes de máquinas. | `03_condiciones_autores_particulares.md`, `05_condiciones_adhesion_imprentas.md` | No para borrador; **SÍ para transacciones reales**. |
| **Decisión Comercial (Propietario)** | **Modelo SaaS independiente / API** | Definir si se mantiene el cálculo web corporativo libre y se tarifica por volumen en API REST. | `01_aviso_legal.md`, `02_terminos_generales_uso.md`, `04_condiciones_editoriales_profesionales.md` | No bloquea publicación. |
| **Decisión Comercial (Propietario)** | **Monetización de papeleras (Paper Hub)** | Decidir entre cuota anual de suscripción técnica (propuesta recomendada) o comisión por volumen. | `06_condiciones_proveedores_papel.md` | No bloquea publicación. |
| **Decisión Comercial (Propietario)** | **Objetivo de SLA (99,5 % API)** | Decidir si se ofrece meta comercial de disponibilidad del 99,5 % para editoriales o si se omite. | `04_condiciones_editoriales_profesionales.md` | No bloquea publicación. |
| **Dato Operativo (Equipo Técnico)** | **Ciclo de vida de archivos de preflight** | Acreditar técnicamente: servicio responsable, almacenamiento, disparador, mecanismo de purga, fallos y backups. | `02_terminos_generales_uso.md`, `07_politica_privacidad.md`, `10_acuerdo_encargo_tratamiento_dpa.md` | **SÍ bloquea declarar plazos de retención o purga**. |
| **Dato Operativo (Equipo Técnico)** | **Infraestructura, backups y transferencias** | Auditar contrato con IONOS SE, almacenamiento secundario de copias de seguridad y accesos remotos de soporte. | `07_politica_privacidad.md`, `11_registro_subencargados_proveedores.md` | No para web actual; **SÍ para declarar ausencia total de transferencias**. |
| **Dato Operativo (Equipo Técnico)** | **Pasarelas de cobro y correo** | Formalizar cuenta bancaria corporativa para adeudos SEPA e inventariar servidores SMTP/IMAP. | `05_condiciones_adhesion_imprentas.md`, `11_registro_subencargados_proveedores.md` | No para borrador; **SÍ para cobros B2B**. |
| **Dato Operativo (Equipo Técnico)** | **Tolerancias de taller (±1,5 mm / ±3–5%)** | Recabar especificaciones técnicas reales de maquinaria de los primeros talleres asociados adscritos. | `03_condiciones_autores_particulares.md`, `04_condiciones_editoriales_profesionales.md` | No bloquea publicación. |
| **Cuestión Jurídica (Asesoría Legal)** | **Ratificación de Print Price Pro SIA** | Cotejo documental ordinario de razón social, Reg. No. 40203631570 y VAT ID en *Uzņēmumu reģistrs* y VIES. | `01_aviso_legal.md`, `07_politica_privacidad.md` | **SÍ bloquea la publicación del Aviso Legal definitivo**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Excepción de desistimiento B2C** | Validar la exclusión de desistimiento (Art. 16.c Directiva 2011/83/UE) para libros personalizados impresos. | `03_condiciones_autores_particulares.md` | **SÍ bloquea cobros a autores particulares**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Umbrales y reporte fiscal DAC7** | Determinar si aplica exclusión por volumen o si la plataforma debe implementar reporte periódico ante VID. | `05_condiciones_adhesion_imprentas.md` | No para borrador; **SÍ antes de superar umbrales**. |
| **Cuestión Jurídica (Asesoría Legal)** | **Necesidad formal de DPO (Art. 37 RGPD)** | Confirmar que por dimensión y naturaleza de tratamiento técnico no procede DPO universal obligatorio. | `01_aviso_legal.md`, `07_politica_privacidad.md` | No bloquea publicación. |
| **Cuestión Jurídica (Asesoría Legal)** | **Encuadre regulatorio bajo el AI Act** | Confirmar calificación de riesgo mínimo para preflight/cálculo y exclusión del render WebGL de maquetas. | `09_politica_transparencia_ia.md` | No bloquea publicación. |

---

## 2. Decisiones Comerciales Pendientes (Propietario)

### 2.1. Base Imponible de la Comisión del 4 % en Marketplace (Transporte e Impuestos)
- **Propuesta:** Liquidar el 4 % sobre el importe neto total facturado por la imprenta al cliente que comprende producción industrial y transporte, excluyendo estrictamente el IVA.
- **Motivo:** El transporte forma parte indisociable de la transacción gestionada en el marketplace; auditar separadamente portes frente a fabricación en cada albarán introduce fricciones contables desproporcionadas. El IVA se excluye por ser impuesto indirecto repercutido.
- **Documentos afectados:** `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea publicación de borradores?:** **No bloquea borradores; SÍ bloquea la firma del contrato de adhesión de talleres**.

### 2.2. Momento Exacto de Devengo de la Comisión de Marketplace
- **Propuesta:** Considerar devengada la comisión en el momento en que la imprenta valida técnicamente los archivos (preflight aprobado) y acepta la orden de trabajo para entrar a máquina.
- **Motivo:** Si se devenga al aceptar el presupuesto, cualquier cancelación técnica previa generaría disputas de facturación; si se pospone hasta la entrega física, PrintPrice asumiría indebidamente el riesgo operacional del transportista ajeno a la plataforma de software.
- **Documentos afectados:** `02_terminos_generales_uso.md`, `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea publicación de borradores?:** **No bloquea borradores; SÍ bloquea la liquidación contable mensual**.

### 2.3. Tratamiento de Cancelaciones, Defectos de Calidad e Impagos
- **Propuesta:** Emisión de nota de crédito / abono de la comisión en el siguiente ciclo mensual si la imprenta acredita fehacientemente la cancelación total o el reembolso al cliente antes de entrar en máquinas. Los defectos de impresión, mermas o acabados defectuosos son responsabilidad exclusiva del taller impresor.
- **Motivo:** Preserva la equidad contractual con las imprentas asociadas sin trasladar a PrintPrice el riesgo comercial o la garantía industrial de fabricación física.
- **Documentos afectados:** `03_condiciones_autores_particulares.md`, `04_condiciones_editoriales_profesionales.md`, `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea publicación de borradores?:** **No bloquea borradores; SÍ bloquea la apertura de transacciones reales**.

### 2.4. Modelo de Tarifas para Servicios SaaS Independientes (Standalone)
- **Propuesta:** Libre acceso gratuito a la herramienta web de cálculo (Price it) y validación básica de preflight (Fix it) para usuarios corporativos; tarificación por volumen exclusivamente en integraciones de API REST / ERP industrial.
- **Motivo:** Maximiza la captación y recurrencia técnica sin contradecir la eliminación de la prueba gratuita de 14 días.
- **Documentos afectados:** `01_aviso_legal.md`, `02_terminos_generales_uso.md`, `04_condiciones_editoriales_profesionales.md`.
- **¿Bloquea publicación de borradores?:** **No bloquea publicación**.

### 2.5. Modelo de Monetización con Fabricantes y Distribuidores de Papel (Paper Hub)
- **Propuesta:** Suscripción fija anual de presencia en el catálogo técnico de papeles y perfiles ICC para imprentas, sin comisión porcentual sobre la venta física de bobinas o palés.
- **Motivo:** La distribución de papel opera con márgenes industriales reducidos (2–5 %) y créditos comerciales a 90 días, incompatibles con una comisión del 4 %.
- **Documentos afectados:** `06_condiciones_proveedores_papel.md`.
- **¿Bloquea publicación de borradores?:** **No bloquea publicación**.

### 2.6. Objetivo de Disponibilidad (SLA) para Clientes de API
- **Propuesta:** Meta comercial de disponibilidad técnica mensual del 99,5 % sin penalización financiera directa, excluyendo paradas programadas.
- **Motivo:** Establecer una referencia de calidad de servicio para grandes editoriales sin incurrir en obligaciones indemnizatorias desproporcionadas en fase inicial.
- **Documentos afectados:** `04_condiciones_editoriales_profesionales.md`.
- **¿Bloquea publicación de borradores?:** **No bloquea publicación**.

---

## 3. Datos Operativos por Verificar (Equipo Técnico)

### 3.1. Verificación Técnica del Ciclo de Vida de Archivos de Preflight
- **Estado:** **[PENDIENTE DE VERIFICACIÓN TÉCNICA DEL CICLO DE VIDA DE ARCHIVOS]**.
- **Criterio rector:** No se elige entre eliminación inmediata y retención de 24–72 horas sin evidencia técnica en servidor. Las menciones en la interfaz pública (`app/products/preflight/page.tsx` y `app/legal/privacy-policy/page.tsx`) son informativas y no constituyen prueba de ejecución.
- **Evidencia requerida:**
  1. *Servicio responsable:* Identificar el microservicio o script backend que procesa y elimina el archivo.
  2. *Almacenamiento:* Detallar la ruta en sistema de archivos, volumen temporal o bucket de almacenamiento.
  3. *Mecanismo de limpieza:* Documentar si opera mediante script cron, proceso worker asíncrono o recolector en memoria.
  4. *Disparador:* Acreditar si la purga se dispara por evento de descarga, timeout de sesión o TTL programado.
  5. *Tratamiento de fallos:* Protocolo de reintentos, alertas o borrado forzado si el proceso se interrumpe.
  6. *Copias de seguridad:* Comprobar si los directorios temporales de preflight se excluyen formalmente de las copias de seguridad del servidor.
- **Documentos afectados:** `02_terminos_generales_uso.md`, `07_politica_privacidad.md`, `10_acuerdo_encargo_tratamiento_dpa.md`.
- **¿Bloquea publicación de borradores?:** **SÍ bloquea prometer plazos de retención o purga sin respaldo técnico**.

### 3.2. Auditoría de Infraestructura, Copias de Seguridad y Transferencias
- **Estado:** Comprobada la resolución de red de la web corporativa hacia la IP `212.227.79.67` (IONOS SE, Fráncfort, Alemania).
- **Criterio rector:** No deducir «cero transferencias» de una dirección IP, geolocalización o capturas de red del navegador del cliente.
- **Evidencia requerida:**
  1. Contrato formal de hosting con DPA europeo vinculante suscrito con IONOS SE.
  2. Configuración de copias de seguridad remotas (ubicación geográfica del servidor de backup y cifrado en reposo).
  3. Inventario de accesos de soporte administrativo (SSH / Plesk) y herramientas de telemetría de servidor.
- **Documentos afectados:** `07_politica_privacidad.md`, `11_registro_subencargados_proveedores.md`.
- **¿Bloquea publicación de borradores?:** No para la web actual; **SÍ para declarar ausencia total de transferencias en producción**.

### 3.3. Pasarelas de Pago y Configuración de Servidores de Correo
- **Estado:** **[PENDIENTE DE CONTRATACIÓN Y DEFINICIÓN OPERATIVA]**.
- **Evidencia requerida:** Contrato de pasarela de pago bancaria o cuenta SEPA B2B para la emisión y cobro de recibos mensuales a talleres; inventario de configuración de puertos y autenticación SPF/DKIM/DMARC del servidor SMTP/IMAP propio en Alemania.
- **Documentos afectados:** `05_condiciones_adhesion_imprentas.md`, `11_registro_subencargados_proveedores.md`.
- **¿Bloquea publicación de borradores?:** No para borradores; **SÍ para activar cobros B2B reales**.

### 3.4. Tolerancias Industriales Mecánicas (Corte ±1,5 mm y Merma ±3–5%)
- **Estado:** **[PROPUESTAS OPERATIVAS NO APROBADAS - SUJETAS A ESPECIFICACIONES DE TALLER]**.
- **Evidencia requerida:** Recabar las especificaciones técnicas particulares de los talleres que se adhieran al marketplace para contrastar si las tolerancias mecánicas de ±1,5 mm y sobreproducción de ±3–5 % concuerdan con sus condiciones reales de taller.
- **Documentos afectados:** `03_condiciones_autores_particulares.md`, `04_condiciones_editoriales_profesionales.md`.
- **¿Bloquea publicación de borradores?:** No bloquea publicación.

---

## 4. Cuestiones para Asesoría Jurídica

### 4.1. Ratificación Registral y Fiscal de Print Price Pro SIA
- **Propuesta:** Cotejo documental ordinario de los datos societarios (Reg. No. 40203631570, NIF-IVA LV40203631570 y domicilio en Bruņinieku iela 60-8, Rīga) contra el Registro de Empresas de Letonia (*Uzņēmumu reģistrs*) y en la base VIES de la Comisión Europea.
- **Criterio rector:** No se exige formalismo notarial extraordinario ni innecesario, sino la comprobación administrativa pública ordinaria.
- **Documentos afectados:** `01_aviso_legal.md`, `07_politica_privacidad.md`.
- **¿Bloquea publicación de borradores?:** **SÍ bloquea la publicación del Aviso Legal vinculante en producción**.

### 4.2. Delimitación del Desistimiento en Contratos B2C con Autores Particulares
- **Propuesta:** Validar el redactado de la excepción al derecho de desistimiento conforme al Art. 16.c de la Directiva 2011/83/UE (bienes confeccionados conforme a especificaciones del consumidor para libros impresos a medida) y la renuncia previa expresa para servicios digitales de análisis inmediato.
- **Motivo:** Proteger a la plataforma y a las imprentas de cancelaciones improcedentes una vez que los pliegos han entrado en máquina o el informe técnico ha sido generado.
- **Documentos afectados:** `03_condiciones_autores_particulares.md`.
- **¿Bloquea publicación de borradores?:** **SÍ bloquea la activación de cobros B2C en producción**.

### 4.3. Aplicabilidad y Umbrales de Reporte Fiscal DAC7 (Directiva UE 2021/514)
- **Propuesta:** Dictaminar si PrintPrice califica como operador de plataforma sujeto a comunicación obligatoria anual de ventas de talleres ante la administración tributaria letona (*VID*), o si concurre exclusión por volumen (menos de 30 operaciones o menos de 2.000 € anuales por taller exento).
- **Motivo:** Evitar sanciones tributarias graves por incumplimiento de obligaciones de información transfronteriza de plataformas de comercio electrónico.
- **Documentos afectados:** `05_condiciones_adhesion_imprentas.md`.
- **¿Bloquea publicación de borradores?:** No bloquea borradores; debe quedar resuelto antes de que los talleres alcancen umbrales comerciales.

### 4.4. Necesidad de Designación Formal de Delegado de Protección de Datos (DPO)
- **Propuesta:** Consultar a la asesoría jurídica si concurren las circunstancias del Art. 37.1 del RGPD. Al ser una pyme de software técnico gráfico que no realiza observación sistemática a gran escala ni trata categorías especiales de datos (Arts. 9 y 10 RGPD), el análisis preliminar indica que **no es universalmente obligatorio**, bastando designar un responsable interno de privacidad a través de `privacy@printprice.pro`.
- **Motivo:** Evitar la imposición de figuras organizativas complejas que la normativa no exige a esta escala empresarial.
- **Documentos afectados:** `01_aviso_legal.md`, `07_politica_privacidad.md`.
- **¿Bloquea publicación de borradores?:** No bloquea publicación.

### 4.5. Alcance y Transparencia bajo el Reglamento Europeo de IA (AI Act - Reglamento UE 2024/1689)
- **Propuesta:** Confirmar que los motores de presupuestación, imposición y preflight son sistemas deterministas (riesgo mínimo) fuera de los requisitos de alto riesgo del AI Act, que el renderizado 3D de maquetas es puramente gráfico local WebGL (sin componente generativo), y que las obligaciones del Art. 50 (transparencia de interacción) aplican estrictamente a interfaces interactivas de agentes virtuales (como `/ai-agent`).
- **Motivo:** Evitar calificaciones erróneas de "IA híbrida" que susciten cargas regulatorias injustificadas sobre software algorítmico tradicional.
- **Documentos afectados:** `09_politica_transparencia_ia.md`.
- **¿Bloquea publicación de borradores?:** No bloquea publicación.
