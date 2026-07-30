import Link from "next/link";
import { getDisplayCategories } from "@/lib/content/products";
import { PHOTOS } from "@/lib/content/interimPhotos";
import styles from "./Home.module.css";

/**
 * §3.1.5 — numerički listing 01–06 sa editorijalnom fotografijom po redu
 * (Jotun pattern: poslovno područje = fotografija primjene; i dalje bez
 * kartica i ikona). Mapa kategorija → fotografija živi ovdje jer je čisto
 * prezentacijska; podaci (nazivi, brojevi) i dalje dolaze iz content sloja.
 */
const KAT_FOTO: Record<string, string> = {
  metal: PHOTOS.industrySteel,
  drvo: PHOTOS.drvoObojeno,
  zid: PHOTOS.diyRoller,
  podovi: PHOTOS.flooringEpoxy,
  ceste: PHOTOS.katCeste,
  pomocni: PHOTOS.katPomocni,
};

export default function Kategorije({ lang }: { lang: string }) {
  const cats = getDisplayCategories();
  return (
    <section className={styles.section} id="kategorije">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.sectionEyebrow}>Odaberite prema podlozi</span>
          <h2 className={styles.sectionTitle}>Šta želite zaštititi?</h2>
        </div>
      </div>
      <div className={styles.katList}>
        {cats.map((c, i) => (
          <Link key={c.id} href={`/${lang}${c.href}`} className={styles.katItem}>
            <span className={styles.katNum}>{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className={styles.katName}>{c.naziv}</span>
              <p className={styles.katDesc}>{c.opis}</p>
            </span>
            <span className={styles.katMeta}>
              <span className={styles.katCount}>{c.count} proizvoda</span>
              <span
                className={styles.katFoto}
                style={{ backgroundImage: `url(${KAT_FOTO[c.id]})` }}
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
