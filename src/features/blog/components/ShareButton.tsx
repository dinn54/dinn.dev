"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Share2, Check, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ShareButtonProps {
  title: string;
  description?: string;
}

function CopyToast({ message, onClose }: { message: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div
      className={`fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2 transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">
        <Check className="h-4 w-4 text-teal-400 dark:text-teal-600" />
        {message}
      </div>
    </div>,
    document.body,
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return isDesktop;
}

export function ShareButton({ title, description }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const isDesktop = useIsDesktop();

  const copyToClipboard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setShowToast(true);
  };

  const handleShare = async () => {
    if (isDesktop) {
      await copyToClipboard();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: window.location.href });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      await copyToClipboard();
    }
  };

  return (
    <>
      <Button
        id="btn-share"
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="gap-2 rounded-full text-slate-500 transition-colors duration-300 ease-in-out hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/20 dark:hover:text-teal-400"
      >
        {isDesktop ? (
          <LinkIcon className="h-4 w-4" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        <span className="font-medium">공유하기</span>
      </Button>
      {showToast && (
        <CopyToast
          message="링크가 복사되었습니다"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
