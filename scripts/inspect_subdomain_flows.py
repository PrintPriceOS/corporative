import asyncio
import os
import sys
from playwright.async_api import async_playwright

import tempfile
sys.stdout.reconfigure(encoding='utf-8')
ARTIFACT_DIR = os.environ.get("ARTIFACT_DIR", os.path.join(tempfile.gettempdir(), "printprice_audit"))
os.makedirs(ARTIFACT_DIR, exist_ok=True)

TARGETS = [
    ("budget", "https://budget.printprice.pro/"),
    ("preflight", "https://preflight.printprice.pro/"),
    ("mockup", "https://mockup.printprice.pro/")
]

async def inspect():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={"width": 1280, "height": 800})
        page = await context.new_page()

        for name, url in TARGETS:
            print(f"\n--- INSPECTING {name.upper()}: {url} ---")
            try:
                resp = await page.goto(url, wait_until="networkidle", timeout=30000)
                print(f"Status: {resp.status if resp else 'N/A'}")
                print(f"Final URL: {page.url}")
                title = await page.title()
                print(f"Title: {title}")

                # Check for forms, login inputs, auth prompts
                auth_info = await page.evaluate('''() => {
                    const inputs = Array.from(document.querySelectorAll('input')).map(i => ({
                        type: i.type,
                        name: i.name,
                        id: i.id,
                        placeholder: i.placeholder
                    }));
                    const buttons = Array.from(document.querySelectorAll('button, a')).map(b => (b.innerText || '').trim()).filter(Boolean);
                    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => (h.innerText || '').trim()).filter(Boolean);
                    const textSample = (document.body.innerText || '').slice(0, 300).replace(/\\s+/g, ' ');

                    const hasPasswordField = inputs.some(i => i.type === 'password');
                    const hasEmailField = inputs.some(i => i.type === 'email' || i.name.includes('email') || (i.placeholder && i.placeholder.toLowerCase().includes('email')));

                    return {
                        hasPasswordField,
                        hasEmailField,
                        inputsCount: inputs.length,
                        inputs: inputs.slice(0, 5),
                        headings: headings.slice(0, 5),
                        buttons: buttons.slice(0, 10),
                        textSample
                    };
                }''')

                print(f"Has Password: {auth_info['hasPasswordField']}, Has Email: {auth_info['hasEmailField']}")
                print(f"Headings: {auth_info['headings']}")
                print(f"Buttons: {auth_info['buttons'][:6]}")
                print(f"Text sample: {auth_info['textSample'][:180]}")

                # Save screenshot
                shot_path = os.path.join(ARTIFACT_DIR, f"real_flow_{name}.png")
                await page.screenshot(path=shot_path, full_page=False)
                print(f"Screenshot saved: {shot_path}")

            except Exception as e:
                print(f"Error inspecting {name}: {e}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(inspect())
