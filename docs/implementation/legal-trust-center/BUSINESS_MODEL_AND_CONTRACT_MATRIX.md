# Matriz Contractual y Modelo de Negocio por Flujo Operativo
## PrintPrice Pro — Asignación de Roles, Facturación, Cobro y Responsabilidades

**Fecha de Actualización:** 24 de octubre de 2026  
**Entidad Operadora:** Print Price Pro SIA (Reg. 40203631570, Rīga, Letonia)  
**Estado:** Documento de Trabajo Interno y Especificación de Flujos

---

### 1. Los Seis Flujos Operativos del Ecosistema

| Parámetro | 1. PRICE IT | 2. FIX IT | 3. Mockup 3D | 4. PRINT IT (Marketplace) | 5. Clientes Propios de Taller | 6. Aprovisionamiento de Papel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Descripción** | Estimación algorítmica de costes de libros y packaging. | Verificación forense y diagnóstico de archivos PDF. | Generación de perspectivas 3D de cubierta para marketing. | Enrutamiento de pedidos a imprentas de la red. | Gestión de clientes y órdenes propias del taller en Control Plane. | Conexión técnica de catálogo maestro de papel y consultas RFQ. |
| **Prestador digital** | Print Price Pro SIA | Print Price Pro SIA | Print Price Pro SIA | Print Price Pro SIA (plataforma de software y matchmaking) | Print Price Pro SIA (software SaaS B2B) | Print Price Pro SIA (plataforma técnica de catálogo) |
| **Vendedor de la obra/producto** | N/A (cálculo informativo) | N/A (software técnico) | N/A (asistencia visual) | **La Imprenta Seleccionada** (fabricante y vendedora mercantil directa) | **La Imprenta** (sus propios productos) | **El Distribuidor de Papel** (sustrato material) |
| **Quién contrata con el cliente** | PrintPrice (uso de software) | PrintPrice (servicio técnico) | PrintPrice (servicio de visualización) | **El Cliente con la Imprenta** (contrato de obra) y con PrintPrice (términos de plataforma) | La Imprenta con su cliente final | La Imprenta con el Proveedor de Papel |
| **Facturación al cliente final** | N/A (acceso libre / SaaS) | N/A (en definición) | N/A | **La Imprenta factura directamente al cliente** por la fabricación | **La Imprenta** factura directamente a su cliente | **El Proveedor de Papel** factura a la Imprenta |
| **Cobro al cliente final** | N/A | N/A | N/A | **La Imprenta cobra directamente al cliente** mediante sus pasarelas o medios autorizados | **La Imprenta cobra a su cliente** | **El Proveedor de Papel cobra a la Imprenta** |
| **Régimen económico de PrintPrice** | Sin cuotas fijas aprobadas | Modelo de créditos en definición comercial | Función complementaria | **Comisión comercial confirmada del 4 %** facturada mensualmente a la imprenta | Tarifa SaaS de consola técnica (pendiente de aprobación comercial) | **PENDIENTE DE DEFINICIÓN COMERCIAL** (no se asume compromiso de 0 %) |
| **Responsabilidad de producto** | PrintPrice (cálculo de software) | PrintPrice (criterios de preflight) | PrintPrice (fidelidad del render) | **La Imprenta**, como fabricante industrial y vendedora directa | **La Imprenta** | **El Proveedor de Papel** |
| **Responsabilidad de plataforma** | PrintPrice Pro SIA | PrintPrice Pro SIA | PrintPrice Pro SIA | PrintPrice Pro SIA (uptime, algoritmos, mediación técnica) | PrintPrice Pro SIA (uptime de consola, soporte B2B) | PrintPrice Pro SIA (disponibilidad técnica del catálogo) |
| **Destinatarios de datos** | Servidores en la UE | Motor de preflight en la UE | Módulo de maquetas | Con la **Imprenta asignada** para cotizar y fabricar el pedido | Tenant aislado de la imprenta | Entre la imprenta y el distribuidor de papel consultado |

---

### 2. Decisiones Comerciales Confirmadas vs. Puntos Pendientes

#### A. Decisiones Comerciales Confirmadas por la Dirección
1. **Comisión del 4 % en PRINT IT:** Se establece una comisión del 4 % para las transacciones originadas a través del marketplace de producción gráfica.
2. **Cobro Directo por la Imprenta:** La imprenta asociada factura y cobra el 100 % del encargo directamente al cliente. PrintPrice Pro no actúa como cobrador ni revendedor material.
3. **Facturación Mensual de Comisiones:** PrintPrice Pro consolida y factura periódicamente de forma mensual sus comisiones a las imprentas registradas.
4. **Eliminación Total de Períodos de Prueba (Trials):** No existen pruebas gratuitas de 14 ni 21 días en ninguna superficie comercial o de producto.

