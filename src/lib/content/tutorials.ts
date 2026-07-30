/**
 * Sloj sadržaja za tutorijale. Danas: statični seed (3 komada za homepage
 * teaser §3.1.8) pisan po stilskom vodiču briefa §5.1. Sedmica 3: prespaja
 * se na CMS istim potpisima funkcija.
 */
import tutorials from "@/data/tutorials.json";

export interface Tutorial {
  slug: string;
  /** ključ u PHOTOS registru privremenih fotografija */
  fotoKey: string;
  naslov: string;
  kategorija: string;
  portal: string;
  sazetak: string;
}

const ALL: Tutorial[] = tutorials as Tutorial[];

export function getLatestTutorials(n = 3): Tutorial[] {
  return ALL.slice(0, n);
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return ALL.find((t) => t.slug === slug);
}
