import asyncio
import os
import sys
from playwright.async_api import async_playwright

import tempfile
sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = os.environ.get("ARTIFACT_DIR", os.path.join(tempfile.gettempdir(), "printprice_audit"))
os.makedirs(ARTIFACT_DIR, exist_ok=True)

PAGES = [
    ("/for-authors", "authors"),
    ("/for-publishers", "publishers"),
    ("/for-printhouses", "printhouses"),
    ("/for-paper-suppliers", "suppliers"),
    ("/products/print", "print"),
    ("/products/preflight", "preflight")
]

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 375px
        context = await browser.new_context(
            viewport={"width": 375, "height": 812},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"
        )
        page = await context.new_page()

        # Cookie consent bypass
        await page.add_init_script('''() => {
            localStorage.setItem('ppp_consent_v1_audit', JSON.stringify({
                essential: true, analytics: true, timestamp: new Date().toISOString(), version: 'v1.1'
            }));
        }''')

        for path, name in PAGES:
            for lang in ["de", "es"]:
                url = f"https://printprice.pro{path}"
                await page.goto(url, wait_until="domcontentloaded")
                await page.evaluate('''([l]) => {
                    localStorage.setItem('ppp_locale', l);
                    document.cookie = "ppp_locale=" + l + "; path=/;";
                    window.dispatchEvent(new CustomEvent('ppp-locale-change', { detail: l }));
                }''', [lang])
                await asyncio.sleep(0.4)

                # Scroll to hero button container
                btn_container = page.locator('.hero-cta-group, .hero-btn, .action-cta-buttons, .preflight-tabs-selector').first
                if await btn_container.is_visible():
                    await btn_container.scroll_into_view_if_needed()
                    await asyncio.sleep(0.3)
                    shot_name = f"button_focus_{name}_{lang}.png"
                    await page.screenshot(path=os.path.join(ARTIFACT_DIR, shot_name), full_page=False)
                    print(f"Captured: {shot_name}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
