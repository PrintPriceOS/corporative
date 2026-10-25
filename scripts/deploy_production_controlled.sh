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
export GIT_BIN="${GIT_BIN:-git}"
export CURL_BIN="${CURL_BIN:-curl}"
export PM2_BIN="${PM2_BIN:-pm2}"
export REPO_URL="${REPO_URL:-https://github.com/PrintPriceOS/corporative.git}"
# Intérprete Python portable (compatible con entornos Linux de producción y shells de prueba)
if command -v python3 >/dev/null 2>&1 && python3 -V >/dev/null 2>&1; then
    PYTHON_BIN="${PYTHON_BIN:-python3}"
elif command -v python >/dev/null 2>&1 && python -V >/dev/null 2>&1; then
    PYTHON_BIN="${PYTHON_BIN:-python}"
else
    PYTHON_BIN="${PYTHON_BIN:-python3}"
fi
export PYTHON_BIN


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
export PM2_HOME="${PM2_HOME:-/var/www/vhosts/${DOMAIN}/.pm2}"

# Helper de ejecución controlada para comandos PM2: siempre bajo EXPECTED_USER y con PM2_HOME explícito
run_pm2_cmd() {
    local cmd="$1"
    local timeout_secs="${2:-}"
    local prefix=""
    if [ -n "${timeout_secs}" ] && [ "${timeout_secs}" -gt 0 ]; then
        if command -v timeout >/dev/null 2>&1; then
            prefix="timeout ${timeout_secs} "
        fi
    fi
    if [ "$(id -u)" -eq 0 ]; then
        su -s /bin/bash "${EXPECTED_USER}" -c "export PM2_HOME='${PM2_HOME}'; ${prefix}${cmd}"
    else
        PM2_HOME="${PM2_HOME}" eval "${prefix}${cmd}"
    fi
}

# ------------------------------------------------------------------------------
# VALIDACIÓN TEMPRANA DE CANDIDATO (CERO ESCRITURAS ANTE SHA INVÁLIDO)
# ------------------------------------------------------------------------------
validate_candidate_sha() {
    local sha="${1:-}"
    if [ -z "${sha}" ]; then
        echo "ERROR: CANDIDATE_SHA no especificado. Debe proporcionarse como argumento o variable de entorno." >&2
        return 1
    fi

    # Exigir exactamente 40 caracteres hexadecimales (SHA-1 de Git canónico)
    if [[ ! "${sha}" =~ ^[0-9a-fA-F]{40}$ ]]; then
        echo "ERROR: CANDIDATE_SHA '${sha}' no es un SHA-1 de Git válido (debe tener exactamente 40 caracteres hexadecimales)." >&2
        return 1
    fi

    # Comprobación de existencia del commit en el repositorio remoto antes de tocar producción.
    # 'git ls-remote' con un SHA como patrón no acredita la existencia de un commit arbitrario,
    # ya que ls-remote solo consulta referencias (branches/tags).
    # Excepción documentada: Se crea un directorio temporal aislado fuera de producción para
    # verificar mediante 'git fetch --depth 1' que el commit específico existe efectivamente
    # en el remoto antes de iniciar cualquier operación o escritura en el servidor.
    local verify_tmp
    verify_tmp="$(mktemp -d "${TMPDIR:-/tmp}/ppos_sha_verify_XXXXXX")"
    local fetch_ok=false

    echo "[INFO] Verificando existencia de commit ${sha} en repositorio remoto..."
    if ${GIT_BIN} -C "${verify_tmp}" init -q 2>/dev/null; then
        if ${GIT_BIN} -C "${verify_tmp}" fetch --depth 1 "${REPO_URL}" "${sha}" >/dev/null 2>&1; then
            fetch_ok=true
        fi
    fi

    rm -rf "${verify_tmp}"

    if [ "${fetch_ok}" != "true" ]; then
        echo "ERROR CRÍTICO: El commit '${sha}' no existe en el repositorio remoto o la consulta remota falló." >&2
        echo "No se declara validación remota y se aborta antes de tocar producción." >&2
        return 1
    fi

    echo "[OK] Commit candidato ${sha} verificado con éxito en el repositorio remoto."
    return 0
}

