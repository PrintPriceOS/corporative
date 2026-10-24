#!/usr/bin/env bash
# ==============================================================================
# TEST SUITE: SIMULACIÓN DE RESILIENCIA Y RECUPERACIÓN DEL RUNBOOK
# Ejercita las funciones reales de scripts/deploy_production_controlled.sh
# mediante sustitución de operaciones externas (curl, pm2, git).
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_SCRIPT="${SCRIPT_DIR}/deploy_production_controlled.sh"

if [ ! -f "${TARGET_SCRIPT}" ]; then
    echo "ERROR: No se encuentra el script objetivo en ${TARGET_SCRIPT}." >&2
    exit 1
fi

export TEST_SANDBOX="/tmp/runbook_test_sandbox_$$"
mkdir -p "${TEST_SANDBOX}/bin"

cleanup_sandbox() {
    rm -rf "${TEST_SANDBOX}"
}
trap cleanup_sandbox EXIT

echo "========================================================================"
echo "INICIANDO TEST SUITE DE SIMULACIÓN DEL RUNBOOK (FUNCIONES REALES)"
echo "Target Script: ${TARGET_SCRIPT}"
echo "Sandbox: ${TEST_SANDBOX}"
echo "========================================================================"

# Configurar variables del entorno de prueba
export DOMAIN="test.local"
export CANDIDATE_SHA="6066e15dc1eb9c6e4412251900545908f4ae123a"
export TIMESTAMP="test_time"
export VHOST_DIR="${TEST_SANDBOX}"
export RELEASES_DIR="${TEST_SANDBOX}/releases"
export STAGING_DIR="${RELEASES_DIR}/staging"
export BACKUP_DIR="${TEST_SANDBOX}/backups/live_backup"
export BACKUP_META_DIR="${TEST_SANDBOX}/backups"
export TEMP_SWAP_DIR="${TEST_SANDBOX}/httpdocs_prev"
export ERROR_LOG_PATH="${TEST_SANDBOX}/proxy_error_log"
export APP_ROOT="${TEST_SANDBOX}/httpdocs"
export EXPECTED_USER="$(id -un)"
export EXPECTED_GROUP="$(id -g)"
export EXPECTED_PM2_APP="mock-web"
export EXPECTED_PORT="3019"
export EXPECTED_NODE_BIN="/usr/bin/node"
export PM2_HOME="${TEST_SANDBOX}/.pm2"
export SIMULATION_MODE=true

# Binarios externos sustituidos hacia wrappers de prueba en TEST_SANDBOX/bin
export PATH="${TEST_SANDBOX}/bin:${PATH}"
export CURL_BIN="${TEST_SANDBOX}/bin/curl"
export PM2_BIN="${TEST_SANDBOX}/bin/pm2"
export GIT_BIN="${TEST_SANDBOX}/bin/git"

# Instalar mocks de operaciones externas
cat << 'EOF' > "${TEST_SANDBOX}/bin/pm2"
#!/usr/bin/env bash
SANDBOX_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [ "${MOCK_PM2_FAILS:-false}" = "true" ]; then
    exit 1
fi
if [ "$1" = "jlist" ]; then
    cat << JSON
[
  {
    "name": "${EXPECTED_PM2_APP:-mock-web}",
    "pid": 4321,
    "pm2_env": {
      "status": "${MOCK_PM2_STATUS:-online}",
      "pm_cwd": "${MOCK_PM2_CWD:-${APP_ROOT}}"
    }
  }
]
JSON
    exit 0
fi
if [ "$1" = "reload" ] || [ "$2" = "reload" ]; then
    if [ -n "${RELEASE_ID:-}" ]; then
        echo "${RELEASE_ID}" > "${SANDBOX_DIR:-${TEST_SANDBOX}}/last_pm2_release_id.txt"
    fi
    if [ "${MOCK_PM2_RELOAD_FAILS:-false}" = "true" ]; then
        if [ "${SWAP_STATE:-}" = "STAGING_MOVED" ] || [ "${MOCK_PM2_RELOAD_ALWAYS_FAILS:-false}" = "true" ]; then
            exit 1
        fi
    fi
    exit 0
fi
exit 0
EOF
chmod +x "${TEST_SANDBOX}/bin/pm2"

cat << 'EOF' > "${TEST_SANDBOX}/bin/git"
#!/usr/bin/env bash
for arg in "$@"; do
    if [ "$arg" = "fetch" ]; then
        if [ "${MOCK_GIT_REMOTE_ERROR:-false}" = "true" ]; then
            echo "fatal: unable to access 'https://github.com/...': Could not resolve host" >&2
            exit 128
        fi
        if [ "${MOCK_GIT_SHA_NOT_FOUND:-false}" = "true" ]; then
            echo "fatal: remote error: upload-pack: not our ref" >&2
            exit 128
        fi
        exit 0
    fi
done
if [ "$1" = "-C" ] && [ "$3" = "init" ]; then
    mkdir -p "$2/.git"
    exit 0
fi
exit 0
EOF
chmod +x "${TEST_SANDBOX}/bin/git"

cat << 'EOF' > "${TEST_SANDBOX}/bin/curl"
#!/usr/bin/env bash
SANDBOX_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IS_HEAD=false
OUTPUT_FORMAT=""
URL=""

