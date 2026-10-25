# POLÍTICA DE USO Y TRANSPARENCIA DE INTELIGENCIA ARTIFICIAL (EU AI ACT)

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Versión:** v2026.1-draft | **Fecha de emisión:** 25 de octubre de 2026

---

### 1. Objeto y Marco Regulatorio
1.1. La presente Política de Uso y Transparencia de Inteligencia Artificial establece los principios técnicos y garantías de gobernanza aplicables a los sistemas de software de PrintPrice Pro, en cumplimiento del **Reglamento (UE) 2024/1689 por el que se establecen normas armonizadas en materia de inteligencia artificial (Ley de IA de la Unión Europea / *EU AI Act*)**.  
1.2. PrintPrice Pro aplica el principio de veracidad técnica y transparencia estricta, diferenciando con nitidez los algoritmos deterministas basados en reglas matemáticas de los sistemas asistidos o basados en modelos de aprendizaje automático.

---

### 2. Distinción Tecnológica: Sistemas Deterministas vs. Inteligencia Artificial

| Módulo o Funcionalidad | Clasificación Tecnológica | ¿Emplea Modelos de IA Generativa o LLMs? | Explicación Técnica y Predictibilidad |
| :--- | :--- | :--- | :--- |
| **Price it** (Cálculo de presupuestos) | **Software determinista algebraico** | **NO.** | Los precios, matrices de imposición en pliego, consumo de papel y horas de máquina se resuelven mediante fórmulas matemáticas y combinatoria determinista. Dos solicitudes idénticas producen siempre exactamente el mismo resultado computacional. Cero riesgo de alucinación probabilística. |
| **Fix it** (Auditoría preflight de PDF) | **Parser sintáctico determinista** | **NO.** | Analiza las estructuras internas del archivo PDF contra los requisitos técnicos de las normas ISO 15930 (PDF/X-1a, PDF/X-4) y los perfiles técnicos de taller. Comprueba cajas geométricas, perfiles ICC y fuentes incrustadas mediante reglas fijas. No utiliza IA generativa para reescribir textos ni alterar imágenes. |
| **Mockup 3D** (Visualizador volumétrico) | **Asistencia gráfica / Render 3D** | **HÍBRIDO.** | Genera una simulación visual volumétrica 3D del grosor del lomo y la cubierta mediante WebGL (Three.js) y servicios de renderizado gráfico. |
| **AI Agent Core** (/ai-agent) | **Prototipo experimental asistido** | **SÍ (En fase de demostración).** | Entorno de asistencia para la automatización guiada de flujos de producción. Actualmente opera como prototipo interactivo con supervisión humana obligatoria. |

---

### 3. Compromisos de Gobernanza y No Entrenamiento de Modelos
3.1. **Prohibición de uso para entrenamiento:** PrintPrice Pro garantiza que los manuscritos, libros, textos, cubiertas, imágenes y archivos PDF cargados por los clientes en la plataforma **no se utilizan en ningún caso para el entrenamiento, re-entrenamiento o ajuste fino (*fine-tuning*) de modelos públicos de inteligencia artificial** ni se ceden a terceros para fines de aprendizaje de máquina.  
3.2. **No retención indebida:** Los archivos sometidos a validación técnica en Fix it se procesan en memoria o almacenamiento temporal restringido en la Unión Europea y se destruyen automáticamente una vez completado el análisis o formalizado el pedido, impidiendo su almacenamiento pasivo.  
3.3. **Exigencia contractual a terceros:** Si en el futuro se integrase un servicio externo de IA generativa para maquetas avanzadas, PrintPrice exigirá contractualmente al proveedor una cláusula estricta de *Zero Data Retention* y la suscripción de un DPA conforme al RGPD.

---

### 4. Supervisión Humana Obligatoria (*Human-in-the-Loop*)
En aplicación de los principios de gobernanza del AI Act:
1. **Ninguna decisión vinculante automatizada:** Ningún sistema algorítmico o de IA de PrintPrice puede formalizar pedidos en firme, autorizar cargos económicos o modificar el contenido original de un manuscrito sin la revisión y aprobación expresa y deliberada del usuario.
2. **Revisión técnica de taller:** La validación final de los pliegos antes de entrar a máquina corresponde siempre a los operadores especializados de preimpresión de la imprenta física responsable.

---

### 5. Deber de Transparencia ante el Usuario (Art. 50 AI Act)
5.1. **Identificación de contenidos simulados:** Las representaciones gráficas generadas por el visualizador de maquetas 3D se etiquetan claramente como «Simulación digital orientativa», advirtiendo al usuario de que no constituyen una prueba física contractual de color ni garantizan la textura del papel.  
5.2. **Canal de consulta sobre algoritmos:** Los usuarios pueden solicitar aclaraciones técnicas sobre la lógica aplicada en los cálculos automáticos de pliegos y preflight contactando con el equipo de soporte técnico en info@printprice.pro.
