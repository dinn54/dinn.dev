"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { B3F } from "@/shared/ui/text/text";
import { useThemeToggle } from "@/shared/state/themeStore";

const iconTransition =
  "absolute h-4 w-4 theme-color-motion-transition";

const Header = () => {
  const { darkMode, toggle } = useThemeToggle();

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
          <Link href="/posts" className="group">
            <B3F className="underline-animate theme-color-transition text-slate-950 dark:text-slate-100">
              Dinn.dev
            </B3F>
          </Link>
        </nav>
        <div className="flex h-full w-auto items-center">
          <div className="flex items-center justify-center">
            <button
              type="button"
              id="darkmode-toggle"
              aria-label={darkMode ? "라이트 모드로 변경" : "다크 모드로 변경"}
              aria-pressed={darkMode}
              onClick={toggle}
              className={`theme-color-transition relative flex h-8 w-16 items-center rounded-full border p-0.5 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950 ${
                darkMode
                  ? "border-slate-700 bg-slate-950 shadow-inner shadow-black/30"
                  : "border-slate-200 bg-white/80 shadow-sm shadow-slate-900/10 backdrop-blur"
              }`}
            >
              <div
                className={`theme-color-motion-transition relative flex h-7 w-7 items-center justify-center rounded-full ${
                  darkMode
                    ? "translate-x-8 bg-slate-100 text-slate-950 shadow-lg shadow-black/30"
                    : "translate-x-0 bg-slate-900 text-white shadow-md shadow-slate-900/20"
                }`}
              >
                <Sun
                  className={`${iconTransition} ${
                    darkMode ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                  strokeWidth={2.25}
                />
                <Moon
                  className={`${iconTransition} ${
                    darkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                  }`}
                  strokeWidth={2.25}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
