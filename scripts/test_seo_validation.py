import urllib.request
import urllib.error
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
sys.stderr.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

BASE_URL = "http://localhost:3010"

ROUTES = [
    {"path": "/", "name": "Home", "intent": "General Platform Overview & Slogan"},
    {"path": "/for-authors", "name": "For Authors", "intent": "Book printing for indie authors & individuals"},
    {"path": "/for-publishers", "name": "For Publishers", "intent": "Multi-tier pricing matrices for book publishers"},
    {"path": "/for-printhouses", "name": "For Printhouses", "intent": "Press profiling, verified jobs, matchmaker for printers"},
    {"path": "/for-paper-suppliers", "name": "For Paper Suppliers", "intent": "Master paper catalog federation & real-time inventory"},
    {"path": "/platform", "name": "Platform", "intent": "Technical architecture, calculation engines, and preflight"},
    {"path": "/solutions", "name": "Solutions", "intent": "Print manufacturing solutions across industry verticals"},
    {"path": "/developers", "name": "Developers", "intent": "REST APIs, webhooks, and integration contracts"},
    {"path": "/company", "name": "Company", "intent": "Engineering philosophy, deterministic principles, and team"},
    {"path": "/contact", "name": "Contact", "intent": "General inquiries and customer support"},
    {"path": "/contact/partner", "name": "Contact Partner", "intent": "Commercial onboarding for printhouses and paper mills"},
    {"path": "/legal/terms-of-service", "name": "Terms of Service", "intent": "Platform service terms and manufacturing boundaries"},
    {"path": "/legal/privacy-policy", "name": "Privacy Policy", "intent": "GDPR compliance, data handling, and cookies"},
    {"path": "/legal/legal-notice", "name": "Legal Notice", "intent": "Statutory corporate imprint and fiscal identification"},
    {"path": "/legal/partner-terms", "name": "Partner Terms", "intent": "Production partner SLAs and evidenceId protocol"},
]

def fetch_url(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='replace')
            return resp.status, resp.headers, content
    except urllib.error.HTTPError as e:
        content = e.read().decode('utf-8', errors='replace')
        return e.code, e.headers, content
    except Exception as e:
        return 0, {}, str(e)

def extract_meta(html):
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else "MISSING"

    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta\s+content=["\'](.*?)["\']\s+name=["\']description["\']', html, re.IGNORECASE)
    description = desc_match.group(1).strip() if desc_match else "MISSING"

    canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', html, re.IGNORECASE)
    if not canon_match:
        canon_match = re.search(r'<link\s+href=["\'](.*?)["\']\s+rel=["\']canonical["\']', html, re.IGNORECASE)
    canonical = canon_match.group(1).strip() if canon_match else "MISSING"

    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
    if h1_match:
        # Strip internal tags
        h1_clean = re.sub(r'<[^>]+>', ' ', h1_match.group(1))
        h1 = re.sub(r'\s+', ' ', h1_clean).strip()
    else:
        h1 = "MISSING"

    # JSON-LD scripts
    json_ld_matches = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', html, re.IGNORECASE | re.DOTALL)
    json_lds = []
    for raw in json_ld_matches:
        try:
            parsed = json.loads(raw.strip())
            json_lds.append(parsed)
        except Exception:
            pass

    return {
        "title": title,
        "description": description,
        "canonical": canonical,
        "h1": h1,
        "json_lds_count": len(json_lds),
        "json_ld_types": [j.get('@type', 'Unknown') for j in json_lds]
    }

