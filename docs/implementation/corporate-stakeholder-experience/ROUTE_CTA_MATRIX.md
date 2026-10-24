# Matriz de Rutas y Llamadas a la Acción (CTA) — PrintPrice Pro

**Fecha de Revisión:** 24 de Octubre de 2026

Esta matriz define los destinos canónicos, el propósito y las condiciones de acceso para cada perfil de usuario y recorrido en la web corporativa.

---

## 1. Recorridos Principales por Stakeholder

| Stakeholder | Ruta Corporativa | Mensaje Central | CTA Principal | Destino Real Verificado | Requisitos Previos |
|---|---|---|---|---|---|
| **Autor / Particular** | `/for-authors` | *"Imprime tu libro, comprueba tus archivos y visualiza el resultado."* | **Calcular mi presupuesto** | `https://budget.printprice.pro/` | Ninguno (Sin CIF, sin cuenta previa, abierto a particulares). |
| **Editorial / Publisher** | `/for-publishers` | *"Prepara presupuestos y organiza tus proyectos de impresión."* | **Empezar un proyecto** | `https://budget.printprice.pro/` | Ninguno para presupuesto básico; registro en Budget para histórico de proyectos. |
| **Imprenta / Printhouse** | `/for-printhouses` | *"Configura tu imprenta y conecta capacidades, maquinaria y sustratos."* | **Registrar mi imprenta** | `https://control.printprice.pro/printhouse/register` | Registro por email corporativo + posterior setup guiado de planta. |
| **Proveedor de Papel** | `/for-paper-suppliers` | *"Publica tu catálogo y conecta tus ofertas con las imprentas."* | **Registrar mi empresa proveedora** | `https://control.printprice.pro/supplier/register` | Registro autoservicio trilingüe (CIF/NIF, categorías de papel y cobertura). |

---

## 2. Puntos de Acceso Globales (Header & Modales)

| Acción | Etiqueta | Destino / Modal | Comportamiento |
|---|---|---|---|
| **Iniciar Sesión** | `Iniciar sesión` | Modal de selección de espacio | Ofrece 2 accesos claros: <br>1. *Espacio de Presupuestación y Proyectos* (`budget.printprice.pro`) <br>2. *Control Plane (Imprentas y Proveedores)* (`control.printprice.pro`) |
| **Empezar** | `Empezar` | Menú desplegable / Selector guiado | Permite elegir directamente entre: <br>• *Soy Autor / Quiero imprimir un libro* (`/for-authors`) <br>• *Soy Editorial* (`/for-publishers`) <br>• *Soy Imprenta* (`/for-printhouses`) <br>• *Soy Proveedor de Papel* (`/for-paper-suppliers`) |
| **Documentación** | `Documentación` | `https://docs.printprice.pro/` | Enlace externo seguro hacia la wiki arquitectónica y manuales. |
| **API / Desarrolladores** | `Desarrolladores` | `/developers` | Especificación de integración REST y webhooks. |
| **Contacto Comercial** | `Contacto` | `/contact` | Formulario de consulta general o soporte. |

---

## 3. Invariantes de Navegación y Seguridad

1. **Cero Exposición de Identificadores**: Ningún enlace debe transmitir `tenantId`, tokens de sesión, emails ni parámetros de autorización en la URL.
2. **Cero SSO Ficticio**: No simular un inicio de sesión único compartido entre la corporativa, Budget y Control Plane. Cada dominio maneja su propio ciclo de vida de autenticación.
3. **Validación de Enlaces Activos**: Todos los destinos deben responder con HTTP 200 y certificados TLS válidos.
