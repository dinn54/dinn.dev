"use client";
import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LeafConfig } from "../introduction";
import LeafImage from "@public/leaf.svg";
import TreeImage from "@public/tree.png";
import CharacterImage from "@public/character2.svg";
import { B1, B3, B4, H2 } from "@/shared/ui/text/text";
import { BaseButton } from "@/shared/ui/button";

export const Tree = ({
  leafConfigs,
  LeafRefs,
  LeafRotateRefs,
  TreeContainerRef,
}: {
  leafConfigs: LeafConfig[];
  LeafRefs: React.RefObject<(HTMLDivElement | null)[]>;
  LeafRotateRefs: React.RefObject<(HTMLDivElement | null)[]>;
  TreeContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {

  return (
    <div
      ref={TreeContainerRef}
      className="flex w-full pc:w-auto pc:h-full justify-center items-center"
    >
      <div className="relative z-[1] h-full w-full pc:opacity-100">
        <Image src={TreeImage} alt="tree" className=" w-full h-full object-contain object-left opacity-0 pc:opacity-100" priority />
      </div>

      {/* <FallingLeaf
        leafConfigs={leafConfigs}
        LeafRefs={LeafRefs}
        LeafRotateRefs={LeafRotateRefs}
      /> */}
    </div>
  );
};

const FallingLeaf = ({
  leafConfigs,
  LeafRefs,
  LeafRotateRefs,
}: {
  leafConfigs: LeafConfig[];
  LeafRefs: React.RefObject<(HTMLDivElement | null)[]>;
  LeafRotateRefs: React.RefObject<(HTMLDivElement | null)[]>;
}) => {
  return (
    <>
      {leafConfigs.map((config, index) => (
        <div
          key={index}
          ref={(el) => {
            LeafRefs.current[index] = el;
          }}
          className={`absolute z-[0] hidden aspect-square w-[2rem] sm:block sm:w-[2.5rem] md:w-[3rem]`}
          style={{
            top: `${14 + Math.random() * 12}%`, // 10%-40% 영역
            left: `${config.startX}%`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={(el) => {
              LeafRotateRefs.current[index] = el;
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={LeafImage}
              alt={`leaf-${index}`}
              className="rotate-220"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export const PlayGuide = ({
  playGuideRef,
  moveControlRef,
}: {
  playGuideRef: React.RefObject<HTMLDivElement | null>;
  moveControlRef: React.RefObject<HTMLSpanElement | null>;
}) => {
  //hover 감지 시 조건부 보여주기 안보여주기
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!playGuideRef.current || !moveControlRef.current) return;
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    moveControlRef.current.addEventListener("mouseenter", handleMouseEnter);
    moveControlRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (moveControlRef.current) {
        moveControlRef.current.removeEventListener(
          "mouseenter",
          handleMouseEnter,
        );
        moveControlRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (!playGuideRef.current) return;

    if (isHovered) {
      animate(playGuideRef.current, {
        opacity: [0, 1],
        duration: 1000,
        easing: "easeInOutSine",
      });
    } else {
      if (playGuideRef.current.style.display !== "flex") {
        playGuideRef.current.style.display = "flex";
        playGuideRef.current.style.opacity = "0";
      } else {
        animate(playGuideRef.current, {
          opacity: [1, 0],
          duration: 1000,
          easing: "easeInOutSine",
        });
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={playGuideRef}
      className="3xl:left-40 absolute bottom-[clamp(6rem,20%,10rem)] left-4 hidden w-[12rem] flex-col items-center justify-center text-center text-sm text-black sm:left-8 sm:hidden md:left-12 lg:left-16 xl:left-24 2xl:left-32"
    >
      <div className="relative w-max rounded-xl bg-white px-4 py-2 text-sm text-[#444] shadow-md before:absolute before:bottom-[-8px] before:left-6 before:border-8 before:border-transparent before:border-t-white before:content-['']">
        Enter 나 <br />
        방향키 또는 A/D 를<br />
        눌러보세요!
      </div>
      {/* <span className="text-xs sm:text-sm md:text-base font-regular stroke-2">{"Press Enter"}</span>
			<span className="text-xs sm:text-sm md:text-base font-regular stroke-2">{"Press Arrow or A/D"}</span> */}
    </div>
  );
};

export const Character = ({
  characterRef,
}: {
  characterRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={characterRef}
      className="hidden pc:block absolute bottom-[2rem] z-[1] aspect-square w-[4rem] transform pc:right-10"
    >
      <Image src={CharacterImage} alt="character" className="scale-x-[-1]" />
    </div>
  );
};

export const IntroductionText = ({
  moveControlRef,
}: {
  moveControlRef: React.RefObject<HTMLSpanElement | null>;
}) => {
  const [isTextHovered, setIsTextHovered] = useState(false);
  return (
    <div className="relative flex pc:w-auto w-fit flex-col justify-center text-start font-semibold shrink-0  ">
      {/* <div className="flex flex-col w-full h-2/3 absolute top-30 left-15 text-2xl gap-10 ">
        <span className="text-[2.5rem] pt-20">안녕하세요, 주정혁입니다. </span>
        <div className="text-[3.2vw] ">
          <span className="font-bold">React Typescript 프론트엔드 개발자입니다. 애니메이션이나 </span> 
          <span ref={moveControlRef} className="underline-animate underline-animate-[#ffffff] text-green-800">상호작용</span> 요소를 결합하는 것을 좋아합니다.
        </div>
      </div> */}
      <div className="flex flex-col justify-center text-gray-800 ">
        <H2>안녕하세요</H2>
        <H2>프론트엔드 개발자 주정혁입니다</H2>


        <p className="mt-14 flex flex-col">
          <B1>사용자 흐름을 고려한</B1>
          <B1>화면을 구성하고</B1>
        </p>
        <p className="mt-7 mb-14 flex flex-col">
          <B1>사용성과 완성도를 고려한</B1>
          <B1>세밀한 구현을 지향합니다.</B1>
        </p>

        

          {/* <B1>저는 </B1>
          <span
            ref={moveControlRef}
            className="underline-animate group relative font-semibold text-[#6b8e23]"
            onClick={() => {
              setIsTextHovered(true);
            }}
          >
            인터랙티브 UI
            <span
              className={`absolute left-[50%] ${isTextHovered ? "opacity-0" : "opacity-100"} pointer-updown-infinite -bottom-2 translate-x-[-50%] text-xs text-black transition-all duration-400 group-hover:opacity-0`}
            >
              ⬆︎
            </span>
          </span>{" "}
          와 <br />
          <span className="">원활한 사용자 경험</span>을 중요하게 생각합니다. */}

        <B3 className="text-neutral-500 italic">
          어떤 기술과 경험을 해왔는지 궁금하시다면 ↓
        </B3>

        <div className="mt-4 flex flex-col pc:flex-row w-full gap-4 pc:gap-4">
          <div className="flex gap-4">
          <BaseButton
            color="green"
            onClick={() => {
              const target = document.getElementById("about-section");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <B3>About me</B3>
          </BaseButton>
          <BaseButton
            color="gold"
            onClick={() => {
              const target = document.getElementById("contact-section");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <B3>Projects</B3>
          </BaseButton>
          </div>
          <div className="flex gap-4">
          <BaseButton
            color="none"
            onClick={() => {
              const target = document.getElementById("contact-section");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <B4>리뷰 남기기</B4>
          </BaseButton>
          <BaseButton
            color="none"
            onClick={() => {
              const target = document.getElementById("contact-section");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <B4>Contact</B4>
          </BaseButton>
          </div>
        </div>
      </div>

      {/* <div className="flex w-full flex-col absolute bottom-80 -left-10 text-2xl gap-6  items-end">
      <div className="flex">
        <span>Email: </span>
        <span>joojoo0101@gmail.com</span>
      </div>

    </div> */}
    </div>
  );
};
