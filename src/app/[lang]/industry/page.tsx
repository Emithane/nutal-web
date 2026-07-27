import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Industry portal — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Industry portal" opis="Antikorozivna zaštita, ceste i signalizacija, industrijsko drvo. Stranica se gradi ove sedmice." />;
}
