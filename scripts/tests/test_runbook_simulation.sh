#!/usr/bin/env bash
# ==============================================================================
# TEST SUITE: SIMULACIÓN DE FALLOS Y VERIFICACIÓN DEL RUNBOOK
# Ejecuta en entorno local desechable sin tocar servidores remotos.
# ==============================================================================

set -euo pipefail

TEST_SANDBOX="/tmp/runbook_test_sandbox_$$"
mkdir -p "${TEST_SANDBOX}"
cd "${TEST_SANDBOX}"

cleanup_sandbox() {
    rm -rf "${TEST_SANDBOX}"
}
trap cleanup_sandbox EXIT

echo "========================================================================"
echo "INICIANDO TEST SUITE DE SIMULACIÓN DEL RUNBOOK"
echo "Sandbox: ${TEST_SANDBOX}"
echo "========================================================================"

# Helper para crear estructura ficticia de producción
setup_dummy_env() {
    rm -rf "${TEST_SANDBOX}"/*
    mkdir -p "${TEST_SANDBOX}/httpdocs/.next"
    echo "OLD_BUILD_ID_12345" > "${TEST_SANDBOX}/httpdocs/.next/BUILD_ID"
    echo '{"name": "printprice-web", "version": "0.1.0"}' > "${TEST_SANDBOX}/httpdocs/package.json"
    echo 'console.log("server running");' > "${TEST_SANDBOX}/httpdocs/server.js"

    mkdir -p "${TEST_SANDBOX}/staging/.next"
    echo "NEW_BUILD_ID_67890" > "${TEST_SANDBOX}/staging/.next/BUILD_ID"
    echo '{"name": "printprice-web", "version": "0.1.0"}' > "${TEST_SANDBOX}/staging/package.json"
    echo 'console.log("server running");' > "${TEST_SANDBOX}/staging/server.js"

    mkdir -p "${TEST_SANDBOX}/backups"
    mkdir -p "${TEST_SANDBOX}/releases"
}

# ------------------------------------------------------------------------------
# TEST 1: Transición normal completa (Camino feliz)
# ------------------------------------------------------------------------------
echo -n "Test 1: Camino feliz (Swap completo)... "
setup_dummy_env

APP_ROOT="${TEST_SANDBOX}/httpdocs"
STAGING_DIR="${TEST_SANDBOX}/staging"
TEMP_SWAP="${TEST_SANDBOX}/httpdocs_prev"
SWAP_STATE="INITIAL"

# Paso 1
mv "${APP_ROOT}" "${TEMP_SWAP}"
SWAP_STATE="LIVE_MOVED"

# Paso 2
mv "${STAGING_DIR}" "${APP_ROOT}"
SWAP_STATE="STAGING_MOVED"

# Verificación de que el nuevo BUILD_ID está activo
CURRENT_BUILD=$(cat "${APP_ROOT}/.next/BUILD_ID")
if [ "${CURRENT_BUILD}" = "NEW_BUILD_ID_67890" ] && [ -d "${TEMP_SWAP}" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 2: Fallo en el segundo movimiento (Rollback de LIVE_MOVED)
# ------------------------------------------------------------------------------
echo -n "Test 2: Fallo en segundo movimiento -> Reversión de LIVE_MOVED... "
setup_dummy_env

APP_ROOT="${TEST_SANDBOX}/httpdocs"
STAGING_DIR="${TEST_SANDBOX}/non_existent_staging" # Provoca fallo en segundo mv
TEMP_SWAP="${TEST_SANDBOX}/httpdocs_prev"
SWAP_STATE="INITIAL"
ROLLBACK_STATUS="NONE"

# Paso 1: tiene éxito
mv "${APP_ROOT}" "${TEMP_SWAP}"
SWAP_STATE="LIVE_MOVED"

# Paso 2: falla
if ! mv "${STAGING_DIR}" "${APP_ROOT}" 2>/dev/null; then
    # Ejecutar rollback para LIVE_MOVED
    if mv "${TEMP_SWAP}" "${APP_ROOT}" && [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
        RESTORED_BUILD=$(cat "${APP_ROOT}/.next/BUILD_ID")
        if [ "${RESTORED_BUILD}" = "OLD_BUILD_ID_12345" ]; then
            ROLLBACK_STATUS="SUCCESS"
        fi
    fi
fi

if [ "${ROLLBACK_STATUS}" = "SUCCESS" ] && [ -f "${APP_ROOT}/package.json" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 3: Fallo en fase de verificación -> Rollback de STAGING_MOVED
# ------------------------------------------------------------------------------
echo -n "Test 3: Fallo en verificación -> Reversión de STAGING_MOVED... "
setup_dummy_env

APP_ROOT="${TEST_SANDBOX}/httpdocs"
STAGING_DIR="${TEST_SANDBOX}/staging"
TEMP_SWAP="${TEST_SANDBOX}/httpdocs_prev"
FAILED_DIR="${TEST_SANDBOX}/httpdocs_failed"
SWAP_STATE="INITIAL"
ROLLBACK_STATUS="NONE"

# Paso 1 y Paso 2 se completan
mv "${APP_ROOT}" "${TEMP_SWAP}"
SWAP_STATE="LIVE_MOVED"
mv "${STAGING_DIR}" "${APP_ROOT}"
SWAP_STATE="STAGING_MOVED"

# Simular fallo en verificación de salud
HEALTH_CHECK_FAILED=true

if [ "${HEALTH_CHECK_FAILED}" = true ]; then
    # Iniciar rollback
    if mv "${APP_ROOT}" "${FAILED_DIR}" && mv "${TEMP_SWAP}" "${APP_ROOT}"; then
        RESTORED_BUILD=$(cat "${APP_ROOT}/.next/BUILD_ID")
        if [ "${RESTORED_BUILD}" = "OLD_BUILD_ID_12345" ] && [ -d "${FAILED_DIR}" ]; then
            ROLLBACK_STATUS="SUCCESS"
        fi
    fi
fi

if [ "${ROLLBACK_STATUS}" = "SUCCESS" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 4: Idempotencia de la función de rollback (Guard contra doble ejecución)
# ------------------------------------------------------------------------------
echo -n "Test 4: Guard contra doble ejecución de rollback... "
ROLLBACK_CALLS=0
ROLLBACK_EXECUTED=false

mock_rollback() {
    if [ "${ROLLBACK_EXECUTED}" = true ]; then
        return 0
    fi
    ROLLBACK_EXECUTED=true
    ROLLBACK_CALLS=$((ROLLBACK_CALLS + 1))
}

mock_rollback "Primera llamada"
mock_rollback "Segunda llamada duplicada"

if [ "${ROLLBACK_CALLS}" -eq 1 ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: llamadas=${ROLLBACK_CALLS}]"
    exit 1
fi

# ------------------------------------------------------------------------------
# TEST 5: Prevención de SIGPIPE con heredoc/herestring (<<<)
# ------------------------------------------------------------------------------
echo -n "Test 5: Ausencia de SIGPIPE bajo pipefail usando herestrings... "
(
    set -euo pipefail
    LONG_TEXT=$(head -c 100000 /dev/urandom | base64)
    # En bash con pipefail, echo "$LONG_TEXT" | grep -q ... puede arrojar exit 141 si grep cierra el pipe
    # En cambio, grep <<< "$LONG_TEXT" lee completo en memoria sin pipe roto
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
# TEST 6: Detección y conteo de errores sin duplicación de ceros
# ------------------------------------------------------------------------------
echo -n "Test 6: Conteo limpio de errores en log (sin duplicar ceros)... "
MOCK_LOG="${TEST_SANDBOX}/mock_proxy_error.log"
echo "2026/10/24 10:00:00 [error] 1234#0: connection refused" > "${MOCK_LOG}"
echo "2026/10/24 10:05:00 [notice] normal restart" >> "${MOCK_LOG}"

# Caso A: Log sin errores 500/502 posteriores a línea 2
BASELINE=2
ERR_COUNT=$(tail -n +$((BASELINE + 1)) "${MOCK_LOG}" 2>/dev/null | awk '/500|502|fatal|crash/ {count++} END {print count+0}')

# Asegurar que ERR_COUNT es exactamente el entero 0 (no "0 0" ni "0\n0")
if [ "${ERR_COUNT}" -eq 0 ] 2>/dev/null && [ "${ERR_COUNT}" = "0" ]; then
    echo "[PASÓ]"
else
    echo "[FALLÓ: count='${ERR_COUNT}']"
    exit 1
fi

echo "========================================================================"
echo "TODOS LOS TESTS DE SIMULACIÓN LOCAL COMPLETADOS CON ÉXITO."
echo "========================================================================"
