import asyncio
from playwright.async_api import async_playwright

PAGES = ["/", "/for-authors", "/for-publishers", "/for-printhouses", "/for-paper-suppliers", "/products", "/contact"]
LANGS = ["es", "de", "en"]

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Test 375px (iPhone standard) and 360px (Android standard)
        for w in [375, 360]:
            page = await browser.new_page(viewport={"width": w, "height": 812})
            
            for lang in LANGS:
                for path in PAGES:
                    url = f"http://localhost:3010{path}"
                    await page.goto(url)
                    
                    # Set ppp_locale
                    await page.evaluate(f'''(l) => {{
                        localStorage.setItem('ppp_locale', l);
                        document.cookie = "ppp_locale=" + l + "; path=/";
                    }}''', lang)
                    
                    # Reload so state picks up the locale
                    await page.goto(url, wait_until="networkidle")
                    await asyncio.sleep(0.5)
                    
                    # Accept cookies
                    try:
                        btn = page.locator('button:has-text("Aceptar"), button:has-text("Accept"), button:has-text("Akzeptieren")')
                        if await btn.first.is_visible():
                            await btn.first.click()
                            await asyncio.sleep(0.2)
                    except Exception:
                        pass
                    
                    # Check for text overflow, button multi-line, and orphan words in headings
                    analysis = await page.evaluate('''(docW) => {
                        const problems = [];
                        
                        // 1. Horizontal overflow
                        document.querySelectorAll('*').forEach(el => {
                            const r = el.getBoundingClientRect();
                            if (r.right > docW + 2) {
                                problems.push({
                                    kind: 'OVERFLOW',
                                    tag: el.tagName,
                                    text: (el.innerText || '').slice(0, 30),
                                    right: Math.round(r.right),
                                    docW: docW
                                });
                            }
                        });
                        
                        // 2. Buttons
                        document.querySelectorAll('button, .btn, a.btn, a[class*="btn"]').forEach(el => {
                            const r = el.getBoundingClientRect();
                            const text = (el.innerText || '').trim();
                            if (!text || r.height === 0) return;
                            const lh = parseFloat(window.getComputedStyle(el).lineHeight) || 20;
                            const lines = Math.round(r.height / lh);
                            if (lines > 1 || r.height > 60) {
                                problems.push({
                                    kind: 'BUTTON_WRAP',
                                    tag: el.tagName,
                                    text: text.replace(/\\s+/g, ' ').slice(0, 40),
                                    lines: lines,
                                    height: Math.round(r.height)
                                });
                            }
                        });
                        
                        // 3. Headings
                        document.querySelectorAll('h1, h2, h3').forEach(el => {
                            const r = el.getBoundingClientRect();
                            const text = (el.innerText || '').trim();
                            if (!text || r.height === 0) return;
                            const style = window.getComputedStyle(el);
                            const fs = parseFloat(style.fontSize);
                            const lh = parseFloat(style.lineHeight) || (fs * 1.2);
                            const lines = Math.round(r.height / lh);
                            
                            // Check single word trailing or huge font size on mobile
                            const words = text.split(/\\s+/);
                            if (fs >= 36) {
                                problems.push({
                                    kind: 'HEADING_TOO_BIG',
                                    tag: el.tagName,
                                    fs: Math.round(fs),
                                    text: text.slice(0, 40)
                                });
                            }
                            if (lines >= 3 && words.length > 2) {
                                problems.push({
                                    kind: 'HEADING_MANY_LINES',
                                    tag: el.tagName,
                                    lines: lines,
                                    fs: Math.round(fs),
                                    text: text.slice(0, 40)
                                });
                            }
                        });
                        
                        return problems;
                    }''', w)
                    import tempfile
                    artifact_dir = os.environ.get("ARTIFACT_DIR", os.path.join(tempfile.gettempdir(), "printprice_audit"))
                    os.makedirs(artifact_dir, exist_ok=True)
                    shot_name = os.path.join(artifact_dir, f"shot_{w}_{lang}{path.replace('/', '_') or '_home'}.png")
                    await page.screenshot(path=shot_name, full_page=False)
                    
                    if analysis:
                        print(f"[{w}px][{lang}]{path}:")
                        for p in analysis[:5]:
                            print(f"   {p}")
            await page.close()
        await browser.close()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(run())
