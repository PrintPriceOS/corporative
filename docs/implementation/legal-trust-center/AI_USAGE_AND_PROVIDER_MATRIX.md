# Matriz de Uso de Inteligencia Artificial, Sistemas Deterministas y Evidencia Técnica
## PrintPrice Pro — Auditoría Técnica de Afirmaciones, Proveedores y Garantías de Supervisión

**Fecha de Auditoría:** 24 de octubre de 2026  
**Entidad Operadora:** Print Price Pro SIA (Reg. 40203631570, Rīga, Letonia)  
**Estado:** Documento Interno de Auditoría y Verificación Técnica

---

### 1. Auditoría de Afirmaciones Clave: Estado de Evidencia

Conforme a la revisión de exactitud técnica y gobernanza, se auditan las cinco afirmaciones previas contrastándolas contra el código fuente, la configuración no secreta y los contratos acreditados en el repositorio:

| Afirmación Previa | Estado de Verificación | Evidencia Técnica en el Repositorio | Dictamen y Acción de Gobernanza |
| :--- | :--- | :--- | :--- |
| **1. «100 % determinista»** | **PARCIALMENTE VERIFICADO** | Los algoritmos matemáticos de imposición en pliego (`PRICE IT`) y los analizadores sintácticos de geometría PDF (`FIX IT`) son deterministas. No obstante, la plataforma incluye heurísticas de corrección automática y una superficie prototipo de agente autónomo (`/ai-agent`). | **Retirar la afirmación absoluta como garantía global.** Especificar con precisión qué módulos operan bajo reglas matemáticas deterministas (cálculo e inspección geométrica) y cuáles emplean heurísticas o interfaces de asistencia. |
| **2. «Solo Mockup utiliza IA»** | **REFUTADO POR EL CÓDIGO** | En el repositorio existe una superficie dedicada al prototipo de agente autónomo de producción en [`app/ai-agent/page.tsx`](../../../app/ai-agent/page.tsx) y su proxy de enrutamiento en [`app/api/v1/[[...path]]/route.ts`](../../../app/api/v1/[[...path]]/route.ts) (`scopes: ["agents:execute"]`). | **Corregido.** Reconocer la existencia del módulo experimental de Agente de Producción (`/ai-agent`) y describir su alcance actual como prototipo asistido bajo supervisión humana. |
| **3. «Google Cloud Vertex AI»** | **NO VERIFICADO** | No existen claves API, dependencias del SDK de Google Cloud (`@google-cloud/vertexai`), variables de entorno ni endpoints de Vertex AI configurados en este repositorio corporativo. La página de Mockup enlaza a la aplicación externa `https://mockup.printprice.pro/`. | **Retirar la garantía pública de Google Cloud Vertex AI.** Clasificar como **NO VERIFICADO** en documentación interna mientras no se aporte el contrato y la arquitectura de infraestructura del subdominio de maquetas. |
| **4. «Procesamiento exclusivamente en la UE»** | **NO VERIFICADO (para IA)** | La infraestructura de la web corporativa se ejecuta en servidores de la UE, pero la ubicación geográfica exacta de los centros de inferencia de servicios externos de renderizado o modelos generativos no está acreditada en este repositorio. | **Retirar la garantía pública territorial sobre inferencia de IA.** Mantener la declaración territorial exclusivamente para la infraestructura corporativa verificada y marcar los servicios externos como **NO VERIFICADO**. |
| **5. «No se entrenan modelos públicos»** | **NO VERIFICADO** | No se dispone en el repositorio de los acuerdos de procesamiento de datos (DPA / Enterprise Terms) suscritos con proveedores de modelos generativos que certifiquen contractualmente el compromiso de no entrenamiento (*zero data retention / no training*). | **Retirar la garantía contractual pública.** Exigir la aportación del DPA corporativo con el proveedor de IA antes de restablecer esta declaración en documentos vinculantes. |

---

### 2. Desglose de Operaciones por Dimensión Técnica

Para cada componente del sistema, se diferencian estrictamente las fases de tratamiento:

#### A. PRICE IT (Motor de Cálculo de Costes)
- **Almacenamiento:** Temporal en memoria durante la sesión; resultados guardados en `localStorage` (`ppos_project_results`) únicamente si el usuario los guarda explícitamente.
- **Inferencia:** No aplica (cálculo algebraico determinista de pliegos, tintas y horas de máquina).
- **Logs:** Registros técnicos de tiempo de cómputo en consola y telemetría de rendimiento sujeta a consentimiento.
- **Conservación:** Purgado al cerrar la sesión salvo guardado voluntario del proyecto.
- **Entrenamiento:** No aplica.

#### B. FIX IT (Preflight de Archivos PDF)
- **Almacenamiento:** Archivos PDF cargados temporalmente en el volumen de procesamiento para parseo sintáctico de primitivas.
- **Inferencia:** No aplica (análisis determinista contra reglas ISO 15930 / PDF/X y perfiles de máquina).
- **Logs:** Identificadores anónimos de trabajo (`job_id`), severidad de alertas y códigos de regla infringida.
- **Conservación:** Purgado automático programado de los archivos temporales tras la generación del informe.
- **Entrenamiento:** Ningún archivo de cliente se utiliza para entrenamiento de modelos.

#### C. MOCKUP 3D (Visualizador Complementario)
- **Almacenamiento:** Imagen de cubierta procesada para mapeo de textura en cliente (WebGL / Three.js) y transferencia al servicio de renderizado de `https://mockup.printprice.pro/`.
- **Inferencia:** **NO VERIFICADO EN ESTE REPOSITORIO** (referencia externa a modelos de renderizado asistido).
- **Logs:** Registros de sesión y parámetros geométricos del lomo.
- **Conservación:** **NO VERIFICADO** en el repositorio del subdominio de maqueta.
- **Entrenamiento:** **NO VERIFICADO** contractualmente en este repositorio.

#### D. AI AGENT CORE (`/ai-agent`)
- **Almacenamiento:** Prototipo de especificaciones de ejecución (`execution_id`, `trace_id`).
- **Inferencia:** Actualmente modelada en interfaz y mock proxy en `/api/v1/agents`. No realiza llamadas directas a LLMs desde el código cliente.
- **Logs:** Trazabilidad de pasos simulados (`budget_estimate`, `preflight_validation`, `production_routing`).
- **Conservación:** Datos estáticos de ejemplo en cliente.
- **Entrenamiento:** No aplica en el estado actual de prototipo corporativo.

#### E. ROUTER DE INTENCIÓN DE CONTACTO (`/contact`)
- **Almacenamiento:** Lectura local de `localStorage` (`ppos_telemetry_history`).
- **Inferencia:** No aplica (heurística ponderada basada en pesos numéricos de rutas visitadas).
- **Logs:** Evento anónimo de intención sugerida.
- **Conservación:** Local en el navegador del usuario, purgado al borrar datos de navegación o revocar cookies.
- **Entrenamiento:** No aplica.

---

### 3. Delimitación de Responsabilidad y Avisos Contextuales

1. **Aviso de Preflight:** Las comprobaciones técnicas señalan discrepancias respecto al perfil configurado; no constituyen certificación absoluta PDF/X universal para todos los RIPs del mercado.
2. **Aviso de Mockup 3D:** Representación gráfica orientativa para marketing y comercio digital; no sustituye a la prueba contractual física de color (ISO 12647) ni asegura la textura física del papel.
3. **Supervisión Humana Obligatoria:** Ningún sistema automatizado o asistido puede formalizar pedidos, autorizar cargos bancarios ni sobreescribir archivos originales sin la validación expresa del usuario.
