"use client";

import { useRef } from "react";
import HomeSectionContainer from "./HomeSectionContainer";
import { Character, IntroductionText, Tree } from "./introductionComponents";
import NextImageClient from "@/shared/ui/image/nextImageClient";

export interface LeafConfig {
  startX: number;
  delay: number;
  duration: number;
  swayIntensity: number;
}

const Introduction = () => {
  const TreeAnimateRef = useRef<HTMLDivElement>(null);
  const TreeContainerRef = useRef<HTMLDivElement>(null); // 트리 컨테이너 참조 추가
  const CharacterRef = useRef<HTMLDivElement>(null);

  return (
    <HomeSectionContainer
      id="introduction-section"
      className="bg-home-light dark:bg-home-dark"
    >
      <div className="relative h-full w-full items-center justify-center">
        {/* Tree interaction section */}
        <div className="pc:px-[10%] flex h-full w-full items-center justify-center gap-10">
          <div className="pc:justify-center pc:w-1/2 pc:h-fit animate-fade-down-slow z-[2] flex h-full w-full shrink-0">
            <IntroductionText />
          </div>
          <div className="tab:w-[60%] tab:opacity-30 pc:opacity-0 absolute right-0 h-full w-full opacity-10">
            <NextImageClient
              filePath={"/tree.png"}
              alt="tree"
              className="animate-fade-down-slow h-full object-contain object-left"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div
            ref={TreeAnimateRef}
            className="pc:flex pc:w-[50%] pc:h-full pc:min-w-[20rem] hidden shrink-0 items-center justify-center"
          >
            <Tree TreeContainerRef={TreeContainerRef} />
          </div>

          <Character characterRef={CharacterRef} />
        </div>
      </div>
    </HomeSectionContainer>
  );
};
export default Introduction;
