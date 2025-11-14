"use client";
// import About from "@/pages/home/about"
// import Contact from "@/pages/home/contact"
// import Introduction from "@/pages/home/introduction"
// import Projects from "@/pages/home/projects"

import Review from "./ui/reviewSection";
import Projects from "./ui/projectsSection";
import About from "./ui/aboutSection";
import Introduction from "./ui/introductionSection";
import { useEffect, useState } from "react";
import FixedLiftUpIcon from "./ui/fixedLiftUpIcon";

const Home = () => {
  const [isSizeChanged, setIsSizeChanged] = useState(false);

  useEffect(() => {
    const element = document.getElementById("page-container");
    if (!element) return;

    const observer = new ResizeObserver(() => {
      setIsSizeChanged(true);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById("page-container");
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll(".snap-section"),
    ) as HTMLDivElement[];
    if (sections.length === 0) return;

    let targetSectionIndex = 0;
    let accumulatedDeltaY = 0;
    let isScrolling = false;
    let scrollingTimeout: NodeJS.Timeout | number;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) {
        return;
      }
      accumulatedDeltaY += e.deltaY;

      // 누적 deltaY가 150이상일때 한 화면 스크롤
      if (accumulatedDeltaY > 150) {
        targetSectionIndex = Math.min(
          sections.length - 1,
          ++targetSectionIndex,
        );
        isScrolling = true;
        accumulatedDeltaY = 0;
      } else if (accumulatedDeltaY < -150) {
        targetSectionIndex = Math.max(0, --targetSectionIndex);
        isScrolling = true;
        accumulatedDeltaY = 0;
      } else {
        return;
      }
      const targetSection = sections[targetSectionIndex];
      container.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });

      scrollingTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
      return () => {
        clearTimeout(scrollingTimeout);
      };
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isSizeChanged]);

  return (
    <div
      id="page-container"
      className="scrollbar-hide flex h-full w-full snap-y snap-mandatory flex-col overflow-y-auto"
    >
      <Introduction />
      <About />
      <Projects />
      <Review />
      <FixedLiftUpIcon />
    </div>
  );
};

export default Home;
