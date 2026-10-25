# Estado Legal Actual, Inventario de Datos Reales y Brechas (Current State & Gaps)

**Fecha de consolidación:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Ámbito:** Diagnóstico exhaustivo del marco corporativo, operativo y contractual de PrintPrice Pro frente a la realidad técnica desplegada.  
**Nota de alcance lingüístico:** La documentación comparativa (`COMPARISON_COPY_ES_EN_DE.md`) está completada íntegramente en ES, EN y DE. Los 11 borradores de políticas legales están redactados en español como documentos de trabajo interno, incorporando encabezados trilingües indicativos de estado.

---

## 1. Identificación de la Entidad Operadora y Datos Registrales

| Parámetro | Dato Documentado en Borradores | Estado de Verificación | Brecha / Cuestión Pendiente |
| :--- | :--- | :--- | :--- |
| **Denominación Social** | Print Price Pro SIA | Documentado en borradores internos | Pendiente de cotejo administrativo con la base del Registro de Empresas de Letonia (*Uzņēmumu reģistrs*). No se exige formalismo notarial extraordinario, sino verificación oficial ordinaria. |
| **Forma Jurídica** | Sociedad de Responsabilidad Limitada (*Sabiedrība ar ierobežotu atbildību* — SIA) | Documentado en borradores | Pendiente de ratificación societaria. |
| **Registro Mercantil** | N.º 40203631570 | Documentado en borradores | Pendiente de cotejo contra la base pública del Registro Mercantil letón (*Lursoft / Uzņēmumu reģistrs*). |
| **NIF / IVA (VAT ID)** | LV40203631570 | Documentado en borradores | Pendiente de validación de estatus VIES (IVA intracomunitario) en la base de la Comisión Europea. |
| **Domicilio Social** | Bruņinieku iela 60-8, Latgales priekšpilsēta, Rīga, LV-1009, Letonia | Documentado en borradores | Pendiente de confirmación de sede social efectiva vs domicilio postal de notificaciones. |
| **Contactos Oficiales** | info@printprice.pro (General)<br>privacy@printprice.pro (Privacidad / Cumplimiento)<br>claims@printprice.pro (Reclamaciones e Incidencias) | Verificado en configuración de correo del dominio | Las cuentas están configuradas operativamente en el servidor de correo del dominio printprice.pro. |
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
| **Mockup 3D** (/products/mockup) | Visualizador digital 3D del lomo y portada del libro basado en WebGL/Three.js. Cero componentes de IA. | **Herramienta complementaria de asistencia visual no vinculante.** | Software complementario integrado en la plataforma. | Tratamiento puramente local de la textura y geometría en el navegador del usuario. Cero envío de imágenes a servidores externos. |
| **Control Plane** (/control-plane) | Panel de gestión industrial y cotización para imprentas y distribuidores de papel. | **Plataforma SaaS B2B de gestión operativa y suscripción.** | PrintPrice Pro SIA formaliza contrato de adhesión con cada taller o proveedor. | PrintPrice es Encargado del tratamiento respecto a los clientes finales gestionados por el taller. |

---

## 3. Mapa de Proveedores de Infraestructura, Pagos, Analítica e IA

