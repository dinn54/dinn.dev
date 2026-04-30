"use server";

import { getPosts, Post } from "./posts";
import { createServerClient } from "@/shared/lib/supabase/server";

const PAGE_SIZE = 8;

interface PostEngagement {
  likeCount: number;
  viewCount: number;
}

export async function fetchMorePosts({
  offset,
  tag,
}: {
  offset: number;
  tag?: string;
}): Promise<Post[]> {
  return getPosts({ limit: PAGE_SIZE, offset, tag });
}

export async function likePost(postId: string): Promise<number> {
  const supabase = createServerClient();

  const { data, error } = await supabase.rpc("increment_like_count", {
    post_id: postId,
    delta: 1,
  });

  if (error) {
    console.error("[likePost] rpc error:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getPostEngagement(postId: string): Promise<PostEngagement> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("dinn_posts")
    .select("like_count, view_count")
    .eq("id", postId)
    .eq("is_visible", true)
    .maybeSingle();

  if (error) {
    console.error("[getPostEngagement] query error:", error);
    throw new Error(error.message);
  }

  return {
    likeCount: data?.like_count ?? 0,
    viewCount: data?.view_count ?? 0,
  };
}

export async function incrementPostView(postId: string): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase.rpc("increment_view_count", {
    post_id: postId,
  });

  if (error) {
    console.error("[incrementPostView] rpc error:", error);
    throw new Error(error.message);
  }
}
