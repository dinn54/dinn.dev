"use client";

import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { getPostEngagement, likePost } from "../api/actions";

interface LikeButtonProps {
  postId: string;
}

export function LikeButton({ postId }: LikeButtonProps) {
  const storageKey = `liked:${postId}`;
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLiked(localStorage.getItem(storageKey) === "true");

    getPostEngagement(postId)
      .then(({ likeCount }) => {
        if (!cancelled) {
          setCount(likeCount);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCount(0);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [postId, storageKey]);

  async function handleClick() {
    if (isLiked || pending || count === null) return;
    setPending(true);

    // 낙관적 업데이트
    const previousCount = count;
    setIsLiked(true);
    setCount(previousCount + 1);
    localStorage.setItem(storageKey, "true");

    try {
      const likeCount = await likePost(postId);
      setCount(likeCount);
    } catch {
      // 롤백
      setIsLiked(false);
      setCount(previousCount);
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
        disabled={isLiked || pending || count === null}
        className={[
          "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ease-in-out active:scale-90",
          isLiked ? "bg-[#e8f0fe] cursor-default" : "bg-transparent hover:bg-[#e8f0fe]/40",
          pending ? "opacity-60" : "",
        ].join(" ")}
        aria-label="좋아요"
      >
        <ThumbsUp
          className={[
            "h-6 w-6 transition-all duration-300 ease-in-out",
            isLiked ? "scale-110 text-[#829cf3]" : "text-slate-400",
          ].join(" ")}
          strokeWidth={isLiked ? 2.2 : 1.8}
        />
      </button>
      <span
        className={[
          "text-sm font-semibold tabular-nums transition-colors duration-300 ease-in-out",
          isLiked ? "text-[#829cf3]" : "text-slate-400 dark:text-slate-500",
        ].join(" ")}
      >
        {count ?? "-"}
      </span>
    </div>
  );
}
