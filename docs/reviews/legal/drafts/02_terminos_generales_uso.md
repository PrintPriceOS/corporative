# TÉRMINOS GENERALES DE USO DE LA PLATAFORMA

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Idioma:** Redactado íntegramente en Español (ES), con encabezado trilingüe.  
> **Versión:** v2026.1-draft | **Fecha de revisión:** 25 de octubre de 2026
> **Nota de idioma / Language note / Sprachhinweis:** Este documento está redactado íntegramente en español como borrador de trabajo interno; las cabeceras trilingües indican el estado del ciclo documental y no constituyen traducciones completas en EN o DE.

---

### 1. Objeto, Ámbito y Aceptación
1.1. Los presentes Términos Generales de Uso (en adelante, las «Condiciones Generales») regulan el acceso, navegación y utilización de la plataforma digital printprice.pro y sus herramientas de software asociadas, titularidad de **Print Price Pro SIA** [PENDIENTE DE RATIFICACIÓN REGISTRAL] (en adelante, «PrintPrice»).  
1.2. El registro en la plataforma o la utilización de cualquiera de sus servicios implica la aceptación plena de estas Condiciones Generales, complementadas por las Condiciones Específicas aplicables a cada categoría de usuario (Autores/Particulares, Editoriales, Imprentas y Proveedores de Papel).  
1.3. **Inexistencia de período de prueba:** Se hace constar de forma expresa que la plataforma PrintPrice **no ofrece ningún período de prueba gratuito de 14 ni de 21 días** *(Modelo confirmado: eliminación de pruebas gratuitas)*. El acceso a las herramientas de cálculo y preflight se rige por las modalidades libres o tarifadas vigentes en la plataforma.

---

### 2. Papel Contractual de PrintPrice en el Ecosistema
2.1. **Naturaleza de la plataforma:** PrintPrice opera exclusivamente como prestador de servicios de software de la sociedad de la información y operador de marketplace digital multilateral.  
2.2. **Delimitación de la compraventa material:** Salvo acuerdo particular expreso, PrintPrice no actúa como imprenta física, no fabrica bienes materiales, no custodia fondos de producción ni actúa como transportista de mercancías.  
2.3. **Perfección del contrato de impresión:** Cuando un usuario cursa un encargo a través del marketplace Print it, el contrato de compraventa y fabricación de obra física se perfecciona **directa y exclusivamente entre el cliente (comprador) y la imprenta asociada seleccionada (vendedor y fabricante)** *(Modelo comercial confirmado)*.  
2.4. **Flujo económico y comisiones:**
- La imprenta seleccionada factura y cobra directamente al cliente el importe íntegro acordado para la tirada.
- PrintPrice factura posteriormente a la imprenta una **comisión de servicio de marketplace del 4 %**, con liquidación mensual conforme a las condiciones de adhesión de talleres *(Porcentaje confirmado por el proyecto)*.
- [DECISIÓN DE NEGOCIO PENDIENTE]: La base imponible de dicha comisión (inclusión o exclusión de transporte e IVA) y el momento exacto de devengo contable constan como decisiones pendientes de ratificación formal en [DECISIONS_REQUIRED.md](../DECISIONS_REQUIRED.md).
- PrintPrice no interviene como entidad de pago con retención de depósitos ni custodia fondos de clientes finales.

---

### 3. Registro de Cuenta y Obligaciones del Usuario
3.1. Para cursar pedidos, guardar presupuestos o acceder al Control Plane, el usuario debe registrar una cuenta aportando datos veraces, exactos y actualizados.  
3.2. Las credenciales de acceso son estrictamente confidenciales e intransferibles. El usuario es el único responsable de cualquier actividad realizada bajo sus claves.  
3.3. Queda prohibido utilizar la plataforma para:
- Transmitir virus, malware o código malicioso.
- Cargar archivos que infrinjan derechos de propiedad intelectual, marcas, secretos comerciales o derechos al honor y la intimidad de terceros.
- Realizar scraping automatizado abusivo o ataques de denegación de servicio contra los motores de cálculo y preflight.

---

### 4. Propiedad Intelectual sobre Archivos, Contenidos y Licencias Técnicas
4.1. **Titularidad del cliente:** El usuario conserva íntegramente todos los derechos de propiedad intelectual e industrial sobre los manuscritos, imágenes, cubiertas, tipografías y maquetas cargados en la plataforma.  
4.2. **Licencia técnica de operación:** Al cargar un archivo en Price it, Fix it o Print it, el usuario concede a PrintPrice y a la imprenta adjudicataria una licencia técnica no exclusiva, gratuita y limitada territorial y temporalmente a lo estrictamente necesario para:
- Analizar sintácticamente el archivo y generar el informe de preflight.
- Normalizar las cajas de corte y sangrado.
- Transmitir la orden de trabajo y los pliegos al taller para imprimir y encuadernar la tirada encargada.
4.3. **Garantía de titularidad e indemnidad:** El usuario garantiza que ostenta todas las licencias, derechos de autor y autorizaciones tipográficas necesarias sobre los archivos que remite a producción, manteniendo indemnes a PrintPrice y a la imprenta frente a cualquier reclamación de terceros por infracción de copyright o derechos de imagen.

