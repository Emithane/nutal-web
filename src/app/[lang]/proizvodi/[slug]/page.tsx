import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/content/products";
import { LOCALES } from "@/lib/i18n";
import styles from "./page.module.css";
import type { TehnickiPodaci } from "@/lib/content/products";

/**
 * MINIMALNA product stranica (sedmica 2) — naziv, breadcrumb, opis i
 * tehnička tabela iz kataloga, ništa izmišljeno. Puni layout iz §3.3
 * (packshot, TDS/SDS dugmad, nijanse, povezani proizvodi, shop slot)
 * dolazi u sedmici 3 — dotad pretraga i linkovi vode na stvarne podatke.
 */

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getAllProducts().map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return { title: p ? `${p.naziv} — NUTAL` : "Proizvod — NUTAL" };
}


const TEH_LABELE: { key: keyof TehnickiPodaci; label: string }[] = [
  { key: "potrosnja", label: "Potrošnja" },
  { key: "razrjedjivanje", label: "Razrjeđivanje" },
  { key: "nanosenje", label: "Nanošenje" },
  { key: "susenjeDodir", label: "Sušenje (na dodir)" },
  { key: "susenjeMedjusloj", label: "Sušenje (međusloj)" },
  { key: "susenjePotpuno", label: "Sušenje (potpuno)" },
  { key: "primjena", label: "Primjena" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const portal =
    p.portal?.includes("Flooring") ? { href: "/flooring", label: "Podovi" }
    : p.portal?.includes("Industrial") ? { href: "/industry", label: "Industrija" }
    : { href: "/diy", label: "DIY" };

  const rows = TEH_LABELE
    .map((t) => ({ label: t.label, value: p.tehnicki[t.key] }))
    .filter((r) => r.value);

  const osobine = [
    { label: "Tehnologija", value: p.tehnologija },
    { label: "Komponente", value: p.komponente },
    { label: "Finish", value: p.finish },
    { label: "Podloga", value: p.podloga },
  ].filter((o) => o.value);

  return (
    <main className={styles.wrap}>
      <nav className={styles.breadcrumb} aria-label="Putanja">
        <Link href={`/${lang}`}>Početna</Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/${lang}${portal.href}`}>{portal.label}</Link>
        {p.kategorija && (
          <>
            <span aria-hidden="true"> / </span>
            <span>{p.kategorija}</span>
          </>
        )}
      </nav>

      <h1 className={styles.naslov}>{p.naziv}</h1>
      {p.opis && <p className={styles.opis}>{p.opis}</p>}

      {osobine.length > 0 && (
        <dl className={styles.osobine}>
          {osobine.map((o) => (
            <div key={o.label} className={styles.osobina}>
              <dt>{o.label}</dt>
              <dd>{o.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {rows.length > 0 && (
        <section className={styles.tehSekcija}>
          <h2 className={styles.tehNaslov}>Tehnički podaci</h2>
          <table className={styles.tehTabela}>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <p className={styles.napomena}>
        Kompletna stranica proizvoda — sa fotografijom, TDS/SDS dokumentima i
        uputstvom za upotrebu — je u pripremi.
      </p>
    </main>
  );
}
