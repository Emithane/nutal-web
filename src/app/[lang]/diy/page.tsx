import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "DIY portal — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="DIY portal" opis="Proizvodi za kućne korisnike — sa filterima po kategoriji, podlozi i načinu nanošenja. Stranica se gradi ove sedmice." />;
}
