# LISTA OFICIAL DE SUBENCARGADOS Y PROVEEDORES TECNOLÓGICOS
> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH RECHTLICHER PRÜFUNG  
> **Versión:** 2026.1-draft | **Fecha de emisión:** Octubre 2026

---

### 1. Criterios de Selección y Gobernanza de Terceros
Print Price Pro SIA aplica un estricto principio de necesidad y localización para la contratación de proveedores tecnológicos auxiliares. Solo se incorporan a esta lista aquellas entidades que prestan servicios técnicos activos y necesarios para el funcionamiento de la plataforma:

| Entidad / Proveedor | Servicio Prestado | Tipología de Datos Tratados | Ubicación de Servidores / Datos | Función Jurídica | Mecanismo de Transferencia |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hetzner Online GmbH**<br>(Alemania) | Alojamiento en la nube de servidores de computación, motores de cálculo e imposición de pliegos y preflight determinista. | Archivos PDF temporales, parámetros técnicos de presupuestos, bases de datos operativas y logs técnicos. | **Alemania / Finlandia (Unión Europea)** | Subencargado de infraestructura (Hosting & Compute). | No aplica transferencia fuera del EEE (alojado dentro de la UE). |
| **Amazon Web Services EMEA SARL**<br>(Luxemburgo) | Servicios de redundancia, almacenamiento de copias de seguridad cifradas y distribución de red de entrega de contenidos (CDN). | Copias de seguridad cifradas (AES-256) de bases de datos y assets estáticos de interfaz. | **Frankfurt (Alemania) / Dublín (Irlanda), UE** | Subencargado de almacenamiento y resiliencia. | No aplica transferencia fuera del EEE (confinado en regiones de la UE). Cláusulas Contractuales Tipo (SCC) adicionales de respaldo. |
| **Google Cloud EMEA Limited**<br>(Irlanda) *(Bajo auditoría técnica: NO VERIFICADO)* | Proveedor preliminarmente atribuido al renderizado de maquetas 3D (`mockup.printprice.pro`). | Imagen plana de portada aportada por el usuario y parámetros de perspectiva. | **NO VERIFICADO** (Pendiente de confirmación de región y acuerdos del servicio autónomo `mockup.printprice.pro`). | Proveedor auxiliar bajo auditoría. | **NO VERIFICADO** (Retirada toda garantía pública de región EEE o no entrenamiento hasta verificar documentalmente el backend real del servicio). |
| **Proveedor Transaccional de Correo**<br>(Entidad certificada en la UE) | Envío de notificaciones transaccionales operativas (confirmaciones de pedido, enlaces de verificación de cuenta y avisos de preflight). | Correo electrónico del destinatario, nombre y asunto transaccional del mensaje. | **Unión Europea** | Subencargado de comunicaciones transaccionales. | Confinado en la UE. |

---

### 2. Notificación y Oposición a Nuevos Subencargados
PrintPrice notificará a los usuarios profesionales de Control Plane con un preaviso mínimo de 15 días la incorporación o sustitución de cualquier subencargado de infraestructura crítica, permitiendo a los clientes formular objeciones motivadas por razones legítimas de protección de datos conforme a lo estipulado en el DPA.
