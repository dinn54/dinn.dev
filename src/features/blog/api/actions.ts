"use server";

import { getPosts, Post } from "./posts";

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
