import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        
        for lang in ["es", "de", "en"]:
            await page.goto("https://printprice.pro/", wait_until="networkidle")
            await asyncio.sleep(0.5)
            # Dismiss cookies
            try:
                cookie_btn = page.locator('button:has-text("Aceptar todas"), button:has-text("Alle akzeptieren"), button:has-text("Accept all")')
                if await cookie_btn.is_visible():
                    await cookie_btn.click()
                    await asyncio.sleep(0.3)
            except Exception:
                pass
                
            await page.evaluate(f"""(l) => {{
                localStorage.setItem('ppp_locale', l);
                window.dispatchEvent(new CustomEvent('ppp-locale-change', {{ detail: l }}));
            }}""", lang)
            await asyncio.sleep(0.5)
            
            await page.screenshot(path=f"C:/Users/KIKE/.gemini/antigravity-ide/brain/0727c9fd-40fa-4e14-9d13-e1a204beb253/home_mobile_{lang}.png")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
