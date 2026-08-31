import Link from "next/link";
import { getTutorialsByPortal } from "@/lib/content/tutorials";
import { PHOTOS } from "@/lib/content/interimPhotos";
import styles from "./Portal.module.css";

/** Tutorijali portala — dubina koja se otvara tek ulaskom u portal
 *  (odluka klijenta, sedmica 3). Portal bez tutorijala nema sekciju. */
const PORTAL_KEY: Record<string, string> = {
  diy: "DIY",
  industry: "Industry",
  flooring: "Flooring",
};

export default function PortalTutorijali({ lang, slug }: { lang: string; slug: string }) {
  const tuts = getTutorialsByPortal(PORTAL_KEY[slug] ?? "");
  if (tuts.length === 0) return null;
  return (
    <section className={styles.tutSekcija}>
      <div className={styles.tutHead}>
        <div>
          <span className={styles.tutEyebrow}>Znanje iz proizvodnje i primjene</span>
          <h2 className={styles.tutNaslov}>Da se uradi kako treba.</h2>
        </div>
        <Link href={`/${lang}/tutorijali`} className={styles.tutSvi}>Svi tutorijali →</Link>
      </div>
      <div className={styles.tutGrid}>
        {tuts.map((t) => (
          <Link key={t.slug} href={`/${lang}/tutorijali/${t.slug}`} className={styles.tutCard}>
            <span
              className={styles.tutSlika}
              style={{ backgroundImage: `url(${PHOTOS[t.fotoKey as keyof typeof PHOTOS]})` }}
              role="img"
              aria-label={t.naslov}
            />
            <span className={styles.tutKat}>{t.kategorija}</span>
            <span className={styles.tutTitl}>{t.naslov}</span>
            <p className={styles.tutSazetak}>{t.sazetak}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
