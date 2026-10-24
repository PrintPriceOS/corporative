#!/usr/bin/env python3
"""
scripts/tests/test_browser_language_switch.py
End-to-End Browser verification of reactive language switching.
Tests that clicking the language selector (ES -> EN -> DE):
1. Dispatches reactive locale updates.
2. Updates document.documentElement.lang.
3. Persists selection in localStorage ('ppp_locale').
4. Dynamically updates candidate claims in the DOM.
"""

import sys
from playwright.sync_api import sync_playwright

BASE_URL = "http://127.0.0.1:3015"

def test_language_switching():
    print(f"========================================================================")
    print(f"PLAYWRIGHT E2E BROWSER TEST: LANGUAGE SELECTOR & REACTIVE DOM")
    print(f"Target URL: {BASE_URL}")
    print(f"========================================================================")

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Step 1: Open /products/budget
        print("\n[Step 1] Navigating to /products/budget (Initial state: ES)...")
        page.goto(f"{BASE_URL}/products/budget", wait_until="domcontentloaded")
        page.wait_for_selector("h1")
        page.wait_for_timeout(500)

        lang_attr = page.evaluate("() => document.documentElement.lang")
        h1_text = page.locator("h1").inner_text()
        print(f"  Initial document.documentElement.lang: {lang_attr}")
        print(f"  Initial H1: {h1_text[:60]}...")

        if "CALCULA PRESUPUESTOS DE IMPRESIÓN EN SEGUNDOS" in h1_text:
            print("  [OK] Default Spanish SSR claim present in DOM.")
            results.append(("ES_DEFAULT_SSR", True))
        else:
            print("  [FAIL] Default Spanish SSR claim missing.")
            results.append(("ES_DEFAULT_SSR", False))

        # Step 2: Click 'EN' button in LanguageSelector
        print("\n[Step 2] Clicking 'EN' language selector button...")
        en_btn = page.locator('button:has-text("EN")').first
        en_btn.click()
        page.wait_for_timeout(500)

        lang_en = page.evaluate("() => document.documentElement.lang")
        stored_locale_en = page.evaluate("() => localStorage.getItem('ppp_locale')")
        h1_en = page.locator("h1").inner_text()
        print(f"  Updated lang attribute: {lang_en}")
        print(f"  localStorage['ppp_locale']: {stored_locale_en}")
        print(f"  Updated H1: {h1_en[:60]}...")

        if "CALCULATE PRINT PRODUCTION ESTIMATES IN SECONDS" in h1_en and stored_locale_en == "en":
            print("  [OK] English translation reactively rendered in DOM and persisted.")
            results.append(("EN_CLIENT_SWITCH", True))
        else:
            print("  [FAIL] English translation failed to render in DOM.")
            results.append(("EN_CLIENT_SWITCH", False))

        # Step 3: Click 'DE' button in LanguageSelector
        print("\n[Step 3] Clicking 'DE' language selector button...")
        de_btn = page.locator('button:has-text("DE")').first
        de_btn.click()
        page.wait_for_timeout(500)

        lang_de = page.evaluate("() => document.documentElement.lang")
        stored_locale_de = page.evaluate("() => localStorage.getItem('ppp_locale')")
        h1_de = page.locator("h1").inner_text()
        print(f"  Updated lang attribute: {lang_de}")
        print(f"  localStorage['ppp_locale']: {stored_locale_de}")
        print(f"  Updated H1: {h1_de[:60]}...")

        if "DRUCKANGEBOTE IN SEKUNDEN BERECHNEN" in h1_de and stored_locale_de == "de":
            print("  [OK] German translation reactively rendered in DOM and persisted.")
            results.append(("DE_CLIENT_SWITCH", True))
        else:
            print("  [FAIL] German translation failed to render in DOM.")
            results.append(("DE_CLIENT_SWITCH", False))

        # Step 4: Navigate to /products while maintaining 'de' locale in localStorage
        print("\n[Step 4] Navigating to /products with persisted 'de' locale...")
        page.goto(f"{BASE_URL}/products", wait_until="domcontentloaded")
        page.wait_for_timeout(800)
        body_text_de = page.locator("body").inner_text()

        if "Ermitteln Sie den optimalen Technologieübergang zwischen Digital- und Offsetdruck." in body_text_de:
            print("  [OK] German candidate claim CR-02 rendered on /products.")
            results.append(("DE_PERSISTENCE_PRODUCTS", True))
        else:
            print("  [FAIL] German candidate claim CR-02 missing on /products.")
            results.append(("DE_PERSISTENCE_PRODUCTS", False))

        browser.close()

    print("\n========================================================================")
    print("RESUMEN DE PRUEBAS DE NAVEGADOR PLAYWRIGHT")
    print("========================================================================")
    all_passed = all(status for _, status in results)
    for name, status in results:
        mark = "[PASÓ]" if status else "[FALLÓ]"
        print(f"  {name:30}: {mark}")

    if all_passed:
        print("[VEREDICTO: PASÓ] Flujo de selector de idioma verificado en navegador Chromium.")
        return 0
    else:
        print("[VEREDICTO: FALLÓ] Discrepancias detectadas en renderizado de cliente.")
        return 1

if __name__ == "__main__":
    sys.exit(test_language_switching())
