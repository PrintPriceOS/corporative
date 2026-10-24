import asyncio
from playwright.async_api import async_playwright

async def inspect():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        
        pages_to_test = ["/for-authors", "/", "/products", "/for-publishers", "/for-printhouses", "/for-paper-suppliers"]
        langs = ["es", "en", "de"]
        
        for path in pages_to_test:
            for lang in langs:
                url = f"http://localhost:3010{path}"
                await page.goto(url, wait_until="domcontentloaded")
                
                # Set language in localStorage
                await page.evaluate(f'''() => {{
                    localStorage.setItem('printprice_locale', '{lang}');
                }}''')
                await page.goto(url, wait_until="networkidle")
                await asyncio.sleep(0.3)
                
                # Check headings and buttons for line wrap and overflow
                res = await page.evaluate('''() => {
                    const docWidth = document.documentElement.clientWidth;
                    const issues = [];
                    
                    // Check h1, h2, buttons
                    document.querySelectorAll('h1, h2, h3, button, .btn').forEach(el => {
                        const rect = el.getBoundingClientRect();
                        const text = (el.innerText || '').trim();
                        if (!text || rect.height === 0) return;
                        
                        // Check overflow
                        if (rect.right > docWidth + 1) {
                            issues.push({
                                type: 'OVERFLOW',
                                tag: el.tagName,
                                text: text.slice(0, 40),
                                overflow: rect.right - docWidth
                            });
                        }
                        
                        // Check line count estimation
                        const style = window.getComputedStyle(el);
                        const lh = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
                        const lineCount = Math.round(rect.height / lh);
                        
                        // Check if last line has only 1 short word (orphan)
                        const words = text.split(/\\s+/);
                        if (words.length > 2 && lineCount > 1) {
                            // Check single word trailing line
                        }
                        
                        if (el.tagName === 'BUTTON' || el.classList.contains('btn') || el.closest('button')) {
                            if (lineCount > 1) {
                                issues.push({
                                    type: 'BUTTON_MULTILINE',
                                    text: text,
                                    height: rect.height,
                                    lineCount: lineCount
                                });
                            }
                        }
                        
                        if (el.tagName === 'H1') {
                            issues.push({
                                type: 'H1_INFO',
                                text: text.replace(/\\n/g, ' '),
                                height: rect.height,
                                fontSize: style.fontSize,
                                lineHeight: style.lineHeight,
                                lineCount: lineCount
                            });
                        }
                    });
                    
                    return issues;
                }''')
                
                # Save screenshot of hero
                clean = path.replace('/', '_') or '_home'
                shot_path = f"C:/Users/KIKE/.gemini/antigravity-ide/brain/0727c9fd-40fa-4e14-9d13-e1a204beb253/mobile_{clean}_{lang}.png"
                await page.screenshot(path=shot_path, full_page=False)
                
                print(f"=== {path} [{lang}] ===")
                for item in res:
                    print(f"  {item}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(inspect())
