"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  initialCount: number;
}

export function LikeButton({ initialCount }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="mt-16 flex flex-col items-center gap-2 py-4">
      <button
        type="button"
        onClick={() => setIsLiked((prev) => !prev)}
        className={[
          "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 active:scale-90",
          isLiked ? "bg-[#e8f0fe]" : "bg-transparent hover:bg-[#e8f0fe]/40",
        ].join(" ")}
        aria-label="좋아요"
      >
        <ThumbsUp
          className={[
            "h-6 w-6 transition-all duration-300",
            isLiked ? "scale-110 text-[#829cf3]" : "text-slate-400",
          ].join(" ")}
          strokeWidth={isLiked ? 2.2 : 1.8}
        />
      </button>
      <span
        className={[
          "text-sm font-semibold tabular-nums transition-colors duration-300",
          isLiked ? "text-[#829cf3]" : "text-slate-400 dark:text-slate-500",
        ].join(" ")}
      >
        {initialCount + (isLiked ? 1 : 0)}
      </span>
    </div>
  );
}
