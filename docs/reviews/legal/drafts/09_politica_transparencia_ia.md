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
| **Fix it** (Auditoría preflight de PDF) | **Parser sintáctico determinista** *(Verificado en código)* | **NO.** | Analiza las estructuras internas del archivo PDF contra los requisitos técnicos de las normas ISO 15930 (PDF/X-1a, PDF/X-4) y los perfiles técnicos de taller. Comprueba cajas geométricas (TrimBox, BleedBox), perfiles ICC y fuentes incrustadas mediante reglas fijas. No utiliza IA generativa para reescribir textos ni alterar imágenes. |
| **Mockup 3D** (Visualizador volumétrico) | **Renderizador gráfico 3D en cliente** *(Verificado en código)* | **NO en el cliente web.** | Genera una simulación volumétrica 3D del grosor del lomo y la cubierta mediante WebGL (Three.js) en el navegador del usuario sobre las medidas calculadas del papel. *(Cualquier servicio complementario en el subdominio externo queda marcado como [PENDIENTE DE AUDITAR ARQUITECTURA EN SUBDOMINIO EXTERNO])*. |
| **AI Agent Core** (/ai-agent) | **Prototipo experimental asistido** | **SÍ (En fase de demostración).** | Entorno de asistencia interactivo para la automatización guiada de flujos de producción. Actualmente opera como prototipo demostrativo con proxy mock en /api/v1/agents y supervisión humana obligatoria. |

---

### 3. Compromisos de Gobernanza y No Entrenamiento de Modelos
3.1. **Algoritmos propios de PrintPrice:** Los manuscritos, libros, textos, cubiertas, imágenes y archivos PDF cargados por los clientes en la plataforma **no se utilizan para el entrenamiento, re-entrenamiento o ajuste fino (*fine-tuning*) de modelos de inteligencia artificial** ni se ceden a terceros para fines de aprendizaje de máquina *(Verificado en la arquitectura interna)*.  
3.2. **Eliminación técnica:** Los archivos sometidos a validación técnica en Fix it se procesan temporalmente para la emisión del informe y se destruyen automáticamente tras el procesamiento técnico y descarga *(Práctica declarada en código)*.  
3.3. **Exigencia contractual a terceros [PROPUESTA CONTRACTUAL SUJETA A CONTRATACIÓN B2B]:** Si en el futuro se integrase un servicio externo de IA generativa para maquetas avanzadas, PrintPrice exigirá contractualmente al proveedor una cláusula estricta de *Zero Data Retention* y la suscripción de un DPA conforme al RGPD antes de ponerlo en producción.

---

### 4. Supervisión Humana Obligatoria (*Human-in-the-Loop*)
1. **Ninguna decisión vinculante automatizada:** Ningún sistema algorítmico o de IA de PrintPrice puede formalizar pedidos en firme, autorizar cargos económicos o modificar el contenido original de un manuscrito sin la revisión y aprobación expresa y deliberada del usuario.
2. **Revisión técnica de taller:** La validación final de los pliegos antes de entrar a máquina corresponde siempre a los operadores especializados de preimpresión de la imprenta física responsable.

---

### 5. Deber de Transparencia ante el Usuario (Art. 50 AI Act)
5.1. **Identificación de contenidos simulados:** Las representaciones gráficas generadas por el visualizador de maquetas 3D se etiquetan claramente como «Simulación digital orientativa», advirtiendo al usuario de que no constituyen una prueba física contractual de color ni garantizan la textura del papel.  
5.2. **Canal de consulta sobre algoritmos:** Los usuarios pueden solicitar aclaraciones técnicas sobre la lógica aplicada en los cálculos automáticos de pliegos y preflight contactando con el equipo de soporte técnico en info@printprice.pro.
