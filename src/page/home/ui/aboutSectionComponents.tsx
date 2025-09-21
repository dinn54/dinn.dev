"use client";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { MdRefresh } from "react-icons/md";
import NextImageClient from "@/shared/ui/image/nextImageClient";

export const ProfileImage = () => {
  const [isRealMyPicture, setIsRealMyPicture] = useState(false);
  const profileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileImageRef.current) {
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
        className="tab:w-[calc(14vh+12vw)] tab:min-w-[10rem] relative flex aspect-square w-[50vw] max-w-full flex-col items-center rounded-t-2xl rounded-b-2xl"
      >
        <div className="relative h-full max-h-full w-[90%] rounded-2xl">
          <NextImageClient
            key={isRealMyPicture ? "real" : "drawing"}
            filePath={
              isRealMyPicture ? "/profilePicture3.png" : "/profileDrawing.png"
            }
            alt="My Picture"
            className="rounded-2xl object-cover object-center"
            fill
          />
        </div>

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

export const AboutIconHoverDescription = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <div
      className={`absolute -top-[60%] ${className} left-1/2 hidden -translate-x-1/2 rounded-md bg-gray-50 px-1 py-[1px] align-middle outline outline-gray-200 group-hover:grid dark:outline-gray-100`}
    >
      <span className="text-p9 text-foreground dark:text-foreground pt-0.5 text-center whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};
