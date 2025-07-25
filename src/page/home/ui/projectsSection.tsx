"use client";
import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import ProjectCard from "./projectsCard";
import { Button } from "@/shared/ui/button";
import { useEffect, useRef } from "react";

export type ProjectData = {
	title: string;
	description: string;
	techStack: string[];
	image: string;
	link: string;
};
const ProjectData: ProjectData[] = [
	{
		title: "Dinn.dev",
		description:
			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		image: "/로딩페이지.png",
		link: "https://dinn.dev",
	},
	{
		title: "Dinn.dev",
		description:
			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		image: "/로딩페이지.png",
		link: "#",
	},
	{
		title: "Dinn.dev",
		description:
			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		image: "/로딩페이지.png",
		link: "#",
	},
	{
		title: "Dinn.dev",
		description:
			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		image: "/로딩페이지.png",
		link: "#",
	},
	{
		title: "Dinn.dev",
		description:
			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		image: "/로딩페이지.png",
		link: "#",
	},
	{
		title: "Dinn.dev",
		description:
			"주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.주정혁 포트폴리오, 블로그 사이트 입니다.",
		techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
		image: "/로딩페이지.png",
		link: "#",
	},
];

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
			<div className="flex flex-col w-full h-full justify-center items-center">
				<PageHeader
					title="Projects"
					color="bg-projects-light dark:bg-projects-dark"
				/>
				<div className="mt-[5.5rem] tab:mt-[5.75rem] pc:mt-[8rem] flex w-full h-[calc(100%-6rem)] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] px-[8.8%] z-[1] tab:py-2 shrink-0">
					<div className="flex flex-col w-full h-full gap-[0.5vh] tab:gap-6 pc:gap-10 items-center justify-center pb-[20%] tab:pb-[12%] pc:pb-[5%]">
						<div
							id="projects-cards-container"
							className=" flex-col flex w-full h-fit overflow-hidden"
						>
							<div
								ref={projectsRef}
								className="flex w-[calc(100vw-3rem)] tab:w-[calc(100vw-20%)] pc:w-full h-fit overflow-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-[2vw]"
							>
								<div className="flex w-[4vw] tab:w-[4vw] pc:w-0 h-full bg-transparent shrink-0 snap-start" />
								{ProjectData.map((project, index) => {
									return (
										<ProjectCard key={index} index={index} data={project} />
									);
								})}
								<div className="flex w-[8%] tab:w-[24%] pc:w-0 h-full bg-transparent shrink-0" />
							</div>
						</div>
						<Button
							className="mt-[3%] tab:mt-[5%] pc:mt-0 flex w-fit bg-button-gold-light dark:bg-button-gold-dark !py-3 "
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
