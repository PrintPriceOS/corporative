# REGISTRO PÚBLICO DE SUBENCARGADOS Y PROVEEDORES DE INFRAESTRUCTURA

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Versión:** v2026.1-draft | **Fecha de emisión:** 25 de octubre de 2026  
> **Nota de idioma / Language note / Sprachhinweis:** Este documento está redactado íntegramente en español como borrador de trabajo interno; las cabeceras trilingües indican el estado del ciclo documental y no constituyen traducciones completas en EN o DE.

---

### 1. Objeto y Desglose de Infraestructura
En cumplimiento del artículo 28, apartados 2 y 4 del Reglamento General de Protección de Datos (RGPD) y del Acuerdo de Encargo de Tratamiento (DPA), Print Price Pro SIA [PENDIENTE DE RATIFICACIÓN REGISTRAL] mantiene el presente inventario estructurado, separando estrictamente proveedor de alojamiento, servicios externos y accesos de soporte:

#### 1.1. Proveedor y Ubicación del Alojamiento
| Proveedor / Razón Social | Servicio Prestado | Sede Corporativa | Ubicación de Servidores | Estado de Evidencia y Garantía de Transferencia |
| :--- | :--- | :--- | :--- | :--- |
| **IONOS SE** | Infraestructura de servidor dedicado / VPS, almacenamiento de datos y panel de administración Plesk. | Elgendorfer Str. 57, 56410 Montabaur, Alemania. | Alojamiento en Alemania (IP pública `212.227.79.67`). Ubicación concreta en centro de datos de Fráncfort am Main clasificada como **[PENDIENTE DE EVIDENCIA CONTRACTUAL U OPERATIVA]**. | **Comprobada resolución de red de la web corporativa a IP en Alemania.**<br>**[PENDIENTE DE AUDITORÍA CONTRACTUAL Y DE CONFIGURACIÓN]:** Contrato formal de hosting con DPA europeo vinculante y políticas de copias de seguridad.<br>*Aviso metodológico:* No se deduce «cero transferencias» únicamente de una IP o captura de navegador; la garantía integral de ausencia de transferencias internacionales en soporte o backups queda **[PENDIENTE DE INVENTARIO TÉCNICO Y DPA]**. |

#### 1.2. Servicios Externos y Destinatarios
| Servicio / Destinatario | Función Operativa | Ubicación / Entorno | Estado de Evidencia |
| :--- | :--- | :--- | :--- |
| **Google LLC / Google Ireland Limited** (Google Gemini Developer API) | Asistente de lenguaje natural para calibración y optimización de matrices de cálculo en el Control Plane B2B (`calibrationAssistantService.js`). | Servidores de Google (EE. UU. / Global). | **[CÓDIGO OBSERVADO EN B2B]:** Consume `gemini-3.5-flash` mediante adaptador backend conectando a `generativelanguage.googleapis.com`. El Preflight de Fix It **no** utiliza este servicio. **Condición jurídica obligatoria:** Formalización de DPA europeo y evaluación de condiciones contractuales de retención y no entrenamiento previo a su explotación comercial. |
| **Cloudflare, Inc.** | Protección perimetral y cabeceras de seguridad CSP en web corporativa. | Red perimetral global. | **[CÓDIGO OBSERVADO EN CSP]:** Reglas CSP configuradas en `proxy.ts`. El componente de onboarding incluye un elemento visual placeholder de Turnstile sin integración activa.<br>**[PENDIENTE DE CORRECCIÓN EN FRONTEND]:** Retirar indicador decorativo «Cloudflare Turnstile Verified» en `PartnerOnboardingFlow.tsx` al no existir verificación funcional que justifique mostrarlo. |
| **Stripe, Inc.** | Pasarela de cobro y gestión de suscripciones SaaS B2B en Control Plane (`adminBilling.js`). | EE. UU. / UE. | **[CÓDIGO OBSERVADO EN B2B]:** Integración implementada en backend en modo fail-closed (desactivada si faltan claves de producción). Sujeta a contratación formal antes del lanzamiento comercial. |
| **Servicio de Correo Corporativo** | Recepción y emisión de notificaciones de soporte y pedidos (@printprice.pro). | Servidor dedicado propio en Alemania / UE. | **[VERIFICADO EN CONFIGURACIÓN DE SERVIDOR]:** Servicio SMTP/IMAP alojado en la instancia de producción IONOS SE. |
| **Imprentas Asociadas de la Red** | Fabricación física de tiradas y entrega de mercancía a compradores de Print it. | Talleres industriales situados en el Espacio Económico Europeo. | **[MODELO CONFIRMADO]:** Destinatarios independientes que reciben los archivos técnicos y datos de entrega únicamente tras formalizarse y pagarse el pedido. |
| **Pasarelas de Pago Bancarias (SEPA B2B)** | Liquidación mensual de la comisión del 4 % de marketplace a imprentas. | Entidades financieras reguladas en la Unión Europea. | **[PROPUESTA SUJETA A CONTRATACIÓN Y DEFINICIÓN OPERATIVA]:** Pendiente de apertura de cuenta bancaria corporativa y pasarela de cobro B2B. |
| **Motor de Telemetría Técnica (*First-Party*)** | Analítica de latencia de cálculo y usabilidad de interfaz en cliente. | Almacenamiento local en navegador del usuario (`localStorage`). | **[PRUEBA EJECUTADA EN NAVEGADOR]:** Sin terceros destinatarios (cero SDKs externos de analítica). Purgado verificado tras revocación en panel de cookies. |

