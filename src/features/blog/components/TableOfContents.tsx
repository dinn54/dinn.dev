"use client";

import React, { useEffect, useState, useRef } from "react";

interface TOCItem {
  key: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TOCItem[];
}

function createHeadingId(item: TOCItem, index: number) {
  const slug = item.text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-_]/g, "")
    .replace(/-+/g, "-");

  return `toc-${index}-${slug || "section"}`;
}

function syncHeadingIds(toc: TOCItem[]): HTMLElement[] {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("#post-content h2, #post-content h3")
  );

  headings.forEach((heading, index) => {
    const item = toc[index];
    if (!item) return;
    heading.id = createHeadingId(item, index);
  });

  return headings;
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const postContent = document.getElementById("post-content");
    if (!postContent) return;

    syncHeadingIds(toc);

    const observer = new MutationObserver(() => {
      syncHeadingIds(toc);
    });

    observer.observe(postContent, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container");
    if (!scrollContainer) return;

    const headerOffset = 96;
    const handleScroll = () => {
      const headings = syncHeadingIds(toc);
      if (headings.length === 0) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isBottom && toc.length > 0) {
        setActiveId(createHeadingId(toc[toc.length - 1], toc.length - 1));
        return;
      }

      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const anchorY = scrollContainerRect.top + headerOffset;

      let nextActiveId = headings[0]?.id ?? "";
      headings.forEach((heading) => {
        const headingTop = heading.getBoundingClientRect().top;
        if (headingTop <= anchorY) {
          nextActiveId = heading.id;
        }
      });

      setActiveId(nextActiveId);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const handleTocClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    const element = document.getElementById(key);
    if (element) {
      const scrollContainer = document.getElementById("app-scroll-container");
      const headerOffset = 96;

      if (scrollContainer) {
        const scrollContainerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const nextTop =
          scrollContainer.scrollTop +
          (elementRect.top - scrollContainerRect.top) -
          headerOffset;

        scrollContainer.scrollTo({
          top: Math.max(0, nextTop),
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setActiveId(key);
    }
  };

  if (!toc || toc.length === 0) return null;

  return (
    <div className="sticky top-24 mt-28 w-full self-start">
      <div className="border-l border-slate-200 pl-6 dark:border-slate-800">
        <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
          목차
        </h3>
        <nav className="flex flex-col space-y-3 text-sm">
          {toc.map((item, index) => {
            const headingId = createHeadingId(item, index);

            return (
            <a
              key={`${item.key}-${index}`}
              href={`#${headingId}`}
              onClick={(e) => handleTocClick(e, headingId)}
              className={`block cursor-pointer truncate transition-colors ${
                item.level === 3 ? "pl-3" : "font-medium"
              } ${
                activeId === headingId
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {item.text}
            </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
