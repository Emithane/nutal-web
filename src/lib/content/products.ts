/**
 * Sloj sadržaja — JEDINO mjesto s kojeg stranice čitaju proizvode.
 *
 * Danas: statični JSON seed izvučen iz nutal_master_katalog_v5.xlsx
 * (scripts/extract_katalog.py). Sedmica 2-3: ovaj modul se prespaja
 * na headless CMS — potpisi funkcija ostaju isti, stranice se ne diraju.
 */
import products from "@/data/products.json";

export type Portal = "DIY" | "Industrial" | "Flooring";

export interface TehnickiPodaci {
  susenjeDodir: string | null;
  susenjeMedjusloj: string | null;
  susenjePotpuno: string | null;
  razrjedjivanje: string | null;
  potrosnja: string | null;
  nanosenje: string | null;
  primjena: string | null;
}

export interface Product {
  slug: string;
  naziv: string;
  internoIme: string | null;
  /** Vrijednost iz kataloga; može biti kombinovana, npr. "DIY / Industrial" */
  portal: string | null;
  kategorija: string | null;
  potkategorija: string | null;
  opis: string | null;
  tehnologija: string | null;
  komponente: string | null;
  finish: string | null;
  podloga: string | null;
  tehnicki: TehnickiPodaci;
  tds: string | null;
}

const ALL: Product[] = products as Product[];

export function getAllProducts(): Product[] {
  return ALL;
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL.find((p) => p.slug === slug);
}

/** Proizvod pripada portalu i kad je naveden u kombinaciji ("DIY / Industrial"). */
export function getProductsByPortal(portal: Portal): Product[] {
  return ALL.filter((p) => p.portal?.split("/").map((s) => s.trim()).includes(portal));
}

export function countByPortal(): Record<Portal, number> {
  return {
    DIY: getProductsByPortal("DIY").length,
    Industrial: getProductsByPortal("Industrial").length,
    Flooring: getProductsByPortal("Flooring").length,
  };
}

/* ------------------------------------------------------------------
 * Prikazne kategorije za homepage (§3.1.5) — numerički listing 01–06.
 * Kolona "Kategorija 1" u katalogu je nekonzistentna (kombinovane
 * vrijednosti tipa "Metal / Antikorozija — metal"), pa se grupisanje
 * radi predikatima, a broj proizvoda se RAČUNA iz podataka — nikad
 * ne hardkodirati broj koji drift-uje od kataloga.
 * ------------------------------------------------------------------ */

export interface DisplayCategory {
  id: string;
  naziv: string;
  opis: string;
  href: string; // odredište do portalnih filtera (sedmica 2-3)
  count: number;
}

const kat = (p: Product) => (p.kategorija ?? "").toLowerCase();



const DEFS: { def: Omit<DisplayCategory, "count">; match: (p: Product) => boolean }[] = [
  {
    def: {
      id: "metal",
      naziv: "Metal i antikorozija",
      opis: "Temelji, međuslojevi i završni premazi za čelik — od ograde do konstrukcije po ISO 12944.",
      href: "/industry",
    },
    match: (p) => kat(p).includes("metal") || kat(p).includes("antikorozija"),
  },
  {
    def: {
      id: "drvo",
      naziv: "Drvo",
      opis: "Lazure, lakovi i temelji za vanjsku i unutrašnju drvenariju, do industrijskih linija za namještaj.",
      href: "/diy",
    },
    match: (p) => kat(p).startsWith("drvo"),
  },
  {
    def: {
      id: "zid",
      naziv: "Zid i fasada",
      opis: "Disperzije za unutrašnje zidove i akrilne fasadne boje.",
      href: "/diy",
    },
    match: (p) => kat(p).includes("zid"),
  },
  {
    def: {
      id: "podovi",
      naziv: "Podni sistemi",
      opis: "Epoksidni i poliuretanski sistemi za industrijske i stambene podove, u slojevima.",
      href: "/flooring",
    },
    match: (p) => kat(p).includes("epoksi") || kat(p).includes("pu sistemi"),
  },
  {
    def: {
      id: "ceste",
      naziv: "Ceste i signalizacija",
      opis: "Boje za horizontalnu signalizaciju — putna bijela i žuta, premazi za asfalt i beton.",
      href: "/industry",
    },
    match: (p) => kat(p).includes("ceste"),
  },
  {
    def: {
      id: "pomocni",
      naziv: "Pomoćni materijali i posebna namjena",
      opis: "Razrjeđivači, sredstva za pripremu podloge i premazi posebne namjene — od školske table do bazena.",
      href: "/industry",
    },
    match: (p) => kat(p).includes("pomoćni") || kat(p).includes("posebna") || kat(p).includes("bazen"),
  },
];

export function getDisplayCategories(): DisplayCategory[] {
  return DEFS.map(({ def, match }) => ({ ...def, count: ALL.filter(match).length }));
}

/** ID prikazne kategorije za jedan proizvod (prvi pogodak) — za portalne filtere. */
export function getDisplayCategoryId(p: Product): string {
  return DEFS.find(({ match }) => match(p))?.def.id ?? "ostalo";
}

/** Naziv prikazne kategorije po ID-u. */
export function displayCategoryName(id: string): string {
  return DEFS.find((d) => d.def.id === id)?.def.naziv ?? "Ostalo";
}

/** Statistike za homepage (§3.1.6). Sve izračunato — ništa hardkodirano. */
export function getHomeStats() {
  const tehnologije = new Set(
    ALL.map((p) => p.tehnologija).filter((t): t is string => Boolean(t))
  );
  return {
    godinaOsnivanja: 1996,
    godinaProizvodnje: new Date().getFullYear() - 1996,
    brojProizvoda: ALL.length,
    brojTehnologija: tehnologije.size,
  };
}
