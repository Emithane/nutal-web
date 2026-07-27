import Link from "next/link";
import { getProductsByPortal } from "@/lib/content/products";
import styles from "./Home.module.css";

/** §3.1.3 — 3 velika ulaza na tamnozelenoj, numerisano 01/02/03, bez ikona. */
export default function PortalStrip({ lang }: { lang: string }) {
  const portali = [
    {
      href: "/diy",
      naziv: "DIY",
      opis: `${getProductsByPortal("DIY").length} proizvoda za kućne korisnike — zidovi, drvenarija, metal oko kuće.`,
    },
    {
      href: "/industry",
      naziv: "Industrija",
      opis: `${getProductsByPortal("Industrial").length} proizvoda za izvođače i pogone — antikorozija, ceste, industrijsko drvo.`,
    },
    {
      href: "/flooring",
      naziv: "Podovi",
      opis: `${getProductsByPortal("Flooring").length} proizvoda za podne sisteme — epoksi i poliuretan, u slojevima.`,
    },
  ];

  return (
    <section className={styles.portalStrip}>
      <div className={styles.portalInner}>
        {portali.map((p, i) => (
          <Link key={p.href} href={`/${lang}${p.href}`} className={styles.portalItem}>
            <div className={styles.portalNum}>{String(i + 1).padStart(2, "0")}</div>
            <div className={styles.portalName}>{p.naziv}</div>
            <div className={styles.portalDesc}>{p.opis}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
