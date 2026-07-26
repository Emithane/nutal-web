#!/usr/bin/env python3
"""Izvlači proizvode (Web=DA) iz master kataloga u src/data/products.json.
Jednokratni seed — kad CMS postane izvor istine, ovaj fajl ostaje kao dokumentacija porijekla podataka.
Upotreba: python3 scripts/extract_katalog.py putanja/do/nutal_master_katalog_v5.xlsx
"""
import sys, json, re, unicodedata
import openpyxl

def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace("š","s").replace("đ","dj").replace("č","c").replace("ć","c").replace("ž","z")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

def clean(v):
    if v is None: return None
    v = str(v).strip()
    return v if v and v != "?" else None

src = sys.argv[1]
wb = openpyxl.load_workbook(src, read_only=True, data_only=True)
ws = wb["Master katalog"]
rows = ws.iter_rows(values_only=True)
header = [str(h).strip() if h else "" for h in next(rows)]
idx = {h: i for i, h in enumerate(header)}

def col(row, name): return clean(row[idx[name]]) if name in idx else None

products, slugs = [], {}
for row in rows:
    if not row or not clean(row[idx["Vrsta proizvoda"]]): continue
    if (col(row, "Web") or "").upper() != "DA": continue
    name = col(row, "Web naziv") or col(row, "Vrsta proizvoda")
    base = slugify(col(row, "Vrsta proizvoda") or name)
    slug = base
    n = 2
    while slug in slugs:
        slug = f"{base}-{n}"; n += 1
    slugs[slug] = True
    products.append({
        "slug": slug,
        "naziv": name,
        "internoIme": col(row, "Vrsta proizvoda"),
        "portal": col(row, "Web kanal"),          # DIY / Industrial / Flooring
        "kategorija": col(row, "Kategorija 1"),
        "potkategorija": col(row, "Kategorija 2"),
        "opis": col(row, "Web opis"),
        "tehnologija": col(row, "Tehnologija"),
        "komponente": col(row, "Komponente"),
        "finish": col(row, "Finish"),
        "podloga": col(row, "Podloga"),
        "tehnicki": {
            "susenjeDodir": col(row, "Sušenje (dodir)"),
            "susenjeMedjusloj": col(row, "Sušenje (međusloj)"),
            "susenjePotpuno": col(row, "Sušenje (potpuno)"),
            "razrjedjivanje": col(row, "Razrjeđivanje"),
            "potrosnja": col(row, "Potrošnja"),
            "nanosenje": col(row, "Nanošenje"),
            "primjena": col(row, "Primjena"),
        },
        "tds": col(row, "Tehnički list"),
    })

out = "src/data/products.json"
with open(out, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

portals = {}
for p in products: portals[p["portal"]] = portals.get(p["portal"], 0) + 1
print(f"Ukupno Web=DA: {len(products)}")
print("Po portalu:", portals)