| Área | Proveedor y Ubicación | Servicios Externos y Destinatarios | Accesos de Soporte y Transferencias | Estado de Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Alojamiento Web y Cómputo** | Servidor dedicado / VPS bajo panel Plesk Obsidian (IP: `212.227.79.67` - IONOS SE, Alemania / UE). Ubicación concreta en centro de datos de Fráncfort am Main clasificada como **[PENDIENTE DE EVIDENCIA CONTRACTUAL U OPERATIVA]**. | Tráfico web de la plataforma corporativa, Fastify Preflight, Node.js y MySQL. | Acceso SSH/Plesk para mantenimiento técnico. | **[CONFIGURACIÓN DE PRODUCCIÓN COMPROBADA]:** IP en Alemania asignada a IONOS SE. Contrato de hosting con DPA europeo y política de copias de seguridad clasificados como **[PENDIENTE DE AUDITORÍA CONTRACTUAL Y TÉCNICA]**. |
| **Pasarela de Pagos (Comisiones)** | Liquidación mensual B2B mediante SEPA o transferencia bancaria en la UE. | Entidad financiera receptora de la liquidación de la comisión del 4 %. | Sin pasarelas externas no comunitarias vinculadas. | **[PROPUESTA SUJETA A CONTRATACIÓN Y DEFINICIÓN OPERATIVA]**. |
| **Pasarela de Suscripciones SaaS B2B** | Stripe, Inc. (Irlanda / EE. UU.). | Cobro de planes mensuales de software para imprentas (`adminBilling.js`). | Integración en código; modo fail-closed en staging. | **[CÓDIGO OBSERVADO EN B2B; INACTIVO EN PRODUCCIÓN]**. |
| **Cobro de Fabricación al Cliente** | Pasarela de cobro directa de cada imprenta adjudicataria. | La imprenta asociada cobra directamente al cliente final. | PrintPrice es completamente ajena al cobro de producción. | **CONFIRMADO EN MODELO COMERCIAL** (cobro directo imprenta-cliente). |
| **Analítica y Métricas** | Telemetría técnica interna propia (*first-party*), almacenada en `localStorage`. | Dispositivo local del usuario; sin reenvío a SDKs externos de analítica. | Cero proveedores terceros de tracking. | **CONFIRMADO TÉCNICAMENTE** (auditoría Playwright de solicitudes de red y almacenamiento local). |
| **Seguridad de Red y Protección Anti-Bots** | Cloudflare, Inc. (Red Anycast Global). | Direcciones IP y cabeceras si se activan Turnstile o Web Analytics. | Autorizado en cabeceras CSP de `proxy.ts`. | **[CÓDIGO OBSERVADO EN CSP]**: Autorizado en directivas CSP de `proxy.ts`. Elemento visual de Turnstile en onboarding es un placeholder sin integración activa.<br>**[PENDIENTE DE CORRECCIÓN EN FRONTEND]:** Retirar indicador decorativo «Cloudflare Turnstile Verified» en `PartnerOnboardingFlow.tsx` al no existir verificación funcional que justifique mostrarlo. |
| **Servicios de Inteligencia Artificial** | • **Fix it (Preflight):** CERO proveedores de IA en el código analizado. 100% determinista local (`gs`, `qpdf`, `mutool`, `pdfinfo`).<br>• **Control Plane B2B:** Google LLC (Gemini Developer API, modelo `gemini-3.5-flash` vía `aiProviderAdapter.js`) para calibración de presupuestos. | Inferencia lingüística sobre fragmentos de texto de presupuestos B2B. | Transferencia a servidores de Google sujeta a SCCs. | **[CÓDIGO OBSERVADO EN B2B]:** Requiere evaluar condiciones del servicio utilizado (distinguiendo no entrenamiento de retención cero) y formalizar DPA europeo antes del lanzamiento comercial. Garantías generales en todo el ecosistema requieren evidencia adicional. |

---

## 4. Datos Personales Tratados, Finalidades y Plazos de Conservación

| Categoría de Datos | Finalidad Principal | Base Jurídica (RGPD) | Plazo de Conservación |
| :--- | :--- | :--- | :--- |
| **Datos de contacto y cuenta** (Nombre, email, teléfono, razón social, CIF/NIF). | Gestión de cuentas de usuario, acceso a la plataforma y comunicaciones de soporte. | Art. 6.1.b (Ejecución del contrato de servicio). | Durante la vigencia de la relación contractual más los plazos legales de prescripción mercantil y fiscal (5-6 años). |
| **Parámetros técnicos de proyectos** (Dimensiones, páginas, encuadernación, papeles). | Cálculo de presupuestos, optimización de pliegos y generación de presupuestos. | Art. 6.1.b (Medidas precontractuales a petición del interesado). | En sesión local hasta guardado voluntario; en cuenta registrada, mientras permanezca activa. |
| **Archivos de impresión (PDF, cubiertas, imágenes)**. | Análisis sintáctico de preflight y transmisión al taller adjudicatario para imprimir la tirada. | Art. 6.1.b (Ejecución del contrato de preflight e impresión). | **[CÓDIGO OBSERVADO: RETENCIÓN TEMPORAL PROGRAMADA POR WORKER]:**<br>Los archivos de preflight se almacenan temporalmente en disco local (`PPOS_UPLOADS_DIR`) organizados por inquilino y trabajo. El worker recurrente `StorageCleanupWorker` ejecuta una purga horaria para trabajos con `status IN ('COMPLETED', 'FAILED')` y antigüedad `created_at < NOW() - INTERVAL 24 HOUR`. **La descarga del archivo no dispara su borrado**, y el cómputo inicia con la creación del registro. Pedidos confirmados en taller: conservados conforme a las condiciones de la imprenta adjudicataria. |
| **Datos de facturación de comisiones** (Facturas B2B imprenta-PrintPrice, 4%). | Emisión y cobro mensual de la comisión del 4 % de marketplace. | Art. 6.1.c (Cumplimiento de obligaciones legales y tributarias). | Plazo legal de conservación de libros contables y fiscales (según derecho letón y directivas de la UE, mín. 5 años). |
| **Datos de telemetría técnica de navegación** (Latencia, clics de conversión, eventos). | Mejora del rendimiento de cálculo y usabilidad de la interfaz web. | Art. 6.1.a (Consentimiento expreso otorgado a través del banner de cookies). | Purgado inmediato al revocar el consentimiento; máximo 100 eventos locales en el dispositivo del usuario (`ppos_telemetry_history`). |

---

## 5. Brechas Jurídicas Identificadas y Acciones de Mitigación

1. **Brecha 1: Imputación errónea de la responsabilidad de fabricación:**  
   - *Riesgo:* Si los términos públicos presentaban a PrintPrice como vendedor directo del libro físico, los clientes podían reclamar desistimientos, defectos de encuadernación o retrasos logísticos contra PrintPrice Pro SIA.  
   - *Mitigación:* Se redactan las Condiciones de Uso y las Condiciones Específicas de Marketplace dejando nítidamente establecido que la imprenta es el fabricante y vendedor responsable directo de la mercancía, asumiendo las obligaciones de entrega y garantía legal de conformidad.
