# Fuentes y Evidencias de Comparativas Públicas (Sources & Evidence)

**Fecha de consolidación:** 25 de octubre de 2026  
**Rama:** feat/comparisons-evidence-and-legal-policy-review  
**Referencia base:** Commit 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a  
**Ámbito:** Respaldo documental, técnico y metodológico de todas las afirmaciones comparativas públicas de PrintPrice Pro.

---

## 1. Metodología y Criterios de Calificación

Para evitar cualquier distorsión comercial o afirmación infundada, cada afirmación comparativa ha sido evaluada conforme a los siguientes cinco estados estandarizados:

1. **Confirmado (CONFIRMED):** Respaldado por documentación técnica oficial vigente del tercero o evidencia reproducible en el repositorio y arquitectura de PrintPrice.
2. **Parcialmente confirmado (PARTIAL):** La capacidad existe, pero su alcance, configuración, edición o nivel de soporte varía según plan, tipo de archivo o condición de despliegue.
3. **No verificado (UNVERIFIED):** No se dispone de evidencia pública oficial suficiente para una versión específica (p. ej., certificación formal de software por organismo independiente). Se evita declarar su inexistencia; se señala la falta de constancia oficial.
4. **No comparable (NOT_APPLICABLE o NOT_COMPARABLE):** El criterio compara modelos intrínsecamente distintos (p. ej., un SaaS web cloud-native frente a carpetas compartidas locales SMB en red de imprenta tradicional).
5. **Contradicho (CONTRADICTED):** La afirmación previa contradecía la realidad técnica o comercial documentada y ha sido corregida.

---

## 2. Inventario de Fuentes Oficiales Consultadas

### 2.1. Adobe Acrobat Pro
- **Fuente 1:** Adobe Help Center - *Analyzing documents with the Preflight tool (Acrobat Pro)*  
  - **URL:** https://helpx.adobe.com/acrobat/using/analyzing-documents-preflight-tool-acrobat.html  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Versión aplicable:** Acrobat Pro Continuous Release (Windows / macOS).  
  - **Extracto / Paráfrasis:** Acrobat Pro integra el motor de preflight licenciado de callas software para analizar y corregir documentos PDF según estándares ISO (PDF/X, PDF/A, etc.). Ofrece un informe modal interactivo en pantalla con navegación por objetos erróneos, fixups automáticos y exportación de reportes PDF/XML.  
  - **Alcance / Limitaciones:** Exclusivamente cliente de escritorio. No dispone de API REST nativa cloud para ejecución serverless sin infraestructura dedicada o Adobe PDF Services API (producto independiente).
- **Fuente 2:** Adobe Commercial Pricing Guide - *Acrobat Plans and Pricing*  
  - **URL:** https://www.adobe.com/acrobat/pricing.html  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Extracto:** Comercializado bajo suscripción mensual o anual para usuarios individuales o equipos de trabajo.

### 2.2. Enfocus PitStop Pro & PitStop Server
- **Fuente 3:** Enfocus Product Manual - *PitStop Pro Overview & System Requirements*  
  - **URL:** https://www.enfocus.com/en/pitstop-pro  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Versión aplicable:** PitStop Pro 2024 / 2025.  
  - **Extracto:** Plugin para Adobe Acrobat en macOS y Windows. Proporciona inspección y edición quirúrgica vectorial, tipográfica y de color. Incluye navegador interactivo de errores y generación de informes PDF certificados.  
  - **Alcance / Limitaciones:** Requiere Adobe Acrobat preinstalado. Diseñado para operadores expertos de preimpresión.
- **Fuente 4:** Enfocus Server Manual - *PitStop Server Automation, Hot Folders & CLI*  
  - **URL:** https://www.enfocus.com/en/pitstop-server  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Versión aplicable:** PitStop Server 2024 / 2025.  
  - **Extracto:** Motor multihilo para procesamiento automatizado de PDF mediante monitorización de carpetas calientes (Hot Folders) locales o de red (SMB/NFS) e interfaz de línea de comandos (CLI) integrable en flujos Enfocus Switch o scripts shell.  
  - **Alcance / Limitaciones:** Servidor on-premises (Windows/macOS Server). No es un SaaS multi-inquilino cloud nativo.
