"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { animate, eases } from "animejs";
import { FiSun, FiMoon } from "react-icons/fi";
import {  B4F } from "@/shared/ui/text/text";
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
		const device = window.innerWidth > 420 ? "tab" : "mobile";

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
		<header className="fixed top-0 z-[10] flex h-[3.5rem] tab:h-[4.25rem] pc:h-[5rem] w-full max-w-[1440px] bg-transparent justify-center px-8 shrink-0 backdrop-blur-sm">
			<div className="flex w-full h-full justify-between items-center">
				<nav className="flex w-fit h-full items-center">
					<Link href="/" className="">
						<B4F>Home</B4F>
					</Link>
				</nav>
				<div className="flex w-auto h-full gap-2 tab:gap-5 pc:gap-8">
					<nav className="flex h-full items-center gap-1 tab:gap-4 pc:gap-6">
						<Link href="/about" className="px-2 py-1 group">
							<B4F className="underline-animate">About</B4F>
						</Link>
						<Link href="/projects/1" className="px-2 py-1 group">
							<B4F className="underline-animate">Projects</B4F>
						</Link>
						<Link href="#blog" className="px-2 py-1 group">
							<B4F className="underline-animate ">Blog</B4F>
						</Link>
					</nav>

					<div className="flex items-center justify-center">
						<button
							type="button"
							id="darkmode-toggle"
							onClick={handleToggle}
							className={`flex h-8 w-8 tab:w-16 items-center justify-center tab:justify-start ${dark ? "bg-[#1B2433] ring-1 ring-blue-400" : "bg-[#ffe8ab] ring-1 ring-amber-400"} rounded-2xl transition duration-300 ease-out focus:outline-none`}
						>
							<div
								ref={translateXRef}
								className={`h-7 w-7 tab:translate-x-[2px] rounded-2xl ${dark ? "bg-blue-100" : "bg-amber-100"} flex items-center justify-center transition duration-300 ease-out`}
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
