import { getHomeStats } from "@/lib/content/products";
import styles from "./Home.module.css";

/**
 * §3.1.6 — proof traka. Po v2 konceptu (odluka klijenta): tamna traka,
 * treći slot je OBEĆANJE (tehnička podrška) umjesto klimave metrike broja
 * tehnologija. "m² obrađenih podova" i dalje čekamo od klijenta.
 */
export default function Statistike() {
  const s = getHomeStats();
  const stats = [
    { broj: `${s.godinaProizvodnje} godina`, label: "Proizvodnje u Vitezu" },
    { broj: `${s.brojProizvoda} proizvoda`, label: "U katalogu" },
    { broj: "Tehnička podrška", label: "Za pravi sistem premaza" },
  ];
  return (
    <section className={styles.stats}>
      <div className={styles.statsInner}>
        {stats.map((st) => (
          <div key={st.label} className={styles.statItem}>
            <div className={styles.statNum}>{st.broj}</div>
            <div className={styles.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
