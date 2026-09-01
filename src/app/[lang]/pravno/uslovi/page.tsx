import UPripremi from "@/components/ui/UPripremi";
export const metadata = { title: "Uslovi korištenja" };
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Uslovi korištenja" opis="Pravni tekstovi se pripremaju i objavljuju prije lansiranja sajta." />;
}
