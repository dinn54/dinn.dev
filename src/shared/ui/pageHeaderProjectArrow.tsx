"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import tippy from "tippy.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProjectNameByNo } from "../model/getProjectName";

export const PageHeaderProjectArrow = () => {
  const pathname = usePathname();

  const currentProjectNo = Number(pathname.split("/projects/")[1]);

  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftArrowRef.current || !rightArrowRef.current) return;

    if (getProjectNameByNo(currentProjectNo - 1)) {
      tippy(leftArrowRef.current, {
        theme: "rounded",
        content: getProjectNameByNo(currentProjectNo - 1) ?? "",
        arrow: false,
        placement: "top",
        offset: [0, 2],
        animation: "scale",
        duration: 0,
        delay: 0,
      });
    }

    if (getProjectNameByNo(currentProjectNo + 1)) {
      tippy(rightArrowRef.current, {
        theme: "rounded",
        content: getProjectNameByNo(currentProjectNo + 1) ?? "",
        arrow: false,
        placement: "top",
        offset: [0, 2],
        animation: "scale",
        duration: 0,
        delay: 0,
      });
    }
  }, []);

  if (!pathname.startsWith("/projects/")) return null;

  return (
    <div className="tab:px-5 pc:px-10 z-[1] flex w-full flex-col items-end">
      <div className="flex items-center gap-4">
        <Link
          href={
            getProjectNameByNo(currentProjectNo - 1)
              ? `/projects/${currentProjectNo - 1}`
              : "/projects/1"
          }
          onClick={(e) => {
            if (Number(currentProjectNo) === 1) {
              e.preventDefault();
            }
          }}
          onMouseOver={(e) => {
            if (Number(currentProjectNo) === 1) {
              e.currentTarget.style.cursor = "default";
            }
          }}
        >
          <div
            ref={leftArrowRef}
            className="group relative aspect-square h-[2rem]"
          >
            <FaArrowLeft
              className="h-full w-full fill-black dark:fill-white"
              style={{ fill: Number(currentProjectNo) === 1 ? "#9CA3AF" : "" }}
            />
          </div>
        </Link>
        <Link
          href={
            getProjectNameByNo(currentProjectNo + 1)
              ? `/projects/${currentProjectNo + 1}`
              : "/projects/1"
          }
          onClick={(e) => {
            if (Number(currentProjectNo) === 3) {
              e.preventDefault();
            }
          }}
          onMouseOver={(e) => {
            if (Number(currentProjectNo) === 3) {
              e.currentTarget.style.cursor = "default";
            }
          }}
        >
          <div
            ref={rightArrowRef}
            className="group relative aspect-square h-[2rem]"
          >
            <FaArrowRight
              className="h-full w-full fill-black dark:fill-white"
              style={{ fill: Number(currentProjectNo) === 3 ? "#9CA3AF" : "" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
