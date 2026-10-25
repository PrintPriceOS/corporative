# Registro de Afirmaciones Comparativas Publicas (Claims Register)

**Fecha de consolidacion:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Ambito:** Todas las afirmaciones comparativas publicas presentes en app/page.tsx y app/products/preflight/page.tsx.

---

## 1. Metodologia de Clasificacion y Tipologia

Cada afirmacion comparativa publica esta identificada de forma univoca con un identificador estable y clasificada bajo las siguientes tipologias tecnicas:
- **FUNC (Funcionalidad):** Capacidad tecnica o de proceso operativo soportada por la herramienta o plataforma.
- **DISP (Disponibilidad / Despliegue):** Entorno de ejecucion, requisitos de instalacion, canal de acceso o despliegue.
- **CERT (Certificacion / Estandar):** Cumplimiento formal de especificaciones internacionales (ISO, GWG) o certificacion formal por organismo acreditador.
- **MODL (Modelo Comercial / Operativo):** Estructura de contratacion, relacion juridica, intermediacion o fijacion de tarifas.
- **UX (Experiencia de Usuario / Usabilidad):** Nivel tecnico exigido al usuario, legibilidad de informes o curva de aprendizaje.

---

## 2. Bloque 1: Comparativas de la Pagina Principal (app/page.tsx)

### 2.1. Tab 1: PRICE IT -- Calculo y Presupuestacion

| ID | Dimension / Criterio | Productos / Modalidades Comparadas | Textos Actuales (ES / EN / DE) | Tipo |
|---|---|---|---|:---:|
| **CMP-PRICE-01** | Calculo de presupuesto inmediato sin registro | - PrintPrice: Budget (Web SaaS)<br>- Tradicional: Cotizacion manual / taller<br>- Lulu: Lulu Direct / Creator Hub<br>- Gelato: Gelato POD Platform | - ES: «Disponible» vs «Varia segun proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfugbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC / MODL |
| **CMP-PRICE-02** | Desglose transparente entre impresion y papel | - PrintPrice: Budget (Matrices servidor)<br>- Tradicional: Presupuesto de imprenta<br>- Lulu: Calculadora de producto cerrado<br>- Gelato: Catalogo POD cerrado | - ES: «Disponible» vs «Varia segun proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfugbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC / MODL |
| **CMP-PRICE-03** | Optimizacion de tecnologia digital vs offset segun volumen | - PrintPrice: Algoritmo de imposicion y coste<br>- Tradicional: Estimacion manual de taller<br>- Lulu: Modelo POD digital unitario<br>- Gelato: Red POD digital distribuida | - ES: «Disponible» vs «Varia segun proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfugbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC |
| **CMP-PRICE-04** | Tarifas y capacidades calibradas por talleres adscritos | - PrintPrice: Control Plane / Costes horarios reales<br>- Tradicional: Tarifas de taller ad-hoc<br>- Lulu: Tarifas centralizadas de plataforma<br>- Gelato: Tarifas fijas de red comercial | - ES: «Disponible» vs «Varia segun proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfugbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | MODL / FUNC |
| **CMP-PRICE-05** | Ficha tecnica verificada y vinculada a la orden | - PrintPrice: Especificacion tecnica inmutable<br>- Tradicional: Hoja de ruta / albaran manual<br>- Lulu: Especificacion de pedido cerrada<br>- Gelato: Orden de produccion de red | - ES: «Disponible» vs «Varia segun proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfugbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC |

---

### 2.2. Tab 2: FIX IT -- Preflight y Preparacion de PDF

