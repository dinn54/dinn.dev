"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TagFilterProps {
  allTags: string[];
  selectedTag?: string;
  visibleCount?: number;
}

function getVisibleTags(
  allTags: string[],
  selectedTag: string | undefined,
  limit: number,
) {
  const baseTags = allTags.slice(0, limit);
  if (!selectedTag || baseTags.includes(selectedTag) || !allTags.includes(selectedTag)) {
    return baseTags;
  }

  if (limit <= 1) {
    return [selectedTag];
  }

  return [...allTags.slice(0, limit - 1), selectedTag];
}

export function TagFilter({
  allTags,
  selectedTag,
  visibleCount = 5,
}: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const [currentVisibleCount, setCurrentVisibleCount] = useState(visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCurrentVisibleCount(7);
      } else if (width >= 1024) {
        setCurrentVisibleCount(6);
      } else if (width >= 768) {
        setCurrentVisibleCount(5);
      } else if (width >= 640) {
        setCurrentVisibleCount(4);
      } else if (width >= 480) {
        setCurrentVisibleCount(3);
      } else {
        setCurrentVisibleCount(2);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const visibleTagsBase = getVisibleTags(allTags, selectedTag, currentVisibleCount);
  const hasMore = allTags.length > currentVisibleCount;
  const visibleTags = expanded ? allTags : visibleTagsBase;
  const hiddenCount = Math.max(0, allTags.length - currentVisibleCount);

  return (
    <div className="tab:pt-10 flex w-full flex-col border-b border-slate-200/70 py-6 transition-colors duration-300 ease-in-out dark:border-slate-800">
      <div
        className={`-my-1.5 flex items-center gap-2 py-1.5 ${
          expanded
            ? "flex-wrap overflow-visible"
            : "flex-nowrap overflow-x-auto"
        }`}
      >
        <Link
          href="/posts"
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${
            !selectedTag
              ? "bg-slate-950 text-white shadow-sm shadow-slate-900/15 dark:bg-slate-100 dark:text-slate-950 dark:shadow-black/20"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
          }`}
        >
          All
        </Link>

        {visibleTags.map((tag) => {
          const isSelected = selectedTag === tag;

          return (
            <Link
              key={tag}
              href={isSelected ? "/posts" : `/posts?tag=${tag}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${
                isSelected
                  ? "bg-slate-950 text-white shadow-sm shadow-slate-900/15 dark:bg-slate-100 dark:text-slate-950 dark:shadow-black/20"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {tag}
            </Link>
          );
        })}

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-slate-400 transition-all duration-300 ease-in-out hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-slate-200"
          >
            {expanded ? (
              <>
                접기
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="sm:hidden">더보기</span>
                <span className="hidden sm:inline">+{hiddenCount}개 더보기</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
