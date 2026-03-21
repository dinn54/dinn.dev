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

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const isAtBottomRef = useRef(false);
  const observerActiveIdRef = useRef<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("#post-content h2, #post-content h3")
    );

    headings.forEach((heading, index) => {
      const item = toc[index];
      if (!item) return;
      heading.id = createHeadingId(item, index);
    });
  }, [toc]);

  // 스크롤 최하단 감지 + activeId 동기화
  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const wasAtBottom = isAtBottomRef.current;
      isAtBottomRef.current = isBottom;

      if (isBottom && toc.length > 0) {
        setActiveId(createHeadingId(toc[toc.length - 1], toc.length - 1));
      } else if (wasAtBottom && !isBottom) {
        // 최하단에서 벗어날 때 observer가 추적 중이던 ID 복원
        setActiveId(observerActiveIdRef.current);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [toc]);

  // IntersectionObserver — isAtBottom과 독립적으로 동작
  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observerActiveIdRef.current = entry.target.id;
            if (!isAtBottomRef.current) {
              setActiveId(entry.target.id);
            }
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: "0px 0px -80% 0px",
      },
    );

    const headings = document.querySelectorAll("#post-content h2, #post-content h3");
    headings.forEach((h) => {
      if (h.id) observer.observe(h);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleTocClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(key);
    }
  };

  if (!toc || toc.length === 0) return null;

  return (
    <div className="sticky top-24 mt-28 w-full self-start">
      <div className="border-l border-slate-200 pl-4 dark:border-slate-800">
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
