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

export type Review = {
  nickname: string;
  content: string;
  date: string;
};

const mockReviews: Review[] = [
  {
    nickname: "Nickname1",
    content: "리뷰 이벤트 참여합니다",
    date: "2025-01-01T12:00:00",
  },
  {
    nickname: "Nickname2",
    content: "리뷰 이벤트 참여합니다",
    date: "2025-01-01T12:05:00",
  },
  {
    nickname: "Nickname3",
    content: "리뷰 이벤트 참여합니다",
    date: "2025-01-01T12:10:00",
  },
];

const Review = () => {
  const scrollbarContainerRef = useRef<HTMLDivElement>(null);
  const scrollMoveBarRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const [reviews] = useState<Review[]>(mockReviews);

  useEffect(() => {
    //  스크롤 타겟의 갯수 계산 (reviews.length)
    //  스크롤 컨테이너에서 이동바의 크기를 전체 스크롤 컨테이너를 타겟의 갯수로 나누어 계산
    //  스크롤 이동바의 현재 비율만큼 스크롤 타겟의 높이를 이동

    if (
      !scrollTargetRef.current ||
      !scrollMoveBarRef.current ||
      !scrollbarContainerRef.current
    )
      return;
    const scrollTargetHeight = scrollTargetRef.current.scrollHeight;
    const scrollContainerHeight = scrollbarContainerRef.current.clientHeight;

    // 스크롤 타겟이 스크롤 컨테이너의 높이랑 같거나 작으면 스크롤 무브 컨테이너의 크기는 스크롤 컨테이너 전체의 크기를 가짐
    // 만약 스크롤 타겟이 더 크면, 리뷰 갯수 만큼 스크롤 컨테이너 높이를 나누어 스크롤 무브 컨테이너의 크기를 계산
    const scrollMoveBarHeight =
      scrollContainerHeight >= scrollTargetHeight
        ? scrollContainerHeight
        : (scrollContainerHeight / scrollTargetHeight) * scrollContainerHeight;

    // 초기 move bar 높이 설정
    scrollMoveBarRef.current.style.height = `${scrollMoveBarHeight}px`;

    const targetEl = scrollTargetRef.current;
    if (!targetEl) return;
    targetEl.addEventListener("wheel", (e) => {
      e.stopPropagation();
    });
    return () => {
      targetEl.removeEventListener("wheel", (e) => {
        e.stopPropagation();
      });
    };
  }, [reviews]);

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
        top: (clampedTop / maxTop) * targetEl.scrollHeight,
        behavior: "smooth",
      });
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    moveEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      moveEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    // reviews container wheel 이벤트 리스너 추가
    const targetEl = scrollTargetRef.current;
    if (!targetEl) return;

    const syncScroll = (e: WheelEvent) => {
      e.stopPropagation();
      const moveEl = scrollMoveBarRef.current;
      if (!moveEl) return;
      const moveElHeight = moveEl.offsetHeight;
      const containerEl = scrollbarContainerRef.current;
      if (!containerEl) return;
      const containerElHeight = containerEl.offsetHeight;
      const maxTop = containerElHeight - moveElHeight;
      const minTop = 0;
      const currentTop = moveEl.offsetTop;
      const newTop = currentTop + e.deltaY;
      const clampedTop = Math.max(minTop, Math.min(maxTop, newTop));
      moveEl.style.top = `${clampedTop}px`;
    };
    targetEl.addEventListener("wheel", syncScroll);
    return () => {
      targetEl.removeEventListener("wheel", syncScroll);
    };
  }, []);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <PageContainer
      id="contact-section"
      className="dark:bg-review-dark bg-[#f4f6ff] !px-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <PageHeader
          title="Review"
          color="bg-review-light dark:bg-review-dark"
        />
        <div className="tab:mt-[5.75rem] pc:mt-[8rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] tab:px-0 tab:py-2 z-[100] mt-[5.5rem] flex h-[calc(100%-6rem)] w-full shrink-0 justify-center">
          <div className="pc:h-[calc(100%-13rem)] pc:flex-row tab:px-[10%] pc:px-[6%] flex h-[calc(100%-9rem)] w-full shrink-0 flex-col items-center gap-10 px-2">
            <div className="tab:mt-10 pc:mt-0 mt-3 flex h-fit w-full">
              <div
                ref={scrollbarContainerRef}
                className="tab:h-[clamp(18rem,48vh,40rem)] pc:h-[clamp(22rem,60vh,40rem)] bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark relative flex h-[24rem] w-4"
              >
                <div
                  ref={scrollMoveBarRef}
                  className="bg-util-scrollbar-blue-light dark:bg-util-scrollbar-blue-dark absolute flex h-[3rem] w-full"
                />
              </div>
              <div className="tab:max-h-[clamp(18rem,48vh,40rem)] pc:max-h-[clamp(22rem,60vh,40rem)] pointer-events-none flex max-h-[24rem] w-full flex-col overflow-y-hidden">
                <div
                  ref={scrollTargetRef}
                  className="scrollbar-hide pointer-events-auto flex h-full w-full flex-col gap-4 overflow-y-auto px-4 py-3"
                >
                  {reviews.map((review) => (
                    <ReviewCard key={review.nickname} review={review} />
                  ))}
                  {reviews.length < 5 &&
                    Array.from({ length: 5 - reviews.length }).map(
                      (_, index) => <ReviewCardSkeleton key={index} />,
                    )}
                </div>
              </div>
            </div>
            <div className="pc:flex-row pc:max-w-[50%] pc:items-start tab:px-[10%] pc:px-0 flex w-full flex-col items-center">
              <ReviewModalButton
                reviewModalOpen={reviewModalOpen}
                setReviewModalOpen={setReviewModalOpen}
              />
              <div className="pc:flex dark:bg-util-container-bg-dark tab:h-[clamp(18rem,40vh,40rem)] pc:h-[clamp(20rem,60vh,40rem)] relative hidden w-full shrink-0 flex-col rounded-[20px] bg-white px-10 pt-[20px] shadow-lg">
                <ReviewModal
                  reviewModalOpen={reviewModalOpen}
                  setReviewModalOpen={setReviewModalOpen}
                />
              </div>
            </div>
          </div>
          <div
            className={`pc:hidden tab:w-[80%] tab:mx-[10%] dark:bg-util-container-bg-dark absolute bottom-0 left-0 z-[1] flex h-[28rem] w-full rounded-[20px] bg-white ${reviewModalOpen ? "animate-slide-up" : "animate-slide-down"} shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-4px_rgba(0,0,0,0.1)]`}
          >
            <ReviewModal
              reviewModalOpen={reviewModalOpen}
              setReviewModalOpen={setReviewModalOpen}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Review;
