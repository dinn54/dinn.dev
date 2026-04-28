"use server";

import { getPosts, Post } from "./posts";
import { createServerClient } from "@/shared/lib/supabase/server";

const PAGE_SIZE = 8;

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