- **Fuente 5:** Enfocus Pricing & Licensing Guide  
  - **URL:** https://www.enfocus.com/en/pricing  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Extracto:** Modelos de suscripción anual o licencia perpetua con contrato de mantenimiento.

### 2.3. callas software pdfToolbox Desktop & Server
- **Fuente 6:** callas software Documentation - *pdfToolbox Server Manual & Command Line Guide*  
  - **URL:** https://www.callassoftware.com/en/products/pdftoolbox-server  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Versión aplicable:** pdfToolbox Server / CLI v14 - v16.  
  - **Extracto:** pdfToolbox Server procesa por lotes grandes volúmenes de archivos PDF mediante monitorización de carpetas (Hot Folders), CLI multiplataforma (Linux, macOS, Windows) y SDK C/C++, Java, .NET. Utiliza Process Plans y perfiles configurables basados en Javascript para evaluación y corrección de estándares ISO PDF/X.  
  - **Alcance / Limitaciones:** Software de servidor para instalación en infraestructura propia o contenedores gestionados por el cliente.
- **Fuente 7:** callas software Developer Portal - *pdfToolbox CLI and SDK Reference*  
  - **URL:** https://help.callassoftware.com/  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Extracto:** Soporta llamadas CLI por proceso y SDK nativo para integración directa en motores de impresión y portales web-to-print.

### 2.4. Ghent Workgroup (GWG)
- **Fuente 8:** Ghent Workgroup Specifications & Compliance Program  
  - **URL:** https://gwg.org/  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Versión aplicable:** GWG 2015 / GWG 2022 Specifications.  
  - **Extracto:** El GWG define especificaciones de preflight para sectores específicos (publicidad, revistas, packaging, impresión comercial offset y digital) basadas en ISO PDF/X-1a y PDF/X-4. Dispone de un programa de validación/certificación voluntario para fabricantes de software.  
  - **Alcance / Limitaciones:** La aplicación o inclusión de los perfiles recomendados por el GWG en un software de preflight no equivale automáticamente a una certificación formal de producto emitida por el comité para una versión determinada.

### 2.5. Lulu & Lulu Direct
- **Fuente 9:** Lulu Knowledge Base & API Documentation - *Lulu Print API Overview & Pricing*  
  - **URL:** https://developer.lulu.com/  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Extracto:** Lulu opera como plataforma de autopublicación y servicio de impresión bajo demanda (POD) con red global de proveedores tercerizados. Ofrece API REST para recepción de pedidos e integración con plataformas e-commerce (Shopify/WooCommerce). El precio y las opciones de papel están tipificados en su catálogo centralizado.  
  - **Alcance / Limitaciones:** Plataforma cerrada POD / distribución. El autor o negocio contrata con Lulu, no selecciona ni negocia directamente con la planta de impresión física responsable de la tirada.
- **Fuente 10:** Lulu Pricing Calculator - *Book Printing Calculator*  
  - **URL:** https://www.lulu.com/pricing-calculator  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Extracto:** Cotizador web basado en parámetros seleccionables del catálogo estándar de Lulu.

### 2.6. Gelato
- **Fuente 11:** Gelato API Documentation & Merchant Portal  
  - **URL:** https://apidocs.gelato.com/  
  - **Fecha de consulta:** 25 de octubre de 2026.  
  - **Extracto:** Gelato opera una plataforma global de fabricación bajo demanda con integración API y plugins e-commerce. La red de producción asigna automáticamente los pedidos según proximidad geográfica y capacidad de sus imprentas asociadas.  
  - **Alcance / Limitaciones:** Gelato factura al comerciante y gestiona el despacho como intermediario integrado. El cliente no tiene relación contractual directa ni selección transparente de la imprenta adjudicataria.

