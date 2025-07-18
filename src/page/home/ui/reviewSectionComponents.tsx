'use client'
import { B3, H6 } from "@/shared/ui/text/text"
import { useEffect } from "react"
import { Review } from "./reviewSection"

export const ReviewCard = ({review}: {review: Review}) =>{
  useEffect(()=>{

  }, [])
  return (
    <div className="relative flex w-full h-[6rem] bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark rounded-2xl shrink-0">
      <div className="absolute -left-1.5 -top-1.5 flex w-full h-full bg-white dark:bg-util-container-bg-dark rounded-2xl ">
        <div className="flex flex-col w-full h-full p-4 px-6 gap-1">
          <H6>{review.nickname}</H6>
          <B3 className="pl-1">{review.content}</B3>
        </div>
      </div>
    </div>

  )
}