# ------------------------------------------------------------------------------
# RESOLUCIÓN ROBUSTA DE DOC_ROOT DESDE CONFIGURACIÓN DE NGINX
# Identifica bloque server del dominio, excluye locations y roots ajenos,
# soporta rutas entre comillas/sin comillas y detecta ausencia o ambigüedad.
# ------------------------------------------------------------------------------
resolve_nginx_doc_root() {
    local conf_path="$1"
    local target_domain="$2"

    if [ ! -f "${conf_path}" ]; then
        echo "ERROR: Archivo de configuración de Nginx no encontrado en '${conf_path}'." >&2
        return 1
    fi

    local resolved_root
    if ! resolved_root="$("${PYTHON_BIN}" -c '
import sys, re

conf_file = sys.argv[1]
target_domain = sys.argv[2].strip()

try:
    with open(conf_file, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
except Exception as e:
    sys.stderr.write(f"ERROR: No se pudo leer {conf_file}: {e}\n")
    sys.exit(1)

# Eliminar comentarios de linea
lines = []
for line in content.splitlines():
    line = re.sub(r"#.*$", "", line).strip()
    if line:
        lines.append(line)
text = " ".join(lines)

# Tokenizar directivas, bloques y delimitadores
tokens = re.findall(r"(\{|\}|;|[^\s\{\};]+)", text)

depth = 0
server_depth = -1
is_target_server = False
current_server_roots = []
server_roots = []

idx = 0
while idx < len(tokens):
    tok = tokens[idx]
    if tok == "{":
        depth += 1
        idx += 1
    elif tok == "}":
        if depth == server_depth:
            if is_target_server and current_server_roots:
                server_roots.extend(current_server_roots)
            server_depth = -1
            is_target_server = False
            current_server_roots = []
        depth -= 1
        idx += 1
    elif tok == "server" and idx + 1 < len(tokens) and tokens[idx+1] == "{":
        server_depth = depth + 1
        is_target_server = False
        current_server_roots = []
        idx += 1
    elif server_depth != -1 and depth == server_depth:
        # Nivel directo de directivas de bloque server (excluye bloques anidados como location)
        if tok == "server_name":
            idx += 1
            while idx < len(tokens) and tokens[idx] != ";":
                s_name = tokens[idx].strip("\"\x27")
                if s_name == target_domain or s_name == f"www.{target_domain}" or s_name == f"ipv4.{target_domain}":
                    is_target_server = True
                idx += 1
            if idx < len(tokens) and tokens[idx] == ";":
                idx += 1
        elif tok == "root":
            idx += 1
            path_tokens = []
            while idx < len(tokens) and tokens[idx] != ";":
                path_tokens.append(tokens[idx])
                idx += 1
            if path_tokens:
                raw_path = " ".join(path_tokens).strip("\"\x27")
                current_server_roots.append(raw_path)
            if idx < len(tokens) and tokens[idx] == ";":
                idx += 1
        else:
            idx += 1
    else:
        # Dentro de locations u otros bloques anidados: no registrar roots de nivel server
        idx += 1

unique_roots = sorted(list(set(server_roots)))
if not unique_roots:
    sys.stderr.write(f"ERROR: No se encontro directiva root valida a nivel de servidor para {target_domain} en {conf_file}.\n")
    sys.exit(1)

if len(unique_roots) > 1:
    sys.stderr.write(f"ERROR: Ambiguedad en directiva root para {target_domain}: multiples raices distintas encontradas ({unique_roots}).\n")
    sys.exit(1)

print(unique_roots[0])
sys.exit(0)
' "${conf_path}" "${target_domain}")"; then
        return 1
    fi

    echo "${resolved_root}"
    return 0
}

# ------------------------------------------------------------------------------
# DISPONIBILIDAD Y VERIFICACIÓN DE IDENTIDAD DEL PROCESO SUPERVISOR
# Comprobación compartida con plazo máximo (60s), intervalo (2s) y timeouts HTTP
# acotados al tiempo restante. Tolera transitorios durante recarga de PM2.
# ------------------------------------------------------------------------------
export LEGACY_HEALTH_LIMITATION_REGISTERED=false

# Reloj y espera sustituibles (permiten pruebas instantáneas sin esperas reales de 60s)
get_current_time_seconds() {
    if [ -n "${MOCK_TIME_FUNCTION:-}" ]; then
        ${MOCK_TIME_FUNCTION}
    else
        date +%s
    fi
}

poll_sleep() {
    local duration="${1:-2}"
    if [ -n "${MOCK_SLEEP_FUNCTION:-}" ]; then
        ${MOCK_SLEEP_FUNCTION} "${duration}"
    else
        sleep "${duration}"
    fi
}

_sleep_before_retry() {
    local interval="$1"
    local dl="$2"
    local current
    current="$(get_current_time_seconds)"
    local rem=$((dl - current))
    if [ "${rem}" -le 0 ]; then
        return 1
    fi
    local to_sleep="${interval}"
    if [ "${rem}" -lt "${to_sleep}" ]; then
        to_sleep="${rem}"
    fi
    poll_sleep "${to_sleep}"
    return 0
}

wait_for_service_availability() {
    local phase_label="${1:-post-reload}"
    local expected_release_id="${2:-}"
    local max_wait_seconds="${3:-${MAX_AVAILABILITY_WAIT_SECONDS:-60}}"
    local poll_interval="${4:-${AVAILABILITY_POLL_INTERVAL:-2}}"

    local start_time
    start_time="$(get_current_time_seconds)"
    local deadline=$((start_time + max_wait_seconds))

    local last_diagnostic="Inicio de comprobación de disponibilidad"
    local attempt=0

    while true; do
        attempt=$((attempt + 1))
        local now
        now="$(get_current_time_seconds)"
        local remaining=$((deadline - now))
        if [ "${remaining}" -le 0 ]; then
            break
        fi

        # 1. Comprobación del supervisor PM2 y proceso OS (limitado al tiempo restante)
        now="$(get_current_time_seconds)"
        remaining=$((deadline - now))
        if [ "${remaining}" -le 0 ]; then
            break
        fi

        local pm2_timeout=5
        if [ "${remaining}" -lt "${pm2_timeout}" ]; then
            pm2_timeout="${remaining}"
        fi
        if [ "${pm2_timeout}" -lt 1 ]; then
            pm2_timeout=1
        fi

        local user_pm2_status
        user_pm2_status="$(run_pm2_cmd "${PM2_BIN} jlist 2>/dev/null" "${pm2_timeout}" || true)"
        if [ -z "${user_pm2_status}" ]; then
            last_diagnostic="PM2 no responde bajo el usuario ${EXPECTED_USER}"
            _sleep_before_retry "${poll_interval}" "${deadline}" || break
            continue
        fi

        local process_info
        process_info="$(${PYTHON_BIN} -c '
import sys, json
try:
    apps = json.loads(sys.argv[1])
    target = [a for a in apps if a.get("name") == sys.argv[2]]
    if not target:
        print("NOT_FOUND")
    else:
        env = target[0].get("pm2_env", {})
        status = env.get("status", "unknown")
        cwd = env.get("pm_cwd", "")
        pid = target[0].get("pid", "none")
        print(f"{status}|{cwd}|{pid}")
except Exception as e:
    print(f"ERROR:{e}")
' "${user_pm2_status}" "${EXPECTED_PM2_APP}" 2>/dev/null || echo "NOT_FOUND")"

        if [ "${process_info}" = "NOT_FOUND" ] || [[ "${process_info}" == ERROR:* ]]; then
            last_diagnostic="Proceso '${EXPECTED_PM2_APP}' no encontrado o error en PM2 (${process_info})"
            _sleep_before_retry "${poll_interval}" "${deadline}" || break
            continue
        fi

        local app_status app_cwd app_pid
        IFS='|' read -r app_status app_cwd app_pid <<< "${process_info}"

        if [ "${app_status}" != "online" ]; then
            last_diagnostic="Proceso '${EXPECTED_PM2_APP}' no está online (estado: '${app_status}')"
            _sleep_before_retry "${poll_interval}" "${deadline}" || break
            continue
        fi

        if [ -n "${APP_ROOT:-}" ] && [ "$(realpath "${app_cwd}" 2>/dev/null || echo "${app_cwd}")" != "$(realpath "${APP_ROOT}" 2>/dev/null || echo "${APP_ROOT}")" ]; then
            last_diagnostic="cwd de '${EXPECTED_PM2_APP}' (${app_cwd}) no coincide con APP_ROOT (${APP_ROOT})"
            _sleep_before_retry "${poll_interval}" "${deadline}" || break
            continue
        fi

        # 2. Comprobación HTTP /api/health (recalculando tiempo restante inmediatamente antes)
        now="$(get_current_time_seconds)"
        remaining=$((deadline - now))
        if [ "${remaining}" -le 0 ]; then
            break
        fi

        local connect_timeout=2
        local max_time=5
        if [ "${remaining}" -lt "${connect_timeout}" ]; then
            connect_timeout="${remaining}"
        fi
        if [ "${connect_timeout}" -lt 1 ]; then
            connect_timeout=1
        fi
        if [ "${remaining}" -lt "${max_time}" ]; then
            max_time="${remaining}"
        fi
        if [ "${max_time}" -lt 1 ]; then
            max_time=1
        fi

        local health_url="http://127.0.0.1:${EXPECTED_PORT}/api/health"
        local http_response
        http_response="$(${CURL_BIN} -s -S -w $'\n%{http_code}' --max-time "${max_time}" --connect-timeout "${connect_timeout}" "${health_url}" 2>/dev/null || echo -e '\n000')"

        local http_code
        http_code="$(tail -n 1 <<< "${http_response}")"
        local http_body
        http_body="$(sed '$d' <<< "${http_response}")"

        if [ "${phase_label}" != "post-rollback" ]; then
            # Modo Candidato: exige HTTP 200, JSON válido e identidad esperada
            if [ "${http_code}" != "200" ]; then
                last_diagnostic="Endpoint /api/health devolvió código HTTP: ${http_code} (esperado 200)"
                _sleep_before_retry "${poll_interval}" "${deadline}" || break
                continue
            fi

            local parsed_json
            parsed_json="$(${PYTHON_BIN} -c '
import sys, json
try:
    data = json.loads(sys.argv[1])
    if not isinstance(data, dict):
        print("INVALID")
    else:
        rel = str(data.get("release_id", ""))
        print(f"VALID|{rel}")
except Exception:
    print("INVALID")
' "${http_body}" 2>/dev/null || echo "INVALID")"

            if [[ "${parsed_json}" != "VALID|"* ]]; then
                last_diagnostic="Respuesta de /api/health no es JSON válido: ${http_body}"
                _sleep_before_retry "${poll_interval}" "${deadline}" || break
                continue
            fi

            local served_release_id="${parsed_json#VALID|}"
            if [ -n "${expected_release_id}" ] && [ "${expected_release_id}" != "UNKNOWN" ]; then
                if [ "${served_release_id}" != "${expected_release_id}" ]; then
                    last_diagnostic="Identidad de release servida en memoria viva ('${served_release_id}') no coincide con la esperada ('${expected_release_id}')"
                    _sleep_before_retry "${poll_interval}" "${deadline}" || break
                    continue
                fi
            fi

            # No declarar éxito si el plazo venció durante las consultas
            now="$(get_current_time_seconds)"
            if [ "${now}" -gt "${deadline}" ]; then
                break
            fi

            if [ -n "${expected_release_id}" ] && [ "${expected_release_id}" != "UNKNOWN" ]; then
                echo "[OK] Identidad de release en memoria viva confirmada (${phase_label}): '${served_release_id}' coincide con la esperada tras ${attempt} intento(s)."
            else
                echo "[OK] Identidad de release en memoria viva consultada (${phase_label}): '${served_release_id}' tras ${attempt} intento(s)."
            fi

            echo "[OK] Identidad del proceso confirmada (${phase_label}): PID=${app_pid}, status=${app_status}, cwd=${app_cwd}, user=${EXPECTED_USER}."
            return 0
        else
            # Modo Rollback:
            # 1. Comprobar BUILD_ID restaurado en disco
            local restored_build="UNKNOWN"
            if [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
                restored_build="$(cat "${APP_ROOT}/.next/BUILD_ID")"
            fi
            if [ -n "${expected_release_id}" ] && [ "${expected_release_id}" != "UNKNOWN" ] && [ "${restored_build}" != "${expected_release_id}" ]; then
                echo "[DESASTRE OPERATIVO: BUILD_ID EN DISCO DIFIERE]" >&2
                echo "  BUILD_ID en disco: ${restored_build} (esperado: ${expected_release_id})" >&2
                return 2
            fi

            # 2. Comprobar respuesta de la página principal (recalculando tiempo restante inmediatamente antes)
            now="$(get_current_time_seconds)"
            remaining=$((deadline - now))
            if [ "${remaining}" -le 0 ]; then
                break
            fi

            connect_timeout=2
            max_time=5
            if [ "${remaining}" -lt "${connect_timeout}" ]; then
                connect_timeout="${remaining}"
            fi
            if [ "${connect_timeout}" -lt 1 ]; then
                connect_timeout=1
            fi
            if [ "${remaining}" -lt "${max_time}" ]; then
                max_time="${remaining}"
            fi
            if [ "${max_time}" -lt 1 ]; then
                max_time=1
            fi

            local home_code
            home_code="$(${CURL_BIN} -s -S -o /dev/null -w "%{http_code}" --max-time "${max_time}" --connect-timeout "${connect_timeout}" "http://127.0.0.1:${EXPECTED_PORT}/" 2>/dev/null || echo "000")"
            if [ "${home_code}" != "200" ]; then
                last_diagnostic="Página principal HTTP devolvió: ${home_code} (esperado 200)"
                _sleep_before_retry "${poll_interval}" "${deadline}" || break
                continue
            fi

            # 3. Comprobar manifest en memoria si BUILD_ID es conocido (recalculando tiempo restante inmediatamente antes)
            if [ "${restored_build}" != "UNKNOWN" ]; then
                now="$(get_current_time_seconds)"
                remaining=$((deadline - now))
                if [ "${remaining}" -le 0 ]; then
                    break
                fi

                connect_timeout=2
                max_time=5
                if [ "${remaining}" -lt "${connect_timeout}" ]; then
                    connect_timeout="${remaining}"
                fi
                if [ "${connect_timeout}" -lt 1 ]; then
                    connect_timeout=1
                fi
                if [ "${remaining}" -lt "${max_time}" ]; then
                    max_time="${remaining}"
                fi
                if [ "${max_time}" -lt 1 ]; then
                    max_time=1
                fi

                local manifest_code
                manifest_code="$(${CURL_BIN} -s -S -o /dev/null -w "%{http_code}" --max-time "${max_time}" --connect-timeout "${connect_timeout}" "http://127.0.0.1:${EXPECTED_PORT}/_next/static/${restored_build}/_buildManifest.js" 2>/dev/null || echo "000")"
                if [ "${manifest_code}" != "200" ]; then
                    last_diagnostic="Manifest _buildManifest.js devolvió: ${manifest_code} (esperado 200)"
                    _sleep_before_retry "${poll_interval}" "${deadline}" || break
                    continue
                fi
            fi

            # 4. Comprobación de /api/health según preflight
            if [ "${http_code}" = "404" ]; then
                if [ "${LEGACY_HEALTH_LIMITATION_REGISTERED:-false}" = "true" ]; then
                    # No declarar éxito si el plazo venció durante las consultas
                    now="$(get_current_time_seconds)"
                    if [ "${now}" -gt "${deadline}" ]; then
                        break
                    fi

                    echo "[LÍMITE DE VERIFICACIÓN DECLARADO] Endpoint /api/health devolvió HTTP 404 (${phase_label})."
                    echo "  Versión anterior carece de introspección /api/health (limitación previamente acreditada en preflight)."
                    echo "  BUILD_ID restituido en disco: ${restored_build}."
                    echo "  Página principal local: 200 OK."
                    echo "[OK] Proceso restaurado y verificado (${phase_label}): PID=${app_pid}, status=${app_status}, cwd=${app_cwd}, user=${EXPECTED_USER}."
                    return 0
                else
                    last_diagnostic="Endpoint /api/health devolvió 404 pero la limitación heredada NO fue registrada en preflight"
                    _sleep_before_retry "${poll_interval}" "${deadline}" || break
                    continue
                fi
            elif [ "${http_code}" = "200" ]; then
                local parsed_json
                parsed_json="$(${PYTHON_BIN} -c '
import sys, json
try:
    data = json.loads(sys.argv[1])
    if not isinstance(data, dict):
        print("INVALID")
    else:
        rel = str(data.get("release_id", ""))
        print(f"VALID|{rel}")
except Exception:
    print("INVALID")
' "${http_body}" 2>/dev/null || echo "INVALID")"

                if [[ "${parsed_json}" != "VALID|"* ]]; then
                    last_diagnostic="Cuerpo de /api/health en rollback no es JSON válido: ${http_body}"
                    _sleep_before_retry "${poll_interval}" "${deadline}" || break
                    continue
                fi

                local served_release_id="${parsed_json#VALID|}"
                if [ -n "${expected_release_id}" ] && [ "${expected_release_id}" != "UNKNOWN" ]; then
                    if [ "${served_release_id}" != "${expected_release_id}" ]; then
                        last_diagnostic="Identidad de release servida en memoria viva ('${served_release_id}') difiere de la esperada ('${expected_release_id}')"
                        _sleep_before_retry "${poll_interval}" "${deadline}" || break
                        continue
                    fi
                fi

                # No declarar éxito si el plazo venció durante las consultas
                now="$(get_current_time_seconds)"
                if [ "${now}" -gt "${deadline}" ]; then
                    break
                fi

                echo "[OK] Identidad de release en memoria viva confirmada (${phase_label}): '${served_release_id}' coincide con la esperada tras ${attempt} intento(s)."
                echo "[OK] Proceso restaurado y verificado (${phase_label}): PID=${app_pid}, status=${app_status}, cwd=${app_cwd}, user=${EXPECTED_USER}."
                return 0
            else
                last_diagnostic="Código HTTP en /api/health durante rollback: ${http_code}"
                _sleep_before_retry "${poll_interval}" "${deadline}" || break
                continue
            fi
        fi
    done

    echo "ERROR CRÍTICO: Plazo de disponibilidad agotado (${max_wait_seconds}s) durante ${phase_label} tras ${attempt} intento(s)." >&2
    echo "  Último estado observado: ${last_diagnostic}." >&2
    echo "ERROR CRÍTICO: ${last_diagnostic} durante ${phase_label}." >&2
    if [ "${phase_label}" = "post-rollback" ]; then
        return 2
    fi
    return 1
}

verify_process_identity() {
    local phase_label="${1:-verificación}"
    local expected_release_id="${2:-}"

    if [ "${phase_label}" = "preflight" ]; then
        local user_pm2_status
        user_pm2_status="$(run_pm2_cmd "${PM2_BIN} jlist 2>/dev/null" || true)"
        if [ -z "${user_pm2_status}" ]; then
            echo "ERROR CRÍTICO: PM2 no responde bajo el usuario ${EXPECTED_USER} durante preflight." >&2
            return 1
        fi

        local process_info
        process_info="$(${PYTHON_BIN} -c '
import sys, json
try:
    apps = json.loads(sys.argv[1])
    target = [a for a in apps if a.get("name") == sys.argv[2]]
    if not target:
        print("NOT_FOUND")
    else:
        env = target[0].get("pm2_env", {})
        status = env.get("status", "unknown")
        cwd = env.get("pm_cwd", "")
        pid = target[0].get("pid", "none")
        print(f"{status}|{cwd}|{pid}")
except Exception as e:
    print(f"ERROR:{e}")
' "${user_pm2_status}" "${EXPECTED_PM2_APP}" 2>/dev/null || echo "NOT_FOUND")"

        if [ "${process_info}" = "NOT_FOUND" ] || [[ "${process_info}" == ERROR:* ]]; then
            echo "ERROR CRÍTICO: Proceso '${EXPECTED_PM2_APP}' no encontrado o error en PM2 durante preflight." >&2
            return 1
        fi

        local app_status app_cwd app_pid
        IFS='|' read -r app_status app_cwd app_pid <<< "${process_info}"

        if [ "${app_status}" != "online" ]; then
            echo "ERROR CRÍTICO: Proceso '${EXPECTED_PM2_APP}' no está online (estado: '${app_status}') durante preflight." >&2
            return 1
        fi

        if [ -n "${APP_ROOT:-}" ] && [ "$(realpath "${app_cwd}" 2>/dev/null || echo "${app_cwd}")" != "$(realpath "${APP_ROOT}" 2>/dev/null || echo "${APP_ROOT}")" ]; then
            echo "ERROR CRÍTICO: cwd de '${EXPECTED_PM2_APP}' (${app_cwd}) no coincide con APP_ROOT (${APP_ROOT}) durante preflight." >&2
            return 1
        fi

        local health_url="http://127.0.0.1:${EXPECTED_PORT}/api/health"
        local http_response
        http_response="$(${CURL_BIN} -s -S -w $'\n%{http_code}' --max-time 5 --connect-timeout 2 "${health_url}" 2>/dev/null || echo -e '\n000')"

        local http_code
        http_code="$(tail -n 1 <<< "${http_response}")"
        local http_body
        http_body="$(sed '$d' <<< "${http_response}")"

        if [ "${http_code}" = "404" ]; then
            export LEGACY_HEALTH_LIMITATION_REGISTERED=true
            echo "[LÍMITE DE VERIFICACIÓN DECLARADO] Endpoint /api/health devolvió HTTP 404 (preflight)."
            echo "  Versión anterior en ejecución carece de introspección de release capturada al arrancar."
            echo "  Límite: La versión cargada en memoria viva no puede ser auditada por HTTP para este release previo."
            echo "  Identidad circunscrita a supervisor PM2 (PID=${app_pid}), usuario (${EXPECTED_USER}) y cwd (${app_cwd})."
            echo "[OK] Identidad del proceso confirmada (preflight): PID=${app_pid}, status=${app_status}, cwd=${app_cwd}, user=${EXPECTED_USER}."
            return 0
        elif [ "${http_code}" = "200" ]; then
            export LEGACY_HEALTH_LIMITATION_REGISTERED=false
            local served_release_id
            served_release_id="$(${PYTHON_BIN} -c '
import sys, json
try:
    data = json.loads(sys.argv[1])
    print(data.get("release_id", "unknown"))
except Exception:
    print("unknown")
' "${http_body}" 2>/dev/null || echo "unknown")"
            echo "[OK] Identidad de release en memoria viva consultada (preflight): '${served_release_id}'."
            echo "[OK] Identidad del proceso confirmada (preflight): PID=${app_pid}, status=${app_status}, cwd=${app_cwd}, user=${EXPECTED_USER}."
            return 0
        else
            echo "ERROR CRÍTICO: Fallo al consultar endpoint de salud por HTTP (código: ${http_code}) durante preflight." >&2
            return 1
        fi
    fi

    # Para fases posteriores (post-reload, post-rollback, o pruebas)
    wait_for_service_availability "${phase_label}" "${expected_release_id}"
}

# ------------------------------------------------------------------------------
# MÁQUINA DE ESTADOS Y CONTROL DE ROLLBACK
# Estados: INITIAL -> LIVE_MOVED -> STAGING_MOVED -> VERIFYING -> ACTIVE
#          |                |               |
#          v                v               v
#     ROLLBACK_DONE   ROLLBACK_DONE   ROLLBACK_DONE (o ROLLBACK_FAILED)
# ------------------------------------------------------------------------------
export SWAP_STATE="INITIAL"
ROLLBACK_EXECUTED=false
ORIGINAL_EXIT_CODE=""

# Función común de verificación de recuperación del servicio (en disco y en memoria viva)
verify_service_recovery() {
    local expected_build_id="$1"

    echo "[ROLLBACK: ${SWAP_STATE}] Recargando supervisor PM2 para el usuario ${EXPECTED_USER}..."
    if ! run_pm2_cmd "RELEASE_ID=${expected_build_id} PORT=${EXPECTED_PORT} ${PM2_BIN} reload ${EXPECTED_PM2_APP} --update-env"; then
        echo "[DESASTRE OPERATIVO] Falló la recarga de PM2 para ${EXPECTED_PM2_APP}." >&2
        SWAP_STATE="ROLLBACK_FAILED"
        return 2
    fi

    # Comprobar disponibilidad e identidad del proceso restaurado con ventana de tolerancia
    if ! wait_for_service_availability "post-rollback" "${expected_build_id}"; then
        echo "[DESASTRE OPERATIVO] Falló la verificación de identidad del proceso tras recarga en rollback." >&2
        SWAP_STATE="ROLLBACK_FAILED"
        return 2
    fi

    echo "[ROLLBACK EXITOSO Y VERIFICADO]"
    echo "  BUILD_ID restituido en disco: ${expected_build_id}"
    echo "  Servicio recuperado y operativo en memoria viva."
    SWAP_STATE="ROLLBACK_DONE"
    return 0
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

        STAGING_MOVED | VERIFYING | ORIGIN_FAILED | PUBLIC_FAILED)
            local prev_state="${SWAP_STATE}"
            export SWAP_STATE="ROLLING_BACK"
            echo "[ROLLBACK: ${prev_state}] Apartando candidato fallido a ${VHOST_DIR}/httpdocs_failed_${TIMESTAMP}..."
            rm -rf "${VHOST_DIR}/httpdocs_failed_${TIMESTAMP}"
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
    fi

    local final_code=0
    if [ -n "${ORIGINAL_EXIT_CODE:-}" ] && [ "${ORIGINAL_EXIT_CODE}" -ne 0 ]; then
        final_code="${ORIGINAL_EXIT_CODE}"
    elif [ "${exit_code}" -ne 0 ]; then
        final_code="${exit_code}"
    fi

    if [ "${final_code}" -ne 0 ]; then
        if [ "${SWAP_STATE}" != "ROLLBACK_DONE" ] && [ "${SWAP_STATE}" != "ROLLBACK_FAILED" ]; then
            execute_rollback "Salida anormal con código ${final_code}"
        fi
        if [ "${SWAP_STATE}" = "ROLLBACK_FAILED" ]; then
            echo "========================================================================"
            echo "[ALERTA CRÍTICA: DESASTRE EN RESTAURACIÓN]"
            echo "La restauración de producción falló. Se requiere intervención manual."
            echo "========================================================================"
            exit 2
        fi
        exit "${final_code}"
    fi
}

# ------------------------------------------------------------------------------
# RESOLUCIÓN DE RECURSOS VINCULADOS A /products/budget
# ------------------------------------------------------------------------------
resolve_budget_bundles() {
    local target_root="${1:-${APP_ROOT}}"
    local resolved_target="${target_root}"
    if command -v cygpath >/dev/null 2>&1; then
        resolved_target="$(cygpath -w "${target_root}" 2>/dev/null || echo "${target_root}")"
    fi

    local output
    output="$("${PYTHON_BIN}" -c '
import sys, os, glob, re

app_root = sys.argv[1]
budget_dir = os.path.join(app_root, ".next", "server", "app", "products", "budget")
resolved_files = set()

# 1. Archivos directos en el directorio de servidor de la ruta
if os.path.isdir(budget_dir):
    for f in glob.glob(os.path.join(budget_dir, "*.js")):
        if os.path.isfile(f):
            resolved_files.add(f)

# 2. Chunks SSR asociados nominalmente a la ruta por el compilador
server_chunks_dir = os.path.join(app_root, ".next", "server", "chunks")
if os.path.isdir(server_chunks_dir):
    for f in glob.glob(os.path.join(server_chunks_dir, "**", "*products_budget*.js"), recursive=True):
        if os.path.isfile(f):
            resolved_files.add(f)

# 3. Chunks de cliente y SSR declarados en el manifest de referencias cliente de la ruta
manifest_candidates = [
    os.path.join(budget_dir, "page_client-reference-manifest.js"),
    os.path.join(budget_dir, "page_client-reference-manifest.json"),
]
for mf in manifest_candidates:
    if os.path.isfile(mf):
        try:
            with open(mf, "r", encoding="utf-8", errors="ignore") as fh:
                content = fh.read()
            rel_paths = re.findall(r"[\x27\x22]((?:server/chunks|static/chunks|/next/static/chunks|/_next/static/chunks)/[^\x27\x22]+\.js)[\x27\x22]", content)
            for rp in rel_paths:
                clean_rp = re.sub(r"^/(_next|next)/", "", rp).lstrip("/\\")
                full_path = os.path.join(app_root, ".next", *clean_rp.split("/"))
                if os.path.isfile(full_path):
                    resolved_files.add(full_path)
        except Exception:
            pass

for f in sorted(resolved_files):
    print(f.replace("\\", "/"))
' "${resolved_target}" 2>/dev/null || find "${target_root}/.next/server/app/products/budget" -type f -name "*.js" 2>/dev/null || true)"

    if [ -n "${output}" ] && command -v cygpath >/dev/null 2>&1; then
        while IFS= read -r line; do
            line="$(echo "${line}" | tr -d '\r')"
            [ -n "${line}" ] && cygpath -u "${line}" 2>/dev/null || echo "${line}"
        done <<< "${output}"
    else
        echo "${output}" | tr -d '\r'
    fi
}

# ------------------------------------------------------------------------------
# CLASIFICACIÓN OPERATIVA DEL ESTADO FINAL DE RELEASE
# ------------------------------------------------------------------------------
classify_release_state() {
    local origin_status_ok="$1"
    local origin_routes_ok="$2"
    local public_status_ok="$3"
    local public_content_ok="$4"
    local cache_stale_evidence="$5"

    # 1. El origen local DEBE ser 100% correcto (HTTP 200, manifest 200, identidad y rutas correctas)
    if [ "${origin_status_ok}" != "true" ] || [ "${origin_routes_ok}" != "true" ]; then
        echo "ORIGIN_FAILED"
        return 1
    fi

    # 2. El acceso público debe ser funcional (HTTP 200 en rutas públicas).
    # Un HTTP 500/502 o timeout en acceso público NO es caché antigua: es fallo de acceso público.
    if [ "${public_status_ok}" != "true" ]; then
        echo "PUBLIC_FAILED"
        return 1
    fi

    # 3. Origen correcto + público correcto y actualizado => ACTIVE
    if [ "${public_content_ok}" = "true" ] && [ "${cache_stale_evidence}" != "true" ]; then
        echo "ACTIVE"
        return 0
    fi

    # 4. Origen correcto + público HTTP 200 + evidencia positiva de versión antigua => PENDING_CACHE_INVALIDATION
    if [ "${cache_stale_evidence}" = "true" ]; then
        echo "PENDING_CACHE_INVALIDATION"
        return 0
    fi

    # 5. Contenido público incorrecto sin evidencia de versión antigua => PUBLIC_FAILED
    echo "PUBLIC_FAILED"
    return 1
}

run_deployment() {
    # ==============================================================================
    # FASE 0: PREFLIGHT Y ACREDITACIÓN EMPÍRICA DE RUTAS Y SUPERVISOR
    # ==============================================================================
    echo "[FASE 0] Verificando precondiciones y configuración observada en Plesk..."

    # Actualizar CANDIDATE_SHA si se pasa como parámetro directo a la función
    export CANDIDATE_SHA="${1:-${CANDIDATE_SHA:-}}"

    # 0.0. Validar CANDIDATE_SHA antes de cualquier escritura en disco
    if ! validate_candidate_sha "${CANDIDATE_SHA}"; then
        echo "ERROR CRÍTICO: CANDIDATE_SHA inválido o no verificado antes de iniciar operaciones de escritura. ABORTANDO." >&2
        exit 1
    fi

    # 0.1. Verificar que el script se ejecute con privilegios administrativos (excepto simulación)
    if [ "$(id -u)" -ne 0 ] && [ "${SIMULATION_MODE:-false}" != "true" ]; then
        echo "ERROR: Este procedimiento requiere privilegios de root para gestionar permisos y servicios de Plesk." >&2
        exit 1
    fi

    # 0.2. Validar existencia del vhost de printprice.pro
    if [ ! -d "${VHOST_DIR}" ]; then
        echo "ERROR CRÍTICO: No existe el directorio del vhost en ${VHOST_DIR}. ABORTANDO." >&2
        exit 1
    fi

    # 0.3. Acreditar Document Root desde la configuración activa de Nginx
    DOMAIN_NGINX_CONF="${DOMAIN_NGINX_CONF:-/var/www/vhosts/system/${DOMAIN}/conf/nginx.conf}"
    if [ ! -f "${DOMAIN_NGINX_CONF}" ]; then
        echo "ERROR CRÍTICO: Configuración de Nginx no encontrada en ${DOMAIN_NGINX_CONF}. ABORTANDO." >&2
        exit 1
    fi

    # Extraer directiva root exclusiva del bloque del dominio (sin locations, soporta comillas, detecta ambigüedad)
    if ! DOC_ROOT="$(resolve_nginx_doc_root "${DOMAIN_NGINX_CONF}" "${DOMAIN}")"; then
        echo "ERROR CRÍTICO: No se pudo resolver DOC_ROOT de forma unívoca desde ${DOMAIN_NGINX_CONF}. ABORTANDO." >&2
        exit 1
    fi

    if [ ! -d "${DOC_ROOT}" ]; then
        echo "ERROR CRÍTICO: El directorio DOC_ROOT resuelto (${DOC_ROOT}) no existe en el sistema de archivos. ABORTANDO." >&2
        exit 1
    fi
    echo "[OK] DOC_ROOT acreditado: ${DOC_ROOT}"

    # 0.4. Acreditar proxy_pass en vhost_nginx.conf
    VHOST_CUSTOM_CONF="${VHOST_CUSTOM_CONF:-/var/www/vhosts/system/${DOMAIN}/conf/vhost_nginx.conf}"
    if [ ! -f "${VHOST_CUSTOM_CONF}" ]; then
        echo "ERROR CRÍTICO: No existe ${VHOST_CUSTOM_CONF}. ABORTANDO." >&2
        exit 1
    fi

    if ! grep -q "proxy_pass http://localhost:${EXPECTED_PORT}" "${VHOST_CUSTOM_CONF}"; then
        echo "ERROR CRÍTICO: ${VHOST_CUSTOM_CONF} no contiene proxy_pass a localhost:${EXPECTED_PORT}. ABORTANDO." >&2
        exit 1
    fi
    echo "[OK] Nginx proxy_pass a localhost:${EXPECTED_PORT} acreditado."

    # 0.5. Acreditar supervisor PM2 e identidad del proceso bajo el usuario de la suscripción
    USER_PM2_STATUS="$(run_pm2_cmd "${PM2_BIN} jlist 2>/dev/null" || true)"
    if [ -z "${USER_PM2_STATUS}" ]; then
        echo "ERROR CRÍTICO: PM2 no responde bajo el usuario ${EXPECTED_USER}. ABORTANDO." >&2
        exit 1
    fi

    PM2_APP_STATUS="$(${PYTHON_BIN} -c '
import sys, json
try:
    apps = json.loads(sys.argv[1])
    target = [a for a in apps if a.get("name") == sys.argv[2]]
    if target and target[0].get("pm2_env", {}).get("status") == "online":
        print(target[0]["pm2_env"]["pm_cwd"])
    else:
        print("")
except Exception:
    print("")
' "${USER_PM2_STATUS}" "${EXPECTED_PM2_APP}")"

    if [ -z "${PM2_APP_STATUS}" ]; then
        echo "ERROR CRÍTICO: Proceso '${EXPECTED_PM2_APP}' no está online en PM2 para ${EXPECTED_USER}. ABORTANDO." >&2
        exit 1
    fi

    export APP_ROOT="${PM2_APP_STATUS}"
    if ! verify_process_identity "preflight"; then
        echo "ERROR CRÍTICO: Falló la verificación de identidad del proceso en preflight. ABORTANDO." >&2
        exit 1
    fi
    echo "[OK] Supervisor PM2 acreditado: aplicación '${EXPECTED_PM2_APP}' online en APP_ROOT: ${APP_ROOT}"

    # 0.6. Validar que APP_ROOT y DOC_ROOT coinciden
    if [ "$(realpath "${APP_ROOT}")" != "$(realpath "${DOC_ROOT}")" ]; then
        echo "ERROR CRÍTICO: APP_ROOT (${APP_ROOT}) y DOC_ROOT (${DOC_ROOT}) difieren. ABORTANDO." >&2
        exit 1
    fi

    if [ ! -f "${APP_ROOT}/package.json" ] || [ ! -f "${APP_ROOT}/server.js" ]; then
        echo "ERROR CRÍTICO: Archivos críticos (package.json / server.js) ausentes en ${APP_ROOT}. ABORTANDO." >&2
        exit 1
    fi

    # 0.7. Validar versión de Node.js instalada
    if [ "${SIMULATION_MODE:-false}" = "true" ]; then
        CURRENT_NODE_VER="v20.0.0-mock"
    else
        CURRENT_NODE_VER="$("${EXPECTED_NODE_BIN}" -v || echo 'NONE')"
        if [ -z "${CURRENT_NODE_VER}" ] || [ "${CURRENT_NODE_VER}" = "NONE" ]; then
            echo "ERROR CRÍTICO: Node binario (${EXPECTED_NODE_BIN}) no ejecutable. ABORTANDO." >&2
            exit 1
        fi
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
    if [ "${SIMULATION_MODE:-false}" = "true" ]; then
        FREE_KB=10485760
    else
        FREE_KB="$(df -k "${VHOST_DIR}" | awk 'NR==2 {print $4}')"
    fi
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
    if [ "${SIMULATION_MODE:-false}" = "true" ]; then
        DEV_APP=1
        DEV_RELEASES=1
    else
        DEV_APP="$(stat -c %d "${APP_ROOT}")"
        DEV_RELEASES="$(stat -c %d "${RELEASES_DIR}")"
    fi
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

        LIVE_PUBLIC_ETAG="$(${CURL_BIN} -s -S -I --max-time 10 "https://${DOMAIN}/" 2>/dev/null | grep -i "^etag:" | awk '{print $2}' | tr -d '\r\n' || echo '')"
    echo "[OK] ETag público previo registrado: ${LIVE_PUBLIC_ETAG:-NINGUNO}"
    LIVE_BUILD_ID="UNKNOWN"
    # Consultar si el proceso vivo expone release_id por HTTP
    LIVE_HTTP_RELEASE="$(${CURL_BIN} -s -S --max-time 3 "http://127.0.0.1:${EXPECTED_PORT}/api/health" 2>/dev/null | ${PYTHON_BIN} -c '
import sys, json
try:
    print(json.loads(sys.stdin.read()).get("release_id", ""))
except Exception:
    print("")
' 2>/dev/null || echo "")"

    if [ -n "${LIVE_HTTP_RELEASE}" ] && [ "${LIVE_HTTP_RELEASE}" != "unknown" ]; then
        LIVE_BUILD_ID="${LIVE_HTTP_RELEASE}"
    elif [ -f "${APP_ROOT}/.next/BUILD_ID" ]; then
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
    MIN_BACKUP_FILES=50
    if [ "${SIMULATION_MODE:-false}" = "true" ]; then
        MIN_BACKUP_FILES=2
    fi
    if [ "${BACKUP_FILES_COUNT}" -lt "${MIN_BACKUP_FILES}" ] || [ ! -f "${BACKUP_DIR}/package.json" ]; then
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

    if [ "${SIMULATION_MODE:-false}" = "true" ]; then
        echo "[SIMULATION] Preparando artefacto candidato en staging con dobles de prueba..."
        mkdir -p "${STAGING_DIR}/.next/server/app/products/budget"
        echo "${MOCK_CANDIDATE_BUILD_ID:-CANDIDATE_BUILD_ID_SIM}" > "${STAGING_DIR}/.next/BUILD_ID"
        echo '{"name": "mock-web", "version": "0.1.0"}' > "${STAGING_DIR}/package.json"
        if [ "${MOCK_CANDIDATE_NO_SERVER_JS:-false}" != "true" ]; then
            echo 'console.log("candidate server");' > "${STAGING_DIR}/server.js"
        fi
        echo 'CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS DRUCKANGEBOTE IN SEKUNDEN BERECHNEN' > "${STAGING_DIR}/.next/server/app/products/budget/page.js"
        echo '{"name": "mock-web"}' > "${STAGING_DIR}/package-lock.json"
        CANDIDATE_BUILD_ID="${MOCK_CANDIDATE_BUILD_ID:-CANDIDATE_BUILD_ID_SIM}"
        CURRENT_CHECKOUT="${CANDIDATE_SHA}"
        PARENT_SHA="parent_sha_sim"
    else
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
    fi

    # Generar manifiesto formal del release candidato vinculando versión de app y del script
    cat <<EOF > "${STAGING_DIR}/RELEASE_MANIFEST.json"
{
  "application_candidate_sha": "${CURRENT_CHECKOUT}",
  "application_parent_sha": "${PARENT_SHA}",
  "deployment_script_sha": "${SCRIPT_VERSION}",
  "build_id": "${CANDIDATE_BUILD_ID}",
  "generated_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "package_lock_sha256": "$(sha256sum "${STAGING_DIR}/package-lock.json" | awk '{print $1}')",
  "routes_count": 45,
  "supervisor": "PM2",
  "app_name": "${EXPECTED_PM2_APP}",
  "port": ${EXPECTED_PORT}
}
EOF
    cp "${STAGING_DIR}/RELEASE_MANIFEST.json" "${BACKUP_META_DIR}/candidate_manifest_${TIMESTAMP}.json"

    if [ "${SIMULATION_MODE:-false}" != "true" ]; then
        chown -R "${EXPECTED_USER}:${EXPECTED_GROUP}" "${STAGING_DIR}"
    fi
    echo "[OK] Artefacto compilado con BUILD_ID: ${CANDIDATE_BUILD_ID} y manifiesto generado."

    # 3.2. Comprobar que el candidato construido contiene el archivo de entrada server.js ANTES del intercambio
    if [ ! -f "${STAGING_DIR}/server.js" ]; then
        echo "ERROR CRÍTICO: El candidato construido carece de 'server.js' en ${STAGING_DIR}. ABORTANDO ANTES DEL INTERCAMBIO." >&2
        exit 1
    fi
    echo "[OK] Punto de entrada server.js acreditado en el candidato construido (${STAGING_DIR}/server.js)."

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
    # FASE 5: RECARGA DEL PROCESO PM2 ACREDITADO Y VERIFICACIÓN DE IDENTIDAD
    # ==============================================================================
    echo "[FASE 5] Notificando recarga al proceso PM2 '${EXPECTED_PM2_APP}'..."

    if ! run_pm2_cmd "RELEASE_ID=${CANDIDATE_BUILD_ID} PORT=${EXPECTED_PORT} ${PM2_BIN} reload ${EXPECTED_PM2_APP} --update-env"; then
        echo "ERROR CRÍTICO: Falló la recarga de PM2 para ${EXPECTED_PM2_APP}." >&2
        execute_rollback "Fallo en comando pm2 reload"
        exit 1
    fi
    SWAP_STATE="VERIFYING"

    # Verificar identidad del proceso tras la recarga (PM2 + versión en memoria viva vía HTTP)
    if ! verify_process_identity "post-reload" "${CANDIDATE_BUILD_ID}"; then
        echo "ERROR CRÍTICO: Falló la verificación de identidad del proceso tras recarga. Invocando rollback..." >&2
        execute_rollback "Fallo de identidad del proceso tras recarga"
        exit 1
    fi

    # ==============================================================================
    # FASE 6: VALIDACIÓN MULTICAPA CON TIMEOUTS Y SIN PIPELINES SIGPIPE
    # ==============================================================================
    echo "[FASE 6] Ejecutando validación multicapa post-activación..."

    ORIGIN_STATUS_OK=false
    ORIGIN_ROUTES_OK=false
    PUBLIC_STATUS_OK=true
    PUBLIC_CONTENT_OK=true
    CACHE_STALE_EVIDENCE=false

    # 6.1. Comprobación de salud en el proceso en memoria viva (http://127.0.0.1:3010)
    for attempt in 1 2 3 4 5; do
        LOCAL_STATUS="$(${CURL_BIN} -s -S -o /dev/null -w "%{http_code}" --max-time 10 --connect-timeout 5 "http://127.0.0.1:${EXPECTED_PORT}/" 2>/dev/null || echo "000")"
        MANIFEST_STATUS="$(${CURL_BIN} -s -S -o /dev/null -w "%{http_code}" --max-time 10 --connect-timeout 5 "http://127.0.0.1:${EXPECTED_PORT}/_next/static/${CANDIDATE_BUILD_ID}/_buildManifest.js" 2>/dev/null || echo "000")"
        if [ "${LOCAL_STATUS}" = "200" ] && [ "${MANIFEST_STATUS}" = "200" ]; then
            ORIGIN_STATUS_OK=true
            break
        fi
        poll_sleep 2
    done

    if [ "${ORIGIN_STATUS_OK}" != true ]; then
        echo "FALLO CRÍTICO: El proceso en puerto ${EXPECTED_PORT} no sirve el BUILD_ID del candidato (${CANDIDATE_BUILD_ID}) en memoria viva." >&2
        echo "  HTTP Base: ${LOCAL_STATUS:-000} (esperado 200)" >&2
        echo "  Manifest (${CANDIDATE_BUILD_ID}): ${MANIFEST_STATUS:-000} (esperado 200)" >&2
    fi

    # Validar que el origen local sirve la copia del candidato
    LOCAL_BUDGET="$(${CURL_BIN} -s -S --max-time 10 "http://127.0.0.1:${EXPECTED_PORT}/products/budget" 2>/dev/null || echo "")"
    if grep -F "CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS" <<< "${LOCAL_BUDGET}" >/dev/null; then
        ORIGIN_ROUTES_OK=true
    else
        echo "FALLO CRÍTICO: El origen local (127.0.0.1:${EXPECTED_PORT}) no sirve el claim CR-01 del candidato." >&2
        ORIGIN_ROUTES_OK=false
    fi

    # 6.2. Capa A: Smoke Test SSR sobre la URL pública con TLS estricto
    ROUTES=("/" "/products/budget" "/products" "/products/print" "/for-authors" "/governance" "/icon.png")
    for route in "${ROUTES[@]}"; do
        STATUS="$(${CURL_BIN} -s -S -o /dev/null -w "%{http_code}" --max-time 10 --connect-timeout 5 "https://${DOMAIN}${route}" 2>/dev/null || echo "000")"
        if [ "${STATUS}" != "200" ]; then
            echo "FALLO EN SMOKE TEST SSR: ${route} devolvió HTTP ${STATUS}." >&2
            PUBLIC_STATUS_OK=false
            break
        fi
    done

    # 6.3. Validación de claims en HTML SSR
    HTML_BUDGET="$(${CURL_BIN} -s -S --max-time 10 "https://${DOMAIN}/products/budget" 2>/dev/null || echo "")"
    HTML_PRODUCTS="$(${CURL_BIN} -s -S --max-time 10 "https://${DOMAIN}/products" 2>/dev/null || echo "")"
    HTML_PRINT="$(${CURL_BIN} -s -S --max-time 10 "https://${DOMAIN}/products/print" 2>/dev/null || echo "")"

    if ! grep -F "CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS" <<< "${HTML_BUDGET}" >/dev/null || \
       ! grep -F "transición tecnológica más eficiente" <<< "${HTML_PRODUCTS}" >/dev/null || \
       ! grep -F "tarifas de producción según las matrices de planta asociadas" <<< "${HTML_PRINT}" >/dev/null; then
        PUBLIC_CONTENT_OK=false
    fi

    # Detección estricta de evidencia de versión antigua (claims, ETag contra origen e identidad explícita)
    if grep -F "CALCULA PRESUPUESTOS EXACTOS EN SEGUNDOS" <<< "${HTML_BUDGET}" >/dev/null; then
        echo "[EVIDENCIA] Claim anterior detectado en HTML público de /products/budget."
        CACHE_STALE_EVIDENCE=true
    fi

    # Comparación de ETag contra origen actual para la misma ruta (un ETag pre/post idéntico en página no cambiada es legítimo)
    ORIGIN_ROOT_ETAG="$(${CURL_BIN} -s -S -I --max-time 5 "http://127.0.0.1:${EXPECTED_PORT}/" 2>/dev/null | grep -i "^etag:" | awk '{print $2}' | tr -d '\r\n' || echo '')"
    CURRENT_PUBLIC_ETAG="$(${CURL_BIN} -s -S -I --max-time 10 "https://${DOMAIN}/" 2>/dev/null | grep -i "^etag:" | awk '{print $2}' | tr -d '\r\n' || echo '')"

    if [ -n "${CURRENT_PUBLIC_ETAG}" ] && [ -n "${ORIGIN_ROOT_ETAG}" ]; then
        echo "[INFO] ETag público: ${CURRENT_PUBLIC_ETAG} | ETag origen: ${ORIGIN_ROOT_ETAG}"
        # Solo se considera evidencia positiva de caché antigua si el público difiere del origen actual Y coincide con el pre-despliegue
        if [ "${CURRENT_PUBLIC_ETAG}" != "${ORIGIN_ROOT_ETAG}" ] && [ -n "${LIVE_PUBLIC_ETAG:-}" ] && [ "${CURRENT_PUBLIC_ETAG}" = "${LIVE_PUBLIC_ETAG}" ]; then
            echo "[EVIDENCIA] Reverse proxy público sirve el ETag pre-despliegue (${CURRENT_PUBLIC_ETAG}) desincronizado del origen actual (${ORIGIN_ROOT_ETAG})."
            CACHE_STALE_EVIDENCE=true
        fi
    fi

    # Comprobación de identidad explícita de release en web pública
    PUBLIC_SERVED_RELEASE_ID="$(${CURL_BIN} -s -S --max-time 5 "https://${DOMAIN}/api/health" 2>/dev/null | ${PYTHON_BIN} -c '
import sys, json
try:
    print(json.loads(sys.stdin.read()).get("release_id", "unknown"))
except Exception:
    print("unknown")
' 2>/dev/null || echo "unknown")"

    if [ -n "${LIVE_BUILD_ID:-}" ] && [ "${LIVE_BUILD_ID}" != "UNKNOWN" ] && [ "${PUBLIC_SERVED_RELEASE_ID}" = "${LIVE_BUILD_ID}" ] && [ "${PUBLIC_SERVED_RELEASE_ID}" != "${CANDIDATE_BUILD_ID}" ]; then
        echo "[EVIDENCIA] Endpoint público /api/health sirve la identidad del release previo (${PUBLIC_SERVED_RELEASE_ID}) en vez del candidato (${CANDIDATE_BUILD_ID})."
        CACHE_STALE_EVIDENCE=true
    fi

    # 6.4. Capa B: Inspección Estática del Artefacto Compilado (EN y DE)
    # Valida exclusivamente los recursos realmente utilizados por la ruta /products/budget
    BUDGET_BUNDLES="$(resolve_budget_bundles "${APP_ROOT}")"
    if [ -n "${BUDGET_BUNDLES}" ]; then
        if ! grep -q "CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS" ${BUDGET_BUNDLES}; then
            echo "FALLO: Cadena exacta en inglés CR-01 ausente en bundles de budget." >&2
            ORIGIN_ROUTES_OK=false
        fi
        if ! grep -q "DRUCKANGEBOTE IN SEKUNDEN BERECHNEN" ${BUDGET_BUNDLES}; then
            echo "FALLO: Cadena exacta en alemán CR-01 ausente en bundles de budget." >&2
            ORIGIN_ROUTES_OK=false
        fi
    else
        echo "FALLO: No se encontraron bundles compilados para la ruta /products/budget." >&2
        ORIGIN_ROUTES_OK=false
    fi

    # 6.5. Inspección de Errores Posteriores a la Activación
    if [ -f "${ERROR_LOG_PATH}" ]; then
        NEW_ERRORS="$(tail -n +$((LOG_LINE_BASELINE + 1)) "${ERROR_LOG_PATH}" 2>/dev/null | awk '/500|502|fatal|crash/ {count++} END {print count+0}')"
        if [ "${NEW_ERRORS}" -gt 0 ]; then
            echo "FALLO: Se han detectado ${NEW_ERRORS} nuevos errores en proxy_error_log tras la activación." >&2
            ORIGIN_STATUS_OK=false
        fi
    fi

    # ==============================================================================
    # FASE 7: CLASIFICACIÓN OPERATIVA FORMAL Y EVALUACIÓN FINAL
    # Manejo explícito de retorno no cero para que set -e no interrumpa antes del case
    # ==============================================================================
    RELEASE_STATE="$(classify_release_state "${ORIGIN_STATUS_OK}" "${ORIGIN_ROUTES_OK}" "${PUBLIC_STATUS_OK}" "${PUBLIC_CONTENT_OK}" "${CACHE_STALE_EVIDENCE}" || true)"
    echo "[INFO] Clasificación de release calculada: ${RELEASE_STATE}"

    case "${RELEASE_STATE}" in
        ORIGIN_FAILED)
            echo "[CRITERIO DE ABORTO ACTIVADO] Causa: Fallo de verificación en origen local (ORIGIN_FAILED)." >&2
            execute_rollback "Fallo en origen local o proceso (ORIGIN_FAILED)"
            exit 1
            ;;

        PUBLIC_FAILED)
            echo "[CRITERIO DE ABORTO ACTIVADO] Causa: Fallo en acceso público SSR (PUBLIC_FAILED)." >&2
            execute_rollback "Fallo en acceso público SSR (PUBLIC_FAILED)"
            exit 1
            ;;

        PENDING_CACHE_INVALIDATION)
            SWAP_STATE="PENDING_CACHE_INVALIDATION"
            echo "========================================================================"
            echo "[ESTADO: PENDING_CACHE_INVALIDATION — NO VALIDADO COMO DESPLIEGUE COMPLETO]"
            echo "ADVERTENCIA CRÍTICA: PENDING_CACHE_INVALIDATION NUNCA DEBE INTERPRETARSE"
            echo "COMO UN DESPLIEGUE COMPLETAMENTE VALIDADO."
            echo "Estado final: SWAP_STATE=${SWAP_STATE}"
            echo "Origen local (127.0.0.1:${EXPECTED_PORT}) responde HTTP 200 y sirve BUILD_ID=${CANDIDATE_BUILD_ID}."
            echo "Sin embargo, el reverse proxy público retiene caché o contenido previo."
            echo "El release permanece en estado PENDIENTE DE INVALIDACIÓN DE CACHÉ."
            echo "Prohibido ejecutar purgas globales destructivas en el servidor compartido."
            echo "========================================================================"
            exit 0
            ;;

        ACTIVE)
            SWAP_STATE="ACTIVE"
            echo "========================================================================"
            echo "[ÉXITO] Despliegue de ${CANDIDATE_SHA} validado y plenamente operativo."
            echo "Estado final: SWAP_STATE=${SWAP_STATE}"
            echo "Artefacto activo verificado: BUILD_ID=${CANDIDATE_BUILD_ID}"
            echo "El directorio de resguardo ${TEMP_SWAP_DIR} se conserva para observación."
            echo "========================================================================"
            exit 0
            ;;

        *)
            echo "ERROR: Clasificación desconocida: ${RELEASE_STATE}" >&2
            execute_rollback "Clasificación desconocida: ${RELEASE_STATE}"
            exit 1
            ;;
    esac
}

# Entrada principal: solo ejecuta si no está siendo sourced por la suite de pruebas
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    trap 'signal_trap SIGINT $LINENO' INT
    trap 'signal_trap SIGTERM $LINENO' TERM
    trap 'err_trap $? $LINENO' ERR
    trap 'exit_trap $?' EXIT
    run_deployment "$@"
fi
