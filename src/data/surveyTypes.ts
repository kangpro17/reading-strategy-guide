export interface ReadingExperience {
    step: string; // 읽기 단계 (전/중/후)
    type: string; // 글 종류 (설명/설득/정서/친교)
    structure: string; // 글 구조 (원인-결과 등)
}

export interface SurveyResponse {
    id: string;
    timestamp: string;

    // Q1. 읽은 글 정보
    readingExperience: ReadingExperience;

    // Q2. 사용한 전략 (기존 Strategy ID 배열)
    usedStrategies: string[];

    // Q3. 좋아진 점 (복수 선택)
    benefits: string[];

    // Q4. 하기 쉬웠나요? (1-5)
    ease: number;

    // Q5. 효과는 어느 정도였나요? (1-5)
    effectiveness: number;

    // Q6. 결과물 (복수 선택)
    outcomes: string[];

    // (선택) 한 줄 후기
    feedback: string;
}

export interface MenuVisit {
    menu: 'process' | 'text-type' | 'structure' | 'cognitive' | 'home';
    timestamp: string;
    strategyId: string;
}

// 상수 정의

export const READING_STEPS = ['읽기 전', '읽기 중', '읽기 후'];
export const TEXT_TYPES = ['사실', '주장', '감상', '친교'];
export const TEXT_STRUCTURES = ['원인/결과', '개념/설명', '행동/결과', '문제/해결', '주장/근거', '비교/대조', '분류/구분', '서사'];

export const SURVEY_BENEFITS = [
    '핵심 이해가 잘 됨',
    '요약하기 편함',
    '근거 찾기가 쉬움',
    '집중력이 높아짐',
    '시간이 절약됨',
    '읽는 재미가 있음'
];

export const SURVEY_OUTCOMES = [
    '질문 1개 생성',
    '요약 3문장 작성',
    '근거 표시 2개',
    '정리그림 1개 그리기',
    '없음'
];

export const MENU_LABELS: Record<MenuVisit['menu'], string> = {
    'process': '독서 과정',
    'text-type': '글의 종류',
    'structure': '글의 구조',
    'cognitive': '인지전략',
    'home': '홈 화면'
};
