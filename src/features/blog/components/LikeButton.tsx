"use client";

import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  postId: string;
  initialCount: number;
}

export function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const storageKey = `liked:${postId}`;
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setIsLiked(localStorage.getItem(storageKey) === "true");
  }, [storageKey]);

  async function handleClick() {
    if (isLiked || pending) return;
    setPending(true);

    // 낙관적 업데이트
    setIsLiked(true);
    setCount((prev) => prev + 1);
    localStorage.setItem(storageKey, "true");

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("요청 실패");

      const { likeCount } = await res.json();
      setCount(likeCount);
    } catch {
      // 롤백
      setIsLiked(false);
      setCount((prev) => prev - 1);
      localStorage.removeItem(storageKey);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-16 flex flex-col items-center gap-2 py-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLiked || pending}
        className={[
          "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 active:scale-90",
          isLiked ? "bg-[#e8f0fe] cursor-default" : "bg-transparent hover:bg-[#e8f0fe]/40",
          pending ? "opacity-60" : "",
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
        {count}
      </span>
    </div>
  );
}
