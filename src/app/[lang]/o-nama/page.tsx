import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "O nama — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="O nama" opis="Historija tvornice u Vitezu od 1996., proizvodni kapaciteti i certifikati." />;
}
