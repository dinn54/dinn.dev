'use client'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import tippy from 'tippy.js';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProjectNameByNo } from "../model/getProjectName";


export const PageHeaderProjectArrow = () => {
  const pathname = usePathname()

  const currentProjectNo = Number(pathname.split('/projects/')[1]) 
  
  const leftArrowRef = useRef<HTMLDivElement>(null)
  const rightArrowRef = useRef<HTMLDivElement>(null)


  useEffect(()=>{
    if (!leftArrowRef.current || !rightArrowRef.current) return

    if (getProjectNameByNo(currentProjectNo - 1)){ 
      tippy(leftArrowRef.current, {
        theme: 'rounded',
        content: getProjectNameByNo(currentProjectNo - 1) ?? '',
        arrow: false,
        placement: 'top',
        offset: [0, 2],
        animation: 'scale',
        duration: 0,
        delay: 0,
      })
    }
    
    if (getProjectNameByNo(currentProjectNo + 1)){
      tippy(rightArrowRef.current, {
        theme: 'rounded',
        content: getProjectNameByNo(currentProjectNo + 1) ?? '',
        arrow: false,
        placement: 'top',
        offset: [0, 2],
        animation: 'scale',
        duration: 0,
        delay: 0,
      })
    }
  }, [])

  if (!pathname.startsWith('/projects/')) return null

  return (
    <div className="flex flex-col w-full items-end px-10 z-[1]">
      <div className="flex gap-4 items-center">
        <Link href={getProjectNameByNo(currentProjectNo - 1) ? `/projects/${currentProjectNo - 1}` : '/projects/1'}
        onClick={(e)=>{
          if(Number(currentProjectNo) === 1){
            e.preventDefault()
          }
        }}
        onMouseOver={(e)=>{
          if(Number(currentProjectNo) === 1){
            e.currentTarget.style.cursor = 'default'
          }
        }}
        >
          <div ref={leftArrowRef} className="group relative h-[2rem] aspect-square ">
            <FaArrowLeft className="h-full w-full dark:fill-white fill-black" style={{fill: Number(currentProjectNo) === 1 ? '#9CA3AF' : ''}} />
          </div>  
        </Link>
        <Link href={getProjectNameByNo(currentProjectNo + 1) ? `/projects/${currentProjectNo + 1}` : '/projects/1'}
        onClick={(e)=>{
          if(Number(currentProjectNo) === 3){
            e.preventDefault()
          }
        }}
        onMouseOver={(e)=>{
          if(Number(currentProjectNo) === 3){
            e.currentTarget.style.cursor = 'default'
          }
        }}
        >
        <div ref={rightArrowRef} className="group relative h-[2rem] aspect-square ">
          <FaArrowRight className="h-full w-full dark:fill-white fill-black" style={{fill: Number(currentProjectNo) === 3 ? '#9CA3AF' : ''}} />
        </div>
        </Link>
      </div>
    </div>
  )
}
