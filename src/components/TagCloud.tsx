import { useState, useMemo } from 'react';
import { useSurvey } from '../context/SurveyContext';
import { extractKeywords } from '../utils/keywordAnalysis';

export default function TagCloud() {
    const { surveys } = useSurvey();
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

    const feedbacks = useMemo(() =>
        surveys
            .filter(s => s.feedback && s.feedback.trim().length > 0)
            .map(s => s.feedback as string),
        [surveys]
    );

    const keywords = useMemo(() => {
        if (feedbacks.length === 0) return [];
        return extractKeywords(feedbacks).slice(0, 20);
    }, [feedbacks]);

    const relatedFeedbacks = useMemo(() => {
        if (!selectedKeyword) return [];
        return surveys
            .filter(s => s.feedback && s.feedback.includes(selectedKeyword))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 3);
    }, [selectedKeyword, surveys]);

    if (keywords.length === 0) return null;

    const getSizeClass = (count: number, max: number) => {
        const ratio = count / max;
        if (ratio > 0.7) return 'text-lg font-bold px-4 py-2';
        if (ratio > 0.4) return 'text-base font-semibold px-3 py-1.5';
        return 'text-sm font-medium px-2 py-1';
    };

    const maxCount = keywords.length > 0 ? keywords[0].count : 0;

    return (
        <>
            <div className="bg-[var(--color-surface-light)] rounded-xl p-6 mt-6">
                <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">
                    💬 자유 의견 키워드 TOP 20
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {keywords.map((keyword) => (
                        <button
                            key={keyword.text}
                            onClick={() => setSelectedKeyword(keyword.text)}
                            className={`rounded-full transition-all hover:scale-110 hover:shadow-md ${getSizeClass(keyword.count, maxCount)
                                } ${selectedKeyword === keyword.text
                                    ? 'bg-[var(--color-accent)] text-white shadow-lg scale-105'
                                    : 'bg-white text-[var(--color-primary)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/10'
                                }`}
                        >
                            #{keyword.text} <span className="text-[0.8em] opacity-70">({keyword.count})</span>
                        </button>
                    ))}
                </div>
            </div>

            {selectedKeyword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedKeyword(null)}
                    />
                    <div className="relative glass rounded-2xl p-6 max-w-md w-full animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[var(--color-text)]">
                                #{selectedKeyword} 관련 의견
                            </h3>
                            <button
                                onClick={() => setSelectedKeyword(null)}
                                className="w-8 h-8 rounded-full bg-[var(--color-surface-light)] flex items-center justify-center hover:bg-[var(--color-surface-light)]/80"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-3">
                            {relatedFeedbacks.map((survey) => (
                                <div key={survey.id} className="bg-[var(--color-surface-light)] p-3 rounded-lg text-sm text-[var(--color-text)]">
                                    "{survey.feedback}"
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
