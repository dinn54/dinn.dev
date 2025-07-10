"use client";
import PageContainer from "./ui/page_container";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import Image from "next/image";
import Sun from "@public/toggleSun.svg";
import Night from "@public/toggleNight.svg";
import { animate } from "animejs";

const About = () => {
  return (
    <PageContainer id="about-section">
      <div className="flex h-full w-full">
        <div className="flex h-full w-[40%] flex-col items-center gap-10">
          <div className="group flex items-center gap-4 no-underline">
            <span className="text-[2.8rem] font-semibold text-black group-hover:underline">
              ABOUT
            </span>
            <Link
              href="/about"
              className="flex aspect-square w-8 items-center justify-center rounded-full bg-black transition-colors hover:bg-gray-800 hover:outline-1"
            >
              <IoIosArrowForward className="text-lg text-white" />
            </Link>
          </div>
          <ProfileImage />
        </div>
      </div>
    </PageContainer>
  );
};
export default About;

const ProfileImage = () => {
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
    <div
      ref={profileImageRef}
      className="relative flex aspect-square w-60 rounded-t-2xl rounded-bl-2xl"
    >
      <Image src={isRealMyPicture ? Sun : Night} alt="toggle" />
      <button
        className="absolute right-0 bottom-0 aspect-square w-6 outline"
        onClick={() => {
          setIsRealMyPicture(!isRealMyPicture);
        }}
      >
        <MdRefresh className="h-full w-full transition-transform duration-300 hover:rotate-180" />
      </button>
    </div>
  );
};
