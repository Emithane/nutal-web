import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Ton karta" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Ton karta" opis="Šifre nijansi i hex kodovi se pripremaju — ton karta se puni kad NUTAL dostavi podatke." />;
}
