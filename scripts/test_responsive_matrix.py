import os
import sys
import json
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
sys.stderr.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

VIEWPORTS = [
    {"name": "320x568 (Ultra-compact mobile)", "width": 320, "height": 568},
    {"name": "375x812 (Compact mobile)", "width": 375, "height": 812},
    {"name": "390x844 (Standard mobile)", "width": 390, "height": 844},
    {"name": "430x932 (Large mobile)", "width": 430, "height": 932},
    {"name": "768x1024 (Tablet portrait)", "width": 768, "height": 1024},
    {"name": "1024x768 (Tablet landscape / netbook)", "width": 1024, "height": 768},
    {"name": "1280x800 (Laptop WXGA)", "width": 1280, "height": 800},
    {"name": "1440x900 (Desktop Standard)", "width": 1440, "height": 900},
    {"name": "1920x1080 (Desktop FHD)", "width": 1920, "height": 1080},
]

PAGES = [
    {"path": "/", "name": "Home"},
    {"path": "/for-authors", "name": "For Authors"},
    {"path": "/for-publishers", "name": "For Publishers"},
    {"path": "/for-printhouses", "name": "For Printhouses"},
    {"path": "/for-paper-suppliers", "name": "For Paper Suppliers"},
    {"path": "/contact", "name": "Contact"},
    {"path": "/contact/partner", "name": "Contact Partner"},
    {"path": "/platform", "name": "Platform"},
    {"path": "/solutions", "name": "Solutions"},
    {"path": "/legal/terms-of-service", "name": "Terms of Service"},
    {"path": "/legal/privacy-policy", "name": "Privacy Policy"},
    {"path": "/legal/legal-notice", "name": "Legal Notice"},
]

BASE_URL = "http://localhost:3010"
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "..", "docs", "implementation", "corporate-stakeholder-experience", "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

OVERFLOW_CHECK_SCRIPT = """
() => {
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
    const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
    const hasDocOverflow = maxScroll > docWidth + 1.5;

    const isInsideContainedScroll = (el) => {
        let parent = el.parentElement;
        while (parent && parent !== document.body && parent !== document.documentElement) {
            const style = window.getComputedStyle(parent);
            if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'hidden') {
                return true;
            }
            parent = parent.parentElement;
        }
        return false;
    };

    const offendingElements = [];
    if (hasDocOverflow) {
        const all = document.querySelectorAll('*');
        all.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 1.5 && !isInsideContainedScroll(el)) {
                const tag = el.tagName.toLowerCase();
                const id = el.id ? '#' + el.id : '';
                const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
                offendingElements.push({
                    selector: `${tag}${id}${cls}`,
                    right: Math.round(rect.right),
                    width: Math.round(rect.width),
                    overflowPx: Math.round(rect.right - docWidth),
                    snippet: (el.textContent || '').trim().slice(0, 40)
                });
            }
        });
    }

    return {
        docWidth,
        maxScroll,
        hasDocOverflow,
        offendingCount: offendingElements.length,
        topOffenders: offendingElements.slice(0, 5)
    };
}
"""

