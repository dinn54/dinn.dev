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
    <div className="flex gap-2">
      <B4F>•</B4F>
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
      <B4F className="pl-1">안녕하세요. 주정혁입니다.</B4F>
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
          contents={[
            "Git",
            "Github",
            "Gitbook",
            "VS Code, Cursor",
            "Figma",
            "Jira",
            "Slack",
            "Notion",
            "Remix IDE",
          ]}
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
      <B3F className="pl-2">캐리버스</B3F>
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
