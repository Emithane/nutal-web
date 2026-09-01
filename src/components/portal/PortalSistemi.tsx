import { KONTAKT } from "@/lib/content/kontakt";
import styles from "./Portal.module.css";

/**
 * Dubina Industry portala — ekvivalent tutorijala za profesionalca.
 * NAMJERNO bez tabele "proizvod → klasa korozije": takvu preporuku smije
 * potpisati samo tehnolog. Umjesto toga: kako se sistem sastavlja (opšte,
 * po ISO 12944) + strukturisan upit koji tehničkoj podršci stiže sa svim
 * podacima potrebnim za preporuku.
 */
const UPIT_TIJELO = [
  "Molim preporuku sistema premaza za sljedeći posao:",
  "",
  "Podloga i stanje (npr. nov čelik / stara boja / korozija): ",
  "Izloženost (unutra, vani, industrija, obala; ISO 12944 kategorija ako je poznata): ",
  "Očekivani vijek zaštite (godine): ",
  "Način nanošenja (četka, valjak, airless): ",
  "Površina (m²) i rok: ",
  "Kontakt telefon: ",
].join("\n");

export default function PortalSistemi() {
  const href = `${KONTAKT.emailHref}?subject=${encodeURIComponent("Preporuka sistema premaza")}&body=${encodeURIComponent(UPIT_TIJELO)}`;
  return (
    <section className={styles.sisSekcija}>
      <div className={styles.tutHead}>
        <div>
          <span className={styles.tutEyebrow}>Za izvođače i projektante</span>
          <h2 className={styles.tutNaslov}>Sistem, ne proizvod.</h2>
        </div>
      </div>
      <div className={styles.sisGrid}>
        <div className={styles.sisBlok}>
          <h3 className={styles.sisNaslov}>Šta čini sistem</h3>
          <p className={styles.sisTekst}>
            Antikorozivna zaštita čelika je slojevita: temelj koji se veže za
            metal i nosi antikorozivne pigmente, međusloj koji gradi debljinu,
            i završni sloj koji brani od atmosfere i daje izgled. Zaštitu
            određuje ukupna debljina suhog filma, ne broj kanti.
          </p>
        </div>
        <div className={styles.sisBlok}>
          <h3 className={styles.sisNaslov}>Kako se bira</h3>
          <p className={styles.sisTekst}>
            Standard ISO 12944 razvrstava okolinu u kategorije korozivnosti od
            C1 (grijani prostor) do C5 (industrija i obala), a uz to se bira
            očekivani vijek zaštite. Iz ta dva podatka slijedi sistem — vrsta
            veziva, broj slojeva i debljina. Za svaki proizvod tehnički list
            daje debljine, sušenje i kompatibilne slojeve.
          </p>
        </div>
        <div className={styles.sisBlok}>
          <h3 className={styles.sisNaslov}>Šta nam pošaljite</h3>
          <p className={styles.sisTekst}>
            Podlogu i njeno stanje, izloženost, željeni vijek, način nanošenja,
            površinu i rok. Sa tim podacima tehnička podrška predlaže sistem iz
            našeg programa — dugme ispod otvara upit sa tim poljima već
            spremnim za popunjavanje.
          </p>
          <a href={href} className={styles.sisDugme}>Zatražite preporuku sistema</a>
        </div>
      </div>
    </section>
  );
}
