/**
 * Sloj sadržaja za tutorijale. Statični seed (tutorials.json), pisan po
 * stilskom vodiču briefa §5.1 i jezičkim pravilima klijenta (bosanski
 * standard sa h, vi-forma). Kasnije: prespaja se na CMS istim potpisima.
 */
import tutorials from "@/data/tutorials.json";

export interface TutorialKorak {
  naslov: string;
  tekst: string;
}

export interface Tutorial {
  slug: string;
  /** ključ u PHOTOS registru privremenih fotografija */
  fotoKey: string;
  naslov: string;
  kategorija: string;
  portal: string;
  sazetak: string;
  /** Puni sadržaj — opciono dok se tutorijali pišu. */
  uvod?: string;
  /** "Šta vam treba" — alat i materijal, generički (bez izmišljenih SKU). */
  treba?: string[];
  koraci?: TutorialKorak[];
  /** Vodiči za izbor: sekcije bez brojeva (brojevi impliciraju redoslijed). */
  sekcije?: TutorialKorak[];
  greske?: string[];
  zakljucak?: string;
}

const ALL: Tutorial[] = tutorials as Tutorial[];

export function getLatestTutorials(n = 3): Tutorial[] {
  return ALL.slice(0, n);
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return ALL.find((t) => t.slug === slug);
}

/** Tutorijali jednog portala — za sekciju unutar portalne stranice. */
export function getTutorialsByPortal(portal: string): Tutorial[] {
  return ALL.filter((t) => t.portal === portal);
}
