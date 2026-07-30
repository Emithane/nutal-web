"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchOverlay from "./SearchOverlay";
import styles from "./Header.module.css";

/**
 * Dvoslojna navigacija (§3.1.1, Tikkurila pattern):
 * - audience bar: DIY | Profesionalci | Podovi — ostaje vidljiv i na mobilnom (§6.6)
 * - main nav: sticker logo (prelazi granicu nava ~40px, drop-shadow §4.3),
 *   linkovi, pretraga. Mobilno: full-screen overlay.
 * Client komponenta samo zbog dva stanja (mobilni meni, pretraga) —
 * sve ostalo je statični markup.
 */
const AUDIENCE = [
  { href: "/diy", label: "DIY" },
  { href: "/industry", label: "Profesionalci" },
  { href: "/flooring", label: "Podovi" },
];

const NAV = [
  { href: "/diy", label: "Proizvodi" },
  { href: "/ton-karta", label: "Ton karta" },
  { href: "/kalkulatori", label: "Kalkulatori" },
  { href: "/tutorijali", label: "Tutorijali" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header({ lang }: { lang: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // overlay otvoren → zaključaj scroll pozadine
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  const p = (path: string) => `/${lang}${path}`;

  return (
    <header className={styles.header}>
      <div className={styles.audienceBar}>
        <div className={styles.audienceInner}>
          {AUDIENCE.map((a) => (
            <Link key={a.href} href={p(a.href)} className={styles.audienceLink}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.mainNavInner}>
          <Link href={p("")} className={styles.logoLink} aria-label="NUTAL — početna">
            <Image
              src="/logo-nutal.svg"
              alt="NUTAL"
              width={96}
              height={132}
              priority
              className={styles.logo}
            />
          </Link>

          <nav className={styles.navLinks} aria-label="Glavna navigacija">
            {NAV.map((n) => (
              <Link key={n.label} href={p(n.href)} className={styles.navLink}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Pretraga proizvoda"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </button>
            <Link href={p("/kontakt")} className={styles.ctaLink}>
              Zatražite ponudu
            </Link>
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.burger}`}
              aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileOverlay}>
          <nav aria-label="Mobilna navigacija" className={styles.mobileNav}>
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={p(n.href)}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {searchOpen && <SearchOverlay lang={lang} onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
