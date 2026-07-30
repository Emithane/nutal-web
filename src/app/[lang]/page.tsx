import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Kategorije from "@/components/home/Kategorije";
import Statistike from "@/components/home/Statistike";
import KalkulatorTeaser from "@/components/home/KalkulatorTeaser";
import TutorijaliTeaser from "@/components/home/TutorijaliTeaser";

export const metadata: Metadata = {
  title: "NUTAL — Tvornica boja i lakova, Vitez",
  description:
    "Proizvođač boja i lakova iz Viteza od 1996. Premazi za drvo, metal i beton — od kućne upotrebe do industrijskih sistema zaštite i epoksidnih podova.",
};

/**
 * Homepage — redukovana verzija (IZMJENA BRIEFA §3.1, odluka klijenta,
 * sedmica 2): landing je usmjerivač za tri publike. Uklonjeni:
 * - portal strip (duplikat hero panela; brojevi proizvoda preseljeni u hero)
 * - ton karta teaser (vraća se kad NUTAL dostavi šifre nijansi — komponenta
 *   TonKartaTeaser postoji i čeka)
 * Tok: hero (usmjeri) → kategorije (mapa po materijalu) → statistike (dokaz)
 * → kalkulator (alat) → tutorijali (DIY dubina). Nav i footer u layout-u.
 */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <main>
      <Hero lang={lang} />
      <Kategorije lang={lang} />
      <Statistike />
      <KalkulatorTeaser lang={lang} />
      <TutorijaliTeaser lang={lang} />
    </main>
  );
}
