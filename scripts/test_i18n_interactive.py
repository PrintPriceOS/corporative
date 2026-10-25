import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_URL = "http://localhost:3010"

def run_tests(intentional_failure=False):
    print("=" * 60)
    print("Starting Playwright Interactive i18n & UX Verification")
    if intentional_failure:
        print("[MODE] Controlled Intentional Failure Verification")
    else:
        print("[MODE] Full Conformance Suite")
    print("=" * 60)

    failures = []
    passed_count = 0
    total_checks = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        def select_language(lang_code):
            btn = page.locator("header div[role='group'] button").filter(has_text=lang_code.upper()).first
            btn.click()
            # Wait for button to transition to active pressed state
            page.locator("header div[role='group'] button[aria-pressed='true']").filter(has_text=lang_code.upper()).first.wait_for(state="visible", timeout=4000)

        def assert_visible(text, context_name, timeout_ms=5000):
            nonlocal passed_count, total_checks
            total_checks += 1
            try:
                # Use Playwright's wait_for on locator for responsive state settling
                loc = page.locator(f"text={text}").first
                loc.wait_for(state="visible", timeout=timeout_ms)
                passed_count += 1
                print(f"  [PASS] {context_name}: '{text}' visible")
                return True
            except Exception as e:
                msg = f"{context_name}: Expected '{text}' to be visible (Timeout {timeout_ms}ms)"
                failures.append(msg)
                print(f"  [FAIL] {msg}")
                return False

        # --- TEST 1: Home Page (/) in ES, EN, DE ---
        print("\n--- 1. Testing Home Page (/) Dynamic Language Switching ---")
        page.goto(f"{BASE_URL}/", wait_until="networkidle")

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
            print(f"Checking Home in {lang.upper()}:")
            for k, val in expected.items():
                assert_visible(val, f"Home ({lang.upper()}) -> {k}")

        # --- TEST 2: Preflight Page (/products/preflight) ---
        print("\n--- 2. Testing Preflight Page (/products/preflight) Dynamic Language Switching ---")
        page.goto(f"{BASE_URL}/products/preflight", wait_until="networkidle")

        for lang, expected in [
            ("es", {
                "demoPill": "DEMOSTRACIÓN TÉCNICA",
                "compPill": "ANÁLISIS DOCUMENTAL COMPARATIVO",
                "demoStatus": "REVISIÓN REQUERIDA",
                "criteria": "Criterio",
                "syntheticNotice": "Ejemplo ilustrativo / informe sintético de demostración"
            }),
            ("en", {
                "demoPill": "TECHNICAL DEMONSTRATION",
                "compPill": "COMPARATIVE DOCUMENTARY ANALYSIS",
                "demoStatus": "REVIEW REQUIRED",
                "criteria": "Criteria",
                "syntheticNotice": "Illustrative example / synthetic demonstration report"
            }),
            ("de", {
                "demoPill": "TECHNISCHE DEMONSTRATION",
                "compPill": "DOKUMENTARISCHE VERGLEICHSANALYSE",
                "demoStatus": "PRÜFUNG ERFORDERLICH",
                "criteria": "Kriterium",
                "syntheticNotice": "Anschauliches Beispiel / synthetischer Demonstrationsbericht"
            }),
        ]:
            select_language(lang)
            print(f"Checking Preflight in {lang.upper()}:")
            for k, val in expected.items():
                assert_visible(val, f"Preflight ({lang.upper()}) -> {k}")

        # --- TEST 3: Products Hub (/products) ---
        print("\n--- 3. Testing Products Hub (/products) Dynamic Language Switching ---")
        page.goto(f"{BASE_URL}/products", wait_until="networkidle")
        for lang, expected in [
            ("es", {"corePill": "PRODUCTOS PRINCIPALES", "suppPill": "HERRAMIENTAS COMPLEMENTARIAS"}),
            ("en", {"corePill": "CORE PRODUCTS", "suppPill": "COMPLEMENTARY TOOLS"}),
            ("de", {"corePill": "HAUPTPRODUKTE", "suppPill": "ERGÄNZENDE WERKZEUGE"}),
        ]:
            select_language(lang)
            print(f"Checking Products in {lang.upper()}:")
            for k, val in expected.items():
                assert_visible(val, f"Products ({lang.upper()}) -> {k}")

        # --- TEST 4: For Authors (/for-authors) ---
        print("\n--- 4. Testing For Authors (/for-authors) Dynamic Language Switching ---")
        page.goto(f"{BASE_URL}/for-authors", wait_until="networkidle")
        for lang, badge in [("es", "COMPLEMENTARIA"), ("en", "COMPLEMENTARY"), ("de", "ERGÄNZEND")]:
            select_language(lang)
            print(f"Checking For Authors in {lang.upper()}:")
            assert_visible(badge, f"For Authors ({lang.upper()}) -> badge")

        # --- TEST 5: Language Persistence on Navigation and Reload ---
        print("\n--- 5. Testing Language Persistence on Navigation & Reload ---")
        # 5.1 Set language to DE on Home and Reload
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        select_language("de")
        assert_visible("PRODUKTE — WAS SIE TUN KÖNNEN", "DE active before reload")
        page.reload(wait_until="networkidle")
        assert_visible("PRODUKTE — WAS SIE TUN KÖNNEN", "DE persisted after page reload")

        # 5.2 Navigate to /for-authors without clicking language selector
        page.goto(f"{BASE_URL}/for-authors", wait_until="networkidle")
        assert_visible("ERGÄNZEND", "DE persisted upon navigation to /for-authors")

        # 5.3 Navigate to /products without clicking language selector
        page.goto(f"{BASE_URL}/products", wait_until="networkidle")
        assert_visible("HAUPTPRODUKTE", "DE persisted upon navigation to /products")

        # 5.4 Switch to EN, reload, and navigate to /
        select_language("en")
        assert_visible("CORE PRODUCTS", "EN active on /products")
        page.reload(wait_until="networkidle")
        assert_visible("CORE PRODUCTS", "EN persisted after reload on /products")
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        assert_visible("PRODUCTS — WHAT YOU CAN DO", "EN persisted upon navigation to /")

        # 5.5 Switch back to ES and reload
        select_language("es")
        page.reload(wait_until="networkidle")
        assert_visible("PRODUCTOS — QUÉ PUEDES HACER", "ES persisted after reload on /")

        # --- Controlled Intentional Failure (if requested) ---
        if intentional_failure:
            print("\n--- Controlled Intentional Failure Check ---")
            assert_visible("TEXTO_INEXISTENTE_DE_PRUEBA_12345", "Intentional Failure Expectation", timeout_ms=1500)

        browser.close()

    print("\n" + "=" * 60)
    print("VERIFICATION SUITE EXECUTION SUMMARY")
    print(f"Total Checks:  {total_checks}")
    print(f"Passed Checks: {passed_count}")
    print(f"Failed Checks: {len(failures)}")
    print("=" * 60)

    if failures:
        print("\nFAILURES DETECTED:")
        for idx, f in enumerate(failures, 1):
            print(f"  {idx}. {f}")
        print("\nExiting with status code: 1")
        sys.exit(1)
    else:
        print("\nAll verification assertions PASSED successfully!")
        print("Exiting with status code: 0")
        sys.exit(0)

if __name__ == "__main__":
    test_failure = "--test-failure-handling" in sys.argv
    run_tests(intentional_failure=test_failure)
