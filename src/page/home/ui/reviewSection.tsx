"use client";
import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import {
  ReviewCard,
  ReviewCardSkeleton,
  ReviewModal,
  ReviewModalButton,
} from "./reviewSectionComponents";
import { useEffect, useRef, useState } from "react";
import { UserReview } from "@/shared/model/dbTypes";
import { readReview } from "../model/readReview";

const Review = () => {
  const scrollbarContainerRef = useRef<HTMLDivElement>(null);
  const scrollMoveBarRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [addReviewRow, setAddReviewRow] = useState<UserReview>();

  const isDraggingRef = useRef(false);

  useEffect(() => {
    readReview()
      .then((data) => {
        if (!data) return;
        setReviews(data.reviews.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 스크롤바 사이즈 업데이트 및 이벤트리스너 재설정
  useEffect(() => {
    const moveEl = scrollMoveBarRef.current;
    const containerEl = scrollbarContainerRef.current;
    const targetEl = scrollTargetRef.current;
    if (!moveEl || !containerEl || !targetEl) return;

    const updateScrollbarSize = () => {
      const scrollTargetHeight = targetEl.scrollHeight;
      const scrollContainerHeight = containerEl.clientHeight;

      const scrollMoveBarHeight =
        scrollContainerHeight >= scrollTargetHeight
          ? scrollContainerHeight
          : (scrollContainerHeight / scrollTargetHeight) *
            containerEl.clientHeight;

      moveEl.style.height = `${scrollMoveBarHeight}px`;
    };

    const observer = new ResizeObserver(() => {
      updateScrollbarSize();
    });
    observer.observe(moveEl);
    observer.observe(containerEl);
    observer.observe(targetEl);

    if (!targetEl) return;
    targetEl.addEventListener("wheel", (e) => {
      console.log("wheel event in review section");
      e.stopPropagation();
    });

    return () => {
      observer.disconnect();
      targetEl.removeEventListener("wheel", (e) => {
        console.log("wheel event in review section");
        e.stopPropagation();
      });
    };
  }, [reviews]);

  // 스크롤바로 이동 시에 동기화되도록 하는 이벤트리스너
  useEffect(() => {
    const moveEl = scrollMoveBarRef.current;
    const containerEl = scrollbarContainerRef.current;
    const targetEl = scrollTargetRef.current;
    if (!moveEl || !containerEl || !targetEl) return;

    let startY = 0;
    let startTop = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startY = e.clientY;

      const computedTop = parseFloat(getComputedStyle(moveEl).top) || 0;
      startTop = computedTop;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const containerHeight = containerEl.offsetHeight;
      const barHeight = moveEl.offsetHeight;
      const minTop = 0;
      const maxTop = containerHeight - barHeight;

      // 마우스가 움직인 거리 (절대 좌표 차이)
      const deltaY = e.clientY - startY;

      // 바의 새 위치
      const newTop = startTop + deltaY;
      const clampedTop = Math.max(minTop, Math.min(maxTop, newTop));

      // 1) 바 위치를 직접 이동
      moveEl.style.top = `${clampedTop}px`;

      // 2) 바 위치 비율을 실제 스크롤 가능 범위에 매핑
      const scrollMax = targetEl.scrollHeight - targetEl.clientHeight;
      const scrollRatio = maxTop > 0 ? clampedTop / maxTop : 0;

      targetEl.scrollTop = scrollRatio * scrollMax;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    moveEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      moveEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [reviews]);

  useEffect(() => {
    const targetEl = scrollTargetRef.current;
    const moveEl = scrollMoveBarRef.current;
    const containerEl = scrollbarContainerRef.current;
    if (!targetEl || !moveEl || !containerEl) return;

    let isAnimating = false;
    const rafId: number | null = null;

    // 스크롤바 위치 업데이트 함수
    const updateScrollbarPosition = () => {
      if (isDraggingRef.current) return;

      const moveElHeight = moveEl.offsetHeight;
      const containerElHeight = containerEl.offsetHeight;
      const maxTop = containerElHeight - moveElHeight;

      const scrollMax = targetEl.scrollHeight - targetEl.clientHeight;
      const scrollRatio = scrollMax > 0 ? targetEl.scrollTop / scrollMax : 0;
      const newTop = scrollRatio * maxTop;

      moveEl.style.top = `${newTop}px`;
    };

    // wheel 이벤트 핸들러
    const syncWheelScroll = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault(); // 브라우저 기본 스크롤 방지
      e.stopPropagation();

      // 현재 스크롤 위치 기준으로 새로운 스크롤 위치 계산
      const scrollMax = targetEl.scrollHeight - targetEl.clientHeight;
      const currentScrollTop = targetEl.scrollTop;
      const newScrollTop = Math.max(
        0,
        Math.min(scrollMax, currentScrollTop + e.deltaY),
      );

      // 스크롤 위치 직접 설정 (smooth 애니메이션 제거)
      targetEl.scrollTop = newScrollTop;

      // 스크롤바 위치 업데이트
      updateScrollbarPosition();
    };

    // scroll 이벤트 핸들러 (모바일 터치 스크롤용)
    const syncTouchScroll = () => {
      if (isAnimating) return;
      updateScrollbarPosition();
    };

    // 이벤트 리스너 등록
    targetEl.addEventListener("scroll", (e)=>{
        e.stopPropagation();
        syncTouchScroll()
      });

    targetEl.addEventListener("wheel", (e)=>{
    if (window && window.innerWidth > 1024){
      e.preventDefault();
    }})
    
    // add Review 애니메이션
    let timeout: number | NodeJS.Timeout;
    if (addReviewRow) {
      isAnimating = true;
      timeout = setTimeout(() => { 
        setAddReviewRow(undefined);

        setReviews((prev) =>
          prev.slice(0).reverse().concat(addReviewRow).reverse(),
        );
        isAnimating = false;
      }, 3000);
    }

    return () => {
      
      targetEl.removeEventListener("scroll", (e)=>{
        e.stopPropagation();
        syncTouchScroll()
      });
      targetEl.removeEventListener("wheel", (e)=>{
    if (window && window.innerWidth > 1024){
      e.preventDefault();
    }})
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(timeout);
    };
  }, [addReviewRow]);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <PageContainer
      id="review-section"
      className="dark:bg-review-dark bg-[#f4f6ff] !px-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <PageHeader
          title="Review"
          color="bg-review-light dark:bg-review-dark"
        />
        <div className="tab:mt-[5.75rem] pc:mt-[8rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] tab:px-0 tab:py-2 z-[100] mt-[5.5rem] flex h-[calc(100%-6rem)] w-full max-w-[100vw] shrink-0 justify-center">
          <div className="pc:h-[calc(100%-13rem)] pc:flex-row tab:px-[10%] pc:px-[6%] pc:mt-20 flex h-[calc(100%-9rem)] w-full shrink-0 flex-col items-center gap-5 px-2 md:gap-10">
            <div className="tab:mt-10 pc:-mt-2 tab:h-fit mt-4 flex h-full w-full">
              <div
                ref={scrollbarContainerRef}
                className="tab:h-[clamp(18rem,48vh,40rem)] pc:h-[clamp(22rem,60vh,40rem)] darkMode-animate bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark relative flex h-full w-4"
              >
                <div
                  ref={scrollMoveBarRef}
                  className="bg-util-scrollbar-blue-light darkMode-animate dark:bg-util-scrollbar-blue-dark absolute flex h-[3rem] w-full scroll-smooth"
                />
              </div>
              <div className="tab:max-h-[clamp(18rem,48vh,40rem)] pc:max-h-[clamp(22rem,60vh,40rem)] pointer-events-none flex w-full flex-col overflow-y-hidden">
                <div
                  ref={scrollTargetRef}
                  className={`scrollbar-hide pointer-events-auto flex h-full w-full flex-col gap-4 overflow-y-auto ${isDraggingRef.current ? "scroll-smooth" : ""} px-4 py-3`}
                >
                  {addReviewRow && (
                    <ReviewCard
                      id={"review-card-new"}
                      review={addReviewRow}
                      className="animate-fade-down-slower"
                    />
                  )}
                  {reviews.map((review, index) => (
                    <ReviewCard
                      id={`review-card-${index + 1}`}
                      key={index}
                      review={review}
                    />
                  ))}
                  {reviews.length < 5 &&
                    Array.from({
                      length:
                        5 -
                        (addReviewRow ? 1 + reviews.length : reviews.length),
                    }).map((_, index) => <ReviewCardSkeleton key={index} />)}
                </div>
              </div>
            </div>
            <div className="pc:flex-row pc:max-w-[50%] pc:items-start tab:px-[10%] pc:px-0 flex w-full flex-col items-center">
              <ReviewModalButton
                reviewModalOpen={reviewModalOpen}
                setReviewModalOpen={setReviewModalOpen}
              />
              <div className="pc:flex darkMode-animate dark:bg-util-container-bg-dark tab:h-[clamp(18rem,40vh,40rem)] pc:h-[clamp(20rem,60vh,30rem)] relative hidden w-full shrink-0 flex-col rounded-[20px] bg-white px-10 pt-[20px] shadow-lg">
                <ReviewModal
                  reviewModalOpen={reviewModalOpen}
                  setReviewModalOpen={setReviewModalOpen}
                  setReviews={setReviews}
                  setAddReviewRow={setAddReviewRow}
                />
              </div>
            </div>
          </div>
          <div
            className={`pc:hidden tab:w-[80%] tab:mx-[10%] darkMode-animate dark:bg-util-container-bg-dark absolute bottom-0 left-0 z-[1] flex h-[28rem] w-full rounded-[20px] bg-white ${reviewModalOpen ? "animate-slide-up" : "animate-slide-down"} shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-4px_rgba(0,0,0,0.1)]`}
          >
            <ReviewModal
              reviewModalOpen={reviewModalOpen}
              setReviewModalOpen={setReviewModalOpen}
              setReviews={setReviews}
              setAddReviewRow={setAddReviewRow}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Review;
