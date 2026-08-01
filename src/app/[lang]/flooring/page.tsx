import PortalPage from "@/components/portal/PortalPage";

export const metadata = { title: "Podni sistemi — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <PortalPage lang={lang} slug="flooring" />;
}
