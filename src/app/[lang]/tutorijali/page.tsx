import UPripremi from "@/components/ui/UPripremi";

export const metadata = { title: "Tutorijali — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <UPripremi lang={lang} naslov="Tutorijali" opis="Vodiči korak-po-korak, po portalima. Prvi tutorijali su u pisanju." />;
}
