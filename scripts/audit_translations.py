import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRANSLATIONS_DIR = os.path.join(BASE_DIR, "lib", "translations")
APP_DIR = os.path.join(BASE_DIR, "app")

print(f"Base Directory: {BASE_DIR}")

# 1. Check EN and DE translation files for untranslated Spanish
spanish_indicator_words = [
    r'\bpara\b', r'\bcon\b', r'\bpor\b', r'\bque\b', r'\bcomo\b', r'\btu libro\b',
    r'\bpresupuesto\b', r'\bimprenta\b', r'\btalleres\b', r'\bcomprobar\b',
    r'\bencarga\b', r'\btirada\b', r'\beditoriales\b', r'\bproveedores\b'
]

def scan_dict_file(filepath, lang_code):
    print(f"\nScanning {filepath} for {lang_code}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    suspect_lines = []
    for idx, line in enumerate(lines, 1):
        # Ignore comments or imports
        if line.strip().startswith('//') or line.strip().startswith('import'):
            continue
        for pat in spanish_indicator_words:
            if re.search(pat, line, re.IGNORECASE):
                suspect_lines.append((idx, pat, line.strip()))
                break
                
    if suspect_lines:
        print(f"  [WARNING] Found {len(suspect_lines)} lines with potential Spanish text in {lang_code}:")
        for line_no, pat, l in suspect_lines:
            print(f"    Line {line_no} [{pat}]: {l}")
    else:
        print(f"  [OK] No Spanish indicator words found in {lang_code} dictionary.")

scan_dict_file(os.path.join(TRANSLATIONS_DIR, "en.ts"), "EN")
scan_dict_file(os.path.join(TRANSLATIONS_DIR, "de.ts"), "DE")

# 2. Scan app pages for ternary patterns that might miss DE or EN
print("\n--- Scanning app/ for ternary localization patterns ---")
for root, dirs, files in os.walk(APP_DIR):
    for f in files:
        if f.endswith('.tsx'):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8') as fl:
                code = fl.read()
            
            # Check if locale is used
            has_locale = 'locale' in code
            # Check if locale === 'es' exists but locale === 'de' does not
            if "locale === 'es'" in code and "locale === 'de'" not in code:
                rel = os.path.relpath(fpath, BASE_DIR)
                print(f"  [NOTICE] {rel}: has 'locale === es' but NO 'locale === de'")

# 3. Check for pages with extensive Spanish text but NO i18n/locale usage
print("\n--- Scanning app/ for pages with NO i18n / locale usage ---")
for root, dirs, files in os.walk(APP_DIR):
    for f in files:
        if f.endswith('.tsx') and not f.startswith('layout') and not f.startswith('loading') and not f.startswith('error'):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8') as fl:
                code = fl.read()
            
            rel = os.path.relpath(fpath, BASE_DIR)
            has_use_i18n = 'useI18n' in code or 'useLocale' in code or 'locale' in code
            
            # Check length of file
            if len(code) > 2000 and not has_use_i18n:
                print(f"  [MONOLINGUAL PAGE?] {rel} (length {len(code)}) has NO locale/useI18n")

print("\nAudit completed.")
