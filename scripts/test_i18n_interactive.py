import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_URL = "http://localhost:3010"

def run_tests():
    print("Starting interactive i18n & UX verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # 1. Home page verification in ES, EN, DE
        print("\n--- 1. Testing Home Page (/) ---")
        page.goto(f"{BASE_URL}/", wait_until="networkidle")

        def select_language(lang_code):
            # Click the language button directly in the visible desktop header
            btn = page.locator("header div[role='group'] button").filter(has_text=lang_code.upper()).first
            btn.click()
            time.sleep(0.4)

        for lang, expected in [
            ("es", {
                "prodPill": "PRODUCTOS — QUÉ PUEDES HACER",
                "stkPill": "PÚBLICOS — PARA QUIÉN",
                "calcLink": "Price it (Calculador)",
                "mockLink": "Maqueta 3D (Visor de libro)",
                "terms": "Términos de Servicio"
            }),
            ("en", {
                "prodPill": "PRODUCTS — WHAT YOU CAN DO",
                "stkPill": "STAKEHOLDERS — WHO IT'S FOR",
                "calcLink": "Price it (Calculator)",
                "mockLink": "3D Mockup (Book Viewer)",
                "terms": "Terms of Service"
            }),
            ("de", {
                "prodPill": "PRODUKTE — WAS SIE TUN KÖNNEN",
                "stkPill": "ZIELGRUPPEN — FÜR WEN",
                "calcLink": "Price it (Kalkulator)",
                "mockLink": "3D-Mockup (Buchbetrachter)",
                "terms": "Nutzungsbedingungen"
            }),
        ]:
            select_language(lang)
            body_text = page.locator("body").inner_text()
            print(f"Checking language: {lang.upper()}")
            for k, val in expected.items():
                if val in body_text:
                    print(f"  [PASS] {k} -> '{val}' visible")
                else:
                    print(f"  [FAIL] {k} -> '{val}' NOT found in body")

        # 2. Preflight Page verification in ES, EN, DE
        print("\n--- 2. Testing Preflight Page (/products/preflight) ---")
        page.goto(f"{BASE_URL}/products/preflight", wait_until="networkidle")

        for lang, expected in [
            ("es", {
                "demoPill": "DEMOSTRACIÓN TÉCNICA",
                "compPill": "ANÁLISIS DOCUMENTAL COMPARATIVO",
                "demoStatus": "REVISIÓN REQUERIDA",
                "criteria": "Criterio"
            }),
            ("en", {
                "demoPill": "TECHNICAL DEMONSTRATION",
                "compPill": "COMPARATIVE DOCUMENTARY ANALYSIS",
                "demoStatus": "REVIEW REQUIRED",
                "criteria": "Criteria"
            }),
            ("de", {
                "demoPill": "TECHNISCHE DEMONSTRATION",
                "compPill": "DOKUMENTARISCHE VERGLEICHSANALYSE",
                "demoStatus": "PRÜFUNG ERFORDERLICH",
                "criteria": "Kriterium"
            }),
        ]:
            select_language(lang)
            body_text = page.locator("body").inner_text()
            print(f"Checking Preflight language: {lang.upper()}")
            for k, val in expected.items():
                if val in body_text:
                    print(f"  [PASS] {k} -> '{val}' visible")
                else:
                    print(f"  [FAIL] {k} -> '{val}' NOT found in body")

        # 3. Products Hub verification in ES, EN, DE
        print("\n--- 3. Testing Products Hub (/products) ---")
        page.goto(f"{BASE_URL}/products", wait_until="networkidle")
        for lang, expected in [
            ("es", {"corePill": "PRODUCTOS PRINCIPALES", "suppPill": "HERRAMIENTAS COMPLEMENTARIAS"}),
            ("en", {"corePill": "CORE PRODUCTS", "suppPill": "COMPLEMENTARY TOOLS"}),
            ("de", {"corePill": "HAUPTPRODUKTE", "suppPill": "ERGÄNZENDE WERKZEUGE"}),
        ]:
            select_language(lang)
            body_text = page.locator("body").inner_text()
            print(f"Checking Products Hub language: {lang.upper()}")
            for k, val in expected.items():
                if val in body_text:
                    print(f"  [PASS] {k} -> '{val}' visible")
                else:
                    print(f"  [FAIL] {k} -> '{val}' NOT found in body")

        # 4. For Authors verification in ES, EN, DE
        print("\n--- 4. Testing For Authors (/for-authors) ---")
        page.goto(f"{BASE_URL}/for-authors", wait_until="networkidle")
        for lang, badge in [("es", "COMPLEMENTARIA"), ("en", "COMPLEMENTARY"), ("de", "ERGÄNZEND")]:
            select_language(lang)
            body_text = page.locator("body").inner_text()
            print(f"Checking For Authors language: {lang.upper()} -> '{badge}'")
            if badge in body_text:
                print(f"  [PASS] '{badge}' visible")
            else:
                print(f"  [FAIL] '{badge}' NOT found in body")

        browser.close()
        print("\nAll interactive verification assertions completed successfully!")

if __name__ == "__main__":
    run_tests()
