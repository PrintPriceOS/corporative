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
| **Archivos de impresión**<br>(PDFs de interior y cubierta que pueden contener nombres de autores, biografías o créditos). | Análisis técnico de preflight (Fix it), normalización de sangrados y transmisión a la imprenta adjudicataria para fabricar la tirada. | **Art. 6.1.b:** Ejecución del encargo de validación y producción solicitado por el usuario. | **Archivos no contratados (Preflight):** **[CÓDIGO OBSERVADO: RETENCIÓN TEMPORAL PROGRAMADA]** Almacenados en disco local en directorio segregado por inquilino y trabajo (`PPOS_UPLOADS_DIR`). El worker periódico `StorageCleanupWorker` consulta cada 1 hora trabajos en estado `COMPLETED` o `FAILED` con `created_at < NOW() - 24h` para su eliminación física y en base de datos. La descarga del archivo o la generación del informe no disparan su borrado inmediato, y el cómputo inicia con la creación del registro.<br>*Pendiente operativo:* Auditoría del alcance y exclusiones de las políticas de backup del servidor Plesk Obsidian.<br>**Pedidos confirmados:** Conservados durante el ciclo de fabricación y plazo de garantía técnica según protocolo de taller. |
| **Parámetros de proyectos**<br>(Formatos, número de páginas, tirada, papeles, encuadernación). | Cálculo algorítmico del presupuesto en Price it, optimización de pliegos y archivo de proyectos guardados. | **Art. 6.1.b:** Prestación del servicio de cotización solicitada por el usuario. | En sesión local hasta guardado voluntario por el usuario en su panel de cuenta. |
| **Datos de facturación de comisiones**<br>(Datos fiscales de imprentas y talleres asociados). | Emisión y cobro mensual de la comisión del 4 % de marketplace; cumplimiento de obligaciones contables y fiscales. | **Art. 6.1.c:** Cumplimiento de obligaciones legales y tributarias (derecho letón y de la UE). | Mínimo legal de 5 años conforme a la normativa fiscal y mercantil comunitaria. |
| **Telemetría y analítica técnica**<br>(Latencia de cálculo, clics de conversión, eventos de interfaz). | Medición técnica del rendimiento del motor de cálculo, usabilidad y detección de errores de navegación. | **Art. 6.1.a:** Consentimiento previo expreso otorgado a través del banner de preferencias. | Purgado inmediato de ppos_telemetry_history al revocar el consentimiento; almacenamiento local máximo de 100 eventos en el equipo del usuario *(Verificado empíricamente con Playwright)*. |

---

### 3. Diferenciación de Roles: Responsable vs. Encargado del Tratamiento
1. **PrintPrice como Responsable del Tratamiento:** PrintPrice determina los fines y medios del tratamiento para los datos de gestión de usuarios de la web, facturación de comisiones B2B y soporte técnico general.
2. **PrintPrice como Encargado del Tratamiento (DPA):** Cuando una editorial, imprenta o cliente profesional carga archivos PDF que contienen datos personales de terceros, PrintPrice actúa como mero **Encargado del tratamiento** por cuenta del cliente, rigiéndose por el Acuerdo de Encargo de Tratamiento (DPA) regulado en el Art. 28 del RGPD.
3. **La Imprenta como Responsable Independiente:** Al formalizarse un pedido en el marketplace, la imprenta adjudicataria recibe la orden técnica y los datos de entrega para confeccionar y remitir los ejemplares físicos. La imprenta actúa como Responsable independiente para la ejecución material de la compraventa y facturación al cliente.

---

### 4. Proveedores de Alojamiento, Destinatarios y Accesos de Soporte

Para una estricta transparencia conforme al RGPD, se desglosa el mapa de infraestructura distinguiendo proveedor físico, servicios externos y accesos administrativos:

