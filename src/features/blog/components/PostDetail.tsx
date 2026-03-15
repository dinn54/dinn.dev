import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { SaveButton } from "./SaveButton";
import { ShareButton } from "./ShareButton";
import { ScrollTopButton } from "./ScrollTopButton";
import StandalonePageContainer from "@/shared/ui/StandalonePageContainer";
import { Post } from "../api/posts";
import LexicalRenderer, { LexicalNode } from "./LexicalRenderer";
import MarkdownRenderer from "./MarkdownRenderer";
import { TableOfContents } from "./TableOfContents";

interface PostDetailProps {
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
}

function generateTOC(nodes?: LexicalNode[]) {
  if (!nodes) return [];
  const toc: { key: string; text: string; level: number }[] = [];

  nodes.forEach((node) => {
    if (node.type === "heading") {
      const text = node.children?.[0]?.text || "";
      const level = parseInt(node.tag?.replace("h", "") || "1", 10);
      if (text && (level === 2 || level === 3)) {
        toc.push({
          key: text, // Using text as ID/Key for simplicity matching Renderer
          text,
          level,
        });
      }
    }
  });

  return toc;
}

export function PostDetail({ post, prevPost, nextPost }: PostDetailProps) {
  const toc = generateTOC(post.contentJSON);

  return (
    <StandalonePageContainer>
      <div className="mx-auto w-full max-w-[1440px] py-10">
        <div className="relative mx-auto w-full max-w-[960px]">
        <article className="min-w-0 w-full">
          {/* Top Back Navigation */}
          <div className="mb-8">
            <Link
              href="/posts"
              className="group flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              목록으로 돌아가기
            </Link>
          </div>

          {/* Article Header */}
          <header id="post-header" className="relative mb-5">
            <div className="animate-in fade-in absolute -top-10 -left-10 -z-10 h-32 w-32 rounded-full bg-teal-400/10 opacity-0 blur-3xl duration-1000 dark:opacity-20"></div>

            <h1 className="font-heading mb-4 text-xl leading-snug font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl dark:text-white">
              {post.title}
            </h1>

            <p className="mb-8 max-w-[600px] font-sans text-base leading-relaxed font-normal break-keep text-slate-500 sm:text-lg dark:text-slate-400">
              {post.description}
            </p>

            <div className="mt-6 flex w-full flex-wrap items-center gap-6 border-t border-slate-100 pt-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <div className="flex items-center gap-2 py-4">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date} className="font-sans font-medium">
                  {post.date.replace(/-/g, ".")}
                </time>
              </div>

              <div className="flex items-center gap-2 py-4">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}분</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-3 w-px bg-slate-200 dark:bg-slate-700"></span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/posts?tag=${encodeURIComponent(tag)}`}
                      className="cursor-pointer font-sans text-xs font-medium text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Content Renderer */}
          <div id="post-content">
            {post.contentJSON ? (
              <LexicalRenderer nodes={post.contentJSON} />
            ) : post.content ? (
              <MarkdownRenderer markdown={post.content} />
            ) : (
              <div className="py-20 text-center text-slate-500">
                <p>콘텐츠를 불러올 수 없습니다.</p>
              </div>
            )}
          </div>

          {/* Footer Actions & Navigation Combined */}
          <div id="post-footer" className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
            <div className="mb-10 flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {post.author.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      {post.author.role}
                    </span>
                  </div>
                </div>
                <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-slate-800"></div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Last updated:</span>
                  <time
                    dateTime={post.updatedDate || post.date}
                    className="font-medium"
                  >
                    {(post.updatedDate || post.date).replace(/-/g, ".")}
                  </time>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 pr-4 sm:flex-row sm:items-center sm:gap-3 sm:pr-0">
                <SaveButton postTitle={post.title} />
                <div id="btn-save-divider" className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-700"></div>
                <ShareButton title={post.title} description={post.description} />
              </div>
            </div>

            <div id="post-navigation" className="flex flex-col items-stretch gap-6 md:flex-row">
              {prevPost ? (
                <Link
                  href={`/posts/${encodeURIComponent(prevPost.slug)}`}
                  className="group relative flex flex-1 cursor-pointer items-center gap-4 rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                >
                  <ArrowLeft className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-medium text-slate-400">
                      이전 글
                    </span>
                    <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {prevPost.title}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div className="flex-1"></div>
              )}

              <div className="hidden items-center justify-center md:flex">
                <ScrollTopButton />
              </div>

              {nextPost ? (
                <Link
                  href={`/posts/${encodeURIComponent(nextPost.slug)}`}
                  className="group relative flex flex-1 cursor-pointer items-center justify-end gap-4 rounded-xl border border-slate-200 p-4 text-right transition-all duration-300 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                >
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-medium text-slate-400">
                      다음 글
                    </span>
                    <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {nextPost.title}
                    </h4>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                </Link>
              ) : (
                <div className="flex-1"></div>
              )}
            </div>
          </div>
        </article>

        {toc.length > 0 && (
          <aside className="absolute top-10 left-[calc(100%+3rem)] hidden xl:block">
            <TableOfContents toc={toc} />
          </aside>
        )}
        </div>
      </div>
    </StandalonePageContainer>
  );
}
