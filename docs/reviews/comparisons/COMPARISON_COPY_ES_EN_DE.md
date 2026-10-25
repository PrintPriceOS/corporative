# Textos Editoriales y Tablas Comparativas Revisadas (ES / EN / DE)

**Fecha de revisión:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Alcance:** Propuesta editorial multilingüe calibrada para autores, editores y compradores de imprenta, libre de superlativos comerciales, con rigor técnico y referencias cruzadas directas.  
**Nota de alcance lingüístico:** Este documento contiene las propuestas editoriales de comparativas redactadas íntegramente en español (ES), inglés (EN) y alemán (DE) en sus secciones respectivas (2, 3 y 4). Los 11 borradores de políticas legales están redactados en español como documentos de trabajo interno, incorporando encabezados trilingües indicativos de estado.

---

## 1. Directrices Editoriales Aplicadas

1. **Objetividad y neutralidad:** Se han eliminado términos como \"insuperable\", \"revolucionario\" o \"único\". Se describen capacidades funcionales concretas.
2. **Equilibrio de modelos:** Se reconoce el valor del asesoramiento humano en talleres tradicionales y la potencia de edición vectorial de herramientas especializadas de preimpresión.
3. **Honestidad en limitaciones:** Se especifican las limitaciones de PrintPrice (cálculo en servidor pero interfaz web, corrección de cajas sin edición vectorial destructiva, ausencia de certificación formal de producto por organismos externos).
4. **Trazabilidad por celda:** Cada fila enlaza con su identificador de afirmación (CMP-PRICE-01..05, CMP-FIX-01..06, CMP-PRINT-01..06, CMP-PRE-A01..A06, CMP-PRE-B01..B06).

---

## 2. Textos Editoriales en Español (ES)

### 2.1. Comparativa de Cotización (Price it) — app/page.tsx
*Para autores, editores y compradores que necesitan conocer la estructura real de costes de su tirada.*

| Criterio / Parámetro | PrintPrice Pro (Price it) | Web-to-Print / Imprenta Online | Cotización Tradicional | Ref. Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Tiempo de respuesta** | **Instantáneo (paramétrico)**<br>Cálculo algorítmico en servidor según especificación exacta. | **Instantáneo (matrices fijas)**<br>Consulta en base de datos sobre combinaciones cerradas. | **Varía según proveedor**<br>Desde horas hasta varios días según carga técnica de taller. | CMP-PRICE-01 |
| **Formatos y papeles** | **Configuración continua**<br>Cualquier medida milimétrica y tipo de papel disponible en planta. | **Catálogo tipificado**<br>Formatos estándar fijos y selección limitada de gramajes. | **Amplia gama bajo consulta**<br>Acceso a distribuidores de papel previa comprobación de stock. | CMP-PRICE-02 |
| **Desglose de costes** | **Desglose técnico por partidas**<br>Papel, planchas, tirada, acabados y transporte diferenciados. | **Precio cerrado por paquete**<br>Importe global sin desglose de consumos industriales. | **Presupuesto resumido**<br>Suele presentarse como precio unitario o partidas agrupadas. | CMP-PRICE-03 |
| **Asesoramiento y soporte** | **Especificación digital directa**<br>Comprobación paramétrica de viabilidad industrial inmediata. | **Portal web autoservicio**<br>Interacción limitada a formularios y plantillas web. | **Atención personalizada**<br>Asesoramiento humano presencial o telefónico con el impresor. | CMP-PRICE-04 |
| **Optimización de pliego** | **Cálculo algorítmico en tiempo real**<br>Imposición y selección de máquina automática en backend. | **Estandarizado en planta**<br>Plantillas de máquina preconfiguradas para tiradas agrupadas. | **Estudio manual de taller**<br>Optimización realizada por el técnico de presupuestos. | CMP-PRICE-05 |

*Limitación de PrintPrice:* El cálculo instantáneo requiere que la imprenta haya completado previamente la parametrización de sus máquinas y tarifas horarias en el Control Plane.

---

### 2.2. Comparativa de Preflight Básico (Fix it) — app/page.tsx
*Para creadores de contenido y diseñadores que preparan PDFs para imprenta profesional.*

