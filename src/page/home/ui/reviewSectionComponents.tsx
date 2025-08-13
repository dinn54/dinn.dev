"use client";
import { B3, H4, H6 } from "@/shared/ui/text/text";
import { useEffect, useState } from "react";
import { Review } from "./reviewSection";
import { BaseButton, LongButton } from "@/shared/ui/button";

export const ReviewCard = ({ review }: { review: Review }) => {
  useEffect(() => {}, []);
  return (
    <div className="bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark relative flex h-[6rem] w-full shrink-0 rounded-2xl">
      <div className="dark:bg-util-container-bg-dark absolute -top-1.5 -left-1.5 flex h-full w-full rounded-2xl bg-white">
        <div className="flex h-full w-full flex-col gap-1 p-4 px-6">
          <H6>{review.nickname}</H6>
          <B3 className="pl-1">{review.content}</B3>
        </div>
      </div>
    </div>
  );
};

export const ReviewCardSkeleton = () => {
  return (
    <div className="bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark relative flex h-[6rem] w-full shrink-0 rounded-2xl"></div>
  );
};

export const ReviewModalButton = ({
  reviewModalOpen,
  setReviewModalOpen,
}: {
  reviewModalOpen: boolean;
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`pc:hidden pointer-events-auto flex h-auto w-full items-center justify-center duration-400 ease-in-out ${reviewModalOpen ? "opacity-0" : "opacity-100"}`}
    >
      <LongButton
        color="blue"
        rounded="rounded-p24"
        onClick={() => {
          setReviewModalOpen(true);
        }}
      >
        <span className="text-p18 tab:text-p20 pc:text-p24">리뷰 쓰기</span>
      </LongButton>
    </div>
  );
};

export const ReviewModal = ({
  reviewModalOpen,
  setReviewModalOpen,
}: {
  reviewModalOpen: boolean;
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setVisible(true);
      return;
    }
    if (reviewModalOpen) {
      setTimeout(() => setVisible(true), 0); // show when open
    } else {
      setTimeout(() => setVisible(false), 400); // show when open
    }
  }, [reviewModalOpen]);

  return (
    <>
      {visible ? (
        <div className="pc:px-0 pc:py-4 pc:gap-[2vh] pc:justify-start flex h-full w-full flex-col items-center justify-between rounded-[20px] px-[30px] py-[20px]">
          <H4 className="flex h-10 items-center">리뷰 작성하기</H4>

          <input
            type="text"
            placeholder="이름"
            className="h-p38 pc:h-[clamp(40px,5vh,56px)] text-p14 pc:text-[clamp(12px,2.5vh,18px)] bg-util-input-light dark:bg-util-input-dark text-util placeholder:text-util-input-text w-full shrink-0 rounded-[10px] px-5 py-[5px] text-black focus:ring dark:text-white dark:focus:ring-white dark:focus:outline-none"
          />
          <input
            type="text"
            placeholder="이메일"
            className="h-p38 pc:h-[clamp(40px,5vh,56px)] text-p14 pc:text-[clamp(12px,2.5vh,18px)] bg-util-input-light dark:bg-util-input-dark placeholder:text-util-input-text w-full shrink-0 rounded-[10px] px-5 py-[5px] text-black focus:ring dark:text-white dark:focus:ring-white dark:focus:outline-none"
          />
          <textarea
            placeholder="메세지"
            className="pc:h-[clamp(100px,18vh,169px)] text-p14 pc:text-[clamp(12px,2.5vh,18px)] bg-util-input-light dark:bg-util-input-dark placeholder:text-util-input-text h-[113px] w-full shrink-0 rounded-[10px] px-5 py-[14px] text-black focus:ring dark:text-white dark:focus:ring-white dark:focus:outline-none"
          />

          <LongButton
            color="blue"
            rounded="rounded-p24"
            className="pc:pt-4"
            onClick={() => {
              setReviewModalOpen(false);
            }}
          >
            <span className="text-p18">리뷰 남기기</span>
          </LongButton>

          <BaseButton
            color="none"
            rounded="rounded-p24"
            className="border-inside-none pc:hidden mt-2"
            onClick={() => {
              setReviewModalOpen(false);
            }}
          >
            <span className="text-p16">닫기</span>
          </BaseButton>
        </div>
      ) : null}
    </>
  );
};
