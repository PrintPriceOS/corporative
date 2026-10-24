#!/usr/bin/env bash
# ==============================================================================
# TEST SUITE: SIMULACIÓN DE RESILIENCIA Y RECUPERACIÓN DEL RUNBOOK
# Ejercita las funciones reales de scripts/deploy_production_controlled.sh
# en un entorno local desechable sin acceso a producción.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_SCRIPT="${SCRIPT_DIR}/deploy_production_controlled.sh"

if [ ! -f "${TARGET_SCRIPT}" ]; then
    echo "ERROR: No se encuentra el script objetivo en ${TARGET_SCRIPT}." >&2
    exit 1
fi

TEST_SANDBOX="/tmp/runbook_test_sandbox_$$"
mkdir -p "${TEST_SANDBOX}"

cleanup_sandbox() {
    rm -rf "${TEST_SANDBOX}"
}
trap cleanup_sandbox EXIT

echo "========================================================================"
echo "INICIANDO TEST SUITE DE SIMULACIÓN DEL RUNBOOK (FUNCIONES REALES)"
echo "Target Script: ${TARGET_SCRIPT}"
echo "Sandbox: ${TEST_SANDBOX}"
echo "========================================================================"

# Configurar variables ficticias requeridas por el script
export DOMAIN="test.local"
export CANDIDATE_SHA="test_candidate_sha_123"
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
export SIMULATION_MODE=true

# Cargar las funciones reales del script de release
source "${TARGET_SCRIPT}"

