"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { TagFilter } from "./TagFilter";
import { Post } from "../api/posts";
import { fetchMorePosts } from "../api/actions";

const PAGE_SIZE = 8;

interface PostListProps {
  initialPosts: Post[];
  allTags: string[];
  selectedTag?: string;
}

export function PostList({
  initialPosts,
  allTags,
  selectedTag,
}: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialPosts.length >= PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset when initialPosts change (tag navigation)
  useEffect(() => {
    setPosts(initialPosts);
    setHasMore(initialPosts.length >= PAGE_SIZE);
  }, [initialPosts]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const newPosts = await fetchMorePosts({
      offset: posts.length,
      tag: selectedTag,
    });

    if (newPosts.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);
  }, [loading, hasMore, posts.length, selectedTag]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      {/* Tag Filter */}
      <TagFilter allTags={allTags} selectedTag={selectedTag} />

      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${encodeURIComponent(post.slug)}`}
            className="group relative -mx-3 flex cursor-pointer flex-col items-start gap-2 rounded-lg border-b border-slate-200/70 px-3 py-5 transition-colors duration-300 ease-in-out last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-white/[0.03]"
          >
            {/* Content */}
            <div className="flex h-full w-full min-w-0 flex-col py-1">
              <div className="mb-2.5 flex items-center gap-3 text-xs font-medium text-slate-400 transition-colors duration-300 ease-in-out dark:text-slate-500">
                <time dateTime={post.date} className="font-mono text-slate-400">
                  {post.date}
                </time>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 ease-in-out group-hover:text-slate-600 sm:text-2xl dark:text-white dark:group-hover:text-slate-300">
                {post.title}
              </h2>

              {post.description && (
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:transition-[grid-template-rows] md:duration-500 md:ease-in-out md:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-2 text-sm text-slate-500 transition-[color,opacity] duration-300 ease-in-out md:opacity-0 md:group-hover:opacity-100 dark:text-slate-400">
                      {post.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mt-12 flex h-20 w-full items-center justify-center text-slate-500 transition-colors duration-300 ease-in-out">
          게시글이 없습니다.
        </div>
      )}

      {/* Sentinel for IntersectionObserver */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          {loading && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 transition-colors duration-300 ease-in-out dark:border-slate-800 dark:border-t-slate-100" />
          )}
        </div>
      )}

      {/* Bottom padding to prevent overlap with FixedLiftUpIcon */}
      <div className="pb-20" />
    </>
  );
}
