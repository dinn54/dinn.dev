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
      <B4F className="pl-1 leading-[1.45] whitespace-pre-wrap">
        {`  안녕하세요. 개발자 주정혁입니다.`}
        <div className="h-2" />
        {`  단순히 주어진 일을 처리하는 것이 아니라, 의미를 부여하고 더 좋은 개발 방법을 고민하며 프로덕트를 만들기 위해 노력합니다.`}
        <div className="h-2" />
        {`  다양한 포지션과의 원활한 협업이 곧 프로덕트 개선의 핵심이라고 생각합니다. 협업 과정에서 서로의 역할을 존중하며 소통하고, 그 안에서 함께 성장할 수 있는 긍정적인 시너지를 만들어내는 것을 중요하게 여깁니다.`}
        <div className="h-2" />
        {`  “사용자가 어떻게 쓰면 편하게 사용할 수 있을까?”라는 질문을 염두하며 설계 와 구현을 진행하며, 실제로 가치 있는 사용자 경험를 제공할 수 있는 개발을 지향합니다.`}
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
        <Depth1ListElement contents={["TailwindCSS"]} />
        <Depth1ListElement
          contents={["Tanstack Query", "Zustand", "Recoil", "Jotai"]}
        />

        <Depth1ListElement
          contents={["Supabase", "Nest.js", "Vite", "Webpack"]}
        />
        <Depth1ListElement
          contents={["Vercel", "Github Workflows", "Netlify", "AWS Amplify"]}
        />

        <Depth1ListElement contents={["Git", "Github", "Jira", "Slack"]} />
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
      <B3F className="pl-2">가톨릭대학교(졸업)</B3F>
      <B4F className="pl-4 whitespace-pre">
        {"기간:  2019.03.04 ~ 2021.02.09"} <br />
      </B4F>
    </div>
  );
};

export const AboutCertificate = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <H5F className="font-semibold">Certificate</H5F>
      <B3F className="pl-2">정보처리기사</B3F>
      <B4F className="pl-4 whitespace-pre">
        {"취득일:  2020.08.28"} <br />
      </B4F>
    </div>
  );
};
