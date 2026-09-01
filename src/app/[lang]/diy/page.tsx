import PortalPage from "@/components/portal/PortalPage";

export const metadata = { title: "DIY portal", description: "Boje, lazure i lakovi za zid, drvo, ogradu i namještaj — NUTAL proizvodi za dom i hobi, sa filterima po kategoriji." };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <PortalPage lang={lang} slug="diy" />;
}
