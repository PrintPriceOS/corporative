# Registro de Afirmaciones Comparativas Públicas (Claims Register)

**Fecha de consolidación:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Ámbito:** Todas las afirmaciones comparativas públicas presentes en app/page.tsx y app/products/preflight/page.tsx.  
**Nota de alcance lingüístico:** La documentación comparativa (COMPARISON_COPY_ES_EN_DE.md y tablas en web) está completada íntegramente en ES, EN y DE. Los 11 borradores de políticas legales están redactados en español como documentos de trabajo interno, incorporando encabezados trilingües indicativos de estado.

---

## 1. Metodología de Clasificación y Tipología

Cada afirmación comparativa pública está identificada de forma unívoca con un identificador estable y clasificada bajo las siguientes tipologías técnicas:
- **FUNC (Funcionalidad):** Capacidad técnica o de proceso operativo soportada por la herramienta o plataforma.
- **DISP (Disponibilidad / Despliegue):** Entorno de ejecución, requisitos de instalación, canal de acceso o despliegue.
- **CERT (Certificación / Estándar):** Cumplimiento formal de especificaciones internacionales (ISO, GWG) o certificación formal por organismo acreditador.
- **MODL (Modelo Comercial / Operativo):** Estructura de contratación, relación jurídica, intermediación o fijación de tarifas.
- **UX (Experiencia de Usuario / Usabilidad):** Nivel técnico exigido al usuario, legibilidad de informes o curva de aprendizaje.

---

## 2. Bloque 1: Comparativas de la Página Principal (app/page.tsx)

### 2.1. Pestaña 1: PRICE IT — Cálculo y Presupuestación

| ID | Dimensión / Criterio | Productos / Modalidades Comparadas | Textos Actuales (ES / EN / DE) | Tipo | Estado Fáctico Recalculado |
|---|---|---|---|:---:|:---:|
| **CMP-PRICE-01** | Cálculo de presupuesto inmediato sin registro | - PrintPrice: Budget (Web SaaS)<br>- Tradicional: Cotización manual de taller<br>- Lulu: Lulu Direct / Creator Hub<br>- Gelato: Red POD distribuida | - ES: «Disponible» vs «Varía según proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfügbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC / MODL | **PARCIALMENTE CONFIRMADO**<br>(Capacidad propia verificada en backend; competidores POD declarados formalmente no verificados en tabla) |
| **CMP-PRICE-02** | Desglose transparente entre impresión y papel | - PrintPrice: Budget (Matrices servidor)<br>- Tradicional: Presupuesto de imprenta<br>- Lulu: Catálogo cerrado de producto<br>- Gelato: Catálogo POD cerrado | - ES: «Disponible» vs «Varía según proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfügbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC / MODL | **PARCIALMENTE CONFIRMADO**<br>(Capacidad propia verificada; competidores declarados no verificados) |
| **CMP-PRICE-03** | Optimización digital vs offset según volumen | - PrintPrice: Algoritmo de imposición y coste<br>- Tradicional: Estimación manual de taller<br>- Lulu: Modelo POD digital unitario<br>- Gelato: Red POD digital | - ES: «Disponible» vs «Varía según proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfügbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC | **PARCIALMENTE CONFIRMADO**<br>(Capacidad propia verificada; competidores declarados no verificados) |
| **CMP-PRICE-04** | Tarifas y capacidades calibradas por talleres | - PrintPrice: Control Plane / Costes de planta<br>- Tradicional: Tarifas ad-hoc<br>- Lulu: Tarifas centralizadas de plataforma<br>- Gelato: Tarifas fijas de red comercial | - ES: «Disponible» vs «Varía según proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfügbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | MODL / FUNC | **PARCIALMENTE CONFIRMADO**<br>(Capacidad propia verificada; competidores declarados no verificados) |
| **CMP-PRICE-05** | Ficha técnica verificada y vinculada a la orden | - PrintPrice: Especificación técnica inmutable<br>- Tradicional: Albarán manual de taller<br>- Lulu: Especificación cerrada<br>- Gelato: Orden de red comercial | - ES: «Disponible» vs «Varía según proveedor» vs «No verificado» vs «No verificado»<br>- EN: «Available» vs «Varies by provider» vs «Not verified» vs «Not verified»<br>- DE: «Verfügbar» vs «Variiert je nach Anbieter» vs «Nicht verifiziert» vs «Nicht verifiziert» | FUNC | **PARCIALMENTE CONFIRMADO**<br>(Capacidad propia verificada; competidores declarados no verificados) |

