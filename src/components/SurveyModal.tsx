import { useState, useEffect } from 'react';
import { useSurvey } from '../context/SurveyContext';
import { useMyStrategy } from '../context/MyStrategyContext';
import { READING_STEPS, TEXT_TYPES, TEXT_STRUCTURES, SURVEY_BENEFITS, SURVEY_OUTCOMES } from '../data/surveyTypes';

interface SurveyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
    const { addSurvey } = useSurvey();
    const { todayTasks } = useMyStrategy(); // 오늘 실행 리스트에 있는 전략들

    // Form State
    const [readingExperience, setReadingExperience] = useState({
        step: '',
        type: '',
        structure: ''
    });
    const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
    const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
    const [ease, setEase] = useState(0);
    const [effectiveness, setEffectiveness] = useState(0);
    const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset form
            setReadingExperience({ step: '', type: '', structure: '' });
            setSelectedStrategies([]);
            setSelectedBenefits([]);
            setEase(0);
            setEffectiveness(0);
            setSelectedOutcomes([]);
            setFeedback('');
        }
    }, [isOpen]);

    const handleToggleStrategy = (id: string) => {
        setSelectedStrategies(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleToggleBenefit = (benefit: string) => {
        setSelectedBenefits(prev =>
            prev.includes(benefit) ? prev.filter(b => b !== benefit) : [...prev, benefit]
        );
    };

    const handleToggleOutcome = (outcome: string) => {
        setSelectedOutcomes(prev =>
            prev.includes(outcome) ? prev.filter(o => o !== outcome) : [...prev, outcome]
        );
    };

    const handleSubmit = () => {
        if (selectedStrategies.length === 0) {
            alert('사용한 전략을 하나 이상 선택해주세요!');
            return;
        }

        const response = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            readingExperience,
            usedStrategies: selectedStrategies,
            benefits: selectedBenefits,
            ease,
            effectiveness,
            outcomes: selectedOutcomes,
            feedback
        };

        addSurvey(response);
        onClose();
        alert('소중한 기록이 저장되었습니다! 📝');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-[var(--color-primary)]">전략 1분 사용기 ⏳</h2>
                        <p className="text-sm text-[var(--color-text-muted)]">오늘의 독서를 기록해 보세요</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-8">

                    {/* Q1. 읽은 글은 무엇이었나요? */}
                    <section>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">1. 오늘 읽은 글은 무엇이었나요?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 읽기 단계 */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">읽기 단계</label>
                                <select
                                    className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    value={readingExperience.step}
                                    onChange={(e) => setReadingExperience({ ...readingExperience, step: e.target.value })}
                                >
                                    <option value="">선택</option>
                                    {READING_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            {/* 글 종류 */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">글 종류</label>
                                <select
                                    className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    value={readingExperience.type}
                                    onChange={(e) => setReadingExperience({ ...readingExperience, type: e.target.value })}
                                >
                                    <option value="">선택</option>
                                    {TEXT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            {/* 글 구조 */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">글 구조</label>
                                <select
                                    className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    value={readingExperience.structure}
                                    onChange={(e) => setReadingExperience({ ...readingExperience, structure: e.target.value })}
                                >
                                    <option value="">선택</option>
                                    {TEXT_STRUCTURES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </section>

                    <div className="h-px bg-gray-100" />

                    {/* Q2. 오늘 사용한 전략 */}
                    <section>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">2. 오늘 사용한 전략은? <span className="text-sm font-normal text-gray-500">(복수 선택)</span></h3>
                        {todayTasks.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {todayTasks.map(task => (
                                    <button
                                        key={task.strategy.id}
                                        onClick={() => handleToggleStrategy(task.strategy.id)}
                                        className={`px-4 py-2 rounded-full border transition-all ${selectedStrategies.includes(task.strategy.id)
                                            ? 'bg-[var(--color-primary)] text-white border-transparent'
                                            : 'bg-white text-[var(--color-text)] border-gray-200 hover:border-[var(--color-primary)]'
                                            }`}
                                    >
                                        {task.strategy.name}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-red-400">먼저 '내 전략' 메뉴에서 오늘 실행할 전략을 담아주세요!</p>
                        )}
                    </section>

                    <div className="h-px bg-gray-100" />

                    {/* Q3. 이 전략으로 무엇이 좋아졌나요? */}
                    <section>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">3. 무엇이 좋아졌나요? <span className="text-sm font-normal text-gray-500">(복수 선택)</span></h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {SURVEY_BENEFITS.map(benefit => (
                                <button
                                    key={benefit}
                                    onClick={() => handleToggleBenefit(benefit)}
                                    className={`p-3 rounded-lg text-sm font-medium transition-all text-left ${selectedBenefits.includes(benefit)
                                        ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {benefit}
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="h-px bg-gray-100" />

                    {/* Q4 & Q5. 점수 평가 */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section>
                            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">4. 하기 쉬웠나요?</h3>
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                {[1, 2, 3, 4, 5].map(score => (
                                    <button
                                        key={score}
                                        onClick={() => setEase(score)}
                                        className={`w-10 h-10 rounded-full font-bold transition-all ${ease === score
                                            ? 'bg-green-500 text-white scale-110 shadow-lg'
                                            : 'bg-white text-gray-400 hover:bg-green-100'
                                            }`}
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                                <span>어려움</span>
                                <span>쉬움</span>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">5. 효과가 있었나요?</h3>
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                {[1, 2, 3, 4, 5].map(score => (
                                    <button
                                        key={score}
                                        onClick={() => setEffectiveness(score)}
                                        className={`w-10 h-10 rounded-full font-bold transition-all ${effectiveness === score
                                            ? 'bg-blue-500 text-white scale-110 shadow-lg'
                                            : 'bg-white text-gray-400 hover:bg-blue-100'
                                            }`}
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                                <span>미미함</span>
                                <span>확실함</span>
                            </div>
                        </section>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Q6. 결과물 */}
                    <section>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">6. 남긴 결과물 <span className="text-sm font-normal text-gray-500">(복수 선택)</span></h3>
                        <div className="flex flex-wrap gap-3">
                            {SURVEY_OUTCOMES.map(outcome => (
                                <button
                                    key={outcome}
                                    onClick={() => handleToggleOutcome(outcome)}
                                    className={`px-4 py-2 rounded-full border text-sm transition-all ${selectedOutcomes.includes(outcome)
                                        ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {outcome}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 한 줄 후기 */}
                    <section>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">한 줄 후기 <span className="text-sm font-normal text-gray-400">(선택)</span></h3>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="전략 사용 경험을 짧게 남겨주세요..."
                            className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--color-primary)] h-24 resize-none placeholder-gray-400"
                        />
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 sticky bottom-0 bg-white z-10 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-colors">
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="btn-primary px-8 py-3 rounded-xl shadow-lg hover:shadow-xl"
                    >
                        기록 저장하기
                    </button>
                </div>
            </div>
        </div>
    );
}
