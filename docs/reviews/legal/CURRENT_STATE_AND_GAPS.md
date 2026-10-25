# Estado Legal Actual, Inventario de Datos Reales y Brechas (Current State & Gaps)

**Fecha de consolidación:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Ámbito:** Diagnóstico exhaustivo del marco corporativo, operativo y contractual de PrintPrice Pro frente a la realidad técnica desplegada.

---

## 1. Identificación de la Entidad Operadora y Datos Registrales

| Parámetro | Dato Documentado en Borradores | Estado de Verificación | Brecha / Cuestión Pendiente |
| :--- | :--- | :--- | :--- |
| **Denominación Social** | Print Price Pro SIA | Documentado en borradores internos | Pendiente de acreditación con certificado oficial de constitución emitido por el Registro de Empresas de Letonia (*Uzņēmumu reģistrs*). |
| **Forma Jurídica** | Sociedad de Responsabilidad Limitada (*Sabiedrība ar ierobežotu atbildību* — SIA) | Documentado en borradores | Pendiente de ratificación societaria. |
| **Registro Mercantil** | N.º 40203631570 | Documentado en borradores | Pendiente de cotejo contra la base pública del Registro Mercantil letón (*Lursoft / Uzņēmumu reģistrs*). |
| **NIF / IVA (VAT ID)** | LV40203631570 | Documentado en borradores | Pendiente de validación de estatus VIES (IVA intracomunitario) en la base de la Comisión Europea. |
| **Domicilio Social** | Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia | Documentado en borradores | Pendiente de confirmación de sede social efectiva vs domicilio postal de notificaciones. |
| **Contactos Oficiales** | info@printprice.pro (General)<br>privacy@printprice.pro (DPO / Privacidad)<br>claims@printprice.pro (Reclamaciones e Incidencias) | Verificado en configuración de correo del dominio | Las cuentas están configuradas operativamente en el servidor de correo del dominio printprice.pro. |
| **País de Establecimiento** | República de Letonia (Unión Europea) | Documentado en borradores | Determina la competencia de la autoridad principal de control de datos (*Datu valsts inspekcija* — DVI) conforme al Art. 56 del RGPD. |
| **Mercados Atendidos** | Unión Europea (mercado transfronterizo B2B y B2C: España, Alemania, resto de la UE). | Verificado en la aplicación pública | El servicio se ofrece activamente en español, inglés y alemán, con facturación en euros. |

---

## 2. Papel Contractual y Operativo Real por Producto

PrintPrice Pro no opera bajo un único rol jurídico homogéneo. Cada componente de la plataforma presenta una naturaleza jurídica y contractual diferenciada que debe quedar reflejada en los términos de servicio:

| Producto / Herramienta | Función Técnica Real | Calificación Jurídica y Contractual | ¿Quién vende, factura y cobra? | Relación con Datos Personales |
| :--- | :--- | :--- | :--- | :--- |
| **Price it** (/products/budget) | Motor de cálculo algorítmico de presupuestos de impresión de libros y encuadernación. | **Prestación de servicios de software SaaS de cálculo técnico.** | PrintPrice Pro SIA proporciona el cálculo (actualmente de libre acceso en web; facturación de API sujeta a modelo B2B). | PrintPrice actúa como **Responsable del tratamiento** de los datos de contacto y parámetros del proyecto. |
| **Fix it** (/products/preflight) | Inspección determinista de archivos PDF (cajas, tintas, fuentes, resoluciones, perfiles PDF/X). | **Prestación de servicios SaaS de validación técnica documental.** | PrintPrice Pro SIA suministra el software de análisis. No garantiza conformidad física final en máquina ajena. | Si el PDF contiene datos personales (autor, biografías, créditos), PrintPrice actúa como **Encargado del tratamiento** (DPA aplicable). |
| **Print it** (/platform) | Marketplace que conecta pedidos de impresión con talleres industriales asociados de la red. | **Intermediario de plataforma de comercio electrónico / Marketplace multilateral.** | **La imprenta seleccionada vende y cobra directamente al cliente.** PrintPrice **no cobra ni custodia fondos de fabricación**; factura mensualmente a la imprenta su comisión del 4%. | Corresponsabilidad o cesión legítima B2B: PrintPrice transmite el archivo y la orden técnica a la imprenta para ejecutar el contrato de impresión. |
| **Mockup 3D** (/products/mockup) | Visualizador digital 3D del lomo y portada del libro basado en WebGL. | **Herramienta complementaria de asistencia visual no vinculante.** | Software complementario integrado en la plataforma. | Tratamiento puramente local de la textura en el navegador del usuario. |
| **Control Plane** (/control-plane) | Panel de gestión industrial y cotización para imprentas y distribuidores de papel. | **Plataforma SaaS B2B de gestión operativa y suscripción.** | PrintPrice Pro SIA formaliza contrato de adhesión con cada taller o proveedor. | PrintPrice es Encargado del tratamiento respecto a los clientes finales gestionados por el taller. |

---

## 3. Mapa de Proveedores de Infraestructura, Pagos, Analítica e IA

