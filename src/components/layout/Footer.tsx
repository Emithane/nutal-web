import Link from "next/link";
import styles from "./Footer.module.css";

/**
 * §3.1.9 — 4 kolone: portali / resursi / kompanija / kontakt+adresa.
 * Telefon i email NE izmišljamo — dodaju se kad klijent dostavi (§5.2).
 */
export default function Footer({ lang }: { lang: string }) {
  const p = (path: string) => `/${lang}${path}`;
  const year = new Date().getFullYear();

  const cols: { naslov: string; links: { href: string; label: string }[] }[] = [
    {
      naslov: "Portali",
      links: [
        { href: "/diy", label: "DIY — kućni korisnici" },
        { href: "/industry", label: "Industrija i izvođači" },
        { href: "/flooring", label: "Podni sistemi" },
      ],
    },
    {
      naslov: "Resursi",
      links: [
        { href: "/ton-karta", label: "Ton karta" },
        { href: "/kalkulatori", label: "Kalkulatori potrošnje" },
        { href: "/tutorijali", label: "Tutorijali" },
      ],
    },
    {
      naslov: "Kompanija",
      links: [
        { href: "/o-nama", label: "O nama" },
        { href: "/distributeri", label: "Distributeri" },
        { href: "/kontakt", label: "Kontakt" },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {cols.map((c) => (
            <div key={c.naslov}>
              <div className={styles.colTitle}>{c.naslov}</div>
              <ul className={styles.colList}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={p(l.href)} className={styles.colLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className={styles.colTitle}>NUTAL d.o.o.</div>
            <address className={styles.address}>
              Tvornica boja i lakova
              <br />
              Počulica bb, 72250 Vitez
              <br />
              Bosna i Hercegovina
            </address>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} NUTAL d.o.o. Sva prava zadržana.</span>
          <div className={styles.legal}>
            <Link href={p("/pravno/privatnost")} className={styles.colLink}>Privatnost</Link>
            <Link href={p("/pravno/uslovi")} className={styles.colLink}>Uslovi korištenja</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
