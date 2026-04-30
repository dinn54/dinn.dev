"use client";

import { Dispatch, SetStateAction } from "react";
import { LucideArrowUpCircle } from "lucide-react";

const FixedLiftUpIcon = ({
  targetId,
  setIsTopMoved,
}: {
  targetId?: string;
  setIsTopMoved?: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const container = document.getElementById(targetId || "page-container");
    if (!container) return;

    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (setIsTopMoved) setIsTopMoved(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="맨 위로 이동"
      className="group fixed right-[50%] bottom-4 z-[100] flex aspect-square w-9 translate-x-[50%] items-center justify-center rounded-full border border-slate-200 bg-white/85 text-slate-500 shadow-sm shadow-slate-900/10 backdrop-blur transition duration-300 ease-in-out hover:cursor-pointer hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950/85 dark:text-slate-400 dark:shadow-black/30 dark:hover:border-slate-700 dark:hover:text-slate-100"
    >
      <LucideArrowUpCircle className="h-5 w-5" />
    </button>
  );
};

export default FixedLiftUpIcon;