---

### 2.2. Pestaña 2: FIX IT — Preflight y Preparación de PDF

| ID | Dimensión / Criterio | Productos / Modalidades Comparadas | Textos Actuales (ES / EN / DE) | Tipo | Estado Fáctico Recalculado |
|---|---|---|---|:---:|:---:|
| **CMP-FIX-01** | Comprobación web directa sin instalación | - PrintPrice: Fix it Web SaaS<br>- Adobe: Acrobat Pro (Escritorio)<br>- Enfocus: PitStop Pro (Plugin)<br>- callas: pdfToolbox (Servidor / CLI) | - ES: «Disponible» vs «Aplicación escritorio» vs «Plugin / Servidor» vs «Servidor / CLI / SDK»<br>- EN: «Available» vs «Desktop app» vs «Plugin / Server» vs «Server / CLI / SDK»<br>- DE: «Verfügbar» vs «Desktop-Anwendung» vs «Plugin / Server» vs «Server / CLI / SDK» | DISP | **CONFIRMADO**<br>(Todas las alternativas respaldadas por manuales técnicos oficiales) |
| **CMP-FIX-02** | Detección perimetral de sangres según perfil | - PrintPrice: Detección de cajas Trim/Bleed<br>- Adobe: Acrobat Preflight profiles<br>- Enfocus: PitStop Action Lists<br>- callas: pdfToolbox Check profiles | - ES: «Disponible» en los cuatro motores<br>- EN: «Available» en los cuatro motores<br>- DE: «Verfügbar» en los cuatro motores | FUNC | **CONFIRMADO**<br>(Capacidad geométrica soportada en los 4 motores) |
| **CMP-FIX-03** | Auditoría de resolución efectiva por página | - PrintPrice: Inspección DPI por imagen<br>- Adobe: Acrobat Preflight (DPI)<br>- Enfocus: PitStop Pro (Inspector)<br>- callas: pdfToolbox (Resolution check) | - ES: «Disponible» en los cuatro motores<br>- EN: «Available» en los cuatro motores<br>- DE: «Verfügbar» en los cuatro motores | FUNC | **CONFIRMADO**<br>(Inspección soportada en los 4 motores) |
| **CMP-FIX-04** | Diagnóstico accesible sin tecnicismos complejos | - PrintPrice: Avisos orientados a creadores<br>- Adobe: Panel técnico modal<br>- Enfocus: Reporte para especialistas<br>- callas: Informes XML/PDF de preimpresión | - ES: «Disponible» vs «Varía según usuario» vs «Varía según usuario» vs «Varía según usuario»<br>- EN: «Available» vs «Varies by user» vs «Varies by user» vs «Varies by user»<br>- DE: «Verfügbar» vs «Variiert je nach Anwender» vs «Variiert je nach Anwender» vs «Variiert je nach Anwender» | UX | **CONFIRMADO**<br>(Diferenciación UX verificada en interfaces respectivas) |
| **CMP-FIX-05** | Corrección geométrica asistida de cajas (BleedBox) | - PrintPrice: Normalización de cajas PDF<br>- Adobe: Fixups automáticos Acrobat<br>- Enfocus: Generación de sangres<br>- callas: Process Plans de sangrado | - ES: «Disponible» vs «Varía según edición» vs «Disponible» vs «Disponible»<br>- EN: «Available» vs «Varies by edition» vs «Available» vs «Available»<br>- DE: «Verfügbar» vs «Variiert nach Edition» vs «Verfügbar» vs «Verfügbar» | FUNC | **CONFIRMADO**<br>(Delimitación técnica de corrección de cajas acreditada) |
| **CMP-FIX-06** | Firma técnica del informe vinculada a producción | - PrintPrice: Hash SHA-256 en orden técnica<br>- Adobe: Firma digital PDF<br>- Enfocus: Enfocus Switch<br>- callas: Integración API / CLI | - ES: «Disponible» vs «No verificado» vs «Varía según integración» vs «Varía según integración»<br>- EN: «Available» vs «Not verified» vs «Varies by integration» vs «Varies by integration»<br>- DE: «Verfügbar» vs «Nicht verifiziert» vs «Variiert nach Integration» vs «Variiert nach Integration» | FUNC / MODL | **PARCIALMENTE CONFIRMADO**<br>(Adobe declarado no verificado; Enfocus/callas condicionado a integración externa) |

