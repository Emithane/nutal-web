import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, IS_PRODUCTION_DOMAIN } from "@/lib/site";

/*
 * Fontovi — self-hostani kroz @fontsource (brže, GDPR-čišće).
 * IZMJENA BRIEFA §4.1 (odluka klijenta, sedmica 2): naslovi prelaze sa
 * Playfair Display na Libre Caslon (Farrow & Ball karakter — stariji,
 * mirniji serif, normalna debljina). Display (400) za velike naslove,
 * Text (700) za manje naslove gdje treba čvrstine. Inter i Mono ostaju.
 */
import "@fontsource/libre-caslon-display/400.css";
import "@fontsource/libre-caslon-text/400.css";
import "@fontsource/libre-caslon-text/700.css";
/* IZMJENA BRIEFA §4.1 (odluka klijenta, sedmica 2): tekstualni font
 * Inter → Albert Sans (skandinavski geometrijski, par Libre Caslonu). */
import "@fontsource/albert-sans/400.css";
import "@fontsource/albert-sans/500.css";
import "@fontsource/albert-sans/600.css";
import "@fontsource/jetbrains-mono/500.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s — NUTAL" },
  description:
    "NUTAL d.o.o. Vitez — proizvođač boja, lakova i premaza za dom, industriju i podne sisteme. Od 1996.",
  openGraph: {
    type: "website",
    siteName: "NUTAL",
    locale: "bs_BA",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NUTAL — Tvornica boja i lakova, Vitez" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: IS_PRODUCTION_DOMAIN, follow: IS_PRODUCTION_DOMAIN },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  );
}