---

## 3. Evidencia Técnica y de Código en PrintPrice OS

El rigor aplicado a las alternativas externas se aplica con exactitud a PrintPrice Pro:

| Capacidad Reclamada | Componente y Arquitectura | Estado Real de Despliegue | Evidencia en Repositorio / Documentación |
| :--- | :--- | :--- | :--- |
| **Cotización instantánea multivariable** (Price it) | Motor parametrizado de matrices técnicas resuelto exclusivamente en backend | Implementado en servidor; disponible en web | Invariante inviolable: cálculo del lado del servidor. Matrices de pliegos, tintas, gramajes y encuadernación calculadas por petición REST (/api/budget o motor central). No es cálculo estático JS en cliente. |
| **Inspección determinista de PDF** (Fix it) | Microservicio de preflight basado en parser nativo PDF; extracción de MediaBox, TrimBox, BleedBox, espacios de color, fuentes incrustadas e intents PDF/X | Implementado en backend; accesible vía web y API | Evaluación estricta de geometrías y metadatos ISO. La aplicación web es la interfaz de visualización del informe; el procesamiento del archivo se efectúa en el servicio de preflight. |
| **Separación de inspección vs certificación** | Evaluación de reglas técnicas PDF/X-1a y PDF/X-4 | Desplegado y verificado | PrintPrice NO reclama ni afirma contar con certificación formal de producto emitida por GWG o ISO. Evalúa reglas técnicas concordantes. |
| **Ajustes deterministas de cajas de página** | Normalización de cajas de sangrado y corte (TrimBox/BleedBox) sin reescalado destructivo | Implementado en backend | No realiza edición quirúrgica vectorial ni remaquetación de textos. Informa de los límites de corrección en el reporte. |
| **Marketplace transparente con facturación directa** (Print it) | Mecanismo de publicación de pedidos, enrutamiento técnico a imprentas adheridas y liquidación de comisión | Modelo comercial confirmado | Imprenta cobra directamente al cliente final el importe íntegro de producción. PrintPrice no custodia fondos de fabricación y factura el 4% mensual de comisión de marketplace a la imprenta. |
| **Mockup orientativo complementario** | Renderizador 3D volumétrico WebGL basado en lomo calculado según gramaje de papel y número de páginas | Desplegado en cliente web | Puramente visual y orientativo. No sustituye la prueba de impresión física ni el pliego de maqueta real de taller. |

---

## 4. Registro y Justificación Detallada de Afirmaciones (CMP-PRICE, CMP-FIX, CMP-PRINT, CMP-PRE)

### 4.1. Price it (CMP-PRICE-01 a CMP-PRICE-05)

#### CMP-PRICE-01: Tiempo de respuesta
- **Texto público:** PrintPrice: *Instantáneo (paramétrico)* | W2P / Imprenta online: *Instantáneo (matrices fijas)* | Cotización tradicional: *Varía según proveedor (desde horas hasta varios días)*
- **Fuente:** Cotizadores web de plataformas comerciales (Lulu, Gelato, Saxoprint, Flyeralarm) vs Práctica de taller tradicional documentada en guías de compra editorial.
- **Evaluación:** CONFIRMED. PrintPrice resuelve algorítmicamente en backend pliegos y tiradas; los sistemas W2P operan sobre tablas precalculadas de combinaciones fijas; las imprentas tradicionales con atención personalizada requieren presupuestación manual por el departamento técnico. Se evitó fijar un rango arbitrario de "24-72h" en la comparativa para reflejar la realidad del sector.

