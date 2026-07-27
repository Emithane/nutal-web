"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

interface Hit { slug: string; naziv: string; kategorija: string | null }

/**
 * Pretraga po katalogu. Podaci se učitavaju lazy (dynamic import) tek kad
 * korisnik OTVORI pretragu — products.json ne ulazi u bundle svake stranice.
 */
export default function SearchOverlay({ lang, onClose }: { lang: string; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [all, setAll] = useState<Hit[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    let alive = true;
    import("@/data/products.json").then((m) => {
      if (!alive) return;
      const data = (m.default as { slug: string; naziv: string; internoIme: string | null; kategorija: string | null }[])
        .map((p) => ({ slug: p.slug, naziv: p.naziv, kategorija: p.kategorija }));
      setAll(data);
    });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { alive = false; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const norm = (s: string) => s.toLowerCase();
  const hits =
    all && q.trim().length >= 2
      ? all.filter((p) => norm(p.naziv).includes(norm(q)) || norm(p.kategorija ?? "").includes(norm(q))).slice(0, 8)
      : [];

  return (
    <div className={styles.searchOverlay} role="dialog" aria-modal="true" aria-label="Pretraga proizvoda">
      <div className={styles.searchBox}>
        <div className={styles.searchRow}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži proizvode — npr. lazura, epoksi, temelj…"
            className={styles.searchInput}
          />
          <button type="button" className={styles.iconBtn} aria-label="Zatvori pretragu" onClick={onClose}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>

        {q.trim().length >= 2 && (
          <ul className={styles.searchResults}>
            {hits.length === 0 && (
              <li className={styles.searchEmpty}>
                {all ? "Nema proizvoda za taj pojam. Probaj drugi naziv ili kategoriju." : "Učitavanje kataloga…"}
              </li>
            )}
            {hits.map((h) => (
              <li key={h.slug}>
                <Link href={`/${lang}/proizvodi/${h.slug}`} className={styles.searchHit} onClick={onClose}>
                  <span className={styles.searchHitName}>{h.naziv}</span>
                  {h.kategorija && <span className={styles.searchHitCat}>{h.kategorija}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="button" className={styles.searchBackdrop} aria-label="Zatvori pretragu" onClick={onClose} />
    </div>
  );
}
