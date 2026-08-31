import { getPortalConfig } from "@/lib/content/portals";
import {
  getProductsByPortal,
  getDisplayCategoryId,
  displayCategoryName,
} from "@/lib/content/products";
import ProductExplorer, { type ExplorerItem } from "./ProductExplorer";
import PortalTutorijali from "./PortalTutorijali";
import styles from "./Portal.module.css";

/** Server dio portala: hero + izrezani podaci za klijentski explorer. */
export default function PortalPage({ lang, slug }: { lang: string; slug: string }) {
  const cfg = getPortalConfig(slug);
  if (!cfg) return null;

  const items: ExplorerItem[] = getProductsByPortal(cfg.portal).map((p) => {
    const [ime, ...rest] = p.naziv.split("—");
    const katId = getDisplayCategoryId(p);
    return {
      slug: p.slug,
      ime: ime.trim(),
      tagline: rest.join("—").trim(),
      opis: p.opis ?? "",
      kat: katId,
      katNaziv: displayCategoryName(katId),
      potkat: p.potkategorija ?? "",
      tehnologija: p.tehnologija ?? "",
      komponente: p.komponente ?? "",
      finish: p.finish ?? "",
    };
  });

  return (
    <main>
      <section className={styles.hero} style={{ backgroundImage: `url(${cfg.foto})` }}>
        <span className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.etiketa}>{cfg.etiketa}</span>
          <h1 className={styles.naslov}>{cfg.naslov}</h1>
          <p className={styles.lede}>{cfg.lede}</p>
        </div>
      </section>
      <ProductExplorer lang={lang} items={items} />
      <PortalTutorijali lang={lang} slug={slug} />
    </main>
  );
}
