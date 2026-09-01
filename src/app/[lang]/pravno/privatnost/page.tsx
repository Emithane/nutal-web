import UPripremi from "@/components/ui/UPripremi";
export const metadata = { title: "Politika privatnosti" };
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Politika privatnosti" opis="Pravni tekstovi se pripremaju i objavljuju prije lansiranja sajta." />;
}