def run_seo_audit():
    print("=" * 60)
    print("PRINTPRICE PRO — TECHNICAL & CONTENT SEO VERIFICATION")
    print("=" * 60)

    # 1. Robots.txt
    print("\n--- 1. Testing robots.txt ---")
    robots_url = f"{BASE_URL}/robots.txt"
    r_code, r_headers, r_content = fetch_url(robots_url)
    print(f"Status: {r_code}")
    print(f"Content-Type: {r_headers.get('Content-Type')}")
    print("Content preview:")
    for line in r_content.strip().split('\n')[:8]:
        print(f"  {line}")
    has_sitemap = "sitemap.xml" in r_content
    blocks_next = "/_next/" in r_content and "Disallow: /_next/" in r_content
    print(f"  [CHECK] References sitemap.xml: {has_sitemap}")
    print(f"  [CHECK] Does NOT block /_next/ (crawlers can render JS/CSS): {not blocks_next}")

    # 2. Sitemap.xml
    print("\n--- 2. Testing sitemap.xml ---")
    sitemap_url = f"{BASE_URL}/sitemap.xml"
    s_code, s_headers, s_content = fetch_url(sitemap_url)
    print(f"Status: {s_code}")
    print(f"Content-Type: {s_headers.get('Content-Type')}")
    urls_in_sitemap = re.findall(r'<loc>(.*?)</loc>', s_content)
    print(f"Total canonical URLs listed in sitemap: {len(urls_in_sitemap)}")
    for u in urls_in_sitemap:
        print(f"  - {u}")

    # 3. Route-by-route audit
    print("\n--- 3. Testing Public Route Metadata & Structured Data ---")
    route_results = []
    all_titles_unique = True
    titles_seen = set()
    all_descriptions_unique = True
    desc_seen = set()

    for r in ROUTES:
        full_url = f"{BASE_URL}{r['path']}"
        code, headers, html = fetch_url(full_url)
        meta = extract_meta(html)

        # Check uniqueness
        if meta["title"] in titles_seen:
            all_titles_unique = False
        titles_seen.add(meta["title"])

        if meta["description"] in desc_seen:
            all_descriptions_unique = False
        desc_seen.add(meta["description"])

        is_canonical_valid = meta["canonical"].startswith("https://printprice.pro")
        has_h1 = meta["h1"] != "MISSING"

        res = {
            "path": r["path"],
            "name": r["name"],
            "intent": r["intent"],
            "http_status": code,
            "title": meta["title"],
            "description": meta["description"],
            "canonical": meta["canonical"],
            "canonical_valid": is_canonical_valid,
            "h1": meta["h1"][:60] + "..." if len(meta["h1"]) > 60 else meta["h1"],
            "json_ld_types": meta["json_ld_types"],
            "indexable": code == 200 and "noindex" not in html.lower(),
        }
        route_results.append(res)

        print(f"\nRoute: {r['name']} ({r['path']})")
        print(f"  HTTP Status: {code}")
        print(f"  Title: {meta['title']}")
        print(f"  Description: {meta['description']}")
        print(f"  Canonical: {meta['canonical']}")
        print(f"  H1: {res['h1']}")
        print(f"  JSON-LD Schemas: {meta['json_ld_types']}")

    # 4. Check 404 behavior
    print("\n--- 4. Testing 404 Status for Non-Existent Route ---")
    not_found_url = f"{BASE_URL}/non-existent-route-testing-404"
    nf_code, _, _ = fetch_url(not_found_url)
    print(f"GET /non-existent-route-testing-404 -> HTTP Status: {nf_code} (Expected: 404)")

    # Save results to JSON
    output_path = "scripts/seo_validation_results.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({
            "robots_status": r_code,
            "sitemap_status": s_code,
            "sitemap_url_count": len(urls_in_sitemap),
            "all_titles_unique": all_titles_unique,
            "all_descriptions_unique": all_descriptions_unique,
            "routes": route_results,
            "not_found_status": nf_code
        }, f, indent=2, ensure_ascii=False)

    print("\n================ SEO AUDIT SUMMARY ================")
    print(f"Routes Audited: {len(route_results)}")
    print(f"Unique Titles: {all_titles_unique} ({len(titles_seen)} unique)")
    print(f"Unique Descriptions: {all_descriptions_unique} ({len(desc_seen)} unique)")
    print(f"Sitemap Validated: {has_sitemap} ({len(urls_in_sitemap)} URLs)")
    print(f"404 Behavior: {'PASS' if nf_code == 404 else 'WARN'}")
    print(f"Results saved to: {output_path}")

if __name__ == "__main__":
    run_seo_audit()
