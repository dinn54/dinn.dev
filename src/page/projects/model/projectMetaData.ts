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
    };
  };
};
export const projecstMetaData: ProjectMetaData[] = [
  {
    no: 1,
    name: "Studymate",
    imageUrl: "/study-mate-thumbnail.svg",
    contents: {
      period: { startDate: "2025.02", endDate: "2025.08" },
      person: "Frontend 2명, Backend 1명, Designer 1명",
      description:
        "Studymate는 개발자들을 위한 스터디 플랫폼입니다. 개발 역량 향상을 위한 문제 풀이 플랫폼입니다.",
      techStack: [
        ["Next.js", "Typescript"],
        ["Tailwind CSS", "Anime.js"],
        ["Vercel", "Github Workflows"],
        ["VS Code", "Cursor", "Figma"],
        ["Git", "Jira", "Notion", "Gitbook"],
      ],
      features: [
        "구글 로그인",
        "랜덤 문제 풀기",
        "카테고리별 문제 풀기",
        "매일 활동 내역을 시각화하여 활동 기록을 확인하는 보드",
        "풀이 이력 관리 및 오답 복습",
        "전체 사용자 랭킹과 내 순위를 확인하는 보드",
        "학습하는데 도움을 주는 상점 아이템 구매",
        "관리자 페이지의 Markdown Text 미리 보기",
      ],
      optimizations: [
        {
          title: "BFF API 캐싱",
          description:
            "자주 호출되는 BFF API를 캐싱하여 리소스 사용을 줄이고 성능을 개선하였습니다. \n캐싱이 필요한 API는 응답의 변동 주기에 따라 구분하였습니다. 변동이 적은 문제의 풀이 정보 같은 경우 Cache API로 일 단위로 적용하였고, 오프라인에서도 확인할 수 있도록 하였습니다. 랜딩 페이지의 데일리 문제 풀이 상태는 Tanstack query로 30초의 캐싱 시간을 가져, 잦은 페이지 이동 시에 불필요한 추가 호출이 되지 않도록 구성하였습니다.",
        },

        {
          title: "OpenAPI 명세 기반 선언 자동화",
          description:
            "호출하는 API가 많아질수록 파라미터나 응답값으로 전달할 때 휴먼 에러가 날 수 있는 경우가 늘어납니다. 이를 방지하고자 Orval를 도입하여 타입을 자동으로 생성하였습니다. Axios, Fetch 등으로 HTTP Method를 포함하여 API 호출하는 함수 또한 자동 생성 가능했으나 현재는 Fetch를 커스터마이즈하여 사용하고 있었기 때문에 이 기능을 사용하진 않았습니다.",
        },
        {
          title: "Github Pull Request 내용 생성 자동화",
          description:
            "개인별로 맡은 작업량이 많은 상황에서 잦은 PR은 개발 속도를 낮추는 상황이었습니다. 이를 개선하기 위해 큰 모듈 단위로 병합을 하는 방식으로 진행하였고, 이는 자연스럽게 PR 내용이 길어지는 상황에 놓이게 되었습니다. 작성시간 또한 길어지며 가독성 또한 좋지 않았습니다. \n이 문제를 해결하기 위해 ChatGPT를 이용하여 PR 내용을 자동으로 생성하는 기능을 도입하였습니다. PR 제목과 설명을 작성할 때, 커밋 메세지 기반으로 제목을 만들고 하위 설명으로 ChatGPT가 변경된 파일의 내용을 분석하여 요약해주는 기능을 추가하였습니다. 이를 통해 PR 작성 시간을 단축하고, 가독성을 높일 수 있었습니다.",
        },
      ],
      problemSolution: [
        {
          title: "서버, 클라이언트 컴포넌트 간 유저 정보 관리",
          description: `기존의 유저 정보는 브라우저 스토리지에서 저장하고 잇는 방식이었습니다. 이 방식은 사용자가 직접 수정할 수 있기 때문에 유저 권한별 접근 제한을 두는 방식에 한계가 있었습니다. 따라서 유저 정보를 Zustand를 사용하여 메모리에 저장하는 방식으로 변경하였고 조작이 어려운 방식으로 관리하도록 변경하였습니다. \n\n하지만 브라우저를 새로고침하면 메모리에 있는 정보가 초기화되기 때문에 유저 정보를 재조회해야 하는 불편함이 있습니다. 이 프로젝트에는 적용하지 못했지만 더 나은 해결책으로는 유저 정보를 쿠키로 전달받아 서버측에서 관리하는 방식으로 변경하면 안전하게 핸들링 할 수 있는 점을 발견했습니다. 라우팅 제한은 쿠키 측에서 하고 렌더링 정보는 스토리지의 유저 정보로 하는 방식으로 하면 보안성을 높이면서 사용성을 증대 할 수 있는 것으로 보입니다.`,
        },
        {
          title: "Tanstack Query의 Next.js Hydration mismatch 에러",
          description: `Next.js에서 'use client'로 선언한 컴포넌트에서 QueryClient로 선언한 부분에 hydration mismatch 에러가 발생했습니다. \nQueryClient를 클라이언트 사이드 코드 스플리팅으로 선언하면 서버에서 사전 렌더링이 수행되지 않아 에러는 발생하지 않지만, SEO 관점에서는 바람직하지 않은 렌더링 순서를 가지게 됩니다. 크롤러는 스플리팅된 코드의 하위 요소를 서버에서 렌더링하지 못하므로, 초기 콘텐츠가 부족한 빈 페이지로 인식하게 되고 이로 인해 페이지 색인이 실패할 가능성이 있습니다. 따라서 SEO를 고려한다면 CSR 코드 스플리팅을 지양해야 합니다.\n\nSEO를 보장하려면 결국 서버와 클라이언트 간 렌더링 결과가 변하지 않는 방식으로 처리해야 합니다. 이에 저는 SSR 환경에서 사용하는 쿼리가 없기 때문에 SSR 환경인지를 체크하고 Early Return하여 QueryClient의 마운트를 우회하는 방식을 적용했습니다. `,
        },
        // {
        //   title: "Google Search Console에서 페이지 색인 생성 불가 문제",
        //   description: "초기에 ",
        // },
      ],
      newAttempt: [
        {
          title: "Fetch API 사용",
          description:
            "기존에는 Axios를 사용하여 API를 호출했지만, Fetch API로 변경하였습니다. Fetch API는 브라우저 내장 기능으로, 별도의 라이브러리 설치 없이 사용할 수 있어 번들 크기를 줄일 수 있는 장점이 있습니다. NextJS에서도 공식적으로 지원하고 SSR 페이지에서도 정상 동작하는 API입니다. Fetch에 interceptor를 연동하여, 요청 전후에 특정 조건을 확인하여 핸들링하는 로직을 추가하여 사용성을 개선하였습니다. 또한 커스터마이즈하며 API 응답을 핸들링 하는 방식에 대해 고민할 수 있는 계기가 되었습니다.",
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
      },
    },
  },
  {
    no: 2,
    name: "Dinn.dev",
    imageUrl: "/dinn-dev-thumbnail.svg",
    contents: {
      period: { startDate: "2025.01.01", endDate: "2025.01.01" },
      person: "1명(본인)",
      description: "Dinn.dev",
      techStack: [
        ["Next.js", "Typescript"],
        ["Tailwind CSS", "Anime.js", "Tippy.js"],
        ["Vercel"],
      ],
      features: ["dd"],
      optimizations: [
        {
          title: "dd",
          description: "dd",
        },
      ],
      problemSolution: [
        {
          title: "dd",
          description: "hello",
        },
      ],
      newAttempt: [
        {
          title: "dd",
          description: "dd",
        },
        {
          title: "dd",
          description: "dd",
        },
      ],
      link: {
        deploy: ["https://dinn.dev"],
        github: "https://github.com/dinn54/dinn.dev",
      },
    },
  },
];