| ID | Dimension / Criterio | Productos / Modalidades Comparadas | Textos Actuales (ES / EN / DE) | Tipo |
|---|---|---|---|:---:|
| **CMP-FIX-01** | Comprobacion web directa sin instalacion de software | - PrintPrice: Fix it Web SaaS<br>- Adobe: Acrobat Pro (Escritorio)<br>- Enfocus: PitStop Pro (Plugin)<br>- callas: pdfToolbox (Servidor / CLI) | - ES: «Disponible» vs «Aplicacion escritorio» vs «Plugin / Servidor» vs «Servidor / CLI / SDK»<br>- EN: «Available» vs «Desktop app» vs «Plugin / Server» vs «Server / CLI / SDK»<br>- DE: «Verfugbar» vs «Desktop-Anwendung» vs «Plugin / Server» vs «Server / CLI / SDK» | DISP |
| **CMP-FIX-02** | Deteccion perimetral de sangres segun perfil de produccion | - PrintPrice: Deteccion de cajas y sangrado<br>- Adobe: Acrobat Preflight profiles<br>- Enfocus: PitStop Action Lists<br>- callas: pdfToolbox Check profiles | - ES: «Disponible» en los cuatro motores<br>- EN: «Available» en los cuatro motores<br>- DE: «Verfugbar» en los cuatro motores | FUNC |
| **CMP-FIX-03** | Auditoria de resolucion efectiva con localizacion por pagina | - PrintPrice: Inspeccion de DPI por imagen y pagina<br>- Adobe: Acrobat Preflight (DPI)<br>- Enfocus: PitStop Pro (DPI inspector)<br>- callas: pdfToolbox (Resolution check) | - ES: «Disponible» en los cuatro motores<br>- EN: «Available» en los cuatro motores<br>- DE: «Verfugbar» en los cuatro motores | FUNC |
| **CMP-FIX-04** | Diagnostico accesible sin tecnicismos complejos | - PrintPrice: Avisos orientados a creadores/editores<br>- Adobe: Panel tecnico de comprobaciones<br>- Enfocus: Reporte tecnico de preimpresion<br>- callas: Informes XML/PDF para especialistas | - ES: «Disponible» vs «Varia segun usuario» vs «Varia segun usuario» vs «Varia segun usuario»<br>- EN: «Available» vs «Varies by user» vs «Varies by user» vs «Varies by user»<br>- DE: «Verfugbar» vs «Variiert je nach Anwender» vs «Variiert je nach Anwender» vs «Variiert je nach Anwender» | UX |
| **CMP-FIX-05** | Correccion geometrica asistida de sangrado (BleedBox) | - PrintPrice: Expansion asistida de cajas PDF<br>- Adobe: Fixups automaticos Acrobat<br>- Enfocus: Generacion automatica de sangres<br>- callas: Process Plans de sangrado | - ES: «Disponible» vs «Varia segun edicion» vs «Disponible» vs «Disponible»<br>- EN: «Available» vs «Varies by edition» vs «Available» vs «Available»<br>- DE: «Verfugbar» vs «Variiert nach Edition» vs «Verfugbar» vs «Verfugbar» | FUNC |
| **CMP-FIX-06** | Firma tecnica del informe vinculada a produccion | - PrintPrice: Hash y vinculacion a orden taller<br>- Adobe: Certificacion digital PDF / firma<br>- Enfocus: Enfocus Switch / integracion<br>- callas: Integracion via API / CLI | - ES: «Disponible» vs «No verificado» vs «Varia segun integracion» vs «Varia segun integracion»<br>- EN: «Available» vs «Not verified» vs «Varies by integration» vs «Varies by integration»<br>- DE: «Verfugbar» vs «Nicht verifiziert» vs «Variiert nach Integration» vs «Variiert nach Integration» | FUNC / MODL |

---

### 2.3. Tab 3: PRINT IT -- Marketplace y Produccion Grafica

