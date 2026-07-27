import Link from "next/link";
import { getDisplayCategories } from "@/lib/content/products";
import styles from "./Home.module.css";

/** §3.1.5 — numerički listing 01–06 (Jotun/F&B stil), NE kartice s ikonama. */
export default function Kategorije({ lang }: { lang: string }) {
  const cats = getDisplayCategories();
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Proizvodi po namjeni</h2>
      </div>
      <div className={styles.katList}>
        {cats.map((c, i) => (
          <Link key={c.id} href={`/${lang}${c.href}`} className={styles.katItem}>
            <span className={styles.katNum}>{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className={styles.katName}>{c.naziv}</span>
              <p className={styles.katDesc}>{c.opis}</p>
            </span>
            <span className={styles.katCount}>{c.count} proizvoda</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
