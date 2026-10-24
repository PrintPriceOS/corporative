# Auditoría de Afirmaciones (Claims) y Comparativas — PrintPrice Pro

**Fecha de Revisión:** 24 de Octubre de 2026  
**Ámbito:** Web Corporativa (`https://printprice.pro/`), Onboarding de Control Plane y Documentación Oficial

---

## 1. Auditoría Detallada de Afirmaciones (Claims Comerciales)

| Afirmación Original | Ubicación | Evidencia y Alcance Real | Decisión | Decisión / Reemplazo Honesto |
|---|---|---|---|---|
| *"Exact Print Cost / No estimates. Real numbers in seconds."* | Portada (`ProductSurfaceGrid`) | El motor de precios calcula según matrices de planta y tarifas de papel configuradas. No obstante, fluctuaciones de transporte, cambios de archivo o requisitos atípicos requieren confirmación técnica del taller. | **Corregir** | *"Presupuesto técnico inmediato basado en matrices de producción reales y especificaciones de tu libro."* Distinguiendo claramente entre estimación orientativa, cotización y orden confirmada. |
| *"Zero lead time errors and smart routing"* | Portada (`ProductSurfaceGrid`, `WorkflowRail`) | No es posible garantizar cero errores en plazos de entrega en operaciones industriales físicas con mermas mecánicas y logística de terceros. | **Retirar** | *"Tiempos de producción calculados a partir de los calendarios reales y velocidades de máquina de cada taller."* |
| *"1,280 nodes / Global network"* | Portada / Hero | Cifra ornamental arbitraria no representativa del censo activo verificado de talleres. | **Retirar** | Sustituir por la red federada real de talleres e imprentas adscritas en Control Plane. |
| *"World's first print operating system"* | Varias páginas | Reclamación hiperbólica no acreditada; existen plataformas de software industrial consolidadas (printIQ, PrintVis, HP Site Flow). | **Retirar** | *"Plataforma integral de software para presupuestación, validación técnica y conexión entre imprentas y proveedores."* |
| *"SAVE €2,530 PER RUN (Traditional €12,400 vs PrintPrice €9,870)"* | Portada (`how-it-works-grid` / Operational Case Study) | Ejemplo numérico hipotético presentado como ahorro verificado sin ficha técnica ni imprenta real asociada. | **Retirar como reclamo estático** | Mostrar ejemplos de matrices de volumen donde se aprecia el escalado de coste unitario entre digital y offset, sin inventar ahorros absolutos no auditables. |
| *"Comisiones del 12–18 %"* | `/contact/partner` FAQ | Esquema de comisiones heredado de una fase preliminar no consensuado contractualmente con los talleres activos de Control Plane. | **Retirar del copy público** | Derivar las condiciones comerciales al onboarding oficial de imprentas en Control Plane (`/printhouse/register`), donde se acuerdan según el modelo de taller. |
| *"Pagos en 15 días garantizados"* | `/contact/partner` FAQ | El plazo de liquidación depende de los acuerdos entre cliente, taller y canal de cobro; no existe un fondo de garantía de pago en 15 días en la corporativa. | **Retirar del copy público** | Explicar que la facturación y cobro siguen los términos del acuerdo de taller en Control Plane. |
| *"Protección total frente a contracargos"* | `/contact/partner` FAQ | Reclamación financiera sin entidad aseguradora ni pasarela bancaria que lo avale en este portal. | **Retirar** | Aclarar que la trazabilidad del `evidenceId` y el informe de Preflight firmado protegen técnicamente al taller frente a disputas por archivos defectuosos. |
| *"Prueba gratuita de 21 días"* | `/contact/partner` FAQ | No existe mecanismo técnico ni pasarela de suscripción de 21 días en Control Plane. El registro en Control Plane es directo para talleres autorizados. | **Retirar** | Indicar que el registro y configuración inicial de imprenta se realizan sin coste previo en Control Plane. |
| *"Packaging y Large Format"* | Textos de capacidades | El motor de Budget y el preflight actual de PrintPrice están estrictamente optimizados para **libros, catálogos y publicaciones editoriales** (páginas, cubiertas, lomo, rústica, cosido, tapa dura). | **Limitar al alcance real** | Centrar la comunicación en libros y publicaciones editoriales; no prometer packaging o gran formato sin soporte en los motores de cálculo vigentes. |

