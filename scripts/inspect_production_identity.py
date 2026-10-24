import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
req = urllib.request.Request("https://printprice.pro/", headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, context=ctx) as res:
    status = res.status
    headers = dict(res.headers)
    html = res.read().decode('utf-8', errors='ignore')

print("=== PRODUCTION IDENTITY INSPECTION ===")
print("Status:", status)
print("Server:", headers.get("Server"))
print("X-Powered-By:", headers.get("X-Powered-By"))
print("ETag:", headers.get("ETag"))
print("Strict-Transport-Security:", headers.get("Strict-Transport-Security"))
print("Content-Security-Policy present:", "content-security-policy" in headers)
print("Next Cache / Prerender:", headers.get("x-nextjs-prerender"), "Cache-Control:", headers.get("Cache-Control"))

# Find html lang
lang_match = re.search(r'<html[^>]*lang=["\']([^"\']+)["\']', html)
print("HTML lang attribute:", lang_match.group(1) if lang_match else "None")

# Find buildId
build_id = re.search(r'/_next/static/([^/]+)/_buildManifest\.js', html)
print("Next.js Build ID:", build_id.group(1) if build_id else "None found in HTML")

# Check for presence of recent features: ActionCTA ShapeGrid canvas or canvas element
print("Action CTA markup present:", 'data-monolith-section="action-cta"' in html)
print("Canvas tag present in HTML:", '<canvas' in html)

# Check if nodes available claim is in production HTML
print("NODES AVAILABLE in production HTML:", "NODES AVAILABLE" in html or "1,280" in html)
