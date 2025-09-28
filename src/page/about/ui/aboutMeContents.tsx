import { B3F, B4F, H5F } from "@/shared/ui/text/text";

const makeBold = (text: string) => {
  switch (text) {
    case "TypeScript":
    case "JavaScript":
    case "React":
    case "Next.js":
    case "TailwindCSS":
    case "Git":
    case "Github":
    case "Vercel":
    case "VS Code":
    case "Jira":
    case "Slack":
      return true;
    default:
      return false;
  }
};
const Depth1ListElement = ({
  contents,
  children,
}: {
  contents: string[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col py-0.5 pl-1">
      <RowElement contents={contents} />
      {children}
    </div>
  );
};
const RowElement = ({ contents }: { contents: string[] }) => {
  return (
    <div className="flex items-center gap-2">
      <B4F className="mt-1.5">•</B4F>
      <li className="space-x-1">
        {contents.map((content, index) => (
          <B4F
            key={index}
            className={`${makeBold(content) ? "!font-bold" : "!font-regular"} !leading-6`}
          >
            {content}
            {index === contents.length - 1 ? "" : ", "}
          </B4F>
        ))}
      </li>
    </div>
  );
};

export const AboutIntroduction = () => {
  return (
    <div className="pc:gap-3 flex w-full flex-col gap-2 pl-1">
      <H5F className="font-semibold">Introduction</H5F>
      <B4F className="pl-1">
        React, Typescript 기반 2년차 프론트엔드 개발자 주정혁입니다. <br />
        <br />웹 클라이언트 서비스 개발과 i18n을 통한 국제화 서비스 제공, 사내
        관리 도 구 개발을 담당하였으며, 반응형 웹과 사용성 좋은 UX를 제공하는
        것을 추구 합니다. 팀원들과의 소통에서는 상호 존중을 바탕으로 상대방의
        의도를 이해 하려 하며, 피드백에 대해서는 열린 마음으로 검토하면서 업무
        생산성 개선을 위한 노력을 하고 있습니다. 24/7 CS 대응 및 사용자 피드백
        반영 과정을 통해 프로젝트 운영과 관리에 대해서도 경험을 쌓았습니다.
      </B4F>
    </div>
  );
};

export const AboutSkillsets = () => {
  return (
    <div className="pc:gap-3 flex w-full flex-col gap-2">
      <H5F className="font-semibold">Skillsets</H5F>
      <ul className="pc:space-y-1 list-inside list-none">
        <Depth1ListElement
          contents={["TypeScript", "JavaScript", "Solidity"]}
        />
        <Depth1ListElement contents={["React", "Next.js", "Expo"]} />
        <Depth1ListElement contents={["HTML", "CSS", "TailwindCSS"]} />
        <Depth1ListElement
          contents={["Tanstack Query", "Zustand", "Recoil", "Jotai"]}
        />
        <Depth1ListElement contents={["Supabase", "Nest.js"]} />
        <Depth1ListElement contents={["Vite", "Webpack"]} />
        <Depth1ListElement contents={["ESLint", "Prettier", "Husky"]} />
        <Depth1ListElement
          contents={["Vercel", "Github Workflows", "Netlify", "AWS Amplify"]}
        />

        <Depth1ListElement
          contents={["Git", "Github", "VS Code, Cursor", "Remix IDE"]}
        />
        <Depth1ListElement
          contents={["Jira", "Slack", "Figma", "Notion", "Gitbook"]}
        />
      </ul>
    </div>
  );
};
export const AboutInterest = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <H5F className="font-semibold">Interest</H5F>
      <B4F className="pl-1">React Native</B4F>
    </div>
  );
};

export const AboutWorkExperience = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <H5F className="font-semibold">Work Experience</H5F>
      <B3F className="mt-2 pl-2 !font-semibold">캐리버스(Carrieverse)</B3F>
      <B4F className="mt-2 pl-4">
        재직 기간: 24.04.15 ~ 25.04.22 <br />
      </B4F>
      <B4F className="pl-4">소속: Web3 개발실</B4F>

      <B4F className="pl-4">
        주요 업무:{" "}
        <B4F className="!font-bold">
          HTML 게임 개발, 사내 관리 도구 개발, Web3 교환소 고도화 개발 및 실시간
          운영 장애 대응
        </B4F>
      </B4F>
    </div>
  );
};

export const AboutEducation = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <H5F className="font-semibold">Education</H5F>
      <B3F className="pl-2">가톨릭대학교</B3F>
    </div>
  );
};

export const AboutCertificate = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <H5F className="font-semibold">Certificate</H5F>
      <B3F className="pl-2">정보처리기사</B3F>
    </div>
  );
};
