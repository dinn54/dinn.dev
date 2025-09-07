"use client";
import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import ProjectCard from "./projectsCard";
import { useEffect, useRef } from "react";
import { projecstMetaData } from "@/page/projects/model/projectMetaData";
import { BaseButton } from "@/shared/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

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
          <div className="tab:gap-6 pc:gap-5 pc:pb-0 tab:pb-[5vh] pc:justify-start flex h-full w-full flex-col items-center justify-center gap-4 pb-[12vh]">
            <div
              id="projects-cards-container"
              className="pc:max-h-[500px] flex h-full max-h-[clamp(0px,50vh,500px)] w-full flex-col"
            >
              <div
                ref={projectsRef}
                className="tab:w-[calc(100vw-15%)] pc:w-full scrollbar-hide flex h-full w-[calc(100vw-3rem)] overflow-x-auto scroll-smooth px-2"
              >
                {projectData.map((project, index) => {
                  return (
                    <ProjectCard key={index} index={index} data={project} />
                  );
                })}
              </div>
            </div>
            <div className="tab:mt-[5%] pc:mt-0 mt-[3%] flex gap-3">
              <BaseButton
                color="gold"
                rounded="!rounded-full"
                square
                nonBorder
                onClick={() => {
                  const cardWidth =
                    document.getElementById("project-card-0")?.clientWidth;
                  if (projectsRef.current && cardWidth) {
                    projectsRef.current.scrollBy({
                      left: -cardWidth,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <span className="text-p12 tab:text-p14 pc:text-p16">
                  <ArrowLeft />
                </span>
              </BaseButton>

              <BaseButton
                color="gold"
                rounded="!rounded-full"
                square
                nonBorder
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
                <span className="text-p12 tab:text-p14 pc:text-p16">
                  <ArrowRight />
                </span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Projects;
