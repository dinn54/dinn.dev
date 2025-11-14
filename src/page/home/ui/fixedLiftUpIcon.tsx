"use client";
import { LucideArrowUpCircle } from "lucide-react";

const FixedLiftUpIcon = () => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const container = document.getElementById("page-container");
    if (!container) return;

    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="group fixed right-[50%] bottom-4 z-[100] aspect-square w-[24px] translate-x-[50%] rounded-full hover:cursor-pointer"
    >
      <LucideArrowUpCircle className="h-full w-full rounded-full opacity-50 shadow-2xl group-hover:opacity-100" />
    </button>
  );
};
export default FixedLiftUpIcon;