| Criterio | PrintPrice Pro (Fix it) | Adobe Acrobat Pro | Enfocus PitStop Pro | Ref. Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Forma de acceso** | **Navegador web SaaS**<br>Acceso sin instalación desde cualquier sistema operativo. | **Escritorio local**<br>Aplicación instalada para Windows y macOS. | **Plugin de escritorio**<br>Módulo complementario que requiere Adobe Acrobat Pro. | CMP-FIX-01 |
| **Requisitos de instalación** | **Cero instalación local**<br>Ejecución inmediata vía navegador o API REST. | **Instalación de software**<br>Requiere espacio en disco y gestión de actualizaciones locales. | **Instalación doble**<br>Requiere instalar Acrobat Pro y el plugin específico. | CMP-FIX-02 |
| **Informe de resultados** | **Reporte web interactivo**<br>Visualización de alertas técnicas estructuradas y exportación. | **Panel modal y reporte**<br>Visualización en pantalla con exportación en PDF o XML. | **Navegador de preimpresión**<br>Inspección interactiva de capas, tintas e informe certificado. | CMP-FIX-03 |
| **Capacidad de corrección** | **Normalización de cajas de página**<br>Ajuste de sangrado y corte sin edición vectorial destructiva. | **Fixups automáticos**<br>Corrección guiada de perfiles de color, fuentes y cajas. | **Edición quirúrgica**<br>Manipulación vectorial, tipográfica y de color elemento a elemento. | CMP-FIX-04 |
| **Estándares y perfiles** | **Inspección técnica PDF/X**<br>Verificación determinista de reglas ISO PDF/X-1a y PDF/X-4. | **Perfiles ISO y GWG predefinidos**<br>Perfiles estándar integrados para distintas condiciones de impresión. | **Perfiles avanzados y personalizados**<br>Creación y edición ilimitada de reglas y perfiles específicos. | CMP-FIX-05 |
| **Modelo comercial** | **SaaS web y consumo vía API**<br>Acceso por plataforma técnica sin licencia de puesto local. | **Suscripción periódica**<br>Licencia mensual o anual por usuario (Creative Cloud / Acrobat). | **Suscripción o licencia perpetua**<br>Pago periódico o adquisición de licencia con soporte anual. | CMP-FIX-06 |

*Limitación de PrintPrice:* Fix it no está diseñado para sustituir la edición vectorial avanzada en puesto de taller; normaliza geometrías y detecta discrepancias técnicas de forma determinista.

---

### 2.3. Comparativa de Producción y Marketplace (Print it) — app/page.tsx
*Para autores independientes, editoriales y responsables de contratación gráfica.*

| Criterio | PrintPrice Pro (Print it) | Plataformas POD Tradicionales | Imprenta Comercial Tradicional | Ref. Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Modelo de producción** | **Marketplace de talleres industriales**<br>Conexión directa con imprentas reales especializadas en libros. | **Red cerrada subcontratada**<br>Enrutamiento automatizado a proveedores anónimos de la red. | **Taller físico único**<br>Contratación directa con una planta de impresión concreta. | CMP-PRINT-01 |
| **Selección de taller** | **Elección transparente por el cliente**<br>Comparación abierta por precio, plazo, ubicación y tecnología. | **Asignación interna opaca**<br>El usuario no elige qué planta física produce su ejemplar. | **Selección previa de proveedor**<br>El cliente contacta directamente con la empresa elegida. | CMP-PRINT-02 |
| **Facturación y cobro** | **Facturación directa de la imprenta**<br>La imprenta factura y cobra al cliente; PrintPrice liquida un 4% mensual. | **Cobro y liquidación por la plataforma**<br>La plataforma cobra el importe íntegro y liquida margen o costes. | **Facturación comercial directa**<br>Facturación y cobro según las condiciones acordadas cliente-imprenta. | CMP-PRINT-03 |
| **Rango de tirada óptimo** | **Flexible (desde 1 hasta grandes tiradas)**<br>Asignación automática a digital u offset según volumen óptimo. | **Unidad a unidad o tiradas cortas**<br>Diseñado para impresión unitaria; coste unitario alto en tiradas grandes. | **Tiradas medias y grandes**<br>Costes de preparación de máquina elevados para ejemplar único. | CMP-PRINT-04 |
| **Trazabilidad del encargo** | **Orden técnica unificada en planta**<br>Especificación digital vinculada al Control Plane del taller. | **Estado comercial en portal**<br>Varía según la plataforma (seguimiento de paquete o panel web). | **Contacto directo con comercial**<br>Varía según proveedor (albarán de entrega y llamadas de seguimiento). | CMP-PRINT-05 |
| **Conectividad de sistemas** | **API REST y Control Plane**<br>Integración directa de presupuestos y pedidos en sistemas de planta. | **Plugins de comercio electrónico**<br>Varía según plataforma (conectores Shopify, WooCommerce o API). | **Intercambio documental**<br>Varía según proveedor (correo electrónico, carpetas FTP o ERP local). | CMP-PRINT-06 |