| ID | Dimension / Criterio | Productos / Modalidades Comparadas | Textos Actuales (ES / EN / DE) | Tipo |
|---|---|---|---|:---:|
| **CMP-PRINT-01** | Modelo de servicio | - PrintPrice: Marketplace directo con talleres<br>- Plataformas POD: Impresion bajo demanda cerrada<br>- Tradicional: Intermediacion / broker grafico | - ES: «Directo con talleres» vs «Varia segun plataforma» vs «Varia segun proveedor»<br>- EN: «Direct with partner plants» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Direkt mit Partnerbetrieben» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | MODL |
| **CMP-PRINT-02** | Seleccion de imprenta | - PrintPrice: Enrutamiento tecnico Matchmaker<br>- Plataformas POD: Asignacion interna de red POD<br>- Tradicional: Seleccion manual de broker | - ES: «Enrutamiento tecnico» vs «Varia segun plataforma» vs «Varia segun proveedor»<br>- EN: «Technical routing» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Technische Zuweisung» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | FUNC / MODL |
| **CMP-PRINT-03** | Presupuestacion | - PrintPrice: Inmediata en servidor (Budget)<br>- Plataformas POD: Catalogo cerrado / cotizador API<br>- Tradicional: Cotizacion bajo peticion / manual | - ES: «Inmediata en servidor» vs «Varia segun plataforma» vs «Varia segun proveedor»<br>- EN: «Instant server calculation» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Sofortige Server-Kalkulation» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | FUNC |
| **CMP-PRINT-04** | Preparacion de archivos | - PrintPrice: Preflight asistido en navegador<br>- Plataformas POD: Validador web de plataforma<br>- Tradicional: Revision en departamento de preimpresion | - ES: «Preflight en navegador» vs «Varia segun plataforma» vs «Varia segun proveedor»<br>- EN: «In-browser preflight» vs «Varies by platform» vs «Varies by provider»<br>- DE: «In-Browser Preflight» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | FUNC / DISP |
| **CMP-PRINT-05** | Pedido y seguimiento | - PrintPrice: Orden tecnica vinculada a planta<br>- Plataformas POD: Seguimiento en portal o tracking de paquete<br>- Tradicional: Albaran de entrega y contacto comercial | - ES: «Orden y registro tecnico» vs «Varia segun plataforma» vs «Varia segun proveedor»<br>- EN: «Order & technical log» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Auftrag & technisches Protokoll» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | MODL / FUNC |
| **CMP-PRINT-06** | Integraciones | - PrintPrice: REST API y Control Plane de planta<br>- Plataformas POD: Plugins e-commerce (Shopify/Woo) / API<br>- Tradicional: Intercambio de archivos / ERPs | - ES: «API REST y Control Plane» vs «Varia segun plataforma» vs «Varia segun proveedor»<br>- EN: «REST API & Control Plane» vs «Varies by platform» vs «Varies by provider»<br>- DE: «REST-API & Control Plane» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | DISP / FUNC |

---

## 3. Bloque 2: Comparativas de Preflight (app/products/preflight/page.tsx)

### 3.1. Tabla A: Particulares y Editoriales

