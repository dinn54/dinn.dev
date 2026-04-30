"use client";

import { useEffect } from "react";
import { incrementPostView } from "../api/actions";

const VIEW_DEDUPE_MS = 10_000;

interface PostViewTrackerProps {
  postId: string;
}

export function PostViewTracker({ postId }: PostViewTrackerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const storageKey = `viewed-at:${postId}`;
    const now = Date.now();
    const lastViewedAt = Number(sessionStorage.getItem(storageKey) ?? 0);

    if (now - lastViewedAt < VIEW_DEDUPE_MS) {
      return;
    }

    sessionStorage.setItem(storageKey, String(now));

    incrementPostView(postId).catch(() => {
      sessionStorage.removeItem(storageKey);
    });
  }, [postId]);

  return null;
}
