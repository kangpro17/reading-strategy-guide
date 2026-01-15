import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SurveyResponse, MenuVisit, SURVEY_BENEFITS, SURVEY_OUTCOMES, READING_STEPS, TEXT_TYPES, TEXT_STRUCTURES } from '../data/surveyTypes';
import { strategies } from '../data/strategies';

interface SurveyContextType {
    surveys: SurveyResponse[];
    menuVisits: MenuVisit[];
    addSurvey: (response: SurveyResponse) => void;
    recordMenuVisit: (menu: MenuVisit['menu'], strategyId: string) => void;
    // Helper functions for analysis
    getTopBenefits: () => { name: string; value: number }[];
    getTopOutcomes: () => { name: string; value: number }[];
    getAverageMetrics: () => { ease: number; effectiveness: number };
    getExperienceStats: () => { name: string; value: number }[];
    getTopStrategies: () => { id: string; name: string; count: number }[];
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

// 초기 가상 데이터 (새로운 구조)
const MOCK_SURVEYS: SurveyResponse[] = [
    {
        id: 'mock-1',
        timestamp: new Date(Date.now() - 10000000).toISOString(),
        readingExperience: { step: '읽기 중', type: '사실', structure: '원인/결과' },
        usedStrategies: ['sq3r'],
        benefits: ['핵심 이해가 잘 됨', '집중력이 높아짐'],
        ease: 4,
        effectiveness: 5,
        outcomes: ['요약 3문장 작성'],
        feedback: "SQ3R 덕분에 과학 지문 읽기가 수월해졌어요."
    },
    {
        id: 'mock-2',
        timestamp: new Date(Date.now() - 5000000).toISOString(),
        readingExperience: { step: '읽기 후', type: '주장', structure: '문제/해결' },
        usedStrategies: ['summarizing'],
        benefits: ['요약하기 편함', '시간이 절약됨'],
        ease: 5,
        effectiveness: 4,
        outcomes: ['요약 3문장 작성', '근거 표시 2개'],
        feedback: "요약하기 연습에 딱이네요."
    },
    {
        id: 'mock-3',
        timestamp: new Date(Date.now() - 2000000).toISOString(),
        readingExperience: { step: '읽기 전', type: '감상', structure: '서사' },
        usedStrategies: ['prediction-guide'],
        benefits: ['읽는 재미가 있음'],
        ease: 5,
        effectiveness: 3,
        outcomes: ['질문 1개 생성'],
        feedback: "미리 예측해보니 더 흥미진진했어요."
    },
    ...Array.from({ length: 47 }).map((_, i) => ({
        id: `mock-random-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 100000000).toISOString(),
        readingExperience: {
            step: READING_STEPS[Math.floor(Math.random() * READING_STEPS.length)],
            type: TEXT_TYPES[Math.floor(Math.random() * TEXT_TYPES.length)],
            structure: TEXT_STRUCTURES[Math.floor(Math.random() * TEXT_STRUCTURES.length)]
        },
        usedStrategies: ['sq3r', 'kwl', 'summarizing', 'prediction-guide', 'think-aloud'][Math.floor(Math.random() * 5)]
            ? [['sq3r', 'kwl', 'summarizing', 'prediction-guide', 'think-aloud'][Math.floor(Math.random() * 5)]]
            : ['sq3r'],
        benefits: SURVEY_BENEFITS.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
        ease: 3 + Math.floor(Math.random() * 3), // 3-5
        effectiveness: 3 + Math.floor(Math.random() * 3), // 3-5
        outcomes: SURVEY_OUTCOMES.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1),
        feedback: Math.random() > 0.7 ? "전략이 도움이 되었습니다." : ""
    } as SurveyResponse))
];

const MOCK_MENU_VISITS: MenuVisit[] = [
    { menu: 'process', timestamp: new Date().toISOString(), strategyId: 'sq3r' },
    { menu: 'process', timestamp: new Date().toISOString(), strategyId: 'kwl' },
    // ... basic mocks
    ...Array.from({ length: 30 }).map(() => ({
        menu: ['process', 'text-type', 'structure', 'cognitive', 'home'][Math.floor(Math.random() * 5)] as MenuVisit['menu'],
        timestamp: new Date().toISOString(),
        strategyId: 'sq3r'
    }))
];

export function SurveyProvider({ children }: { children: ReactNode }) {
    const [surveys, setSurveys] = useState<SurveyResponse[]>(() => {
        const saved = localStorage.getItem('surveys');
        return saved ? JSON.parse(saved) : [];
    });

    const [menuVisits, setMenuVisits] = useState<MenuVisit[]>(() => {
        const saved = localStorage.getItem('menuVisits');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('surveys', JSON.stringify(surveys));
    }, [surveys]);

    useEffect(() => {
        localStorage.setItem('menuVisits', JSON.stringify(menuVisits));
    }, [menuVisits]);

    // 초기 데이터 로드 (데모용)
    useEffect(() => {
        if (surveys.length === 0) {
            setSurveys(MOCK_SURVEYS);
        }
        if (menuVisits.length === 0) {
            setMenuVisits(MOCK_MENU_VISITS);
        }
    }, []); // Only run once

    const addSurvey = (response: SurveyResponse) => {
        setSurveys(prev => [response, ...prev]);
    };

    const recordMenuVisit = (menu: MenuVisit['menu'], strategyId: string) => {
        const newVisit: MenuVisit = {
            menu,
            timestamp: new Date().toISOString(),
            strategyId
        };
        setMenuVisits(prev => [...prev, newVisit]);
    };

    // Analytics Helpers
    const getTopBenefits = () => {
        const counts: Record<string, number> = {};
        surveys.forEach(s => {
            s.benefits.forEach(b => {
                counts[b] = (counts[b] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([name, value]) => ({ name, value }))
            .slice(0, 5);
    };

    const getTopOutcomes = () => {
        const counts: Record<string, number> = {};
        surveys.forEach(s => {
            s.outcomes.forEach(o => {
                counts[o] = (counts[o] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([name, value]) => ({ name, value }));
    };

    const getAverageMetrics = () => {
        if (surveys.length === 0) return { ease: 0, effectiveness: 0 };
        const totalEase = surveys.reduce((sum, s) => sum + s.ease, 0);
        const totalEffectiveness = surveys.reduce((sum, s) => sum + s.effectiveness, 0);
        return {
            ease: Number((totalEase / surveys.length).toFixed(1)),
            effectiveness: Number((totalEffectiveness / surveys.length).toFixed(1))
        };
    };

    const getExperienceStats = () => {
        const counts: Record<string, number> = {};
        surveys.forEach(s => {
            const type = s.readingExperience.type || '미지정';
            counts[type] = (counts[type] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }

    const getTopStrategies = () => {
        const counts: Record<string, number> = {};
        surveys.forEach(s => {
            s.usedStrategies.forEach(id => {
                counts[id] = (counts[id] || 0) + 1;
            });
        });

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => {
                const strategy = strategies.find(s => s.id === id);
                return {
                    id,
                    name: strategy ? strategy.name : id,
                    count
                };
            });
    };

    return (
        <SurveyContext.Provider value={{
            surveys,
            menuVisits,
            addSurvey,
            recordMenuVisit,
            getTopBenefits,
            getTopOutcomes,
            getAverageMetrics,
            getExperienceStats,
            getTopStrategies
        }}>
            {children}
        </SurveyContext.Provider>
    );
}

export function useSurvey() {
    const context = useContext(SurveyContext);
    if (context === undefined) {
        throw new Error('useSurvey must be used within a SurveyProvider');
    }
    return context;
}
