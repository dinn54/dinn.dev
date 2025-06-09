'use client'
import PageContainer from "./ui/page_container";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import Image from "next/image";
import Sun from "@public/toggleSun.svg"
import Night from "@public/toggleNight.svg"
import { animate } from "animejs";

const About = () =>{
	return (
		<PageContainer color="#ffe065">
			<div className="flex w-full h-full">
				<div className="w-[40%] h-full flex flex-col items-center gap-10">
				<div className="group flex items-center gap-4 no-underline">
					<span className="text-black group-hover:underline font-semibold text-[2.8rem]">
						ABOUT
					</span>
					<Link href="/about" className="flex items-center justify-center w-8 aspect-square hover:outline-1 rounded-full bg-black hover:bg-gray-800 transition-colors">
						<IoIosArrowForward className="text-white text-lg" />
					</Link>
				</div>
				<ProfileImage />
				</div>
			</div>
		</PageContainer>
	)
}
export default About;

const ProfileImage = () =>{
	const [isRealMyPicture, setIsRealMyPicture] = useState(true);
	const profileImageRef = useRef<HTMLDivElement>(null);
	
	useEffect(()=>{
		if (profileImageRef.current){
			console.log('isRealMyPicture changed:', isRealMyPicture); // 디버깅용
			profileImageRef.current.style.backgroundColor = "#f3f4f6";

			animate(profileImageRef.current,{
				backgroundColor: isRealMyPicture? "#f3f4f6" : "#AAAA",
				duration: 500,
				easing: "linear"
			})
		}

	}, [isRealMyPicture])
	return (
		<div ref={profileImageRef} className="relative flex w-60 aspect-square rounded-t-2xl rounded-bl-2xl">
		<Image src={isRealMyPicture? Sun : Night} alt="toggle" />
				<button
				className="absolute bottom-0 right-0 w-6 aspect-square outline"
				onClick={()=>{
					setIsRealMyPicture(!isRealMyPicture);
				}}
			>
				<MdRefresh className="w-full h-full hover:rotate-180 transition-transform duration-300" />
			</button>
	</div>

	)
}