---

### 2.3. Pestaña 3: PRINT IT — Marketplace y Producción Gráfica

| ID | Dimensión / Criterio | Productos / Modalidades Comparadas | Textos Actuales (ES / EN / DE) | Tipo | Estado Fáctico Recalculado |
|---|---|---|---|:---:|:---:|
| **CMP-PRINT-01** | Modelo de servicio | - PrintPrice: Marketplace directo con talleres<br>- Plataformas POD: Red cerrada subcontratada<br>- Tradicional: Broker / intermediario gráfico | - ES: «Directo con talleres» vs «Varía según plataforma» vs «Varía según proveedor»<br>- EN: «Direct with partner plants» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Direkt mit Partnerbetrieben» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | MODL | **CONFIRMADO**<br>(Diferenciación estructural de modelo mercantil contrastada) |
| **CMP-PRINT-02** | Selección de imprenta | - PrintPrice: Selección y enrutamiento directo<br>- Plataformas POD: Asignación interna cerrada<br>- Tradicional: Selección manual de broker | - ES: «Enrutamiento técnico» vs «Varía según plataforma» vs «Varía según proveedor»<br>- EN: «Technical routing» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Technische Zuweisung» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | FUNC / MODL | **CONFIRMADO**<br>(Transparencia de planta contrastada) |
| **CMP-PRINT-03** | Presupuestación | - PrintPrice: Inmediata en servidor (Budget)<br>- Plataformas POD: Catálogo cerrado / API<br>- Tradicional: Cotización bajo petición | - ES: «Inmediata en servidor» vs «Varía según plataforma» vs «Varía según proveedor»<br>- EN: «Instant server calculation» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Sofortige Server-Kalkulation» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | FUNC | **CONFIRMADO**<br>(Motor algorítmico vs catálogos fijos / gestión manual) |
| **CMP-PRINT-04** | Preparación de archivos | - PrintPrice: Preflight asistido en navegador<br>- Plataformas POD: Validador web básico<br>- Tradicional: Departamento de preimpresión | - ES: «Preflight en navegador» vs «Varía según plataforma» vs «Varía según proveedor»<br>- EN: «In-browser preflight» vs «Varies by platform» vs «Varies by provider»<br>- DE: «In-Browser Preflight» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | FUNC / DISP | **CONFIRMADO**<br>(Flujo técnico verificado) |
| **CMP-PRINT-05** | Pedido y seguimiento | - PrintPrice: Orden técnica vinculada a planta<br>- Plataformas POD: Portal web o tracking<br>- Tradicional: Albarán y contacto comercial | - ES: «Orden y registro técnico» vs «Varía según plataforma» vs «Varía según proveedor»<br>- EN: «Order & technical log» vs «Varies by platform» vs «Varies by provider»<br>- DE: «Auftrag & technisches Protokoll» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | MODL / FUNC | **CONFIRMADO**<br>(Trazabilidad técnica vinculada al Control Plane) |
| **CMP-PRINT-06** | Integraciones | - PrintPrice: REST API y Control Plane de planta<br>- Plataformas POD: Plugins e-commerce / API<br>- Tradicional: Intercambio documental / ERP | - ES: «API REST y Control Plane» vs «Varía según plataforma» vs «Varía según proveedor»<br>- EN: «REST API & Control Plane» vs «Varies by platform» vs «Varies by provider»<br>- DE: «REST-API & Control Plane» vs «Variiert je nach Plattform» vs «Variiert je nach Anbieter» | DISP / FUNC | **CONFIRMADO**<br>(APIs y panel industrial contrastados) |

---

## 3. Bloque 2: Comparativas de Preflight (app/products/preflight/page.tsx)

### 3.1. Tabla A: Comparativa Desktop / Plugin

