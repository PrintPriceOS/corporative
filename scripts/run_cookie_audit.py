import json
import time
from playwright.sync_api import sync_playwright

def audit_runtime():
    results = {}
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # --- STATE 1: Before choice ---
        ctx1 = browser.new_context()
        page1 = ctx1.new_page()
        network_reqs_1 = []
        page1.on('request', lambda r: network_reqs_1.append({'url': r.url, 'method': r.method, 'resource_type': r.resource_type}))
        
        page1.goto('https://printprice.pro/', wait_until='networkidle')
        page1.wait_for_timeout(2000) # wait for banner timer (1200ms)
        
        cookies_1 = ctx1.cookies()
        storage_1 = page1.evaluate('''() => {
            return {
                local: { ...localStorage },
                session: { ...sessionStorage }
            };
        }''')
        
        results['state_1_before_choice'] = {
            'cookies': cookies_1,
            'localStorage': storage_1['local'],
            'sessionStorage': storage_1['session'],
            'network_requests_count': len(network_reqs_1),
            'network_domains': list(set([r['url'].split('/')[2] for r in network_reqs_1 if len(r['url'].split('/')) > 2]))
        }
        ctx1.close()
        
        # --- STATE 2: After rejecting non-essential ---
        ctx2 = browser.new_context()
        page2 = ctx2.new_page()
        network_reqs_2 = []
        page2.on('request', lambda r: network_reqs_2.append({'url': r.url, 'method': r.method, 'resource_type': r.resource_type}))
        page2.goto('https://printprice.pro/', wait_until='networkidle')
        page2.wait_for_timeout(2000)
        
        # Click reject button
        # Selector in CookieBanner: button with text 'Rechazar no esenciales' or data attribute
        reject_btn = page2.locator('button:has-text("Rechazar"), button:has-text("Reject")').first
        if reject_btn.count() > 0:
            reject_btn.click()
            page2.wait_for_timeout(1000)
        
        cookies_2 = ctx2.cookies()
        storage_2 = page2.evaluate('''() => {
            return {
                local: { ...localStorage },
                session: { ...sessionStorage }
            };
        }''')
        
        results['state_2_after_reject'] = {
            'cookies': cookies_2,
            'localStorage': storage_2['local'],
            'sessionStorage': storage_2['session'],
            'network_requests_count': len(network_reqs_2),
            'network_domains': list(set([r['url'].split('/')[2] for r in network_reqs_2 if len(r['url'].split('/')) > 2]))
        }
        ctx2.close()
        
        # --- STATE 3: After accepting all ---
        ctx3 = browser.new_context()
        page3 = ctx3.new_page()
        network_reqs_3 = []
        page3.on('request', lambda r: network_reqs_3.append({'url': r.url, 'method': r.method, 'resource_type': r.resource_type}))
        page3.goto('https://printprice.pro/', wait_until='networkidle')
        page3.wait_for_timeout(2000)
        
        # Click accept all
        accept_btn = page3.locator('button:has-text("Aceptar todas"), button:has-text("Accept all")').first
        if accept_btn.count() > 0:
            accept_btn.click()
            page3.wait_for_timeout(1000)
            # scroll to generate some telemetry
            page3.evaluate('window.scrollTo(0, 1000)')
            page3.wait_for_timeout(1000)
        
        cookies_3 = ctx3.cookies()
        storage_3 = page3.evaluate('''() => {
            return {
                local: { ...localStorage },
                session: { ...sessionStorage }
            };
        }''')
        
        results['state_3_after_accept_all'] = {
            'cookies': cookies_3,
            'localStorage': storage_3['local'],
            'sessionStorage': storage_3['session'],
            'network_requests_count': len(network_reqs_3),
            'network_domains': list(set([r['url'].split('/')[2] for r in network_reqs_3 if len(r['url'].split('/')) > 2]))
        }
        
        # --- STATE 4: Change/withdraw preferences ---
        # Click footer cookie settings or trigger reopen
        reopen_btn = page3.locator('footer button:has-text("cookies"), footer a:has-text("cookies"), footer button:has-text("Cookies"), footer a:has-text("Cookies")').first
        if reopen_btn.count() > 0:
            reopen_btn.click()
        else:
            page3.evaluate('window.dispatchEvent(new Event("ppp_reopen_consent"))')
        page3.wait_for_timeout(1000)
        
        # Uncheck analytics toggle if present
        toggle = page3.locator('#cookie-analytics-toggle')
        if toggle.count() > 0 and toggle.is_checked():
            toggle.uncheck()
        
        save_btn = page3.locator('button:has-text("Guardar"), button:has-text("Save")').first
        if save_btn.count() > 0:
            save_btn.click()
            page3.wait_for_timeout(1000)
            
        cookies_4 = ctx3.cookies()
        storage_4 = page3.evaluate('''() => {
            return {
                local: { ...localStorage },
                session: { ...sessionStorage }
            };
        }''')
        
        results['state_4_after_withdraw'] = {
            'cookies': cookies_4,
            'localStorage': storage_4['local'],
            'sessionStorage': storage_4['session'],
            'network_requests_count': len(network_reqs_3),
            'network_domains': list(set([r['url'].split('/')[2] for r in network_reqs_3 if len(r['url'].split('/')) > 2]))
        }
        
        ctx3.close()
        browser.close()
        
    with open('scripts/cookie_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print('Cookie audit completed successfully. Results in scripts/cookie_audit_results.json')

if __name__ == '__main__':
    audit_runtime()