while [ $# -gt 0 ]; do
    case "$1" in
        -I|--head)
            IS_HEAD=true
            shift
            ;;
        -w|--write-out)
            OUTPUT_FORMAT="$2"
            shift 2
            ;;
        -s|-S|-o|--max-time|--connect-timeout)
            if [ "$1" = "-o" ] || [ "$1" = "--max-time" ] || [ "$1" = "--connect-timeout" ]; then
                shift 2
            else
                shift
            fi
            ;;
        http://*|https://*)
            URL="$1"
            shift
            ;;
        *)
            shift
            ;;
    esac
done

if [[ "${URL}" == */api/health ]]; then
    status="${MOCK_HEALTH_STATUS:-200}"
    if [ "${status}" = "200" ]; then
        if [[ "${URL}" == "https://${DOMAIN}/"* ]] && [ -n "${MOCK_PUBLIC_SERVED_RELEASE_ID:-}" ]; then
            served_id="${MOCK_PUBLIC_SERVED_RELEASE_ID}"
        elif [ -n "${MOCK_SERVED_RELEASE_ID:-}" ]; then
            served_id="${MOCK_SERVED_RELEASE_ID}"
        elif [ -f "${SANDBOX_DIR:-${TEST_SANDBOX}}/last_pm2_release_id.txt" ]; then
            served_id="$(cat "${SANDBOX_DIR:-${TEST_SANDBOX}}/last_pm2_release_id.txt")"
        elif [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
            served_id="$(cat "${APP_ROOT}/.next/BUILD_ID")"
        else
            served_id="UNKNOWN"
        fi
        body="{\"status\":\"ok\",\"release_id\":\"${served_id}\"}"
    elif [ "${status}" = "404" ]; then
        body="{\"error\":\"Not Found\"}"
    else
        body="{\"error\":\"Internal Server Error\"}"
    fi

    if [[ "${OUTPUT_FORMAT}" == *$'\n'* || "${OUTPUT_FORMAT}" == *"n%{http_code}"* || "${OUTPUT_FORMAT}" == *"\\n"* ]]; then
        printf "%s\n%s\n" "${body}" "${status}"
    elif [[ "${OUTPUT_FORMAT}" == *"%{http_code}"* ]]; then
        printf "%s" "${status}"
    else
        printf "%s" "${body}"
    fi
    exit 0
fi

if [[ "${URL}" == */_next/static/*/_buildManifest.js ]]; then
    status="${MOCK_LOCAL_MANIFEST_STATUS:-200}"
    if [ "${OUTPUT_FORMAT}" = "%{http_code}" ]; then
        printf "%s" "${status}"
    else
        printf "self.__BUILD_MANIFEST={};"
    fi
    exit 0
fi

if [[ "${URL}" == "http://127.0.0.1:"*"/products/budget" ]]; then
    if [ "${MOCK_LOCAL_BUDGET_FAILS:-false}" = "true" ]; then
        printf "<html>Budget page without claim</html>"
    else
        printf "<html>CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS</html>"
    fi
    exit 0
fi

if [[ "${URL}" == "http://127.0.0.1:"*"/" ]]; then
    if [ "${IS_HEAD}" = true ]; then
        if [ -n "${MOCK_ORIGIN_ROOT_ETAG:-}" ]; then
            etag="${MOCK_ORIGIN_ROOT_ETAG}"
        elif [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
            etag="etag_$(cat "${APP_ROOT}/.next/BUILD_ID")"
        else
            etag="default_etag"
        fi
        printf "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nETag: %s\r\n\r\n" "${etag}"
        exit 0
    fi
    status="${MOCK_LOCAL_HTTP_STATUS:-200}"
    if [ "${OUTPUT_FORMAT}" = "%{http_code}" ]; then
        printf "%s" "${status}"
    else
        printf "<html>Home page</html>"
    fi
    exit 0
fi

if [[ "${URL}" == "https://${DOMAIN}/"* ]]; then
    if [ "${IS_HEAD}" = true ]; then
        if [ -n "${MOCK_PUBLIC_ETAG:-}" ]; then
            etag="${MOCK_PUBLIC_ETAG}"
        elif [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
            etag="etag_$(cat "${APP_ROOT}/.next/BUILD_ID")"
        else
            etag="default_etag"
        fi
        printf "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nETag: %s\r\n\r\n" "${etag}"
        exit 0
    fi

    status="${MOCK_PUBLIC_HTTP_STATUS:-200}"
    if [ "${OUTPUT_FORMAT}" = "%{http_code}" ]; then
        printf "%s" "${status}"
        exit 0
    fi

    if [[ "${URL}" == */products/budget ]]; then
        if [ "${MOCK_PUBLIC_CORRUPT:-false}" = "true" ]; then
            printf "<html>Contenido alterado o vacio sin claims conocidos</html>"
        elif [ "${MOCK_PUBLIC_STALE:-false}" = "true" ]; then
            printf "<html>CALCULA PRESUPUESTOS EXACTOS EN SEGUNDOS</html>"
        else
            printf "<html>CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS</html>"
        fi
        exit 0
    fi

    if [[ "${URL}" == */products/print ]]; then
        printf "<html>tarifas de producción según las matrices de planta asociadas</html>"
        exit 0
    fi

    if [[ "${URL}" == */products ]]; then
        printf "<html>transición tecnológica más eficiente</html>"
        exit 0
    fi

    printf "<html>Default public content</html>"
    exit 0
fi

if [ "${OUTPUT_FORMAT}" = "%{http_code}" ]; then
    printf "200"
fi
exit 0
EOF
chmod +x "${TEST_SANDBOX}/bin/curl"

# Cargar las funciones reales del script
source "${TARGET_SCRIPT}"

# Helper para reconstruir el entorno ficticio de pruebas
setup_dummy_env() {
    rm -rf "${TEST_SANDBOX}/releases" "${TEST_SANDBOX}/backups" "${TEST_SANDBOX}/httpdocs_prev" "${TEST_SANDBOX}/httpdocs"* "${TEST_SANDBOX}/conf"
    mkdir -p "${APP_ROOT}/.next/server/app/products/budget"
    echo "OLD_BUILD_ID_111" > "${APP_ROOT}/.next/BUILD_ID"
    echo '{"name": "mock-web", "version": "0.1.0"}' > "${APP_ROOT}/package.json"
    echo 'console.log("server running");' > "${APP_ROOT}/server.js"
    echo 'CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS DRUCKANGEBOTE IN SEKUNDEN BERECHNEN' > "${APP_ROOT}/.next/server/app/products/budget/page.js"

    mkdir -p "${STAGING_DIR}/.next/server/app/products/budget"
    echo "NEW_BUILD_ID_999" > "${STAGING_DIR}/.next/BUILD_ID"
    echo '{"name": "mock-web", "version": "0.1.0"}' > "${STAGING_DIR}/package.json"
    echo 'console.log("server running");' > "${STAGING_DIR}/server.js"
    echo 'CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS DRUCKANGEBOTE IN SEKUNDEN BERECHNEN' > "${STAGING_DIR}/.next/server/app/products/budget/page.js"
    echo '{"name": "mock-web"}' > "${STAGING_DIR}/package-lock.json"

    mkdir -p "${BACKUP_META_DIR}"
    touch "${ERROR_LOG_PATH}"

    mkdir -p "${TEST_SANDBOX}/conf"
    export DOMAIN_NGINX_CONF="${TEST_SANDBOX}/conf/nginx.conf"
    export VHOST_CUSTOM_CONF="${TEST_SANDBOX}/conf/vhost_nginx.conf"
    cat << EOF > "${DOMAIN_NGINX_CONF}"
server {
    listen 443 ssl;
    server_name "${DOMAIN}" "www.${DOMAIN}";
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/vhosts/default/htdocs;
    }
    root "${APP_ROOT}";
}
EOF
    echo "proxy_pass http://localhost:${EXPECTED_PORT};" > "${VHOST_CUSTOM_CONF}"

    SWAP_STATE="INITIAL"
    ROLLBACK_EXECUTED=false
    LIVE_BUILD_ID="OLD_BUILD_ID_111"

    # Reset variables mock
    export MOCK_PM2_FAILS=false
    export MOCK_PM2_RELOAD_FAILS=false
    export MOCK_PM2_STATUS="online"
    export MOCK_PM2_CWD="${APP_ROOT}"
    export MOCK_GIT_REMOTE_ERROR=false
    export MOCK_GIT_SHA_NOT_FOUND=false
    export MOCK_HEALTH_STATUS=200
    export MOCK_SERVED_RELEASE_ID=""
    export MOCK_CANDIDATE_BUILD_ID="NEW_BUILD_ID_999"
    export MOCK_LOCAL_HTTP_STATUS=200
    export MOCK_LOCAL_MANIFEST_STATUS=200
    export MOCK_LOCAL_BUDGET_FAILS=false
    export MOCK_PUBLIC_HTTP_STATUS=200
    export MOCK_PUBLIC_ETAG=""
    export MOCK_ORIGIN_ROOT_ETAG=""
    export MOCK_PUBLIC_SERVED_RELEASE_ID=""
    export MOCK_PUBLIC_STALE=false
    export MOCK_PUBLIC_CORRUPT=false
    export MOCK_CANDIDATE_NO_SERVER_JS=false
    rm -f "${TEST_SANDBOX}/last_pm2_release_id.txt"
}

