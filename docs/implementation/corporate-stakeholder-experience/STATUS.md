# Estado de Implementación: Web Corporativa PrintPrice.pro

**Fecha:** 24 de Octubre de 2026  
**Rama:** `feat/corporate-stakeholder-experience`  
**Repositorio GitHub:** `https://github.com/PrintPriceOS/corporative`  
**Servidor Hosting:** Plesk Obsidian Debian (`212.227.79.67`) en `/var/www/vhosts/printprice.pro/httpdocs/`  
**Estado General:** COMPLETADO CON ÉXITO — Todas las iteraciones C0 a C5 ejecutadas, compiladas y validadas visualmente.

---

## 1. Resumen de Iteraciones Ejecutadas

| Iteración | Descripción | Estado | Resultado |
|---|---|:---:|---|
| **C0** | **Inventario y Referencia Visual** | **COMPLETADO** | Repositorio real `PrintPriceOS/corporative` clonado y analizado. Tokens del onboarding canónico de Control Plane extraídos e integrados. Documentación en `docs/implementation/corporate-stakeholder-experience/` generada. |
| **C1** | **Arquitectura para 4 Stakeholders** | **COMPLETADO** | Creadas las 4 páginas de perfil: `/for-authors`, `/for-publishers`, `/for-printhouses`, `/for-paper-suppliers`. Header actualizado con menú desplegable "Para quién", enlaces directos, modal accesible "Iniciar sesión" (Budget vs Control Plane) y modal "Empezar". Footer renovado con enlaces canónicos y 4 columnas temáticas. |
| **C2** | **Rediseño de Portada y Sistema Visual** | **COMPLETADO** | Rediseño completo de `app/page.tsx` con propuesta de valor "Tu libro, del archivo al papel", 4 tarjetas de perfil redondeadas (`--radius-card: 16px`, `--radius-card-lg: 24px`), flujo "Cómo funciona", eliminación de brutalismo forzado (0px obligatorio), supresión de telemetría decorativa y tipografía legible en `globals.css`. |
| **C3** | **Contenido Confiable y Comparativas** | **COMPLETADO** | Depuración rigurosa de claims en `CLAIMS_AND_COMPARISONS.md` y `app/contact/partner/page.tsx` (retirados: 12-18% fees, 15-day payouts, 21-day trial, chargeback immunity, 1,280 nodes, zero lead time errors). Tablas comparativas objetivas estructuradas con selector interactivo: Autores/Editoriales (vs Lulu, GelatoConnect) e Imprentas/Proveedores (vs printIQ, PrintVis, Tharstern). |
| **C4** | **Registros, Recursos y Dominios** | **COMPLETADO** | Validación de todos los destinos: Budget (`https://budget.printprice.pro/`), Registro de Imprenta en Control Plane (`https://control.printprice.pro/printhouse/register`), Registro de Proveedores (`https://control.printprice.pro/supplier/register`), Documentación (`https://docs.printprice.pro/`). Sin duplicidad de formularios ficticios. |
| **C5** | **Accesibilidad, SEO y Verificación Visual** | **COMPLETADO** | Compilación con `npm run build` exitosa (0 errores TypeScript, 43 rutas estáticas generadas). Verificación E2E en navegador real en escritorio (1920x1080) y móvil (390x844): modales accesibles (Escape y ✕), cambio interactivo de comparativas, drawer móvil responsivo sin desbordamiento horizontal. `sitemap.ts` actualizado. |

---

## 2. Evidencias de Verificación en Navegador Real

La verificación se ejecutó mediante un subagente de navegación automatizado sobre `http://localhost:3010/`:
1. **Desktop Landing**: Captura de pantalla de la portada con jerarquía clara y tarjetas redondeadas (`desktop_homepage_1792799795863.png`).
2. **Menú "Para quién"**: Menú desplegable interactivo mostrando los 4 perfiles con badges y descripciones (`para_quien_dropdown_1792799808906.png`).
3. **Modal "Iniciar sesión"**: Ventana modal centrada respecto al viewport con selección transparente entre Budget y Control Plane, con tecla Escape y botón de cierre (`login_modal`).
4. **Modal "Empezar"**: Asistente de selección de trayectoria hacia los 4 perfiles (`journey_modal_1792799834771.png`).
5. **Selector de Comparativas**: Conmutación de pestaña entre *Autores & Editoriales* e *Imprentas & Proveedores* (`comparativa_table_switched_1792799918176.png`).
6. **Páginas de Perfil**: Renderizado verificado de `/for-authors`, `/for-publishers`, `/for-printhouses` y `/for-paper-suppliers`.
7. **Diseño Móvil (390x844)**: Menú hamburguesa interactivo (`mobile_menu_open_1792799979142.png`) y ausencia total de desplazamiento horizontal (`mobile_homepage_1792799970312.png`).
8. **Grabación de Sesión E2E**: Archivo WebP generado en `corp_ux_audit_1792799788138.webp`.

---

## 3. Instrucciones de Despliegue en Plesk (Producción)

> [!IMPORTANT]
> Siguiendo las directrices del proyecto, **no se ha realizado despliegue automático a producción**. El despliegue definitivo se ejecuta desde el panel Plesk o mediante la terminal SSH del servidor cuando el usuario lo determine.

### Procedimiento en el Servidor Plesk (`212.227.79.67`):

1. **Conexión SSH**:
   ```bash
   ssh root@212.227.79.67
   ```

2. **Actualizar el Working Tree desde GitHub**:
   ```bash
   cd /var/www/vhosts/printprice.pro/httpdocs
   git fetch origin
   git checkout feat/corporate-stakeholder-experience
   # O merge hacia main una vez validado:
   # git checkout main && git merge feat/corporate-stakeholder-experience
   ```

3. **Compilar los Artefactos de Producción**:
   ```bash
   npm install --production=false
   npm run build
   ```

4. **Reiniciar la Aplicación Node.js en Phusion Passenger**:
   ```bash
   mkdir -p tmp && touch tmp/restart.txt
   # O a través de la CLI de Plesk:
   # plesk bin nodejs --restart-app -domain printprice.pro
   ```
