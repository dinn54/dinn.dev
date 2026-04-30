import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createServerClient } from "@/shared/lib/supabase/server";
import { Tables } from "@/shared/lib/supabase/types";
import { LexicalNode } from "../components/LexicalRenderer";
import { parseMarkdownToLexicalNodes } from "../lib/parseMarkdownServer";

export const BLOG_POSTS_CACHE_TAG = "blog-posts";
export const BLOG_TAGS_CACHE_TAG = "blog-tags";

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  contentJSON?: LexicalNode[];
  readTime: number;
  viewCount: number;
  likeCount: number;
}

function normalizeSlug(value: string): string {
  return decodeURIComponent(value).trim().normalize("NFC");
}

function transformPost(row: Tables<"dinn_posts">): Post {
  let contentJSON: LexicalNode[] | undefined;

  if (row.content) {
    try {
      const parsed = JSON.parse(row.content);
      // Lexical EditorState 구조: { root: { children: [...] } }
      if (parsed.root?.children) {
        contentJSON = parsed.root.children;
      } else if (Array.isArray(parsed)) {
        // 이미 children 배열인 경우
        contentJSON = parsed;
      }
    } catch {
      // content가 JSON이 아닌 경우 (마크다운) - 서버측 파싱
      try {
        contentJSON = parseMarkdownToLexicalNodes(row.content);
      } catch (parseError) {
        console.error("[transformPost] Markdown parse error:", parseError);
      }
    }
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    date: row.published_at
      ? row.published_at.split("T")[0]
      : row.created_at.split("T")[0],
    updatedDate: row.updated_at ? row.updated_at.split("T")[0] : undefined,
    tags: row.tags || [],
    imageUrl: row.image_url || "",
    author: {
      name: row.author_name || "주정혁",
      avatar:
        row.author_avatar || "https://avatars.githubusercontent.com/u/1234567",
      role: row.author_role || "Frontend Engineer",
    },
    content: row.content || "",
    contentJSON,
    readTime: row.read_time,
    viewCount: row.view_count || 0,
    likeCount: row.like_count,
  };
}

async function fetchPosts({
  limit,
  offset,
  tag,
}: {
  limit: number;
  offset: number;
  tag?: string;
}): Promise<Post[]> {
  const supabase = createServerClient();

  let query = supabase
    .from("dinn_posts")
    .select(
      "id, slug, title, description, published_at, created_at, updated_at, tags, image_url, author_name, author_avatar, author_role, read_time, view_count, like_count, is_visible",
    )
    .eq("is_visible", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error(error.message);
  }

  return (data || []).map((row) =>
    transformPost({ ...row, content: null } as Tables<"dinn_posts">),
  );
}

const getCachedPosts = unstable_cache(
  async (limit: number, offset: number, tag?: string) => {
    return fetchPosts({ limit, offset, tag });
  },
  ["blog-posts"],
  { tags: [BLOG_POSTS_CACHE_TAG], revalidate: false },
);

export async function getPosts({
  limit = 10,
  offset = 0,
  tag,
}: {
  limit?: number;
  offset?: number;
  tag?: string;
} = {}): Promise<Post[]> {
  return getCachedPosts(limit, offset, tag);
}

export const getPostBySlug = cache(async function getPostBySlug(rawSlug: string): Promise<Post | null> {
  const supabase = createServerClient();
  const slug = normalizeSlug(rawSlug);

  const { data, error } = await supabase
    .from("dinn_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_visible", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching post:", {
      slug,
      code: error.code,
      message: error.message,
      details: error.details,
    });
    return null;
  }

  return data ? transformPost(data) : null;
});

export const getPostById = cache(async function getPostById(id: string): Promise<Post | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("dinn_posts")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching post by id:", {
      id,
      code: error.code,
      message: error.message,
      details: error.details,
    });
    return null;
  }

  return data ? transformPost(data) : null;
});

export async function getAdjacentPosts(
  currentId: string,
): Promise<{ prev?: Post; next?: Post }> {
  const posts = await getPosts({ limit: 1000 });
  const currentIndex = posts.findIndex((post) => post.id === currentId);

  if (currentIndex === -1) {
    return {};
  }

  return {
    prev: posts[currentIndex + 1],
    next: posts[currentIndex - 1],
  };
}

async function fetchAllTags(): Promise<string[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("dinn_post_tags")
    .select("name, count")
    .order("count", { ascending: false });

  if (error) {
    console.error("Error fetching tags:", error);
    throw new Error(error.message);
  }

  return (data || []).map((tag) => tag.name);
}

export const getAllTags = unstable_cache(
  fetchAllTags,
  ["blog-tags"],
  { tags: [BLOG_TAGS_CACHE_TAG], revalidate: false },
);

export async function incrementViewCount(postId: string): Promise<void> {
  const supabase = createServerClient();

  await supabase.rpc("increment_view_count", { post_id: postId });
}
