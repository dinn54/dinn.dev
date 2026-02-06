import PostsPage from "@/page/posts";
import { getAllTags, getPosts } from "@/features/blog/api/posts";

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
    <PostsPage
      initialPosts={initialPosts}
      allTags={allTags}
      selectedTag={tag}
    />
  );
}
