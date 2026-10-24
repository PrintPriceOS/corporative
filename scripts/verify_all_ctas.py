import asyncio
import os
import sys
from playwright.async_api import async_playwright

sys.stdout.reconfigure(encoding='utf-8')

PAGES = [
    ("/", "home"),
    ("/for-authors", "for_authors"),
    ("/for-publishers", "for_publishers"),
    ("/for-printhouses", "for_printhouses"),
    ("/for-paper-suppliers", "for_paper_suppliers"),
    ("/products", "products_hub"),
    ("/products/print", "products_print"),
    ("/products/preflight", "products_preflight"),
    ("/products/budget", "products_budget"),
    ("/company", "company"),
    ("/contact/partner", "contact_partner")
]

import tempfile
ARTIFACT_DIR = os.environ.get("ARTIFACT_DIR", os.path.join(tempfile.gettempdir(), "printprice_audit"))
os.makedirs(ARTIFACT_DIR, exist_ok=True)

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Desktop 1440x900 like user screenshot
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900}
        )
        page = await context.new_page()

        # Cookie consent bypass
        await page.add_init_script('''() => {
            localStorage.setItem('ppp_consent_v1_audit', JSON.stringify({
                essential: true, analytics: true, timestamp: new Date().toISOString(), version: 'v1.1'
            }));
        }''')

        results = []

        for path, name in PAGES:
            url = f"https://printprice.pro{path}"
            try:
                await page.goto(url, wait_until="domcontentloaded", timeout=25000)
                await asyncio.sleep(0.5)

                cta_info = await page.evaluate('''() => {
                    const cta = document.querySelector('[data-monolith-section="action-cta"]');
                    if (!cta) return { found: false };
                    
                    const canvas = cta.querySelector('canvas');
                    const title = (cta.querySelector('h2') || {}).innerText || '';
                    const buttons = Array.from(cta.querySelectorAll('button, .btn, a')).map(b => (b.innerText || '').trim()).filter(Boolean);
                    
                    return {
                        found: true,
                        hasCanvas: !!canvas,
                        title: title.slice(0, 40),
                        buttonCount: buttons.length,
                        buttons: buttons.slice(0, 3)
                    };
                }''')

                print(f"[{path}] CTA Found: {cta_info['found']}, Has Grid Canvas: {cta_info.get('hasCanvas')}, Title: '{cta_info.get('title')}'")
                results.append({"path": path, **cta_info})

                # Scroll to CTA and capture screenshot
                cta_locator = page.locator('[data-monolith-section="action-cta"]').first
                if await cta_locator.is_visible():
                    await cta_locator.scroll_into_view_if_needed()
                    await asyncio.sleep(0.4)
                    shot_name = f"cta_grid_verified_{name}.png"
                    shot_path = os.path.join(ARTIFACT_DIR, shot_name)
                    await page.screenshot(path=shot_path, full_page=False)
                    print(f"   [SCREENSHOT] Saved: {shot_name}")

            except Exception as e:
                print(f"[{path}] Error: {str(e)[:60]}")

        await context.close()
        await browser.close()

        print("\n===============================")
        print(f"VERIFICATION COMPLETE: {sum(1 for r in results if r.get('hasCanvas'))}/{len(PAGES)} pages verified with animated grid canvas.")
        print("===============================")

if __name__ == "__main__":
    asyncio.run(run())