#### B. Elementos Comerciales Pendientes de Definición
1. **Base Exacta de Cálculo de la Comisión:** Pendiente de definir si la base imponible del 4 % incluye o excluye costes de embalaje, portes logísticos desglosados y suplementos específicos.
2. **Régimen Fiscal y de Divisas:** Reglas de IVA intracomunitario (operador letón B2B con inversión de sujeto pasivo vs. operaciones locales letonas) y tratamiento de divisas fuera de la zona euro.
3. **Devoluciones, Cancelaciones y Ajustes:** Mecanismo de regularización o abono de la comisión ante rescisiones justificadas o reembolsos entre imprenta y cliente.
4. **Tarifas y Régimen de Papel:** **Eliminado cualquier compromiso de «0 % comisión en papel».** El modelo económico para distribuidores en Paper Supplier Hub (comisiones por transacción, tarifas por referencia activa o gratuidad) está **pendiente de definición por el liderazgo comercial**.
5. **Suscripciones de Software y Créditos:** Definición pendiente de cuotas de acceso a Control Plane para carteras de clientes propios de taller y tarificación por lotes de créditos en FIX IT (Preflight).

---

### 3. Delimitación Jurídica por Tipología de Usuario y Contrato

#### A. Autores Particulares vs. Operadores Económicos (B2B)
- **No clasificación automática:** Un autor puede actuar como **consumidor** (persona física que encarga ejemplares para uso personal sin actividad mercantil) o como **profesional / autoeditor** (actividad económica, fiscalmente dado de alta, venta comercial de ejemplares).
- **Excepción Legal de Desistimiento (Art. 16.c Directiva 2011/83/UE):** En obras físicas confeccionadas conforme a las especificaciones técnicas del cliente o claramente personalizadas (impresión bajo demanda de libros), la ley excluye el derecho de desistimiento de 14 días una vez iniciada la producción. **Dicha excepción legal no limita ni perjudica en ningún caso las acciones legales del consumidor por faltas de conformidad, defectos industriales de encuadernación o incumplimientos del taller.**
- **Diferenciación de Servicios y Contenidos Digitales:** Las herramientas SaaS (preflight online) y los activos digitales (maquetas o informes descargables) se rigen por las reglas específicas de servicios y contenido digital de la Directiva de Derechos de los Consumidores (consentimiento previo para ejecución inmediata y pérdida del derecho de desistimiento tras la completa ejecución).

#### B. Acuerdos de Tratamiento de Datos (DPA / Art. 28 RGPD)
- **Cuándo Aplica Obligatoriamente:** Cuando PrintPrice Pro o una imprenta actúe como *encargado del tratamiento* procesando datos personales por cuenta y bajo instrucciones documentadas de un cliente responsable (por ejemplo, cuando una editorial facilita bases de datos de destinatarios para envíos individualizados o una imprenta aloja su cartera de clientes en Control Plane).
- **Cuándo NO se Impone Indiscriminadamente:** Cuando la imprenta concierta la compraventa mercantil directa con el comprador y emite su propia factura, actúa como **responsable independiente del tratamiento** para sus obligaciones contables, fiscales y de expedición física.

#### C. Preaviso y Normativa P2B (Reglamento UE 2019/1150)
- **Plazo Estándar de 15 Días:** Cualquier modificación sustancial de las condiciones aplicables a las imprentas o proveedores profesionales en la plataforma requerirá un preaviso mínimo de 15 días en un soporte duradero.
- **Plazos Mayores:** Se concederán plazos razonablemente más amplios cuando los cambios exijan adaptaciones técnicas complejas en los sistemas de las imprentas.
- **Excepciones Legales al Preaviso:** No será preceptivo el preaviso de 15 días cuando la modificación obedezca a una obligación legal o regulatoria de obligado cumplimiento inmediato, o para afrontar riesgos imprevistos e inminentes de ciberseguridad, fraude o malware.

#### D. Terminología: Retirada de «Taller Homologado»
- Al no existir en la actualidad un proceso formal acreditado de homologación o certificación industrial de terceros, se prohíbe el término «taller homologado». Se utilizarán denominaciones precisas: **«imprenta asociada»**, **«taller de la red»** o **«partner de producción»**.
