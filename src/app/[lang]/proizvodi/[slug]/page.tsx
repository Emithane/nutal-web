import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/content/products";
import { KONTAKT } from "@/lib/content/kontakt";
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

      {(() => {
        const [ime, ...rest] = p.naziv.split("—");
        const tagline = rest.join("—").trim();
        return (
          <header className={styles.glava}>
            <span className={styles.eyebrow}>{p.potkategorija || p.kategorija}</span>
            <h1 className={styles.naslov}>{ime.trim()}</h1>
            {tagline && <p className={styles.tagline}>{tagline}</p>}
          </header>
        );
      })()}
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
          {p.tehnicki.potrosnja && (
            <p className={styles.kalkLink}>
              <Link href={`/${lang}/kalkulatori?proizvod=${p.slug}`}>
                Izračunajte potrošnju za ovaj proizvod →
              </Link>
            </p>
          )}
        </section>
      )}

      <div className={styles.akcije}>
        {p.tds && (
          <a
            className={styles.solid}
            href={`${KONTAKT.emailHref}?subject=${encodeURIComponent(`Tehnički list — ${p.internoIme}`)}`}
          >
            Zatražite tehnički list
          </a>
        )}
        <a
          className={styles.quiet}
          href={`${KONTAKT.emailHref}?subject=${encodeURIComponent(`Pitanje o proizvodu — ${p.internoIme}`)}`}
        >
          Trebam stručan savjet
        </a>
      </div>

      {(() => {
        const povezani = getRelatedProducts(p.slug);
        if (povezani.length === 0) return null;
        return (
          <section className={styles.povezaniSekcija}>
            <h2 className={styles.povezaniNaslov}>Iz iste porodice</h2>
            <ul className={styles.povezaniGrid}>
              {povezani.map((r) => {
                const [ime, ...rest] = r.naziv.split("—");
                return (
                  <li key={r.slug}>
                    <Link href={`/${lang}/proizvodi/${r.slug}`} className={styles.povezaniCard}>
                      <span className={styles.povezaniKat}>{r.potkategorija || r.kategorija}</span>
                      <span className={styles.povezaniIme}>{ime.trim()}</span>
                      <span className={styles.povezaniTag}>{rest.join("—").trim()}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })()}

      <p className={styles.napomena}>
        Fotografija proizvoda i dokumenti za preuzimanje su u pripremi — do
        tada tehnički list šaljemo na email, obično isti radni dan.
      </p>
    </main>
  );
}