*Limitación de PrintPrice:* El plazo de entrega y la ejecución final de la impresión dependen exclusivamente del taller seleccionado; PrintPrice no opera como transportista ni almacén intermedio.

---

### 2.4. Comparativa de Preflight de Escritorio / Plugin — app/products/preflight/page.tsx (Tabla A)

| Criterio | PrintPrice Preflight Web | Adobe Acrobat Pro | Enfocus PitStop Pro | Ref. Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Forma de acceso** | **Navegador web SaaS** | **Escritorio local (Win/Mac)** | **Plugin en Acrobat Pro** | CMP-PRE-A01 |
| **Instalación requerida** | **Cero instalación local** | **Instalación Acrobat Pro / CC** | **Instalación Acrobat + plugin** | CMP-PRE-A02 |
| **Nivel de especialización** | **Interfaz intuitiva y accesible** | **Nivel medio / avanzado** | **Especialista de preimpresión** | CMP-PRE-A03 |
| **Informe de resultados** | **Informe web interactivo** | **Panel modal / informe PDF/XML** | **Navegador interactivo con resaltado** | CMP-PRE-A04 |
| **Capacidad de corrección** | **Ajuste de cajas de página (Bleed/Trim)** | **Fixups guiados y edición básica** | **Edición quirúrgica vectorial y tipográfica** | CMP-PRE-A05 |
| **Modelo comercial** | **Integrado en plataforma y API** | **Suscripción periódica (Adobe CC)** | **Suscripción anual o perpetua** | CMP-PRE-A06 |

---

### 2.5. Comparativa de Motores y Servidores de Preflight — app/products/preflight/page.tsx (Tabla B)

| Criterio | PrintPrice Preflight OS | Enfocus PitStop Server | callas pdfToolbox Server | Ref. Evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Configuración de perfiles** | **Contratos JSON deterministas**<br>Especificación declarativa de reglas de geometría y color. | **Action Lists configurables**<br>Configuración visual desde la interfaz de PitStop Pro. | **Process Plans avanzados**<br>Lógica condicional multinivel y scripts en Javascript. | CMP-PRE-B01 |
| **Estándares y verificación** | **Inspección técnica PDF/X-1a y PDF/X-4**<br>Verificación conforme a normas ISO; sin sello de producto externo. | **Perfiles PDF/X y GWG**<br>Perfiles estándar; certificación formal no verificada por versión. | **Process Plans PDF/X y GWG**<br>Perfiles estándar; certificación formal no verificada por versión. | CMP-PRE-B02 |
| **Procesamiento de lotes** | **Microservicios cloud asíncronos**<br>Escalabilidad horizontal mediante colas de mensajes Redis. | **Motor multihilo local**<br>Procesamiento concurrente en servidor on-premises. | **Motor multinúcleo de alto rendimiento**<br>Optimizado para grandes volúmenes de páginas por segundo. | CMP-PRE-B03 |
| **Carpetas calientes (Hot Folders)** | **No aplica (Cloud-native)**<br>Flujo mediante API REST JSON y almacenamiento seguro en nube. | **Monitorización de carpetas de red**<br>Monitorización nativa SMB/NFS de directorios in/out/error. | **Monitorización automatizada de carpetas**<br>Control de directorios locales y volúmenes de red compartidos. | CMP-PRE-B04 |
| **Interfaces de integración** | **API REST JSON / multipart**<br>Endpoints /analyze y /autofix para flujos web y ERPs. | **CLI incluida**<br>Ejecutable de línea de comandos e integración en Enfocus Switch. | **CLI independiente y SDK nativo**<br>Bibliotecas C/C++, Java, .NET y Python para integración embebida. | CMP-PRE-B05 |
| **Trazabilidad y original** | **Preservación estricta y hash SHA-256**<br>Inmutabilidad del original y registro verificable del procesado. | **Segregación de carpetas**<br>Mueve el original a directorio seguro y emite nuevo fichero. | **Políticas de retención configurables**<br>Parámetros personalizados de copia de seguridad previa. | CMP-PRE-B06 |

---

## 3. Textos Editoriales en Inglés (EN)

