"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "./ui/button";

interface ShareButtonProps {
  title: string;
  description?: string;
}

export function ShareButton({ title, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Web Share API 지원 여부 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // 사용자가 공유를 취소한 경우 무시
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      // Fallback: URL 복사
      await copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      id="btn-share"
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="gap-2 rounded-full text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/20 dark:hover:text-teal-400"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          <span className="font-medium text-teal-600 dark:text-teal-400">복사됨</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span className="font-medium">공유하기</span>
        </>
      )}
    </Button>
  );
}
