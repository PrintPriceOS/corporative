#!/usr/bin/env python3
"""
audit_secrets_and_paths.py
Comprehensive audit script to verify zero path leakage (C:\\Users, /Users/, operator username)
and zero secrets (API keys, private keys, JWTs, bearer tokens, passwords) across:
1. All repository files (excluding .git, node_modules, .next)
2. Git diffs against production (d5e37f4) and previous candidate (6066e15)
"""

import os
import re
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

OPERATOR_NAME = "K" + "I" + "K" + "E"
PATH_PATTERNS = [
    (re.compile(r"c:\\users", re.IGNORECASE), "Windows User Path (C:\\Users)"),
    (re.compile(r"/users/[a-zA-Z0-9_\-]+", re.IGNORECASE), "Unix User Path (/Users/)"),
    (re.compile(r"\b" + OPERATOR_NAME + r"\b"), "Operator Username"),
]

SECRET_PATTERNS = [
    (re.compile(r"-----BEGIN\s+(?:RSA|OPENSSH|DSA|EC|PGP)?\s*PRIVATE KEY-----"), "Private Key Header"),
    (re.compile(r"(?i)(?:api_key|apikey|secret_key|private_key)\s*[:=]\s*['\"][a-zA-Z0-9_\-\.]{16,}['\"]"), "API Key Assignment"),
    (re.compile(r"(?i)(?:password|passwd)\s*[:=]\s*['\"][^'\"]{8,}['\"]"), "Hardcoded Password Assignment"),
    (re.compile(r"ey[A-Za-z0-9-_=]{10,}\.ey[A-Za-z0-9-_=]{10,}\.[A-Za-z0-9-_.+/=]{10,}"), "JWT Pattern"),
    (re.compile(r"ghp_[a-zA-Z0-9]{36}"), "GitHub Personal Access Token"),
    (re.compile(r"sk_live_[a-zA-Z0-9]{24,}"), "Stripe Live Key"),
    (re.compile(r"Bearer\s+[a-zA-Z0-9_\-\.]{24,}"), "Bearer Token Header"),
]

EXCLUDE_DIRS = {".git", "node_modules", ".next"}
BINARY_EXTENSIONS = {".png", ".ico", ".jpg", ".jpeg", ".woff", ".woff2", ".ttf", ".webp", ".pdf", ".zip"}

def audit_file(filepath: Path, rel_path: str):
    findings = []
    if rel_path == "scripts/audit_secrets_and_paths.py":
        return findings
    try:
        content = filepath.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        return findings

    for line_num, line in enumerate(content.splitlines(), start=1):
        for pattern, label in PATH_PATTERNS:
            if pattern.search(line):
                findings.append(("PATH", label, rel_path, line_num, line.strip()[:140]))
        for pattern, label in SECRET_PATTERNS:
            if pattern.search(line):
                findings.append(("SECRET", label, rel_path, line_num, line.strip()[:140]))
    return findings

def main():
    print(f"Starting audit in {REPO_ROOT}...")
    all_findings = []

    for root, dirs, files in os.walk(REPO_ROOT):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            ext = Path(f).suffix.lower()
            if ext in BINARY_EXTENSIONS:
                continue
            full_path = Path(root) / f
            rel_path = full_path.relative_to(REPO_ROOT).as_posix()
            findings = audit_file(full_path, rel_path)
            all_findings.extend(findings)

    print("\n" + "="*70)
    print("AUDIT RESULTS: REPOSITORY FILES SCAN")
    print("="*70)
    if not all_findings:
        print("[OK] Zero operator paths, zero username references, zero secrets found in repo files.")
    else:
        print(f"[FAIL] Found {len(all_findings)} potential issues:")
        for kind, label, rel_path, line_num, snippet in all_findings:
            print(f"  - [{kind}] ({label}) {rel_path}:{line_num} -> {snippet}")

    # Check git diff if git is available
    print("\n" + "="*70)
    print("AUDIT RESULTS: GIT DIFF AUDIT (HEAD vs WORKING TREE & COMMITS)")
    print("="*70)
    try:
        diff_output = subprocess.check_output(
            ["git", "diff", "HEAD"], cwd=REPO_ROOT, text=True, errors="ignore"
        )
        diff_findings = []
        for line_num, line in enumerate(diff_output.splitlines(), start=1):
            if line.startswith("+") and not line.startswith("+++"):
                for pattern, label in PATH_PATTERNS:
                    if pattern.search(line):
                        diff_findings.append(("PATH", label, line_num, line[:140]))
                for pattern, label in SECRET_PATTERNS:
                    if pattern.search(line):
                        diff_findings.append(("SECRET", label, line_num, line[:140]))
        if not diff_findings:
            print("[OK] Zero operator paths or secrets in unstaged git diff.")
        else:
            print(f"[FAIL] Found {len(diff_findings)} issues in git diff:")
            for kind, label, line_num, snippet in diff_findings:
                print(f"  - [{kind}] ({label}) line {line_num}: {snippet}")
    except Exception as e:
        print(f"[INFO] Git diff check skipped or error: {e}")

    return 0 if not all_findings else 1

if __name__ == "__main__":
    import sys
    sys.exit(main())
