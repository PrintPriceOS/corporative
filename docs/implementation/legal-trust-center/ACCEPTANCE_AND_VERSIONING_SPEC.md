# Especificación Técnica de Puntos de Aceptación, Versionado y Registro de Consentimiento
## PrintPrice Pro — Arquitectura de Gobernanza Contractual y Auditoría

**Fecha de Elaboración:** 24 de octubre de 2026  
**Entidad Operadora:** Print Price Pro SIA (Reg. 40203631570, Rīga, Letonia)  
**Estado:** Especificación de Diseño Técnico (Blueprint) y Estado de Implementación

---

### 1. Estado de Desarrollo del Sistema de Aceptación

Para evitar cualquier confusión técnica o regulatoria, se delimitan los componentes según su nivel de madurez:

| Componente | Nivel de Madurez | Archivos y Evidencia | Descripción y Alcance Real |
| :--- | :--- | :--- | :--- |
| **Consentimiento de Cookies / Telemetría** | **IMPLEMENTADO Y PROBADO** | `lib/consent.ts`, `lib/telemetry.ts`, `components/monolith/CookieBanner.tsx` | Almacenamiento local en cliente (`ppp_consent_v1_audit`, `ppp_audit_consent_proof`), comprobación de `hasAnalyticsConsent()`, purgado de telemetría ante revocación y reapertura interactiva desde el footer. |
| **Puntos de Aceptación de Términos Vigentes** | **DISEÑADO** | Especificación de flujos de onboarding en Control Plane y checkout de PRINT IT. | Checkboxes obligatorios no premarcados para formalizar contratos con talleres e imprentas. |
| **Esquema JSON de Auditoría Contractual** | **ESPECIFICACIÓN DE DISEÑO (BLUEPRINT)** | Sección 2 de este documento. | Estructura de datos diseñada para el futuro servicio backend de registro de auditoría. **No constituye actualmente un registro inmutable ni una base de datos distribuida en producción.** |
| **Aceptación de Documentos en Borrador (Draft)** | **ESTRICTAMENTE PROHIBIDO** | Regla de gobernanza del sistema. | **Ningún formulario, botón o checkbox puede solicitar o registrar la aceptación legal de documentos en estado de borrador.** Los borradores solo son accesibles como material de consulta previa. |

---

### 2. Especificación de Diseño: Modelo JSON de Registro Contractual

El siguiente esquema JSON representa el diseño arquitectónico para el futuro registro backend de eventos de formalización contractual (cuando los términos hayan sido formalmente aprobados por la dirección):

```json
{
  "$schema": "https://printprice.pro/schemas/v1/contract-acceptance-spec.json",
  "spec_status": "DESIGN_BLUEPRINT_ONLY",
  "acceptanceId": "acc_sample_01J9X8B2M4K8ZP7Q9E1YTR",
  "documentId": "partner-terms",
  "documentVersion": "v1.1",
  "documentStatus": "in_force",
  "documentHashSha256": "4f8b9a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
  "locale": "es",
  "actor": {
    "userId": "usr_sample_991823746",
    "organizationId": "org_ph_sample_40203631570",
    "role": "printhouse_admin",
    "emailHashSha256": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
  },
  "context": {
    "surface": "control_plane",
    "flow": "onboarding_printhouse",
    "clientIpTruncated": "194.126.x.x",
    "userAgentCategory": "Desktop / Blink (Chrome/Edge)"
  },
  "justificationBasis": {
    "legalGround": "GDPR Art. 6(1)(b) - Contract Formation & Proof of Commercial Consent",
    "retentionPolicy": "Statutory commercial limitation period under Latvian Civil Law (10 years) with strict encrypted access controls"
  },
  "timestampUtc": "2026-10-24T04:00:00.000Z",
  "method": "explicit_unckecked_checkbox"
}
```

> **Nota sobre el hash de ejemplo:** El valor `documentHashSha256` mostrado arriba es un identificador de ejemplo ficticio de 64 caracteres hexadecimales para ilustrar la especificación, sustituyendo cualquier valor de cadena vacía previa.

---

### 3. Justificación de Datos de Contexto (IP y User-Agent)

En cumplimiento de los principios de minimización de datos y limitación del plazo de conservación del RGPD (Art. 5.1.c y 5.1.e):
1. **Necesidad y Base Jurídica:**
   - La recogida de metadatos de conexión al formalizar una relación contractual se fundamenta en el **Art. 6.1.f del RGPD (Interés legítimo)** y en las normas de comercio electrónico para acreditar la autenticidad, autoría e integridad del consentimiento prestado (prueba de la contratación civil y prevención de suplantación de identidad).
2. **Minimización y Tratamiento:**
   - Para telemetría analítica ordinaria, las direcciones IP se truncan inmediatamente (enmascaramiento del último octeto en IPv4).
   - Para registros de formalización contractual en transacciones B2B, los datos de auditoría se almacenan cifrados con control estricto de acceso por perfiles autorizados de asesoría jurídica.
3. **Periodo de Conservación:**
   - Limitado estrictamente al plazo de prescripción de acciones legales derivadas del contrato conforme a la legislación mercantil letona aplicable, tras el cual se procederá a su purga irreversible.

---

### 4. Reglas de Inmutabilidad, Versionado y No Retroactividad

1. **Retención de Versión Aplicable por Pedido:**
   Cada orden formalizada en PRINT IT conserva la vinculación exacta con los términos y especificaciones técnicas vigentes en la fecha de aceptación del encargo. Las modificaciones posteriores de los términos de plataforma no se aplican de forma retroactiva a pedidos ya cerrados.
2. **Prohibición de Aceptación de Borradores:**
   El motor de registro bloqueará cualquier intento de procesar o archivar aceptaciones sobre documentos marcados con el estado `draft` o `in_consultation`.
3. **Preaviso y Notificación de Actualizaciones (P2B):**
   Cualquier actualización material de las condiciones contractuales para operadores profesionales se notificará con el preaviso preceptivo de 15 días (o plazo superior adecuado a la complejidad técnica) conforme al Reglamento (UE) 2019/1150, salvo supuestos excepcionales tasados en la norma.