### 3.1. Instant Quoting Comparison (Price it) — app/page.tsx

| Criterion | PrintPrice Pro (Price it) | Web-to-Print / Online Printers | Traditional Quoting | Ref. Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Response Time** | **Instant (parametric)**<br>Algorithmic server-side calculation based on exact technical specs. | **Instant (fixed matrices)**<br>Pre-calculated database lookup across fixed product bundles. | **Varies by provider**<br>From hours to several days depending on printshop technical workload. | CMP-PRICE-01 |
| **Sizes and Papers** | **Continuous configuration**<br>Any millimetric dimension and paper stock supported by the plant. | **Standard catalog**<br>Fixed preset sizes and limited paper weight options. | **Broad catalog upon request**<br>Access to paper distributors subject to supplier stock checks. | CMP-PRICE-02 |
| **Cost Breakdown** | **Technical line-item breakdown**<br>Separate entries for paper, plates, press run, binding, and shipping. | **Lump-sum price**<br>Single bundle total without industrial consumption details. | **Itemized summary**<br>Usually provided as unit cost or grouped operational blocks. | CMP-PRICE-03 |
| **Advisory & Support** | **Direct digital specification**<br>Immediate parametric check of industrial print feasibility. | **Self-service portal**<br>Interaction limited to automated forms and web templates. | **Personalized consultation**<br>Direct human consultation via phone, email, or in-person. | CMP-PRICE-04 |
| **Sheet Optimization** | **Real-time algorithmic imposition**<br>Automated press and sheet layout calculation in backend. | **Standardized in plant**<br>Fixed imposition templates designed for gang-run printing. | **Manual plant planning**<br>Layout planning manually calculated by the estimator. | CMP-PRICE-05 |

---

### 3.2. Preflight Comparison (Fix it) — app/page.tsx

| Criterion | PrintPrice Pro (Fix it) | Adobe Acrobat Pro | Enfocus PitStop Pro | Ref. Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Access Model** | **Web browser SaaS**<br>Instant access with zero local installation across any OS. | **Local desktop**<br>Installed desktop software for Windows and macOS. | **Desktop plugin**<br>Add-on module requiring Adobe Acrobat Pro host installation. | CMP-FIX-01 |
| **Installation Required** | **Zero local installation**<br>Immediate browser execution or REST API integration. | **Software installation**<br>Requires disk footprint, local runtime, and update management. | **Dual installation**<br>Requires both Acrobat Pro and PitStop plugin installed locally. | CMP-FIX-02 |
| **Report Interface** | **Interactive web report**<br>Structured technical warnings and downloadable inspection report. | **Modal dialog and report**<br>On-screen preflight results with PDF and XML export capability. | **Prepress navigator**<br>Interactive object highlighting, ink inspection, and certified report. | CMP-FIX-03 |
| **File Correction** | **Page box normalization**<br>Bleed and trim box adjustment without destructive vector changes. | **Automated fixups**<br>Guided corrections for color spaces, font embedding, and boxes. | **Surgical vector editing**<br>Granular modification of paths, text, images, and spot inks. | CMP-FIX-04 |
| **Standards & Profiles** | **Technical PDF/X inspection**<br>Deterministic verification of ISO PDF/X-1a and PDF/X-4 rules. | **Built-in ISO & GWG profiles**<br>Standard preset profiles for commercial printing conditions. | **Advanced & custom profiles**<br>Unlimited creation and editing of proprietary prepress checks. | CMP-FIX-05 |
| **Commercial Model** | **Web platform & API**<br>Technical platform access without per-seat desktop licensing. | **Recurring subscription**<br>Monthly or annual license per user (Creative Cloud / Acrobat Pro). | **Subscription or perpetual**<br>Recurring term or perpetual license with annual maintenance. | CMP-FIX-06 |

---

### 3.3. Marketplace and Production Comparison (Print it) — app/page.tsx