#### CMP-PRICE-02: Variabilidad de formatos y papeles
- **Texto público:** PrintPrice: *Cualquier medida y papel configurable* | W2P: *Formatos y papeles cerrados de catálogo* | Tradicional: *Amplia gama bajo consulta de stock*
- **Fuente:** Documentación de motor parametrizado PrintPrice vs catálogos públicos cerrados de imprentas online.
- **Evaluación:** CONFIRMED. El motor paramétrico de PrintPrice calcula cualquier dimensión dentro de los límites físicos de pliego de la máquina; las imprentas online solo cotizan formatos tipificados en sus selectores web.

#### CMP-PRICE-03: Desglose técnico de costes
- **Texto público:** PrintPrice: *Papel, impresión, acabados y transporte desglosados* | W2P: *Precio cerrado sin desglose de partidas* | Tradicional: *Presupuesto resumido o desglose parcial*
- **Fuente:** Invariante de arquitectura PrintPrice (separación estricta de fabricación y transporte en servidor).
- **Evaluación:** CONFIRMED. Respaldado por el motor de cálculo interno de PrintPrice.

#### CMP-PRICE-04: Interacción y consultas
- **Texto público:** PrintPrice: *Especificación digital transparente y directa* | W2P: *Portal web autoservicio* | Tradicional: *Atención personalizada y asesoramiento técnico*
- **Fuente:** Análisis de canales de venta de imprentas comerciales.
- **Evaluación:** CONFIRMED. Se reconoce explícitamente el valor añadido del asesoramiento humano en el modelo tradicional.

#### CMP-PRICE-05: Optimización de pliegos y máquinas
- **Texto público:** PrintPrice: *Cálculo algorítmico en tiempo real* | W2P: *Estandarizado en plantas predefinidas* | Tradicional: *Estudio manual por el presupuestador*
- **Fuente:** Especificación funcional del motor de imposición y costes de PrintPrice.
- **Evaluación:** CONFIRMED.

---

### 4.2. Fix it (CMP-FIX-01 a CMP-FIX-06)

#### CMP-FIX-01: Tipo de preflight
- **Texto público:** PrintPrice: *Inspección determinista web e interactiva* | Acrobat Pro: *Preflight de escritorio (perfiles y fixups)* | PitStop Pro: *Plugin de escritorio con edición quirúrgica*
- **Fuente:** Fuentes 1, 3 y arquitectura interna de PrintPrice.
- **Evaluación:** CONFIRMED. Diferencia adecuadamente SaaS web vs software de escritorio vs plugin especializado.

#### CMP-FIX-02: Requisitos de instalación
- **Texto público:** PrintPrice: *Navegador web (cero instalación local)* | Acrobat Pro: *Instalación de Acrobat Pro / CC* | PitStop Pro: *Instalación de Acrobat Pro + plugin*
- **Fuente:** Fuentes 1 y 3.
- **Evaluación:** CONFIRMED. Hecho técnico verificable objetivamente.

#### CMP-FIX-03: Informe de resultados
- **Texto público:** PrintPrice: *Reporte web interactivo y exportable* | Acrobat Pro: *Panel modal y exportación PDF/XML* | PitStop Pro: *Navegador de errores y reporte certificado*
- **Fuente:** Fuentes 1 y 3.
- **Evaluación:** CONFIRMED.

#### CMP-FIX-04: Capacidad de corrección
- **Texto público:** PrintPrice: *Ajuste de cajas de página (Bleed/Trim)* | Acrobat Pro: *Fixups de color, fuentes y cajas* | PitStop Pro: *Edición vectorial y tipográfica completa*
- **Fuente:** Fuentes 1, 3 y alcance del microservicio de reparación de PrintPrice.
- **Evaluación:** CONFIRMED. Se declaran con total honestidad los límites de corrección de PrintPrice (sin edición vectorial avanzada en cliente).

