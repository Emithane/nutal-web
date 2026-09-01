"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./Portal.module.css";

/**
 * Filteri rade KLIJENTSKI nad podacima koje server komponenta izreže iz
 * kataloga — statički export nema server pretragu, a 140 proizvoda je
 * trivijalno za browser. Početno stanje (bez filtera) je prerenderovano,
 * pa sadržaj postoji i bez JavaScripta.
 */
const KAT_RED = ["metal", "drvo", "zid", "podovi", "ceste", "pomocni"];

export interface ExplorerItem {
  slug: string;
  foto: string;
  ime: string;       // dio naziva prije "—"
  tagline: string;   // dio naziva poslije "—"
  opis: string;
  kat: string;       // display kategorija id
  katNaziv: string;
  potkat: string;
  tehnologija: string;
  komponente: string;
  finish: string;
}

export default function ProductExplorer({
  lang,
  items,
}: {
  lang: string;
  items: ExplorerItem[];
}) {
  const [kat, setKat] = useState<string>("sve");
  const [komp, setKomp] = useState<string>("sve");
  const [q, setQ] = useState("");

  /* Dolazak iz tutorijala: ?kat=drvo → portal otvoren već filtriran.
     Jednokratna sinhronizacija sa URL-om na mountu (spoljni sistem). */
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("kat");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (k && items.some((it) => it.kat === k)) setKat(k);
  }, [items]);

  const kategorije = useMemo(() => {
    const m = new Map<string, { naziv: string; count: number }>();
    for (const it of items) {
      const e = m.get(it.kat) ?? { naziv: it.katNaziv, count: 0 };
      e.count += 1;
      m.set(it.kat, e);
    }
    return [...m.entries()].sort(
      ([a], [b]) => KAT_RED.indexOf(a) - KAT_RED.indexOf(b)
    );
  }, [items]);

  const komponente = useMemo(
    () => [...new Set(items.map((i) => i.komponente).filter(Boolean))].sort(),
    [items]
  );

  const rezultat = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      if (kat !== "sve" && it.kat !== kat) return false;
      if (komp !== "sve" && it.komponente !== komp) return false;
      if (!needle) return true;
      return (it.ime + " " + it.tagline + " " + it.opis + " " + it.tehnologija)
        .toLowerCase()
        .includes(needle);
    });
  }, [items, kat, komp, q]);

  const aktivan = kat !== "sve" || komp !== "sve" || q.trim() !== "";

  return (
    <div className={styles.explorer} id="proizvodi">
      <div className={styles.filteri}>
        <div className={styles.chipRow} role="group" aria-label="Kategorija">
          <button
            className={kat === "sve" ? styles.chipOn : styles.chip}
            onClick={() => setKat("sve")}
          >
            Sve <span className={styles.chipNum}>{items.length}</span>
          </button>
          {kategorije.map(([id, k]) => (
            <button
              key={id}
              className={kat === id ? styles.chipOn : styles.chip}
              onClick={() => setKat(kat === id ? "sve" : id)}
            >
              {k.naziv} <span className={styles.chipNum}>{k.count}</span>
            </button>
          ))}
        </div>
        <div className={styles.filterDno}>
          {komponente.length > 1 && (
            <div className={styles.chipRow} role="group" aria-label="Komponente">
              {komponente.map((k) => (
                <button
                  key={k}
                  className={komp === k ? styles.chipOn : styles.chip}
                  onClick={() => setKomp(komp === k ? "sve" : k)}
                >
                  {k}
                </button>
              ))}
            </div>
          )}
          <input
            type="search"
            className={styles.trazi}
            placeholder="Pretraga: npr. lazura, temelj, epoksi…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Pretraga proizvoda"
          />
        </div>
      </div>

      <p className={styles.brojac} aria-live="polite">
        {rezultat.length === items.length
          ? `${items.length} proizvoda`
          : `${rezultat.length} od ${items.length} proizvoda`}
        {aktivan && (
          <button
            className={styles.reset}
            onClick={() => { setKat("sve"); setKomp("sve"); setQ(""); }}
          >
            Poništite filtere ×
          </button>
        )}
      </p>

      {rezultat.length === 0 ? (
        <p className={styles.prazno}>
          Nema proizvoda za ovaj izbor. Poništite filtere ili nas pitajte —
          možda postoji rješenje koje još nije na sajtu.
        </p>
      ) : (
        <ul className={styles.grid}>
          {rezultat.map((it) => (
            <li key={it.slug}>
              <Link href={`/${lang}/proizvodi/${it.slug}`} className={styles.card}>
                {it.foto ? (
                  <span className={styles.cardFoto}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.foto} alt="" loading="lazy" />
                  </span>
                ) : (
                  <span className={styles.cardFotoPrazno} aria-hidden="true" />
                )}
                <span className={styles.cardKat}>{it.potkat || it.katNaziv}</span>
                <span className={styles.cardIme}>{it.ime}</span>
                <span className={styles.cardTagline}>{it.tagline}</span>
                <span className={styles.cardTags}>
                  {[it.tehnologija, it.komponente, it.finish]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
