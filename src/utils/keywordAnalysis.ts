import { STOPWORDS } from '../data/stopwords';

export interface KeywordData {
    text: string;
    count: number;
}

export function extractKeywords(feedbacks: string[]): KeywordData[] {
    const wordCounts = new Map<string, number>();

    feedbacks.forEach((text) => {
        // 1. 기본 정제: 특수문자 제거 및 공백 기준 분리
        const words = text
            .replace(/[.,?!~"'\(\)\[\]]/g, '')
            .split(/\s+/);

        words.forEach((word) => {
            if (!word) return;

            // 2. 어미/조사 단순 제거 (Heuristic)
            // 가장 긴 매칭부터 제거하기 위해 길이순 정렬 후 처리 같은 복잡한 로직보다는
            // 끝 글자 기준으로 흔한 조사/어미를 잘라내는 방식 사용
            let cleanWord = word;

            // 2글자 이상인 경우에만 처리 (1글자는 의미 파악 어려움 or 불용어일 확률 높음)
            if (cleanWord.length > 1) {
                // 대표적인 조사들 제거 (끝에서부터)
                if (cleanWord.endsWith('는') || cleanWord.endsWith('가') || cleanWord.endsWith('을') || cleanWord.endsWith('를') || cleanWord.endsWith('도') || cleanWord.endsWith('에')) {
                    cleanWord = cleanWord.slice(0, -1);
                } else if (cleanWord.endsWith('으로') || cleanWord.endsWith('에서')) {
                    cleanWord = cleanWord.slice(0, -2);
                } else if (cleanWord.endsWith('네요') || cleanWord.endsWith('해요') || cleanWord.endsWith('세요')) {
                    cleanWord = cleanWord.slice(0, -2);
                }
            }

            // 3. 불용어 필터링 및 길이 제한
            if (cleanWord.length >= 2 && !STOPWORDS.has(cleanWord)) {
                wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
            }
        });
    });

    // 4. 배열 변환 및 정렬 (빈도 내림차순)
    return Array.from(wordCounts.entries())
        .map(([text, count]) => ({ text, count }))
        .sort((a, b) => b.count - a.count);
}
