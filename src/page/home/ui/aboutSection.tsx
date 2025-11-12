import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./page_container";
import {
  AboutIconHoverDescription,
  ProfileImage,
} from "./aboutSectionComponents";
import { LuNotebook } from "react-icons/lu";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

import { B3, H3, H4 } from "@/shared/ui/text/text";
import Link from "next/link";
import { BaseButton } from "@/shared/ui/button";
import { getStorageLink } from "@/shared/model/getStorageLink";

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
              <div className="tab:gap-0 flex h-full w-full flex-col items-center justify-center gap-2">
                <ProfileImage />
                <div className="flex w-full justify-center gap-[clamp(1rem,1.5vw,8rem)]">
                  <Link
                    className="group z-[1] grid aspect-square w-[2.1rem] transition-transform duration-150 hover:scale-110"
                    href="https://dinn.dev"
                    target="_blank"
                    title="링크드인"
                  >
                    <FaLinkedin
                      size={"75%"}
                      className="darkMode-animate place-self-center text-black dark:text-white"
                    />
                    <AboutIconHoverDescription name="링크드인" />
                  </Link>
                  <Link
                    className="group z-[1] grid aspect-square w-[2.1rem] transition-transform duration-150 hover:scale-110"
                    href="https://github.com/dinn54"
                    target="_blank"
                    title="깃허브"
                  >
                    <FaGithub
                      size={"75%"}
                      className="darkMode-animate place-self-center text-black dark:text-white"
                    />
                    <AboutIconHoverDescription name="깃허브" />
                  </Link>
                  <Link
                    className="group z-[1] grid aspect-square w-[2.1rem] transition-transform duration-150 hover:scale-110"
                    target="_blank"
                    href={"mailTo:joodinner@gmail.com"}
                    title="이메일"
                  >
                    <IoMailOutline
                      size={"75%"}
                      className="darkMode-animate place-self-center text-black dark:text-white"
                    />
                    <AboutIconHoverDescription name="이메일" />
                  </Link>
                  <Link
                    className="group z-[1] grid aspect-square w-[2.1rem] transition-transform duration-150 hover:scale-110"
                    target="_blank"
                    href={getStorageLink("/dinn_resume_2506.pdf") ?? "#"}
                    title="이력서"
                  >
                    <LuNotebook
                      size={"75%"}
                      className="darkMode-animate place-self-center text-black dark:text-white"
                    />
                    <AboutIconHoverDescription name="이력서" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="tab:col-span-1 pc:col-span-4">
              <div className="tab:flex hidden h-full w-full flex-col justify-center gap-2 pl-[20%]">
                <H4>#React</H4>
                <H4>#Typescript</H4>
                <H4>#최적화</H4>
                <H4>#인터랙션</H4>
                <H4>#자동화</H4>
                <H4>#블록체인</H4>
                <H4>#커뮤니케이션</H4>
              </div>
            </div>
            <div className="tab:pt-[2vh] pc:pt-1 tab:col-span-2 pc:col-span-8 tab:gap-[2vh] pc:gap-[calc(1vw+1vh)] flex h-full flex-col items-center justify-center gap-5 pt-4">
              <div className="tab:gap-[(1rem,4vh,4rem)] pc:gap-[calc(1vw+1vh)] flex w-full flex-col items-center justify-center gap-3">
                <H3 weight="bold" className="text-[#52A61F]">
                  Introduce
                </H3>
                <B3 className="gap-2 text-center whitespace-pre-line">
                  {"React, Typescript 기반 2년차 프론트엔드 개발자입니다."}
                  <div className="h-2" />
                  {`웹 서비스의 개발과 i18n을 통한
                  국제화 서비스 제공, 사내 관리 도구 개발을 담당하였으며,
                  반응형 웹과 사용성 좋은 UX를 제공하는 것을 추구합니다. 24/7
                  CS 대응 및 사용자 피드백 반영 과정을 통해 프로젝트 운영과
                  관리에 대해서도 경험을 쌓았습니다.`}
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
