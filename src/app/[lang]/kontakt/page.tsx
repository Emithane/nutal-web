import { KONTAKT } from "@/lib/content/kontakt";
import styles from "./page.module.css";

export const metadata = {
  title: "Kontakt — NUTAL, tvornica boja i lakova, Vitez",
  description:
    "NUTAL d.o.o., Počulica b.b., 72250 Vitez. Telefon +387 30 522 220, info@nutal.ba.",
};

/**
 * Kontakt — podaci klijenta (sedmica 2). Kontakt FORMA stiže u sedmici 4
 * (uz email setup na domeni); do tada direktni kanali: telefon i email.
 */
export default async function Page() {
  return (
    <main className={styles.wrap}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>Kontakt</span>
        <h1 className={styles.naslov}>Recite nam šta premazujete.</h1>
        <p className={styles.lede}>
          Pitanje o proizvodu, izbor sistema za konkretnu podlogu ili ponuda
          za veći posao — javite se, dio našeg posla je i da pomognemo
          izabrati pravo rješenje.
        </p>
      </header>

      <div className={styles.grid}>
        <div>
          <div className={styles.kolTitle}>Telefon</div>
          <a href={KONTAKT.telefonHref} className={styles.velika}>
            {KONTAKT.telefon}
          </a>
        </div>
        <div>
          <div className={styles.kolTitle}>Email</div>
          <a href={KONTAKT.emailHref} className={styles.velika}>
            {KONTAKT.email}
          </a>
        </div>
        <div>
          <div className={styles.kolTitle}>Adresa</div>
          <address className={styles.adresa}>
            {KONTAKT.firma} — {KONTAKT.djelatnost}
            <br />
            {KONTAKT.adresa}
            <br />
            {KONTAKT.grad}
            <br />
            {KONTAKT.drzava}
          </address>
        </div>
      </div>

      <p className={styles.napomena}>
        Kontakt forma na sajtu je u pripremi — do tada nas najbrže dobijate
        telefonom ili na email.
      </p>
    </main>
  );
}
