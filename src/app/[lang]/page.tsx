import Image from "next/image";
import { getAllProducts, countByPortal } from "@/lib/content/products";
import styles from "./page.module.css";

/**
 * Sedmica 1 — privremena stranica.
 * Svrha: dokazati da deploy ciklus radi (GitHub → Vercel → živi URL)
 * i da su dizajn tokeni, fontovi i podaci iz kataloga povezani.
 * Zamjenjuje se pravim homepage-om u sedmici 2 (brief §3.1).
 */
export default function Home() {
  const ukupno = getAllProducts().length;
  const poPortalu = countByPortal();

  return (
    <main className={styles.main}>
      <div className={styles.traka}>Sajt u izgradnji — lansiranje uskoro</div>

      <Image
        src="/logo-nutal.svg"
        alt="NUTAL — tvornica boja i lakova"
        width={140}
        height={192}
        priority
        className={styles.logo}
      />

      <div>
        <h1 className={styles.naslov}>NUTAL</h1>
        <p className={styles.tagline}>Sabrati prave sastojke.</p>
      </div>

      <p className={styles.info}>
        Tvornica boja i lakova, Vitez. Od 1996. proizvodimo premaze za
        zaštitu drveta, metala i betona — od kućne upotrebe do
        industrijskih sistema.
      </p>

      <div className={styles.stat}>
        <div>
          <div className={styles.statBroj}>{ukupno}</div>
          <div className={styles.statLabel}>Proizvoda</div>
        </div>
        <div>
          <div className={styles.statBroj}>{poPortalu.Industrial}</div>
          <div className={styles.statLabel}>Industrijskih</div>
        </div>
        <div>
          <div className={styles.statBroj}>{new Date().getFullYear() - 1996}</div>
          <div className={styles.statLabel}>Godina proizvodnje</div>
        </div>
      </div>
    </main>
  );
}
