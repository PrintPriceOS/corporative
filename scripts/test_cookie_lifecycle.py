import asyncio
import json
import sys
from playwright.async_api import async_playwright

TARGET_URL = sys.argv[1] if len(sys.argv) > 1 else "https://printprice.pro"

async def run_cookie_audit():
    results = {
        "build_target": TARGET_URL,
        "tested_at": "2026-10-24T04:32:00Z",
        "states": {}
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Track network requests
        network_requests = []
        page.on("request", lambda r: network_requests.append({
            "url": r.url,
            "method": r.method,
            "resource_type": r.resource_type
        }))

        print("=== Step 1: Fresh Context (Antes de consentir) ===")
        await page.goto(TARGET_URL, wait_until="networkidle")
        await asyncio.sleep(2.0) # Wait for 1.2s banner timeout

        cookies_s1 = await context.cookies()
        storage_s1 = await page.evaluate("() => ({ local: { ...localStorage }, session: { ...sessionStorage } })")
        
        # Check banner visibility
        banner_visible = await page.is_visible("text=Preferencias de cookies") or await page.is_visible("text=Utilizamos cookies")
        
        results["states"]["1_before_consent"] = {
            "banner_visible": banner_visible,
            "cookies_count": len(cookies_s1),
            "cookies": cookies_s1,
            "localStorage_keys": list(storage_s1["local"].keys()),
            "localStorage_data": storage_s1["local"],
            "sessionStorage_keys": list(storage_s1["session"].keys()),
            "telemetry_history_present": "ppos_telemetry_history" in storage_s1["local"],
            "consent_stored": "ppp_consent_v1_audit" in storage_s1["local"],
            "external_requests": [r["url"] for r in network_requests if not r["url"].startswith("http://localhost:3033")]
        }
        print(f"  Cookies count: {len(cookies_s1)}")
        print(f"  LocalStorage keys: {list(storage_s1['local'].keys())}")
        print(f"  Telemetry history present: {'ppos_telemetry_history' in storage_s1['local']}")
        print(f"  External requests: {len(results['states']['1_before_consent']['external_requests'])}")

        print("\n=== Step 2: Rechazar no esenciales ===")
        # Click "Rechazar no esenciales"
        reject_btn = page.locator("button:has-text('Rechazar no esenciales'), button:has-text('Reject non-essential')")
        if await reject_btn.count() > 0:
            await reject_btn.first.click()
            await asyncio.sleep(0.5)

        storage_s2 = await page.evaluate("() => ({ local: { ...localStorage }, session: { ...sessionStorage } })")
        cookies_s2 = await context.cookies()

        # Trigger some user interactions (scroll & click)
        await page.evaluate("() => window.scrollTo(0, 500)")
        await asyncio.sleep(0.5)
        storage_s2_after = await page.evaluate("() => ({ local: { ...localStorage } })")

        results["states"]["2_rejected"] = {
            "cookies_count": len(cookies_s2),
            "localStorage_keys": list(storage_s2["local"].keys()),
            "consent_value": storage_s2["local"].get("ppp_consent_v1_audit"),
            "telemetry_history_after_reject_and_scroll": storage_s2_after["local"].get("ppos_telemetry_history")
        }
        print(f"  Consent stored: {storage_s2['local'].get('ppp_consent_v1_audit')}")
        print(f"  Telemetry history after interaction: {storage_s2_after['local'].get('ppos_telemetry_history')}")

        print("\n=== Step 3: Aceptar por categorías (Opt-in analytics) ===")
        # Reopen banner via custom event (same as footer button)
        await page.evaluate("() => window.dispatchEvent(new CustomEvent('ppp_reopen_consent'))")
        await asyncio.sleep(0.5)

        # In customize mode, toggle analytics checkbox on and save
        checkbox = page.locator("input[type='checkbox']")
        if await checkbox.count() > 0:
            if not await checkbox.first.is_checked():
                await checkbox.first.check()
            save_btn = page.locator("button:has-text('Guardar preferencias'), button:has-text('Save preferences')")
            await save_btn.first.click()
            await asyncio.sleep(0.5)

        # Trigger interaction now that consent is given
        await page.evaluate("() => { if (window.trackEvent) window.trackEvent('test_interactive_event', { step: 'opt_in_test' }); }")
        await asyncio.sleep(0.5)
        storage_s3 = await page.evaluate("() => ({ local: { ...localStorage } })")

        results["states"]["3_accepted_category"] = {
            "consent_value": storage_s3["local"].get("ppp_consent_v1_audit"),
            "telemetry_history": storage_s3["local"].get("ppos_telemetry_history")
        }
        print(f"  Consent stored: {storage_s3['local'].get('ppp_consent_v1_audit')}")
        print(f"  Telemetry history populated: {storage_s3['local'].get('ppos_telemetry_history') is not None}")

        print("\n=== Step 4: Retirar consentimiento (Revoke) ===")
        # Reopen and reject/revoke
        await page.evaluate("() => window.dispatchEvent(new CustomEvent('ppp_reopen_consent'))")
        await asyncio.sleep(0.5)

        # Uncheck analytics and save
        if await checkbox.count() > 0:
            if await checkbox.first.is_checked():
                await checkbox.first.uncheck()
            save_btn = page.locator("button:has-text('Guardar preferencias'), button:has-text('Save preferences')")
            await save_btn.first.click()
            await asyncio.sleep(0.5)

        # Trigger further event to verify it's blocked and past data is purged
        await page.evaluate("() => { if (window.trackEvent) window.trackEvent('blocked_event_after_revoke', {}); }")
        await asyncio.sleep(0.5)
        storage_s4 = await page.evaluate("() => ({ local: { ...localStorage } })")

        results["states"]["4_revoked"] = {
            "consent_value": storage_s4["local"].get("ppp_consent_v1_audit"),
            "telemetry_history_after_revoke": storage_s4["local"].get("ppos_telemetry_history")
        }
        print(f"  Consent value: {storage_s4['local'].get('ppp_consent_v1_audit')}")
        print(f"  Telemetry history purged: {storage_s4['local'].get('ppos_telemetry_history') is None}")

        print("\n=== Step 5: Recargar y comprobar persistencia ===")
        await page.reload(wait_until="networkidle")
        await asyncio.sleep(2.0) # Wait beyond 1.2s to ensure banner does NOT reappear

        banner_visible_s5 = await page.is_visible("text=Preferencias de cookies") or await page.is_visible("text=Utilizamos cookies")
        storage_s5 = await page.evaluate("() => ({ local: { ...localStorage } })")

        results["states"]["5_after_reload"] = {
            "banner_reappeared": banner_visible_s5,
            "consent_value": storage_s5["local"].get("ppp_consent_v1_audit"),
            "telemetry_history": storage_s5["local"].get("ppos_telemetry_history")
        }
        print(f"  Banner reappeared: {banner_visible_s5} (Expected: False)")
        print(f"  Consent persisted: {storage_s5['local'].get('ppp_consent_v1_audit')}")

        await browser.close()

    # Save results to file
    with open("scripts/cookie_lifecycle_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("\nResults successfully saved to scripts/cookie_lifecycle_results.json")

if __name__ == "__main__":
    asyncio.run(run_cookie_audit())
