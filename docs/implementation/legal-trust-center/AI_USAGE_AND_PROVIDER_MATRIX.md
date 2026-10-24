# Matriz de Uso de Inteligencia Artificial y Motores Deterministas
## PrintPrice Pro — Clasificación Técnica, Proveedores y Garantías de Supervisión

**Fecha de Elaboración:** 24 de octubre de 2026  
**Entidad Operadora:** Print Price Pro SIA (Reg. 40203631570, Letonia)

---

### 1. Clasificación Funcional: Determinismo vs. IA

| Función / Módulo | Naturaleza Tecnológica | ¿Utiliza Modelos de IA Generativa o LLM? | Proveedor de Computación | Datos Transferidos | Finalidad y Límites Técnicos |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PRICE IT (Calculador de Presupuestos)** | **100 % DETERMINISTA** | **NO** | Servidores propios en la UE. | Parámetros técnicos del libro (formato, páginas, gramajes, tintas). | Algoritmos matemáticos de imposición en pliego, cálculo de hojas consumidas, mermas de arranque y matrices de tarifas horarias de máquina. El resultado es exacto y reproducible. |
| **FIX IT (Preflight de PDF)** | **100 % DETERMINISTA** | **NO** | Servidores propios en la UE. | Archivo PDF del usuario, metadatos sintácticos, fuentes, cajas de página y perfiles de color. | Análisis forense estricto basado en estándares internacionales ISO (ISO 15930 / PDF/X). Inspecciona geometría (`MediaBox`, `TrimBox`, `BleedBox`), resolución de mapas de bits (DPI) y espacios de color (CMYK vs RGB). **No realiza conjeturas probabilísticas ni modificaciones no autorizadas.** |
| **MOCKUP (Generador de Maquetas 3D)** | **ASISTENCIA VISUAL CON IA** | **SÍ** (Modelos de visión y renderizado ambiental) | Google Cloud Vertex AI (Bélgica / Frankfurt, UE). | Archivo de imagen de cubierta (JPEG/PNG/PDF plano) y parámetros visuales de grosor. | Genera perspectivas 3D, sombras y ambientación de estudio comercial a partir de la cubierta 2D. Se utiliza como **función complementaria de marketing**. |
| **ROUTER DE CONTACTO (`/contact`)** | **REGLAS HEURÍSTICAS LOCALES** | **NO** | Navegador del cliente (JavaScript local). | Histórico de páginas visitadas en la sesión almacenado en `localStorage`. | Algoritmo determinista de puntuación condicional según el historial de navegación para sugerir el formulario idóneo (autor, editorial, imprenta o desarrollador). No procesa texto libre con IA generativa. |
| **AGENTES Y ASISTENTES TÉCNICOS** | **SISTEMAS ASISTIDOS (EN DESARROLLO/BETA)** | **SÍ** (LLMs supervisados) | Infraestructura controlada en la UE. | Consultas técnicas del usuario. | Asistencia interpretativa de documentación técnica y soporte de consulta. No autorizan pedidos, pagos ni modificaciones de archivos sin aprobación humana explícita. |

---

### 2. Políticas de Entrenamiento, Confidencialidad y Retención

1. **Garantía Estricta: Cero Entrenamiento con Archivos de Usuarios:**
   - La configuración de API corporativa con los proveedores de computación de visión (Google Cloud Enterprise / Vertex AI) opera bajo el marco de **privacidad de datos empresariales de la UE**.
   - Los archivos subidos por los usuarios para preflight, cálculo o mockups **NO se utilizan para entrenar, reentrenar ni mejorar modelos fundacionales de IA**.
2. **Preservación Inviolable de los Archivos Originales:**
   - Cuando un motor de preflight o normalización técnica propone una corrección (por ejemplo, añadir sangrado por espejo o convertir fuentes a contornos), el archivo original del usuario se conserva intacto de forma permanente.
   - Cualquier archivo corregido se genera como una nueva variante identificada, y **nunca sustituye al original sin la aprobación humana explícita y documentada del usuario**.
3. **No Aceptación Tácita de Acciones Críticas:**
   - La mera interacción con el sistema o la visualización de un resultado no autoriza transferencias de fondos, pedidos vinculantes ni cambios destructivos en las órdenes de taller. Cada acción mercantil requiere una confirmación consciente y voluntaria por parte del usuario.

---

### 3. Delimitación de Responsabilidad y Avisos Contextuales

#### A. Advertencia Legal Obligatoria sobre Preflight
> **Aviso Técnico:** PrintPrice Preflight (Fix It) realiza una comprobación determinista basada en perfiles de producción estándar o en el perfil particular configurado por una imprenta adscrita. El informe técnico indica las anomalías detectadas en la estructura digital del PDF. Dicha comprobación **no constituye una garantía universal de fidelidad física de impresión**, ni exime al diseñador, editorial o autor de revisar exhaustivamente sus contenidos, pruebas de galera y textos antes de autorizar la fabricación física.

#### B. Advertencia Legal Obligatoria sobre Maquetas 3D (Mockup)
> **Aviso Técnico:** Las maquetas 3D generadas por Mockup son representaciones digitales orientativas para marketing, previsualización en pantalla y comercio electrónico. **No constituyen una prueba física contractual de color (contract proof), ni una muestra real del acabado táctil del papel, barniz o grosor exacto del lomo encuadernado.** Las dimensiones físicas definitivas se rigen por la ficha técnica del pedido acordado en taller.
