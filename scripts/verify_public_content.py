import urllib.request
import ssl

ctx = ssl.create_default_context()

URLS = {
    "home": "https://printprice.pro/",
    "budget": "https://printprice.pro/products/budget",
    "preflight": "https://printprice.pro/products/preflight",
    "print": "https://printprice.pro/products/print",
    "for_authors": "https://printprice.pro/for-authors",
    "contact": "https://printprice.pro/contact",
}

CHECKS = [
    # (Category, Label, Search string, Expected in 6066e15, Expected in currently deployed d5e37f4)
    ("OLD_CLAIM", "ActionCTA nodes metric", "NODES AVAILABLE: 1,280", False, True),
    ("OLD_CLAIM", "ActionCTA region metric", "REGION: GLOBAL EDGE", False, True),
    ("OLD_CLAIM", "Preflight access claim", "Sin registro previo obligatorio", False, True),
    ("OLD_CLAIM", "Budget instant exact claim", "Coste Real al Instante", False, True),
    ("OLD_CLAIM", "Budget exact calculation", "C\u00e1lculo exacto", False, True),
    ("OLD_CLAIM", "Print zero incidents claim", "Cero Incidencias de Preimpresi\u00f3n", False, True),
    ("OLD_CLAIM", "Authors commission CTA", "Encargar producci\u00f3n", False, True),
    ("NEW_STRING", "ActionCTA technical network ES", "RED T\u00c9CNICA DE PRODUCCI\u00d3N", True, False),
    ("NEW_STRING", "ActionCTA workshop federation ES", "FEDERACI\u00d3N DE TALLERES HOMOLOGADOS", True, False),
    ("NEW_STRING", "Preflight free account access", "cuenta gratuita o enlace m\u00e1gico", True, False),
    ("NEW_STRING", "Budget technical budget", "Presupuesto T\u00e9cnico al Instante", True, False),
    ("NEW_STRING", "Print incident prevention", "Prevenci\u00f3n de Incidencias de Preimpresi\u00f3n", True, False),
    ("NEW_STRING", "Authors calculate CTA", "Calcular producci\u00f3n", True, False),
]

html_by_page = {}
for name, url in URLS.items():
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, context=ctx) as res:
            html_by_page[name] = res.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print("=== VERIFICACI\u00d3N DE CONTENIDO P\u00daBLICO EN PRODUCCI\u00d3N (https://printprice.pro) ===\n")
print(f"{'Tipo':<12} | {'Etiqueta':<32} | {'Cadena buscada':<35} | {'Presente en HTML servido':<25}")
print("-" * 115)

for category, label, string_to_check, expected_6066e15, expected_deployed in CHECKS:
    found_pages = [page_name for page_name, content in html_by_page.items() if string_to_check in content]
    present_str = f"S\u00cd (en {', '.join(found_pages)})" if found_pages else "NO (0 ocurrencias)"
    print(f"{category:<12} | {label:<32} | {string_to_check:<35} | {present_str:<25}")
