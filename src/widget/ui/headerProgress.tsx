'use client'

import { useEffect, useState } from "react";

export const HeaderProgress = () =>{
  const parentId = "rootElement"
  const [progressRate, setProgressRate] = useState(0)

  useEffect(() => {
    const parentElement = document.getElementById(parentId); // 부모의 DOM 요소를 가져옴
    if (!parentElement) {
      console.error(`ID가 '${parentId}'인 요소를 찾을 수 없습니다.`);
      return;
    }

    const handleScroll = () => {
      const scrollTop = parentElement.scrollTop; // 부모 요소의 스크롤 위치
      const scrollHeight = parentElement.scrollHeight; // 스크롤 가능한 전체 높이
      const clientHeight = parentElement.clientHeight; // 부모 요소의 뷰포트 높이

      // 스크롤 진행률 계산
      const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgressRate(scrollProgress)
    };

    // 스크롤 이벤트 리스너 등록
    parentElement.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      parentElement.removeEventListener("scroll", handleScroll);
    };
  }, [parentId]);

  return (
    <div className={`flex absolute bottom-0 w-full h-[0.05rem] bg-blue-500 progress-bar-animation`} 
    style={{transform: `scaleX(${(progressRate/100).toFixed(2)})` , transformOrigin: "left"}} />
  )
}