import Link from "next/link";
import { PHOTOS } from "@/lib/content/interimPhotos";
import { getProductsByPortal, type Portal } from "@/lib/content/products";
import styles from "./Home.module.css";

/**
 * §3.1.2 — hero po segmentima: svaki panel nosi FOTOGRAFIJU PRIMJENE,
 * naslov u serifu i jedan CTA — kako brief kaže i kako rade Jotun/Tikkurila.
 * Fotografije su privremene (vidi interimPhotos.ts); zamjena NUTAL-ovim
 * fotografijama = promjena URL-a na jednom mjestu.
 * Scrim preko fotografije je ravna rgba boja (bez gradijenata, §4.5).
 * IZMJENA BRIEFA §3.1 (odluka klijenta, sedmica 2): portal strip je uklonjen
 * kao duplikat hero panela — broj proizvoda po portalu sada živi ovdje.
 */
/* Naslovi-rečenice po uzoru na v2 koncept (odluka klijenta, sedmica 2). */
const PANELS = [
  {
    href: "/diy",
    portal: "DIY" as Portal,
    foto: PHOTOS.diyWood,
    eyebrow: "Za dom i hobi",
    naslov: "Svaki projekat počinje dobrom podlogom.",
    opis: "Boje, lazure i lakovi za zid, drvo, ogradu i namještaj.",
    cta: "Uđite u portal za dom →",
  },
  {
    href: "/industry",
    portal: "Industrial" as Portal,
    foto: PHOTOS.industryBridge,
    eyebrow: "Za industriju i izvođače",
    naslov: "Zaštita koja ostaje na poslu.",
    opis: "Sistemi za metal i konstrukcije po ISO 12944, za zahtjevne uslove rada.",
    cta: "Uđite u portal za profesionalce →",
  },
  {
    href: "/flooring",
    portal: "Flooring" as Portal,
    foto: PHOTOS.flooringEpoxy,
    eyebrow: "Podni sistemi",
    naslov: "Sloj po sloj, bez kompromisa.",
    opis: "Epoksidni i PU podovi za garaže, radionice i hale.",
    cta: "Uđite u portal za podove →",
  },
] as const;

export default function Hero({ lang }: { lang: string }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.heroEyebrow}>
            Tvornica boja i lakova · Vitez · od 1996.
          </span>
          <h1 className={styles.tagline}>Sabrati prave sastojke.</h1>
          <p className={styles.heroLede}>
            Za premaz koji štiti, traje i izgleda kako treba — na drvetu,
            metalu, zidu i podu.
          </p>
          <div className={styles.heroActions}>
            <a href="#kategorije" className={styles.heroSolid}>
              Pronađite svoj proizvod
            </a>
            <Link href={`/${lang}/kontakt`} className={styles.heroQuiet}>
              Trebam stručan savjet
            </Link>
          </div>
        </div>

        <div className={styles.heroPanels}>
          {PANELS.map((p) => (
            <Link
              key={p.href}
              href={`/${lang}${p.href}`}
              className={styles.heroPanel}
              style={{ backgroundImage: `url(${p.foto})` }}
            >
              <span className={styles.panelScrim} aria-hidden="true" />
              <span className={styles.panelEyebrow}>{p.eyebrow}</span>
              <span className={styles.panelTitle}>{p.naslov}</span>
              <span className={styles.panelDesc}>{p.opis}</span>
              <span className={styles.panelCount}>
                {getProductsByPortal(p.portal).length} proizvoda
              </span>
              <span className={styles.panelCta}>{p.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
