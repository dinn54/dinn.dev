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

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const observerActiveIdRef = useRef<string>("");

  // 스크롤 최하단 감지
  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 1;
      setIsAtBottom(isBottom);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // 최하단일 때 마지막 항목 활성화, 아니면 IntersectionObserver 값 사용
  useEffect(() => {
    if (isAtBottom && toc.length > 0) {
      setActiveId(toc[toc.length - 1].key);
    } else {
      setActiveId(observerActiveIdRef.current);
    }
  }, [isAtBottom, toc]);

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll-container");

    // Simple scroll spy to highlight active TOC item
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observerActiveIdRef.current = entry.target.id;
            if (!isAtBottom) {
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

    const headings = document.querySelectorAll("h1, h2, h3");
    headings.forEach((h) => {
      if (h.id) observer.observe(h);
    });

    return () => observer.disconnect();
  }, [toc, isAtBottom]);

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
    <div className="sticky top-32 w-64">
      <div className="border-l border-slate-200 pl-4 dark:border-slate-800">
        <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
          목차
        </h3>
        <nav className="flex flex-col space-y-3 text-sm">
          {toc.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              onClick={(e) => handleTocClick(e, item.key)}
              className={`block cursor-pointer truncate transition-colors ${
                item.level === 3 ? "pl-3" : "font-medium"
              } ${
                activeId === item.key
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
