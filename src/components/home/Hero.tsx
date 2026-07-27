import Link from "next/link";
import styles from "./Home.module.css";

/**
 * §3.1.2 — hero podijeljen na panele po segmentu, bez slidera i dekoracija.
 * Fotografije primjena stižu od fotografa (§5.2) — do tada tonske podloge;
 * slot je spreman: fotografija se kači kao background-image na panel klasu.
 */
const PANELS = [
  {
    href: "/diy",
    klasa: "panelDiy",
    eyebrow: "Za dom i hobi",
    naslov: "Boje i lazure za kuću, ogradu i namještaj",
    cta: "Uđi u DIY portal →",
  },
  {
    href: "/industry",
    klasa: "panelIndustry",
    eyebrow: "Za industriju i izvođače",
    naslov: "Antikorozivna zaštita po ISO 12944",
    cta: "Uđi u Industry portal →",
  },
  {
    href: "/flooring",
    klasa: "panelFlooring",
    eyebrow: "Podni sistemi",
    naslov: "Epoksidni i PU podovi, sloj po sloj",
    cta: "Uđi u Flooring portal →",
  },
] as const;

export default function Hero({ lang }: { lang: string }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.tagline}>Sabrati prave sastojke.</h1>
        <p className={styles.heroLede}>
          Tvornica boja i lakova iz Viteza. Od 1996. proizvodimo premaze za
          drvo, metal i beton — od limenke za kućnu upotrebu do industrijskih
          sistema zaštite.
        </p>
        <div className={styles.heroPanels}>
          {PANELS.map((p) => (
            <Link key={p.href} href={`/${lang}${p.href}`} className={`${styles.heroPanel} ${styles[p.klasa]}`}>
              <span className={styles.panelEyebrow}>{p.eyebrow}</span>
              <span className={styles.panelTitle}>{p.naslov}</span>
              <span className={styles.panelCta}>{p.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
