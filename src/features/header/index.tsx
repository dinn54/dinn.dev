"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { animate, eases } from "animejs";
import { FiSun, FiMoon } from "react-icons/fi";
import { B3F, B4F } from "@/shared/ui/text/text";
import { useThemeToggle } from "@/shared/state/themeStore";

const Header = () => {
  const [dark, setDark] = useState(false);
  const translateXRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const { darkMode, toggle } = useThemeToggle();

  // 현재 페이지 정보 (예시)

  // 클릭시 안에 공 먼저 이동
  // 공이 전부 움직임이 끝나명 border 변경
  const handleToggle = () => {
    const device = window.innerWidth > 600 ? "tab" : "mobile";

    setDark((prev) => {
      const next = !prev;
      if (translateXRef.current && spinRef.current) {
        animate(spinRef.current, {
          rotate: next
            ? { to: 360, ease: "linear" }
            : { to: 0, ease: "linear" },
          duration: 300,
          easing: eases.outQuad,
        });
        if (device === "tab") {
          animate(translateXRef.current, {
            translateX: next ? 32 : 2, // 32px 이동 (버튼 크기에 맞게 조정)
            duration: 300,
            easing: eases.outQuad,
          });
        } else {
          animate(translateXRef.current, {
            translateX: 0, // 32px 이동 (버튼 크기에 맞게 조정)
            duration: 300,
            easing: eases.outQuad,
          });
        }
      }
      return next;
    });
    toggle();
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="tab:h-[4.25rem] pc:h-[5rem] tab:px-6 pc:px-8 fixed top-0 z-10 flex h-[3.5rem] w-full max-w-[1440px] shrink-0 justify-center bg-transparent px-4 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-between">
        <nav className="flex h-full w-fit items-center">
          <Link href="/#introduction-section" className="group">
            <B3F className="underline-animate">Dinn.dev</B3F>
          </Link>
        </nav>
        <div className="tab:gap-5 pc:gap-8 flex h-full w-auto gap-2">
          <nav className="tab:gap-4 pc:gap-6 flex h-full items-center gap-1">
            <Link href="/about" className="group px-2 py-1" title="내 소개">
              <B4F className="underline-animate">About</B4F>
            </Link>
            <Link
              href="/projects/1"
              className="group px-2 py-1"
              title="프로젝트"
            >
              <B4F className="underline-animate">Projects</B4F>
            </Link>
            {/* <Link
              href="/"
              title="준비중"
              className="group pointer-events-none px-2 py-1 text-gray-500"
            >
              <B4F className="underline-animate text-center whitespace-pre-line">{`Posts`}</B4F>
            </Link> */}
          </nav>

          <div className="flex items-center justify-center">
            <button
              type="button"
              id="darkmode-toggle"
              onClick={handleToggle}
              className={`tab:w-16 tab:justify-start flex h-8 w-8 items-center justify-center ${dark ? "bg-[#1B2433] ring-2 ring-[#192232]" : "bg-[#ffe8ab] ring-2 ring-[#ffe396]"} rounded-2xl transition duration-300 ease-out hover:cursor-pointer hover:ring-amber-300 focus:outline-none dark:hover:ring-blue-900`}
            >
              <div
                ref={translateXRef}
                className={`tab:translate-x-[2px] h-7 w-7 rounded-2xl ${dark ? "bg-blue-200" : "bg-amber-100"} flex items-center justify-center transition duration-300 ease-out`}
              >
                <div
                  ref={spinRef}
                  className="flex h-full w-full items-center justify-center"
                >
                  {dark ? (
                    <FiMoon className="text-blue-500" />
                  ) : (
                    <FiSun className="text-amber-500" />
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
