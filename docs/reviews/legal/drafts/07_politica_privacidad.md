# POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS (RGPD)

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Idioma:** Redactado íntegramente en Español (ES), con encabezado trilingüe.  
> **Versión:** v2026.1-draft | **Fecha de revisión:** 25 de octubre de 2026
> **Nota de idioma / Language note / Sprachhinweis:** Este documento está redactado íntegramente en español como borrador de trabajo interno; las cabeceras trilingües indican el estado del ciclo documental y no constituyen traducciones completas en EN o DE.

---

### 1. Responsable del Tratamiento y Datos de Contacto
En cumplimiento del Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos — RGPD) y de la Ley de Tratamiento de Datos Personales de la República de Letonia (*Fizisko personu datu apstrādes likums*), se informa a los interesados de los datos del responsable del tratamiento:

- **Responsable:** Print Price Pro SIA [PENDIENTE DE RATIFICACIÓN REGISTRAL DEFINITIVA]
- **N.º Registro Mercantil:** 40203631570 (Letonia) [PENDIENTE DE COTEJO DOCUMENTAL]
- **Domicilio:** Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia [PENDIENTE DE CONFIRMACIÓN DE SEDE EFECTIVA]
- **Correo Electrónico de Privacidad:** privacy@printprice.pro
- **Autoridad de Control Principal:** Inspección Estatal de Datos de Letonia (*Datu valsts inspekcija* — DVI, [dvi.gov.lv](https://www.dvi.gov.lv))

---

### 2. Categorías de Datos, Finalidades y Bases Jurídicas

| Categoría de Datos | Finalidad Concreta | Base Jurídica (RGPD) | Plazo de Conservación |
| :--- | :--- | :--- | :--- |
| **Datos de cuenta y contacto**<br>(Nombre, apellidos, email, teléfono, razón social, NIF). | Gestión del registro de usuario, acceso seguro a la plataforma, soporte técnico y comunicaciones contractuales. | **Art. 6.1.b:** Ejecución del contrato de servicio o medidas precontractuales a petición del usuario. | Durante la vigencia de la cuenta. Tras la baja, bloqueados durante los plazos de prescripción legal mercantiles (5 años). |
| **Archivos de impresión**<br>(PDFs de interior y cubierta que pueden contener nombres de autores, biografías o créditos). | Análisis técnico de preflight (Fix it), normalización de sangrados y transmisión a la imprenta adjudicataria para fabricar la tirada. | **Art. 6.1.b:** Ejecución del encargo de validación y producción solicitado por el usuario. | **Archivos no contratados:** Eliminación automática tras el procesamiento técnico y descarga del informe *(Práctica declarada en código)*.<br>*(La retención temporal de 24 a 72 horas para re-descarga de informes se documenta como [PROPUESTA OPERATIVA SUJETA A APROBACIÓN TÉCNICA])*.<br>**Pedidos confirmados:** Conservados durante el ciclo de fabricación y plazo de garantía técnica. |
| **Parámetros de proyectos**<br>(Formatos, número de páginas, tirada, papeles, encuadernación). | Cálculo algorítmico del presupuesto en Price it, optimización de pliegos y archivo de proyectos guardados. | **Art. 6.1.b:** Prestación del servicio de cotización solicitada por el usuario. | En sesión local hasta guardado voluntario por el usuario en su panel de cuenta. |
| **Datos de facturación de comisiones**<br>(Datos fiscales de imprentas y talleres asociados). | Emisión y cobro mensual de la comisión del 4 % de marketplace; cumplimiento de obligaciones contables y fiscales. | **Art. 6.1.c:** Cumplimiento de obligaciones legales y tributarias (derecho letón y de la UE). | Mínimo legal de 5 años conforme a la normativa fiscal y mercantil comunitaria. |
| **Telemetría y analítica técnica**<br>(Latencia de cálculo, clics de conversión, eventos de interfaz). | Medición técnica del rendimiento del motor de cálculo, usabilidad y detección de errores de navegación. | **Art. 6.1.a:** Consentimiento previo expreso otorgado a través del banner de preferencias. | Purgado inmediato de ppos_telemetry_history al revocar el consentimiento; almacenamiento local máximo de 100 eventos en el equipo del usuario *(Verificado empíricamente con Playwright)*. |

---

### 3. Diferenciación de Roles: Responsable vs. Encargado del Tratamiento
1. **PrintPrice como Responsable del Tratamiento:** PrintPrice determina los fines y medios del tratamiento para los datos de gestión de usuarios de la web, facturación de comisiones B2B y soporte técnico general.
2. **PrintPrice como Encargado del Tratamiento (DPA):** Cuando una editorial, imprenta o cliente profesional carga archivos PDF que contienen datos personales de terceros, PrintPrice actúa como mero **Encargado del tratamiento** por cuenta del cliente, rigiéndose por el Acuerdo de Encargo de Tratamiento (DPA) regulado en el Art. 28 del RGPD.
3. **La Imprenta como Responsable Independiente:** Al formalizarse un pedido en el marketplace, la imprenta adjudicataria recibe la orden técnica y los datos de entrega para confeccionar y remitir los ejemplares físicos. La imprenta actúa como Responsable independiente para la ejecución material de la compraventa y facturación al cliente.

---

### 4. Destinatarios y Subencargados del Tratamiento
PrintPrice no vende, alquila ni cede datos personales a redes publicitarias ni a intermediarios de datos. Los datos únicamente se comunican a:
1. **Imprentas asociadas de la red:** Exclusivamente la imprenta seleccionada por el cliente para el pedido específico recibe los archivos y datos de entrega necesarios para imprimir y despachar la tirada.
2. **Subencargados técnicos de infraestructura:**
   - **IONOS SE (Alemania / UE):** Infraestructura de servidor dedicado / VPS y almacenamiento de la plataforma corporativa printprice.pro *(Verificado técnicamente)*.
   - **Proveedor de correo corporativo:** Servidor de correo operado sobre la infraestructura del servidor dedicado en la Unión Europea.
   - **Servicios satélite y subdominios externos:** [PENDIENTE DE AUDITAR CONTRATOS DE INFRAESTRUCTURA DE SUBDOMINIOS EXTERNOS] (p. ej. subdominio de render de maqueta 3D).
3. **Administraciones públicas:** Cuando exista una obligación legal expresa (p. ej. reporte fiscal DAC7 ante la *Valsts ieņēmumu dienests* — VID).

---

### 5. Transferencias Internacionales de Datos
- **Alcance verificado:** La infraestructura principal de la web corporativa se encuentra físicamente localizada en **centros de datos en Fráncfort am Main (Alemania / Unión Europea)** operados por IONOS SE.
- **Limitación de la declaración:** La ausencia de transferencias internacionales se formula estrictamente respecto a la infraestructura web corporativa analizada. Cualquier servicio externo o satélite que en el futuro requiera transferencias fuera del EEE se someterá a Cláusulas Contractuales Tipo (SCC) aprobadas por la Comisión Europea.

---

### 6. Derechos de los Interesados y Vías de Ejercicio
Los usuarios pueden ejercitar en cualquier momento sus derechos reconocidos por los artículos 15 a 22 del RGPD: acceso, rectificación, supresión («derecho al olvido»), limitación del tratamiento, portabilidad y oposición.

Para ejercitar estos derechos, basta remitir una solicitud escrita a privacy@printprice.pro. Asimismo, el interesado tiene derecho a presentar una reclamación ante la autoridad de control competente:
- En Letonia: *Datu valsts inspekcija* (DVI, [dvi.gov.lv](https://www.dvi.gov.lv)).
- En España: Agencia Española de Protección de Datos (AEPD, [aepd.es](https://www.aepd.es)).
- O ante la autoridad de protección de datos del Estado miembro de la UE en que resida habitualmente.

---

### 7. Decisiones Automatizadas y Perfiles
PrintPrice no adopta decisiones basadas exclusivamente en tratamientos automatizados de datos personales que produzcan efectos jurídicos desfavorables para el usuario sin intervención humana. Los algoritmos de Price it calculan costes físicos de material y máquina a partir de fórmulas matemáticas deterministas resueltas en servidor, y la formalización de cualquier pedido requiere la aceptación humana expresa de las partes involucradas.
