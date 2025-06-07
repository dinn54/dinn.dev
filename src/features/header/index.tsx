'use client'
import Link from "next/link";
import React, { useRef, useState } from "react";
import { animate, eases } from 'animejs';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = () => {
	const [dark, setDark] = useState(false);
	const knobRef = useRef<HTMLDivElement>(null);

	// 현재 페이지 정보 (예시)

	// 클릭시 안에 공 먼저 이동
	// 공이 전부 움직임이 끝나명 border 변경
	const handleToggle = () => {
		setDark((prev) => {
			const next = !prev;
			if (knobRef.current) {
				animate(knobRef.current, {
					//spin
					rotate: next ? 360 : 0,
					duration: 300,
					easing: eases.outQuad,
				});
				animate(knobRef.current, {
					translateX: next ? 34 : 2, // 32px 이동 (버튼 크기에 맞게 조정)
					duration: 300,
					easing: eases.outQuad,
				});
			}
			return next;
		});
	};

	return (
		<header
			className="w-full h-[5rem] flex items-center justify-between px-8"
			style={{ background: "#e6f4c2" }}
		>
			<nav
				className="flex items-center h-full"
			>
				<Link
					href="/"
					className="font-semibold text-lg mr-8"
				>
					home
				</Link>
			</nav>
			<nav
				className="flex items-center space-x-6 h-full"
			>
				<Link
					href="#about"
					className="font-semibold"
				>
					About
				</Link>
				<Link
					href="#projects"
					className="font-semibold"
				>
					Projects
				</Link>
				<Link
					href="#blog"
					className="font-semibold"
				>
					Blog
				</Link>
				<div className="flex items-center ml-4 justify-center">
					<button
						type="button"
						id="darkmode-toggle"
						onClick={handleToggle}
						className={`flex items-center w-16 h-8 ${dark ? 'bg-[#1B2433] ring-1 ring-blue-400' : 'bg-[#ffe8ab] ring-1 ring-amber-400'} rounded-2xl focus:outline-none transition ease-out duration-300`}
					>
						<div
							ref={knobRef}
							className={`relative w-7 h-7 rounded-2xl ${dark ? 'bg-blue-100' : 'bg-amber-100'} transition ease-out duration-300 flex items-center justify-center`}
						>
							{dark ? <FiMoon className="text-blue-500" /> : <FiSun className="text-amber-500" />}
						</div>
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
