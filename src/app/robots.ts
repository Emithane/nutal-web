import type { MetadataRoute } from "next";
import { SITE_URL, IS_PRODUCTION_DOMAIN } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Dok sajt živi na privremenoj workers.dev adresi — NE indeksirati: Google bi
 * zapamtio privremeni URL i poslije lansiranja se takmičio sa nutal.ba.
 * Prebacivanjem NEXT_PUBLIC_SITE_URL na https://www.nutal.ba (sedmica 4)
 * indeksiranje se uključuje samo — bez diranja koda.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PRODUCTION_DOMAIN
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
