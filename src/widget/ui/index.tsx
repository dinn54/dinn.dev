'use client'
import {motion, useScroll } from 'framer-motion'
import { useEffect, useLayoutEffect, useState } from 'react'


const parentId = "rootElement"
export const Header = ()=>{
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
    <header className="fixed flex w-full h-[3.5rem] justify-center backdrop-blur-[0.1rem]">
      <div className="flex relative w-[90%] h-full justify-start">
        <div className="flex relative w-[35%] h-full">
          <div className="flex w-[90%] h-full gap-[1rem]">
            <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap ">JOOJEONGHYEOG</div>
            <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap">Frontend Developer</div>
          </div>
        </div>
        <div className="flex relative w-[65%] h-full">
          <div className="flex w-full h-full gap-[1rem] justify-end">
            <div className="flex w-fit h-full items-center text-[0.78rem]">work</div>
            <div className="flex w-fit h-full items-center text-[0.78rem]">skills</div>
            <div className="flex w-fit h-full items-center text-[0.78rem]">about</div>
            <div className="flex w-fit h-full items-center text-[0.78rem]">EN</div>
          </div>
        </div>

        <div className="flex absolute w-full h-full shadow-[inset_0_-0.05rem_0_rgba(209,213,219,1)] border-gray">
          <div className={`flex absolute bottom-0 w-full h-[0.05rem] bg-blue-500`} 
            style={{transform: `scaleX(${(progressRate/100).toFixed(2)})` , transformOrigin: "left"}} />
        </div>
      </div>
    </header>
  )
}