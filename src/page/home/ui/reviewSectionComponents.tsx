"use client";
import { B5, H5, H6 } from "@/shared/ui/text/text";
import { useEffect, useState, useTransition } from "react";
import { BaseButton, LongButton } from "@/shared/ui/button";
import { UserReview } from "@/shared/model/dbTypes";
import { writeReview } from "../model/writeReview";
import { makeRandomNumber } from "@/shared/model/makeRandom";
import { formSchema } from "@/features/textValidation/model/emailValidate";
import dynamic from "next/dynamic";
import tippy, { followCursor } from "tippy.js";

const Toast = dynamic(() => import("@/shared/ui/toast/toast"), { ssr: false });

export const ReviewCard = ({
  id,
  review,
  className,
}: {
  id: string;
  review: UserReview;
  className?: string;
}) => {
  useEffect(() => {
    const descriptionEl = document.getElementById(id);
    if (descriptionEl) {
      const tooltipContent = document.createElement("div");
      tooltipContent.style.maxWidth = "48vw";
      tooltipContent.style.whiteSpace = "pre-wrap";
      tooltipContent.textContent = review.contents;

      const style = getComputedStyle(descriptionEl);
      const lineHeight = parseFloat(style.lineHeight);
      const height = descriptionEl.getBoundingClientRect().height;
      const lines = Math.floor(height / lineHeight) + 1;

      if (lines === 2) {
        tippy(descriptionEl, {
          theme: "rounded",
          hideOnClick: true,
          allowHTML: true,
          content: tooltipContent,
          followCursor: true,
          plugins: [followCursor],
          maxWidth: "50vw",
        });
      }
    }
  }, []);

  return (
    <div
      className={`darkMode-animate bg-util-scrollbar-gray-light dark:bg-util-scrollbar-gray-dark relative flex h-[clamp(5rem,11vh,7.5rem)] w-full shrink-0 rounded-2xl shadow-md ${className}`}
    >
      <div className="darkMode-animate dark:bg-util-container-bg-dark absolute -top-1.5 -left-1.5 flex h-full w-full rounded-2xl bg-white shadow-md">
        <div className="tab:gap-1.5 flex h-full w-full flex-col gap-1 p-3 px-6 pt-4">
          <H6 className="!font-medium">
            {review.nickname.length >= 1
              ? review.nickname
              : "User" + makeRandomNumber(Object.values(review).join())}
          </H6>
          <div id={id}>
            <B5
              className={`line-clamp-2 pl-1 !font-normal text-ellipsis whitespace-pre-line`}
            >
              {review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents +
                review.contents}
            </B5>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewCardSkeleton = () => {
  return (
    <div className="bg-util-scrollbar-gray-light darkMode-animate dark:bg-util-scrollbar-gray-dark relative flex h-[clamp(5rem,10vh,8rem)] w-full shrink-0 rounded-2xl"></div>
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
  setAddReviewRow,
}: {
  reviewModalOpen: boolean;
  setReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReviews: React.Dispatch<React.SetStateAction<UserReview[]>>;
  setAddReviewRow: React.Dispatch<React.SetStateAction<UserReview | undefined>>;
}) => {
  const [visible, setVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [toastOpen, setToastOpen] = useState(false);
  const [textValidationMessage, setTextValidationMessage] = useState<string>();

  const resetFormData = (form: HTMLFormElement) => {
    form.reset();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    const formData = new FormData(e.currentTarget);
    const review = {
      nickname: formData.get("nickname") as string,
      email: formData.get("email") as string,
      contents: formData.get("contents") as string,
    };
    const { error } = formSchema.safeParse(review);
    const errorMessage = error?.issues[0].message ?? "데이터 유효성 통과";

    if (error) {
      // alert(error.message);
      setToastOpen(true);
      setTextValidationMessage(errorMessage);
      return;
    }
    startTransition(async () => {
      try {
        const { error } = await writeReview(review);
        if (!error) {
          setAddReviewRow(review);
        }
      } catch (error) {
        console.log(error);
      }
    });
    resetFormData(e.currentTarget);
  };

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
    <form
      className="pc:px-0 pc:py-4 pc:gap-[2vh] pc:justify-start flex h-full w-full flex-col items-center justify-between rounded-[20px] px-[30px] py-[20px]"
      onSubmit={async (e) => await onSubmit(e)}
      autoComplete="off"
    >
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        message={textValidationMessage}
      />
      {visible ? (
        <>
          {/* <div className="pc:px-0 pc:py-4 pc:gap-[2vh] pc:justify-start flex h-full w-full flex-col items-center justify-between rounded-[20px] px-[30px] py-[20px]"> */}
          <H5 className="flex h-10 items-center">리뷰 작성하기</H5>

          <input
            name="nickname"
            type="text"
            placeholder="이름"
            className="h-p38 pc:h-[clamp(40px,5vh,56px)] text-p14 pc:text-[clamp(12px,2.5vh,18px)] bg-util-input-light dark:bg-util-input-dark text-util placeholder:text-util-input-text darkMode-animate w-full shrink-0 rounded-[10px] px-5 py-[5px] text-black focus:ring dark:text-white dark:focus:ring-white dark:focus:outline-none"
          />
          <input
            name="email"
            type="text"
            placeholder="이메일"
            className="h-p38 pc:h-[clamp(40px,5vh,56px)] text-p14 pc:text-[clamp(12px,2.5vh,18px)] bg-util-input-light dark:bg-util-input-dark placeholder:text-util-input-text darkMode-animate w-full shrink-0 rounded-[10px] px-5 py-[5px] text-black focus:ring dark:text-white dark:focus:ring-white dark:focus:outline-none"
          />
          <textarea
            name="contents"
            placeholder="메세지"
            className="pc:h-[clamp(100px,18vh,169px)] text-p14 pc:text-[clamp(12px,2.5vh,18px)] bg-util-input-light dark:bg-util-input-dark placeholder:text-util-input-text darkMode-animate h-[113px] w-full shrink-0 rounded-[10px] px-5 py-[14px] text-black focus:ring dark:text-white dark:focus:ring-white dark:focus:outline-none"
          />

          <LongButton
            type="submit"
            color="blue"
            rounded="rounded-p24"
            className="pc:pt-4"
            onClick={() => setToastOpen(false)}
          >
            <span className="text-p18">리뷰 남기기</span>
          </LongButton>

          <BaseButton
            type="button"
            color="none"
            rounded="rounded-p24"
            className="border-inside-none pc:hidden mt-2"
            onClick={() => {
              setReviewModalOpen(false);
            }}
          >
            <span className="text-p16">닫기</span>
          </BaseButton>
          {/* </div> */}
        </>
      ) : null}
    </form>
  );
};
