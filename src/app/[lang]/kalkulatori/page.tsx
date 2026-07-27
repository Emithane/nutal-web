import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Kalkulatori potrošnje — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Kalkulatori potrošnje" opis="Četiri kalkulatora: metal (ISO 12944), drvo, epoksi podovi i arhitektonske boje. Formule se prenose iz prototipa i verifikuju." />;
}
