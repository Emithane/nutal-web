import { KONTAKT } from "@/lib/content/kontakt";
import styles from "./Portal.module.css";

/**
 * Flooring dubina za INVESTITORA (odluka klijenta: proizvodi = lista za
 * izvođača; investitor dobija priču i kvalitetne podatke, ne mockupove).
 * Sve tvrdnje su već ustanovljene na sajtu (sistem, testovi, podrška, 1996) —
 * ništa izmišljeno. REZERVISANO za klijentove podatke: reference (objekti,
 * m², fotografije) — najjači dio ove sekcije čeka taj materijal.
 */
const UPIT_TIJELO = [
  "Molim ponudu za podni sistem:",
  "",
  "Objekat i namjena (garaža, hala, radionica, javni prostor): ",
  "Površina (m²): ",
  "Stanje podloge (nov beton, star beton, postojeći premaz): ",
  "Očekivano opterećenje (pješačko, viljuškar, teška mehanizacija): ",
  "Rok izvođenja: ",
  "Kontakt telefon: ",
].join("\n");

export default function FlooringPrica() {
  const href = `${KONTAKT.emailHref}?subject=${encodeURIComponent("Ponuda za podni sistem")}&body=${encodeURIComponent(UPIT_TIJELO)}`;
  return (
    <section className={styles.sisSekcija}>
      <div className={styles.tutHead}>
        <div>
          <span className={styles.tutEyebrow}>Za investitore i naručioce</span>
          <h2 className={styles.tutNaslov}>Pod se ne kupuje iz kante.</h2>
        </div>
      </div>
      <div className={styles.sisGrid}>
        <div className={styles.sisBlok}>
          <h3 className={styles.sisNaslov}>Pod je sistem</h3>
          <p className={styles.sisTekst}>
            Trajan pod čine slojevi koji rade zajedno: grundir koji se veže za
            beton, međusloj koji gradi debljinu gdje opterećenje traži, i
            završni sloj koji trpi točkove, udarce i hemiju. Naše epoksidne i
            poliuretanske familije — Duronut i Emithane — pokrivaju taj put od
            garaže do proizvodne hale.
          </p>
        </div>
        <div className={styles.sisBlok}>
          <h3 className={styles.sisNaslov}>Podloga prije ponude</h3>
          <p className={styles.sisTekst}>
            Skoro sve reklamacije na podove počinju u betonu, ne u materijalu.
            Zato sistem biramo tek kada znamo starost i čvrstoću podloge,
            vlagu i stvarno opterećenje — a ne po kvadratu i cijeni. Ponuda
            koja preskoči ta pitanja nije jeftinija; samo račun stigne
            kasnije.
          </p>
        </div>
        <div className={styles.sisBlok}>
          <h3 className={styles.sisNaslov}>Šta nam pošaljite</h3>
          <p className={styles.sisTekst}>
            Objekat i namjenu, površinu, stanje podloge, očekivano opterećenje
            i rok. Sa tim podacima predlažemo sistem i izvođenje — dugme ispod
            otvara upit sa poljima već spremnim za popunjavanje.
          </p>
          <a href={href} className={styles.sisDugme}>Zatražite ponudu za pod</a>
        </div>
      </div>
    </section>
  );
}
