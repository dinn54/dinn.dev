"use client";
import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdRefresh } from "react-icons/md";
import ProfileDrawing from "@public/profileDrawing.png";
import ProfilePicture from "@public/profilePicture3.png";

export const ProfileImage = () => {
  const [isRealMyPicture, setIsRealMyPicture] = useState(false);
  const profileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileImageRef.current) {
      console.log("isRealMyPicture changed:", isRealMyPicture); // 디버깅용
      profileImageRef.current.style.backgroundColor = "transparent";

      animate(profileImageRef.current, {
        backgroundColor: isRealMyPicture ? "transparent" : "#AAAA",
        duration: 500,
        easing: "linear",
      });
    }
  }, [isRealMyPicture]);
  return (
    <div className="pc:w-full tab:max-w-full tab:min-w-[14rem] pc:min-w-[17rem] tab:p-5 pc:p-5 flex h-fit max-w-[12rem] flex-col">
      <div
        ref={profileImageRef}
        className="tab:w-[calc(14vh+12vw)] tab:min-w-[10rem] relative flex aspect-square w-full max-w-full flex-col items-center rounded-t-2xl rounded-b-2xl"
      >
        <Image
          src={isRealMyPicture ? ProfilePicture : ProfileDrawing}
          alt="toggle"
          className="object max-h-full w-[90%] rounded-2xl object-cover"
        />
        <button
          className="absolute right-0 bottom-0 mr-3 aspect-square w-7 pb-1"
          onClick={() => {
            setIsRealMyPicture(!isRealMyPicture);
          }}
        >
          <MdRefresh
            className={`shake-animate h-full w-full hover:cursor-pointer ${isRealMyPicture ? "fill-white" : "fill-black"}`}
          />
        </button>
      </div>
    </div>
  );
};
