import { PHOTOS } from "@/lib/content/interimPhotos";
import type { Portal } from "@/lib/content/products";

/**
 * §3.2 — tri portala. Etikete i naslovi-rečenice identični hero panelima
 * na homepage (jedan glas). Fotografije iz privremenog registra.
 */
export interface PortalConfig {
  slug: string;
  portal: Portal;
  etiketa: string;
  naslov: string;
  lede: string;
  foto: string;
}

export const PORTALS: PortalConfig[] = [
  {
    slug: "diy",
    portal: "DIY",
    etiketa: "Za dom i hobi",
    naslov: "Svaki projekat počinje dobrom podlogom.",
    lede: "Boje, lazure i lakovi za zid, drvo, ogradu i namještaj — u pakovanjima za kućnu upotrebu.",
    foto: PHOTOS.diyWood,
  },
  {
    slug: "industry",
    portal: "Industrial",
    etiketa: "Za industriju i izvođače",
    naslov: "Zaštita koja ostaje na poslu.",
    lede: "Antikorozivni sistemi po ISO 12944, premazi za ceste i industrijske linije — uz tehničku podršku pri izboru sistema.",
    foto: PHOTOS.industryBridge,
  },
  {
    slug: "flooring",
    portal: "Flooring",
    etiketa: "Podni sistemi",
    naslov: "Sloj po sloj, bez kompromisa.",
    lede: "Epoksidni i poliuretanski sistemi za garaže, radionice i proizvodne hale.",
    foto: PHOTOS.flooringEpoxy,
  },
];

export const getPortalConfig = (slug: string) =>
  PORTALS.find((p) => p.slug === slug);
