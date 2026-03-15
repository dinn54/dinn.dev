import type { MetadataRoute } from "next";
import { getPosts } from "@/features/blog/api/posts";
import { siteConfig } from "@/shared/config/siteConfig";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts({ limit: 1000 });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${encodeURIComponent(post.slug)}`,
    lastModified: post.updatedDate ?? post.date,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date().toISOString().split("T")[0] },
    { url: `${siteConfig.url}/about`, lastModified: new Date().toISOString().split("T")[0] },
    { url: `${siteConfig.url}/posts`, lastModified: new Date().toISOString().split("T")[0] },
  ];

  return [...staticPages, ...postEntries];
}
