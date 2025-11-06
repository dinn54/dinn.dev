export type ProjectMetaData = {
  no: number;
  name: string;
  imageUrl: string;
  contents: {
    period: { startDate: string; endDate: string };
    person: string;
    description: string;
    techStack: string[][];
    features: string[];
    mainTechFeatures: string[];
    optimizations: {
      title: string;
      description: string;
    }[];
    problemSolution: {
      title: string;
      description: string;
    }[];
    newAttempt: {
      title: string;
      description: string;
    }[];
    link: {
      deploy: string[];
      github: string;
      portfolio?: string;
    };
  };
};
export const projecstMetaData: ProjectMetaData[] = [
  {
    no: 1,
    name: "Studymate",
    imageUrl: "/study-mate-thumbnail.svg",
    contents: {
      period: { startDate: "2025.02", endDate: "2025.10" },
      person: "Frontend 2명, Backend 1명, Designer 1명",
      description:
        "Studymate는 개발자들을 위한 스터디 플랫폼입니다. 개발 역량 향상을 위한 문제 풀이 플랫폼입니다.",
      techStack: [
        ["Next.js", "React", "Typescript"],
        ["TailwindCSS", "Anime.js"],
        ["Vercel", "Github Workflows"],
      ],
      features: [
        "구글 로그인",
        "비밀번호 초기화 및 재설정",
        "카테고리별 문제 풀기",
        "활동 기록 보드",
        "풀이 이력 관리 및 오답 복습",
        "전체 사용자 랭킹과 내 순위를 확인하는 보드",
        "학습하는데 도움을 주는 상점 아이템 구매",
        "문제 정보를 보기 위한 Markdown 뷰어",
      ],
      mainTechFeatures: [
        "Frontend Session 기반 인가 프로세스",
        "Middleware를 통한 Routing 검증",
        "구글 로그인",
        "SessionStorage를 활용한 레벨 테스트 데이터 핸들링",
        "Browser Cache API를 이용한 문제 캐싱",
        "PayApp 연동",
      ],
      optimizations: [
        {
          title: "BFF API 캐싱",
          description:
            "자주 호출되는 BFF API를 캐싱하여 리소스 사용을 줄이고 성능을 개선하였습니다. 캐싱이 필요한 API는 응답의 변동 주기에 따라 구분하였습니다. \n변동이 적은 문제의 풀이 정보 같은 경우 Cache API로 한달마다 만료되도록 적용하였고, 오프라인에서도 확인할 수 있도록 하였습니다. 랜딩 페이지의 데일리 문제 풀이 상태는 Tanstack query로 30초의 캐싱 시간을 가져, 잦은 페이지 이동 시에 불필요한 추가 호출이 되지 않도록 구성하였습니다.",
        },

        {
          title: "OpenAPI 명세 기반 선언 자동화",
          description:
            "호출하는 API가 많아질수록 파라미터나 응답값으로 전달할 때 휴먼 에러가 날 수 있는 경우가 늘어납니다. 이를 방지하고자 Orval를 도입하여 타입을 자동으로 생성하였습니다. Axios, Fetch 등으로 HTTP Method를 포함하여 API 호출하는 함수 또한 자동 생성 가능했으나 현재는 Fetch를 커스터마이즈하여 사용하고 있었기 때문에 이 기능을 사용하진 않았습니다.",
        },
        {
          title: "Github Pull Request 내용 생성 자동화",
          description:
            "개인별로 맡은 작업량이 많은 상황에서 페이지 단위로 Pull Request을 올려서 진행하였습니다. 큰 모듈 단위로 진행하니 PR 내용이 길어지는 상황에 놓이게 되었고 작성시간 또한 길어지며 가독성 또한 좋지 않은 상황에 놓였습니다. \n이 문제를 해결하기 위해 ChatGPT를 이용하여 PR 내용을 자동으로 생성하는 기능을 도입하였습니다. PR 제목과 설명을 작성할 때, 커밋 메세지 기반으로 제목을 만들고 하위 설명으로 ChatGPT가 변경된 파일의 내용을 분석하여 요약해주는 기능을 추가하였습니다. 이를 통해 PR 작성 시간을 단축하고, 가독성을 높일 수 있었습니다.",
        },
      ],
      problemSolution: [
        {
          title: "BFF api 캐싱이 초기 1번만 진행되는 상황",
          description: `갱신된 캐시 데이터 사용을 위해서 BFF의 요청 캐시 설정을 force-cache에서 no-cache로 변경하였습니다.
`,
        },
        {
          title: "BFF api의 호출이 없을때 갱신되지 않는 문제",
          description: `Cron Job을 통해 Stale While Revalidate 주기마다 한 번 호출하여 캐시 지속성 유지시켰습니다.`,
        },
        {
          title: "Backend 셧다운으로 인한 애플리케이션 에러 발생",
          description:
            "global-error.tsx를 두어 애플리케이션 단에서 발생하는 최소한의 에러 핸들링 페이지를 제공하였습니다.",
        },
        {
          title: "Form 제출 시(action 수행) 폼의 입력값이 사라지는 문제",
          description:
            "Input 태그 value에 상태 변수를 두어 리액트에서 controlled되는 상태로 인지하게 만들어 리렌더를 방지하였습니다.",
        },
        {
          title:
            "Aspect-ratio를 적용했을 때 Flex position에서 작동하지 않는 문제",
          description:
            " Flex의 기본 속성은 align-items: stretch이기 때문에 자식의 큰 요소 사이즈에 맞춰 자동으로 다른 요소도 사이즈도 늘어나게 되는데 align-items를 flex-start로 지정하여 시작 위치로부터 지정한 사이즈를 정상적으로 보이도록 수정하였습니다.",
        },
      ],
      newAttempt: [
        {
          title: "Fetch API 사용",
          description:
            "Next.js에서 공식적으로 지원하는 Fetch에 interceptor를 연동하여, 요청 전후에 특정 조건을 확인하여 핸들링하는 로직을 추가하여 사용성을 개선하였습니다. 또한 커스터마이즈하며 API 응답을 핸들링 하는 방식에 대해 고민할 수 있는 계기가 되었습니다.",
        },
        {
          title: "디자인 시스템 도입",
          description:
            "기존 디자인을 포함한 개발이 완료되어갈쯤 디자이너가 새롭게 중도 합류하게 되었습니다. 디자인 시스템으로 웹 페이지를 구현하기 위해 타이포그래피, 색상, 간격 등 스타일을 정의하고, 컴포넌트 라이브러리를 구축하여 일관된 디자인을 유지할 수 있도록 하였습니다. 그 결과 개발 생산성이 높아졌고 유지 보수하는데에도 적은 시간이 드는 효과를 얻었습니다.",
        },
        {
          title: "Google 로그인",
          description:
            "OAuth2 기능을 사용하여 간편 로그인 로직을 구현하였습니다. BFF API로 인증 code를 전달하여 사용자 정보를 서버에서 처리하고, 서버 인증 절차를 거친후 Frontend에 JWT 토큰을 전달하는 방식으로 구현하였습니다. ",
        },
      ],
      link: {
        deploy: [
          "https://developer-dev.study-mate.academy",
          "https://study-mate-fe.vercel.app",
        ],
        github: "https://github.com/night-shift-team/study-mate-fe",
        portfolio:
          "https://www.notion.so/jedo5/27f9fc6b028c81bd940ce32a43674371",
      },
    },
  },
  {
    no: 2,
    name: "Dinn.dev",
    imageUrl: "/dinn-dev-thumbnail.svg",
    contents: {
      period: { startDate: "2025.06", endDate: "2025.09" },
      person: "1명(본인)",
      description:
        "개인 포트폴리오 사이트입니다. 소개, 이력서, 프로젝트를 확인할 수 있습니다.",
      techStack: [
        ["Next.js", "Typescript"],
        ["Zustand"],
        ["Tailwind CSS", "Material UI", "Anime.js", "Tippy.js", "BProgress"],
        ["Supabase", "Zod"],
        ["Vercel"],
      ],
      features: [
        "랜딩 섹션 소개",
        "About me 페이지",
        "Projects 페이지",
        "리뷰 작성 ",
        "다크 모드 지원",
      ],
      mainTechFeatures: [],
      optimizations: [],
      problemSolution: [
        {
          title: "반응협 웹 설계",
          description:
            "랜딩 페이지의 컨텐츠는 브라우저의 사이즈에 맞춰 보여지도록 구현하였습니다. 브라우저의 사이즈는 유동적으로 변할 수 있기 때문에 너비 기준으로 미디어쿼리를 설정하여 레아아웃이 변하도록 하였습니다. Mobile, Tablet, PC 레이아웃을 너비 기준으로 나누었고, 최소 높이를 600px으로 두어 실제로 사용자가 사용하는 최소 높이로 설정하였습니다. \n\n이 과정에서 풀 스크린 컨텐츠의 비율을 유지하며 높이와 너비를 조절하는데 어려움이 있었습니다. 이를 해결하기 위해 CSS의 clamp() 함수를 사용하여 높이와 너비의 최소값, 기본값, 최대값을 설정하였습니다. 이를 통해 다양한 화면 크기에서 컨텐츠가 비율을 유지하며 보여지도록 하였습니다.",
        },
        {
          title: "UI 리사이즈",
          description:
            "Web API를 사용하여 컴포넌트의 사이즈를 지정하는 경우, 리사이즈 이벤트를 탐지하고 있지 않으면 브라우저의 사이즈 변화에 따른 UI 렌더링이 정상적으로 이루어지지 않는 문제가 발생할 수 있습니다. \n\n이 문제를 해결하기 위해 ResizeObserver를 사용하여 컴포넌트의 크기 변화를 감지하고, 상태를 업데이트하여 UI가 올바르게 렌더링되도록 하였습니다. ",
        },
      ],
      newAttempt: [
        {
          title: "다크 모드",
          description: "",
        },
        {
          title: "Client Side Database fetching",
          description: "",
        },
      ],
      link: {
        deploy: ["https://dinn.dev"],
        github: "https://github.com/dinn54/dinn.dev",
      },
    },
  },
];