# ------------------------------------------------------------------------------
# TEST 1: Comprobar importación de funciones reales
# ------------------------------------------------------------------------------
echo -n "Test 1: Sourcing y verificación de funciones reales del script... "
if declare -f execute_rollback >/dev/null && declare -f signal_trap >/dev/null && declare -f err_trap >/dev/null && declare -f validate_candidate_sha >/dev/null && declare -f verify_process_identity >/dev/null && declare -f classify_release_state >/dev/null; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 2: Validación temprana de SHA: Rechazo inmediato de formato inválido
# ------------------------------------------------------------------------------
echo -n "Test 2: validate_candidate_sha (Rechazo inmediato formato inválido)... "
RET_EMPTY=0
validate_candidate_sha "" >/dev/null 2>&1 || RET_EMPTY=$?

RET_SHORT=0
validate_candidate_sha "abc123" >/dev/null 2>&1 || RET_SHORT=$?

RET_NON_HEX=0
validate_candidate_sha "6066e15dc1eb9c6e4412251900545908f4ae123z" >/dev/null 2>&1 || RET_NON_HEX=$?

if [ "${RET_EMPTY}" -eq 1 ] && [ "${RET_SHORT}" -eq 1 ] && [ "${RET_NON_HEX}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: empty=${RET_EMPTY}, short=${RET_SHORT}, non_hex=${RET_NON_HEX}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 3: Validación temprana de SHA: Detección de error de consulta remota
# ------------------------------------------------------------------------------
echo -n "Test 3: validate_candidate_sha (Fallo de red/consulta remota devuelve 1)... "
export MOCK_GIT_REMOTE_ERROR=true
RET_REMOTE_ERR=0
validate_candidate_sha "6066e15dc1eb9c6e4412251900545908f4ae123a" >/dev/null 2>&1 || RET_REMOTE_ERR=$?
export MOCK_GIT_REMOTE_ERROR=false

if [ "${RET_REMOTE_ERR}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_REMOTE_ERR}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 4: Validación temprana de SHA: Commit inexistente en remoto
# ------------------------------------------------------------------------------
echo -n "Test 4: validate_candidate_sha (Commit no existente en remoto devuelve 1)... "
export MOCK_GIT_SHA_NOT_FOUND=true
RET_NOT_FOUND=0
validate_candidate_sha "6066e15dc1eb9c6e4412251900545908f4ae123a" >/dev/null 2>&1 || RET_NOT_FOUND=$?
export MOCK_GIT_SHA_NOT_FOUND=false

if [ "${RET_NOT_FOUND}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_NOT_FOUND}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 5: Validación temprana de SHA: Commit válido verificado en remoto
# ------------------------------------------------------------------------------
echo -n "Test 5: validate_candidate_sha (Commit válido verificado devuelve 0)... "
RET_VALID=0
validate_candidate_sha "6066e15dc1eb9c6e4412251900545908f4ae123a" >/dev/null 2>&1 || RET_VALID=$?

if [ "${RET_VALID}" -eq 0 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_VALID}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 6: Identidad de proceso: Falla si PM2 está offline o no responde
# ------------------------------------------------------------------------------
echo -n "Test 6: verify_process_identity (Falla si PM2 reporta offline)... "
setup_dummy_env
export MOCK_PM2_STATUS="stopped"
RET_PM2_OFFLINE=0
verify_process_identity "test-offline" "NEW_BUILD_ID_999" >/dev/null 2>&1 || RET_PM2_OFFLINE=$?
export MOCK_PM2_STATUS="online"

if [ "${RET_PM2_OFFLINE}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_PM2_OFFLINE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 7: Identidad de proceso: Falla si endpoint /api/health devuelve HTTP 500
# ------------------------------------------------------------------------------
echo -n "Test 7: verify_process_identity (Falla si /api/health devuelve HTTP 500)... "
setup_dummy_env
export MOCK_HEALTH_STATUS=500
RET_500=0
verify_process_identity "test-500" "NEW_BUILD_ID_999" >/dev/null 2>&1 || RET_500=$?
export MOCK_HEALTH_STATUS=200

if [ "${RET_500}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_500}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 8: Identidad de proceso: Falla si identidad servida en memoria difiere
# ------------------------------------------------------------------------------
echo -n "Test 8: verify_process_identity (Falla si identidad servida difiere de esperada)... "
setup_dummy_env
export MOCK_SERVED_RELEASE_ID="UNEXPECTED_BUILD_666"
RET_MISMATCH=0
verify_process_identity "test-mismatch" "NEW_BUILD_ID_999" >/dev/null 2>&1 || RET_MISMATCH=$?

if [ "${RET_MISMATCH}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_MISMATCH}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 9: Identidad de proceso: Acredita versión anterior declarando límite (404)
# ------------------------------------------------------------------------------
echo -n "Test 9: verify_process_identity (404 declara límite de verificación en rollback)... "
setup_dummy_env
export MOCK_HEALTH_STATUS=404
LOG_404="${TEST_SANDBOX}/test9_404.log"
RET_LEGACY=0
verify_process_identity "post-rollback" "OLD_BUILD_ID_111" > "${LOG_404}" 2>&1 || RET_LEGACY=$?
export MOCK_HEALTH_STATUS=200

if [ "${RET_LEGACY}" -eq 0 ] && grep -q "LÍMITE DE VERIFICACIÓN DECLARADO" "${LOG_404}"; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_LEGACY}]"
    cat "${LOG_404}"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 10: classify_release_state: HTTP 500/502 público es PUBLIC_FAILED (no caché)
# ------------------------------------------------------------------------------
echo -n "Test 10: classify_release_state (Público 500/502 -> PUBLIC_FAILED con exit 1)... "
RET_PUB_500=0
RES_PUB_500="$(classify_release_state true true false false false)" || RET_PUB_500=$?

if [ "${RES_PUB_500}" = "PUBLIC_FAILED" ] && [ "${RET_PUB_500}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: res=${RES_PUB_500}, ret=${RET_PUB_500}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 11: classify_release_state: Origen fallido clasifica ORIGIN_FAILED con exit 1
# ------------------------------------------------------------------------------
echo -n "Test 11: classify_release_state (Origen fallido -> ORIGIN_FAILED con exit 1)... "
RET_ORIG_FAIL=0
RES_ORIG_FAIL="$(classify_release_state false true true true false)" || RET_ORIG_FAIL=$?

if [ "${RES_ORIG_FAIL}" = "ORIGIN_FAILED" ] && [ "${RET_ORIG_FAIL}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: res=${RES_ORIG_FAIL}, ret=${RET_ORIG_FAIL}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 12: classify_release_state: Evidencia contenido antiguo -> PENDING_CACHE_INVALIDATION
# ------------------------------------------------------------------------------
echo -n "Test 12: classify_release_state (Evidencia caché antigua -> PENDING_CACHE_INVALIDATION exit 0)... "
RET_CACHE=0
RES_CACHE="$(classify_release_state true true true false true)" || RET_CACHE=$?

if [ "${RES_CACHE}" = "PENDING_CACHE_INVALIDATION" ] && [ "${RET_CACHE}" -eq 0 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: res=${RES_CACHE}, ret=${RET_CACHE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 13: classify_release_state: Todo actualizado -> ACTIVE (exit 0)
# ------------------------------------------------------------------------------
echo -n "Test 13: classify_release_state (Contenido actualizado -> ACTIVE exit 0)... "
RET_ACTIVE=0
RES_ACTIVE="$(classify_release_state true true true true false)" || RET_ACTIVE=$?

if [ "${RES_ACTIVE}" = "ACTIVE" ] && [ "${RET_ACTIVE}" -eq 0 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: res=${RES_ACTIVE}, ret=${RET_ACTIVE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 14: classify_release_state: Público incorrecto sin evidencia antigua -> PUBLIC_FAILED (exit 1)
# ------------------------------------------------------------------------------
echo -n "Test 14: classify_release_state (Público incorrecto sin evidencia antigua -> PUBLIC_FAILED exit 1)... "
RET_PUB_NO_EVID=0
RES_PUB_NO_EVID="$(classify_release_state true true true false false)" || RET_PUB_NO_EVID=$?

if [ "${RES_PUB_NO_EVID}" = "PUBLIC_FAILED" ] && [ "${RET_PUB_NO_EVID}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: res=${RES_PUB_NO_EVID}, ret=${RET_PUB_NO_EVID}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 15: Recuperación de servicio: Fallo en recarga PM2 genera ROLLBACK_FAILED (exit 2)
# ------------------------------------------------------------------------------
echo -n "Test 15: verify_service_recovery (Fallo PM2 reload -> ROLLBACK_FAILED exit 2)... "
setup_dummy_env
export MOCK_PM2_RELOAD_FAILS=true
export MOCK_PM2_RELOAD_ALWAYS_FAILS=true
RET_RELOAD=0
verify_service_recovery "OLD_BUILD_ID_111" >/dev/null 2>&1 || RET_RELOAD=$?
export MOCK_PM2_RELOAD_FAILS=false
export MOCK_PM2_RELOAD_ALWAYS_FAILS=false

if [ "${RET_RELOAD}" -eq 2 ] && [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_RELOAD}, state=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 16: Recuperación de servicio: Fallo manifest HTTP local genera exit 2
# ------------------------------------------------------------------------------
echo -n "Test 16: verify_service_recovery (Manifest 404 local -> ROLLBACK_FAILED exit 2)... "
setup_dummy_env
export MOCK_LOCAL_MANIFEST_STATUS=404
RET_MANIFEST=0
verify_service_recovery "OLD_BUILD_ID_111" >/dev/null 2>&1 || RET_MANIFEST=$?
export MOCK_LOCAL_MANIFEST_STATUS=200

if [ "${RET_MANIFEST}" -eq 2 ] && [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_MANIFEST}, state=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 17: Recuperación de servicio: Exitosa con BUILD_ID y manifest verificado
# ------------------------------------------------------------------------------
echo -n "Test 17: verify_service_recovery (Exitosa -> ROLLBACK_DONE exit 0)... "
setup_dummy_env
RET_REC_OK=0
verify_service_recovery "OLD_BUILD_ID_111" > "${TEST_SANDBOX}/test16.log" 2>&1 || RET_REC_OK=$?

if [ "${RET_REC_OK}" -eq 0 ] && [ "${SWAP_STATE}" = "ROLLBACK_DONE" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_REC_OK}, state=${SWAP_STATE}]"
    cat "${TEST_SANDBOX}/test16.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 18: Señal SIGINT a subproceso -> Exit 130 + Rollback
# ------------------------------------------------------------------------------
echo -n "Test 18: Envío de SIGINT real a subproceso -> Exit 130 + Rollback... "
setup_dummy_env
mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"

TEST_INT_SCRIPT="${TEST_SANDBOX}/test_sigint.sh"
cat << 'EOF' > "${TEST_INT_SCRIPT}"
#!/usr/bin/env bash
source "${1}"
LIVE_BUILD_ID="OLD_BUILD_ID_111"
SWAP_STATE="LIVE_MOVED"
trap 'signal_trap SIGINT $LINENO' INT
kill -INT $$
EOF
chmod +x "${TEST_INT_SCRIPT}"

SIGINT_CODE=0
bash "${TEST_INT_SCRIPT}" "${TARGET_SCRIPT}" >/dev/null 2>&1 || SIGINT_CODE=$?

if [ "${SIGINT_CODE}" -eq 130 ] && [ -f "${APP_ROOT}/package.json" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: code=${SIGINT_CODE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 19: Señal SIGTERM a subproceso -> Exit 143 + Rollback
# ------------------------------------------------------------------------------
echo -n "Test 19: Envío de SIGTERM real a subproceso -> Exit 143 + Rollback... "
setup_dummy_env
mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"

TEST_TERM_SCRIPT="${TEST_SANDBOX}/test_sigterm.sh"
cat << 'EOF' > "${TEST_TERM_SCRIPT}"
#!/usr/bin/env bash
source "${1}"
LIVE_BUILD_ID="OLD_BUILD_ID_111"
SWAP_STATE="LIVE_MOVED"
trap 'signal_trap SIGTERM $LINENO' TERM
kill -TERM $$
EOF
chmod +x "${TEST_TERM_SCRIPT}"

SIGTERM_CODE=0
bash "${TEST_TERM_SCRIPT}" "${TARGET_SCRIPT}" >/dev/null 2>&1 || SIGTERM_CODE=$?

if [ "${SIGTERM_CODE}" -eq 143 ] && [ -f "${APP_ROOT}/package.json" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: code=${SIGTERM_CODE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 20: Flujo real run_deployment con dobles: Éxito completo -> ACTIVE (exit 0)
# ------------------------------------------------------------------------------
echo -n "Test 20: Flujo real run_deployment -> ACTIVE (exit 0)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_PUBLIC_ETAG=""
export MOCK_PUBLIC_STALE=false

DEPLOY_19_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test19.log" 2>&1 || DEPLOY_19_RET=$?

if [ "${DEPLOY_19_RET}" -eq 0 ] && grep -q "SWAP_STATE=ACTIVE" "${TEST_SANDBOX}/test19.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "NEW_BUILD_ID_999" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_19_RET}]"
    cat "${TEST_SANDBOX}/test19.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 21: Flujo real run_deployment con dobles: Retención de caché -> PENDING_CACHE_INVALIDATION
# ------------------------------------------------------------------------------
echo -n "Test 21: Flujo real run_deployment -> PENDING_CACHE_INVALIDATION (exit 0)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_PUBLIC_STALE=true

DEPLOY_20_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test20.log" 2>&1 || DEPLOY_20_RET=$?

if [ "${DEPLOY_20_RET}" -eq 0 ] && grep -q "SWAP_STATE=PENDING_CACHE_INVALIDATION" "${TEST_SANDBOX}/test20.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "NEW_BUILD_ID_999" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_20_RET}]"
    cat "${TEST_SANDBOX}/test20.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 22: Flujo real run_deployment: Origen local falla (500) -> Rollback automático
# ------------------------------------------------------------------------------
echo -n "Test 22: Flujo real run_deployment: Origen 500 -> ORIGIN_FAILED -> Rollback (exit 1)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_LOCAL_HTTP_STATUS=500

DEPLOY_21_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test21.log" 2>&1 || DEPLOY_21_RET=$?

if [ "${DEPLOY_21_RET}" -eq 1 ] && grep -q "ORIGIN_FAILED" "${TEST_SANDBOX}/test21.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_21_RET}]"
    cat "${TEST_SANDBOX}/test21.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 23: Flujo real run_deployment: Acceso público falla (500) -> PUBLIC_FAILED -> Rollback
# ------------------------------------------------------------------------------
echo -n "Test 23: Flujo real run_deployment: Público 500 -> PUBLIC_FAILED -> Rollback (exit 1)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_PUBLIC_HTTP_STATUS=500

DEPLOY_22_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test22.log" 2>&1 || DEPLOY_22_RET=$?

if [ "${DEPLOY_22_RET}" -eq 1 ] && grep -q "PUBLIC_FAILED" "${TEST_SANDBOX}/test22.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_22_RET}]"
    cat "${TEST_SANDBOX}/test22.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 24: Flujo real run_deployment: Identidad servida incorrecta -> Rollback automático
# ------------------------------------------------------------------------------
echo -n "Test 24: Flujo real run_deployment: Identidad servida incorrecta -> Rollback (exit 1)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_SERVED_RELEASE_ID="CORRUPTED_IN_MEMORY_ID"

DEPLOY_23_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test23.log" 2>&1 || DEPLOY_23_RET=$?

if [ "${DEPLOY_23_RET}" -eq 1 ] && grep -q "Identidad de release servida en memoria viva" "${TEST_SANDBOX}/test23.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_23_RET}]"
    cat "${TEST_SANDBOX}/test23.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 25: Flujo real run_deployment: Fallo en recarga PM2 -> Rollback automático
# ------------------------------------------------------------------------------
echo -n "Test 25: Flujo real run_deployment: Fallo recarga PM2 en Phase 5 -> Rollback (exit 1)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_PM2_RELOAD_FAILS=true

DEPLOY_24_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test24.log" 2>&1 || DEPLOY_24_RET=$?
export MOCK_PM2_RELOAD_FAILS=false

if [ "${DEPLOY_24_RET}" -eq 1 ] && grep -q "Falló la recarga de PM2" "${TEST_SANDBOX}/test24.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_24_RET}]"
    cat "${TEST_SANDBOX}/test24.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 26: Flujo real run_deployment: Contenido público incorrecto sin evidencia antigua -> PUBLIC_FAILED + Rollback
# ------------------------------------------------------------------------------
echo -n "Test 26: Flujo real run_deployment: Público incorrecto sin evidencia antigua -> PUBLIC_FAILED (exit 1)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_PUBLIC_CORRUPT=true
export MOCK_PUBLIC_STALE=false
export MOCK_ORIGIN_ROOT_ETAG="etag_new_candidate"
export MOCK_PUBLIC_ETAG="etag_new_candidate"

DEPLOY_26_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test26.log" 2>&1 || DEPLOY_26_RET=$?
export MOCK_PUBLIC_CORRUPT=false

if [ "${DEPLOY_26_RET}" -eq 1 ] && grep -q "PUBLIC_FAILED" "${TEST_SANDBOX}/test26.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_26_RET}]"
    cat "${TEST_SANDBOX}/test26.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 27: Flujo real run_deployment: Página actual con ETag sin cambios entre origen y público -> ACTIVE
# ------------------------------------------------------------------------------
echo -n "Test 27: Flujo real run_deployment: Página actual con ETag sin cambios entre origen y público -> ACTIVE (exit 0)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
# Pre-despliegue LIVE_PUBLIC_ETAG coincide con el actual porque la página no cambió
export MOCK_ORIGIN_ROOT_ETAG="etag_static_unchanged"
export MOCK_PUBLIC_ETAG="etag_static_unchanged"
export MOCK_PUBLIC_STALE=false

DEPLOY_27_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test27.log" 2>&1 || DEPLOY_27_RET=$?

if [ "${DEPLOY_27_RET}" -eq 0 ] && grep -q "SWAP_STATE=ACTIVE" "${TEST_SANDBOX}/test27.log" && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "NEW_BUILD_ID_999" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_27_RET}]"
    cat "${TEST_SANDBOX}/test27.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 28: Identidad de proceso: Candidato y rollback reciben y sirven su respectiva identidad vía PM2 env
# ------------------------------------------------------------------------------
echo -n "Test 28: Identidad de proceso: Candidato y rollback reciben y sirven su respectiva identidad vía PM2 env... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
# Forzar fallo en fase 6 (public status 500) para comprobar la cadena de recargas y servicio de identidades
export MOCK_PUBLIC_HTTP_STATUS=500

DEPLOY_28_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test28.log" 2>&1 || DEPLOY_28_RET=$?

RESTORED_PM2_ID="$(cat "${TEST_SANDBOX}/last_pm2_release_id.txt" 2>/dev/null || echo "NONE")"

if [ "${DEPLOY_28_RET}" -eq 1 ] && [ "${RESTORED_PM2_ID}" = "OLD_BUILD_ID_111" ] &&    grep -q "Identidad de release en memoria viva confirmada (post-reload): 'NEW_BUILD_ID_999' coincide con la esperada" "${TEST_SANDBOX}/test28.log" &&    grep -q "Identidad de release en memoria viva confirmada (post-rollback): 'OLD_BUILD_ID_111' coincide con la esperada" "${TEST_SANDBOX}/test28.log"; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_28_RET}, pm2_id=${RESTORED_PM2_ID}]"
    cat "${TEST_SANDBOX}/test28.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 29: Candidato construido sin server.js aborta antes de FASE 4 (cero alteración)
# ------------------------------------------------------------------------------
echo -n "Test 29: Candidato sin server.js aborta antes de FASE 4 (exit 1)... "
setup_dummy_env
rm -rf "${STAGING_DIR}" "${BACKUP_DIR}"
export MOCK_CANDIDATE_NO_SERVER_JS=true

DEPLOY_29_RET=0
( run_deployment "${CANDIDATE_SHA}" ) > "${TEST_SANDBOX}/test29.log" 2>&1 || DEPLOY_29_RET=$?
export MOCK_CANDIDATE_NO_SERVER_JS=false

if [ "${DEPLOY_29_RET}" -eq 1 ] && grep -q "El candidato construido carece de 'server.js'" "${TEST_SANDBOX}/test29.log" && [ "${SWAP_STATE}" = "INITIAL" ] && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${DEPLOY_29_RET}, state=${SWAP_STATE}]"
    cat "${TEST_SANDBOX}/test29.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 30: resolve_nginx_doc_root: root de dominio entre comillas
# ------------------------------------------------------------------------------
echo -n "Test 30: resolve_nginx_doc_root con root entre comillas... "
CONF_QUOTED="${TEST_SANDBOX}/conf/nginx_quoted.conf"
cat << EOF > "${CONF_QUOTED}"
server {
    listen 443 ssl;
    server_name "${DOMAIN}";
    root "/var/www/vhosts/printprice.pro/httpdocs";
}
EOF

RESOLVED_30="$(resolve_nginx_doc_root "${CONF_QUOTED}" "${DOMAIN}")"
if [ "${RESOLVED_30}" = "/var/www/vhosts/printprice.pro/httpdocs" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: obtenido '${RESOLVED_30}']"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 31: resolve_nginx_doc_root: root de dominio sin comillas
# ------------------------------------------------------------------------------
echo -n "Test 31: resolve_nginx_doc_root con root sin comillas... "
CONF_UNQUOTED="${TEST_SANDBOX}/conf/nginx_unquoted.conf"
cat << EOF > "${CONF_UNQUOTED}"
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    root /var/www/vhosts/printprice.pro/httpdocs;
}
EOF

RESOLVED_31="$(resolve_nginx_doc_root "${CONF_UNQUOTED}" "${DOMAIN}")"
if [ "${RESOLVED_31}" = "/var/www/vhosts/printprice.pro/httpdocs" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: obtenido '${RESOLVED_31}']"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 32: resolve_nginx_doc_root: root de /.well-known antes del root de dominio
# ------------------------------------------------------------------------------
echo -n "Test 32: resolve_nginx_doc_root con /.well-known antes de root de dominio... "
CONF_WELLKNOWN="${TEST_SANDBOX}/conf/nginx_wellknown.conf"
cat << EOF > "${CONF_WELLKNOWN}"
server {
    listen 80;
    server_name default.vhost;
    root /var/www/default/htdocs;
}

server {
    listen 443 ssl;
    server_name "${DOMAIN}" "www.${DOMAIN}";
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/vhosts/default/htdocs;
    }
    root "/var/www/vhosts/printprice.pro/httpdocs";
}
EOF

RESOLVED_32="$(resolve_nginx_doc_root "${CONF_WELLKNOWN}" "${DOMAIN}")"
if [ "${RESOLVED_32}" = "/var/www/vhosts/printprice.pro/httpdocs" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: obtenido '${RESOLVED_32}']"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 33: resolve_nginx_doc_root: Configuración ambigua aborta con error
# ------------------------------------------------------------------------------
echo -n "Test 33: resolve_nginx_doc_root configuración ambigua aborta... "
CONF_AMBIGUOUS="${TEST_SANDBOX}/conf/nginx_ambiguous.conf"
cat << EOF > "${CONF_AMBIGUOUS}"
server {
    server_name ${DOMAIN};
    root /var/www/vhosts/printprice.pro/httpdocs;
}
server {
    server_name ${DOMAIN};
    root /var/www/vhosts/other/path;
}
EOF

RESOLVE_33_RET=0
RESOLVED_33="$(resolve_nginx_doc_root "${CONF_AMBIGUOUS}" "${DOMAIN}" 2>"${TEST_SANDBOX}/test33.log")" || RESOLVE_33_RET=$?
if [ "${RESOLVE_33_RET}" -ne 0 ] && grep -q "Ambiguedad en directiva root" "${TEST_SANDBOX}/test33.log"; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RESOLVE_33_RET}]"
    cat "${TEST_SANDBOX}/test33.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 34: resolve_nginx_doc_root: Sin root válido para el dominio aborta
# ------------------------------------------------------------------------------
echo -n "Test 34: resolve_nginx_doc_root sin root válido aborta... "
CONF_NO_ROOT="${TEST_SANDBOX}/conf/nginx_no_root.conf"
cat << EOF > "${CONF_NO_ROOT}"
server {
    server_name otherdomain.com;
    root /var/www/vhosts/other/httpdocs;
}
server {
    server_name ${DOMAIN};
    location / {
        proxy_pass http://localhost:3010;
    }
}
EOF

RESOLVE_34_RET=0
RESOLVED_34="$(resolve_nginx_doc_root "${CONF_NO_ROOT}" "${DOMAIN}" 2>"${TEST_SANDBOX}/test34.log")" || RESOLVE_34_RET=$?
if [ "${RESOLVE_34_RET}" -ne 0 ] && grep -q "No se encontro directiva root valida" "${TEST_SANDBOX}/test34.log"; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RESOLVE_34_RET}]"
    cat "${TEST_SANDBOX}/test34.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 35: Subproceso con trampas reales: exit 1 en INITIAL devuelve 1 e intacta app
# ------------------------------------------------------------------------------
echo -n "Test 35: Subproceso con trampas reales: exit 1 en INITIAL devuelve 1... "
setup_dummy_env

SUB_35_RET=0
bash -c '
    source "'"${TARGET_SCRIPT}"'"
    ORIGINAL_EXIT_CODE=0
    SWAP_STATE="INITIAL"
    trap '\''exit_trap $?'\'' EXIT
    exit 1
' > "${TEST_SANDBOX}/test35.log" 2>&1 || SUB_35_RET=$?

if [ "${SUB_35_RET}" -eq 1 ] && \
   grep -q "Producción conservada intacta" "${TEST_SANDBOX}/test35.log" && \
   [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${SUB_35_RET}]"
    cat "${TEST_SANDBOX}/test35.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 36: Subproceso con trampas reales: ROLLBACK_FAILED devuelve 2
# ------------------------------------------------------------------------------
echo -n "Test 36: Subproceso con trampas reales: ROLLBACK_FAILED devuelve 2... "
setup_dummy_env

SUB_36_RET=0
bash -c '
    source "'"${TARGET_SCRIPT}"'"
    SWAP_STATE="ROLLBACK_FAILED"
    trap '\''exit_trap $?'\'' EXIT
    exit 1
' > "${TEST_SANDBOX}/test36.log" 2>&1 || SUB_36_RET=$?

if [ "${SUB_36_RET}" -eq 2 ] && grep -q "DESASTRE EN RESTAURACIÓN" "${TEST_SANDBOX}/test36.log"; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${SUB_36_RET}]"
    cat "${TEST_SANDBOX}/test36.log"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 37: Subproceso con trampas reales: Señales SIGINT/SIGTERM devuelven 130/143
# ------------------------------------------------------------------------------
echo -n "Test 37: Subproceso con trampas reales: Señales SIGINT/SIGTERM -> 130/143... "
setup_dummy_env

SUB_SIGINT_RET=0
bash -c '
    source "'"${TARGET_SCRIPT}"'"
    ORIGINAL_EXIT_CODE=0
    SWAP_STATE="INITIAL"
    trap '\''signal_trap SIGINT $LINENO'\'' INT
    trap '\''exit_trap $?'\'' EXIT
    kill -INT $$
' > "${TEST_SANDBOX}/test37_int.log" 2>&1 || SUB_SIGINT_RET=$?

SUB_SIGTERM_RET=0
bash -c '
    source "'"${TARGET_SCRIPT}"'"
    ORIGINAL_EXIT_CODE=0
    SWAP_STATE="INITIAL"
    trap '\''signal_trap SIGTERM $LINENO'\'' TERM
    trap '\''exit_trap $?'\'' EXIT
    kill -TERM $$
' > "${TEST_SANDBOX}/test37_term.log" 2>&1 || SUB_SIGTERM_RET=$?

if [ "${SUB_SIGINT_RET}" -eq 130 ] && [ "${SUB_SIGTERM_RET}" -eq 143 ] && \
   [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: sigint=${SUB_SIGINT_RET}, sigterm=${SUB_SIGTERM_RET}]"
    cat "${TEST_SANDBOX}/test37_int.log"
    cat "${TEST_SANDBOX}/test37_term.log"
    exit 1
fi

echo "========================================================================"
echo "TODAS LAS 37 PRUEBAS DE RESILIENCIA Y RECUPERACIÓN COMPLETADAS CON ÉXITO."
echo "========================================================================"
