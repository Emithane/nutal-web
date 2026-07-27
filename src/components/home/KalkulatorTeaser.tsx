import Button from "@/components/ui/Button";
import styles from "./Home.module.css";

/** §3.1.7 — jedna rečenica + CTA. */
export default function KalkulatorTeaser({ lang }: { lang: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.teaser}>
        <p className={styles.teaserText}>
          Koliko boje treba za tvoju površinu? Izračunaj prije nego kupiš.
        </p>
        <Button href={`/${lang}/kalkulatori`}>Otvori kalkulator</Button>
      </div>
    </section>
  );
}
