import { getAllProducts, getDisplayCategoryId, displayCategoryName } from "./products";

/**
 * Kalkulator potrošnje — koristi ISKLJUČIVO proizvode koji u katalogu imaju
 * polje potrošnje (52/140, stanje sedmice 2). Format u katalogu je uniforman
 * ("10–12 m²/l" ili "5 m²/l"); parser je provjeren na svih 52.
 * Ništa se ne izmišlja: proizvod bez podatka ne postoji u kalkulatoru.
 */
export interface KalkProizvod {
  slug: string;
  ime: string;
  tagline: string;
  katNaziv: string;
  minIzdasnost: number;
  maxIzdasnost: number;
}

const RX = /(\d+(?:[.,]\d+)?)\s*(?:[–-]\s*(\d+(?:[.,]\d+)?))?\s*m²?\s*\/\s*l/i;

export function getKalkProizvodi(): KalkProizvod[] {
  const out: KalkProizvod[] = [];
  for (const p of getAllProducts()) {
    const raw = p.tehnicki?.potrosnja;
    if (!raw) continue;
    const m = RX.exec(raw.replace("m2", "m²"));
    if (!m) continue;
    const a = parseFloat(m[1].replace(",", "."));
    const b = m[2] ? parseFloat(m[2].replace(",", ".")) : a;
    const [ime, ...rest] = p.naziv.split("—");
    out.push({
      slug: p.slug,
      ime: ime.trim(),
      tagline: rest.join("—").trim(),
      katNaziv: displayCategoryName(getDisplayCategoryId(p)),
      minIzdasnost: Math.min(a, b),
      maxIzdasnost: Math.max(a, b),
    });
  }
  return out.sort(
    (x, y) => x.katNaziv.localeCompare(y.katNaziv, "bs") || x.ime.localeCompare(y.ime, "bs")
  );
}
