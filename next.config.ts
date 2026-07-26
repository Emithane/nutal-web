import type { NextConfig } from "next";

/*
 * Statički export za Cloudflare Pages.
 * - output "export": build proizvodi čiste statičke fajlove u /out — nema servera.
 * - images.unoptimized: Next-ov image server ne postoji u statičkom exportu;
 *   slike optimizujemo u build pipeline-u (WebP/AVIF, brief §6.5) prije commita.
 * Redirect / → /bs rješava public/_redirects (Cloudflare Pages konvencija).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