| Criterion | PrintPrice Pro (Print it) | Traditional POD Platforms | Commercial Printshops | Ref. Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Production Model** | **Industrial printshop marketplace**<br>Direct connection to verified book printing facilities. | **Closed sub-network**<br>Automated dispatching to undisclosed contract printers. | **Single dedicated plant**<br>Direct contractual relationship with an individual printshop. | CMP-PRINT-01 |
| **Shop Selection** | **Transparent user selection**<br>Compare openly by price, turnaround, location, and machinery. | **Opaque routing**<br>The customer cannot select which physical factory prints the job. | **Pre-selected partner**<br>The customer initiates direct contact with their chosen vendor. | CMP-PRINT-02 |
| **Billing & Payments** | **Direct printshop billing**<br>The printshop invoices and collects; PrintPrice charges a 4% fee monthly. | **Platform collection & payouts**<br>Platform collects total revenue and pays royalties or base costs. | **Direct commercial terms**<br>Invoicing and payment terms settled directly between parties. | CMP-PRINT-03 |
| **Optimal Run Length** | **Flexible (from 1 to large runs)**<br>Dynamic routing to digital or offset presses based on volume. | **Single copies or short runs**<br>Optimized for unit-by-unit POD; high unit costs on medium runs. | **Medium to long runs**<br>High machine make-ready costs make single copies uneconomical. | CMP-PRINT-04 |
| **Order Tracking** | **Unified plant technical order**<br>Digital job ticket connected to the shop floor Control Plane. | **Commercial tracking status**<br>Varies by platform (web portal or parcel tracking number). | **Direct sales rep contact**<br>Varies by provider (delivery notes, emails, and phone updates). | CMP-PRINT-05 |
| **System Connectivity** | **REST API & Control Plane**<br>Direct quoting and order ingestion into industrial shop systems. | **E-commerce plugins**<br>Varies by platform (Shopify, WooCommerce connectors or API). | **Document exchange**<br>Varies by provider (email, FTP folders, or internal ERP). | CMP-PRINT-06 |

---

### 3.4. Preflight Desktop / Plugin Comparison — app/products/preflight/page.tsx (Table A)

| Criterion | PrintPrice Preflight Web | Adobe Acrobat Pro | Enfocus PitStop Pro | Ref. Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Access Form** | **Web browser SaaS** | **Local desktop (Win/Mac)** | **Plugin inside Acrobat Pro** | CMP-PRE-A01 |
| **Installation** | **Zero local installation** | **Acrobat Pro / CC required** | **Acrobat + plugin required** | CMP-PRE-A02 |
| **Expertise Level** | **Accessible guided UI** | **Intermediate to advanced** | **Prepress specialist** | CMP-PRE-A03 |
| **Inspection Report** | **Interactive web report** | **Modal dialog / PDF/XML export** | **Interactive navigator with overlay** | CMP-PRE-A04 |
| **Correction Scope** | **Page box adjustments (Bleed/Trim)**| **Automated fixups & basic edits** | **Surgical vector and font editing** | CMP-PRE-A05 |
| **Licensing Model** | **Platform & REST API** | **Adobe CC subscription** | **Annual subscription or perpetual** | CMP-PRE-A06 |

---

### 3.5. High-Volume Preflight Engines — app/products/preflight/page.tsx (Table B)

| Criterion | PrintPrice Preflight OS | Enfocus PitStop Server | callas pdfToolbox Server | Ref. Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Profile Configuration** | **Declarative JSON contracts**<br>Deterministic rules for page geometry and color intent. | **Configurable Action Lists**<br>Visual creation via desktop PitStop Pro interface. | **Advanced Process Plans**<br>Multi-level conditional logic and Javascript scripting. | CMP-PRE-B01 |
| **Standards Compliance** | **Technical PDF/X-1a & PDF/X-4 inspection**<br>Strict ISO rule checking; no third-party software certificate badge. | **PDF/X and GWG profiles**<br>Standard industry profiles; version certificate unverified. | **PDF/X and GWG Process Plans**<br>Standard industry profiles; version certificate unverified. | CMP-PRE-B02 |
| **Batch Processing** | **Async cloud microservices**<br>Horizontal scaling via distributed Redis message queues. | **Multi-threaded server**<br>Concurrent file processing on local server instances. | **High-performance multi-core**<br>Optimized for processing high page volumes per second. | CMP-PRE-B03 |
| **Hot Folders** | **Not applicable (Cloud-native)**<br>REST API endpoints and secure cloud object storage. | **Network folder monitoring**<br>Native SMB/NFS directory watching (in/out/error). | **Automated folder watching**<br>Local and shared network folder automation. | CMP-PRE-B04 |
| **Integration Interfaces** | **JSON REST API / multipart**<br>/analyze and /autofix endpoints for web and ERP flows. | **Included CLI**<br>Command-line interface and Enfocus Switch integration. | **Standalone CLI & native SDK**<br>C/C++, Java, .NET, and Python libraries for deep integration. | CMP-PRE-B05 |
| **Traceability & Original** | **Strict preservation & SHA-256**<br>Original PDF immutability with verifiable audit hash. | **Folder segregation**<br>Moves original to secure archive and outputs fixed file. | **Configurable retention policies**<br>Custom pre-processing backup and archiving settings. | CMP-PRE-B06 |

