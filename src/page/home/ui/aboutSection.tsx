import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import { ProfileImage } from "./aboutSectionComponents";
import { 
  Globe, 
  Github,
  ExternalLink
} from "lucide-react";
import { B3, B4, H3, H4 } from "@/shared/ui/text/text";
import Link from "next/link";
import { BaseButton } from "@/shared/ui/button";


const About = () => {
  return (
    <PageContainer id="about-section" className="bg-about-light dark:bg-about-dark">
      <div className="flex flex-col h-full w-full ">
        <PageHeader title="About me" color="bg-about-light dark:bg-about-dark" />
        {/* pageHeader 높이 - 네비게이션 헤더 높이 만큼 margin-top 추가 */}
        {/* h-[3.5rem] tab:h-[4.25rem] pc:h-[5rem */}
        <div className="mt-[5.5rem] tab:mt-[5.75rem] pc:mt-[8rem] flex w-full h-[calc(100%-6rem)] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] px-[8.8%] items-center z-[1] tab:pb-[10vh] pc:pb-[25vh] ">
          <div className="tab:mt-[clamp(2rem,3vw,8rem)] grid w-full h-fit tab:grid-cols-2 pc:grid-cols-16 ">
            <div className="tab:col-span-1 pc:col-span-4 ">
              <div className="flex flex-col w-full h-full justify-center items-center pb-4">
                <ProfileImage />
                <div className="flex w-full gap-[clamp(1rem,1.5vw,8rem)] justify-center">
                  <div className="flex tab:h-[1rem] pc:h-[2rem] py-2 justify-center items-center z-[1]">
                    <Link
                      href="https://dinn.dev"
                      target="_blank"
                      className="flex justify-center items-center gap-1 hover:cursor-pointer w-full "
                    >
                      <Globe className="h-full aspect-square text-black dark:text-white"  />
                      <B4>Home</B4>
                    </Link>
                  </div>
                  <div className="flex tab:h-[1rem] pc:h-[2rem] py-2 justify-center items-center z-[1]">
                  <Link
                      href="https://github.com/dinn54"
                      target="_blank"
                      className="flex justify-center items-center gap-1 hover:cursor-pointer w-full "
                    >
                    <Github className="h-[140%] aspect-square text-black dark:text-white" />
                    <B4>Github</B4>
                    </Link>
                  </div>
                  <button className="flex tab:h-[1rem] pc:h-[2rem] py-2 justify-center items-center z-[1]"
                  disabled
                  >
                    <Link
                        // href="https://dinn54.github.io"
                        // target="_blank"
                        href={"#"}
                        className="flex justify-center items-center gap-1 w-full hover:cursor-default"
                      >
                      <ExternalLink className="h-[140%] aspect-square text-gray-400 dark:text-gray-400" />
                      <B4 className="!text-gray-400 dark:text-gray-400">Blog</B4>
                    </Link>
                  </button>

                </div>
              </div>
            </div>
            <div className="tab:col-span-1 pc:col-span-4 ">
              <div className="hidden tab:flex w-full h-full flex-col gap-2 pl-[20%] justify-center">
                <H4>#React</H4>
                <H4>#Typescript</H4>
                <H4>#디테일</H4>
                <H4>#최적화</H4>
                <H4>#인터랙션</H4>
                <H4>#커뮤니케이션</H4>
                <H4>#Blockchain</H4>
              </div>
            </div>
            <div className="pt-4 tab:pt-[calc(2vw+2vh)] pc:pt-1 tab:col-span-2 pc:col-span-8 h-full flex flex-col justify-center items-center gap-5 tab:gap-[calc(2vw+2vh)] pc:gap-[calc(1vw+1vh)]">
              <div className="flex flex-col gap-3 tab:gap-10 pc:gap-[calc(1vw+1vh)] w-full justify-center items-center">
              <H3 weight="bold" className="text-[#52A61F]">Introduce</H3>
              <B3 className="text-center">
                React, Typescript 기반의  UI 개발을 주로 하는 프론트엔드 개발자입니다. 디테일한 UI와 사용자 중심의 인터페이스를 구현합니다.비용 대비 성능이 최적화되는 방향으로 개발을 진행합니다. 사용자와의 인터랙션으로 동작하는 웹을 구현할 수 있습니다. 벡엔드와 디자인 등 다른 직무의 진행 방향과 의도를 생각하며 커뮤니케이션하려고 노력합니다.
              </B3>
              </div>
              <div className="">
                <BaseButton color="green">
                  <span className="text-p12 tab:text-p14 pc:text-p16">자세히 보기 →</span>
                </BaseButton>
              </div>
            </div>


          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default About;