#### 1.3. Accesos de Soporte, Subencargados y Transferencias Internacionales
| Ámbito de Acceso | Alcance y Tratamiento | Localización | Estado de Verificación |
| :--- | :--- | :--- | :--- |
| **Acceso Administrativo y de Soporte Técnico** | Acceso a consola SSH y panel Plesk Obsidian para despliegue y mantenimiento. | Personal técnico autorizado de PrintPrice. | **[PENDIENTE DE AUDITORÍA DE POLÍTICAS DE ACCESO Y REGISTRO DE CONEXIONES].** |
| **Copias de Seguridad y Almacenamiento Redundante** | Respaldo periódico de bases de datos y configuraciones del servidor en Plesk. | Almacenamiento secundario del proveedor de hosting (IONOS SE, Alemania). | **[PENDIENTE DE AUDITORÍA OPERATIVA EN SERVIDOR]:** Verificar alcance, programación, retención y posibles reglas de exclusión en Plesk Obsidian / IONOS SE para la ruta de almacenamiento temporal de preflight (`PPOS_UPLOADS_DIR`). |
| **Correspondencia de Versiones Desplegadas** | Cotejo entre los Git commit SHAs inspeccionados en local y las versiones / builds activas en producción. | Servidor de producción. | **[PENDIENTE OPERATIVO]:** Verificación de trazabilidad estricta entre código auditado y despliegue real en cada microservicio. |
| **Microservicios Satélite de Cálculo / Inferencia** | Servicios satélite de cálculo técnico y motor de imposición. | Servidor propio IONOS SE en Alemania / UE. | **[CÓDIGO OBSERVADO]:** Los microservicios de análisis técnico (Fix it) operan 100 % en local sin dependencias en la nube en el recorrido analizado. |

---

### 2. Procedimiento de Notificación y Oposición a Nuevos Subencargados
2.1. **[PROPUESTA CONTRACTUAL SUJETA A APROBACIÓN]** PrintPrice notificará a los clientes registrados cualquier incorporación o sustitución prevista de un subencargado con una antelación mínima de **quince (15) días naturales** antes de que dicho proveedor inicie el acceso a datos.  
2.2. **[PROPUESTA CONTRACTUAL SUJETA A APROBACIÓN]** Los clientes que dispongan de un DPA suscrito con PrintPrice podrán formular objeciones motivadas por escrito a privacy@printprice.pro dentro de dicho plazo. Si las partes no alcanzan un acuerdo técnico, el cliente podrá rescindir los servicios afectados sin penalización.