---

## 4. Textos Editoriales en Alemán (DE)

### 4.1. Angebotskalkulation im Vergleich (Price it) — app/page.tsx

| Kriterium | PrintPrice Pro (Price it) | Web-to-Print / Onlinedruckerei | Traditionelle Druckkalkulation | Evidenz-Ref. |
| :--- | :--- | :--- | :--- | :--- |
| **Reaktionszeit** | **Sofort (parametrisch)**<br>Algorithmische serverseitige Berechnung nach exakter Spezifikation. | **Sofort (feste Matrizen)**<br>Abfrage vorkalkulierter Datenbankmatrizen für feste Bundles. | **Variiert je nach Anbieter**<br>Von einigen Stunden bis zu mehreren Tagen je nach Auslastung. | CMP-PRICE-01 |
| **Formate und Papiere** | **Freie Konfiguration**<br>Jedes millimetergenaue Format und jedes im Werk verfügbare Papier. | **Standardkatalog**<br>Feste Normformate und eingeschränkte Grammaturauswahl. | **Breite Auswahl auf Anfrage**<br>Zugang zu Papiergroßhändlern nach individueller Lagerprüfung. | CMP-PRICE-02 |
| **Kostenaufschlüsselung** | **Detaillierte Einzelposten**<br>Transparente Aufteilung für Papier, Druck, Weiterverarbeitung und Fracht. | **Pauschalpreis**<br>Gesamtpreis ohne Aufschlüsselung industrieller Verbräuche. | **Kompaktangebot**<br>Meist als Stückpreis oder zusammengefasste Kostenblöcke. | CMP-PRICE-03 |
| **Beratung und Service** | **Direkte digitale Spezifikation**<br>Unmittelbare parametrische Prüfung der technischen Machbarkeit. | **Self-Service-Portal**<br>Interaktion beschränkt auf Webformulare und Standardvorlagen. | **Persönliche Beratung**<br>Individuelle Betreuung durch den Druckereiberater vor Ort oder per Telefon. | CMP-PRICE-04 |
| **Bogenoptimierung** | **Algorithmische Echtzeit-Ausschießung**<br>Automatische Druckbogen- und Maschinenauswahl im Backend. | **Werkseitig standardisiert**<br>Feste Sammelform-Vorlagen für vorkonfigurierte Druckauflagen. | **Manuelle Druckvorstufenplanung**<br>Individuelle Ausschießplanung durch den Kalkulator. | CMP-PRICE-05 |

---

### 4.2. Preflight-Prüfung im Vergleich (Fix it) — app/page.tsx

| Kriterium | PrintPrice Pro (Fix it) | Adobe Acrobat Pro | Enfocus PitStop Pro | Evidenz-Ref. |
| :--- | :--- | :--- | :--- | :--- |
| **Zugriffsmodell** | **Webbrowser SaaS**<br>Sofortiger Zugriff ohne lokale Installation auf jedem Betriebssystem. | **Lokaler Desktop**<br>Installierte Desktop-Anwendung für Windows und macOS. | **Desktop-Plugin**<br>Zusatzmodul, das Adobe Acrobat Pro als Host erfordert. | CMP-FIX-01 |
| **Installationsaufwand** | **Keine lokale Installation**<br>Direkte Ausführung im Browser oder Anbindung via REST-API. | **Software-Installation**<br>Erfordert lokalen Speicherplatz und regelmäßige Updates. | **Doppelte Installation**<br>Erfordert sowohl Acrobat Pro als auch das PitStop-Plugin. | CMP-FIX-02 |
| **Prüfbericht** | **Interaktiver Web-Bericht**<br>Strukturierte Fehlermeldungen und exportierbarer technischer Bericht. | **Modaler Dialog & Bericht**<br>Bildschirmanzeige mit Exportoptionen in PDF oder XML. | **Prepress-Navigator**<br>Interaktive Objektmarkierung, Farbprüfung und zertifizierter Bericht. | CMP-FIX-03 |
| **Dateikorrektur** | **Normalisierung von Seitenboxen**<br>Anpassung von Beschnitt und Anschnitt ohne Vektorbeschädigung. | **Automatisierte Korrekturen**<br>Geführte Fixups für Farbprofile, Schriften und Seitenboxen. | **Präzise Vektorbearbeitung**<br>Chirurgische Bearbeitung von Pfaden, Typografie und Schmuckfarben. | CMP-FIX-04 |
| **Standards & Profile** | **Technische PDF/X-Prüfung**<br>Deterministische Prüfung von ISO PDF/X-1a und PDF/X-4 Regeln. | **Integrierte ISO- & GWG-Profile**<br>Standardisierte Prüfprofile für gängige Druckbedingungen. | **Erweiterte & eigene Profile**<br>Unbegrenzte Erstellung und Anpassung eigener Vorstufenregeln. | CMP-FIX-05 |
| **Vertragsmodell** | **Plattform & API**<br>Plattformzugriff ohne gerätebezogene Einzelplatzlizenz. | **Wiederkehrendes Abonnement**<br>Monats- oder Jahreslizenz pro Nutzer (Creative Cloud / Acrobat). | **Abonnement oder Kauflizenz**<br>Periodisches Abonnement oder unbefristete Lizenz mit Wartung. | CMP-FIX-06 |

