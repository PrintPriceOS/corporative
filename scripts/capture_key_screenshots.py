import os
import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
sys.stderr.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

BASE_URL = "http://localhost:3010"
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "..", "docs", "implementation", "corporate-stakeholder-experience", "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

TARGETS = [
    {"name": "Home Desktop", "path": "/", "width": 1440, "height": 900, "filename": "home_1440x900.png"},
    {"name": "Home Mobile", "path": "/", "width": 390, "height": 844, "filename": "home_390x844.png"},
    {"name": "Preflight Desktop", "path": "/products/preflight", "width": 1440, "height": 900, "filename": "preflight_1440x900.png"},
    {"name": "Preflight Mobile", "path": "/products/preflight", "width": 390, "height": 844, "filename": "preflight_390x844.png"},
    {"name": "For Authors Desktop", "path": "/for-authors", "width": 1440, "height": 900, "filename": "for_authors_1440x900.png"},
    {"name": "For Authors Mobile", "path": "/for-authors", "width": 390, "height": 844, "filename": "for_authors_390x844.png"},
    {"name": "Print It Marketplace Desktop", "path": "/products/print", "width": 1440, "height": 900, "filename": "print_it_1440x900.png"},
    {"name": "Print It Marketplace Mobile", "path": "/products/print", "width": 390, "height": 844, "filename": "print_it_390x844.png"},
]

def main():
    print(f"Connecting to {BASE_URL} for targeted screenshot capture...", flush=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        for t in TARGETS:
            context = browser.new_context(
                viewport={"width": t["width"], "height": t["height"]},
                device_scale_factor=1,
            )
            page = context.new_page()
            url = f"{BASE_URL}{t['path']}"
            print(f"Capturing {t['name']} ({url}) at {t['width']}x{t['height']}...", flush=True)
            page.goto(url, wait_until="networkidle", timeout=15000)
            page.wait_for_timeout(500)
            
            out_path = os.path.join(SCREENSHOTS_DIR, t["filename"])
            page.screenshot(path=out_path, full_page=False)
            print(f"  -> Saved: {out_path}", flush=True)
            context.close()
            
        # Additional: Capture Home Tab 3 (PRINT IT) Comparison Table
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        page.wait_for_timeout(500)
        
        # Scroll to comparison section and click Tab 3
        tab3_btn = page.locator('button:has-text("PRINT IT")').first
        if tab3_btn.count() > 0:
            tab3_btn.scroll_into_view_if_needed()
            page.wait_for_timeout(300)
            tab3_btn.click()
            page.wait_for_timeout(500)
            out_tab3 = os.path.join(SCREENSHOTS_DIR, "home_tab3_printit_1440x900.png")
            page.screenshot(path=out_tab3, full_page=False)
            print(f"  -> Saved Tab 3 comparison: {out_tab3}", flush=True)
            
        # Reduced motion check
        print("\nVerifying prefers-reduced-motion on WebGL Canvas...", flush=True)
        rm_context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        rm_page = rm_context.new_page()
        rm_page.goto(f"{BASE_URL}/", wait_until="networkidle")
        canvas = rm_page.locator("canvas")
        canvas_count = canvas.count()
        print(f"  Canvas elements detected with prefers-reduced-motion: {canvas_count}", flush=True)
        rm_context.close()
        
        browser.close()
    print("\nScreenshot capture and visual verification complete.", flush=True)

if __name__ == "__main__":
    main()
