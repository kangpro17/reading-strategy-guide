import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyStrategy } from '../context/MyStrategyContext';
import SurveyModal from '../components/SurveyModal';

export default function MyStrategyPage() {
    const { savedStrategies, removeStrategy, toggleComplete, toggleTodayTask, todayTasks } = useMyStrategy();
    const [isSurveyOpen, setIsSurveyOpen] = useState(false);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold gradient-text mb-2">💾 내 전략</h1>
                    <p className="text-[var(--color-text-muted)]">
                        담아둔 전략을 관리하고 오늘 실천할 전략을 선택하세요!
                    </p>
                </div>

                {/* 오늘 실행 리스트 */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-[var(--color-accent)] mb-4">
                        ⚡ 오늘 실행 리스트 ({todayTasks.length}/3)
                    </h2>

                    {todayTasks.length > 0 ? (
                        <div className="space-y-3">
                            {todayTasks.map((saved) => (
                                <div
                                    key={saved.strategy.id}
                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${saved.isCompleted
                                        ? 'bg-green-500/20 border border-green-500/40'
                                        : 'bg-[var(--color-surface-light)]'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleComplete(saved.strategy.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${saved.isCompleted
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-[var(--color-text-muted)] hover:border-green-500'
                                            }`}
                                    >
                                        {saved.isCompleted && '✓'}
                                    </button>
                                    <div className="flex-1">
                                        <span
                                            className={`font-semibold ${saved.isCompleted ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'
                                                }`}
                                        >
                                            {saved.strategy.name}
                                        </span>
                                        <p className="text-xs text-[var(--color-text-muted)]">{saved.strategy.description}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleTodayTask(saved.strategy.id)}
                                        className="text-sm text-red-400 hover:text-red-300"
                                    >
                                        제거
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[var(--color-text-muted)] text-center py-4">
                            아래에서 오늘 실천할 전략을 선택하세요! (최대 3개)
                        </p>
                    )}
                </div>

                {/* 설문 버튼 (오늘 실행 리스트가 있을 때만 노출) */}
                {todayTasks.length > 0 && (
                    <div className="flex justify-center mb-8 animate-fadeIn">
                        <button
                            onClick={() => setIsSurveyOpen(true)}
                            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <path d="M9 14l2 2 4-4" />
                            </svg>
                            <span>전략 1분 사용기</span>
                        </button>
                    </div>
                )}

                {/* 담은 전략 목록 */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                        📚 담은 전략 ({savedStrategies.length}개)
                    </h2>

                    {savedStrategies.length > 0 ? (
                        <div className="space-y-4">
                            {savedStrategies.map((saved) => (
                                <div
                                    key={saved.strategy.id}
                                    className="glass rounded-xl p-4"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-[var(--color-text)]">{saved.strategy.name}</h3>
                                            <p className="text-sm text-[var(--color-text-muted)]">{saved.strategy.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleTodayTask(saved.strategy.id)}
                                                disabled={!saved.isTodayTask && todayTasks.length >= 3}
                                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${saved.isTodayTask
                                                    ? 'bg-[var(--color-accent)] text-white'
                                                    : todayTasks.length >= 3
                                                        ? 'bg-[var(--color-surface-light)] text-[var(--color-text-muted)] cursor-not-allowed'
                                                        : 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/30'
                                                    }`}
                                            >
                                                {saved.isTodayTask ? '오늘 실행 중' : '오늘 실행'}
                                            </button>
                                            <button
                                                onClick={() => removeStrategy(saved.strategy.id)}
                                                className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>

                                    {/* 태그 */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {saved.strategy.tags.map((tag) => (
                                            <span key={tag} className="tag px-2 py-0.5 rounded-full text-xs text-[var(--color-primary)]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[var(--color-text-muted)] mb-4">
                                아직 담은 전략이 없어요! 전략을 둘러보고 마음에 드는 것을 담아보세요.
                            </p>
                            <Link
                                to="/"
                                className="btn-primary px-6 py-2 rounded-lg text-white font-semibold inline-block"
                            >
                                전략 둘러보기
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <SurveyModal isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
        </div>
    );
}
