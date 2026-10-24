import os
import re

SEARCH_TERMS = [
    r"\bexact\b",
    r"\bexacto\b",
    r"\bexacta\b",
    r"\bexactos\b",
    r"\breal costs\b",
    r"\bcostes reales\b",
    r"\bc[aá]lculo exacto\b",
    r"\bpresupuesto exacto\b",
    r"\btarifas exactas\b",
    r"\bespecificaciones exactas\b",
    r"\bCero Incidencias\b",
    r"\bNODES AVAILABLE\b",
    r"\bGLOBAL EDGE\b",
    r"\bSin registro previo obligatorio\b",
    r"\bEncargar producci[oó]n\b",
]

BASE_DIR = r"C:\Users\KIKE\Downloads\corporative"
DIRS_TO_SEARCH = ["app", "components", "lib"]

results = []

for d in DIRS_TO_SEARCH:
    full_d = os.path.join(BASE_DIR, d)
    for root, _, files in os.walk(full_d):
        for f in files:
            if not f.endswith(('.tsx', '.ts', '.js', '.jsx', '.json', '.md')):
                continue
            path = os.path.join(root, f)
            rel_path = os.path.relpath(path, BASE_DIR).replace('\\', '/')
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
                    for idx, line in enumerate(fh, start=1):
                        for term in SEARCH_TERMS:
                            if re.search(term, line, re.IGNORECASE):
                                results.append({
                                    "term": term,
                                    "file": rel_path,
                                    "line": idx,
                                    "content": line.strip()
                                })
            except Exception as e:
                pass

print(f"Total occurrences found: {len(results)}\n")
for r in results:
    print(f"[{r['file']}:{r['line']}] {r['content'][:140]}")
