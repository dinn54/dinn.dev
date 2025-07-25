"use client";
import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdRefresh } from "react-icons/md";
import Sun from "@public/toggleSun.svg";
import Night from "@public/toggleNight.svg";

export const ProfileImage = () => {
	const [isRealMyPicture, setIsRealMyPicture] = useState(true);
	const profileImageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (profileImageRef.current) {
			console.log("isRealMyPicture changed:", isRealMyPicture); // 디버깅용
			profileImageRef.current.style.backgroundColor = "#f3f4f6";

			animate(profileImageRef.current, {
				backgroundColor: isRealMyPicture ? "#f3f4f6" : "#AAAA",
				duration: 500,
				easing: "linear",
			});
		}
	}, [isRealMyPicture]);
	return (
		<div className="flex flex-col w-full max-w-[12rem] tab:max-w-full tab:min-w-[14rem] pc:min-w-[17rem]  tab:p-5 pc:p-5">
			<div
				ref={profileImageRef}
				className="relative flex flex-col w-full aspect-square rounded-t-2xl rounded-b-2xl"
			>
				<Image src={isRealMyPicture ? Sun : Night} alt="toggle" />
				<button
					className="absolute right-0 bottom-0 aspect-square w-7 pr-1 pb-1 "
					onClick={() => {
						setIsRealMyPicture(!isRealMyPicture);
					}}
				>
					<MdRefresh className="h-full w-full shake-animate hover:cursor-pointer" />
				</button>
			</div>
		</div>
	);
};