| ID | Criterio | Soluciones Comparadas | Textos Actuales (ES / EN / DE) | Tipo |
|---|---|---|---|:---:|
| **CMP-PRE-A01** | Forma de acceso | - PrintPrice: Preflight Web SaaS<br>- Adobe: Acrobat Pro (Win/Mac)<br>- Enfocus: PitStop Pro (Plugin Acrobat) | - ES: «Disponible (Navegador web SaaS)» vs «Disponible (Escritorio local)» vs «Disponible (Plugin Acrobat)»<br>- EN: «Available (Web browser SaaS)» vs «Available (Local desktop)» vs «Available (Plugin inside Acrobat)»<br>- DE: «Verfugbar (Webbrowser SaaS)» vs «Verfugbar (Lokaler Desktop)» vs «Verfugbar (Plugin in Acrobat)» | DISP |
| **CMP-PRE-A02** | Instalacion requerida | - PrintPrice: Sin instalacion<br>- Adobe: Instalacion Acrobat Pro / CC<br>- Enfocus: Instalacion Acrobat + PitStop | - ES: «No aplica (Cero instalacion local)» vs «Disponible (Requiere Acrobat Pro y CC)» vs «Disponible (Requiere Acrobat + plugin)»<br>- EN: «Not applicable (Zero local install)» vs «Available (Requires Acrobat Pro/CC)» vs «Available (Requires Acrobat + plugin)»<br>- DE: «Nicht zutreffend (Keine Installation)» vs «Verfugbar (Erfordert Acrobat Pro/CC)» vs «Verfugbar (Erfordert Acrobat + Plugin)» | DISP |
| **CMP-PRE-A03** | Conocimientos necesarios | - PrintPrice: Nivel accesible<br>- Adobe: Nivel medio/avanzado<br>- Enfocus: Especialista de preimpresion | - ES: «Disponible (Accesible)» vs «Disponible (Medio/avanzado)» vs «Disponible (Especialista preimpresion)»<br>- EN: «Available (Accessible)» vs «Available (Intermediate/advanced)» vs «Available (Prepress specialist)»<br>- DE: «Verfugbar (Verstandlich)» vs «Verfugbar (Mittel/fortgeschritten)» vs «Verfugbar (Druckvorstufen-Spezialist)» | UX |
| **CMP-PRE-A04** | Lectura del informe | - PrintPrice: Informe web interactivo<br>- Adobe: Panel modal en pantalla / exportacion PDF/XML<br>- Enfocus: Navegador con resaltado interactivo | - ES: «Disponible» en los tres motores con descripcion diferencial<br>- EN: «Available» en los tres motores con descripcion diferencial<br>- DE: «Verfugbar» en los tres motores con descripcion diferencial | UX / FUNC |
| **CMP-PRE-A05** | Correccion y edicion | - PrintPrice: Ajustes deterministas de cajas sin edicion vectorial<br>- Adobe: Fixups predefinidos y edicion basica<br>- Enfocus: Edicion quirurgica vectorial y tipografica | - ES: «Depende de edicion o configuracion» vs «Disponible» vs «Disponible»<br>- EN: «Plan or configuration dependent» vs «Available» vs «Available»<br>- DE: «Editions- oder konfigurationsabhangig» vs «Verfugbar» vs «Verfugbar» | FUNC |
| **CMP-PRE-A06** | Modelo de acceso comercial | - PrintPrice: Portal web y API tecnica<br>- Adobe: Suscripcion mensual/anual Creative Cloud o Acrobat Pro<br>- Enfocus: Suscripcion anual o licencia perpetua con mantenimiento | - ES: «Disponible» en los tres con especificacion de modelo<br>- EN: «Available» en los tres con especificacion de modelo<br>- DE: «Verfugbar» en los tres con especificacion de modelo | MODL |

---

### 3.2. Tabla B: Flujos Profesionales e Imprentas

