import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Kontakt — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Kontakt" opis="Kontakt forma sa ispravnim email setupom stiže u sedmici 4. Adresa: Počulica bb, 72250 Vitez." />;
}
