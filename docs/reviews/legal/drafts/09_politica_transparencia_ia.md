# POLÍTICA DE USO Y TRANSPARENCIA DE INTELIGENCIA ARTIFICIAL (EU AI ACT)

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Idioma:** Redactado íntegramente en Español (ES), con encabezado trilingüe.  
> **Versión:** v2026.1-draft | **Fecha de revisión:** 25 de octubre de 2026
> **Nota de idioma / Language note / Sprachhinweis:** Este documento está redactado íntegramente en español como borrador de trabajo interno; las cabeceras trilingües indican el estado del ciclo documental y no constituyen traducciones completas en EN o DE.

---

### 1. Objeto y Marco Regulatorio
1.1. La presente Política de Uso y Transparencia de Inteligencia Artificial establece los principios técnicos y garantías de gobernanza aplicables a los sistemas de software de PrintPrice Pro, en el marco de adecuación al **Reglamento (UE) 2024/1689 (Ley de IA de la Unión Europea / *EU AI Act*)**.  
1.2. PrintPrice Pro aplica el principio de veracidad técnica y transparencia estricta, diferenciando con nitidez los algoritmos deterministas basados en reglas matemáticas de los sistemas asistidos o experimentales.

---

### 2. Distinción Tecnológica: Sistemas Deterministas vs. Inteligencia Artificial

| Módulo o Funcionalidad | Clasificación Tecnológica Real | ¿Emplea Modelos de IA Generativa o LLMs? | Explicación Técnica y Predictibilidad |
| :--- | :--- | :--- | :--- |
| **Price it** (Cálculo de presupuestos) | **Software determinista algebraico** *(Verificado en código)* | **NO.** | Los precios, matrices de imposición en pliego, consumo de papel y horas de máquina se resuelven mediante fórmulas matemáticas y combinatoria determinista en backend (/api/budget). Dos solicitudes idénticas producen siempre exactamente el mismo resultado computacional. Cero riesgo de alucinación probabilística. |
| **Fix it** (Auditoría preflight de PDF) | **Parser sintáctico y normalizador determinista** *(Verificado en código)* | **NO en el código inspeccionado.** | Analiza y repara estructuras internas de PDF mediante herramientas industriales locales (`gs`, `qpdf`, `mutool`, `pdfinfo`, `exiftool`) y parsing (`pdf-lib`). Cero redes neuronales ni LLMs en el recorrido analizado. Retención temporal en disco local con purga horaria programada para trabajos finalizados según `created_at < NOW() - 24h`. |
| **Mockup 3D** (Visualizador volumétrico) | **Renderizador gráfico 3D en cliente** *(Verificado en código)* | **NO en el cliente web.** | Genera una simulación volumétrica 3D del grosor del lomo y la cubierta mediante WebGL (Three.js) en el navegador del usuario sobre las medidas calculadas del papel. *(Cualquier servicio complementario en el subdominio externo queda marcado como [PENDIENTE DE AUDITAR ARQUITECTURA EN SUBDOMINIO EXTERNO])*. |
| **AI Agent Core** (/ai-agent) y **Control Plane Assistant** | **Prototipo web / Asistente B2B real en Control Plane** | **SÍ (En B2B Control Plane).** | • Web corporativa: maqueta demostrativa con proxy mock.<br>• Control Plane B2B: Asistente conversacional de calibración de presupuestos (`calibrationAssistantService.js`) conectado a la API de **Google Gemini** vía REST en `generativelanguage.googleapis.com` (`gemini-3.5-flash` vía `aiProviderAdapter.js`). No interviene en Fix It ni trata PDFs de preflight. |

---

### 3. Compromisos de Gobernanza y No Entrenamiento de Modelos
3.1. **Algoritmos propios y Preflight:** Los manuscritos, libros, textos, cubiertas, imágenes y archivos PDF cargados por los clientes en Preflight (Fix it) **no se utilizan para el entrenamiento, re-entrenamiento o ajuste fino (*fine-tuning*) de modelos de inteligencia artificial** ni se ceden a terceros para fines de aprendizaje de máquina *(Verificado en el código y recorrido inspeccionado de Fix It: opera exclusivamente con herramientas deterministas locales de código abierto)*.  
3.2. **Ciclo de vida real de archivos:** **[CÓDIGO OBSERVADO: RETENCIÓN TEMPORAL PROGRAMADA]**. Los archivos de preflight se conservan temporalmente en disco del servidor (`PPOS_UPLOADS_DIR`) para permitir al usuario la descarga del informe forense y del archivo reparado. El worker periódico `StorageCleanupWorker` ejecuta una purga horaria para trabajos con `status IN ('COMPLETED', 'FAILED')` y antigüedad `created_at < NOW() - INTERVAL 24 HOUR`. La descarga del archivo no borra el archivo de inmediato, y el cómputo inicia con la creación del registro. *(Pendiente operativo: auditoría del alcance y exclusiones de copias de seguridad en Plesk Obsidian)*.  
3.3. **Exigencia contractual a proveedores de IA (Google Gemini en Control Plane):** Para el asistente B2B de Control Plane, PrintPrice exige la suscripción de un contrato formal con DPA europeo conforme al RGPD, evaluando las condiciones de retención del proveedor (distinguiendo entre la política de no entrenamiento y la retención cero) para garantizar que los mensajes y fragmentos de texto de calibración queden debidamente protegidos antes de su explotación comercial.

---

### 4. Supervisión Humana Obligatoria (*Human-in-the-Loop*)
1. **Ninguna decisión vinculante automatizada:** Ningún sistema algorítmico o de IA de PrintPrice puede formalizar pedidos en firme, autorizar cargos económicos o modificar el contenido original de un manuscrito sin la revisión y aprobación expresa y deliberada del usuario.
2. **Revisión técnica de taller:** La validación final de los pliegos antes de entrar a máquina corresponde siempre a los operadores especializados de preimpresión de la imprenta física responsable.

---

### 5. Deber de Transparencia ante el Usuario (Art. 50 AI Act)
5.1. **Identificación de contenidos simulados:** Las representaciones gráficas generadas por el visualizador de maquetas 3D se etiquetan claramente como «Simulación digital orientativa», advirtiendo al usuario de que no constituyen una prueba física contractual de color ni garantizan la textura del papel.  
5.2. **Canal de consulta sobre algoritmos:** Los usuarios pueden solicitar aclaraciones técnicas sobre la lógica aplicada en los cálculos automáticos de pliegos y preflight contactando con el equipo de soporte técnico en info@printprice.pro.
