"use client";
import { B3, B4, B5, H6 } from "@/shared/ui/text/text";
import Image from "next/image";
import { useRef, useState } from "react";
import { ProjectData } from "./projectsSection";
import Link from "next/link";

const ProjectCard = ({ index, data }: { index: number; data: ProjectData }) => {
  const detailLinkRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      id={`project-card-${index}`}
      className="tab:w-[75%] pc:w-[20rem] tab:max-w-[24rem] flex h-full w-[calc((100%-24vw))] shrink-0 flex-col py-0.5"
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
            <Image
              src={data.image}
              alt="dinn.dev"
              className="h-full w-full rounded-t-2xl bg-center object-cover"
              fill
            />
            <div
              className={`absolute top-0 left-0 h-full w-full rounded-t-2xl ${isHover ? "bg-none" : "bg-black/40 dark:bg-black/30"}`}
            />
          </div>
          <div className="darkMode-animate dark:bg-util-container-bg-dark flex h-2/5 w-full flex-col rounded-b-2xl bg-white px-6 pt-6 pb-2">
            <div className="flex w-full">
              <H6 className="">{data.title}</H6>
            </div>
            <div className="mt-2 flex w-full px-0.5">
              <B4 className="line-clamp-3 min-h-[3.2rem]">
                {data.description}
              </B4>
            </div>
            <div className="mt-2 flex w-full">
              <div className="bg-util-tech-stack-orange-bg dark:bg-util-tech-stack-orange-bg-dark flex rounded-3xl px-3 py-1">
                <B5 className="!text-util-tech-stack-orange-text">React</B5>
              </div>
            </div>
            <div
              className={`mt-1 flex w-full justify-end text-black decoration-[1px] underline-offset-4 dark:text-white ${isHover ? "underline" : ""}`}
            >
              <div className="px-[3%] py-[2%]">
                <B3 className="whitespace-nowrap">{"자세히 보기"}</B3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProjectCard;
