import PostsPage from "@/page/posts";
import { getAllTags, getPosts } from "@/features/blog/api/posts";

export default async function Posts({
  searchParams,
}: {
  searchParams?: Promise<{ tag: string }>;
}) {
  const tag = searchParams && (await searchParams).tag;

  const initialTags = tag ? [tag] : [];

  const [initialPosts, allTags] = await Promise.all([
    getPosts({ limit: 8, tags: initialTags }),
    getAllTags(),
  ]);

  return (
    <PostsPage
      initialPosts={initialPosts}
      allTags={allTags}
      initialSelectedTags={initialTags}
    />
  );
}
