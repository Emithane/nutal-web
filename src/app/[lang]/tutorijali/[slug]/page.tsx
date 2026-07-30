import { notFound } from "next/navigation";
import Link from "next/link";
import { getLatestTutorials, getTutorialBySlug } from "@/lib/content/tutorials";
import { LOCALES } from "@/lib/i18n";
import styles from "./page.module.css";

/** Stub detalja tutorijala — puni sadržaj (koraci, fotografije) sedmica 3. */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getLatestTutorials(100).map((t) => ({ lang, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTutorialBySlug(slug);
  return { title: t ? `${t.naslov} — NUTAL` : "Tutorijal — NUTAL" };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = getTutorialBySlug(slug);
  if (!t) notFound();
  return (
    <main className={styles.wrap}>
      <span className={styles.eyebrow}>{t.kategorija}</span>
      <h1 className={styles.naslov}>{t.naslov}</h1>
      <p className={styles.sazetak}>{t.sazetak}</p>
      <p className={styles.napomena}>
        Kompletan vodič — sa numerisanim koracima i fotografijama — je u pripremi.
      </p>
      <Link href={`/${lang}/tutorijali`} className={styles.nazad}>← Svi tutorijali</Link>
    </main>
  );
}
