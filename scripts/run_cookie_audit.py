import json
import sys
import time
import re
import urllib.request
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

def run_strict_cookie_audit():
    results = {
        'audit_metadata': {
            'timestamp_utc': datetime.now(timezone.utc).isoformat(),
            'target_origin': 'https://printprice.pro',
            'browser': 'Chromium Headless',
            'browser_version': None,
            'release_id_observed': None,
            'pages_audited': ['/', '/products/budget']
        },
        'phases': {},
        'session_id_investigation': {},
        'verdict': 'INCOMPLETE'
    }

    print('[AUDIT] Querying /api/health for release_id...')
    try:
        req = urllib.request.Request('https://printprice.pro/api/health', headers={'User-Agent': 'CookieAuditor/1.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            health_data = json.loads(resp.read().decode('utf-8'))
            rel_id = health_data.get('release_id')
            results['audit_metadata']['release_id_observed'] = rel_id
            print(f'[AUDIT] Active release_id verified: {rel_id}')
    except Exception as e:
        print(f'[WARN] Failed to query /api/health: {e}')

    print('[AUDIT] Starting strict cookie and storage audit on https://printprice.pro...')

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        results['audit_metadata']['browser_version'] = browser.version

        # =========================================================================
        # PHASE 1: Initial visit before user choice
        # =========================================================================
        print('[PHASE 1] Initial visit (before choice)...')
        ctx1 = browser.new_context()
        page1 = ctx1.new_page()
        phase1_requests = []
        page1.on('request', lambda r: phase1_requests.append({'url': r.url, 'method': r.method, 'type': r.resource_type}))

        page1.goto('https://printprice.pro/', wait_until='domcontentloaded')
        page1.wait_for_timeout(2500) # allow banner delay timer

        # Assert banner is displayed
        banner_buttons = page1.locator('button:has-text("Aceptar todas"), button:has-text("Alle akzeptieren"), button:has-text("Accept all")')
        if banner_buttons.count() == 0:
            print('[FAIL] Cookie banner accept button not found in DOM during Phase 1')
            sys.exit(1)

        cookies1 = ctx1.cookies()
        storage1 = page1.evaluate('() => ({ local: { ...localStorage }, session: { ...sessionStorage } })')

        # Assertions for Phase 1
        if 'ppp_consent_v1_audit' in storage1['local']:
            print('[FAIL] Consent key already present in localStorage before user action')
            sys.exit(1)
        if 'ppos_telemetry_history' in storage1['local']:
            print('[FAIL] Telemetry history already present in localStorage before user action')
            sys.exit(1)

        results['phases']['phase_1_before_choice'] = {
            'cookies': cookies1,
            'localStorage': storage1['local'],
            'sessionStorage': storage1['session'],
            'requests_count': len(phase1_requests),
            'request_domains': sorted(list(set([r['url'].split('/')[2] for r in phase1_requests if '://' in r['url']])))
        }
        ctx1.close()
        keys_list = list(storage1['local'].keys())
        print(f'[PHASE 1 OK] Requests: {len(phase1_requests)}, Cookies: {len(cookies1)}, Storage keys: {keys_list}')

        # =========================================================================
        # PHASE 2: Reject non-essential cookies
        # =========================================================================
        print('[PHASE 2] Rejecting non-essential cookies...')
        ctx2 = browser.new_context()
        page2 = ctx2.new_page()
        phase2_requests = []
        page2.on('request', lambda r: phase2_requests.append({'url': r.url, 'method': r.method, 'type': r.resource_type}))

        page2.goto('https://printprice.pro/', wait_until='domcontentloaded')
        page2.wait_for_timeout(2500)

        reject_btn = page2.locator('button:has-text("Rechazar no esenciales"), button:has-text("Nicht essenzielle ablehnen"), button:has-text("Reject non-essential")').first
        if reject_btn.count() == 0:
            print('[FAIL] Reject button not found in UI')
            sys.exit(1)

        reject_btn.click()
        page2.wait_for_timeout(1000)

        cookies2 = ctx2.cookies()
        storage2 = page2.evaluate('() => ({ local: { ...localStorage }, session: { ...sessionStorage } })')

        # Assertions for Phase 2
        consent_raw = storage2['local'].get('ppp_consent_v1_audit')
        if not consent_raw:
            print('[FAIL] Consent record ppp_consent_v1_audit not set after reject')
            sys.exit(1)
        consent_obj = json.loads(consent_raw)
        analytics_val = consent_obj.get('analytics')
        if analytics_val is not False:
            print(f'[FAIL] Expected analytics=False after reject, got: {analytics_val}')
            sys.exit(1)
        if 'ppos_telemetry_history' in storage2['local']:
            print('[FAIL] Telemetry history recorded despite reject')
            sys.exit(1)

        results['phases']['phase_2_after_reject'] = {
            'cookies': cookies2,
            'localStorage': storage2['local'],
            'sessionStorage': storage2['session'],
            'requests_count': len(phase2_requests),
            'request_domains': sorted(list(set([r['url'].split('/')[2] for r in phase2_requests if '://' in r['url']])))
        }
        ctx2.close()
        print('[PHASE 2 OK] Rejection properly recorded with analytics=False and zero telemetry')

        # =========================================================================
        # PHASE 3: Accept all cookies
        # =========================================================================
        print('[PHASE 3] Accepting all cookies in fresh context...')
        ctx3 = browser.new_context()
        page3 = ctx3.new_page()
        phase3_requests = []
        page3.on('request', lambda r: phase3_requests.append({'url': r.url, 'method': r.method, 'type': r.resource_type}))

        page3.goto('https://printprice.pro/', wait_until='domcontentloaded')
        page3.wait_for_timeout(2500)

        accept_btn = page3.locator('button:has-text("Aceptar todas"), button:has-text("Alle akzeptieren"), button:has-text("Accept all")').first
        if accept_btn.count() == 0:
            print('[FAIL] Accept button not found in UI')
            sys.exit(1)

        accept_btn.click()
        page3.wait_for_timeout(1000)

        # Trigger interaction
        page3.evaluate('window.scrollTo(0, 800)')
        page3.wait_for_timeout(1000)

        cookies3 = ctx3.cookies()
        storage3 = page3.evaluate('() => ({ local: { ...localStorage }, session: { ...sessionStorage } })')

        # Assertions for Phase 3
        consent_raw3 = storage3['local'].get('ppp_consent_v1_audit')
        if not consent_raw3:
            print('[FAIL] Consent record ppp_consent_v1_audit not set after accept')
            sys.exit(1)
        consent_obj3 = json.loads(consent_raw3)
        analytics_val3 = consent_obj3.get('analytics')
        if analytics_val3 is not True:
            print(f'[FAIL] Expected analytics=True after accept, got: {analytics_val3}')
            sys.exit(1)

        telemetry_raw = storage3['local'].get('ppos_telemetry_history')
        if not telemetry_raw:
            print('[FAIL] Expected ppos_telemetry_history in localStorage after accept & interaction')
            sys.exit(1)
        telemetry_list = json.loads(telemetry_raw)
        if len(telemetry_list) == 0:
            print('[FAIL] Telemetry list is empty despite accept and scroll')
            sys.exit(1)

        results['phases']['phase_3_after_accept'] = {
            'cookies': cookies3,
            'localStorage': storage3['local'],
            'sessionStorage': storage3['session'],
            'requests_count': len(phase3_requests),
            'request_domains': sorted(list(set([r['url'].split('/')[2] for r in phase3_requests if '://' in r['url']])))
        }
        print(f'[PHASE 3 OK] Consent active, {len(telemetry_list)} telemetry events recorded')

        # =========================================================================
        # PHASE 4: Withdraw/Change Consent via UI and Post-Revocation Test
        # =========================================================================
        print('[PHASE 4] Revoking consent via UI footer button...')
        phase4_requests = []
        page3.on('request', lambda r: phase4_requests.append({'url': r.url, 'method': r.method, 'type': r.resource_type}))

        # Scroll to footer
        page3.locator('footer').scroll_into_view_if_needed()
        page3.wait_for_timeout(1000)

        # Find the footer button using real UI selector
        footer_btn = page3.locator('footer button').filter(has_text=re.compile(r'cookies|cookie-einstellungen|configuraci[oó]n de cookies|cookie settings', re.I)).first
        if footer_btn.count() == 0:
            print('[FAIL] Real footer cookie button not found in UI')
            sys.exit(1)

        # Click the real UI footer button
        footer_btn.click()
        page3.wait_for_timeout(1500)

        # Assert customizer modal/banner opened
        toggle = page3.locator('#cookie-analytics-toggle')
        if toggle.count() == 0:
            print('[FAIL] Cookie analytics toggle (#cookie-analytics-toggle) not found after clicking footer button')
            sys.exit(1)

        if not toggle.is_checked():
            print('[FAIL] Analytics toggle expected to be checked since consent was granted in Phase 3')
            sys.exit(1)

        # Uncheck analytics toggle
        toggle.uncheck()
        page3.wait_for_timeout(500)

        save_btn = page3.locator('button:has-text("Guardar preferencias"), button:has-text("Einstellungen speichern"), button:has-text("Save preferences")').first
        if save_btn.count() == 0:
            print('[FAIL] Save preferences button not found in modal')
            sys.exit(1)

        save_btn.click()
        page3.wait_for_timeout(1000)

        storage4 = page3.evaluate('() => ({ local: { ...localStorage }, session: { ...sessionStorage } })')

        # Assertions immediately after save
        consent_raw4 = storage4['local'].get('ppp_consent_v1_audit')
        consent_obj4 = json.loads(consent_raw4)
        analytics_val4 = consent_obj4.get('analytics')
        if analytics_val4 is not False:
            print(f'[FAIL] Expected analytics=False after save preferences, got: {analytics_val4}')
            sys.exit(1)

        if 'ppos_telemetry_history' in storage4['local']:
            print('[FAIL] ppos_telemetry_history was NOT purged from localStorage upon consent revocation')
            sys.exit(1)

        print('[PHASE 4.1 OK] Telemetry history immediately purged from localStorage upon saving preferences')

        # --- Sub-phase 4.2: Navigation, Interaction and Reload post-revocation ---
        print('[PHASE 4.2] Testing navigation to /products/budget, interaction, and reload post-revocation...')
        page3.goto('https://printprice.pro/products/budget', wait_until='domcontentloaded')
        page3.wait_for_timeout(2000)

        # Generate interactions on the budget page
        page3.evaluate('window.scrollTo(0, 1000)')
        page3.wait_for_timeout(1000)
        clickable_elements = page3.locator('button, input, [data-monolith-action]')
        if clickable_elements.count() > 0:
            try:
                clickable_elements.first.click(timeout=2000)
            except Exception:
                pass
        page3.wait_for_timeout(1000)

        # Reload the page
        page3.reload(wait_until='domcontentloaded')
        page3.wait_for_timeout(2000)

        storage4_post = page3.evaluate('() => ({ local: { ...localStorage }, session: { ...sessionStorage } })')

        # Assert ppos_telemetry_history HAS NOT REAPPEARED
        if 'ppos_telemetry_history' in storage4_post['local']:
            history_val = storage4_post['local'].get('ppos_telemetry_history')
            print(f'[FAIL] ppos_telemetry_history REAPPEARED after navigation/reload despite revoked consent: {history_val}')
            sys.exit(1)

        # Investigate ppos_session_id
        session_id_val = storage4_post['session'].get('ppos_session_id')
        results['session_id_investigation'] = {
            'key': 'ppos_session_id',
            'storage_type': 'sessionStorage',
            'value_observed': session_id_val,
            'persisted_post_revocation': session_id_val is not None,
            'analysis': (
                'ppos_session_id is generated by getSessionId() in lib/telemetry.ts upon initial execution '
                'and stored in sessionStorage (ephemeral to the browser tab). When analytics consent is revoked, '
                'lib/consent.ts purges ppos_telemetry_history from localStorage, but does not clear sessionStorage. '
                'Because sessionStorage is tab-isolated and destroyed upon closing the browser tab, it is not a '
                'persistent cross-site tracking identifier, but its continued generation prior to consent represents '
                'an area for hardening if strict zero-storage prior to consent is required.'
            )
        }

        results['phases']['phase_4_after_revocation_and_navigation'] = {
            'cookies': ctx3.cookies(),
            'localStorage': storage4_post['local'],
            'sessionStorage': storage4_post['session'],
            'requests_count': len(phase4_requests),
            'request_domains': sorted(list(set([r['url'].split('/')[2] for r in phase4_requests if '://' in r['url']])))
        }

        ctx3.close()
        browser.close()

    results['verdict'] = 'PASSED_ALL_ASSERTIONS'
    with open('scripts/cookie_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print('[AUDIT SUCCESS] All 4 phases passed with zero assertion failures. Results saved to scripts/cookie_audit_results.json')
    sys.exit(0)

if __name__ == '__main__':
    run_strict_cookie_audit()
