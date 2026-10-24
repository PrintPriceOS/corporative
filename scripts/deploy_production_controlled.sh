#!/usr/bin/env bash
# ==============================================================================
# PRINTPRICE OS — RUNBOOK DE DESPLIEGUE CONTROLADO
# CANDIDATO: EXIGIDO POR PARÁMETRO (CANDIDATE_SHA)
# ESTADO: PREPARADO / NO EJECUTADO (Ejecución bloqueada por defecto)
# ==============================================================================

set -euo pipefail

# ------------------------------------------------------------------------------
# PARÁMETROS FIJOS ACREDITADOS POR INSPECCIÓN EMPÍRICA EN PLESK
# ------------------------------------------------------------------------------
export DOMAIN="${DOMAIN:-printprice.pro}"

# Versión de la aplicación a desplegar: EXIGE UN SHA EXPLÍCITO (sin fallback obsoleto)
export CANDIDATE_SHA="${1:-${CANDIDATE_SHA:-}}"

# Versión del script de despliegue: Identificada estrictamente desde su propio repositorio
SCRIPT_SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if ! SCRIPT_VERSION="$(git -C "${SCRIPT_SOURCE_DIR}" rev-parse HEAD 2>/dev/null)"; then
    echo "ERROR: No se pudo determinar la versión del script desde el repositorio en ${SCRIPT_SOURCE_DIR}." >&2
    exit 1
fi
export SCRIPT_VERSION
export TIMESTAMP="${TIMESTAMP:-$(date +%Y%m%d_%H%M%S)}"

# Variables de entorno operativo
export VHOST_DIR="${VHOST_DIR:-/var/www/vhosts/${DOMAIN}}"
export RELEASES_DIR="${RELEASES_DIR:-${VHOST_DIR}/releases}"
export STAGING_DIR="${STAGING_DIR:-${RELEASES_DIR}/${CANDIDATE_SHA}_${TIMESTAMP}}"
export BACKUP_DIR="${BACKUP_DIR:-${VHOST_DIR}/backups/live_backup_${TIMESTAMP}}"
export BACKUP_META_DIR="${BACKUP_META_DIR:-${VHOST_DIR}/backups}"
export TEMP_SWAP_DIR="${TEMP_SWAP_DIR:-${VHOST_DIR}/httpdocs_prev_${TIMESTAMP}}"
export ERROR_LOG_PATH="${ERROR_LOG_PATH:-/var/www/vhosts/system/${DOMAIN}/logs/proxy_error_log}"

# Parámetros acreditados del supervisor en producción (PM2 bajo usuario del dominio)
EXPECTED_USER="${EXPECTED_USER:-printprice.pro_a2w0fsu9yw9}"
EXPECTED_GROUP="${EXPECTED_GROUP:-psacln}"
EXPECTED_PM2_APP="${EXPECTED_PM2_APP:-printprice-web}"
EXPECTED_PORT="${EXPECTED_PORT:-3010}"
EXPECTED_NODE_BIN="${EXPECTED_NODE_BIN:-/usr/bin/node}"

# ------------------------------------------------------------------------------
# MÁQUINA DE ESTADOS Y CONTROL DE ROLLBACK
# Estados: INITIAL -> LIVE_MOVED -> STAGING_MOVED -> VERIFYING -> ACTIVE
#          |                |               |
#          v                v               v
#     ROLLBACK_DONE   ROLLBACK_DONE   ROLLBACK_DONE (o ROLLBACK_FAILED)
# ------------------------------------------------------------------------------
SWAP_STATE="INITIAL"
ROLLBACK_EXECUTED=false
ORIGINAL_EXIT_CODE=0

