import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "../home/ui/page_container";
import Image from "next/image";
import { ProjectContentsContainer} from "./ui/projectContents";
import { projecstMetaData, ProjectMetaData } from "./model/projectMetaData";
import { B3F, B4F, H6F } from "@/shared/ui/text/text";
import Link from "next/link";

const Project = ({ projectNum }: { projectNum: string }) => {

	const projectMetadata : ProjectMetaData | undefined = projecstMetaData[Number(projectNum)-1]

	return (
		<PageContainer>
			<div className="flex flex-col h-full w-full ">
				<PageHeader
					title={projectMetadata?.name ?? '_'}
					color="bg-projects-light  dark:bg-projects-dark"
				/>
				<div className="flex pc:flex-row mt-[5.5rem] tab:mt-[5.75rem] pc:mt-[10rem] w-full h-[calc(100%-5.5rem)] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] items-center pc:items-start gap-6 pc:gap-22 max:px-[calc((100vw-90.063rem)*0.2)] pc:pt-5">
					<div className="relative flex w-[30%] h-full ">
						<Image src={projectMetadata?.imageUrl ?? '/photo.png'} alt={projectMetadata?.name ?? ''} className="w-full object-contain object-top" fill />
					</div>
					<div className="flex flex-col gap-12 w-[70%] h-ful py-5 pb-20">
						<ProjectContentsContainer>
							<H6F className="font-semibold">프로젝트 이름</H6F>
							<B3F className="pl-1 !font-bold">{projectMetadata?.name?? ''}</B3F>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
							<H6F className="font-semibold">기간</H6F>
							<B4F className="pl-1">{projectMetadata?.contents.period.startDate?? ''} ~ {projectMetadata?.contents.period.endDate?? ''}</B4F>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
						<H6F className="font-semibold">참여 인원</H6F>
						<B4F className="pl-1">{projectMetadata?.contents.person?? ''}</B4F>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
						<H6F className="font-semibold">소개</H6F>
						<B4F className="pl-1">{projectMetadata?.contents.description?? ''}</B4F>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
							<H6F className="font-semibold">기술 스택</H6F>
							<ul className="list-none list-inside pc:space-y-1">
							{projectMetadata?.contents.techStack.map((stack, index) => (
								<li key={index} className="pl-1 space-x-2">
									<B4F>•</B4F>
									<B4F>{stack.join(', ')}</B4F>
								</li>
							))}
						</ul>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
							<H6F className="font-semibold">주요 기능 및 구현 내용</H6F>
							<ul className="list-none list-inside pc:space-y-1">
								{projectMetadata?.contents.implementation.map((implementation, index) => (
									<li key={index} className="pl-1 space-x-2">
										<B4F>•</B4F>
										<B4F>{implementation}</B4F>
									</li>
								))}
							</ul>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
							<H6F className="font-semibold">문제점 및 해결 방법</H6F>
							<B4F className="pl-1">{projectMetadata?.contents.problemSolution?? ''}</B4F>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
							<H6F className="font-semibold">새로운 시도 및 결과</H6F>
							<B4F className="pl-1">{projectMetadata?.contents.newAttempt?? ''}</B4F>
						</ProjectContentsContainer>
						<ProjectContentsContainer>
							<H6F className="font-semibold">배포 정보</H6F>
							<div className="flex gap-4 items-center">
								<B4F className="pl-1">
									배포 사이트: 
								</B4F>
								<Link href={projectMetadata?.contents.link.deploy?? ''} target="_blank" className="hover:underline hover:text-blue-500">
									<B4F>{projectMetadata?.contents.link.deploy.split('/').pop()}</B4F>
								</Link>
							</div>
							<div className="flex gap-4 items-center">
								<B4F className="pl-1">
									Github Link: 
								</B4F>
								<Link href={projectMetadata?.contents.link.github?? ''} target="_blank" className="hover:underline hover:text-blue-500">
									<B4F>{projectMetadata?.contents.link.github.split('github.com/').pop()}</B4F>
								</Link>
							</div>
						</ProjectContentsContainer>
					</div>
				</div>

			</div>
		</PageContainer>
	);
};
export default Project;
