# ACUERDO DE ENCARGO DE TRATAMIENTO DE DATOS (DPA - ART. 28 RGPD)

> **ESTADO DEL DOCUMENTO:** BORRADOR PENDIENTE DE APROBACIÓN JURÍDICA FORMAL  
> **DOCUMENT STATUS:** DRAFT PENDING FORMAL LEGAL APPROVAL  
> **DOKUMENTENSTATUS:** ENTWURF VORBEHALTLICH FORMELLER RECHTLICHER PRÜFUNG  
> **Idioma:** Redactado íntegramente en Español (ES), con encabezado trilingüe.  
> **Versión:** v2026.1-draft | **Fecha de revisión:** 25 de octubre de 2026
> **Nota de idioma / Language note / Sprachhinweis:** Este documento está redactado íntegramente en español como borrador de trabajo interno; las cabeceras trilingües indican el estado del ciclo documental y no constituyen traducciones completas en EN o DE.

---

### Entre las Partes:
- **De una parte:** El cliente profesional, editorial o imprenta registrado en la plataforma PrintPrice que carga archivos de impresión conteniendo datos de carácter personal (en adelante, el **«Responsable del Tratamiento»**).
- **De otra parte:** **Print Price Pro SIA** [PENDIENTE DE RATIFICACIÓN REGISTRAL], sociedad de responsabilidad limitada con N.º de Registro 40203631570 [PENDIENTE DE COTEJO DOCUMENTAL] y domicilio en Bruņinieku iela 60-8, Rīga, LV-1009, Letonia (en adelante, el **«Encargado del Tratamiento»** o «PrintPrice»).

Ambas partes suscriben el presente Acuerdo de Encargo de Tratamiento (en adelante, el «DPA») en cumplimiento del artículo 28 del Reglamento (UE) 2016/679 (RGPD).

---

### Cláusula 1: Objeto, Alcance y Naturaleza del Encargo
1.1. El Responsable encomienda a PrintPrice el tratamiento de los datos personales contenidos en los archivos digitales (PDFs, maquetas, imágenes) remitidos a través de la plataforma para la exclusiva finalidad de ejecutar los servicios técnicos de preflight determinista (Fix it), normalización de cajas y transmisión técnica a la imprenta industrial adjudicataria (Print it).  
1.2. **Tipología de datos:** Nombres de autores, biografías, créditos editoriales, personas identificadas en fotografías de las obras y datos de contacto consignados en las páginas de créditos.  
1.3. **Duración:** La vigencia de este DPA coincide con la duración de la relación contractual de servicios entre las partes.

---

### Cláusula 2: Obligaciones del Encargado del Tratamiento (Art. 28.3 RGPD)
PrintPrice se compromete expresamente a:
1. **Instrucciones documentadas:** Tratar los datos personales únicamente siguiendo las instrucciones documentadas del Responsable, incluso en lo relativo a transferencias de datos personales a un tercer país, salvo que esté obligado a ello por el derecho de la Unión o de los Estados miembros.
2. **Confidencialidad:** Garantizar que las personas autorizadas para tratar datos personales han asumido un compromiso expreso de confidencialidad o están sujetas a una obligación legal estatutaria de confidencialidad.
3. **Medidas de seguridad (Art. 32 RGPD):** Implantar las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, incluyendo:
   - Cifrado de datos en tránsito mediante protocolos TLS 1.3.
   - Segregación lógica de datos de clientes e identificadores de inquilino (*tenant separation*).
   - Verificación de integridad mediante sumas de control criptográficas (SHA-256).
   - **[PENDIENTE DE VERIFICACIÓN TÉCNICA DEL CICLO DE VIDA DE ARCHIVOS]:** Protocolo técnico de purgado automatizado de archivos en backend (servicio responsable, almacenamiento, disparador por evento o TTL, tratamiento de excepciones y copias de seguridad).
4. **Régimen de Subencargados:** Respetar las condiciones indicadas en la Cláusula 3 para recurrir a otro encargado del tratamiento.
5. **Asistencia en el ejercicio de derechos:** Asistir al Responsable a través de medidas técnicas y organizativas apropiadas para responder a las solicitudes de los interesados (acceso, rectificación, supresión, limitación, portabilidad y oposición).
6. **Notificación de brechas de seguridad [PROPUESTA CONTRACTUAL SUJETA A APROBACIÓN]:** Notificar al Responsable, sin dilación indebida y a más tardar en el plazo propuesto de **48 horas**, cualquier violación de la seguridad de los datos personales de la que tenga conocimiento.
7. **Destrucción o devolución:** A elección del Responsable, suprimir o devolver todos los datos personales una vez finalice la prestación de los servicios de tratamiento, y suprimir las copias existentes salvo que se exija la conservación de los datos personales en virtud del derecho comunitario o nacional.
8. **Auditorías y demostración de cumplimiento:** Poner a disposición del Responsable toda la información necesaria para demostrar el cumplimiento del artículo 28 del RGPD y permitir la realización de auditorías razonables.

---

### Cláusula 3: Subencargados del Tratamiento
3.1. El Responsable otorga una **autorización general previa** a PrintPrice para recurrir a los subencargados necesarios para la infraestructura técnica de la plataforma, cuyo registro público actualizado consta en el documento [11_registro_subencargados_proveedores.md](./11_registro_subencargados_proveedores.md) (incluyendo el proveedor de computación IONOS SE en Alemania / UE para la web corporativa).  
3.2. PrintPrice informará al Responsable de cualquier cambio previsto en la incorporación o sustitución de subencargados con al menos **15 días naturales de antelación**, otorgando al Responsable la oportunidad de formular objeciones justificadas.

---

### Cláusula 4: Ley Aplicable y Jurisdicción
El presente DPA se rige por el RGPD y por el derecho material de la República de Letonia. Cualquier controversia sobre su interpretación se someterá a los tribunales de la ciudad de **Rīga (Letonia)**.
