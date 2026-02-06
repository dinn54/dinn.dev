import { cache } from "react";
import { createServerClient } from "@/shared/lib/supabase/server";
import { DinnPost } from "@/shared/lib/supabase/types";
import { LexicalNode } from "../components/LexicalRenderer";
import { parseMarkdownToLexicalNodes } from "../lib/parseMarkdownServer";

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

function transformPost(row: DinnPost): Post {
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

export async function getPosts({
  limit = 10,
  offset = 0,
  tag,
}: {
  limit?: number;
  offset?: number;
  tag?: string;
} = {}): Promise<Post[]> {
  const supabase = createServerClient();

  let query = supabase
    .from("dinn_posts")
    .select("*")
    .eq("is_visible", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data || []).map(transformPost);
}

export const getPostBySlug = cache(async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("dinn_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_visible", true)
    .single();

  if (error || !data) {
    console.error("Error fetching post:", error);
    return null;
  }

  return transformPost(data);
});

export const getPostById = cache(async function getPostById(id: string): Promise<Post | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("dinn_posts")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (error || !data) {
    console.error("Error fetching post:", error);
    return null;
  }

  return transformPost(data);
});

const ADJACENT_POST_SELECT =
  "id, slug, title, description, published_at, created_at, updated_at, tags, image_url, author_name, author_avatar, author_role, read_time, view_count, like_count, is_visible" as const;

export async function getAdjacentPosts(
  currentId: string,
): Promise<{ prev?: Post; next?: Post }> {
  const supabase = createServerClient();

  // 현재 글의 published_at 가져오기
  const { data: currentPost } = await supabase
    .from("dinn_posts")
    .select("published_at")
    .eq("id", currentId)
    .single();

  if (!currentPost) {
    return {};
  }

  const currentDate = currentPost.published_at;

  // 이전 글, 다음 글 병렬 조회
  const [{ data: prevData }, { data: nextData }] = await Promise.all([
    supabase
      .from("dinn_posts")
      .select(ADJACENT_POST_SELECT)
      .eq("is_visible", true)
      .lt("published_at", currentDate)
      .order("published_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("dinn_posts")
      .select(ADJACENT_POST_SELECT)
      .eq("is_visible", true)
      .gt("published_at", currentDate)
      .order("published_at", { ascending: true })
      .limit(1)
      .single(),
  ]);

  return {
    prev: prevData
      ? transformPost({ ...prevData, content: null } as DinnPost)
      : undefined,
    next: nextData
      ? transformPost({ ...nextData, content: null } as DinnPost)
      : undefined,
  };
}

export async function getAllTags(): Promise<string[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("dinn_post_tags")
    .select("name, count")
    .order("count", { ascending: false });

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  return (data || []).map((tag) => tag.name);
}

export async function incrementViewCount(postId: string): Promise<void> {
  const supabase = createServerClient();

  await supabase.rpc("increment_view_count", { post_id: postId });
}