---

### 5. Conservación, Tratamiento y Purgado de Archivos
5.1. **Archivos de preflight:** Conforme a la práctica técnica declarada en código (app/products/preflight/page.tsx y app/legal/privacy-policy/page.tsx), los archivos temporales de PDF subidos para inspección se purgan de los servidores de forma automática tras el procesamiento técnico y descarga del informe.  
5.2. **Retención temporal prolongada [PROPUESTA OPERATIVA PENDIENTE DE APROBACIÓN TÉCNICA]:** Cualquier ventana de retención temporal extendida (p. ej. 24 a 72 horas para facilitar la re-descarga del reporte o la comparación de perfiles) se considerará una propuesta sujeta a la aprobación de la infraestructura de almacenamiento y no una práctica plenamente garantizada en producción.  
5.3. **Archivos de pedidos en firme:** Los archivos asociados a un pedido formalizado se conservan en la infraestructura técnica durante el ciclo de producción y el plazo de garantía legal del pedido para permitir la verificación técnica en caso de incidencias de taller.  
5.4. **Compromiso sobre algoritmos e IA:**
- *Verificado en código propio:* Los motores de imposición y preflight propios de PrintPrice son algoritmos deterministas que no entrenan modelos de aprendizaje automático.
- [PROPUESTA CONTRACTUAL PARA TERCEROS]: Respecto a cualquier integración futura de servicios externos de IA o renderizado, PrintPrice exigirá contractualmente la suscripción de acuerdos con cláusula de no entrenamiento público (*Zero Data Retention*), pendiente de formalización con los proveedores externos pertinentes.

---

### 6. Alcance y Límites de Responsabilidad del Software
6.1. **Motor de cotización (Price it):** Los presupuestos calculados se basan en los parámetros introducidos por el usuario y las tarifas de máquina vigentes en el momento de la consulta. La formalización definitiva queda condicionada a la validación de la especificación técnica en taller.  
6.2. **Motor de preflight (Fix it):** La herramienta ejecuta una comprobación determinista conforme a las normas ISO (PDF/X). Dicha comprobación técnica señala discrepancias respecto a geometrías, tintas y resoluciones, pero **no sustituye la revisión humana especializada ni garantiza la idoneidad estética del diseño o de la corrección ortotipográfica**.  
6.3. **Visualizador 3D (Mockup):** Constituye una simulación volumétrica meramente orientativa para pantallas digitales ejecutada mediante WebGL/Three.js en el navegador del usuario *(renderizado gráfico determinista en cliente, no IA)*. No representa una prueba contractual de color físico (ISO 12647) ni asegura la textura o rigidez exacta del soporte de papel elegido.

---

### 7. Suspensión, Restricción y Cierre de Cuentas
7.1. PrintPrice podrá suspender o cancelar el acceso a la plataforma a cualquier usuario en caso de incumplimiento grave de estas Condiciones Generales, impago de comisiones debidas, comisión de fraude informático o carga reiterada de archivos ilícitos.  
7.2. En las relaciones con usuarios profesionales (imprentas y editoriales), cualquier medida de suspensión o rescisión se regirá por las exigencias de motivación y preaviso establecidas en el Reglamento P2B (UE 2019/1150) [PROPUESTA CONTRACTUAL SUJETA A APROBACIÓN DE PROCEDIMIENTO INTERNO].

---

### 8. Modificaciones Contractuales y Notificación
8.1. PrintPrice se reserva el derecho de modificar los presentes términos para adaptarlos a novedades legislativas o mejoras técnicas del software.  
8.2. Los cambios sustanciales se notificarán a los usuarios registrados por correo electrónico con una antelación mínima de **15 días naturales** a su entrada en vigor (conforme al Art. 3 del Reglamento P2B para usuarios profesionales).

---

### 9. Ley Aplicable y Fuero Jurisdiccional
9.1. **Relaciones B2B (Empresas, imprentas, distribuidores y profesionales):** Estas Condiciones Generales se rigen por las leyes de la República de Letonia. Para cualquier controversia derivada del contrato, las partes se someten a la jurisdicción exclusiva de los tribunales de la ciudad de **Rīga (Letonia)**.  
9.2. **Relaciones B2C (Consumidores, autores independientes y particulares):** Conforme al Reglamento (UE) 1215/2012 y las directivas de consumidores, el usuario que actúe en calidad de consumidor podrá entablar acciones ante los órganos jurisdiccionales del Estado miembro en que esté domiciliado.