| Área | Proveedor Real Verificado | Ubicación de Servidores | Base de Transferencia | Estado de Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Alojamiento Web y Cómputo** | Servidor dedicado / VPS bajo panel Plesk Obsidian (IP: 212.227.79.67 - IONOS SE). | Alemania / Unión Europea | Tratamiento dentro del EEE (Reglamento UE 2016/679). No hay transferencia internacional de infraestructura. | **CONFIRMADO TÉCNICAMENTE** (auditoría de red y cabeceras de servidor). |
| **Pasarela de Pagos (Comisiones)** | Facturación mensual directa B2B mediante transferencia bancaria SEPA o pasarela bancaria. | Espacio Económico Europeo (SEPA) | Sin transferencia fuera del EEE. | **CONFIRMADO EN MODELO COMERCIAL** (comisión del 4% liquidada mensualmente por la imprenta). |
| **Cobro de Fabricación al Cliente** | Pasarela de cobro propia de cada imprenta (Stripe, Redsys, transferencia, etc.). | Depende de cada taller | La imprenta es la receptora directa del cobro. PrintPrice no interviene en la pasarela del taller. | **CONFIRMADO EN MODELO COMERCIAL**. |
| **Analítica y Métricas** | Telemetría técnica interna propia (*first-party*), almacenada en localStorage del cliente. | Almacenamiento local en el navegador del usuario; sin reenvío a SDKs externos. | No aplica transferencia internacional (cero datos enviados a servidores externos de tracking). | **CONFIRMADO TÉCNICAMENTE** (auditoría Playwright de solicitudes de red). |
| **Servicios de Inteligencia Artificial** | Superficie prototipo de agente autónomo (/ai-agent) y motor de maquetas 3D. | Inferencia externa no acreditada contractualmente en este repositorio. | **PENDIENTE DE AUDITAR DPA.** Se retiran menciones a proveedores concretos (p. ej. Vertex AI) hasta contar con DPA vinculante. | **INVESTIGADO / PENDIENTE DE CONTRATO**. |

---

## 4. Datos Personales Tratados, Finalidades y Plazos de Conservación

| Categoría de Datos | Finalidad Principal | Base Jurídica (RGPD) | Plazo de Conservación |
| :--- | :--- | :--- | :--- |
| **Datos de contacto y cuenta** (Nombre, email, teléfono, razón social, CIF/NIF). | Gestión de cuentas de usuario, acceso a la plataforma y comunicaciones de soporte. | Art. 6.1.b (Ejecución del contrato de servicio). | Durante la vigencia de la relación contractual más los plazos legales de prescripción mercantil y fiscal (5-6 años). |
| **Parámetros técnicos de proyectos** (Dimensiones, páginas, encuadernación, papeles). | Cálculo de presupuestos, optimización de pliegos y generación de presupuestos. | Art. 6.1.b (Medidas precontractuales a petición del interesado). | En sesión local hasta guardado voluntario; en cuenta registrada, mientras permanezca activa. |
| **Archivos de impresión (PDF, cubiertas, imágenes)**. | Análisis sintáctico de preflight y transmisión al taller adjudicatario para imprimir la tirada. | Art. 6.1.b (Ejecución del contrato de preflight e impresión). | Archivos temporales de preflight: purgado a las 24-72h tras emitir el informe. Pedidos confirmados: conservados hasta la entrega final y conformidad técnica del cliente. |
| **Datos de facturación de comisiones** (Facturas B2B imprenta-PrintPrice, 4%). | Emisión y cobro de la comisión mensual de marketplace. | Art. 6.1.c (Cumplimiento de obligaciones legales y tributarias). | Plazo legal de conservación de libros contables y fiscales (según derecho letón y directivas de la UE, mín. 5 años). |
| **Datos de telemetría técnica de navegación** (Latencia, clics de conversión, eventos). | Mejora del rendimiento de cálculo y usabilidad de la interfaz web. | Art. 6.1.a (Consentimiento expreso otorgado a través del banner de cookies). | Purgado inmediato al revocar el consentimiento; máximo 100 eventos locales en el dispositivo del usuario. |

---

## 5. Brechas Jurídicas Identificadas y Acciones de Mitigación

1. **Brecha 1: Imputación errónea de la responsabilidad de fabricación:**  
   - *Riesgo:* Si los términos públicos presentaban a PrintPrice como vendedor directo del libro físico, los clientes podían reclamar desistimientos, defectos de encuadernación o retrasos logísticos contra PrintPrice Pro SIA.  
   - *Mitigación:* Se redactan las Condiciones de Uso y las Condiciones Específicas de Marketplace dejando nítidamente establecido que la imprenta es el fabricante y vendedor responsable directo de la mercancía, asumiendo las obligaciones de entrega y garantía legal de conformidad.
2. **Brecha 2: Modelo de comisiones ambiguo en textos previos:**  
   - *Riesgo:* Contradicción entre cláusulas antiguas de «cuotas fijas», «pruebas gratuitas de 14 días» y el modelo real del 4%.  
   - *Mitigación:* Se fija en todos los borradores el modelo único aprobado: comisión del 4% sobre la base de producción facturada directamente por el taller, liquidada de forma mensual por PrintPrice.
3. **Brecha 3: Declaraciones de IA no respaldadas:**  
   - *Riesgo:* Incurrir en publicidad engañosa al declarar «zero data retention» o «alojamiento de modelos en la UE» sin poseer los acuerdos contractuales B2B con los proveedores de inferencia de modelos generativos.  
   - *Mitigación:* Se ha redactado la Política de Transparencia de IA separando estrictamente el software determinista (cálculo y preflight, 100% auditable y local) de las herramientas de renderizado o asistencia asistida, marcando como pendientes las declaraciones de no entrenamiento público hasta la firma del DPA corporativo con el proveedor del modelo.
4. **Brecha 4: Derechos imperativos de los consumidores:**  
   - *Riesgo:* Nulidad de cláusulas de jurisdicción que sometían a particulares al fuero exclusivo de Riga.  
   - *Mitigación:* Reconocimiento expreso del fuero del domicilio del consumidor para personas físicas (B2C), preservando el sometimiento a los tribunales de Riga para relaciones estrictamente profesionales e industriales (B2B).
