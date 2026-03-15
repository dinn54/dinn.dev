import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/features/blog/components/PostDetail";
import {
  getPosts,
  getPostBySlug,
  getAdjacentPosts,
  incrementViewCount,
} from "@/features/blog/api/posts";
import { siteConfig } from "@/shared/config/siteConfig";

export async function generateStaticParams() {
  const posts = await getPosts({ limit: 1000 });
  return posts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const ogImage = post.imageUrl || siteConfig.ogImage;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/posts/${encodeURIComponent(post.slug)}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [ogImage],
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(post.id);
  incrementViewCount(post.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.imageUrl || undefined,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetail post={post} prevPost={prev} nextPost={next} />
    </>
  );
}
