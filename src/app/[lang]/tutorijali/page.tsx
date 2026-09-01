import Link from "next/link";
import { getLatestTutorials } from "@/lib/content/tutorials";
import { PHOTOS } from "@/lib/content/interimPhotos";
import styles from "./page.module.css";

export const metadata = {
  title: "Tutorijali",
  description:
    "Vodiči korak po korak iz proizvodnje i primjene: zidovi, metal, drvo, podovi.",
};

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const tuts = getLatestTutorials(100);
  return (
    <main className={styles.wrap}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>Znanje iz proizvodnje i primjene</span>
        <h1 className={styles.naslov}>Da se uradi kako treba.</h1>
        <p className={styles.lede}>
          Vodiči korak po korak — sa redoslijedom, vremenima čekanja i
          greškama koje najskuplje koštaju.
        </p>
      </header>
      <div className={styles.grid}>
        {tuts.map((t) => (
          <Link key={t.slug} href={`/${lang}/tutorijali/${t.slug}`} className={styles.card}>
            <span
              className={styles.slika}
              style={{ backgroundImage: `url(${PHOTOS[t.fotoKey as keyof typeof PHOTOS]})` }}
              role="img"
              aria-label={t.naslov}
            />
            <span className={styles.kat}>{t.kategorija}</span>
            <span className={styles.titl}>{t.naslov}</span>
            <p className={styles.sazetak}>{t.sazetak}</p>
            <span className={styles.vise}>
              {t.koraci ? `${t.koraci.length} koraka →` : t.sekcije ? "Vodič za izbor →" : "Uskoro"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
