"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { KalkProizvod } from "@/lib/content/kalkulator";
import styles from "./Kalkulator.module.css";

/**
 * litara = površina × broj slojeva ÷ izdašnost (m²/l).
 * Raspon izdašnosti iz kataloga daje raspon litara (min–max).
 * "Sa rezervom" = +10% — standardna praksa za gubitke pri nanošenju,
 * jasno označena kao preporuka, ne kao podatak proizvoda.
 */
export default function KalkulatorPotrosnje({
  lang,
  proizvodi,
}: {
  lang: string;
  proizvodi: KalkProizvod[];
}) {
  const [slug, setSlug] = useState("");
  /* Preselekcija iz ?proizvod= poslije mounta — forma ostaje u statičnom
     HTML-u (bez useSearchParams/Suspense koji bi je izbacili iz prerendera). */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("proizvod");
    // Jednokratna sinhronizacija sa URL-om na mountu — legitimna upotreba
    // efekta (spoljni sistem = window.location); lazy initializer bi napravio
    // hydration mismatch jer server ne vidi query string.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q && proizvodi.some((p) => p.slug === q)) setSlug(q);
  }, [proizvodi]);
  const [povrsina, setPovrsina] = useState("");
  const [slojevi, setSlojevi] = useState(2);

  const grupe = useMemo(() => {
    const m = new Map<string, KalkProizvod[]>();
    for (const p of proizvodi) m.set(p.katNaziv, [...(m.get(p.katNaziv) ?? []), p]);
    return [...m.entries()];
  }, [proizvodi]);

  const p = proizvodi.find((x) => x.slug === slug);
  const P = parseFloat(povrsina.replace(",", "."));
  const valid = p && Number.isFinite(P) && P > 0 && P <= 100000;

  const fmt = (n: number) => (Math.ceil(n * 10) / 10).toLocaleString("bs-BA");
  let rezultat: { min: number; max: number } | null = null;
  if (valid && p) {
    rezultat = {
      min: (P * slojevi) / p.maxIzdasnost,
      max: (P * slojevi) / p.minIzdasnost,
    };
  }

  return (
    <div className={styles.kalk}>
      <div className={styles.polja}>
        <label className={styles.polje}>
          <span className={styles.labela}>Proizvod</span>
          <select
            className={styles.unos}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          >
            <option value="">Odaberite proizvod…</option>
            {grupe.map(([kat, lista]) => (
              <optgroup key={kat} label={kat}>
                {lista.map((x) => (
                  <option key={x.slug} value={x.slug}>
                    {x.tagline ? `${x.ime} — ${x.tagline}` : x.ime}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className={styles.polje}>
          <span className={styles.labela}>Površina (m²)</span>
          <input
            className={styles.unos}
            type="number"
            inputMode="decimal"
            min={0.1}
            step={0.1}
            placeholder="npr. 24"
            value={povrsina}
            onChange={(e) => setPovrsina(e.target.value)}
          />
        </label>
        <div className={styles.polje}>
          <span className={styles.labela}>Broj slojeva</span>
          <div className={styles.slojevi} role="group" aria-label="Broj slojeva">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                className={slojevi === n ? styles.slojOn : styles.sloj}
                onClick={() => setSlojevi(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {p && (
        <p className={styles.izdasnost}>
          {p.ime} — izdašnost{" "}
          {p.minIzdasnost === p.maxIzdasnost
            ? `${p.minIzdasnost} m²/l`
            : `${p.minIzdasnost}–${p.maxIzdasnost} m²/l`}{" "}
          po sloju ·{" "}
          <Link href={`/${lang}/proizvodi/${p.slug}`} className={styles.linkProizvod}>
            stranica proizvoda
          </Link>
        </p>
      )}

      {rezultat && (
        <div className={styles.rezultat} aria-live="polite">
          <div className={styles.rezGlavni}>
            <span className={styles.rezBroj}>
              {rezultat.min === rezultat.max
                ? `${fmt(rezultat.min)} l`
                : `${fmt(rezultat.min)}–${fmt(rezultat.max)} l`}
            </span>
            <span className={styles.rezLabela}>
              za {P.toLocaleString("bs-BA")} m² u {slojevi}{" "}
              {slojevi === 1 ? "sloju" : "sloja"}
            </span>
          </div>
          <div className={styles.rezRezerva}>
            Sa preporučenom rezervom od 10%:{" "}
            <strong>
              {rezultat.min === rezultat.max
                ? `${fmt(rezultat.min * 1.1)} l`
                : `${fmt(rezultat.min * 1.1)}–${fmt(rezultat.max * 1.1)} l`}
            </strong>
          </div>
          <p className={styles.rezNapomena}>
            Stvarna potrošnja zavisi od upijanja i hrapavosti podloge, alata i
            načina nanošenja. Za tačan proračun većeg posla —{" "}
            <Link href={`/${lang}/kontakt`} className={styles.linkProizvod}>
              javite nam se
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
