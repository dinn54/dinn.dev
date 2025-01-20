"use client"; 

import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    // 계산 전에 값들이 유효한지 확인
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const totalScroll = docHeight - winHeight;
    
    // 0으로 나누기 방지
    if (totalScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    
    const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
    console.log("handle", totalScroll, progress)
    setScrollProgress(progress);
  };

  useEffect(() => {
    // 초기값 설정
    handleScroll();
    
    // 이벤트 리스너 등록
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollProgress };
};

export default ScrollProgress;
