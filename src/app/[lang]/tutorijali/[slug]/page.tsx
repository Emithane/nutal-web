import { notFound } from "next/navigation";
import Link from "next/link";
import { getLatestTutorials, getTutorialBySlug } from "@/lib/content/tutorials";
import { PHOTOS } from "@/lib/content/interimPhotos";
import { LOCALES } from "@/lib/i18n";
import { displayCategoryIdByName } from "@/lib/content/products";
import styles from "./page.module.css";

/**
 * Detalj tutorijala. Dvije forme iz tutorials.json: `koraci` (numerisani
 * vodič) ili `sekcije` (vodič za izbor, bez brojeva). Uvod, "šta vam treba",
 * greške i zaključak su opcioni. Fotografije po koracima stižu sa
 * klijentovim snimcima.
 */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getLatestTutorials(100).map((t) => ({ lang, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTutorialBySlug(slug);
  return {
    title: t ? `${t.naslov} — NUTAL` : "Tutorijal — NUTAL",
    description: t?.sazetak,
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = getTutorialBySlug(slug);
  if (!t) notFound();
  const imaSadrzaj = (t.koraci && t.koraci.length > 0) || (t.sekcije && t.sekcije.length > 0);
  const portalSlug = t.portal === "Industry" ? "industry" : t.portal === "Flooring" ? "flooring" : "diy";
  // "Proizvodi za ovaj posao" = portal već filtriran na kategoriju tutorijala
  const katId = displayCategoryIdByName(t.kategorija);
  const portalHref = `/${lang}/${portalSlug}${katId ? `?kat=${katId}` : ""}#proizvodi`;

  return (
    <main className={styles.wrap}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>{t.kategorija}</span>
        <h1 className={styles.naslov}>{t.naslov}</h1>
        <p className={styles.sazetak}>{t.sazetak}</p>
      </header>

      <div
        className={styles.heroSlika}
        style={{ backgroundImage: `url(${PHOTOS[t.fotoKey as keyof typeof PHOTOS]})` }}
        role="img"
        aria-label={t.naslov}
      />

      {t.uvod && <p className={styles.uvod}>{t.uvod}</p>}

      {t.treba && t.treba.length > 0 && (
        <section className={styles.sekcija}>
          <h2 className={styles.podnaslov}>Šta vam treba</h2>
          <ul className={styles.trebaLista}>
            {t.treba.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      )}

      {t.sekcije && t.sekcije.length > 0 && (
        <div>
          {t.sekcije.map((sek) => (
            <section key={sek.naslov} className={styles.sekcija}>
              <h2 className={styles.podnaslov}>{sek.naslov}</h2>
              <p className={styles.sekTekst}>{sek.tekst}</p>
            </section>
          ))}
        </div>
      )}

      {t.koraci && t.koraci.length > 0 && (
        <section className={styles.sekcija}>
          <h2 className={styles.podnaslov}>Koraci</h2>
          <ol className={styles.koraci}>
            {t.koraci.map((k, i) => (
              <li key={k.naslov} className={styles.korak}>
                <span className={styles.korakBroj}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.korakNaslov}>{k.naslov}</h3>
                  <p className={styles.korakTekst}>{k.tekst}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {!imaSadrzaj && (
        <p className={styles.napomena}>
          Kompletan vodič — sa numerisanim koracima i fotografijama — je u
          pripremi.
        </p>
      )}

      {t.greske && t.greske.length > 0 && (
        <section className={styles.sekcija}>
          <h2 className={styles.podnaslov}>Najčešće greške</h2>
          <ul className={styles.greske}>
            {t.greske.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>
      )}

      {t.zakljucak && <p className={styles.zakljucak}>{t.zakljucak}</p>}

      <div className={styles.dno}>
        <Link href={`/${lang}/tutorijali`} className={styles.nazad}>
          ← Svi tutorijali
        </Link>
        <Link href={portalHref} className={styles.portalLink}>
          Proizvodi za ovaj posao →
        </Link>
      </div>
    </main>
  );
}
