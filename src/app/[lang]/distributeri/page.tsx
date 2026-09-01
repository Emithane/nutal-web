import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Distributeri" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Distributeri" opis="Mapa prodajnih mjesta po gradovima — objavljuje se sa spiskom distributera." />;
}