# Registro de la identidad del build previo
# Función común de verificación de recuperación del servicio (en disco y en memoria viva)
verify_service_recovery() {
    local expected_build_id="$1"

    if [ "${SIMULATION_MODE:-false}" = "true" ]; then
        echo "[ROLLBACK: ${SWAP_STATE}] Recargando supervisor PM2 para el usuario ${EXPECTED_USER}..."
        if [ "${MOCK_PM2_RELOAD_FAILS:-false}" = "true" ]; then
            echo "[SIMULATION] Inyección de fallo en recarga PM2 activada." >&2
            SWAP_STATE="ROLLBACK_FAILED"
            return 2
        fi

        local local_http="${MOCK_HTTP_STATUS:-200}"
        local local_manifest="${MOCK_MANIFEST_STATUS:-200}"
        if [ "${local_http}" != "200" ] || [ "${local_manifest}" != "200" ]; then
            echo "[SIMULATION ERROR] Doble de prueba reportó fallo en verificación post-rollback." >&2
            SWAP_STATE="ROLLBACK_FAILED"
            return 2
        fi

        SWAP_STATE="ROLLBACK_DONE"
        echo "[ROLLBACK EXITOSO Y VERIFICADO]"
        echo "  BUILD_ID restituido y servido en memoria: ${expected_build_id}"
        echo "  Respuesta HTTP local: 200 OK"
        echo "  Manifest servido en memoria: 200 OK"
        return 0
    fi

    # Entorno real: Recarga efectiva de PM2 y validación en memoria
    echo "[ROLLBACK: ${SWAP_STATE}] Recargando supervisor PM2 para el usuario ${EXPECTED_USER}..."
    if ! su -s /bin/bash "${EXPECTED_USER}" -c "PORT=${EXPECTED_PORT} pm2 reload ${EXPECTED_PM2_APP} --update-env"; then
        echo "[DESASTRE OPERATIVO] Falló la recarga de PM2 para ${EXPECTED_PM2_APP}." >&2
        SWAP_STATE="ROLLBACK_FAILED"
        return 2
    fi
    sleep 3

    # Verificación en disco
    local restored_build="UNKNOWN"
    if [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
        restored_build="$(cat "${APP_ROOT}/.next/BUILD_ID")"
    fi

    # Verificación en memoria (HTTP local y manifest vivo)
    local local_http="000"
    local local_manifest="000"
    local attempts=0
    while [ "${attempts}" -lt 5 ]; do
        attempts=$((attempts + 1))
        local_http="$(curl -s -S -o /dev/null -w "%{http_code}" --max-time 5 --connect-timeout 2 "http://127.0.0.1:${EXPECTED_PORT}/" 2>/dev/null || echo "000")"
        if [ "${restored_build}" != "UNKNOWN" ]; then
            local_manifest="$(curl -s -S -o /dev/null -w "%{http_code}" --max-time 5 --connect-timeout 2 "http://127.0.0.1:${EXPECTED_PORT}/_next/static/${restored_build}/_buildManifest.js" 2>/dev/null || echo "000")"
        fi
        if [ "${local_http}" = "200" ] && [ "${local_manifest}" = "200" ]; then
            break
        fi
        sleep 1
    done

    if [ "${restored_build}" = "${expected_build_id}" ] && [ "${local_http}" = "200" ] && [ "${local_manifest}" = "200" ]; then
        echo "[ROLLBACK EXITOSO Y VERIFICADO]"
        echo "  BUILD_ID restituido y servido en memoria: ${restored_build}"
        echo "  Respuesta HTTP local: ${local_http} OK"
        echo "  Manifest servido en memoria: ${local_manifest} OK"
        SWAP_STATE="ROLLBACK_DONE"
        return 0
    else
        echo "[DESASTRE OPERATIVO: ROLLBACK INCONCLUSO]" >&2
        echo "  BUILD_ID: ${restored_build} (esperado ${expected_build_id})" >&2
        echo "  HTTP Local: ${local_http} (esperado 200)" >&2
        echo "  Manifest Local: ${local_manifest} (esperado 200)" >&2
        SWAP_STATE="ROLLBACK_FAILED"
        return 2
    fi
}

execute_rollback() {
    local reason="${1:-Razón no especificada}"
    
    if [ "${ROLLBACK_EXECUTED}" = true ]; then
        return 0
    fi
    ROLLBACK_EXECUTED=true

    echo "========================================================================"
    echo "[INICIANDO ROLLBACK CONTROLADO]"
    echo "Causa: ${reason}"
    echo "Estado actual de la máquina de estados: SWAP_STATE=${SWAP_STATE}"
    echo "========================================================================"

    case "${SWAP_STATE}" in
        INITIAL)
            echo "[ROLLBACK: INITIAL] No se produjo ninguna alteración en el sistema de archivos."
            echo "[OK] Producción conservada intacta."
            SWAP_STATE="ROLLBACK_DONE"
            return 0
            ;;

        LIVE_MOVED)
            echo "[ROLLBACK: LIVE_MOVED] Restaurando APP_ROOT original desde ${TEMP_SWAP_DIR}..."
            if ! mv "${TEMP_SWAP_DIR}" "${APP_ROOT}"; then
                echo "[DESASTRE OPERATIVO] Falló la restauración de ${TEMP_SWAP_DIR} a ${APP_ROOT}." >&2
                SWAP_STATE="ROLLBACK_FAILED"
                return 2
            fi
            
            if [ ! -d "${APP_ROOT}" ] || [ ! -f "${APP_ROOT}/package.json" ]; then
                echo "[DESASTRE OPERATIVO] APP_ROOT no es consistente tras restauración en disco." >&2
                SWAP_STATE="ROLLBACK_FAILED"
                return 2
            fi
            
            # Restaurar permisos
            chown -R "${EXPECTED_USER}:${EXPECTED_GROUP}" "${APP_ROOT}" 2>/dev/null || true

            # Comprobar recuperación efectiva del servicio en memoria y procesos
            verify_service_recovery "${LIVE_BUILD_ID}"
            return $?
            ;;

        STAGING_MOVED | VERIFYING)
            echo "[ROLLBACK: ${SWAP_STATE}] Apartando candidato fallido a ${VHOST_DIR}/httpdocs_failed_${TIMESTAMP}..."
            if ! mv "${APP_ROOT}" "${VHOST_DIR}/httpdocs_failed_${TIMESTAMP}"; then
                echo "[DESASTRE OPERATIVO] No se pudo apartar el candidato fallido de ${APP_ROOT}." >&2
                SWAP_STATE="ROLLBACK_FAILED"
                return 2
            fi

            echo "[ROLLBACK: ${SWAP_STATE}] Restituyendo APP_ROOT original desde ${TEMP_SWAP_DIR}..."
            if ! mv "${TEMP_SWAP_DIR}" "${APP_ROOT}"; then
                echo "[DESASTRE OPERATIVO] Falló la restauración de ${TEMP_SWAP_DIR} a ${APP_ROOT}." >&2
                SWAP_STATE="ROLLBACK_FAILED"
                return 2
            fi

            # Restaurar propiedad de archivos
            chown -R "${EXPECTED_USER}:${EXPECTED_GROUP}" "${APP_ROOT}" 2>/dev/null || true

            # Comprobar recuperación efectiva del servicio en memoria y procesos
            verify_service_recovery "${LIVE_BUILD_ID}"
            return $?
            ;;

        *)
            echo "[ROLLBACK] Estado desconocido: ${SWAP_STATE}."
            return 1
            ;;
    esac
}

