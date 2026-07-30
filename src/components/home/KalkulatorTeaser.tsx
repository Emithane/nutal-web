import Button from "@/components/ui/Button";
import { PHOTOS } from "@/lib/content/interimPhotos";
import styles from "./Home.module.css";

/**
 * §3.1.7 — jedna rečenica + CTA, sada kao full-width fotografska traka
 * (valjci s bojom) sa ravnim scrimom. Ostaje jedna rečenica — brief.
 */
export default function KalkulatorTeaser({ lang }: { lang: string }) {
  return (
    <section
      className={styles.kalkBand}
      style={{ backgroundImage: `url(${PHOTOS.kalkulatorBand})` }}
    >
      <div className={styles.kalkScrim} aria-hidden="true" />
      <div className={styles.kalkInner}>
        <p className={styles.kalkText}>
          Koliko boje treba za vašu površinu? Izračunajte prije nego kupite.
        </p>
        <Button href={`/${lang}/kalkulatori`} variant="light">Otvorite kalkulator</Button>
      </div>
    </section>
  );
}
