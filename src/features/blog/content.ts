export const markdownContent = `
## 소개

현대 웹 애플리케이션을 구축할 때 **텍스트 에디터**의 선택은 매우 중요합니다. 우리는 성능이 뛰어나면서도 확장 가능한 무언가가 필요합니다. [Lexical](https://lexical.dev/)은 풍부한 텍스트 에디터를 구축하기 위한 강력한 도구를 제공하는 React용 텍스트 에디터 프레임워크입니다.

> "Lexical은 뛰어난 안정성, 접근성 및 성능을 제공하는 확장 가능한 텍스트 에디터 프레임워크입니다."

## 주요 기능

이 에디터는 다음과 같은 다양한 기능을 지원합니다:

1.  **마크다운 지원**: 쉽고 빠른 글쓰기
2.  **구문 강조 (Syntax Highlighting)**: 코드 가독성 향상
3.  **다크 모드**: 눈의 피로 감소

### 코드 예시

다음은 React 컴포넌트의 간단한 예시입니다. \`useState\`와 \`useEffect\`를 사용했습니다.

\`\`\`typescript
import React, { useState, useEffect } from 'react';

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
}
\`\`\`

## 디자인 시스템

우리는 미니멀리즘 디자인을 추구합니다. 모든 요소는 **가독성**을 최우선으로 배치되었습니다.

- 본문 크기: **15px** (가독성 최적화)
- 코드 블록: **12px** (정보 밀도 최적화)
- 폰트: **Pretendard**, **JetBrains Mono**

![Modern Office Setup](https://images.unsplash.com/photo-1760278041881-e64e501d009c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwb2ZmaWNlJTIwZGVzayUyMGNvZGluZ3xlbnwxfHx8fDE3NjY5MzQzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)

### 유튜브 통합

외부 미디어도 쉽게 통합할 수 있습니다. 아래는 Lexical 소개 영상입니다.

[youtube](jV8B24rSN5o)

### 외부 리소스

더 많은 정보를 원하시면 공식 문서를 참고하세요.

- [Lexical 문서](https://lexical.dev/docs/intro)
- [React 문서](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 결론

사용자 정의 에디터를 구축하면 쓰기 및 읽기 경험을 완벽하게 제어할 수 있습니다. Lexical과 React를 활용하면 기술 작가의 특정 요구 사항을 충족하는 강력한 도구를 만들 수 있습니다.
`;