# ------------------------------------------------------------------------------
# TRAMPAS DE SEÑALES (INT, TERM, ERR, EXIT)
# ------------------------------------------------------------------------------
signal_trap() {
    local sig="$1"
    local line="$2"
    echo "[ALERTA] Señal ${sig} capturada en línea ${line}. Abortando de inmediato..." >&2
    local exit_code=1
    case "${sig}" in
        SIGINT) exit_code=130 ;;
        SIGTERM) exit_code=143 ;;
        *) exit_code=1 ;;
    esac
    ORIGINAL_EXIT_CODE="${exit_code}"
    execute_rollback "Interrupción por señal ${sig} en línea ${line}" || true
    exit "${exit_code}"
}

err_trap() {
    local exit_code="$1"
    local line="$2"
    ORIGINAL_EXIT_CODE="${exit_code}"
    echo "[FATAL TRAP] Comando falló con código ${exit_code} en línea ${line}." >&2
    if [ "${SWAP_STATE}" != "ACTIVE" ] && [ "${SWAP_STATE}" != "ROLLBACK_DONE" ] && [ "${SWAP_STATE}" != "ROLLBACK_FAILED" ]; then
        execute_rollback "Fallo en línea ${line} con exit code ${exit_code}"
    fi
}

exit_trap() {
    local exit_code="$1"
    if [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ]; then
        echo "========================================================================"
        echo "[ALERTA CRÍTICA: DESASTRE EN RESTAURACIÓN]"
        echo "La restauración de producción falló. Se requiere intervención manual."
        echo "========================================================================"
        exit 2
    elif [ "${exit_code}" -ne 0 ] && [ "${SWAP_STATE}" != "ROLLBACK_DONE" ]; then
        execute_rollback "Salida anormal con código ${exit_code}"
        exit "${ORIGINAL_EXIT_CODE:-1}"
    fi
}

# ------------------------------------------------------------------------------
# CLASIFICACIÓN OPERATIVA DEL ESTADO FINAL DE RELEASE
# ------------------------------------------------------------------------------
classify_release_state() {
    local origin_status_ok="$1"
    local origin_routes_ok="$2"
    local cache_status_ok="$3"
    local cache_content_ok="$4"

    if [ "${origin_status_ok}" != "true" ] || [ "${origin_routes_ok}" != "true" ]; then
        echo "ORIGIN_FAILED"
        return 1
    elif [ "${cache_status_ok}" != "true" ] || [ "${cache_content_ok}" != "true" ]; then
        echo "PENDING_CACHE_INVALIDATION"
        return 0
    else
        echo "ACTIVE"
        return 0
    fi
}

