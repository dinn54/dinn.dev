"use client";

import { ArrowUp } from "lucide-react";

export function ScrollTopButton() {
  const handleScrollTop = () => {
    const scrollContainer = document.getElementById("app-scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScrollTop}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-slate-300 hover:text-slate-600 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:text-slate-300"
      title="맨 위로"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
