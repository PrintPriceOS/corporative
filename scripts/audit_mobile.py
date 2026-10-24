import asyncio
import os
from playwright.async_api import async_playwright

PAGES = [
    "/",
    "/products",
    "/products/preflight",
    "/products/print",
    "/for-authors",
    "/for-publishers",
    "/for-printhouses",
    "/for-paper-suppliers",
    "/contact",
]

LANGUAGES = ["es", "en", "de"]

import tempfile
OUT_DIR = os.environ.get("ARTIFACT_DIR", os.path.join(tempfile.gettempdir(), "printprice_audit", "mobile_audit"))
os.makedirs(OUT_DIR, exist_ok=True)

async def audit():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # Test mobile viewport 390x844 (standard iPhone 12/13/14) and 360x800 (standard Android)
        for width, height in [(390, 844), (360, 800)]:
            page = await browser.new_page(viewport={"width": width, "height": height})
            
            for lang in LANGUAGES:
                for path in PAGES:
                    url = f"https://printprice.pro{path}"
                    try:
                        await page.goto(url, wait_until="networkidle")
                        
                        # Set language if needed
                        current_lang = await page.evaluate("() => localStorage.getItem('printprice_locale') || 'es'")
                        if current_lang != lang:
                            await page.evaluate(f"() => {{ localStorage.setItem('printprice_locale', '{lang}'); window.location.reload(); }}")
                            await page.wait_for_load_state("networkidle")
                            await asyncio.sleep(0.5)

                        # Dismiss cookie banner
                        try:
                            cookie_btn = page.locator('button:has-text("Aceptar"), button:has-text("Accept"), button:has-text("Akzeptieren")').first
                            if await cookie_btn.is_visible():
                                await cookie_btn.click()
                                await asyncio.sleep(0.3)
                        except Exception:
                            pass

                        # Check for horizontal overflow on body/html/elements
                        overflow_info = await page.evaluate('''() => {
                            const results = [];
                            const docWidth = document.documentElement.clientWidth;
                            
                            // Check all elements
                            const all = document.querySelectorAll('*');
                            for (const el of all) {
                                const rect = el.getBoundingClientRect();
                                if (rect.right > docWidth + 2) {
                                    results.push({
                                        tag: el.tagName,
                                        class: el.className,
                                        id: el.id,
                                        text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' '),
                                        rectRight: rect.right,
                                        docWidth: docWidth,
                                        overflow: rect.right - docWidth
                                    });
                                }
                            }
                            return results.slice(0, 10);
                        }''')

                        # Check headings (h1, h2, h3) and buttons
                        elements_info = await page.evaluate('''() => {
                            const items = [];
                            const headings = document.querySelectorAll('h1, h2, h3, .technical-title, button, .btn');
                            for (const el of headings) {
                                const rect = el.getBoundingClientRect();
                                const text = (el.innerText || '').trim();
                                if (!text || rect.height === 0 || rect.width === 0) continue;
                                
                                // Check if button has multiple lines
                                const isButton = el.tagName === 'BUTTON' || el.classList.contains('btn') || el.closest('button');
                                const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) || 20;
                                const fontSize = parseFloat(window.getComputedStyle(el).fontSize) || 16;
                                
                                items.push({
                                    tag: el.tagName,
                                    isBtn: isButton,
                                    text: text.slice(0, 50).replace(/\\n/g, ' '),
                                    width: Math.round(rect.width),
                                    height: Math.round(rect.height),
                                    fontSize: Math.round(fontSize),
                                    lineHeight: Math.round(lineHeight)
                                });
                            }
                            return items;
                        }''')

                        clean_path = path.replace('/', '_') or '_home'
                        shot_path = f"{OUT_DIR}/{width}_{lang}{clean_path}.png"
                        await page.screenshot(path=shot_path, full_page=False)

                        if overflow_info:
                            print(f"[OVERFLOW] {width}px | {lang} | {path}: {len(overflow_info)} overflowing elements!")
                            for o in overflow_info[:3]:
                                print(f"   -> {o['tag']}.{o['class']}: text='{o['text']}' overflow={o['overflow']}px")

                    except Exception as e:
                        print(f"Error checking {url} ({lang}): {e}")

            await page.close()
        await browser.close()
    print("Audit finished!")

if __name__ == "__main__":
    asyncio.run(audit())
