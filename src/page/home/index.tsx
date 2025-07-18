'use client'
// import About from "@/pages/home/about"
// import Contact from "@/pages/home/contact"
// import Introduction from "@/pages/home/introduction"
// import Projects from "@/pages/home/projects"

import Review from "./ui/reviewSection";
import Projects from "./ui/projectsSection";
import About from "./ui/aboutSection";
import Introduction from "./ui/introductionSection";
import { useEffect, useState } from "react";


const Home = () => {
  const [isSizeChanged, setIsSizeChanged] = useState(false)

  useEffect(()=>{
    const element  = document.getElementById('page-container')
    if (!element) return;

    const observer = new ResizeObserver(() => {
      setIsSizeChanged(true)
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [])

  useEffect(() => {
    const container = document.getElementById('page-container');
    if (!container) return;
  
    const sections = Array.from(container.querySelectorAll('.snap-section')) as HTMLElement[];
    if (sections.length === 0) return;
  
    let isScrolling = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault(); // 추가 방어
        return;
      }
  
      e.preventDefault();
      isScrolling = true;
  
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScroll = container.scrollTop;
  
      const currentIndex = sections.findIndex(
        (section) =>
          section.offsetTop <= currentScroll + 1 &&
          section.offsetTop + section.offsetHeight > currentScroll
      );
  
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
      const targetSection = sections[nextIndex];
  
      if (targetSection) {
        container.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        });
      }
  
      // 일정 시간 동안 추가 스크롤 금지
      timeoutId = setTimeout(() => {
        isScrolling = false;
      }, 800); // 여유 있게 700ms 정도 잡기
    };
  
    container.addEventListener('wheel', handleWheel, { passive: false });
  
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSizeChanged]);
  

  return (
    <div 
      id="page-container" 
      className="flex flex-col w-full h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory">
      <Introduction />
			<About />
			<Projects />
			<Review />
    </div> 
  );
};

export default Home;