---

### 4.3. Marktplatz und Buchproduktion im Vergleich (Print it) — app/page.tsx

| Kriterium | PrintPrice Pro (Print it) | Traditionelle POD-Plattformen | Klassische Akzidenzdruckerei | Evidenz-Ref. |
| :--- | :--- | :--- | :--- | :--- |
| **Produktionsmodell** | **Industrieller Druckerei-Marktplatz**<br>Direkter Zugang zu spezialisierten Buchdruckereien. | **Geschlossenes Netzwerk**<br>Automatische Zuweisung an nicht offengelegte Vertragspartner. | **Einzelner Druckereibetrieb**<br>Direkte Vertragsbeziehung mit einer ausgewählten Druckerei. | CMP-PRINT-01 |
| **Betriebsauswahl** | **Transparente Kundenauswahl**<br>Offener Vergleich nach Preis, Lieferzeit, Standort und Technik. | **Undurchsichtiges Routing**<br>Der Kunde kann den tatsächlichen Druckbetrieb nicht wählen. | **Vorherige Partnerauswahl**<br>Kunde kontaktiert und beauftragt den Betrieb direkt. | CMP-PRINT-02 |
| **Abrechnung & Zahlung** | **Direktabrechnung durch Druckerei**<br>Druckerei stellt Rechnung; PrintPrice stellt 4% Monatsgebühr. | **Plattform-Abrechnung & Tantiemen**<br>Plattform vereinnahmt Erlöse und zahlt Margen oder Basiskosten aus. | **Direkte Zahlungsbedingungen**<br>Rechnungsstellung und Zahlungsziel zwischen den Parteien. | CMP-PRINT-03 |
| **Optimale Auflagenhöhe** | **Flexibel (vom Einzelexemplar bis Großauflage)**<br>Dynamische Zuweisung zu Digital- oder Offsetdruck je nach Menge. | **Einzelbuch oder Kleinauflagen**<br>Ausgelegt auf Einzelfertigung; hohe Stückkosten bei Großauflagen. | **Mittlere bis große Auflagen**<br>Hohe Rüstkosten machen Einzelexemplare meist unrentabel. | CMP-PRINT-04 |
| **Auftragsverfolgung** | **Einheitlicher technischer Betriebsauftrag**<br>Digitale Spezifikation direkt im Control Plane der Druckerei. | **Kaufmännischer Portalstatus**<br>Variiert je nach Plattform (Sendungsverfolgung oder Web-Dashboard). | **Persönlicher Ansprechpartner**<br>Variiert je nach Anbieter (Lieferschein, E-Mail- und Telefon-Updates). | CMP-PRINT-05 |
| **Systemanbindung** | **REST-API & Control Plane**<br>Direkte Übergabe von Kalkulationen und Aufträgen in Werkssysteme. | **E-Commerce-Plugins**<br>Variiert je nach Plattform (Shopify-, WooCommerce-Plugins oder API). | **Manueller Belegaustausch**<br>Variiert je nach Anbieter (E-Mail, FTP-Ordner oder lokales ERP). | CMP-PRINT-06 |

---

### 4.4. Preflight Desktop / Plugin im Vergleich — app/products/preflight/page.tsx (Tabelle A)