2. **Brecha 2: Modelo de comisiones ambiguo en textos previos:**  
   - *Riesgo:* Contradicción entre cláusulas antiguas de «cuotas fijas», «pruebas gratuitas de 14 días» y el modelo real del 4%.  
   - *Mitigación:* Se fija en todos los borradores el modelo comercial **aprobado formalmente por el propietario el 25/10/2026**: (1) Comisión del 4 % sobre el importe neto de impresión y acabados, excluyendo expresamente transporte desglosado e impuestos; (2) Devengo sobre importes efectivamente cobrados por la imprenta (con cobro proporcional en pagos parciales); (3) Exclusión de comisión sobre importes devueltos o cantidades no efectivamente cobradas (si posteriormente se cobran, generan comisión en el ciclo aplicable), practicando ajuste de devoluciones en la siguiente liquidación mensual; (4) Obligación de la imprenta de registrar cobros y devoluciones para permitir la conciliación periódica. Constan como pendientes de definición operativa los requisitos de soporte documental, el mecanismo de conciliación en Control Plane, el día de emisión/cierre, el vencimiento de factura y el tratamiento de conceptos no desglosados, así como las tarifas de herramientas web/API y Paper Supplier.
3. **Brecha 3: Declaraciones de IA no respaldadas:**  
   - *Riesgo:* Incurrir en publicidad engañosa al declarar «zero data retention» o «alojamiento de modelos en la UE» sin poseer los acuerdos contractuales B2B con los proveedores de inferencia de modelos generativos, o clasificar erróneamente renderizadores WebGL como IA.  
   - *Mitigación:* Se ha redactado la Política de Transparencia de IA separando estrictamente el software determinista (cálculo, preflight y renderizado 3D WebGL, 100% auditable y local) de las herramientas de asistencia conversacional generativa, marcando como pendientes las declaraciones de no entrenamiento público hasta la firma del DPA corporativo con el proveedor del modelo.
4. **Brecha 4: Derechos imperativos de los consumidores:**  
   - *Riesgo:* Nulidad de cláusulas de jurisdicción que sometían a particulares al fuero exclusivo de Riga.  
   - *Mitigación:* Reconocimiento expreso del fuero del domicilio del consumidor para personas físicas (B2C), preservando el sometimiento a los tribunales de Riga para relaciones estrictamente profesionales e industriales (B2B).
5. **Brecha 5: Contradicción pública sobre el borrado y entorno de archivos de Preflight:**  
   - *Riesgo:* `app/products/preflight/page.tsx` y `app/legal/privacy-policy/page.tsx` afirman que los archivos se borran «tras la descarga o generación del informe» y que operan en «entornos volátiles». La realidad de `ppos-preflight-service` demuestra que se almacenan temporalmente en disco con una purga periódica cada 1 hora para trabajos de más de 24 horas desde su creación. Esto expone a PrintPrice a inconsistencias frente al Art. 5.1.d del RGPD y publicidad engañosa.  
   - *Mitigación:* Preparar redacciones revisadas en los tres idiomas para reflejar con veracidad la retención temporal programada y el aislamiento lógico por trabajo, retirando términos absolutos como «entornos volátiles», «improrrogable», «sin conservación indefinida» o «TLS 1.3 en el análisis» (ver propuesta detallada en `AUDIT_FILE_PROCESSING_AND_PROVIDERS.md`).
6. **Brecha 6: Incertidumbre sobre el alcance de copias de seguridad (Backups):**  
   - *Riesgo:* Al residir los archivos temporales en disco del servidor durante el intervalo del worker, se desconoce si las copias de seguridad de Plesk Obsidian o snapshots del servidor en IONOS SE abarcan la ruta temporal de preflight, lo que podría prolongar la existencia residual de archivos en respaldos.  
   - *Mitigación:* Auditar la configuración de copias de seguridad en Plesk Obsidian y el hipervisor de IONOS SE para verificar si existen exclusiones activas o si procede configurarlas.
7. **Brecha 7: Indicador decorativo de Cloudflare Turnstile en onboarding:**  
   - *Riesgo:* Mostrar «Cloudflare Turnstile Verified» en el formulario sin una validación funcional activa induce a confusión sobre las comprobaciones de seguridad realmente ejecutadas.  
   - *Mitigación:* Registrar como corrección de frontend pendiente la retirada de este elemento decorativo sin implementar Turnstile por iniciativa propia.
8. **Brecha 8: Desconexión de correspondencia entre commits inspeccionados y versiones en producción:**  
   - *Riesgo:* Asumir que la versión en producción ejecuta exactamente el código de los repositorios locales inspeccionados sin comprobación de hashes/tags de despliegue.  
   - *Mitigación:* Registrar como pendiente operativo el cotejo entre los Git commit SHAs inspeccionados y los artefactos desplegados en cada servicio.
