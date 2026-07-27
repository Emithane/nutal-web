import Link from "next/link";
import { getLatestTutorials } from "@/lib/content/tutorials";
import styles from "./Home.module.css";

/**
 * §3.1.8 — 3 najnovija, editorijalni layout. Fotografije stižu od
 * fotografa — slika slot je tonska podloga do tada. Datume ne izmišljamo;
 * umjesto datuma stoji kategorija (stvarni podatak).
 */
export default function TutorijaliTeaser({ lang }: { lang: string }) {
  const tuts = getLatestTutorials(3);
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Tutorijali</h2>
        <Link href={`/${lang}/tutorijali`} className={styles.sectionMore}>Svi tutorijali →</Link>
      </div>
      <div className={styles.tutGrid}>
        {tuts.map((t) => (
          <Link key={t.slug} href={`/${lang}/tutorijali/${t.slug}`} className={styles.tutCard}>
            <div className={styles.tutImage} aria-hidden="true" />
            <span className={styles.tutCat}>{t.kategorija}</span>
            <span className={styles.tutTitle}>{t.naslov}</span>
            <p className={styles.tutSummary}>{t.sazetak}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
