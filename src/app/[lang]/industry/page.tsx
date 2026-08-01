import PortalPage from "@/components/portal/PortalPage";

export const metadata = { title: "Portal za profesionalce — NUTAL" };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <PortalPage lang={lang} slug="industry" />;
}
