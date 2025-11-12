import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "../home/ui/page_container";
import { LinkTab } from "./ui/profileLinkTab";
import {
  AboutCertificate,
  AboutEducation,
  // AboutInterest,
  AboutIntroduction,
  AboutSkillsets,
  AboutWorkExperience,
} from "./ui/aboutMeContents";
import NextImageClient from "@/shared/ui/image/nextImageClient";
import { getStorageLink } from "@/shared/model/getStorageLink";

const AboutPage = () => {
  return (
    <PageContainer>
      <div className="flex h-full w-full flex-col">
        <PageHeader
          title="About me"
          color="bg-about-light dark:bg-about-dark"
        />
        <div className="pc:flex-row tab:mt-[5.75rem] pc:mt-[10rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] pc:items-start pc:gap-22 max:px-[calc((100vw-90.063rem)*0.2)] mt-[5.5rem] flex h-[calc(100%-5.5rem)] w-full flex-col items-center gap-6">
          <div className="pc:mt-2 flex w-full max-w-[clamp(15rem,90vw,22rem)] flex-col items-center justify-center gap-3 py-8">
            <div className="tab:w-[80%] relative flex aspect-[1/1.2] w-[60%]">
              <NextImageClient
                filePath="/profilePicture3.png"
                alt="about-me"
                fill
                className="rounded-3xl object-cover object-center outline-black"
              />
            </div>
            <div className="tab::w-full tab:w-[80%] flex w-[60%] items-center justify-center">
              <LinkTab name="LinkedIn" link="https://dinn.dev" />
              <LinkTab name="Github" link="https://github.com/dinn54" />
              <LinkTab name="Email" link="mailTo:joodinner@gmail.com" />
              <LinkTab
                name="Resume"
                link={getStorageLink("/dinn_resume_final.pdf") ?? "#"}
              />
            </div>
          </div>

          <div className="pc:mt-10 flex w-full flex-col gap-16 pb-40">
            <AboutIntroduction />
            {/* <AboutInterest /> */}
            <AboutWorkExperience />
            <AboutSkillsets />
            <AboutEducation />
            <AboutCertificate />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default AboutPage;
