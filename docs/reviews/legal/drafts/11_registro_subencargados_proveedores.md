# REGISTRO PÚBLICO DE SUBENCARGADOS Y PROVEEDORES DE INFRAESTRUCTURA

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Versión:** v2026.1-draft | **Fecha de emisión:** 25 de octubre de 2026  
> **Nota de idioma / Language note / Sprachhinweis:** Este documento está redactado íntegramente en español como borrador de trabajo interno; las cabeceras trilingües indican el estado del ciclo documental y no constituyen traducciones completas en EN o DE.

---

### 1. Objeto y Deber de Transparencia
En cumplimiento del artículo 28, apartados 2 y 4 del Reglamento General de Protección de Datos (RGPD) y del Acuerdo de Encargo de Tratamiento (DPA), Print Price Pro SIA [PENDIENTE DE RATIFICACIÓN REGISTRAL] mantiene a disposición pública el presente registro de los prestadores de servicios que intervienen como subencargados en el tratamiento de datos y en la infraestructura de la plataforma:

| Proveedor / Razón Social | Servicio Prestado | Sede Corporativa | Ubicación de Servidores y Tratamiento | Estado de Evidencia y Mecanismo de Transferencia |
| :--- | :--- | :--- | :--- | :--- |
| **IONOS SE** | Infraestructura de cómputo en nube, servidor dedicado / VPS, almacenamiento de datos y panel de administración Plesk. | Elgendorfer Str. 57, 56410 Montabaur, Alemania. | Centros de datos en Fráncfort am Main (Alemania / Unión Europea, IP 212.227.79.67). | **[VERIFICADO TÉCNICAMENTE PARA LA WEB CORPORATIVA EN PRODUCCIÓN].** Tráfico y alojamiento dentro del EEE. Sujeto directamente al RGPD bajo DPA europeo vinculante. Sin transferencias internacionales detectadas en la web corporativa. |
| **Infraestructura de Correo Electrónico Propia** | Servidores de correo SMTP/IMAP para la recepción y emisión de notificaciones de soporte y pedidos (@printprice.pro). | Operado sobre la infraestructura del servidor dedicado de PrintPrice en IONOS SE. | Fráncfort (Alemania / UE). | **[VERIFICADO EN CONFIGURACIÓN DE SERVIDOR].** Alojado en el servidor dedicado de producción. Sin transferencias internacionales. |
| **Motor de Telemetría Técnica (*First-Party*)** | Sistema interno de analítica técnica de interfaz y latencia de cálculo (almacenamiento en localStorage). | Operado directamente por PrintPrice Pro SIA. | Dispositivo local del usuario / Servidores en Alemania. | **[VERIFICADO TÉCNICAMENTE MEDIANTE AUDITORÍA PLAYWRIGHT].** Sin terceros destinatarios (cero SDKs externos de analítica). Almacenamiento local purgado tras revocación. |
| **Entidades Bancarias del Sistema SEPA / Pasarelas de Pago** | Procesamiento de transferencias y adeudos B2B para la liquidación mensual de la comisión del 4 % de imprentas. | Entidades financieras reguladas en la Unión Europea. | Espacio Económico Europeo. | **[PROPUESTA SUJETA A CONTRATACIÓN Y DEFINICIÓN OPERATIVA].** Operaciones bancarias intracomunitarias reguladas por el marco de pagos de la UE (PSD2 / SEPA). Pendiente de formalizar contrato de pasarela o cuenta bancaria corporativa. |
| **Microservicios Satélite de Cálculo / Inferencia Externa (si aplican)** | Servicios satélite adicionales de imposición gráfica avanzada o prototipo de agente inteligente. | Proveedores dentro del EEE o conformes con marco de adecuación UE. | Unión Europea (propuesta). | **[PENDIENTE DE CONTRATACIÓN Y DEFINICIÓN OPERATIVA].** Ningún proveedor de IA o cálculo externo está autorizado para tratar datos personales ni para entrenar modelos sin DPA previo suscrito. |

---

### 2. Notificación y Procedimiento de Oposición a Nuevos Subencargados
2.1. [PROPUESTA CONTRACTUAL SUJETA A APROBACIÓN] PrintPrice notificará a los clientes registrados cualquier incorporación o sustitución prevista de un subencargado con una antelación mínima de **quince (15) días naturales** antes de que dicho proveedor inicie el acceso a datos.  
2.2. [PROPUESTA CONTRACTUAL SUJETA A APROBACIÓN] Los clientes que dispongan de un DPA suscrito con PrintPrice podrán formular objeciones motivadas por escrito a privacy@printprice.pro dentro de dicho plazo. Si las partes no alcanzan un acuerdo técnico, el cliente podrá rescindir los servicios afectados sin penalización.
