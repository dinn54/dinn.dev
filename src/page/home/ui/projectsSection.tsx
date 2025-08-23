"use client";
import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import ProjectCard from "./projectsCard";
import { Button } from "@/shared/ui/button";
import { useEffect, useRef } from "react";
import { projecstMetaData } from "@/page/projects/model/projectMetaData";

export type ProjectData = {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  link: string;
};
const projectData = projecstMetaData.map((project, index) => ({
  title: project.name,
  description: project.contents.description,
  techStack: project.contents.techStack.flat(),
  image: project.imageUrl,
  link: `/projects/${index + 1}`,
}));
// const ProjectData: ProjectData[] = [
// 	{
// 		title: "Dinn.dev",
// 		description:
// 			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
// 		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
// 		image: "/로딩페이지.png",
// 		link: "https://dinn.dev",
// 	},
// 	{
// 		title: "Dinn.dev",
// 		description:
// 			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
// 		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
// 		image: "/로딩페이지.png",
// 		link: "#",
// 	},
// 	{
// 		title: "Dinn.dev",
// 		description:
// 			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
// 		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
// 		image: "/로딩페이지.png",
// 		link: "#",
// 	},
// 	{
// 		title: "Dinn.dev",
// 		description:
// 			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
// 		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
// 		image: "/로딩페이지.png",
// 		link: "#",
// 	},
// 	{
// 		title: "Dinn.dev",
// 		description:
// 			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
// 		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
// 		image: "/로딩페이지.png",
// 		link: "#",
// 	},
// 	{
// 		title: "Dinn.dev",
// 		description:
// 			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
// 		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
// 		image: "/로딩페이지.png",
// 		link: "#",
// 	},
// ];

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = projectsRef.current;
    if (!scrollElement) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      e.stopPropagation();
      scrollElement.scrollTo({
        left: scrollElement.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    scrollElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <PageContainer
      id="projects-section"
      className="bg-projects-light dark:bg-projects-dark overflow-x-hidden"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <PageHeader
          title="Projects"
          color="bg-projects-light dark:bg-projects-dark"
        />
        <div className="tab:mt-[5.75rem] pc:mt-[8rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] tab:py-2 z-[1] mt-[5.5rem] flex h-[calc(100%-6rem)] w-full shrink-0 px-[8.8%]">
          <div className="tab:gap-6 pc:gap-10 pc:pb-0 tab:pb-[9vh] pc:justify-start flex h-full w-full flex-col items-center justify-center gap-4 pb-[12vh]">
            <div
              id="projects-cards-container"
              className="pc:max-h-[500px] flex h-full max-h-[clamp(0px,50vh,500px)] w-full flex-col"
            >
              <div
                ref={projectsRef}
                className="tab:w-[calc(100vw-20%)] pc:w-full scrollbar-hide flex h-full w-[calc(100vw-3rem)] overflow-x-auto scroll-smooth px-2"
              >
                {projectData.map((project, index) => {
                  return (
                    <ProjectCard key={index} index={index} data={project} />
                  );
                })}
              </div>
            </div>
            <Button
              className="tab:mt-[5%] pc:mt-0 bg-button-gold-light dark:bg-button-gold-dark mt-[3%] flex w-fit !py-3"
              onClick={() => {
                const cardWidth =
                  document.getElementById("project-card-0")?.clientWidth;
                if (projectsRef.current && cardWidth) {
                  projectsRef.current.scrollBy({
                    left: cardWidth,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <span className="text-p12 tab:text-p14 pc:text-p16 text-white">
                더 보기 →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Projects;
