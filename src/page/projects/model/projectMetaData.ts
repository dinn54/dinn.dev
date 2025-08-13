export type ProjectMetaData = {
  no: number;
  name: string;
  imageUrl: string;
  contents: {
    period: {startDate: string, endDate: string};
    person: string;
    description: string;
    techStack: string[][];
    implementation: string[];
    problemSolution: string;
    newAttempt: string;
    link: {
      deploy: string;
      github: string;
    }
  };
};
export const projecstMetaData : ProjectMetaData[] = [
  {
    no: 1,
    name: "Studymate",
    imageUrl: "/로딩페이지.png",
    contents:{
      period: {startDate: "2025.02", endDate: "2025.08"},
      person: "Frontend 2명, Backend 1명, Designer 1명",
      description: "Studymate는 개발자들을 위한 스터디 플랫폼입니다. 개발 역량 향상을 위한 문제 풀이 플랫폼입니다.",
      techStack: [
        ["Next.js", "Typescript"],
        ["Tailwind CSS", "Anime.js"], 
        ["Vercel", "Github Workflows"],
        ["VS Code", "Cursor", "Figma"],
        ["Git", "Jira", "Notion","Gitbook"],
      ],
      implementation: ["모바일, 데스크탑 반응형 UI", "구글 로그인", "랜덤 문제 풀기", "Markdown text 미리 보기", "BFF API 캐싱", "SEO 최적화", "페이지 접근 제한 보안 강화"],
      problemSolution: "dd",
      newAttempt: "dd",
      link: {
        deploy: "https://developer-dev.study-mate.academy",
        github: "https://github.com/night-shift-team/study-mate-fe"
      }
    }
  },
  {
    no: 2,
    name: "Dinn.dev",
    imageUrl: "/로딩페이지.png",
    contents:{
      period: {startDate: "2025.01.01", endDate: "2025.01.01"},
      person: "1명(본인)",
      description: "Dinn.dev",
      techStack: [
        ["Next.js", "Typescript"],
        ["Tailwind CSS", "Anime.js", "Tippy.js"], 
        ["Vercel",]
      ],
      implementation: ["dd"],
      problemSolution: "dd",
      newAttempt: "dd",
      link: {
        deploy: "https://dinn.dev",
        github: "https://github.com/dinn54/dinn.dev"
      }
    }
  },
];