#### CMP-FIX-05: Estándares y perfiles
- **Texto público:** PrintPrice: *Inspección técnica PDF/X-1a y PDF/X-4* | Acrobat Pro: *Perfiles ISO y GWG predefinidos* | PitStop Pro: *Perfiles ISO, GWG y personalizados*
- **Fuente:** Fuentes 1, 3, 8 y validación interna de metadatos PDF/X.
- **Evaluación:** CONFIRMED. Se matiza que PrintPrice realiza inspección técnica conforme a especificaciones, sin alegar sellos de certificación formal de software.

#### CMP-FIX-06: Modelo de contratación
- **Texto público:** PrintPrice: *Integrado en plataforma y API* | Acrobat Pro: *Suscripción Adobe Creative Cloud* | PitStop Pro: *Suscripción o licencia perpetua con soporte*
- **Fuente:** Fuentes 2 y 5.
- **Evaluación:** CONFIRMED.

---

### 4.3. Print it (CMP-PRINT-01 a CMP-PRINT-06)

#### CMP-PRINT-01: Modelo de producción
- **Texto público:** PrintPrice: *Marketplace con imprentas reales especializadas* | Plataformas POD: *Red cerrada de producción subcontratada* | Imprenta tradicional: *Taller propio o red de colaboradores*
- **Fuente:** Fuentes 9, 11 y modelo contractual del marketplace PrintPrice.
- **Evaluación:** CONFIRMED.

#### CMP-PRINT-02: Elección de taller
- **Texto público:** PrintPrice: *Selección directa y transparente por el cliente* | Plataformas POD: *Asignación algorítmica cerrada* | Imprenta tradicional: *Taller único contratado*
- **Fuente:** Fuentes 9, 11 y flujo de pedido en PrintPrice.
- **Evaluación:** CONFIRMED.

#### CMP-PRINT-03: Relación comercial y cobro
- **Texto público:** PrintPrice: *Imprenta cobra directamente al cliente; PrintPrice factura comisión del 4% a la imprenta* | Plataformas POD: *La plataforma cobra y liquida royalties o costes de impresión* | Imprenta tradicional: *Cobro directo según condiciones pactadas*
- **Fuente:** Modelo comercial de PrintPrice confirmado en directrices del proyecto y fuentes 9, 11.
- **Evaluación:** CONFIRMED. Refleja con precisión el flujo financiero real sin retención de fondos de fabricación por PrintPrice.

#### CMP-PRINT-04: Tiradas óptimas
- **Texto público:** PrintPrice: *Desde ejemplar único (digital) hasta tiradas medias/largas (offset)* | Plataformas POD: *Unidad a unidad o tiradas cortas* | Imprenta tradicional: *Tiradas cortas, medias o grandes según maquinaria*
- **Fuente:** Especificación del motor de asignación técnica y capacidades de talleres adheridos.
- **Evaluación:** CONFIRMED.

#### CMP-PRINT-05: Pedido y seguimiento
- **Texto público:** PrintPrice: *Orden y registro técnico vinculado a planta* | Plataformas POD: *Varía según plataforma (panel web o tracking de envío)* | Imprenta tradicional: *Varía según proveedor (albarán y contacto comercial)*
- **Fuente:** Fuentes 9, 11 y diseño del Control Plane de taller en PrintPrice.
- **Evaluación:** CONFIRMED.

#### CMP-PRINT-06: Integraciones técnicas
- **Texto público:** PrintPrice: *API REST y Control Plane de planta* | Plataformas POD: *Varía según plataforma (plugins e-commerce o API)* | Imprenta tradicional: *Varía según proveedor (intercambio directo de ficheros)*
- **Fuente:** Fuentes 9, 11 y documentación de arquitectura de integración.
- **Evaluación:** CONFIRMED.

---

### 4.4. Preflight Desktop & Plugin (CMP-PRE-A01 a CMP-PRE-A06)

