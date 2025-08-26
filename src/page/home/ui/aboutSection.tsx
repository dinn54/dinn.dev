import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import { ProfileImage } from "./aboutSectionComponents";
import { Linkedin, Mail, Github, NotebookPen } from "lucide-react";
import { B3, H3, H4 } from "@/shared/ui/text/text";
import Link from "next/link";
import { BaseButton } from "@/shared/ui/button";

const About = () => {
  return (
    <PageContainer
      id="about-section"
      className="bg-about-light dark:bg-about-dark"
    >
      <div className="flex h-full w-full flex-col">
        <PageHeader
          title="About me"
          color="bg-about-light dark:bg-about-dark"
        />
        {/* pageHeader 높이 - 네비게이션 헤더 높이 만큼 margin-top 추가 */}
        {/* h-[3.5rem] tab:h-[4.25rem] pc:h-[5rem */}
        <div className="tab:pt-[11vh] pc:pt-[8rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] tab:pb-[10vh] pc:pb-[15vh] z-[1] flex h-[calc(100%-6rem)] w-full items-center px-[8.8%] pt-[5.5rem]">
          <div className="tab:pt-[clamp(0px,10vh,20rem)] tab:grid-cols-2 pc:grid-cols-16 grid h-fit max-h-full w-full">
            <div className="tab:col-span-1 pc:col-span-4 h-full w-full">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <ProfileImage />
                <div className="flex w-full justify-center gap-[clamp(1rem,1.5vw,8rem)]">
                  <div className="tab:h-[1rem] pc:h-[2rem] z-[1] flex items-center justify-center py-2">
                    <Link
                      href="https://dinn.dev"
                      target="_blank"
                      title="링크드인"
                      className="flex w-full items-center justify-center gap-1 hover:cursor-pointer"
                    >
                      <Linkedin className="aspect-square h-full text-black dark:text-white" />
                      {/* <B4>LinkedIn</B4> */}
                    </Link>
                  </div>
                  <div className="tab:h-[1rem] pc:h-[2rem] z-[1] flex items-center justify-center py-2">
                    <Link
                      href="https://github.com/dinn54"
                      target="_blank"
                      title="깃허브"
                      className="flex w-full items-center justify-center gap-1 hover:cursor-pointer"
                    >
                      <Github className="aspect-square h-[140%] text-black dark:text-white" />
                      {/* <B4>Github</B4> */}
                    </Link>
                  </div>
                  <div className="tab:h-[1rem] pc:h-[2rem] z-[1] flex items-center justify-center py-2">
                    <Link
                      target="_blank"
                      href={"#"}
                      title="이메일"
                      className="flex w-full items-center justify-center gap-1 hover:cursor-pointer"
                    >
                      <Mail className="aspect-square h-[140%]" />
                      {/* <B4 className="!text-gray-400 dark:text-gray-400">
                        Posts
                      </B4> */}
                    </Link>
                  </div>
                  <div className="tab:h-[1rem] pc:h-[2rem] z-[1] flex items-center justify-center py-2">
                    <Link
                      target="_blank"
                      href={"#"}
                      title="블로그"
                      className="flex w-full items-center justify-center gap-1 hover:cursor-pointer"
                    >
                      <NotebookPen className="aspect-square h-[140%]" />
                      {/* <B4 className="!text-gray-400 dark:text-gray-400">
                        Posts
                      </B4> */}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab:col-span-1 pc:col-span-4">
              <div className="tab:flex hidden h-full w-full flex-col justify-center gap-2 pl-[20%]">
                <H4>#React</H4>
                <H4>#Typescript</H4>
                <H4>#디테일</H4>
                <H4>#최적화</H4>
                <H4>#인터랙션</H4>
                <H4>#커뮤니케이션</H4>
                <H4>#Blockchain</H4>
              </div>
            </div>
            <div className="tab:pt-[2vh] pc:pt-1 tab:col-span-2 pc:col-span-8 tab:gap-[2vh] pc:gap-[calc(1vw+1vh)] flex h-full flex-col items-center justify-center gap-5 pt-4">
              <div className="tab:gap-[(1rem,4vh,4rem)] pc:gap-[calc(1vw+1vh)] flex w-full flex-col items-center justify-center gap-3">
                <H3 weight="bold" className="text-[#52A61F]">
                  Introduce
                </H3>
                <B3 className="text-center">
                  React, Typescript 기반의 UI 개발을 주로 하는 프론트엔드
                  개발자입니다. 디테일한 UI와 사용자 중심의 인터페이스를
                  구현합니다.비용 대비 성능이 최적화되는 방향으로 개발을
                  진행합니다. 사용자와의 인터랙션으로 동작하는 웹을 구현할 수
                  있습니다. 벡엔드와 디자인 등 다른 직무의 진행 방향과 의도를
                  생각하며 커뮤니케이션하려고 노력합니다.
                </B3>
              </div>
              <Link href={"/about"}>
                <BaseButton color="green">
                  <span className="text-p12 tab:text-p14 pc:text-p16">
                    자세히 보기 →
                  </span>
                </BaseButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default About;
