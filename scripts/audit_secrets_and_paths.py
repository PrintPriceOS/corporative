#!/usr/bin/env python3
"""
scripts/audit_secrets_and_paths.py
Integrity, secrets, and environment path leakage auditor for PrintPrice OS.

ARCHITECTURAL PRINCIPLE:
To avoid self-contamination and disingenuous self-audits, all target signatures
are isolated in an external data fixture: 'scripts/fixtures/audit_signatures.json'.
This script itself contains no hardcoded pattern strings, operator names, or path literals.

Scope:
1. Operational application code, libraries, and public documentation (zero leaks required).
2. The external fixture file is documented and classified as the detector's signature catalog.
3. Git diff ranges (production base vs HEAD, previous review vs HEAD, working tree).
"""

import os
import re
import sys
import json
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
FIXTURE_REL_PATH = "scripts/fixtures/audit_signatures.json"
FIXTURE_FULL_PATH = REPO_ROOT / FIXTURE_REL_PATH

EXCLUDE_DIRS = {".git", "node_modules", ".next"}
BINARY_EXTENSIONS = {".png", ".ico", ".jpg", ".jpeg", ".woff", ".woff2", ".ttf", ".webp", ".pdf", ".zip"}

def load_signatures():
    if not FIXTURE_FULL_PATH.is_file():
        print(f"[FATAL] Missing required signature fixture: {FIXTURE_FULL_PATH}")
        sys.exit(2)

    with open(FIXTURE_FULL_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    compiled = []
    signatures = data.get("signatures", {})
    for key, spec in signatures.items():
        pattern_str = spec["pattern"]
        flags_str = spec.get("flags", "")
        flags = re.IGNORECASE if "IGNORECASE" in flags_str else 0
        compiled.append((re.compile(pattern_str, flags), spec["label"], key))
    return compiled

def audit_file_content(content: str, rel_path: str, patterns):
    findings = []
    lines = content.splitlines()
    for line_num, line in enumerate(lines, start=1):
        for regex, label, key in patterns:
            if regex.search(line):
                findings.append((key, label, rel_path, line_num, line.strip()[:140]))
    return findings, len(lines)

def audit_git_range(range_spec: str, repo_root: Path, patterns):
    findings = []
    # Verify revision existence before running diff
    refs = range_spec.split("..")
    for ref in refs:
        if ref and ref != "HEAD":
            check_ref = subprocess.run(
                ["git", "rev-parse", "--verify", ref],
                cwd=repo_root, capture_output=True,
                text=True, encoding="utf-8", errors="replace"
            )
            if check_ref.returncode != 0:
                return [("GIT_REF_ERROR", f"Reference '{ref}' does not exist in local git repository.", 0, "")]

    try:
        diff_cmd = ["git", "diff", range_spec]
        proc = subprocess.run(
            diff_cmd, cwd=repo_root, capture_output=True,
            text=True, encoding="utf-8", errors="replace", check=True
        )
        output = proc.stdout
    except subprocess.CalledProcessError as e:
        return [("GIT_DIFF_ERROR", f"git diff {range_spec} failed with exit code {e.returncode}: {e.stderr.strip()}", 0, "")]
    except Exception as e:
        return [("GIT_EXEC_ERROR", f"Failed executing git diff {range_spec}: {e}", 0, "")]

    current_file = ""
    for line_num, line in enumerate(output.splitlines(), start=1):
        if line.startswith("diff --git a/"):
            parts = line.split(" b/")
            if len(parts) == 2:
                current_file = parts[1].strip()
            continue

        if current_file == FIXTURE_REL_PATH:
            continue

        if line.startswith("+") and not line.startswith("+++"):
            added = line[1:]
            for regex, label, key in patterns:
                if regex.search(added):
                    findings.append((key, label, line_num, added.strip()[:140]))
    return findings

def main():
    print("=" * 75)
    print("PRINTPRICE OS — COMPREHENSIVE REPOSITORY INTEGRITY AUDITOR")
    print(f"Target Root: {REPO_ROOT}")
    print(f"Signature Catalog Fixture: {FIXTURE_REL_PATH}")
    print("=" * 75)

    patterns = load_signatures()
    print(f"Loaded {len(patterns)} signature rules from external fixture.\n")

    operational_findings = []
    fixture_findings = []
    total_files = 0
    total_lines = 0

    for root, dirs, files in os.walk(REPO_ROOT):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            ext = Path(f).suffix.lower()
            if ext in BINARY_EXTENSIONS:
                continue
            full_path = Path(root) / f
            rel_path = full_path.relative_to(REPO_ROOT).as_posix()
            total_files += 1

            try:
                content = full_path.read_text(encoding="utf-8", errors="ignore")
            except Exception as e:
                print(f"[WARN] Could not read {rel_path}: {e}")
                continue

            findings, line_count = audit_file_content(content, rel_path, patterns)
            total_lines += line_count

            if rel_path == FIXTURE_REL_PATH:
                # Expected matches within the external fixture file itself
                fixture_findings.extend(findings)
            else:
                operational_findings.extend(findings)

    print(f"[PHASE 1] REPOSITORY FILES AUDIT")
    print(f"  Total Files Scanned: {total_files} ({total_lines} lines)")
    print(f"  External Detection Fixture: {FIXTURE_REL_PATH} ({len(patterns)} signature rules cataloged)")
    print(f"  Operational Code & Docs Files: {total_files - 1} files")

    if not operational_findings:
        print("  [OK] Zero operator paths, zero operator usernames, zero secrets in operational codebase.")
    else:
        print(f"  [FAIL] Detected {len(operational_findings)} operational issue(s):")
        for key, label, rel_path, line_num, snippet in operational_findings:
            print(f"    - [{key}] ({label}) {rel_path}:{line_num} -> {snippet}")

    print("\n[PHASE 2] GIT DIFF RANGE AUDIT")
    diff_ranges = [
        ("d5e37f4dfeae6baa5581f74828b5575ad7c0ce70..HEAD", "Production Base (d5e37f4) vs Current HEAD"),
        ("46a023ead94951153214f4a68f01ce8ca6014aa4..HEAD", "Previous Review Candidate (46a023e) vs Current HEAD"),
        ("HEAD", "Working Tree Uncommitted Changes"),
    ]

    total_diff_issues = 0
    for range_spec, desc in diff_ranges:
        print(f"Auditing range: {range_spec} [{desc}]...")
        findings = audit_git_range(range_spec, REPO_ROOT, patterns)
        if not findings:
            print(f"  [OK] Zero findings in {range_spec}.")
        else:
            total_diff_issues += len(findings)
            print(f"  [FAIL] {len(findings)} issue(s) detected in {range_spec}:")
            for key, label, line_no, snip in findings:
                print(f"    - [{key}] ({label}) line {line_no}: {snip}")

    print("\n" + "=" * 75)
    print("AUDIT SUMMARY & VERDICT")
    print("=" * 75)
    print(f"Operational Files Audited: {total_files - 1}")
    print(f"Operational Findings:      {len(operational_findings)}")
    print(f"Git Diff Range Findings:   {total_diff_issues}")
    print(f"External Fixture Status:   Documented signature catalog ({FIXTURE_REL_PATH})")

    if len(operational_findings) == 0 and total_diff_issues == 0:
        print("[VERDICT: PASSED] Codebase, docs, and git lineage are clean and verified.")
        return 0
    else:
        print("[VERDICT: FAILED] Audit detected issues or reference errors.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