def run_audit():
    results = []
    print(f"Starting Responsive Audit across {len(VIEWPORTS)} viewports and {len(PAGES)} pages...", flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        for vp in VIEWPORTS:
            vp_name = vp["name"]
            width = vp["width"]
            height = vp["height"]
            print(f"\\n--- Testing Viewport: {vp_name} ({width}x{height}) ---", flush=True)
            page.set_viewport_size({"width": width, "height": height})

            for p_info in PAGES:
                url = f"{BASE_URL}{p_info['path']}"
                try:
                    page.goto(url, wait_until="domcontentloaded", timeout=10000)
                    page.wait_for_timeout(350)
                    check = page.evaluate(OVERFLOW_CHECK_SCRIPT)

                    status = "PASS" if not check["hasDocOverflow"] else "FAIL"
                    item = {
                        "viewport": f"{width}x{height}",
                        "viewport_name": vp_name,
                        "page": p_info["name"],
                        "path": p_info["path"],
                        "status": status,
                        "docWidth": check["docWidth"],
                        "maxScroll": check["maxScroll"],
                        "offenders": check["topOffenders"]
                    }
                    results.append(item)

                    if check["hasDocOverflow"]:
                        print(f"  [FAIL] {p_info['name']} ({p_info['path']}) -> docWidth={check['docWidth']} vs scrollWidth={check['maxScroll']}. Offenders: {check['topOffenders']}", flush=True)
                    else:
                        print(f"  [PASS] {p_info['name']} ({p_info['path']})", flush=True)

                    if width in [320, 390, 768, 1440] and p_info["path"] in ["/", "/for-authors", "/for-publishers", "/for-printhouses", "/for-paper-suppliers", "/contact"]:
                        clean_path = p_info["path"].replace("/", "_").strip("_") or "home"
                        screenshot_path = os.path.join(SCREENSHOTS_DIR, f"{clean_path}_{width}x{height}.png")
                        page.screenshot(path=screenshot_path, full_page=False)

                except Exception as e:
                    print(f"  [ERROR] {p_info['name']} ({p_info['path']}): {str(e)}", flush=True)
                    results.append({
                        "viewport": f"{width}x{height}",
                        "viewport_name": vp_name,
                        "page": p_info["name"],
                        "path": p_info["path"],
                        "status": "ERROR",
                        "error": str(e)
                    })

        # Test interactive components on 390x844 (mobile) and 320x568 (compact)
        print("\n--- Testing Interactive Components (Modals, Drawer, i18n, Theme) ---", flush=True)
        for test_vp in [320, 390]:
            page.set_viewport_size({"width": test_vp, "height": 600})
            page.goto(f"{BASE_URL}/", wait_until="domcontentloaded")
            page.wait_for_timeout(350)

            # 1. Mobile Menu Drawer
            print(f"Testing Mobile Menu Drawer on {test_vp}px...", flush=True)
            burger = page.locator('button[aria-label="Abrir menú"], button[aria-label="Open menu"], button[aria-label="Menü öffnen"]')
            if burger.count() > 0:
                burger.first.click()
                page.wait_for_timeout(350)
                drawer_open = page.is_visible('div[role="dialog"][aria-label="Menú móvil de navegación"]')
                body_overflow = page.evaluate("() => document.body.style.overflow")
                print(f"  Menu Drawer visible: {drawer_open}, body scroll locked: {body_overflow == 'hidden'}", flush=True)

                # Test Language Selector inside Drawer
                de_btn = page.locator('div[role="dialog"] button:has-text("DE")')
                if de_btn.count() > 0:
                    de_btn.first.click()
                    page.wait_for_timeout(300)
                    print(f"  Switched to DE inside mobile drawer successfully!", flush=True)

                # Close with escape key
                page.keyboard.press("Escape")
                page.wait_for_timeout(350)
                drawer_after_esc = page.is_visible('div[role="dialog"][aria-label="Menú móvil de navegación"]')
                body_overflow_restored = page.evaluate("() => document.body.style.overflow")
                print(f"  Drawer closed on Escape: {not drawer_after_esc}, body scroll restored: {body_overflow_restored != 'hidden'}", flush=True)

            # 2. Test Modal (e.g. Login Modal from Drawer)
            print(f"Testing Modal on {test_vp}px...", flush=True)
            burger = page.locator('button[aria-label="Abrir menú"], button[aria-label="Open menu"], button[aria-label="Menü öffnen"]')
            if burger.count() > 0:
                burger.first.click()
                page.wait_for_timeout(350)
                login_btn = page.locator('div[role="dialog"] button.btn-secondary')
                if login_btn.count() > 0:
                    login_btn.first.click(force=True)
                    page.wait_for_timeout(350)
                    modal_visible = page.is_visible('.modal-content')
                    modal_overflow = page.evaluate("() => document.body.style.overflow")
                    print(f"  Login Modal visible: {modal_visible}, body scroll locked: {modal_overflow == 'hidden'}", flush=True)
                    page.keyboard.press("Escape")
                    page.wait_for_timeout(300)
                    modal_after_esc = page.is_visible('.modal-content')
                    print(f"  Modal closed on Escape: {not modal_after_esc}", flush=True)

        browser.close()

    summary_file = os.path.join(os.path.dirname(__file__), "responsive_results.json")
    with open(summary_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    total_tests = len(results)
    passes = sum(1 for r in results if r.get("status") == "PASS")
    fails = sum(1 for r in results if r.get("status") == "FAIL")
    errors = sum(1 for r in results if r.get("status") == "ERROR")

    print(f"\\n================ AUDIT SUMMARY ================", flush=True)
    print(f"Total Page/Viewport combinations tested: {total_tests}", flush=True)
    print(f"PASS: {passes}", flush=True)
    print(f"FAIL: {fails}", flush=True)
    print(f"ERROR: {errors}", flush=True)
    print(f"Results saved to: {summary_file}", flush=True)

if __name__ == "__main__":
    run_audit()