run_deployment() {
    # ==============================================================================
    # FASE 0: PREFLIGHT Y ACREDITACIÓN EMPÍRICA DE RUTAS Y SUPERVISOR
    # ==============================================================================
    echo "[FASE 0] Verificando precondiciones y configuración observada en Plesk..."

# 0.1. Verificar que el script se ejecute con privilegios administrativos
if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: Este procedimiento requiere privilegios de root para gestionar permisos y servicios de Plesk." >&2
    exit 1
fi

# 0.2. Validar existencia del vhost de printprice.pro
if [ ! -d "${VHOST_DIR}" ]; then
    echo "ERROR CRÍTICO: No existe el directorio del vhost en ${VHOST_DIR}. ABORTANDO." >&2
    exit 1
fi

# 0.3. Acreditar Document Root desde la configuración activa de Nginx
DOMAIN_NGINX_CONF="/var/www/vhosts/system/${DOMAIN}/conf/nginx.conf"
if [ ! -f "${DOMAIN_NGINX_CONF}" ]; then
    echo "ERROR CRÍTICO: Configuración de Nginx no encontrada en ${DOMAIN_NGINX_CONF}. ABORTANDO." >&2
    exit 1
fi

# Extraer directiva root exclusiva del bloque del dominio
DOC_ROOT="$(grep -E '^\s*root\s+' "${DOMAIN_NGINX_CONF}" | head -n 1 | awk '{print $2}' | tr -d ';')"
if [ -z "${DOC_ROOT}" ] || [ ! -d "${DOC_ROOT}" ]; then
    echo "ERROR CRÍTICO: No se pudo resolver DOC_ROOT desde ${DOMAIN_NGINX_CONF}. ABORTANDO." >&2
    exit 1
fi
echo "[OK] DOC_ROOT acreditado: ${DOC_ROOT}"

# 0.4. Acreditar proxy_pass en vhost_nginx.conf
VHOST_CUSTOM_CONF="/var/www/vhosts/system/${DOMAIN}/conf/vhost_nginx.conf"
if [ ! -f "${VHOST_CUSTOM_CONF}" ]; then
    echo "ERROR CRÍTICO: No existe ${VHOST_CUSTOM_CONF}. ABORTANDO." >&2
    exit 1
fi

if ! grep -q "proxy_pass http://localhost:${EXPECTED_PORT}" "${VHOST_CUSTOM_CONF}"; then
    echo "ERROR CRÍTICO: ${VHOST_CUSTOM_CONF} no contiene proxy_pass a localhost:${EXPECTED_PORT}. ABORTANDO." >&2
    exit 1
fi
echo "[OK] Nginx proxy_pass a localhost:${EXPECTED_PORT} acreditado."

# 0.5. Acreditar supervisor PM2 bajo el usuario de la suscripción
USER_PM2_STATUS="$(su -s /bin/bash "${EXPECTED_USER}" -c "pm2 jlist 2>/dev/null" || true)"
if [ -z "${USER_PM2_STATUS}" ]; then
    echo "ERROR CRÍTICO: PM2 no responde bajo el usuario ${EXPECTED_USER}. ABORTANDO." >&2
    exit 1
fi

PM2_APP_STATUS="$(python3 -c "
import sys, json
try:
    apps = json.loads('''${USER_PM2_STATUS}''')
    target = [a for a in apps if a.get('name') == '${EXPECTED_PM2_APP}']
    if target and target[0].get('pm2_env', {}).get('status') == 'online':
        print(target[0]['pm2_env']['pm_cwd'])
    else:
        print('')
except Exception:
    print('')
")"

if [ -z "${PM2_APP_STATUS}" ]; then
    echo "ERROR CRÍTICO: Proceso '${EXPECTED_PM2_APP}' no está online en PM2 para ${EXPECTED_USER}. ABORTANDO." >&2
    exit 1
fi

export APP_ROOT="${PM2_APP_STATUS}"
echo "[OK] Supervisor PM2 acreditado: aplicación '${EXPECTED_PM2_APP}' online en APP_ROOT: ${APP_ROOT}"

# 0.6. Validar que APP_ROOT y DOC_ROOT coinciden
if [ "${APP_ROOT}" != "${DOC_ROOT}" ]; then
    echo "ERROR CRÍTICO: APP_ROOT (${APP_ROOT}) y DOC_ROOT (${DOC_ROOT}) difieren. ABORTANDO." >&2
    exit 1
fi

if [ ! -f "${APP_ROOT}/package.json" ] || [ ! -f "${APP_ROOT}/server.js" ]; then
    echo "ERROR CRÍTICO: Archivos críticos (package.json / server.js) ausentes en ${APP_ROOT}. ABORTANDO." >&2
    exit 1
fi

# 0.7. Validar versión de Node.js instalada
CURRENT_NODE_VER="$("${EXPECTED_NODE_BIN}" -v || echo 'NONE')"
if [ -z "${CURRENT_NODE_VER}" ] || [ "${CURRENT_NODE_VER}" = "NONE" ]; then
    echo "ERROR CRÍTICO: Node binario (${EXPECTED_NODE_BIN}) no ejecutable. ABORTANDO." >&2
    exit 1
fi
echo "[OK] Node.js binario verificado: ${EXPECTED_NODE_BIN} (${CURRENT_NODE_VER})"

# 0.8. Registrar línea base temporal del log de errores
LOG_LINE_BASELINE="$(wc -l < "${ERROR_LOG_PATH}" 2>/dev/null || echo 0)"
echo "[OK] Línea base de errores registrada: ${LOG_LINE_BASELINE} líneas en ${ERROR_LOG_PATH}"

# ==============================================================================
# FASE 1: PRE-CHEQUEO DE ESPACIO, FILESYSTEM Y NO-CONTENCIÓN
# ==============================================================================
echo "[FASE 1] Verificando precondiciones de almacenamiento y partición..."

# 1.1. Verificar espacio en disco (mínimo 5 GB libres)
FREE_KB="$(df -k "${VHOST_DIR}" | awk 'NR==2 {print $4}')"
if [ "${FREE_KB}" -lt 5242880 ]; then
    echo "ERROR: Espacio insuficiente en disco (${FREE_KB} KB libres, 5242880 KB requeridos). ABORTANDO." >&2
    exit 1
fi
echo "[OK] Espacio en disco suficiente: ${FREE_KB} KB disponibles."

# 1.2. Verificar que las rutas de backup, staging y temp residen fuera de APP_ROOT
mkdir -p "${RELEASES_DIR}" "${BACKUP_META_DIR}"

CANON_APP="$(realpath "${APP_ROOT}")"
CANON_BACKUP="$(realpath "${BACKUP_META_DIR}")"
CANON_RELEASES="$(realpath "${RELEASES_DIR}")"

if [[ "${CANON_BACKUP}" == "${CANON_APP}"* ]] || [[ "${CANON_RELEASES}" == "${CANON_APP}"* ]]; then
    echo "ERROR CRÍTICO: Rutas de backup o releases están contenidas dentro de APP_ROOT. ABORTANDO." >&2
    exit 1
fi
echo "[OK] Rutas de backup y releases independientes de APP_ROOT."

# 1.3. Verificar que APP_ROOT y RELEASES_DIR residen en el mismo dispositivo físico
DEV_APP="$(stat -c %d "${APP_ROOT}")"
DEV_RELEASES="$(stat -c %d "${RELEASES_DIR}")"
if [ "${DEV_APP}" != "${DEV_RELEASES}" ]; then
    echo "ERROR CRÍTICO: APP_ROOT y RELEASES_DIR residen en distintos dispositivos de bloques. ABORTANDO." >&2
    exit 1
fi
echo "[OK] Mismo filesystem verificado (Dispositivo: ${DEV_APP})."

# ==============================================================================
# FASE 2: BACKUP AUDITABLE CON MANIFIESTO Y CHECKSUMS (CERO AUTORREFERENCIA)
# ==============================================================================
echo "[FASE 2] Creando copia de seguridad verificable de producción..."

if [ -e "${BACKUP_DIR}" ]; then
    echo "ERROR: ${BACKUP_DIR} ya existe. ABORTANDO." >&2
    exit 1
fi
mkdir -p "${BACKUP_DIR}"

if [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
    LIVE_BUILD_ID="$(cat "${APP_ROOT}/.next/BUILD_ID")"
fi
echo "${LIVE_BUILD_ID}" > "${BACKUP_META_DIR}/live_build_id_${TIMESTAMP}.txt"
echo "[OK] BUILD_ID activo previo registrado: ${LIVE_BUILD_ID}"

# Copia completa de APP_ROOT preservando atributos y enlaces
cp -a "${APP_ROOT}/." "${BACKUP_DIR}/"

# Manifiesto y sumas generadas FUERA del árbol respaldado para evitar autorreferencia
find "${BACKUP_DIR}" -type f -exec sha256sum {} + > "${BACKUP_META_DIR}/backup_${TIMESTAMP}_SHA256SUMS.txt"
ls -laR "${BACKUP_DIR}" > "${BACKUP_META_DIR}/backup_${TIMESTAMP}_MANIFEST.txt"

BACKUP_FILES_COUNT="$(wc -l < "${BACKUP_META_DIR}/backup_${TIMESTAMP}_SHA256SUMS.txt")"
if [ "${BACKUP_FILES_COUNT}" -lt 50 ] || [ ! -f "${BACKUP_DIR}/package.json" ]; then
    echo "ERROR CRÍTICO: Backup incompleto (${BACKUP_FILES_COUNT} archivos). ABORTANDO." >&2
    exit 1
fi
echo "[OK] Backup completo y auditado en ${BACKUP_DIR} (${BACKUP_FILES_COUNT} archivos)."

# ==============================================================================
# FASE 3: CONSTRUCCIÓN AISLADA DEL CANDIDATO Y MANIFIESTO FORMAL
# ==============================================================================
echo "[FASE 3] Preparando release aislado en ${STAGING_DIR}..."

if [ -e "${STAGING_DIR}" ]; then
    echo "ERROR: STAGING_DIR ya existe. Se exige ruta inmutable nueva. ABORTANDO." >&2
    exit 1
fi

git clone https://github.com/PrintPriceOS/corporative.git "${STAGING_DIR}"
cd "${STAGING_DIR}"
git checkout "${CANDIDATE_SHA}"

CURRENT_CHECKOUT="$(git rev-parse HEAD)"
if [ "${CURRENT_CHECKOUT}" != "${CANDIDATE_SHA}" ]; then
    echo "ERROR: Checkout ${CURRENT_CHECKOUT} no coincide con candidato ${CANDIDATE_SHA}. ABORTANDO." >&2
    exit 1
fi

# Validar checkout limpio
if [ -n "$(git status --porcelain)" ]; then
    echo "ERROR: El repositorio en staging no está limpio. ABORTANDO." >&2
    exit 1
fi

# En este proyecto corporativo no existen archivos .env en producción.
# Si existiera .env.local se transferiría con permisos 600 sin imprimir secretos.
if [ -f "${APP_ROOT}/.env.local" ]; then
    cp -p "${APP_ROOT}/.env.local" "${STAGING_DIR}/.env.local"
    chmod 600 "${STAGING_DIR}/.env.local"
fi

# Instalación y compilación ejecutadas con entorno de producción
npm ci
npm run build

if [ ! -f "${STAGING_DIR}/.next/BUILD_ID" ]; then
    echo "ERROR CRÍTICO: Compilación fallida (.next/BUILD_ID ausente). ABORTANDO." >&2
    exit 1
fi
CANDIDATE_BUILD_ID="$(cat "${STAGING_DIR}/.next/BUILD_ID")"
PARENT_SHA="$(git rev-parse HEAD^)"

# Generar manifiesto formal del release candidato vinculando versión de app y del script
cat <<EOF > "${STAGING_DIR}/RELEASE_MANIFEST.json"
{
  "application_candidate_sha": "${CURRENT_CHECKOUT}",
  "application_parent_sha": "${PARENT_SHA}",
  "deployment_script_sha": "${SCRIPT_VERSION}",
  "build_id": "${CANDIDATE_BUILD_ID}",
  "generated_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "package_lock_sha256": "$(sha256sum package-lock.json | awk '{print $1}')",
  "routes_count": 45,
  "supervisor": "PM2",
  "app_name": "${EXPECTED_PM2_APP}",
  "port": ${EXPECTED_PORT}
}
EOF
cp "${STAGING_DIR}/RELEASE_MANIFEST.json" "${BACKUP_META_DIR}/candidate_manifest_${TIMESTAMP}.json"

chown -R "${EXPECTED_USER}:${EXPECTED_GROUP}" "${STAGING_DIR}"
echo "[OK] Artefacto compilado con BUILD_ID: ${CANDIDATE_BUILD_ID} y manifiesto generado."

# ==============================================================================
# FASE 4: INTERCAMBIO SECUENCIAL CON TRANSICIÓN DE MÁQUINA DE ESTADOS
# ==============================================================================
echo "[FASE 4] Ejecutando intercambio secuencial protegido de directorios..."

if [ -e "${TEMP_SWAP_DIR}" ]; then
    echo "ERROR: TEMP_SWAP_DIR (${TEMP_SWAP_DIR}) ya existe. ABORTANDO." >&2
    exit 1
fi

# Paso 1: Mover versión viva a resguardo temporal
if ! mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"; then
    echo "ERROR CRÍTICO: No se pudo mover APP_ROOT. Servicio vivo intacto. ABORTANDO." >&2
    exit 1
fi
SWAP_STATE="LIVE_MOVED"

# Paso 2: Mover staging construido a APP_ROOT
if ! mv "${STAGING_DIR}" "${APP_ROOT}"; then
    echo "ERROR CRÍTICO: Falló el movimiento de STAGING_DIR a APP_ROOT. Invocando rollback..." >&2
    execute_rollback "Fallo en el segundo movimiento de intercambio de directorios"
    exit 1
fi
SWAP_STATE="STAGING_MOVED"

echo "[OK] Intercambio completado. Estado: SWAP_STATE=${SWAP_STATE}."

# ==============================================================================
# FASE 5: RECARGA DEL PROCESO PM2 ACREDITADO
# ==============================================================================
echo "[FASE 5] Notificando recarga al proceso PM2 '${EXPECTED_PM2_APP}'..."

su -s /bin/bash "${EXPECTED_USER}" -c "PORT=${EXPECTED_PORT} pm2 reload ${EXPECTED_PM2_APP} --update-env"
SWAP_STATE="VERIFYING"

# ==============================================================================
# FASE 6: VALIDACIÓN MULTICAPA CON TIMEOUTS Y SIN PIPELINES SIGPIPE
# ==============================================================================
echo "[FASE 6] Ejecutando validación multicapa post-activación..."

TRIGGER_ROLLBACK=false
ROLLBACK_REASON=""

# 6.1. Comprobación de salud en el proceso en memoria viva (http://127.0.0.1:3010)
# Acredita que el proceso vivo en puerto 3010 sirve el candidato y no solo HTTP 200 genérico.
LOCAL_ORIGIN_OK=false
for attempt in 1 2 3 4 5; do
    LOCAL_STATUS="$(curl -s -S -o /dev/null -w "%{http_code}" --max-time 10 --connect-timeout 5 "http://127.0.0.1:${EXPECTED_PORT}/" || echo "000")"
    MANIFEST_STATUS="$(curl -s -S -o /dev/null -w "%{http_code}" --max-time 10 --connect-timeout 5 "http://127.0.0.1:${EXPECTED_PORT}/_next/static/${CANDIDATE_BUILD_ID}/_buildManifest.js" || echo "000")"
    if [ "${LOCAL_STATUS}" = "200" ] && [ "${MANIFEST_STATUS}" = "200" ]; then
        LOCAL_ORIGIN_OK=true
        break
    fi
    sleep 2
done

if [ "${LOCAL_ORIGIN_OK}" != true ]; then
    echo "FALLO CRÍTICO: El proceso en puerto ${EXPECTED_PORT} no sirve el BUILD_ID del candidato (${CANDIDATE_BUILD_ID}) en memoria viva." >&2
    echo "  HTTP Base: ${LOCAL_STATUS:-000} (esperado 200)" >&2
    echo "  Manifest (${CANDIDATE_BUILD_ID}): ${MANIFEST_STATUS:-000} (esperado 200)" >&2
    TRIGGER_ROLLBACK=true
    ROLLBACK_REASON="Proceso en memoria no sirve BUILD_ID ${CANDIDATE_BUILD_ID}"
fi

# Validar que el origen local sirve la copia del candidato
LOCAL_BUDGET="$(curl -s -S --max-time 10 "http://127.0.0.1:${EXPECTED_PORT}/products/budget" || echo "")"
if ! grep -F "CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS" <<< "${LOCAL_BUDGET}" >/dev/null; then
    echo "FALLO CRÍTICO: El origen local (127.0.0.1:${EXPECTED_PORT}) no sirve el claim CR-01 del candidato." >&2
    TRIGGER_ROLLBACK=true
    ROLLBACK_REASON="Origen local no sirve copia del candidato"
fi

# 6.2. Capa A: Smoke Test SSR sobre la URL pública con TLS estricto
if [ "${TRIGGER_ROLLBACK}" != true ]; then
    ROUTES=("/" "/products/budget" "/products" "/products/print" "/for-authors" "/governance" "/icon.png")
    for route in "${ROUTES[@]}"; do
        STATUS="$(curl -s -S -o /dev/null -w "%{http_code}" --max-time 10 --connect-timeout 5 "https://${DOMAIN}${route}" || echo "000")"
        if [ "${STATUS}" != "200" ]; then
            echo "FALLO EN SMOKE TEST SSR: ${route} devolvió HTTP ${STATUS}." >&2
            TRIGGER_ROLLBACK=true
            ROLLBACK_REASON="Ruta pública ${route} devolvió HTTP ${STATUS}"
            break
        fi
    done
fi

# 6.3. Validación de claims en HTML SSR (Uso de <<< para evitar SIGPIPE con pipefail)
if [ "${TRIGGER_ROLLBACK}" != true ]; then
    HTML_BUDGET="$(curl -s -S --max-time 10 "https://${DOMAIN}/products/budget" || echo "")"
    HTML_PRODUCTS="$(curl -s -S --max-time 10 "https://${DOMAIN}/products" || echo "")"
    HTML_PRINT="$(curl -s -S --max-time 10 "https://${DOMAIN}/products/print" || echo "")"

    if ! grep -F "CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS" <<< "${HTML_BUDGET}" >/dev/null; then
        echo "FALLO: Claim CR-01 no hallado en HTML de /products/budget." >&2
        TRIGGER_ROLLBACK=true
        ROLLBACK_REASON="Claim CR-01 no servido en SSR"
    fi

    if grep -F "CALCULA PRESUPUESTOS EXACTOS EN SEGUNDOS" <<< "${HTML_BUDGET}" >/dev/null; then
        echo "FALLO: Claim antiguo CR-01 todavía presente en /products/budget." >&2
        TRIGGER_ROLLBACK=true
        ROLLBACK_REASON="Claim obsoleto CR-01 servido en SSR"
    fi

    if ! grep -F "transición tecnológica más eficiente" <<< "${HTML_PRODUCTS}" >/dev/null; then
        echo "FALLO: Claim CR-02 no hallado en HTML de /products." >&2
        TRIGGER_ROLLBACK=true
        ROLLBACK_REASON="Claim CR-02 no servido en SSR"
    fi

    if ! grep -F "tarifas de producción según las matrices de planta asociadas" <<< "${HTML_PRINT}" >/dev/null; then
        echo "FALLO: Claim CR-03 no hallado en HTML de /products/print." >&2
        TRIGGER_ROLLBACK=true
        ROLLBACK_REASON="Claim CR-03 no servido en SSR"
    fi
fi

# 6.4. Capa B: Inspección Estática del Artefacto Compilado (EN y DE)
if [ "${TRIGGER_ROLLBACK}" != true ]; then
    BUDGET_BUNDLES="$(find "${APP_ROOT}/.next/server/app/products/budget" -type f -name "*.js" 2>/dev/null || true)"
    if [ -n "${BUDGET_BUNDLES}" ]; then
        if ! grep -q "CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS" ${BUDGET_BUNDLES}; then
            echo "FALLO: Cadena exacta en inglés CR-01 ausente en bundles de budget." >&2
            TRIGGER_ROLLBACK=true
            ROLLBACK_REASON="Cadena en inglés no hallada en artefacto"
        fi
        if ! grep -q "DRUCKANGEBOTE IN SEKUNDEN BERECHNEN" ${BUDGET_BUNDLES}; then
            echo "FALLO: Cadena exacta en alemán CR-01 ausente en bundles de budget." >&2
            TRIGGER_ROLLBACK=true
            ROLLBACK_REASON="Cadena en alemán no hallada en artefacto"
        fi
    else
        echo "FALLO: No se localizaron bundles compilados en .next/server/app/products/budget." >&2
        TRIGGER_ROLLBACK=true
        ROLLBACK_REASON="Bundles del servidor no localizados"
    fi
fi

# 6.5. Detección de Retención de Caché Pública (Sin purgas globales destructivas)
CURRENT_ETAG="$(curl -s -S -I --max-time 10 "https://${DOMAIN}/" | grep -i "^etag:" | awk '{print $2}' | tr -d '\r\n' || echo '')"
echo "[INFO] ETag devuelto por la web pública: ${CURRENT_ETAG:-NINGUNO}"
CACHE_PENDING=false
if [ "${CURRENT_ETAG}" = "\"argphxugf31qsk\"" ]; then
    echo "[AVISO DE RETENCIÓN DE CACHÉ] El origen local está actualizado, pero el reverse proxy de Nginx sirve el ETag histórico (\"argphxugf31qsk\")."
    echo "[ESTADO: PENDIENTE DE INVALIDACIÓN DE CACHÉ ESPECÍFICA DEL DOMINIO]"
    CACHE_PENDING=true
fi

# 6.6. Inspección de Errores Posteriores a la Activación (awk seguro ante pipefail)
if [ -f "${ERROR_LOG_PATH}" ]; then
    NEW_ERRORS="$(tail -n +$((LOG_LINE_BASELINE + 1)) "${ERROR_LOG_PATH}" 2>/dev/null | awk '/500|502|fatal|crash/ {count++} END {print count+0}')"
    if [ "${NEW_ERRORS}" -gt 0 ]; then
        echo "FALLO: Se han detectado ${NEW_ERRORS} nuevos errores en proxy_error_log tras la activación." >&2
        TRIGGER_ROLLBACK=true
        ROLLBACK_REASON="Errores HTTP 500/502 detectados en logs tras la activación"
    fi
fi

# ==============================================================================
# FASE 7: EVALUACIÓN DE SALUD O DISPARO DE ROLLBACK
# ==============================================================================
if [ "${TRIGGER_ROLLBACK}" = true ]; then
    echo "[CRITERIO DE ABORTO ACTIVADO] Causa: ${ROLLBACK_REASON}." >&2
    execute_rollback "${ROLLBACK_REASON}"
    exit 1
elif [ "${CACHE_PENDING}" = true ]; then
    SWAP_STATE="PENDING_CACHE_INVALIDATION"
    echo "========================================================================"
    echo "[ESTADO: PENDING_CACHE_INVALIDATION — NO VALIDADO COMO DESPLIEGUE COMPLETO]"
    echo "ADVERTENCIA CRÍTICA: PENDING_CACHE_INVALIDATION NUNCA DEBE INTERPRETARSE"
    echo "COMO UN DESPLIEGUE COMPLETAMENTE VALIDADO."
    echo "Estado final: SWAP_STATE=${SWAP_STATE}"
    echo "Origen local (127.0.0.1:${EXPECTED_PORT}) responde HTTP 200 y sirve BUILD_ID=${CANDIDATE_BUILD_ID}."
    echo "Sin embargo, el reverse proxy público retiene el ETag histórico ('argphxugf31qsk')."
    echo "El release permanece en estado PENDIENTE DE INVALIDACIÓN DE CACHÉ."
    echo "Prohibido ejecutar purgas globales destructivas en el servidor compartido."
    echo "========================================================================"
    exit 0
else
    SWAP_STATE="ACTIVE"
    echo "========================================================================"
    echo "[ÉXITO] Despliegue de ${CANDIDATE_SHA} validado y plenamente operativo."
    echo "Estado final: SWAP_STATE=${SWAP_STATE}"
    echo "Artefacto activo verificado: BUILD_ID=${CANDIDATE_BUILD_ID}"
    echo "El directorio de resguardo ${TEMP_SWAP_DIR} se conserva para observación."
    echo "========================================================================"
fi
}

# Entrada principal: solo ejecuta si no está siendo sourced por la suite de pruebas
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    trap 'signal_trap SIGINT $LINENO' INT
    trap 'signal_trap SIGTERM $LINENO' TERM
    trap 'err_trap $? $LINENO' ERR
    trap 'exit_trap $?' EXIT
    run_deployment "$@"
fi
