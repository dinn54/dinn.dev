import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "../home/ui/page_container";
import { ProjectContentsContainer } from "./ui/projectContents";
import { projecstMetaData, ProjectMetaData } from "./model/projectMetaData";
import { B3F, B4F, H6F } from "@/shared/ui/text/text";
import ProjectThumbnailLinks from "./ui/projectThunbnailLinks";
import ImageClient from "@/shared/ui/image/imageClient";
import FeatureListToggle from "./ui/featureListToggle";
import ProjectExternalLinks from "./ui/externalLinks";

const Project = ({ projectNum }: { projectNum: string }) => {
  const projectMetadata: ProjectMetaData | undefined =
    projecstMetaData[Number(projectNum) - 1];

  return (
    <PageContainer>
      <div className="flex h-full w-full flex-col">
        <PageHeader
          title={projectMetadata?.name ?? "_"}
          color="bg-projects-light dark:bg-projects-dark"
        />
        <div className="pc:flex-row tab:mt-[8.25rem] pc:mt-[10rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] pc:items-start max:px-[calc((100vw-90.063rem)*0.2)] pc:pt-5 mt-[5.5rem] flex h-[calc(100%-5.5rem)] w-full">
          <div className="tab:flex-row tab:items-start tab: pc:gap-22 tab:gap-12 mt-4 flex h-full w-full flex-col items-center gap-6">
            <div className="tab:w-[30%] tab:min-w-[11rem] tab:mt-0 relative flex h-full w-[50%] flex-col items-center gap-4">
              <ImageClient
                filePath={projectMetadata.imageUrl}
                id="ThumbnailImage"
                alt={projectMetadata?.name ?? ""}
                style={{ width: "100%" }}
                className="max-h-[450px] object-contain"
              />
              <ProjectThumbnailLinks links={projectMetadata?.contents.link} />
            </div>

            <div className="pc:w-[70%] tab:gap-9 pc:gap-10 flex h-full w-full flex-col gap-8 py-5 pb-20">
              <ProjectContentsContainer>
                <H6F className="font-semibold">프로젝트명</H6F>
                <B3F className="pl-1 !font-bold">
                  {projectMetadata?.name ?? ""}
                </B3F>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="font-semibold">기간</H6F>
                <B4F className="pl-1">
                  {projectMetadata?.contents.period.startDate ?? ""} ~{" "}
                  {projectMetadata?.contents.period.endDate ?? ""}
                </B4F>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="font-semibold">참여 인원</H6F>
                <B4F className="pl-1">
                  {projectMetadata?.contents.person ?? ""}
                </B4F>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="font-semibold">소개</H6F>
                <B4F className="pl-1">
                  {projectMetadata?.contents.description ?? ""}
                </B4F>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="font-semibold">기술 스택</H6F>
                <ul className="pc:space-y-1 list-inside list-none">
                  {projectMetadata?.contents.techStack.map((stack, index) => (
                    <li key={index} className="space-x-2 pl-1">
                      <B4F>•</B4F>
                      <B4F>{stack.join(", ")}</B4F>
                    </li>
                  ))}
                </ul>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="cursor-pointer font-semibold">기능 구현</H6F>
                <FeatureListToggle
                  featureData={projectMetadata.contents.features}
                />
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="cursor-pointer font-semibold">주요 기술</H6F>
                <ul className="pc:space-y-1 list-inside list-none">
                  {projectMetadata.contents.mainTechFeatures.map(
                    (feature, index) => (
                      <li key={index} className="space-x-2 pl-1">
                        <B4F>•</B4F>
                        <B4F>{feature}</B4F>
                      </li>
                    ),
                  )}
                </ul>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <H6F className="font-semibold">문제점 및 해결 방법</H6F>
                <B4F className="pl-1">
                  <div className="space-y-3">
                    {projectMetadata?.contents.problemSolution.map(
                      (problem, index) => (
                        <div key={index} className="py-2">
                          <B3F className="dark:bg-yellow-100-dark bg-yellow-100 font-medium">
                            {problem.title}
                          </B3F>
                          <p className="pt-2 pl-2 leading-6 whitespace-pre-wrap">
                            <B4F>{problem.description}</B4F>
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </B4F>
              </ProjectContentsContainer>
              {projectMetadata?.contents.optimizations.length > 0 && (
                <ProjectContentsContainer>
                  <H6F className="font-semibold">
                    성능 최적화 및 DX 개선 사항
                  </H6F>
                  <B4F className="pl-1">
                    <div className="space-y-3">
                      {projectMetadata?.contents.optimizations.map(
                        (optimization, index) => (
                          <div key={index} className="py-2">
                            <B3F className="dark:bg-lime-100-dark bg-lime-100 font-medium">
                              {optimization.title}
                            </B3F>
                            <p className="pt-2 pl-2 leading-6 whitespace-pre-wrap">
                              <B4F>{optimization.description}</B4F>
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </B4F>
                </ProjectContentsContainer>
              )}
              <ProjectContentsContainer>
                <H6F className="font-semibold">새로운 시도 및 결과</H6F>
                <B4F className="pl-1">
                  <div className="space-y-3">
                    {projectMetadata?.contents.newAttempt.map(
                      (attempt, index) => (
                        <div key={index} className="py-2">
                          <B3F className="dark:bg-blue-100-dark bg-blue-100 font-medium">
                            {attempt.title}
                          </B3F>
                          <p className="pt-2 pl-2 leading-6 whitespace-pre-wrap">
                            <B4F>{attempt.description}</B4F>
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </B4F>
              </ProjectContentsContainer>
              <ProjectContentsContainer>
                <ProjectExternalLinks projectMetadata={projectMetadata} />
              </ProjectContentsContainer>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Project;
