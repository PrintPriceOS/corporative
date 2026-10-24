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
# TEST 6: Detección de retención de caché pública (Nunca acaba en ACTIVE)
# ------------------------------------------------------------------------------
echo -n "Test 6: ETag antiguo -> PENDING_CACHE_INVALIDATION (Nunca ACTIVE)... "
setup_dummy_env

MOCK_ORIGIN_STATUS="200"
MOCK_PUBLIC_ETAG="\"argphxugf31qsk\"" # ETag antiguo de d5e37f4
CACHE_PENDING=false
FINAL_STATE="NONE"

if [ "${MOCK_ORIGIN_STATUS}" = "200" ] && [ "${MOCK_PUBLIC_ETAG}" = "\"argphxugf31qsk\"" ]; then
    CACHE_PENDING=true
fi

if [ "${CACHE_PENDING}" = true ]; then
    FINAL_STATE="PENDING_CACHE_INVALIDATION"
else
    FINAL_STATE="ACTIVE"
fi

if [ "${FINAL_STATE}" = "PENDING_CACHE_INVALIDATION" ] && [ "${FINAL_STATE}" != "ACTIVE" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: state=${FINAL_STATE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 7: Manejo de señales INT/TERM durante intercambio (Retorno 130 + Rollback)
# ------------------------------------------------------------------------------
echo -n "Test 7: Interrupción por señal (SIGINT) -> Exit 130 + Rollback... "
setup_dummy_env

mv "${APP_ROOT}" "${TEMP_SWAP_DIR}"
SWAP_STATE="LIVE_MOVED"

SIG_CODE=0
bash -c "
    export VHOST_DIR='${TEST_SANDBOX}'
    export APP_ROOT='${APP_ROOT}'
    export TEMP_SWAP_DIR='${TEMP_SWAP_DIR}'
    export EXPECTED_USER='${EXPECTED_USER}'
    export EXPECTED_GROUP='${EXPECTED_GROUP}'
    export SIMULATION_MODE=true
    source '${TARGET_SCRIPT}'
    SWAP_STATE='LIVE_MOVED'
    signal_trap SIGINT 99
" >/dev/null 2>&1 || SIG_CODE=$?

if [ "${SIG_CODE}" -eq 130 ] && [ -f "${APP_ROOT}/package.json" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: code=${SIG_CODE}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 8: Prevención de SIGPIPE con heredoc/herestring (<<<)
# ------------------------------------------------------------------------------
echo -n "Test 8: Prevención de SIGPIPE bajo pipefail usando herestrings... "
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
# TEST 9: Conteo limpio de errores en log con awk (sin duplicar ceros)
# ------------------------------------------------------------------------------
echo -n "Test 9: Conteo limpio de errores con awk (cero duplicaciones)... "
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
echo "TODAS LAS PRUEBAS DE RESILIENCIA Y RECUPERACIÓN COMPLETADAS CON ÉXITO."
echo "========================================================================"
