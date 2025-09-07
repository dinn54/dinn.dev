"use client";
import { B5, B6, H6 } from "@/shared/ui/text/text";
import { useRef, useState } from "react";
import { ProjectData } from "./projectsSection";
import Link from "next/link";
import NextImageClient from "@/shared/ui/image/nextImageClient";

const ProjectCard = ({ index, data }: { index: number; data: ProjectData }) => {
  const detailLinkRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      id={`project-card-${index}`}
      className="tab:w-[85%] pc:w-[22rem] tab:max-w-[23rem] flex h-full w-[calc((100%-24vw))] shrink-0 flex-col py-0.5"
    >
      <Link
        href={`/projects/${index + 1}`}
        className="flex h-full w-full flex-col"
      >
        <div
          className="flex h-full w-full max-w-[91.2%] shrink-0 flex-col rounded-2xl shadow-lg transition-all hover:shadow-xl"
          ref={detailLinkRef}
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div className="group relative flex h-3/5 w-full rounded-t-2xl">
            <NextImageClient
              filePath={data.image}
              alt="dinn.dev"
              className="h-full w-full rounded-t-2xl bg-center object-cover"
              fill
            />
            <div
              className={`darkMode-animate absolute top-0 left-0 h-full w-full rounded-t-2xl ${isHover ? "bg-none" : "bg-black/40 dark:bg-black/30"}`}
            />
          </div>
          <div className="darkMode-animate dark:bg-util-container-bg-dark tab:pt-6 tab:px-6 flex h-2/5 w-full flex-col rounded-b-2xl bg-white px-5 pt-4 pb-2">
            <div className="flex h-full w-full flex-col overflow-hidden">
              <div className="flex w-full">
                <H6 className="!font-semibold">{data.title}</H6>
              </div>
              <div className="flex w-full px-0.5 pt-2">
                <B5 className="line-clamp-3 min-h-[2.5rem] truncate whitespace-pre-wrap">
                  {data.description}
                </B5>
              </div>
              <div className="tab:pt-3 flex w-full pt-2">
                <div className="bg-util-tech-stack-orange-bg darkMode-animate dark:bg-util-tech-stack-orange-bg-dark tab:px-3 flex rounded-3xl px-2 py-1">
                  <B6 className="!text-util-tech-stack-orange-text">React</B6>
                </div>
              </div>
            </div>
            <div
              className={`mt-1 flex w-full justify-end text-black decoration-[1px] underline-offset-4 dark:text-white ${isHover ? "underline" : ""}`}
            >
              <B5 className="whitespace-nowrap">{"자세히 보기"}</B5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProjectCard;
