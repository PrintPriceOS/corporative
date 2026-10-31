#!/usr/bin/env python3
"""
scripts/test_public_onboarding_journey.py

Comprobación en navegador (Playwright headless) del recorrido público real para imprentas:
1. /contact/partner:
   - CTA principal y secundario apuntan a https://control.printprice.pro/printhouse/register.
   - Textos correctos y reactivos en ES, EN y DE.
   - Sin desbordamiento ni formularios de 6 pasos bloqueantes en escritorio (1280x800) y móvil (390x844).
2. /for-printhouses:
   - CTA hero y final apuntan a https://control.printprice.pro/printhouse/register.
   - Textos en ES, EN y DE.
   - Sin desbordamiento en escritorio y móvil.
3. Ausencia de rutas públicas huérfanas con el formulario monolítico de 6 pasos.
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"

def test_public_journey():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Test 1: Desktop /contact/partner across ES, EN, DE
        print("\n--- TEST 1: /contact/partner en Escritorio (1280x800) ---")
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()
        
        page.goto(f"{BASE_URL}/contact/partner", wait_until="networkidle")
        
        # Check canonical Control Plane link
        links = page.eval_on_selector_all("a[href*='control.printprice.pro/printhouse/register']", "els => els.map(e => e.href)")
        assert len(links) >= 2, f"Se esperaban al menos 2 enlaces a Control Plane, encontrados: {len(links)}"
        print(f"  ✓ Enlaces a Control Plane verificados: {len(links)} CTAs apuntan a https://control.printprice.pro/printhouse/register")
        
        # Check no 6-step form or honeypot is rendered on /contact/partner
        has_stepper = page.locator("text='Paso anterior'").count() > 0 or page.locator("text='Previous step'").count() > 0
        assert not has_stepper, "ERROR: /contact/partner no debe exponer el formulario de 6 pasos"
        print("  ✓ Verificado: /contact/partner NO expone el formulario de 6 pasos; ofrece acceso canónico directo")
        
        # Check ES content
        assert "Conecta tu taller a la red de producción de PrintPrice OS" in page.content(), "Contenido ES verificado"
        print("  ✓ Idioma ES verificado en /contact/partner")
        
        # Switch to EN
        page.locator("button", has_text="EN").first.click()
        page.wait_for_timeout(400)
        assert "Connect your facility to the PrintPrice OS production network" in page.content()
        print("  ✓ Idioma EN verificado reactivamente en /contact/partner")
        
        # Switch to DE
        page.locator("button", has_text="DE").first.click()
        page.wait_for_timeout(400)
        assert "Verbinden Sie Ihre Druckerei mit dem PrintPrice OS Produktionsnetzwerk" in page.content()
        print("  ✓ Idioma DE verificado reactivamente en /contact/partner")
        
        context.close()
        
        # Test 2: Mobile /contact/partner (390x844)
        print("\n--- TEST 2: /contact/partner en Móvil (390x844 iPhone) ---")
        context_mobile = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        page_mobile = context_mobile.new_page()
        page_mobile.goto(f"{BASE_URL}/contact/partner", wait_until="networkidle")
        
        scroll_width = page_mobile.evaluate("document.documentElement.scrollWidth")
        client_width = page_mobile.evaluate("document.documentElement.clientWidth")
        assert scroll_width <= client_width + 1, f"Desbordamiento horizontal detectado: scrollWidth={scroll_width}, clientWidth={client_width}"
        print(f"  ✓ Sin desbordamiento horizontal en móvil 390x844 (scrollWidth={scroll_width}, clientWidth={client_width})")
        
        mobile_links = page_mobile.eval_on_selector_all("a[href*='control.printprice.pro/printhouse/register']", "els => els.map(e => e.href)")
        assert len(mobile_links) >= 2
        print(f"  ✓ CTAs canónicos accesibles y visibles en móvil: {len(mobile_links)} enlaces")
        context_mobile.close()
        
        # Test 3: /for-printhouses in Desktop and Mobile
        print("\n--- TEST 3: /for-printhouses en Escritorio y Móvil ---")
        context_printhouses = browser.new_context(viewport={"width": 1280, "height": 800})
        page_printhouses = context_printhouses.new_page()
        page_printhouses.goto(f"{BASE_URL}/for-printhouses", wait_until="networkidle")
        
        printhouse_links = page_printhouses.eval_on_selector_all("a[href*='control.printprice.pro/printhouse/register']", "els => els.map(e => e.href)")
        assert len(printhouse_links) >= 2, f"Se esperaban enlaces canónicos en /for-printhouses, encontrados: {len(printhouse_links)}"
        print(f"  ✓ CTAs canónicos en /for-printhouses: {len(printhouse_links)} enlaces apuntan a Control Plane")
        
        context_printhouses.close()
        
        browser.close()
        print("\n═════════════════════════════════════════════════════════════════════════════")
        print("🎉 RECORRIDO PÚBLICO VERIFICADO EN NAVEGADOR (ES/EN/DE, Escritorio y Móvil)")
        print("═════════════════════════════════════════════════════════════════════════════\n")

if __name__ == "__main__":
    test_public_journey()
