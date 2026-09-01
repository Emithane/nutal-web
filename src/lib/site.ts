/** Javna adresa sajta. Sedmica 4: prebaciti na https://www.nutal.ba kroz
 *  NEXT_PUBLIC_SITE_URL u Cloudflare build okruženju — bez diranja koda. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nutal-web.kenan-hajdarevic.workers.dev";

export const SITE_NAME = "NUTAL — Tvornica boja i lakova, Vitez";

/** Prava domena = indeksiranje uključeno; privremena workers.dev = isključeno. */
export const IS_PRODUCTION_DOMAIN = SITE_URL.includes("nutal.ba");
