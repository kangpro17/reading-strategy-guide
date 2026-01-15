// 전략 데이터 타입 정의
export interface Strategy {
    id: string;
    name: string;
    description: string;
    whenToUse: string;
    howTo: [string, string, string];
    example: string;
    tags: string[];
    structures: number[];      // 글의 구조: 1~8
    cognitiveStrategies: number[]; // 인지전략: 1~7
    readingProcesses: number[];    // 독서과정: 1~3
    textTypes: number[];           // 글의 종류: 1~4
}

// 범주 정의
export const STRUCTURE_LABELS: Record<number, string> = {
    1: '원인/결과',
    2: '개념/설명',
    3: '행동/결과',
    4: '문제/해결',
    5: '주장/근거',
    6: '비교/대조',
    7: '분류/구분',
    8: '서사',
};

export const COGNITIVE_LABELS: Record<number, string> = {
    1: '독서목적 명료화',
    2: '특정정보 확인',
    3: '모니터링',
    4: '질문형성',
    5: '사전지식활성화',
    6: '추론/예측',
    7: '요약/종합',
};

export const PROCESS_LABELS: Record<number, string> = {
    1: '독서 전',
    2: '독서 중',
    3: '독서 후',
};

export const TEXT_TYPE_LABELS: Record<number, string> = {
    1: '사실',
    2: '주장',
    3: '감상',
    4: '친교',
};

