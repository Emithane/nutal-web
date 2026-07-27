import Link from "next/link";
import styles from "./UPripremi.module.css";

/**
 * Privremena stranica za rute iz navigacije koje se grade u sedmicama 2-3.
 * Postoji da nav nikad ne vodi u 404 — briše se kako se prave stranice grade.
 */
export default function UPripremi({ naslov, opis, lang }: { naslov: string; opis: string; lang: string }) {
  return (
    <main className={styles.wrap}>
      <span className={styles.eyebrow}>U pripremi</span>
      <h1 className={styles.naslov}>{naslov}</h1>
      <p className={styles.opis}>{opis}</p>
      <Link href={`/${lang}`} className={styles.nazad}>← Nazad na početnu</Link>
    </main>
  );
}
