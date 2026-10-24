import urllib.request
import re
import ssl

ctx = ssl.create_default_context()

for lang in ['es', 'en', 'de']:
    req = urllib.request.Request('https://printprice.pro/', headers={'Accept-Language': lang, 'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as res:
            html = res.read().decode('utf-8', errors='ignore')
            title = re.search(r'<title>([^<]+)</title>', html)
            og_locale = re.search(r'property="og:locale" content="([^"]+)"', html)
            html_lang = re.search(r'<html[^>]*lang="([^"]+)"', html)
            canonical = re.search(r'<link rel="canonical" href="([^"]+)"', html)
            hreflangs = re.findall(r'<link[^>]*hreflang="([^"]+)"', html)
            
            print(f"--- Header: Accept-Language: {lang} ---")
            print(f"  HTTP Status: {res.status}")
            print(f"  HTML lang attribute: {html_lang.group(1) if html_lang else 'None'}")
            print(f"  Title tag: {title.group(1) if title else 'None'}")
            print(f"  OG Locale: {og_locale.group(1) if og_locale else 'None'}")
            print(f"  Canonical URL: {canonical.group(1) if canonical else 'None'}")
            print(f"  Hreflangs present: {hreflangs if hreflangs else 'None'}")
    except Exception as e:
        print(f"Error for {lang}: {e}")
