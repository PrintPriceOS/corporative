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

import tempfile
ARTIFACT_DIR = os.environ.get("ARTIFACT_DIR", os.path.join(tempfile.gettempdir(), "printprice_audit"))
os.makedirs(ARTIFACT_DIR, exist_ok=True)

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
                            
                            // 1. Page horizontal overflow
                            const bodyScroll = document.documentElement.scrollWidth;
                            if (bodyScroll > docW + 2) {
                                issues.push({
                                    type: 'PAGE_OVERFLOW',
                                    scrollWidth: bodyScroll,
                                    clientWidth: docW
                                });
                            }
                            
                            // 2. Buttons wrapping into multiple lines
                            // Exclude elements inside horizontal scrollable containers or hidden
                            document.querySelectorAll('button, a.btn, a[class*="hero-btn"], a[class*="action-cta-btn"], .preflight-tab-btn').forEach(el => {
                                const r = el.getBoundingClientRect();
                                const text = (el.innerText || '').trim();
                                if (!text || r.height === 0 || r.width === 0) return;
                                
                                const cs = window.getComputedStyle(el);
                                if (cs.display === 'none' || cs.visibility === 'hidden') return;
                                
                                // Check if button height indicates multiple wrapped lines
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
                            
                            // 3. Headings - check font size and line count
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
                                print(f"   -> {iss['type']}: {iss.get('text', '')} (h={iss.get('height')})")
                                all_issues.append({"vp": vp["name"], "lang": lang, "path": path, **iss})
                        else:
                            h1_info = result["headingSummaries"][0] if result["headingSummaries"] else {"text": "N/A", "lines": 0, "fontSize": 0}
                            print(f"[{vp['name']}][{lang}][{path}] PASS! H1 ({h1_info['fontSize']}px, {h1_info['lines']}L): '{h1_info['text']}'")

                        # Capture screenshot of Hero buttons and CTA
                        if vp["width"] == 375 and path in ["/for-authors", "/for-printhouses", "/products/print", "/products/preflight"]:
                            clean_name = path.replace("/", "").replace("-", "_")
                            shot_name = f"mobile_verified_{clean_name}_{lang}.png"
                            shot_path = os.path.join(ARTIFACT_DIR, shot_name)
                            await page.screenshot(path=shot_path, full_page=False)
                            screenshot_count += 1

                    except Exception as e:
                        print(f"[{vp['name']}][{lang}][{path}] Error: {str(e)[:60]}")

            await context.close()
        
        await browser.close()
        
        print("\n===============================")
        print(f"FINAL AUDIT SUMMARY: {len(all_issues)} issues found across {len(VIEWPORTS) * len(LANGS) * len(PAGES)} tests.")
        print(f"Verified Screenshots saved: {screenshot_count}")
        print("===============================")

if __name__ == "__main__":
    asyncio.run(run())
