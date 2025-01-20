'use client'
import Image from "next/image";
import { detectMobile } from "./mobileDetct";

import {motion, useScroll} from 'framer-motion'
import { useRef } from "react";

export default function Home() {
  const scrollConatinerRef = useRef(null)
  const {scrollYProgress} = useScroll({
    container: scrollConatinerRef
  })
  
  return (
    <div ref={scrollConatinerRef} className="flex flex-col w-screen h-screen overflow-y-auto">
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
            <motion.div className={`flex absolute bottom-0 w-full h-[0.05rem] bg-blue-500 `} 
              style={{scaleX: scrollYProgress, transformOrigin: "left"}} 
              />
          </div>

        </div>

      </header>


      <main className="flex w-full h-full flex-shrink-0">
        <div className="flex w-[35%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#2C3E50] "></div>
        <div className="flex w-[65%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#278036]/[0.09] blur-lg"></div>
      </main>
      <hr />
      <main className="flex w-full h-full flex-shrink-0">
        <div className="flex w-[35%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#2C3E50] "></div>
        <div className="flex w-[65%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#278036]/[0.09] blur-lg"></div>
      </main>

    </div>
  );
}
