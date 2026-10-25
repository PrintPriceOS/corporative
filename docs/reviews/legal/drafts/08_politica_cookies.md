# POLÍTICA DE COOKIES Y ALMACENAMIENTO LOCAL

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Versión:** v2026.1-draft | **Fecha de emisión:** 25 de octubre de 2026

---

### 1. ¿Qué son las Cookies y Tecnologías Asimiladas?
1.1. Conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE) y el artículo 5, apartado 3 de la Directiva 2002/58/CE (Directiva sobre Privacidad y Comunicaciones Electrónicas), la presente política regula tanto las cookies tradicionales como cualquier **dispositivo de almacenamiento y recuperación de datos en equipos terminales de los usuarios**, en particular las tecnologías web modernas de **Almacenamiento Local (localStorage) y Almacenamiento de Sesión (sessionStorage)**.  
1.2. Estas tecnologías permiten al sitio web recordar las elecciones de navegación del usuario (como el idioma o los parámetros de un presupuesto de imprenta) y medir el rendimiento técnico de la plataforma.

---

### 2. Transparencia Técnica: Auditoría de Rastreadores
Conforme a la auditoría técnica en tiempo de ejecución efectuada sobre la plataforma https://printprice.pro/:
- **Cero cookies de terceros:** El sitio web **no instala cookies de terceros con fines publicitarios o de seguimiento entre sitios web** (no utiliza Google Ads, Meta Pixel, Twitter/X Pixel, ni trackers de retargeting comercial).
- **Procesamiento en origen (*First-Party*):** Todos los identificadores y métricas se procesan y almacenan directamente en el dominio propio printprice.pro.

---

### 3. Inventario Completo de Claves y Dispositivos de Almacenamiento

| Nombre / Clave Técnica | Tipo de Almacenamiento | Titular | Finalidad y Contenido | Plazo de Conservación | Categoría Legal y Consentimiento |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ppp_locale | localStorage | PrintPrice (Propio) | Almacena la preferencia de idioma seleccionada por el usuario (español es, inglés en, alemán de). | Persistente (hasta borrado de datos de navegación). | **Técnica / Funcional:** Exenta de consentimiento previo (solicitada expresamente por el usuario para navegar). |
| ppp_consent_v1_audit | localStorage | PrintPrice (Propio) | Registra el estado de consentimiento otorgado o denegado para cada categoría (essential: true, nalytics: boolean, fecha y versión). | Persistente (12 meses o hasta modificación sustancial). | **Cumplimiento Legal (Art. 7.1 RGPD):** Exenta de consentimiento previo (necesaria para acreditar la diligencia debida). |
| ppp_audit_consent_proof | localStorage | PrintPrice (Propio) | Almacena una prueba criptográfica y marca temporal con identificador único (proof_id) para trazabilidad de auditoría. | Persistente. | **Cumplimiento Legal:** Exenta de consentimiento previo. |
| ppos_session_id | sessionStorage | PrintPrice (Propio) | Identificador aleatorio efímero (sid_...) para agrupar los pasos del configurador de presupuesto durante la visita activa. | Sesión (se destruye automáticamente al cerrar la pestaña o ventana). | **Técnica / Operativa:** Exenta de consentimiento previo. |
| ppos_telemetry_history | localStorage | PrintPrice (Propio) | Registra eventos anónimos de interacción (vistas de secciones, clics en herramientas, latencia de cálculo de presupuesto). | Persistente (máximo 100 eventos). | **Analítica y Telemetría Técnica:** **Requiere consentimiento previo voluntario.** Se desactiva y purga si el usuario no la autoriza. |
| ppos_project_results | localStorage | PrintPrice (Propio) | Almacena en el navegador del usuario las especificaciones de cálculo de proyectos que el usuario decide guardar voluntariamente. | Persistente (hasta que el usuario elimine el proyecto). | **Funcional:** Activada únicamente por acción deliberada del usuario al pulsar «Guardar proyecto». |

---

### 4. Gestión, Configuración y Retirada del Consentimiento
4.1. **Banner de primera visita:** Al acceder por primera vez a printprice.pro, se muestra un banner interactivo que permite al usuario:
- **«Aceptar todas»:** Activa la analítica técnica y telemetría de rendimiento.
- **«Rechazar no esenciales»:** Mantiene activas únicamente las claves técnicas indispensables para navegar y cotizar, bloqueando la escritura de telemetría.
- **«Configurar»:** Permite activar o desactivar granularmente la analítica técnica.
4.2. **Modificación o revocación en cualquier momento:** El usuario puede volver a abrir el panel de configuración en todo momento haciendo clic en el enlace **«Preferencias de cookies»** situado en el pie de página de la web.  
4.3. **Efecto de purga automática comprobado:** Al desmarcar la casilla de «Analítica y telemetría técnica» y guardar las preferencias, el script ejecuta de forma inmediata e irreversible la instrucción localStorage.removeItem('ppos_telemetry_history'), suprimiendo los registros de telemetría acumulados en el navegador.

---

### 5. Cómo Eliminar o Bloquear el Almacenamiento Local desde el Navegador
El usuario puede en cualquier momento inspeccionar, bloquear o suprimir el almacenamiento local y las cookies directamente a través de las opciones de configuración de su navegador de Internet:
- **Google Chrome:** Configuración > Privacidad y seguridad > Cookies y otros datos de sitios web > Ver todos los datos y permisos de sitios.
- **Mozilla Firefox:** Opciones > Privacidad y seguridad > Cookies y datos del sitio > Limpiar datos.
- **Apple Safari:** Preferencias > Privacidad > Gestionar datos de sitios web.
- **Microsoft Edge:** Configuración > Permisos de sitios > Cookies y datos de sitios.
*Aviso técnico:* Si bloquea completamente el almacenamiento local, no se recordará su preferencia de idioma y algunas funciones de cálculo o guardado de presupuestos podrían no operar correctamente.
