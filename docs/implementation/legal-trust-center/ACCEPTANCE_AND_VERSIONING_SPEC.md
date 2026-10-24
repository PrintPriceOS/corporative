# Especificación de Puntos de Aceptación, Registro y Versionado
## PrintPrice Pro — Contrato de Integración y Trazabilidad de Consentimientos

**Fecha de Especificación:** 24 de octubre de 2026  
**Entidad Operadora:** Print Price Pro SIA (Reg. 40203631570, Letonia)

---

### 1. Inventario de Puntos de Aceptación por Aplicación

| Entorno / Superficie | Punto de Interacción | Tipo de Decisión Jurídica | Modalidad de Aceptación | Datos Almacenados en Registro |
| :--- | :--- | :--- | :--- | :--- |
| **Web Corporativa (`printprice.pro`)** | Banner de Cookies (primera visita o reapertura) | Consentimiento de Cookies y Telemetría Técnica (ePrivacy) | Botones explícitos: Aceptar / Rechazar / Guardar Preferencias. Nunca por scroll ni navegación continua. | `ppp_consent_v1` en LocalStorage: `{ analytics: boolean, timestamp: string, version: "v1.2" }`. |
| **Web Corporativa (`printprice.pro`)** | Formulario de Newsletter / Novedades | Consentimiento de Comunicaciones Comerciales (Art. 6.1.a RGPD) | Casilla de verificación desmarcada por defecto con enlace a Política de Privacidad. | Email, timestamp, IP anonimizada, URL de origen, flag `marketing_consent: true`. |
| **Budget (`budget.printprice.pro`)** | Confirmación y Lanzamiento de Proyecto de Presupuesto | Aceptación de Condiciones de Uso y Aceptación de Especificaciones Técnicas | Checkbox obligatorio antes de formalizar solicitud de presupuesto o pedido. | `document_id: "terms-general"`, `version: "v2.0"`, `user_id`, `quote_id`, `locale`, `timestamp`. |
| **PRINT IT (Marketplace)** | Paso de Pago y Formalización de Pedido con Imprenta | Perfeccionamiento del Contrato de Fabricación con la Imprenta y Términos de Plataforma | Checkbox explícito: «Acepto las Condiciones de Fabricación de [Nombre Imprenta] y las Condiciones de Plataforma de PrintPrice Pro». | `order_id`, `printer_id`, `buyer_id`, `contract_version`, `agreed_price`, `file_hash_sha256`, `timestamp_utc`. |
| **Control Plane (`control.printprice.pro`)** | Registro Oficial de Imprenta / Taller | Aceptación vinculante de Condiciones para Imprentas y DPA | Firma/Aceptación electrónica previa al acceso a la consola de máquinas. | `account_id`, `company_vat`, `authorized_signatory`, `terms_version`, `dpa_version`, `timestamp_utc`. |
| **Control Plane (`control.printprice.pro`)** | Registro Oficial de Proveedor de Papel | Aceptación vinculante de Condiciones para Paper Suppliers | Checkbox previo a la publicación del catálogo maestro. | `account_id`, `supplier_vat`, `terms_version`, `timestamp_utc`. |

---

### 2. Modelo de Datos para Registro de Aceptación Contractual

Para garantizar la prueba legal de la contratación electrónica (Directiva 2000/31/CE y Reglamento eIDAS), cada evento de aceptación contractual se registra con el siguiente esquema JSON inmutable:

```json
{
  "$schema": "https://printprice.pro/schemas/v1/consent-audit.json",
  "acceptanceId": "acc_01J9X8B2M4K8ZP7Q9E1YTR",
  "documentId": "printhouse-terms",
  "documentVersion": "2026.1",
  "documentHashSha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "locale": "es",
  "actor": {
    "userId": "usr_991823746",
    "organizationId": "org_ph_40203631570",
    "role": "printhouse_admin",
    "emailHash": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
  },
  "context": {
    "surface": "control_plane",
    "flow": "onboarding_printhouse",
    "clientIpHashed": "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  "timestampUtc": "2026-10-24T04:00:00.000Z",
  "method": "explicit_checkbox"
}
```

---

### 3. Reglas de Inmutabilidad, Versionado y No Retroactividad

1. **Retención de Versión Aplicable por Pedido:**
   Cada pedido (`order_id`) almacena una referencia inmutable a la versión exacta de las condiciones generales y particulares vigentes en el instante exacto de su formalización. Si las condiciones cambian posteriormente, los pedidos en curso continúan rigiéndose por la versión aceptada en la fecha del pedido.
2. **Prohibición de Aceptación Retroactiva:**
   La publicación de una nueva versión documental no atribuye aceptación automática a cuentas preexistentes. Cuando se produzcan cambios materiales sustanciales (conforme al Reglamento P2B, con preaviso de 15 días a profesionales), los usuarios recibirán un aviso en su siguiente inicio de sesión para examinar y aceptar los términos actualizados.
3. **Prohibición de Aceptación por Mera Navegación:**
   Queda terminantemente prohibida cualquier cláusula o diseño de interfaz que sostenga que «el mero uso del sitio web implica la aceptación de todos los contratos y cesiones». La contratación exige una acción positiva inequívoca.