| Kriterium | PrintPrice Preflight Web | Adobe Acrobat Pro | Enfocus PitStop Pro | Evidenz-Ref. |
| :--- | :--- | :--- | :--- | :--- |
| **Zugriffsform** | **Webbrowser SaaS** | **Lokaler Desktop (Win/Mac)** | **Plugin in Acrobat Pro** | CMP-PRE-A01 |
| **Installation** | **Keine lokale Installation** | **Acrobat Pro / CC erforderlich** | **Acrobat + Plugin erforderlich** | CMP-PRE-A02 |
| **Fachkenntnisse** | **Verständliche Benutzerführung** | **Mittlere bis fortgeschrittene Kenntnisse** | **Druckvorstufen-Spezialist** | CMP-PRE-A03 |
| **Prüfbericht** | **Interaktiver Web-Bericht** | **Modaler Dialog / PDF/XML-Export** | **Interaktiver Navigator mit Overlay** | CMP-PRE-A04 |
| **Korrekturumfang** | **Seitenboxen (Anschnitt/Beschnitt)** | **Geführte Fixups & Basisbearbeitung** | **Chirurgische Vektor- & Schriftkorrektur** | CMP-PRE-A05 |
| **Lizenzmodell** | **Plattform & REST-API** | **Adobe CC Abonnement** | **Jahresabonnement oder Kauflizenz** | CMP-PRE-A06 |

---

### 4.5. Hochleistungs-Preflight-Server im Vergleich — app/products/preflight/page.tsx (Tabelle B)

| Kriterium | PrintPrice Preflight OS | Enfocus PitStop Server | callas pdfToolbox Server | Evidenz-Ref. |
| :--- | :--- | :--- | :--- | :--- |
| **Profilkonfiguration** | **Deklarative JSON-Verträge**<br>Deterministische Regeln für Geometrie und Farbprofile. | **Konfigurierbare Action Lists**<br>Visuelle Erstellung über die Desktop-Oberfläche. | **Erweiterte Process Plans**<br>Mehrstufige bedingte Logik und Javascript-Skripte. | CMP-PRE-B01 |
| **Normen & Verifikation** | **Technische PDF/X-1a & PDF/X-4 Prüfung**<br>Prüfung nach ISO-Normen; ohne externes Prüfsiegel. | **PDF/X- und GWG-Profile**<br>Branchenprofile; Versionszertifikat nicht verifiziert. | **PDF/X- und GWG-Process Plans**<br>Branchenprofile; Versionszertifikat nicht verifiziert. | CMP-PRE-B02 |
| **Stapelverarbeitung** | **Asynchrone Cloud-Mikroservices**<br>Horizontale Skalierung über verteilte Redis-Warteschlangen. | **Mehrfädiger Serverbetrieb**<br>Parallele Dateiverarbeitung auf lokalem Server. | **Hochleistungs-Multicore-Engine**<br>Optimiert für sehr hohen Seitendurchsatz pro Sekunde. | CMP-PRE-B03 |
| **Hot Folders** | **Nicht zutreffend (Cloud-nativ)**<br>REST-API-Endpunkte und sichere Cloud-Objektspeicher. | **Netzwerkordner-Überwachung**<br>Native SMB/NFS-Verzeichnisüberwachung (in/out/error). | **Automatisierte Ordnerüberwachung**<br>Lokale Verzeichnisse und freigegebene Netzwerkpfade. | CMP-PRE-B04 |
| **Integrationsschnittstellen** | **JSON REST-API / Multipart**<br>/analyze und /autofix Endpunkte für Web- und ERP-Systeme. | **Integrierte CLI**<br>Kommandozeilenprogramm und Switch-Integration. | **Eigenständige CLI & natives SDK**<br>Bibliotheken für C/C++, Java, .NET und Python. | CMP-PRE-B05 |
| **Rückverfolgbarkeit & Original** | **Strikte Sicherung & SHA-256 Hash**<br>Unveränderlichkeit der Originaldatei mit Prüfhash. | **Verzeichnistrennung**<br>Verschiebt Original in Sicherheitsordner und erzeugt neue Datei. | **Konfigurierbare Richtlinien**<br>Anpassbare Einstellungen für Vorab-Backups und Archivierung. | CMP-PRE-B06 |

---

**Redaktioneller Abschluss:**  
Propuesta editorial completa sincronizada en español, inglés y alemán.  
Las afirmaciones fácticas han sido contrastadas con las fuentes oficiales y las capacidades comprobadas en código de PrintPrice OS.
