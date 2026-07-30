import Button from "@/components/ui/Button";
import styles from "./Home.module.css";

/**
 * PRIVREMENO VAN HOMEPAGE (redukcija, sedmica 2) — vraća se u page.tsx
 * kad NUTAL dostavi šifre nijansi i hex kodove za pravu ton kartu.
 * §3.1.4 — grid swatcheva + CTA. Prave šifre nijansi i hex kodovi dolaze
 * od NUTAL-a (§5.2) i pune se kroz CMS — do tada je grid vizuelni nagovještaj
 * BEZ oznaka (ne izmišljamo šifre nijansi).
 */
const PREVIEW = [
  "#8a9a5b", "#c2b280", "#a0522d", "#708090", "#556b2f", "#d2b48c", "#4a6741", "#b0a494",
  "#6b8e23", "#8b7355", "#2f4f4f", "#cd853f", "#9caf88", "#7d6608", "#5d6d7e", "#a67b5b",
];

export default function TonKartaTeaser({ lang }: { lang: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Ton karta</h2>
      </div>
      <div className={styles.swatchGrid} aria-hidden="true">
        {PREVIEW.map((hex) => (
          <div key={hex} className={styles.swatch} style={{ background: hex }} />
        ))}
      </div>
      <p className={styles.tonNote}>
        Kompletna ton karta sa šiframa nijansi je u pripremi.
      </p>
      <Button href={`/${lang}/ton-karta`} variant="secondary">Istražite boje</Button>
    </section>
  );
}
