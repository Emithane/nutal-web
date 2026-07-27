import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Flooring portal — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Flooring portal" opis="Epoksidni i poliuretanski podni sistemi, sloj po sloj. Stranica se gradi ove sedmice." />;
}
