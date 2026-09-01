import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "O nama",
  description:
    "NUTAL je tvornica boja i lakova iz Viteza, od 1996. Razvijamo i proizvodimo premaze za drvo, metal, zidove, fasade i podove.",
};

/**
 * §3.x O nama — tekst KLIJENTA (dostavljen u sedmici 2), editorijalno
 * prelomljen: Caslon naslov-teza, prose u čitljivoj mjeri, dvije izdvojene
 * rečenice, zaključni par akcija identičan hero paru (jedan glas).
 * Fotografije iz tvornice se dodaju kad ih klijent dostavi — namjerno bez
 * stock "fabrike" (pravilo: prava tvornica ili ništa).
 */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <main className={styles.wrap}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>O nama · Vitez · od 1996.</span>
        <h1 className={styles.naslov}>Kad nešto radite, želite da traje.</h1>
      </header>

      <div className={styles.prose}>
        <p>
          NUTAL je tvornica boja i lakova iz Viteza. Počeli smo 1996. godine.
          Od tada su se promijenili stilovi, materijali i načini gradnje, ali
          jedna stvar nije: kad nešto radite, želite da traje.
        </p>
        <p>
          Trideset godina je dovoljno dugo da naši kupci NUTAL pamte iz
          porodične radionice, s ograde koju je premazivao otac ili iz prve
          kuće koju su uređivali s roditeljima. Danas ga biraju za vlastiti
          dom, posao i projekte koji tek počinju. S drugima smo rasli uporedo
          — kroz prve radionice, gradilišta, hale i poslove koji su se širili
          korak po korak.
        </p>
        <p>
          Mi smo za to vrijeme ostali u Vitezu i nastavili raditi ono od čega
          smo krenuli: razvijati i proizvoditi premaze za drvo, metal,
          zidove, fasade i podove. Za kuću u kojoj se živi, radionicu u kojoj
          se radi i objekte koji moraju izdržati mnogo više od lijepog prvog
          dojma.
        </p>

        <blockquote className={styles.izdvojeno}>
          Kod boje je lako vidjeti nijansu, a teže ono što joj prethodi.
        </blockquote>

        <p>
          Priprema podloge. Pravi temelj. Strpljenje između slojeva. Odnos
          materijala, vremena i ruke koja ga nanosi. Tu nastaje razlika
          između površine koja tek izgleda dobro i one koja će dobro
          izgledati i nakon nekoliko sezona.
        </p>
        <p>
          Ne pravimo proizvode samo da bi lijepo izgledali na polici. Važno
          nam je da svaki ima svoju logiku — od onoga što je u limenci do
          onoga što će napraviti na podlozi.
        </p>
        <p>
          Zato gledamo cijeli put: šta se premazuje, čemu će biti izloženo,
          kako se proizvod nanosi i šta od njega čovjek s razlogom može
          očekivati. Kada su te stvari dobro povezane, rezultat nije stvar
          sreće. Jednostavno — posao ispadne kako treba.
        </p>
        <p>
          Danas taj pristup stoji iza više od sto četrdeset proizvoda u šest
          područja — od lazure za ogradu, preko antikorozivnih sistema po
          ISO 12944, do epoksidnih podova. A kada niste sigurni šta vam
          treba, recite nam šta premazujete i čemu će biti izloženo — dio
          našeg posla je i da vam pomognemo izabrati pravi sistem.
        </p>

        <blockquote className={styles.zakljucak}>
          Svaka podloga traži svoj pristup. Svaki dobar rezultat traži prave
          sastojke. NUTAL je tu da ih sabere — od prvog sloja do trajne
          zaštite.
        </blockquote>
      </div>

      <div className={styles.akcije}>
        <a href={`/${lang}#kategorije`} className={styles.solid}>
          Pronađite svoj proizvod
        </a>
        <Link href={`/${lang}/kontakt`} className={styles.quiet}>
          Trebam stručan savjet
        </Link>
      </div>
    </main>
  );
}
