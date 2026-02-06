"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  visibleCount?: number;
}

export function TagFilter({
  allTags,
  selectedTags,
  visibleCount = 5,
}: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMore = allTags.length > visibleCount;
  const visibleTags = expanded ? allTags : allTags.slice(0, visibleCount);
  const hiddenCount = allTags.length - visibleCount;

  return (
    <div className="tab:pt-10 flex w-full flex-col border-b border-slate-100 py-6 dark:border-slate-800">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/posts"
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedTags.length === 0
              ? "bg-blog-light dark:bg-blog-dark text-blue-700 shadow-sm dark:text-blue-300"
              : "hover:bg-blog-light dark:hover:bg-blog-dark text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
          }`}
        >
          All
        </Link>

        {visibleTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);

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

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            {expanded ? (
              <>
                접기
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                +{hiddenCount}개 더보기
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
