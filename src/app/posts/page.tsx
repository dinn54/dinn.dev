import type { Metadata } from "next";
import PostsPage from "@/page/posts";
import { getAllTags, getPosts } from "@/features/blog/api/posts";
import { siteConfig } from "@/shared/config/siteConfig";

export const metadata: Metadata = {
  title: "글",
  description: "개발, 기술, 경험에 관한 글 모음",
  alternates: { canonical: "/posts" },
  openGraph: {
    type: "website",
    title: "글 | Dinn.dev",
    description: "개발, 기술, 경험에 관한 글 모음",
    url: "/posts",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${siteConfig.name} 블로그`,
  url: `${siteConfig.url}/posts`,
  description: "개발, 기술, 경험에 관한 글 모음",
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
  },
};

export default async function Posts({
  searchParams,
}: {
  searchParams?: Promise<{ tag: string }>;
}) {
  const tag = searchParams ? (await searchParams).tag : undefined;

  const [initialPosts, allTags] = await Promise.all([
    getPosts({ limit: 8, tag }),
    getAllTags(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostsPage
        initialPosts={initialPosts}
        allTags={allTags}
        selectedTag={tag}
      />
    </>
  );
}