// 14개 전략 데이터
export const strategies: Strategy[] = [
    {
        id: 'prediction-guide',
        name: '예측안내하기',
        description: '글을 읽기 전에 제목, 그림, 소제목 등을 보고 내용을 미리 예측하며 읽는 전략',
        whenToUse: '새로운 글을 읽기 시작할 때, 무슨 내용일지 궁금할 때',
        howTo: [
            '제목과 그림을 보고 "이 글은 ~에 대한 내용일 것 같아"라고 예측해 본다',
            '글을 읽으면서 내 예측이 맞는지 확인한다',
            '예측이 틀렸다면 왜 틀렸는지, 새로 알게 된 것은 무엇인지 정리한다',
        ],
        example: '과학책의 "화산은 왜 폭발할까?" 제목을 보고 마그마와 압력에 대한 내용일 거라고 예측한 뒤, 읽으면서 확인해요.',
        tags: ['예측', '읽기 전', '궁금증'],
        structures: [1, 2, 3, 4, 5, 6, 7, 8],
        cognitiveStrategies: [1, 5],
        readingProcesses: [1],
        textTypes: [1, 2, 3, 4],
    },
    {
        id: 'brainstorming',
        name: '브레인스토밍',
        description: '글의 주제와 관련해 떠오르는 생각을 자유롭게 펼치는 전략',
        whenToUse: '글의 주제가 명확할 때, 배경지식을 활성화하고 싶을 때',
        howTo: [
            '글의 주제를 확인하고 관련해서 아는 것을 모두 적는다',
            '떠오르는 단어, 경험, 느낌을 자유롭게 나열한다',
            '글을 읽은 후 내가 알던 것과 새로 배운 것을 비교한다',
        ],
        example: '"환경오염" 주제라면 플라스틱, 쓰레기, 바다거북, 분리수거 등 떠오르는 것을 모두 적어봐요.',
        tags: ['배경지식', '읽기 전', '자유연상'],
        structures: [1, 2, 3, 4, 5, 6, 7],
        cognitiveStrategies: [5],
        readingProcesses: [1],
        textTypes: [1, 2],
    },
    {
        id: 'sq3r',
        name: 'SQ3R',
        description: '훑어보기(Survey), 질문하기(Question), 읽기(Read), 요약하기(Recite), 복습하기(Review)의 5단계 전략',
        whenToUse: '교과서나 정보가 많은 글을 체계적으로 공부할 때',
        howTo: [
            '먼저 제목, 소제목, 굵은 글씨를 훑어보고 질문을 만든다',
            '질문의 답을 찾으며 글을 읽고, 읽은 내용을 내 말로 요약한다',
            '전체 내용을 복습하며 중요한 점을 다시 확인한다',
        ],
        example: '역사 교과서를 읽을 때: 먼저 단원 제목을 보고 "임진왜란은 왜 일어났을까?" 질문을 만든 뒤 답을 찾아요.',
        tags: ['체계적', '학습', '복습'],
        structures: [1, 2, 3, 4, 5, 6, 7],
        cognitiveStrategies: [2, 3, 4, 5, 6, 7],
        readingProcesses: [1, 2, 3],
        textTypes: [1, 2],
    },
    {
        id: 'mind-map',
        name: '마인드맵',
        description: '중심 주제에서 가지를 뻗어가며 관련 내용을 시각적으로 정리하는 전략',
        whenToUse: '글의 내용을 한눈에 정리하고 싶을 때, 개념 간 관계를 파악할 때',
        howTo: [
            '종이 가운데에 중심 주제를 쓰고 동그라미를 친다',
            '핵심 내용을 가지로 뻗어 연결하고, 세부 내용은 작은 가지로 추가한다',
            '색깔과 그림을 활용해 더 기억하기 쉽게 꾸민다',
        ],
        example: '"삼국시대" 마인드맵: 가운데 삼국시대를 쓰고, 고구려/백제/신라 가지를 뻗어 각 나라의 특징을 정리해요.',
        tags: ['시각화', '정리', '읽기 후'],
        structures: [1, 2, 3, 4, 5, 6, 7],
        cognitiveStrategies: [2, 7],
        readingProcesses: [3],
        textTypes: [3, 4],
    },
    {
        id: 'character-chart',
        name: '캐릭터 차트',
        description: '이야기 속 인물의 특성, 행동, 변화를 표로 정리하는 전략',
        whenToUse: '소설이나 이야기에서 인물을 깊이 이해하고 싶을 때',
        howTo: [
            '등장인물 이름, 외모, 성격, 말버릇 등을 표로 만든다',
            '인물이 한 행동과 그 이유를 정리한다',
            '이야기가 진행되면서 인물이 어떻게 변했는지 기록한다',
        ],
        example: '"홍길동전" 읽을 때: 홍길동의 성격(정의로움), 목표(차별 없는 세상), 변화(가출→의적왕)를 정리해요.',
        tags: ['인물분석', '이야기', '표 정리'],
        structures: [8],
        cognitiveStrategies: [6],
        readingProcesses: [1, 3],
        textTypes: [3, 4],
    },
    {
        id: 'questionnaire',
        name: '앙케이트/질문표',
        description: '글을 읽기 전, 중, 후에 스스로 질문을 만들고 답하는 전략',
        whenToUse: '적극적으로 글에 참여하고 싶을 때, 이해도를 점검할 때',
        howTo: [
            '읽기 전: "이 글에서 무엇을 알 수 있을까?" 질문을 만든다',
            '읽는 중: "왜 이렇게 되었을까?", "다음엔 무슨 일이?" 질문한다',
            '읽은 후: "핵심 내용은?", "내 생각은?" 스스로 답해본다',
        ],
        example: '뉴스 기사를 읽을 때: "왜 이 사건이 일어났지?", "앞으로 어떻게 될까?" 질문하며 읽어요.',
        tags: ['질문', '능동적 읽기', '점검'],
        structures: [8],
        cognitiveStrategies: [4, 5],
        readingProcesses: [1, 2, 3],
        textTypes: [1, 2],
    },
    {
        id: 'kwl',
        name: 'KWL',
        description: 'K(아는 것)-W(알고 싶은 것)-L(배운 것)을 정리하는 3단계 전략',
        whenToUse: '새로운 주제를 배울 때, 학습 전후를 비교하고 싶을 때',
        howTo: [
            'K: 이 주제에 대해 이미 알고 있는 것을 적는다',
            'W: 더 알고 싶은 것, 궁금한 점을 질문으로 적는다',
            'L: 글을 읽은 후 새롭게 배운 것을 정리한다',
        ],
        example: '"지구온난화" 읽기: K-온실가스가 원인, W-해결방법은?, L-탄소중립과 신재생에너지 방법을 배움.',
        tags: ['배경지식', '질문', '정리'],
        structures: [3],
        cognitiveStrategies: [4, 5, 7],
        readingProcesses: [1, 2, 3],
        textTypes: [1],
    },
    {
        id: 'summarizing',
        name: '요약기법',
        description: '글의 핵심 내용만 추려서 짧게 정리하는 전략',
        whenToUse: '긴 글을 효율적으로 정리하고 싶을 때, 핵심을 파악할 때',
        howTo: [
            '각 문단의 중심문장(핵심 내용)을 찾아 밑줄을 긋는다',
            '중심문장들을 연결해 전체 글의 줄거리를 만든다',
            '불필요한 예시나 반복은 빼고 핵심만 내 말로 다시 쓴다',
        ],
        example: '설명문 3문단: ①한글의 창제 배경, ②한글의 과학성, ③한글의 우수성 → "한글은 백성을 위해 과학적으로 만든 우수한 문자다"',
        tags: ['핵심', '축약', '정리'],
        structures: [1, 2, 3, 4, 5, 6, 7],
        cognitiveStrategies: [2, 7],
        readingProcesses: [3],
        textTypes: [1, 2],
    },
    {
        id: 'graphic-organizer',
        name: '그래픽조직자',
        description: '벤다이어그램, 순서도, 원인-결과 도표 등으로 내용을 시각화하는 전략',
        whenToUse: '복잡한 정보를 정리할 때, 개념 관계를 명확히 할 때',
        howTo: [
            '글의 구조(비교, 순서, 원인-결과 등)를 파악한다',
            '구조에 맞는 그래픽 도구(벤다이어그램, 순서도 등)를 선택한다',
            '핵심 내용을 도표에 채워 넣고 관계를 확인한다',
        ],
        example: '민주주의와 독재의 비교 글: 벤다이어그램으로 공통점(정부형태)과 차이점(권력 구조)을 정리해요.',
        tags: ['시각화', '도표', '비교'],
        structures: [1, 2, 3, 4, 5, 6, 7, 8],
        cognitiveStrategies: [1, 2, 3, 4, 5, 6, 7],
        readingProcesses: [1, 2, 3],
        textTypes: [2, 3, 4],
    },
    {
        id: 'qar',
        name: 'QAR',
        description: '질문-답 관계(Question-Answer Relationship)를 파악하는 전략',
        whenToUse: '글에서 정보를 찾거나 추론해야 할 때, 시험 문제 유형을 파악할 때',
        howTo: [
            '질문이 "글에 답이 있는 것"인지 "내 생각이 필요한 것"인지 구분한다',
            '글에 답이 있으면 해당 부분을 찾고, 추론이 필요하면 근거를 모은다',
            '답을 작성한 후 질문 유형에 맞게 답했는지 확인한다',
        ],
        example: '"주인공은 누구인가?"=글에서 찾기, "왜 그런 행동을 했을까?"=추론하기, "너라면 어떻게 할까?"=내 생각',
        tags: ['질문유형', '답찾기', '추론'],
        structures: [1, 3],
        cognitiveStrategies: [2, 4, 7],
        readingProcesses: [2, 3],
        textTypes: [4],
    },
    {
        id: 'story-map',
        name: '이야기지도',
        description: '이야기의 배경, 인물, 사건, 결말을 구조화하여 정리하는 전략',
        whenToUse: '소설, 동화, 영화 등 이야기 구조를 분석할 때',
        howTo: [
            '배경(시간, 장소), 주요 인물, 인물의 목표를 정리한다',
            '문제/갈등 상황과 해결 과정을 순서대로 정리한다',
            '결말과 이야기의 교훈이나 메시지를 적는다',
        ],
        example: '"흥부전": 배경-조선시대, 인물-흥부/놀부, 갈등-가난, 해결-제비의 보은, 교훈-착하게 살자',
        tags: ['이야기', '구조', '인물'],
        structures: [8],
        cognitiveStrategies: [3, 7],
        readingProcesses: [1, 2, 3],
        textTypes: [3, 4],
    },
    {
        id: 'think-aloud',
        name: '생각말하기',
        description: '글을 읽으면서 머릿속 생각을 소리 내어 말하는 전략',
        whenToUse: '어려운 글을 이해하면서 읽을 때, 독해 과정을 점검할 때',
        howTo: [
            '글을 읽으면서 "아, 이건 ~를 말하는 거구나" 하고 생각을 말한다',
            '이해가 안 되면 "여기서 헷갈리네, 다시 읽어봐야겠다" 말한다',
            '예측이나 연결("이건 전에 배운 ~랑 비슷하네")도 소리 내어 말한다',
        ],
        example: '수학 문장제: "일단 구하려는 게 뭐지? 전체 사과 개수네. 조건이 뭐가 있지? 3상자에 각 12개..."',
        tags: ['모니터링', '메타인지', '어려운 글'],
        structures: [1, 2, 3, 4, 5, 6, 7, 8],
        cognitiveStrategies: [3],
        readingProcesses: [2, 3],
        textTypes: [4],
    },
    {
        id: 'skimming',
        name: '건너뛰며 읽기',
        description: '중요하지 않은 부분은 빠르게 넘기고 핵심만 골라 읽는 전략',
        whenToUse: '시간이 부족할 때, 필요한 정보만 빨리 찾을 때',
        howTo: [
            '제목, 소제목, 첫 문장, 마지막 문장을 중심으로 읽는다',
            '굵은 글씨, 숫자, 고유명사 등 눈에 띄는 정보를 체크한다',
            '필요한 정보가 있는 부분만 자세히 읽고 나머지는 넘긴다',
        ],
        example: '백과사전에서 "한글 창제 연도" 찾기: 연도가 나올 것 같은 부분만 골라서 빠르게 스캔해요.',
        tags: ['속독', '정보탐색', '효율'],
        structures: [1, 2, 3, 4, 5, 6, 7],
        cognitiveStrategies: [2],
        readingProcesses: [1, 2],
        textTypes: [2, 4],
    },
    {
        id: 'scanning',
        name: '훑어 읽기',
        description: '글 전체를 빠르게 훑어보며 대략적인 내용과 구조를 파악하는 전략',
        whenToUse: '글을 본격적으로 읽기 전에 미리보기 할 때',
        howTo: [
            '글의 처음부터 끝까지 빠르게 눈으로 훑는다',
            '제목, 소제목, 문단 첫 문장으로 전체 흐름을 파악한다',
            '그림, 표, 그래프 등 시각 자료도 확인한다',
        ],
        example: '새 교과서 단원: 먼저 페이지를 쭉 넘기며 어떤 내용이 나오는지, 사진은 뭐가 있는지 훑어봐요.',
        tags: ['미리보기', '전체파악', '준비'],
        structures: [1, 2, 3, 4, 5, 6, 7],
        cognitiveStrategies: [2],
        readingProcesses: [1, 2],
        textTypes: [2, 4],
    },
];

