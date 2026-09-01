import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { getAllProducts } from "@/lib/content/products";
import { getLatestTutorials } from "@/lib/content/tutorials";

export const dynamic = "force-static";

/** Sitemap iz istih izvora iz kojih se gradi sajt — nikad zastarjela lista. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticne = [
    "", "/diy", "/industry", "/flooring", "/kalkulatori", "/tutorijali",
    "/o-nama", "/kontakt", "/ton-karta", "/distributeri",
    "/pravno/privatnost", "/pravno/uslovi",
  ];
  const out: MetadataRoute.Sitemap = [];
  for (const lang of LOCALES) {
    for (const s of staticne) {
      out.push({
        url: `${SITE_URL}/${lang}${s}`,
        changeFrequency: s === "" ? "weekly" : "monthly",
        priority: s === "" ? 1 : s.startsWith("/pravno") ? 0.2 : 0.7,
      });
    }
    for (const p of getAllProducts()) {
      out.push({ url: `${SITE_URL}/${lang}/proizvodi/${p.slug}`, changeFrequency: "monthly", priority: 0.6 });
    }
    for (const t of getLatestTutorials(100)) {
      out.push({ url: `${SITE_URL}/${lang}/tutorijali/${t.slug}`, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return out;
}
