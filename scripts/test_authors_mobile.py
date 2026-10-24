import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        
        await page.goto("https://printprice.pro/for-authors", wait_until="networkidle")
        await asyncio.sleep(1)
        
        # Dismiss cookies
        try:
            cookie_btn = page.locator('text=Aceptar todas')
            if await cookie_btn.is_visible():
                await cookie_btn.click()
                await asyncio.sleep(0.5)
        except Exception:
            pass
            
        # Capture Spanish
        await page.screenshot(path="C:/Users/KIKE/.gemini/antigravity-ide/brain/0727c9fd-40fa-4e14-9d13-e1a204beb253/authors_mobile_es.png")
        
        # Switch to German
        await page.evaluate("""() => {
            localStorage.setItem('ppp_locale', 'de');
            window.dispatchEvent(new CustomEvent('ppp-locale-change', { detail: 'de' }));
        }""")
        await asyncio.sleep(1)
        await page.screenshot(path="C:/Users/KIKE/.gemini/antigravity-ide/brain/0727c9fd-40fa-4e14-9d13-e1a204beb253/authors_mobile_de.png")
        
        # Switch to English
        await page.evaluate("""() => {
            localStorage.setItem('ppp_locale', 'en');
            window.dispatchEvent(new CustomEvent('ppp-locale-change', { detail: 'en' }));
        }""")
        await asyncio.sleep(1)
        await page.screenshot(path="C:/Users/KIKE/.gemini/antigravity-ide/brain/0727c9fd-40fa-4e14-9d13-e1a204beb253/authors_mobile_en.png")
        
        # Inspect German h1 and buttons bounding boxes and text
        await page.evaluate("""() => {
            localStorage.setItem('ppp_locale', 'de');
            window.dispatchEvent(new CustomEvent('ppp-locale-change', { detail: 'de' }));
        }""")
        await asyncio.sleep(0.5)
        
        info = await page.evaluate("""() => {
            const h1 = document.querySelector('h1');
            const btns = Array.from(document.querySelectorAll('button, .btn')).map(b => ({
                text: (b.innerText || '').trim().replace(/\\n/g, ' '),
                w: Math.round(b.getBoundingClientRect().width),
                h: Math.round(b.getBoundingClientRect().height)
            }));
            return {
                h1_text: h1 ? h1.innerText.replace(/\\n/g, ' ') : null,
                h1_rect: h1 ? h1.getBoundingClientRect() : null,
                h1_fs: h1 ? window.getComputedStyle(h1).fontSize : null,
                h1_lh: h1 ? window.getComputedStyle(h1).lineHeight : null,
                btns: btns.slice(0, 10)
            };
        }""")
        
        print("German info:", info)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