// 필터링 유틸리티
export function filterStrategies(
    structureFilter?: number[],
    cognitiveFilter?: number[],
    processFilter?: number[],
    textTypeFilter?: number[],
    searchQuery?: string
): Strategy[] {
    return strategies.filter((strategy) => {
        // 구조 필터
        if (structureFilter && structureFilter.length > 0) {
            if (!structureFilter.some((s) => strategy.structures.includes(s))) {
                return false;
            }
        }
        // 인지전략 필터
        if (cognitiveFilter && cognitiveFilter.length > 0) {
            if (!cognitiveFilter.some((c) => strategy.cognitiveStrategies.includes(c))) {
                return false;
            }
        }
        // 과정 필터
        if (processFilter && processFilter.length > 0) {
            if (!processFilter.some((p) => strategy.readingProcesses.includes(p))) {
                return false;
            }
        }
        // 글 종류 필터
        if (textTypeFilter && textTypeFilter.length > 0) {
            if (!textTypeFilter.some((t) => strategy.textTypes.includes(t))) {
                return false;
            }
        }
        // 검색어 필터
        if (searchQuery && searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            return (
                strategy.name.toLowerCase().includes(query) ||
                strategy.description.toLowerCase().includes(query) ||
                strategy.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }
        return true;
    });
}
