'use client'
import { B3, H4, H6 } from "@/shared/ui/text/text"
import { useEffect, useState } from "react"
import { Review } from "./reviewSection"
import { BaseButton, LongButton } from "@/shared/ui/button"

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

export const ReviewModalButton = ({
  reviewModalOpen,
  setReviewModalOpen
}:{
  reviewModalOpen: boolean,
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) =>{
  return (
    <div className={`flex pc:hidden w-full h-auto justify-center items-center pointer-events-auto duration-400 ease-in-out ${reviewModalOpen ? "opacity-0" : "opacity-100"}`}>
      <LongButton color="blue" rounded="rounded-p24" onClick={()=>{
        setReviewModalOpen(true)
      }} >
        <span className="text-p18 tab:text-p20 pc:text-p24 ">리뷰 쓰기</span>  
      </LongButton>
    </div>
  )
}

export const ReviewModal = ({
  reviewModalOpen,
  setReviewModalOpen
}:{
  reviewModalOpen: boolean, 
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) =>{
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
     setVisible(true)
     return;
    }
    if (reviewModalOpen) {
      setTimeout(()=>setVisible(true),0) // show when open
    } else {
      setTimeout(()=>setVisible(false),400) // show when open
    }
  }, [reviewModalOpen]);

  return (
    <>
    {visible? 
      <div className="flex w-full h-full px-[30px] py-[20px] pc:px-0 pc:py-4 pc:gap-4 justify-between items-center pc:justify-start rounded-[20px] flex-col ">
      <H4 className="flex h-10 items-center">리뷰 작성하기</H4>
      
      <input type="text" placeholder="이름" className="w-full h-p38 px-5 py-[5px] pc:h-[56px] rounded-[10px] text-p14 pc:text-p18 bg-util-input-light dark:bg-util-input-dark shrink-0 text-util text-util-input-text font-bold" />
      <input type="text" placeholder="이메일" className="w-full h-p38 px-5 py-[5px] pc:h-[56px] rounded-[10px] text-p14 pc:text-p18 bg-util-input-light dark:bg-util-input-dark shrink-0 text-util-input-text font-bold" />
      <textarea placeholder="메세지" className="w-full h-[113px] px-5 py-[14px] pc:h-[169px] rounded-[10px] text-p14 pc:text-p18 bg-util-input-light dark:bg-util-input-dark shrink-0 text-util-input-text font-bold" />

      <LongButton color="blue" rounded="rounded-p24" className="pc:mt-4" onClick={()=>{
        setReviewModalOpen(false)
      }}>
        <span className="text-p18">리뷰 남기기</span>
      </LongButton>
      
      <BaseButton color="none" rounded="rounded-p24" className="mt-2 border-inside-none pc:hidden" onClick={()=>{
        setReviewModalOpen(false)
      }}>
        <span className="text-p16">닫기</span>
      </BaseButton>

    </div>
    : null }
    </>
  )
}