4.1. **Proveedor y Ubicación del Alojamiento:**
- **Proveedor:** IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Alemania).
- **Ubicación física:** Servidor dedicado / VPS administrado mediante panel Plesk Obsidian, con dirección IP pública `212.227.79.67` en Fráncfort am Main (Alemania / Unión Europea).
- **Estado de evidencia:** Comprobada la resolución de red de la web corporativa hacia dicha IP. La suscripción de contrato de hosting con DPA formal y la verificación del alcance de copias de seguridad constan como **[PENDIENTE DE AUDITORÍA CONTRACTUAL Y TÉCNICA EN PLESK]**.

4.2. **Servicios Externos y Destinatarios:**
- **Imprentas asociadas:** Únicamente la imprenta adjudicataria seleccionada por el cliente recibe los archivos de producción y datos de entrega para confeccionar la tirada contratada.
- **Servicio de correo corporativo:** Operado sobre la infraestructura del servidor dedicado en Alemania para notificaciones de soporte y pedidos (@printprice.pro).
- **Google LLC (Google Gemini Developer API):** Servicio externo de inferencia lingüística consumido vía REST en Control Plane (`calibrationAssistantService.js`) para asistencia en la calibración comercial de presupuestos. No trata archivos de preflight de clientes. **[PENDIENTE DE FORMALIZACIÓN CONTRACTUAL Y DPA EVALUANDO CONDICIONES DE RETENCIÓN]**.
- **Cloudflare, Inc.:** Orígenes autorizados en cabeceras de Content Security Policy (CSP) en `proxy.ts`. El formulario de onboarding incluye un elemento visual placeholder de Turnstile sin integración activa.
- **Pasarelas de pago y entidades financieras:** **[PENDIENTE DE CONTRATACIÓN Y DEFINICIÓN OPERATIVA]**. El cobro de producción lo realiza directamente cada imprenta; la liquidación de comisiones del 4 % se gestionará mediante SEPA B2B o transferencia bancaria europea.
- **Administraciones públicas:** Únicamente por imperativo legal (p. ej. reporte tributario DAC7 ante la *Valsts ieņēmumu dienests* — VID de Letonia).

4.3. **Accesos de Soporte, Subencargados y Transferencias Internacionales:**
- **Accesos administrativos y logs de servidor:** El acceso al servidor mediante SSH y panel Plesk Obsidian está restringido al personal técnico de administración de sistemas. Los formularios enviados al servidor (Server Action de onboarding) imprimen en consola datos como correos y nombres de empresa; su persistencia y rotación en los registros del supervisor de procesos constan como **[PENDIENTE DE AUDITORÍA OPERATIVA EN SERVIDOR]**.
- **Criterio riguroso sobre transferencias internacionales:** **No se deduce "cero transferencias" exclusivamente de una dirección IP, geolocalización o de capturas de red del navegador del cliente.** Las llamadas a la API de Gemini en Control Plane constituyen transferencias internacionales fuera del EEE que deben quedar formalmente amparadas en las Cláusulas Contractuales Tipo (SCC) aprobadas por la Comisión Europea y en los acuerdos corporativos correspondientes.

---

### 5. Derechos de los Interesados y Vías de Ejercicio
Los usuarios pueden ejercitar en cualquier momento sus derechos reconocidos por los artículos 15 a 22 del RGPD: acceso, rectificación, supresión («derecho al olvido»), limitación del tratamiento, portabilidad y oposición.

Para ejercitar estos derechos, basta remitir una solicitud escrita a privacy@printprice.pro. Asimismo, el interesado tiene derecho a presentar una reclamación ante la autoridad de control competente:
- En Letonia: *Datu valsts inspekcija* (DVI, [dvi.gov.lv](https://www.dvi.gov.lv)).
- En España: Agencia Española de Protección de Datos (AEPD, [aepd.es](https://www.aepd.es)).
- O ante la autoridad de protección de datos del Estado miembro de la UE en que resida habitualmente.

---

### 6. Decisiones Automatizadas y Perfiles
PrintPrice no adopta decisiones basadas exclusivamente en tratamientos automatizados de datos personales que produzcan efectos jurídicos desfavorables para el usuario sin intervención humana. Los algoritmos de Price it calculan costes físicos de material y máquina a partir de fórmulas matemáticas deterministas resueltas en servidor, y la formalización de cualquier pedido requiere la aceptación humana expresa de las partes involucradas.
