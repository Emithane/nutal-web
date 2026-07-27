import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PortalStrip from "@/components/home/PortalStrip";
import TonKartaTeaser from "@/components/home/TonKartaTeaser";
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
 * Homepage — 9 sekcija tačnim redoslijedom iz briefa §3.1.
 * Nav (1) i footer (9) su u [lang]/layout.tsx — dijele ih sve stranice.
 */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <main>
      <Hero lang={lang} />
      <PortalStrip lang={lang} />
      <TonKartaTeaser lang={lang} />
      <Kategorije lang={lang} />
      <Statistike />
      <KalkulatorTeaser lang={lang} />
      <TutorijaliTeaser lang={lang} />
    </main>
  );
}
