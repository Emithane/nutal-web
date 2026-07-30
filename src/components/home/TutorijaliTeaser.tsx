import Link from "next/link";
import { getLatestTutorials } from "@/lib/content/tutorials";
import { PHOTOS } from "@/lib/content/interimPhotos";
import styles from "./Home.module.css";

/**
 * §3.1.8 — 3 najnovija, editorijalni layout: velika fotografija, serif
 * naslov. Fotografije privremene (interimPhotos.ts). Datume ne izmišljamo —
 * umjesto datuma stoji kategorija.
 */
export default function TutorijaliTeaser({ lang }: { lang: string }) {
  const tuts = getLatestTutorials(3);
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.sectionEyebrow}>Znanje iz proizvodnje i primjene</span>
          <h2 className={styles.sectionTitle}>Da se uradi kako treba.</h2>
        </div>
        <Link href={`/${lang}/tutorijali`} className={styles.sectionMore}>Svi tutorijali →</Link>
      </div>
      <div className={styles.tutGrid}>
        {tuts.map((t) => (
          <Link key={t.slug} href={`/${lang}/tutorijali/${t.slug}`} className={styles.tutCard}>
            <span
              className={styles.tutImage}
              style={{ backgroundImage: `url(${PHOTOS[t.fotoKey as keyof typeof PHOTOS]})` }}
              role="img"
              aria-label={t.naslov}
            />
            <span className={styles.tutCat}>{t.kategorija}</span>
            <span className={styles.tutTitle}>{t.naslov}</span>
            <p className={styles.tutSummary}>{t.sazetak}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
