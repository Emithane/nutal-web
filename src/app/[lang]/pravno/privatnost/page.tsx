import { KONTAKT } from "@/lib/content/kontakt";
import styles from "../pravno.module.css";

export const metadata = { title: "Politika privatnosti — NUTAL" };

/**
 * NACRT (sedmica 3) — tekst opisuje sajt kakav stvarno jeste: statične
 * stranice, bez kolačića, analitike i formi. OBAVEZNO ažurirati kada se
 * uvede kontakt forma (sedmica 4) i dati klijentu na pregled prije
 * lansiranja na nutal.ba.
 */
export default async function Page() {
  return (
    <main className={styles.wrap}>
      <span className={styles.eyebrow}>Pravno</span>
      <h1 className={styles.naslov}>Politika privatnosti</h1>
      <div className={styles.prose}>
        <p>
          Ova stranica objašnjava kako {KONTAKT.firma} postupa sa podacima
          posjetilaca sajta.
        </p>
        <h2>Šta prikupljamo</h2>
        <p>
          Sajt ne koristi kolačiće, ne vodi analitiku posjeta i nema
          korisničke naloge. Pregledanje sajta ne ostavlja podatke kod nas.
        </p>
        <h2>Kada nam se javite</h2>
        <p>
          Ako nas kontaktirate telefonom ili emailom, podatke koje nam tom
          prilikom date — ime, kontakt i sadržaj upita — koristimo isključivo
          da na upit odgovorimo. Ne prosljeđujemo ih trećim stranama i ne
          koristimo ih za slanje reklama.
        </p>
        <h2>Fotografije sa spoljnih servisa</h2>
        <p>
          Dio fotografija na sajtu privremeno se učitava sa spoljnog servisa
          Unsplash; pri učitavanju tih fotografija vaš preglednik kontaktira
          njihov server. Ove fotografije zamjenjujemo vlastitim.
        </p>
        <h2>Pitanja</h2>
        <p>
          Za sva pitanja o privatnosti pišite na {KONTAKT.email} ili nazovite{" "}
          {KONTAKT.telefon}.
        </p>
      </div>
    </main>
  );
}