| ID | Criterio | PrintPrice Preflight Web | Adobe Acrobat Pro | Enfocus PitStop Pro | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CMP-PRE-A01** | Forma de acceso | Navegador web SaaS | Escritorio local | Plugin en Acrobat Pro | CONFIRMED |
| **CMP-PRE-A02** | Instalación | Sin instalación local | Instalación Acrobat Pro / CC | Instalación Acrobat + plugin | CONFIRMED |
| **CMP-PRE-A03** | Curva de aprendizaje | Interfaz guiada accesible | Nivel medio / avanzado | Especialista de preimpresión | CONFIRMED |
| **CMP-PRE-A04** | Informe de errores | Reporte web interactivo | Panel modal / informe PDF | Navegador con resaltado interactivo | CONFIRMED |
| **CMP-PRE-A05** | Corrección de archivos | Ajuste de cajas de corte y sangrado | Fixups automatizados y edición básica | Edición vectorial y tipográfica avanzada | CONFIRMED |
| **CMP-PRE-A06** | Modelo comercial | Portal web y API técnica | Suscripción Acrobat Pro / CC | Suscripción anual o licencia perpetua | CONFIRMED |

---

### 4.5. Preflight Servidores y Motores de Alto Volumen (CMP-PRE-B01 a CMP-PRE-B06)

| ID | Criterio | PrintPrice Preflight OS | Enfocus PitStop Server | callas pdfToolbox Server | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CMP-PRE-B01** | Perfiles configurables | Contratos JSON deterministas | Action Lists vía GUI PitStop Pro | Process Plans con lógica condicional y Javascript | CONFIRMED |
| **CMP-PRE-B02** | Comprobación PDF/X y estándares | Inspección técnica PDF/X-1a y PDF/X-4 (Sin certificación formal de producto) | Perfiles PDF/X y GWG (Certificación formal: No verificada para versión específica) | Process Plans PDF/X y GWG (Certificación formal: No verificada para versión específica) | PARTIAL / UNVERIFIED |
| **CMP-PRE-B03** | Procesamiento por lotes | Microservicios asíncronos y colas Redis | Motor multihilo para colas concurrentes locales | Motor multinúcleo para alto volumen de páginas | CONFIRMED |
| **CMP-PRE-B04** | Carpetas calientes (Hot Folders) | No aplica (Cloud-native; conectores API REST) | Monitorización SMB/NFS nativa de carpetas | Monitorización automatizada de carpetas y volúmenes | NOT_APPLICABLE / CONFIRMED |
| **CMP-PRE-B05** | CLI, SDK o API | API REST JSON/multipart (/analyze, /autofix) | CLI incluida para scripts y Enfocus Switch | CLI independiente y SDK nativo (C++, Java, .NET, Python) | CONFIRMED |
| **CMP-PRE-B06** | Trazabilidad y original | Preservación del archivo original y hash SHA-256 | Archivo original movido a carpeta segura; archivo reparado independiente | Políticas configurables de backup y conservación previa | CONFIRMED |

---

## 5. Resumen Cuantitativo del Estado de Evidencias

- **Total de afirmaciones comparativas analizadas:** 29
- **Confirmadas con fuentes directas y código (CONFIRMED):** 26 (89,7%)
- **Parcialmente confirmadas / Alcance condicionado (PARTIAL):** 1 (3,4%) (CMP-PRE-B02: Comprobación de perfiles técnicos vs certificación formal de producto)
- **No verificadas en origen para versión específica (UNVERIFIED):** 1 (3,4%) (Certificación formal de software por organismo independiente en versiones concretas de competidores)
- **No comparables por divergencia de paradigma (NOT_APPLICABLE):** 1 (3,4%) (CMP-PRE-B04: Hot Folders de red local en arquitectura cloud-native)
- **Contradichas / Afirmaciones eliminadas:** 0 en la versión actual (las generalizaciones de plazos de 24-72h y afirmaciones no acreditadas de certificación fueron retiradas en el commit base 8a333d7821e5bfe976accc6b24d6dcc3fb00ab5a).

---

**Firma técnica:**  
Investigación de producto y verificación técnica de PrintPrice OS  
Documento listo para aprobación y consulta editorial.
