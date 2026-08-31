import Link from "next/link";
import { getKalkProizvodi } from "@/lib/content/kalkulator";
import KalkulatorPotrosnje from "@/components/kalkulator/KalkulatorPotrosnje";
import styles from "./page.module.css";

export const metadata = {
  title: "Kalkulator potrošnje — NUTAL",
  description:
    "Izračunajte koliko boje vam treba: površina, broj slojeva i izdašnost proizvoda iz NUTAL kataloga.",
};

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const proizvodi = getKalkProizvodi();
  return (
    <main className={styles.wrap}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>Kalkulator potrošnje</span>
        <h1 className={styles.naslov}>Koliko boje vam treba?</h1>
        <p className={styles.lede}>
          Odaberite proizvod, unesite površinu i broj slojeva — račun koristi
          izdašnost iz tehničkih podataka proizvoda.
        </p>
      </header>
      <KalkulatorPotrosnje lang={lang} proizvodi={proizvodi} />
      <p className={styles.fusnota}>
        U kalkulatoru su proizvodi sa objavljenom izdašnošću ({proizvodi.length}{" "}
        za sada). Za ostale nam{" "}
        <Link href={`/${lang}/kontakt`}>pošaljite upit</Link> — podatke
        dopunjavamo iz tehničkih listova.
      </p>
    </main>
  );
}