| ID | Criterio | PrintPrice Preflight Web | Adobe Acrobat Pro | Enfocus PitStop Pro | Estado Fáctico Recalculado |
|:---:|---|---|---|---|:---:|
| **CMP-PRE-A01** | Forma de acceso | Navegador web SaaS | Escritorio local (Win/Mac) | Plugin en Acrobat Pro | **CONFIRMADO** |
| **CMP-PRE-A02** | Instalación requerida | Cero instalación local | Instalación Acrobat Pro / CC | Instalación Acrobat + plugin | **CONFIRMADO** |
| **CMP-PRE-A03** | Curva de aprendizaje | Interfaz guiada accesible | Nivel medio / avanzado | Especialista de preimpresión | **CONFIRMADO** |
| **CMP-PRE-A04** | Informe de errores | Reporte web interactivo | Panel modal / informe PDF | Navegador con resaltado interactivo | **CONFIRMADO** |
| **CMP-PRE-A05** | Corrección de archivos | Ajuste de cajas de página (Bleed/Trim) | Fixups guiados y edición básica | Edición quirúrgica vectorial y de fuentes | **CONFIRMADO** |
| **CMP-PRE-A06** | Modelo comercial | Portal web y API técnica | Suscripción Acrobat Pro / CC | Suscripción anual o perpetua | **CONFIRMADO** |

---

### 3.2. Tabla B: Motores y Servidores de Preflight de Alto Volumen

| ID | Criterio | PrintPrice Preflight OS | Enfocus PitStop Server | callas pdfToolbox Server | Estado Fáctico Recalculado |
|:---:|---|---|---|---|:---:|
| **CMP-PRE-B01** | Configuración de perfiles | Contratos JSON deterministas | Action Lists vía GUI PitStop Pro | Process Plans con Javascript | **CONFIRMADO** |
| **CMP-PRE-B02** | Comprobación PDF/X y estándares | Inspección técnica PDF/X-1a y PDF/X-4 (Sin certificación de producto) | Perfiles PDF/X y GWG (Certificación por versión no verificada) | Process Plans PDF/X y GWG (Certificación por versión no verificada) | **PENDIENTE DE VERIFICACIÓN POR VERSIÓN**<br>(Perfiles técnicos confirmados; sellos formales de producto no acreditados para versiones específicas) |
| **CMP-PRE-B03** | Procesamiento por lotes | Microservicios cloud asíncronos | Motor multihilo para colas locales | Motor multinúcleo para alto volumen | **CONFIRMADO** |
| **CMP-PRE-B04** | Carpetas calientes (Hot Folders) | No aplica (Cloud-native; API REST) | Monitorización SMB/NFS nativa | Monitorización automatizada de carpetas | **NO COMPARABLE POR DIVERGENCIA DE PARADIGMA**<br>(Cloud-native REST API vs carpetas de red local SMB) |
| **CMP-PRE-B05** | CLI, SDK o API | API REST JSON/multipart | CLI incluida / Enfocus Switch | CLI independiente y SDK nativo | **CONFIRMADO** |
| **CMP-PRE-B06** | Trazabilidad y original | Preservación estricta y hash SHA-256 | Archivo original movido a carpeta segura | Políticas de backup configurables | **CONFIRMADO** |

---

## 4. Recálculo No Solapado del Estado de Afirmaciones

* **Total de afirmaciones comparativas analizadas:** **29** (100 %)
* **Confirmadas íntegramente (todas las columnas acreditadas documentalmente):** **21 afirmaciones (72,4 %)**
  * CMP-FIX-01 a a5 (5)
  * CMP-PRINT-01 a a6 (6)
  * CMP-PRE-A01 a A06 (6)
  * CMP-PRE-B01, B03, B05, B06 (4)
* **Parcialmente confirmadas (incluye celdas «No verificado» en competidores declaradas en la web):** **6 afirmaciones (20,7 %)**
  * CMP-PRICE-01 a a5 (5)
  * CMP-FIX-06 (1)
* **Pendiente de verificación específica de producto por versión:** **1 afirmación (3,4 %)**
  * CMP-PRE-B02 (Certificaciones formales emitidas por organismos independientes para versiones concretas)
* **No comparable por divergencia de paradigma:** **1 afirmación (3,4 %)**
  * CMP-PRE-B04 (Hot Folders en red local vs arquitectura SaaS cloud)

**Total exacto:**  + 6 + 1 + 1 = 29$ afirmaciones. Cero duplicados, sin categorías solapadas.