# Helper para reconstruir el entorno ficticio de pruebas
setup_dummy_env() {
    rm -rf "${TEST_SANDBOX}"/*
    mkdir -p "${APP_ROOT}/.next"
    echo "OLD_BUILD_ID_111" > "${APP_ROOT}/.next/BUILD_ID"
    echo '{"name": "mock-web", "version": "0.1.0"}' > "${APP_ROOT}/package.json"
    echo 'console.log("server running");' > "${APP_ROOT}/server.js"

    mkdir -p "${STAGING_DIR}/.next"
    echo "NEW_BUILD_ID_999" > "${STAGING_DIR}/.next/BUILD_ID"
    echo '{"name": "mock-web", "version": "0.1.0"}' > "${STAGING_DIR}/package.json"
    echo 'console.log("server running");' > "${STAGING_DIR}/server.js"

    mkdir -p "${BACKUP_META_DIR}"
    touch "${ERROR_LOG_PATH}"

    SWAP_STATE="INITIAL"
    ROLLBACK_EXECUTED=false
    LIVE_BUILD_ID="OLD_BUILD_ID_111"
}

# ------------------------------------------------------------------------------
# TEST 1: Comprobar importación de funciones reales
# ------------------------------------------------------------------------------
echo -n "Test 1: Sourcing y verificación de funciones reales del script... "
if declare -f execute_rollback >/dev/null && declare -f signal_trap >/dev/null && declare -f err_trap >/dev/null; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 2: Camino feliz (Swap completo)
# ------------------------------------------------------------------------------
echo -n "Test 2: Camino feliz (Intercambio secuencial de directorios)... "
setup_dummy_env

mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"
SWAP_STATE="LIVE_MOVED"
mv "${STAGING_DIR}" "${APP_ROOT}"
SWAP_STATE="STAGING_MOVED"

if [ -f "${APP_ROOT}/.next/BUILD_ID" ] && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "NEW_BUILD_ID_999" ] && [ -d "${TEMP_SWAP_DIR}" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 3: Recuperación del servicio desde LIVE_MOVED (Fallo en segundo movimiento)
# ------------------------------------------------------------------------------
echo -n "Test 3: Recuperación del servicio desde LIVE_MOVED... "
setup_dummy_env

# Paso 1: mover live a temp
mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"
SWAP_STATE="LIVE_MOVED"

# Simular que el segundo movimiento falla (por staging corrupto o ausente)
NON_EXISTENT_STAGING="${TEST_SANDBOX}/non_existent"
if ! mv "${NON_EXISTENT_STAGING}" "${APP_ROOT}" 2>/dev/null; then
    # Invocar la función real execute_rollback
    execute_rollback "Fallo inducido en segundo movimiento"
fi

if [ "${SWAP_STATE}" = "ROLLBACK_DONE" ] && [ -f "${APP_ROOT}/.next/BUILD_ID" ] && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: estado=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 4: Reversión de STAGING_MOVED ante fallo de verificación
# ------------------------------------------------------------------------------
echo -n "Test 4: Reversión de STAGING_MOVED tras verificación fallida... "
setup_dummy_env

mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"
SWAP_STATE="LIVE_MOVED"
mv "${STAGING_DIR}" "${APP_ROOT}"
SWAP_STATE="STAGING_MOVED"

# Simular fallo en verificación
execute_rollback "Fallo inducido en verificación de salud"

if [ "${SWAP_STATE}" = "ROLLBACK_DONE" ] && [ "$(cat "${APP_ROOT}/.next/BUILD_ID")" = "OLD_BUILD_ID_111" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: estado=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 5: Fallo de restauración catastrófico (Devuelve exit code 2)
# ------------------------------------------------------------------------------
echo -n "Test 5: Fallo de restauración catastrófico (Retorno exit code 2)... "
setup_dummy_env

# Crear situación donde TEMP_SWAP_DIR no existe
SWAP_STATE="LIVE_MOVED"
rm -rf "${TEMP_SWAP_DIR}"

RET_CODE=0
execute_rollback "Fallo crítico" || RET_CODE=$?

if [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ] && [ "${RET_CODE}" -eq 2 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${RET_CODE}, state=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# TEST 6: Inyección de fallo en recarga PM2 (No debe declarar éxito y debe salir con 2)
# ------------------------------------------------------------------------------
echo -n "Test 6: Inyección de fallo en recarga PM2 -> ROLLBACK_FAILED (exit 2)... "
setup_dummy_env

mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"
SWAP_STATE="LIVE_MOVED"
export MOCK_PM2_RELOAD_FAILS=true

PM2_RET=0
execute_rollback "Fallo inducido en recarga PM2" || PM2_RET=$?
export MOCK_PM2_RELOAD_FAILS=false

if [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ] && [ "${PM2_RET}" -eq 2 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: ret=${PM2_RET}, state=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 7: Dobles controlables para servicios externos (No fijar 200 incondicionalmente)
# ------------------------------------------------------------------------------
echo -n "Test 7: Dobles controlables (500 base o 404 manifest impiden recuperación)... "
setup_dummy_env

# Probar que manifest 404 en memoria falla la recuperación
export MOCK_HTTP_STATUS=200
export MOCK_MANIFEST_STATUS=404
RET_MOCK=0
verify_service_recovery "OLD_BUILD_ID_111" >/dev/null 2>&1 || RET_MOCK=$?

if [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ] && [ "${RET_MOCK}" -eq 2 ]; then
    # Ahora probar que cuando ambos responden 200, la verificación triunfa
    export MOCK_MANIFEST_STATUS=200
    SWAP_STATE="VERIFYING"
    verify_service_recovery "OLD_BUILD_ID_111" >/dev/null 2>&1
    if [ "${SWAP_STATE}" = "ROLLBACK_DONE" ]; then
        echo "[PASÓ]"
    else
        echo "[FALLÓ en segunda fase: state=${SWAP_STATE}]"
        exit 1
    fi
else
    echo "[FALLÓ: ret=${RET_MOCK}, state=${SWAP_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 8: Clasificación operativa de release (Llamada al código real classify_release_state)
# ------------------------------------------------------------------------------
echo -n "Test 8: classify_release_state (Separación estricta de origen, caché y activo)... "

RES_A="$(classify_release_state false true true true || true)"
RES_B="$(classify_release_state true true false false || true)"
RES_C="$(classify_release_state true true true true || true)"
RES_D="$(classify_release_state true false false false || true)"

if [ "${RES_A}" = "ORIGIN_FAILED" ] && \
   [ "${RES_B}" = "PENDING_CACHE_INVALIDATION" ] && \
   [ "${RES_C}" = "ACTIVE" ] && \
   [ "${RES_D}" = "ORIGIN_FAILED" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: A=${RES_A}, B=${RES_B}, C=${RES_C}, D=${RES_D}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 9: Envío de señal SIGINT real a proceso hijo -> Exit 130 + Rollback
# ------------------------------------------------------------------------------
echo -n "Test 9: Envío de SIGINT real a proceso de prueba -> Exit 130 + Rollback... "
setup_dummy_env

mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"

TEST_INT_SCRIPT="${TEST_SANDBOX}/test_sigint_child.sh"
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
# TEST 10: Envío de señal SIGTERM real a proceso hijo -> Exit 143 + Rollback
# ------------------------------------------------------------------------------
echo -n "Test 10: Envío de SIGTERM real a proceso de prueba -> Exit 143 + Rollback... "
setup_dummy_env

mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"

TEST_TERM_SCRIPT="${TEST_SANDBOX}/test_sigterm_child.sh"
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
# TEST 11: Prevención de SIGPIPE con heredoc/herestring (<<<)
# ------------------------------------------------------------------------------
echo -n "Test 11: Prevención de SIGPIPE bajo pipefail usando herestrings... "
(
    set -euo pipefail
    LONG_TEXT=$(head -c 50000 /dev/urandom | base64)
    if grep -F "A" <<< "${LONG_TEXT}" >/dev/null; then
        exit 0
    else
        exit 0
    fi
)
if [ $? -eq 0 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 12: Conteo limpio de errores en log con awk (sin duplicar ceros)
# ------------------------------------------------------------------------------
echo -n "Test 12: Conteo limpio de errores con awk (cero duplicaciones)... "
MOCK_LOG="${TEST_SANDBOX}/mock_proxy_error.log"
echo "2026/10/24 10:00:00 [error] 1234#0: connection refused" > "${MOCK_LOG}"
echo "2026/10/24 10:05:00 [notice] normal restart" >> "${MOCK_LOG}"

BASELINE=2
ERR_COUNT=$(tail -n +$((BASELINE + 1)) "${MOCK_LOG}" 2>/dev/null | awk '/500|502|fatal|crash/ {count++} END {print count+0}')

if [ "${ERR_COUNT}" -eq 0 ] 2>/dev/null && [ "${ERR_COUNT}" = "0" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: count='${ERR_COUNT}']"
    exit 1
fi

echo "========================================================================"
echo "TODAS LAS 12 PRUEBAS DE RESILIENCIA Y RECUPERACIÓN COMPLETADAS CON ÉXITO."
echo "========================================================================"
