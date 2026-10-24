# Auditoría Legal y de Incoherencias Previas
## PrintPrice Pro — Diagnóstico de Textos Históricos y Correcciones Aplicadas

**Fecha de Auditoría:** 24 de octubre de 2026  
**Auditor Técnico:** Antigravity Engineering Agent  
**Entorno Analizado:** Repositorio corporativo `printprice-pro-corporate`

---

### 1. Hallazgos Principales y Contradicciones Detectadas

#### A. Contradicción en el Flujo de Pagos y Facturación
- **Texto previo en borradores antiguos:** Algunos textos en inglés sugerían que el cliente pagaba la totalidad del encargo a PrintPrice Pro y que PrintPrice liquidaba posteriormente a la imprenta deduciendo comisiones, o bien que PrintPrice garantizaba contracargos bancarios.
- **Realidad operativa y decisión comercial confirmada:**
  - **La imprenta vende y cobra directamente al comprador.** El contrato de compraventa y fabricación de la obra física se perfecciona entre el cliente (autor, particular, editorial) y la imprenta seleccionada.
  - PrintPrice actúa exclusivamente como plataforma de intermediación técnica, cálculo y agregación.
  - PrintPrice **no retiene los fondos del cliente ni actúa como entidad de pago** con escrow de custodia general.
  - PrintPrice liquida mensualmente una **comisión del 4 %** por los servicios de marketplace sobre la base neta de producción cobrada por el taller.
- **Acción correctora:** Se eliminaron todas las cláusulas que asumían cobro centralizado o asunción de contracargos de imprenta. Se redactó la matriz de flujos aclarando quién vende, factura y cobra en cada escenario.

#### B. Menciones a Pruebas Gratuitas (14 días / 21 días)
- **Texto previo:** Vestigios en borradores de marketing y contratos antiguos mencionaban «14-day free trial» y en una sección secundaria «21-day evaluation period».
- **Decisión comercial:** No existe prueba gratuita de 14 ni de 21 días. El acceso al cálculo básico es libre o tarifado según el producto, pero no existe una modalidad de suscripción de prueba con cómputo de días.
- **Acción correctora:** Se eliminaron todas las ocurrencias en código, textos y documentación.

#### C. Sellos Ficticios y Garantías Absolutas
- **Texto previo:** Se utilizaban expresiones en banners técnicos y pies de página como:
  - `REGULATORY DOCUMENT / v1.1 HARDENED`
  - `SOC-2 COMPLIANT`
  - `EEA CERTIFIED`
  - `YOUR PRODUCTION CANNOT FAIL`
  - `DOCUMENT AUTHENTICITY SECURED`
- **Diagnóstico normativo:** Estas afirmaciones inducen a error al usuario según la normativa de prácticas comerciales desleales y protección al consumidor (Directiva 2005/29/CE, transpuesta en Letonia por la Ley de Protección de los Derechos de los Consumidores — Patērētāju tiesību aizsardzības likums).
- **Acción correctora:** Supresión absoluta de distintivos o sellos no acreditados. Sustitución por menciones técnicas veraces y verificables: «Alojamiento en la Unión Europea», «Diseñado bajo principios del RGPD», «Validación determinista según normas ISO».

#### D. Plataforma ODR de la Unión Europea
- **Texto previo:** Cláusulas antiguas de resolución de litigios remitían a la plataforma ODR de la Comisión Europea (`ec.europa.eu/consumers/odr`).
- **Situación legal vigente:** La Comisión Europea ha dejado de mantener activa la plataforma ODR para nuevos procedimientos en 2026, promoviendo la mediación extrajudicial directa y las autoridades nacionales de consumo (en Letonia: *Patērētāju tiesību aizsardzības centrs* — PTAC).
- **Acción correctora:** Supresión del enlace obsoleto a la plataforma ODR y mención directa a los mecanismos reconocidos de mediación extrajudicial y al PTAC para consumidores.

#### E. Jurisdicción y Protección de Consumidores
- **Texto previo:** Los términos antiguos imponían una cláusula de sumisión expresa y exclusiva a los tribunales de Riga (Letonia) para cualquier usuario, incluidos consumidores y autores independientes de otros Estados miembros.
- **Infracción jurídica:** Conforme al Reglamento Bruselas I bis (Reglamento UE 1215/2012, artículos 17 a 19), las cláusulas que obligan a un consumidor a litigar en el domicilio del profesional antes de surgir el litigio son nulas de pleno derecho por abusivas.
- **Acción correctora:** Se separaron las condiciones para profesionales (B2B: sumisión a los juzgados de Riga, Letonia) de las condiciones para particulares y autores independientes (B2C: reconocimiento expreso del fuero del domicilio del consumidor conforme a la legislación aplicable).

---

### 2. Tabla Comparativa de Declaraciones

| Elemento Auditado | Redacción Previa | Estado | Redacción Corregida |
| :--- | :--- | :--- | :--- |
| **Prueba gratuita** | «14-day free trial on all plans» | Inexacto / No aprobado | Eliminado por completo. Sin períodos ficticios. |
| **Cobro de pedidos** | «PrintPrice collects payment and remits to printer» | Contradictorio con modelo comercial | «La imprenta cobra directamente al cliente; PrintPrice factura mensualmente su comisión del 4 %». |
| **Comisión Marketplace** | Términos desfasados con porcentajes no fijados | Obsoleto | Comisión del 4 % sobre base neta de producción cobrada en pedidos de marketplace. |
| **Calificación del Preflight** | «Universal print certification guaranteed» | Promesa absoluta desproporcionada | «Validación determinista según perfil técnico de taller; no sustituye la aprobación física final de producción». |
| **Maqueta 3D (Mockup)** | Presentada como simulación de acabado idéntico | Riesgo de inducir a error | «Previsualización comercial digital; no constituye prueba contractual de color ni muestra física de sustrato». |
| **Certificaciones** | «SOC-2 COMPLIANT • EEA CERTIFIED» | Sellos ficticios | Sustituido por descripción objetiva de infraestructura alojada en la UE y cumplimiento normativo contrastable. |
