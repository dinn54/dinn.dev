'use client'
import { B3, B4, B5, H6 } from "@/shared/ui/text/text"
import Image from "next/image"
import {useRef, useState } from "react"
import { ProjectData } from "./projectsSection"
import Link from "next/link"

const ProjectCard = ({index, data}: {index: number, data: ProjectData}) =>{
  const detailLinkRef = useRef<HTMLDivElement>(null)
  const [isHover, setIsHover] = useState(false)
  

  return (
    <div id={`project-card-${index}`} className="flex w-[calc((100%-24vw))] tab:w-[75%] pc:w-[clamp(18rem,19vw,22rem)] tab:max-w-[24rem] pc:max-w-[32rem] flex-col h-fit py-0.5 shrink-0 snap-start">
      <Link href={'#'}>
      <div  className="flex w-full max-w-[91.2%]  flex-col rounded-2xl border border-[rgba(0,0,0,0.1)] multi-drop-shadow shrink-0 "
        ref={detailLinkRef} 
        onMouseOver={()=>{
          setIsHover(true)
        }}
        onMouseLeave={()=>{
          setIsHover(false)
        }}
      >
        <div className="relative group flex w-full aspect-square  rounded-t-2xl ">
        <Image src={data.image} alt="dinn.dev" className="object-cover bg-center w-full h-full rounded-t-2xl" fill />
        <div className={`absolute top-0 left-0 w-full h-full rounded-t-2xl ${isHover? 'bg-none': 'bg-black/40 dark:bg-black/30'}`} />
        </div>
        <div className="flex flex-col w-full h-fit bg-white dark:bg-util-container-bg-dark rounded-b-2xl pt-6 px-6 pb-2">
          <div className="flex w-full ">
            <H6 className="">{data.title+ index}</H6>
          </div>
          <div className="mt-2 flex w-full h-fit px-0.5">
            <B4 className=" h-fit line-clamp-3 ">{data.description}</B4>
          </div>
          <div className="mt-2 flex w-full ">
            <div className="flex px-3 py-1 bg-util-tech-stack-orange-bg dark:bg-util-tech-stack-orange-bg-dark rounded-3xl">
            <B5 className="!text-util-tech-stack-orange-text">React</B5>
            </div>
          </div>
          <div 
            className={`mt-1 flex w-full justify-end text-black dark:text-white underline-offset-4 decoration-[1px] ${isHover? 'underline': ''}`} 
          >
            <div 
              className="px-[3%] py-[2%]"
            >
            <B3            
              className="whitespace-nowrap">
                {"자세히 보기"}
            </B3>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
export default ProjectCard