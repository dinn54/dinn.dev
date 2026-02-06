import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/projects/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
