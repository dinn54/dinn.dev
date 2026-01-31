import { notFound } from "next/navigation";
import { PostDetail } from "@/features/blog/components/PostDetail";
import { getPostById, getAdjacentPosts } from "@/features/blog/api/posts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(id);

  return <PostDetail post={post} prevPost={prev} nextPost={next} />;
}
