'use client'
import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import { ReviewCard, ReviewModal, ReviewModalButton } from "./reviewSectionComponents";
import { useEffect, useRef, useState } from "react";

export type Review = {
  nickname: string
  content: string
  date: string
}

const mockReviews: Review[] = [
  {
    nickname: 'Nickname1',
    content: '리뷰 이벤트 참여합니다',
    date: '2025-01-01T12:00:00'
  },
  {
    nickname: 'Nickname2',
    content: '리뷰 이벤트 참여합니다',
    date: '2025-01-01T12:05:00'
  },
  {
    nickname: 'Nickname3',
    content: '리뷰 이벤트 참여합니다',
    date: '2025-01-01T12:10:00'
  },
  {
    nickname: 'Nickname4',
    content: '리뷰 이벤트 참여합니다',
    date: '2025-01-01T12:15:00'
  }
]

const Review = () => {
  const scrollbarContainerRef = useRef<HTMLDivElement>(null)
  const scrollMoveBarRef = useRef<HTMLDivElement>(null)
  const scrollTargetRef = useRef<HTMLDivElement>(null)
  
  const [reviews] = useState<Review[]>(mockReviews)
  
  useEffect(()=>{
    //  스크롤 타겟의 갯수 계산 (reviews.length)
    //  스크롤 컨테이너에서 이동바의 크기를 전체 스크롤 컨테이너를 타겟의 갯수로 나누어 계산
    //  스크롤 이동바의 현재 비율만큼 스크롤 타겟의 높이를 이동

    if (!scrollTargetRef.current || !scrollMoveBarRef.current ||  !scrollbarContainerRef.current) return
    const scrollTargetHeight = scrollTargetRef.current.scrollHeight
    const scrollContainerHeight = scrollbarContainerRef.current.clientHeight

    // 스크롤 타겟이 스크롤 컨테이너의 높이랑 같거나 작으면 스크롤 무브 컨테이너의 크기는 스크롤 컨테이너 전체의 크기를 가짐
    // 만약 스크롤 타겟이 더 크면, 리뷰 갯수 만큼 스크롤 컨테이너 높이를 나누어 스크롤 무브 컨테이너의 크기를 계산
    const scrollMoveBarHeight = scrollContainerHeight >= scrollTargetHeight ? scrollContainerHeight : (scrollContainerHeight / scrollTargetHeight  ) * scrollContainerHeight

    // 초기 move bar 높이 설정
    scrollMoveBarRef.current.style.height = `${scrollMoveBarHeight}px`
    
    const targetEl = scrollTargetRef.current
    if (!targetEl) return
    targetEl.addEventListener('wheel', (e)=>{
      e.stopPropagation()
    })
    return ()=>{
      targetEl.removeEventListener('wheel', (e)=>{
        e.stopPropagation()
      })
    }
  }, [reviews])

  useEffect(() => {
    const moveEl = scrollMoveBarRef.current;
    const containerEl = scrollbarContainerRef.current;
    const targetEl = scrollTargetRef.current;
    if (!moveEl || !containerEl || !targetEl) return;
  
    let isMouseDown = false;
    let startY = 0;
    let startTop = 0;
  
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      startY = e.clientY;
  
      // 현재 top 값 파싱 (px 제거)
      const computedTop = parseFloat(getComputedStyle(moveEl).top) || 0;
      startTop = computedTop;
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
  
      const deltaY = e.clientY - startY;
      const newTop = startTop + deltaY;
  
      const containerHeight = containerEl.offsetHeight;
      const barHeight = moveEl.offsetHeight;
  
      const minTop = 0;
      const maxTop = containerHeight - barHeight;
  
      const clampedTop = Math.max(minTop, Math.min(maxTop, newTop));
      moveEl.style.top = `${clampedTop}px`;
      targetEl.scrollTo({
        top: clampedTop / maxTop * targetEl.scrollHeight,
        behavior: 'smooth'
      })
    };
  
    const handleMouseUp = () => {
      isMouseDown = false;
    };
  
    moveEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  
    return () => {
      moveEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(()=>{
    // reviews container wheel 이벤트 리스너 추가
    const targetEl = scrollTargetRef.current
    if (!targetEl) return

    const syncScroll = (e: WheelEvent)=>{
      e.stopPropagation()
      const moveEl = scrollMoveBarRef.current
      if (!moveEl) return
      const moveElHeight = moveEl.offsetHeight
      const containerEl = scrollbarContainerRef.current
      if (!containerEl) return
      const containerElHeight = containerEl.offsetHeight
      const maxTop = containerElHeight - moveElHeight
      const minTop = 0
      const currentTop = moveEl.offsetTop
      const newTop = currentTop + e.deltaY
      const clampedTop = Math.max(minTop, Math.min(maxTop, newTop))
      moveEl.style.top = `${clampedTop}px`
    }
    targetEl.addEventListener('wheel', syncScroll)
    return ()=>{
      targetEl.removeEventListener('wheel', syncScroll)
    }
  }, [])

  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  return (
    <PageContainer id="contact-section" className="bg-[#f4f6ff] dark:bg-review-dark">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <PageHeader title="Review" color="bg-review-light dark:bg-review-dark" />
        <div className="mt-[5.5rem] tab:mt-[5.75rem] pc:mt-[8rem] flex w-full z-[100] h-[calc(100%-6rem)] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] tab:px-[8.8%] pc:px-[10%] tab:py-2 shrink-0 justify-center">
          <div className="absolute flex left-0 top-[9rem] pc:top-[13rem] w-[100vw] h-[calc(100%-9rem)] pc:h-[calc(100%-13rem)] px-2 gap-10 shrink-0 flex-col pc:flex-row tab:px-[10%] pc:px-[6%] ">
            <div className="mt-3 tab:mt-10 pc:mt-5 flex w-full h-fit ">
              <div ref={scrollbarContainerRef} className="relative flex w-4 h-[24rem] tab:h-[clamp(20rem,60vh,40rem)] bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark ">
                <div ref={scrollMoveBarRef} className="absolute flex w-full h-[3rem] bg-util-scrollbar-blue-light dark:bg-util-scrollbar-blue-dark " />
              </div>
              <div className="flex flex-col w-full max-h-[24rem] tab:max-h-[clamp(20rem,60vh,40rem)] overflow-y-hidden pointer-events-none">
                <div ref={scrollTargetRef} className="flex flex-col w-full h-fit gap-4 px-4 py-3 overflow-y-auto scrollbar-hide pointer-events-auto">
                {reviews.map(review=>
                  <ReviewCard key={review.nickname} review={review} />
                )}
                </div>
              </div>
            </div>
            <div className="flex pc:flex-row flex-col w-full pc:max-w-[50%]  items-center pc:items-start tab:px-[10%] pc:px-0 ">
              <ReviewModalButton reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
              <div className="mt-[20px] hidden flex-col relative pc:flex w-full h-[clamp(20rem,60vh,40rem)]   shrink-0 px-10 bg-white dark:bg-util-container-bg-dark rounded-[20px]">
                <ReviewModal reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
              </div>
            </div>
          </div>
          <div className={`absolute pc:hidden bottom-0 left-0 flex w-full tab:w-[70%] h-[28rem] tab:mx-[15%] z-[1]  bg-white dark:bg-util-container-bg-dark rounded-[20px] ${reviewModalOpen ? "animate-slide-up" : "animate-slide-down"} `}>
            <ReviewModal reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Review;


