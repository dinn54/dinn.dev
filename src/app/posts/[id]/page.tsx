import { notFound } from "next/navigation";
import { PostDetail } from "@/features/blog/components/PostDetail";
import {
  getPostById,
  getAdjacentPosts,
  incrementViewCount,
} from "@/features/blog/api/posts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [post, { prev, next }] = await Promise.all([
    getPostById(id),
    getAdjacentPosts(id),
  ]);

  if (!post) {
    notFound();
  }

  incrementViewCount(id);

  return <PostDetail post={post} prevPost={prev} nextPost={next} />;
}
