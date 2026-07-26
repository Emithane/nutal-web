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
