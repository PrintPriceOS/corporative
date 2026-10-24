# Matriz Contractual y Modelo de Negocio por Flujo Operativo
## PrintPrice Pro — Asignación de Roles, Facturación, Cobro y Responsabilidades

**Fecha:** 24 de octubre de 2026  
**Entidad Operadora:** Print Price Pro SIA (Reg. 40203631570, Letonia)

---

### 1. Los Seis Flujos Operativos del Ecosistema

| Parámetro | 1. Uso de PRICE IT | 2. Uso de FIX IT | 3. Uso de Mockup | 4. Compra en PRINT IT (Marketplace) | 5. Clientes Propios de Imprenta | 6. Aprovisionamiento de Papel |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Descripción del Flujo** | Estimación y cálculo de costes de libro y packaging. | Auditoría y verificación determinista de archivos PDF. | Generación de vistas 3D de cubierta para marketing. | Encargo de fabricación de libros a través del marketplace. | Gestión interna de presupuestos y pedidos propios de taller. | Conexión de catálogo maestro y solicitudes de cotización (RFQ). |
| **Quién presta el servicio digital** | Print Price Pro SIA. | Print Price Pro SIA. | Print Price Pro SIA. | Print Price Pro SIA (servicio de plataforma/matchmaking). | Print Price Pro SIA (proveedor SaaS de consola técnica). | Print Price Pro SIA (plataforma de federación de catálogo). |
| **Quién vende el producto final** | N/A (servicio de cálculo informativo). | N/A (servicio de software técnico). | N/A (servicio visual complementario). | **La Imprenta Seleccionada** (obra física impresa). | **La Imprenta** (sus propios productos a sus clientes). | **El Distribuidor/Fabricante de Papel** (materia prima). |
| **Quién contrata con el usuario** | Print Price Pro SIA (términos de uso de software). | Print Price Pro SIA (términos de servicio técnico). | Print Price Pro SIA (términos de servicio visual). | **El Comprador con la Imprenta** (contrato de obra) y con PrintPrice (términos de plataforma). | La Imprenta con su cliente final (relación directa privada). | La Imprenta con el Proveedor de Papel (compraventa mercantil). |
| **Quién factura al usuario/cliente** | Print Price Pro SIA (cuando apliquen tarifas aprobadas). | Print Price Pro SIA (cuando apliquen créditos/suscripción aprobados). | Print Price Pro SIA (cuando apliquen cuotas aprobadas). | **La Imprenta** factura el total de la producción y transporte convenido al cliente. | **La Imprenta** factura directamente a su cliente. | **El Proveedor de Papel** factura directamente a la Imprenta. |
| **Quién cobra al usuario/cliente** | Print Price Pro SIA. | Print Price Pro SIA. | Print Price Pro SIA. | **La Imprenta cobra directamente al cliente** (mediante sus pasarelas o medios autorizados). | **La Imprenta cobra a su cliente.** | **El Proveedor de Papel cobra a la Imprenta.** |
| **Relación de cobro de PrintPrice** | Acceso base directo sin compromisos fijos no aprobados. | Tarifas por consumo técnico (pendientes de aprobación comercial). | Función complementaria. | **PrintPrice factura mensualmente una comisión del 4 %** a la imprenta sobre la base neta cobrada. | Tarifa SaaS de Control Plane (pendiente de aprobación comercial). | Tarifa de catálogo/federación (no aplica automáticamente el 4 %). |
| **Quién fabrica o suministra** | N/A (proceso computacional). | N/A (procesamiento forense de software). | N/A (renderizado digital). | **La Imprenta Seleccionada** en sus instalaciones productivas. | **La Imprenta.** | **El Proveedor de Papel.** |
| **Quién atiende reclamaciones de producto** | PrintPrice (sobre cálculo o disponibilidad técnica). | PrintPrice (sobre reporte técnico de preflight). | PrintPrice (sobre render de previsualización). | **La Imprenta**, como fabricante directo y vendedor de la obra física. | **La Imprenta.** | **El Proveedor de Papel.** |
| **Quién atiende reclamaciones de plataforma** | PrintPrice Pro SIA. | PrintPrice Pro SIA. | PrintPrice Pro SIA. | PrintPrice Pro SIA (funcionamiento del portal, matching y registros). | PrintPrice Pro SIA (soporte de software y uptime de consola). | PrintPrice Pro SIA (disponibilidad técnica del catálogo federado). |
| **Datos que se comparten** | Parámetros de libro (páginas, tintas, papel, encuadernación), IP y telemetría anónima. | Archivo PDF del usuario, metadatos, fuentes incrustadas, perfiles ICC e informe de errores. | Imagen de cubierta aportada, geometría de lomo, parámetros de perspectiva. | Especificaciones del pedido, datos de contacto del cliente, dirección de entrega y PDF aprobado a la imprenta adjudicataria. | Datos gestionados exclusivamente bajo la cuenta aislada de la imprenta (PrintPrice actúa como encargado del tratamiento — DPA). | Fichas técnicas de sustratos, tarifas por volumen, zonas de transporte y consultas RFQ entre imprenta y proveedor. |
| **Con quién se comparten los datos** | Servidores de cálculo en la UE. | Motor de preflight determinista en la UE. | Motor de visualización (subencargado Google Cloud / Gemini Vertex AI en la UE). | Con la **Imprenta asignada** para fabricar y remitir el encargo. | Quedan confinados en el tenant aislado de la imprenta. | Entre la imprenta que solicita cotización y el distribuidor que responde. |

---

### 2. Principios Contractuales Invariantes

1. **La Imprenta como Fabricante y Vendedor en PRINT IT:**
   PrintPrice Pro no asume la posición jurídica de fabricante ni de vendedor final de la obra física impresa. La imprenta es el comerciante que asume las obligaciones de fabricación conforme al pedido, entrega, garantía legal y gestión de incidencias de producción.
2. **Facturación y Devengo de la Comisión del 4 %:**
   - La comisión de PrintPrice se devenga exclusivamente cuando el pedido tramitado a través del marketplace ha sido formalizado y cobrado por la imprenta.
   - La base de cálculo de la comisión es el **importe neto de fabricación cobrado** (excluyendo IVA y portes logísticos desglosados).
   - PrintPrice emite mensualmente a cada imprenta asociada una factura comprensiva con el desglose detallado de pedidos transaccionados.
3. **Aprovisionamiento de Papel:**
   - El 4 % de comisión del marketplace de impresión **no se aplica automáticamente al aprovisionamiento de papel**. Cualquier régimen económico para Paper Suppliers requerirá una decisión comercial aprobada de forma expresa y separada.
4. **Clientes Propios de Taller en Control Plane:**
   - Cuando una imprenta introduce y gestiona a sus propios clientes en Control Plane, dichos clientes no provienen del marketplace de PrintPrice. Por tanto, no devengan la comisión del 4 % de intermediación comercial. La relación entre PrintPrice y la imprenta en este caso es estrictamente de proveedor tecnológico de software B2B (encargado del tratamiento conforme al RGPD).
