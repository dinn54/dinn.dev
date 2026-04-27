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

// Statically generated at build time, revalidated on-demand via /api/revalidate
export const revalidate = false;

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

  const ogImage = post.imageUrl
    ? post.imageUrl
    : `${siteConfig.url}/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/posts/${encodeURIComponent(post.slug)}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
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

  const postUrl = `${siteConfig.url}/posts/${encodeURIComponent(post.slug)}`;
  const ogImage = post.imageUrl
    ? post.imageUrl
    : `${siteConfig.url}/og?title=${encodeURIComponent(post.title)}&tags=${encodeURIComponent(post.tags.join(","))}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: ogImage,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.ogImage}` },
    },
    keywords: post.tags.join(", "),
    wordCount: post.readTime * 200,
    inLanguage: "ko-KR",
    ...(post.tags[0] && { articleSection: post.tags[0] }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "글", item: `${siteConfig.url}/posts` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PostDetail post={post} prevPost={prev} nextPost={next} />
    </>
  );
}
