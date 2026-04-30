"use client";

import { useEffect } from "react";
import Link from "next/link";
import StandalonePageContainer from "@/shared/ui/StandalonePageContainer";

export default function PostDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PostDetailError]", error);
  }, [error]);

  return (
    <StandalonePageContainer withHorizontalPadding={false} innerClassName="max-w-none">
      <div className="flex min-h-screen w-full items-center justify-center px-6 text-center">
        <div className="flex max-w-md flex-col items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Fetch Error
          </p>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-100">
            글을 불러오지 못했습니다.
          </h1>
          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            글 데이터 조회 중 오류가 발생했습니다. 다시 시도하거나 목록으로 돌아가주세요.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300"
            >
              다시 시도
            </button>
            <Link
              href="/posts"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition-colors duration-300 ease-in-out hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </StandalonePageContainer>
  );
}
