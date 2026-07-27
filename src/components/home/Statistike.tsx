import { getHomeStats } from "@/lib/content/products";
import styles from "./Home.module.css";

/**
 * §3.1.6 — monumentalne brojke. Brief predviđa i "m² obrađenih podova";
 * taj broj čekamo od klijenta — ne izmišlja se. Do tada: broj tehnologija.
 */
export default function Statistike() {
  const s = getHomeStats();
  const stats = [
    { broj: s.godinaProizvodnje, label: "Godina proizvodnje" },
    { broj: s.brojProizvoda, label: "Proizvoda u katalogu" },
    { broj: s.brojTehnologija, label: "Tehnologija premaza" },
  ];
  return (
    <section className={styles.stats}>
      <div className={styles.statsInner}>
        {stats.map((st) => (
          <div key={st.label}>
            <div className={styles.statNum}>{st.broj}</div>
            <div className={styles.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
