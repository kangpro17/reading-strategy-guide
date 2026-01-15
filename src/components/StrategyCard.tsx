import { Strategy } from '../data/strategies';
import { useMyStrategy } from '../context/MyStrategyContext';
import { useSurvey } from '../context/SurveyContext';
import { MenuVisit } from '../data/surveyTypes';

interface StrategyCardProps {
    strategy: Strategy;
    showAddButton?: boolean;
    sourceMenu?: MenuVisit['menu'];
}

export default function StrategyCard({ strategy, showAddButton = true, sourceMenu }: StrategyCardProps) {
    const { addStrategy, removeStrategy, isStrategySaved } = useMyStrategy();
    const { recordMenuVisit } = useSurvey();
    const isSaved = isStrategySaved(strategy.id);

    const handleToggle = () => {
        if (isSaved) {
            removeStrategy(strategy.id);
        } else {
            addStrategy(strategy);
            if (sourceMenu) {
                recordMenuVisit(sourceMenu, strategy.id);
            }
        }
    };

    return (
        <div className="glass rounded-2xl p-6 card-hover animate-fadeIn">
            {/* 전략명 */}
            <h3 className="text-xl font-bold gradient-text mb-3">{strategy.name}</h3>

            {/* 설명 */}
            <p className="text-[var(--color-text-muted)] text-sm mb-4">{strategy.description}</p>

            {/* 이럴 때 */}
            <div className="mb-4">
                <span className="text-[var(--color-secondary)] font-semibold text-sm">📌 이럴 때</span>
                <p className="text-[var(--color-text)] text-sm mt-1">{strategy.whenToUse}</p>
            </div>

            {/* 어떻게 (3단계) */}
            <div className="mb-4">
                <span className="text-[var(--color-accent)] font-semibold text-sm">🔧 어떻게</span>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    {strategy.howTo.map((step, index) => (
                        <li key={index} className="text-sm text-[var(--color-text)]">
                            {step}
                        </li>
                    ))}
                </ol>
            </div>

            {/* 예시 */}
            <div className="mb-4 p-3 bg-[var(--color-surface-light)]/50 rounded-lg">
                <span className="text-[var(--color-primary)] font-semibold text-sm">💡 예시</span>
                <p className="text-sm text-[var(--color-text)] mt-1">{strategy.example}</p>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-4">
                {strategy.tags.map((tag) => (
                    <span key={tag} className="tag px-3 py-1 rounded-full text-xs text-[var(--color-primary)]">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* 내 전략으로 담기 버튼 */}
            {showAddButton && (
                <button
                    onClick={handleToggle}
                    className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all ${isSaved
                        ? 'bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:bg-red-500/20 hover:text-red-400'
                        : 'btn-primary text-white'
                        }`}
                >
                    {isSaved ? '✓ 담김 (클릭하면 제거)' : '📥 내 전략으로 담기'}
                </button>
            )}
        </div>
    );
}
