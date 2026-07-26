import type { Metadata } from "next";
import "./globals.css";

/*
 * Fontovi iz briefa §4.1 — self-hostani kroz @fontsource pakete
 * (bez poziva ka Google serverima: brže, GDPR-čišće).
 * Težine tačno po specifikaciji: Playfair 600/700, Inter 400/500/600, Mono 500.
 */
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/500.css";

export const metadata: Metadata = {
  title: "NUTAL — Tvornica boja i lakova, Vitez",
  description:
    "NUTAL d.o.o. Vitez — proizvođač boja, lakova i premaza za dom, industriju i podne sisteme. Od 1996.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  );
}
