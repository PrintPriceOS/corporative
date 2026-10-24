import asyncio
import os
import sys
from playwright.async_api import async_playwright

# Ensure stdout uses UTF-8 without crashing on Windows console
sys.stdout.reconfigure(encoding='utf-8')

PAGES = [
    "/",
    "/for-authors",
    "/for-publishers",
    "/for-printhouses",
    "/for-paper-suppliers",
    "/products/print",
    "/products/preflight"
]
LANGS = ["es", "de", "en"]
VIEWPORTS = [
    {"name": "iPhone_375", "width": 375, "height": 812},
    {"name": "Android_360", "width": 360, "height": 800}
]

ARTIFACT_DIR = r"C:\Users\KIKE\.gemini\antigravity-ide\brain\0727c9fd-40fa-4e14-9d13-e1a204beb253"

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        all_issues = []
        screenshot_count = 0

        for vp in VIEWPORTS:
            context = await browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
            )
            page = await context.new_page()

            # Pre-inject cookie consent
            await page.add_init_script('''() => {
                localStorage.setItem('ppp_consent_v1_audit', JSON.stringify({
                    essential: true,
                    analytics: true,
                    timestamp: new Date().toISOString(),
                    version: 'v1.1'
                }));
            }''')

            for lang in LANGS:
                for path in PAGES:
                    url = f"https://printprice.pro{path}"
                    try:
                        await page.goto(url, wait_until="domcontentloaded", timeout=30000)
                        
                        # Set locale
                        await page.evaluate('''([l]) => {
                            localStorage.setItem('ppp_locale', l);
                            document.cookie = "ppp_locale=" + l + "; path=/; max-age=31536000";
                            window.dispatchEvent(new CustomEvent('ppp-locale-change', { detail: l }));
                        }''', [lang])
                        
                        await asyncio.sleep(0.4)
                        
                        # Analyze page for mobile responsiveness
                        result = await page.evaluate('''(docW) => {
                            const issues = [];
                            
                            // 1. Horizontal overflows
                            document.querySelectorAll('*').forEach(el => {
                                const r = el.getBoundingClientRect();
                                if (r.right > docW + 2) {
                                    // Ignore hidden or svg defs
                                    if (r.width > 0 && r.height > 0 && window.getComputedStyle(el).overflow !== 'hidden') {
                                        const text = (el.innerText || '').slice(0, 30).trim();
                                        issues.push({
                                            type: 'OVERFLOW',
                                            tag: el.tagName,
                                            class: el.className ? el.className.toString().slice(0, 30) : '',
                                            text: text,
                                            right: Math.round(r.right),
                                            docW: docW
                                        });
                                    }
                                }
                            });
                            
                            // 2. Buttons wrapping into multiple lines
                            document.querySelectorAll('button, a.btn, a[class*="hero-btn"], a[class*="action-cta-btn"]').forEach(el => {
                                const r = el.getBoundingClientRect();
                                const text = (el.innerText || '').trim();
                                if (!text || r.height === 0 || r.width === 0) return;
                                
                                const cs = window.getComputedStyle(el);
                                if (cs.display === 'none' || cs.visibility === 'hidden') return;
                                
                                const lh = parseFloat(cs.lineHeight) || 20;
                                // If height is much greater than single line button height + padding
                                // Single line with padding 0.85rem is typically 42-48px.
                                // If it wraps to 2 lines, height will exceed 58px.
                                if (r.height > 58) {
                                    issues.push({
                                        type: 'BUTTON_WRAP',
                                        tag: el.tagName,
                                        class: el.className ? el.className.toString().slice(0, 30) : '',
                                        text: text.replace(/\\s+/g, ' ').slice(0, 50),
                                        height: Math.round(r.height),
                                        width: Math.round(r.width)
                                    });
                                }
                            });
                            
                            // 3. Headings - check for excessive line counts or single orphan words
                            const headingSummaries = [];
                            document.querySelectorAll('h1').forEach(el => {
                                const r = el.getBoundingClientRect();
                                const text = (el.innerText || '').trim();
                                if (!text || r.height === 0) return;
                                const cs = window.getComputedStyle(el);
                                const fs = parseFloat(cs.fontSize);
                                const lh = parseFloat(cs.lineHeight) || (fs * 1.15);
                                const lines = Math.round(r.height / lh);
                                
                                headingSummaries.push({
                                    text: text.replace(/\\s+/g, ' ').slice(0, 60),
                                    fontSize: Math.round(fs),
                                    lines: lines,
                                    height: Math.round(r.height)
                                });
                            });
                            
                            return { issues, headingSummaries };
                        }''', vp["width"])
                        
                        if result["issues"]:
                            print(f"[{vp['name']}][{lang}][{path}] Issues found: {len(result['issues'])}")
                            for iss in result["issues"]:
                                print(f"   -> {iss['type']}: {iss['text']} (h={iss.get('height')}, r={iss.get('right')})")
                                all_issues.append({"vp": vp["name"], "lang": lang, "path": path, **iss})
                        else:
                            h1_info = result["headingSummaries"][0] if result["headingSummaries"] else {"text": "N/A", "lines": 0, "fontSize": 0}
                            print(f"[{vp['name']}][{lang}][{path}] OK! H1 ({h1_info['fontSize']}px, {h1_info['lines']} lines): '{h1_info['text']}'")

                        # Capture screenshot for authors, print, and home in all 3 languages on iPhone 375
                        if vp["width"] == 375 and path in ["/", "/for-authors", "/products/print"]:
                            clean_name = path.replace("/", "").replace("-", "_") or "home"
                            shot_name = f"mobile_audit_{clean_name}_{lang}.png"
                            shot_path = os.path.join(ARTIFACT_DIR, shot_name)
                            await page.screenshot(path=shot_path, full_page=False)
                            screenshot_count += 1
                            print(f"   [SCREENSHOT] Saved: {shot_name}")

                    except Exception as e:
                        print(f"[{vp['name']}][{lang}][{path}] Error: {str(e)[:60]}")

            await context.close()
        
        await browser.close()
        
        print("\n===============================")
        print(f"AUDIT COMPLETE. Total issues: {len(all_issues)}, Screenshots taken: {screenshot_count}")
        print("===============================")

if __name__ == "__main__":
    asyncio.run(run())