| ID | Dimension | Soluciones Comparadas | Textos Actuales (ES / EN / DE) | Tipo |
|---|---|---|---|:---:|
| **CMP-PRE-B01** | Perfiles configurables | - PrintPrice Preflight OS: Contratos JSON deterministas<br>- Enfocus PitStop Server: Action Lists configurables via GUI PitStop Pro<br>- callas pdfToolbox Server: Process Plans con logica condicional y JS | - ES: «Disponible» en los tres motores con especificacion tecnica<br>- EN: «Available» en los tres motores con especificacion tecnica<br>- DE: «Verfugbar» en los tres motores con especificacion tecnica | FUNC |
| **CMP-PRE-B02** | Comprobacion de perfiles y estandares PDF/X | - PrintPrice Preflight OS: Inspeccion tecnica ISO PDF/X-1a y PDF/X-4; sin certificacion de producto<br>- Enfocus PitStop Server: Perfiles de preflight PDF/X y GWG; certificacion de producto no verificada por version<br>- callas pdfToolbox Server: Process Plans PDF/X y GWG; certificacion de producto no verificada por version | - ES: «Disponible (Inspeccion tecnica)» vs «Disponible (Perfiles de preflight) - Certificacion formal: No verificada para version especifica» vs «Disponible (Perfiles de preflight) - Certificacion formal: No verificada para version especifica»<br>- EN: «Available (Technical inspection)» vs «Available (Preflight profiles) - Formal product certification: Not verified for specific version» vs «Available (Preflight profiles) - Formal product certification: Not verified for specific version»<br>- DE: «Verfugbar (Technische Prufung)» vs «Verfugbar (Preflight-Profile) - Formelle Produktzertifizierung: Nicht verifiziert fur spezifische Version» vs «Verfugbar (Preflight-Profile) - Formelle Produktzertifizierung: Nicht verifiziert fur spezifische Version» | CERT / FUNC |
| **CMP-PRE-B03** | Procesamiento por lotes | - PrintPrice Preflight OS: Microservicios asincronos y colas Redis<br>- Enfocus PitStop Server: Motor multihilo para colas concurrentes locales<br>- callas pdfToolbox Server: Motor multinucleo para alto volumen de paginas | - ES: «Disponible» en los tres motores con descripcion de arquitectura<br>- EN: «Available» en los tres motores con descripcion de arquitectura<br>- DE: «Verfugbar» en los tres motores con descripcion de arquitectura | FUNC / DISP |
| **CMP-PRE-B04** | Carpetas calientes (Hot Folders) | - PrintPrice Preflight OS: Nativo web / cloud; conectores API REST<br>- Enfocus PitStop Server: Monitorizacion SMB/NFS nativa de carpetas in/out/error<br>- callas pdfToolbox Server: Monitorizacion automatizada de carpetas y volumenes | - ES: «No aplica (Nativo web)» vs «Disponible» vs «Disponible»<br>- EN: «Not applicable (Cloud-native)» vs «Available» vs «Available»<br>- DE: «Nicht zutreffend (Cloud-nativ)» vs «Verfugbar» vs «Verfugbar» | DISP |
| **CMP-PRE-B05** | CLI, SDK o API | - PrintPrice Preflight OS: API REST JSON/multipart (/analyze, /autofix)<br>- Enfocus PitStop Server: CLI incluida para scripts y Enfocus Switch<br>- callas pdfToolbox Server: CLI independiente y SDK nativo (C++, Java, .NET, Python) | - ES: «Disponible (API REST)» vs «Disponible (CLI)» vs «Disponible (CLI y SDK)»<br>- EN: «Available (REST API)» vs «Available (CLI)» vs «Available (CLI & SDK)»<br>- DE: «Verfugbar (REST-API)» vs «Verfugbar (CLI)» vs «Verfugbar (CLI & SDK)» | DISP / FUNC |
| **CMP-PRE-B06** | Trazabilidad y original | - PrintPrice Preflight OS: Preservacion del original y hash SHA-256 de auditoria<br>- Enfocus PitStop Server: Archivo original movido a carpeta segura; archivo reparado independiente<br>- callas pdfToolbox Server: Politicas configurables de backup y conservacion previa | - ES: «Disponible» en los tres motores<br>- EN: «Available» en los tres motores<br>- DE: «Verfugbar» en los tres motores | FUNC |

---

## 4. Resumen Estadistico del Inventario

- **Total de afirmaciones inventariadas:** 29
  - app/page.tsx: 17 afirmaciones (5 PRICE IT, 6 FIX IT, 6 PRINT IT).
  - app/products/preflight/page.tsx: 12 afirmaciones (6 Tabla A, 6 Tabla B).
- **Distribucion por tipologia:**
  - FUNC (Funcionalidad / Capacidades): 15 (51,7%)
  - DISP (Disponibilidad / Formato de acceso / Arquitectura): 6 (20,7%)
  - MODL (Modelo comercial y operativo): 4 (13,8%)
  - UX (Experiencia de usuario y accesibilidad cognitiva): 3 (10,3%)
  - CERT (Certificacion y conformidad tecnica de estandares): 1 (3,4%)