---

## 2. Comparativas Objetivas del Sector (Fuentes Verificadas a Octubre 2026)

### Bloque A: Autores, Editoriales y Particulares

| Característica | PrintPrice Pro | Lulu | GelatoConnect | Fuentes y Notas Metodológicas |
|---|:---:|:---:|:---:|---|
| **Cálculo de presupuesto inmediato sin registro obligatorio** | **Disponible** | Mediante módulo / registro | Mediante integración B2B | En PrintPrice Budget (`budget.printprice.pro`) se puede configurar libro, papel y encuadernación sin crear cuenta previa. Lulu requiere flujo guiado de proyecto; GelatoConnect es plataforma orientada a productores. |
| **Comprobación técnica de PDF (Preflight específico de libros)** | **Disponible** | Disponible (básico en subida de archivo) | Disponible | PrintPrice audita sangres (3 mm), modo CMYK, TAC y resolución de imágenes antes de encargar. |
| **Visualización 3D interactiva de lomo y cubiertas** | **Disponible** | No confirmado | No confirmado | Simulación volumétrica en navegador calculada con el gramaje del papel y número de páginas. *(Nota: es una maqueta orientativa, no una prueba de contrato física).* |
| **Elección de imprenta o conexión con taller preferido** | **Disponible** | Red cerrada de Lulu | Red cerrada de Gelato | PrintPrice permite tanto solicitar cotización a talleres de la red como gestionar tu propia imprenta asociada. |
| **Distribución comercial integrada (Librerías / Amazon / Ingrams)** | Mediante integración | **Disponible** | **Disponible** | Lulu y Gelato disponen de canales de distribución y venta bajo demanda consolidados en marketplaces mundiales. |

### Bloque B: Imprentas y Proveedores de Papel

| Característica | PrintPrice Pro | printIQ | PrintVis | Tharstern |
|---|:---:|:---:|:---:|---|
| **Perfilado de prensas y cálculo por máquina (makeready, mermas, velocidad)** | **Disponible** | **Disponible** | **Disponible** | **Disponible** | printIQ, PrintVis y Tharstern son sistemas MIS/ERP consolidados con cálculo estricto de ingeniería de costes. PrintPrice modela prensas en Control Plane para tarificación instantánea. |
| **Portal federado de proveedores de papel (sustratos y tarifas vinculadas)** | **Disponible** | **Disponible** *(módulo Supply Chain Portal)* | Mediante integración *(Microsoft Dynamics 365 Business Central)* | Mediante integración API | printIQ cuenta con portal de compras para proveedores; PrintPrice implementa *Paper Supplier Hub* con catálogo técnico normalizado y separación nítida fabricación vs. porte logístico. |
| **Trazabilidad matemática e inmutabilidad de evidencia (`evidenceId`)** | **Disponible** | Mediante auditoría del ERP | Mediante registro de transacciones Dynamics | Mediante histórico de trabajo | PrintPrice genera un hash e identificador único por presupuesto y validación de PDF que garantiza la inmutabilidad de la oferta. |
| **Suite completa de taller (Facturación contable, nóminas, planificación de turnos de taller)** | Mediante integración *(enfoque motor y conector)* | **Disponible** *(MIS integral nativo)* | **Disponible** *(ERP completo integrado en Business Central)* | **Disponible** *(MIS completo de la industria gráfica)* | PrintPrice Pro no pretende sustituir un ERP contable integral consolidado, sino potenciar el cálculo comercial, la captación técnica y la federación de materiales. |

---

## 3. Estado de Celda Normalizado

- **Disponible:** Funcionalidad nativa accesible y documentada en la versión estándar.
- **Mediante módulo adicional:** Requiere licenciamiento de un paquete o módulo complementario.
- **Mediante integración:** Se resuelve conectando el sistema con herramientas externas o APIs de terceros.
- **No confirmado en las fuentes consultadas:** No se ha localizado evidencia documental pública suficiente que acredite la característica de manera concluyente.
- **No aplica a esta categoría:** La característica no corresponde a la tipología funcional de la solución.
