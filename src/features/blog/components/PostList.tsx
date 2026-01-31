import React from "react";
import Link from "next/link";
import { TagListScroller } from "./TagListScroller";
import FixedLiftUpIcon from "@/page/home/ui/fixedLiftUpIcon";
import { Post } from "../api/posts";

interface PostListProps {
  initialPosts: Post[];
  allTags: string[];
  initialSelectedTags?: string[];
}

export function PostList({
  initialPosts,
  allTags,
  initialSelectedTags = [],
}: PostListProps) {
  return (
    <>
      {/* Tag Filter - Minimal Text Style */}
      <div className="tab:pt-10 flex w-full items-center border-b border-slate-100 py-6 dark:border-slate-800">
        <Link
          href="/posts"
          className={`mr-2 shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            initialSelectedTags.length === 0
              ? "bg-blog-light dark:bg-blog-dark text-blue-700 shadow-sm dark:text-blue-300"
              : "hover:bg-blog-light dark:hover:bg-blog-dark text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
          }`}
        >
          All
        </Link>

        {/* Client Scroller Wrapper */}
        <TagListScroller>
          {allTags.map((tag) => {
            const isSelected = initialSelectedTags.includes(tag);

            return (
              <Link
                key={tag}
                href={isSelected ? "/posts" : `/posts?tag=${tag}`}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-blog-light dark:bg-blog-dark text-blue-700 shadow-sm dark:text-blue-300"
                    : "hover:bg-blog-light dark:hover:bg-blog-dark text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
                }`}
              >
                {tag}
              </Link>
            );
          })}
        </TagListScroller>
      </div>

      <div className="flex flex-col">
        {initialPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="group relative flex cursor-pointer flex-col items-start gap-2 border-b border-slate-100 py-5 transition-colors last:border-0 dark:border-slate-800"
          >
            {/* Content */}
            <div className="flex h-full w-full min-w-0 flex-col py-1">
              <div className="mb-2.5 flex items-center gap-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                <time dateTime={post.date} className="font-mono text-slate-400">
                  {post.date}
                </time>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:text-2xl dark:text-white dark:group-hover:text-blue-400">
                {post.title}
              </h2>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-2 text-sm text-slate-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:text-slate-400">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {initialPosts.length === 0 && (
        <div className="mt-12 flex h-20 w-full items-center justify-center text-slate-500">
          게시글이 없습니다.
        </div>
      )}

      <FixedLiftUpIcon targetId="app-scroll-container" />
    </>
  );
}
