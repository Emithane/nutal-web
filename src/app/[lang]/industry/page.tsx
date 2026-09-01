import PortalPage from "@/components/portal/PortalPage";

export const metadata = { title: "Portal za profesionalce", description: "Antikorozivni sistemi po ISO 12944, premazi za ceste i industrijske linije — NUTAL za izvođače, uz tehničku podršku." };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <PortalPage lang={lang} slug="industry" />;
}
