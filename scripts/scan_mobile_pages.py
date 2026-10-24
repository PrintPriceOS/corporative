import asyncio
from playwright.async_api import async_playwright

PAGES = [
    "/",
    "/for-authors",
    "/for-publishers",
    "/for-printhouses",
    "/for-paper-suppliers",
    "/products",
    "/products/preflight",
    "/products/print",
    "/contact"
]

LANGS = ["es", "de", "en"]

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 375, "height": 812})
        
        # Pre-set consent in context
        await page.goto("https://printprice.pro")
        await page.evaluate("""() => {
            localStorage.setItem('ppp_consent_v1_audit', JSON.stringify({
                essential: true, analytics: true, timestamp: new Date().toISOString(), version: 'v1.1'
            }));
        }""")
        
        results = []
        for path in PAGES:
            for lang in LANGS:
                url = f"https://printprice.pro{path}"
                await page.goto(url, wait_until="networkidle")
                await page.evaluate(f"""(l) => {{
                    localStorage.setItem('ppp_locale', l);
                    window.dispatchEvent(new CustomEvent('ppp-locale-change', {{ detail: l }}));
                }}""", lang)
                await asyncio.sleep(0.4)
                
                # Check headings and buttons
                page_data = await page.evaluate("""() => {
                    const data = [];
                    // Check h1, h2, h3
                    document.querySelectorAll('h1, h2, h3, button, .btn').forEach(el => {
                        const r = el.getBoundingClientRect();
                        const t = (el.innerText || '').trim();
                        if (!t || r.height === 0 || r.width === 0) return;
                        
                        const isBtn = el.tagName === 'BUTTON' || el.classList.contains('btn') || el.closest('button');
                        const style = window.getComputedStyle(el);
                        const fs = parseFloat(style.fontSize);
                        const lh = parseFloat(style.lineHeight) || fs * 1.2;
                        const lines = Math.round(r.height / lh);
                        
                        // Check if text has trailing orphan (last line has 1 short word)
                        const words = t.split(/\\s+/);
                        
                        data.push({
                            tag: el.tagName,
                            isBtn: isBtn,
                            text: t.replace(/\\s+/g, ' ').slice(0, 60),
                            w: Math.round(r.width),
                            h: Math.round(r.height),
                            fs: Math.round(fs),
                            lh: Math.round(lh),
                            lines: lines,
                            wordCount: words.length
                        });
                    });
                    return data;
                }""")
                
                # Check for buttons wrapping
                btn_wraps = [d for d in page_data if d['isBtn'] and d['lines'] > 1]
                # Check for giant h1s or h1 with many lines
                h1_issues = [d for d in page_data if d['tag'] == 'H1']
                
                clean = path.replace('/', '_') or '_home'
                shot_path = f"C:/Users/KIKE/.gemini/antigravity-ide/brain/0727c9fd-40fa-4e14-9d13-e1a204beb253/shot_{clean}_{lang}.png"
                await page.screenshot(path=shot_path, full_page=False)
                
                results.append({
                    "path": path,
                    "lang": lang,
                    "btn_wraps": btn_wraps,
                    "h1": h1_issues
                })
                
        await browser.close()
        
        for r in results:
            print(f"=== {r['path']} [{r['lang']}] ===")
            if r['btn_wraps']:
                print("  Wrapped buttons:")
                for b in r['btn_wraps']:
                    print(f"    - '{b['text']}' (lines: {b['lines']}, h: {b['h']}px, fs: {b['fs']}px)")
            if r['h1']:
                for h in r['h1']:
                    print(f"  H1: '{h['text']}' (lines: {h['lines']}, fs: {h['fs']}px, lh: {h['lh']}px)")

if __name__ == "__main__":
    asyncio.run(run())
