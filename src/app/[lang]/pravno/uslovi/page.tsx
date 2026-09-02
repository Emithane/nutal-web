import { KONTAKT } from "@/lib/content/kontakt";
import styles from "../pravno.module.css";

export const metadata = { title: "Uslovi korištenja — NUTAL" };

/** NACRT (sedmica 3) — dati klijentu na pregled prije lansiranja. */
export default async function Page() {
  return (
    <main className={styles.wrap}>
      <span className={styles.eyebrow}>Pravno</span>
      <h1 className={styles.naslov}>Uslovi korištenja</h1>
      <div className={styles.prose}>
        <h2>Sadržaj sajta</h2>
        <p>
          Sadržaj ovog sajta — tekstovi, fotografije proizvoda i znak NUTAL —
          vlasništvo je {KONTAKT.firma} i ne smije se koristiti bez dozvole.
        </p>
        <h2>Tehnički podaci i vodiči</h2>
        <p>
          Podaci o proizvodima i vodiči na sajtu su informativne prirode.
          Mjerodavan je tehnički list proizvoda i uputstvo na ambalaži;
          stvarni rezultat zavisi od podloge, uslova i načina nanošenja. Za
          izbor sistema za konkretan posao obratite se našoj tehničkoj
          podršci.
        </p>
        <h2>Kalkulator potrošnje</h2>
        <p>
          Kalkulator daje procjenu na osnovu izdašnosti iz tehničkih podataka
          proizvoda. Procjena ne zamjenjuje proračun za veće radove.
        </p>
        <h2>Kontakt</h2>
        <p>
          {KONTAKT.firma}, {KONTAKT.adresa}, {KONTAKT.grad},{" "}
          {KONTAKT.drzava} · {KONTAKT.telefon} · {KONTAKT.email}
        </p>
      </div>
    </main>
  );
}
