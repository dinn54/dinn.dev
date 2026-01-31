export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  contentJSON?: LexicalNode[];
}

import { markdownContent } from "../content";
import { LexicalNode } from "../components/LexicalRenderer";

export const MOCK_LEXICAL_STATE: LexicalNode[] = [
  {
    type: "heading",
    tag: "h2",
    children: [{ type: "text", text: "소개" }],
  },
  {
    type: "paragraph",
    children: [
      { type: "text", text: "현대 웹 애플리케이션을 구축할 때 " },
      { type: "text", text: "텍스트 에디터", format: 1 }, // Bold
      {
        type: "text",
        text: "의 선택은 매우 중요합니다. 우리는 성능이 뛰어나면서도 확장 가능한 무언가가 필요합니다. ",
      },
      {
        type: "link",
        url: "https://lexical.dev/",
        children: [{ type: "text", text: "Lexical" }],
      },
      {
        type: "text",
        text: "은 풍부한 텍스트 에디터를 구축하기 위한 강력한 도구를 제공하는 React용 텍스트 에디터 프레임워크입니다.",
      },
    ],
  },
  {
    type: "quote",
    children: [
      {
        type: "text",
        text: '"Lexical은 뛰어난 안정성, 접근성 및 성능을 제공하는 확장 가능한 텍스트 에디터 프레임워크입니다."',
      },
    ],
  },
  {
    type: "heading",
    tag: "h2",
    children: [{ type: "text", text: "주요 기능" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "이 에디터는 다음과 같은 다양한 기능을 지원합니다:",
      },
    ],
  },
  {
    type: "list",
    tag: "ol",
    children: [
      {
        type: "listitem",
        children: [
          { type: "text", text: "마크다운 지원", format: 1 },
          { type: "text", text: ": 쉽고 빠른 글쓰기" },
        ],
      },
      {
        type: "listitem",
        children: [
          { type: "text", text: "구문 강조 (Syntax Highlighting)", format: 1 },
          { type: "text", text: ": 코드 가독성 향상" },
        ],
      },
      {
        type: "listitem",
        children: [
          { type: "text", text: "다크 모드", format: 1 },
          { type: "text", text: ": 눈의 피로 감소" },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "위 예제에서는 {`useState`와 `useEffect`를 사용했습니다.} 와 같이 훅을 활용하고 있습니다.",
      },
    ],
  },
  {
    type: "heading",
    tag: "h3",
    children: [{ type: "text", text: "코드 예시" }],
  },
  {
    type: "code",
    language: "typescript",
    children: [
      {
        type: "text",
        text: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
      <p className="text-[15px] mb-2">현재 카운트: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        증가
      </button>
    </div>
  );
}`,
      },
    ],
  },
  {
    type: "heading",
    tag: "h2",
    children: [{ type: "text", text: "디자인 시스템" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "우리는 미니멀리즘 디자인을 추구합니다. 모든 요소는 ",
      },
      { type: "text", text: "가독성", format: 1 },
      { type: "text", text: "을 최우선으로 배치되었습니다." },
    ],
  },
  {
    type: "list",
    tag: "ul",
    children: [
      {
        type: "listitem",
        children: [
          { type: "text", text: "본문 크기: " },
          { type: "text", text: "15px", format: 1 },
          { type: "text", text: " (가독성 최적화)" },
        ],
      },
      {
        type: "listitem",
        children: [
          { type: "text", text: "코드 블록: " },
          { type: "text", text: "12px", format: 1 },
          { type: "text", text: " (정보 밀도 최적화)" },
        ],
      },
      {
        type: "listitem",
        children: [
          { type: "text", text: "폰트: " },
          { type: "text", text: "Pretendard", format: 1 },
          { type: "text", text: ", " },
          { type: "text", text: "JetBrains Mono", format: 1 },
        ],
      },
    ],
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1760278041881-e64e501d009c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwb2ZmaWNlJTIwZGVzayUyMGNvZGluZ3xlbnwxfHx8fDE3NjY5MzQzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    altText: "Modern Office Setup",
    width: 1080,
    height: 600,
  },
  {
    type: "heading",
    tag: "h3",
    children: [{ type: "text", text: "유튜브 통합" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "외부 미디어도 쉽게 통합할 수 있습니다. 아래는 Lexical 소개 영상입니다.",
      },
    ],
  },
  {
    type: "youtube",
    videoID: "jV8B24rSN5o",
  },
  {
    type: "horizontalrule",
  },
  {
    type: "heading",
    tag: "h2",
    children: [{ type: "text", text: "결론" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "사용자 정의 에디터를 구축하면 쓰기 및 읽기 경험을 완벽하게 제어할 수 있습니다. Lexical과 React를 활용하면 기술 작가의 특정 요구 사항을 충족하는 강력한 도구를 만들 수 있습니다.",
      },
    ],
  },
];

const generateMockPosts = (count: number): Post[] => {
  const basePosts: Post[] = [
    {
      id: "1",
      title: "확장 가능한 웹 에디터 구축하기",
      description:
        "React와 Lexical을 활용하여 성능과 확장성을 모두 잡은 텍스트 에디터를 만드는 과정에 대한 심도 있는 고찰.",
      date: "2023-12-28",
      updatedDate: "2024-01-10",
      tags: ["프론트엔드", "Lexical"],
      imageUrl: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a",
      author: {
        name: "주정혁",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4", // Example placeholder
        role: "Frontend Engineer",
      },
      content: markdownContent,
      contentJSON: MOCK_LEXICAL_STATE,
    },
    {
      id: "2",
      title: "모던 리액트 렌더링 패턴 분석",
      description:
        "서버 컴포넌트부터 스트리밍까지, 최신 리액트가 데이터를 처리하고 화면을 그리는 방식의 진화.",
      date: "2023-11-15",
      tags: ["React", "Performance"],
      imageUrl: "https://images.unsplash.com/photo-1661098938131-b9c91a938632",
      author: {
        name: "주정혁",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Frontend Engineer",
      },
      content: markdownContent,
      contentJSON: MOCK_LEXICAL_STATE,
    },
    {
      id: "3",
      title: "Tailwind CSS v4 마이그레이션 가이드",
      description:
        "Rust 기반의 엔진으로 더욱 빨라진 Tailwind CSS v4의 주요 변경사항과 안전한 마이그레이션 전략.",
      date: "2023-10-02",
      tags: ["CSS", "Tailwind"],
      imageUrl: "https://images.unsplash.com/photo-1689005047173-b43ff68072ed",
      author: {
        name: "주정혁",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Frontend Engineer",
      },
      content: markdownContent,
      contentJSON: MOCK_LEXICAL_STATE,
    },
    {
      id: "4",
      title: "타입스크립트 고급 패턴: 유틸리티 타입",
      description:
        "실무에서 자주 사용되는 복잡한 유틸리티 타입들을 직접 구현해보며 타입 시스템의 깊이를 이해하기.",
      date: "2023-09-14",
      tags: ["TypeScript"],
      imageUrl: "https://images.unsplash.com/photo-1568716353609-12ddc5c67f04",
      author: {
        name: "주정혁",
        avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
        role: "Frontend Engineer",
      },
      content: markdownContent,
      contentJSON: MOCK_LEXICAL_STATE,
    },
  ];

  const generated: Post[] = [];
  for (let i = 0; i < count; i++) {
    const base = basePosts[i % basePosts.length];
    generated.push({
      ...base,
      id: `${base.id}-${i}`,
      title: `${base.title} ${Math.floor(i / 4) + 1}`,
      date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
      updatedDate:
        i % 3 === 0 ? new Date().toISOString().split("T")[0] : undefined, // Simulate some updates
    });
  }
  return generated;
};

export const TOTAL_POSTS = generateMockPosts(40);

export const getAllTags = () => {
  const tags = new Set<string>();
  TOTAL_POSTS.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
};

export const getPosts = ({
  limit = 8,
  tags = [],
}: {
  limit?: number;
  tags?: string[];
} = {}) => {
  let filtered = TOTAL_POSTS;
  if (tags.length > 0) {
    filtered = filtered.filter((post) =>
      post.tags.some((tag) => tags.includes(tag)),
    );
  }
  return filtered.slice(0, limit);
};

export const getPostById = (id: string) => {
  return TOTAL_POSTS.find((post) => post.id === id);
};

export const getAdjacentPosts = (id: string) => {
  const index = TOTAL_POSTS.findIndex((post) => post.id === id);
  if (index === -1) return { prev: undefined, next: undefined };

  const prev = index > 0 ? TOTAL_POSTS[index - 1] : undefined;
  const next =
    index < TOTAL_POSTS.length - 1 ? TOTAL_POSTS[index + 1] : undefined;
  return { prev, next };
};
