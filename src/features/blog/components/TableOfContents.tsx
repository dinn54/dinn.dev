"use client";

import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // Simple scroll spy to highlight active TOC item
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }, // Highlight when element is near top
    );

    const headings = document.querySelectorAll("h1, h2, h3");
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
