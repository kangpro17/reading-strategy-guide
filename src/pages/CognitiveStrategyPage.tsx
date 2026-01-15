import { useState } from 'react';
import { strategies, COGNITIVE_LABELS, filterStrategies } from '../data/strategies';
import StrategyCard from '../components/StrategyCard';
import FilterBar from '../components/FilterBar';
import ImageModal from '../components/ImageModal';

export default function CognitiveStrategyPage() {
    const [selectedCognitive, setSelectedCognitive] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStrategies = filterStrategies(
        undefined,
        selectedCognitive.length > 0 ? selectedCognitive : undefined,
        undefined,
        undefined,
        searchQuery
    );

    const cognitiveOptions = Object.entries(COGNITIVE_LABELS).map(([key, label]) => ({
        value: Number(key),
        label,
    }));

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold gradient-text mb-2">🧠 인지전략별 전략</h1>
                    <p className="text-[var(--color-text-muted)]">
                        독서 목적 명료화, 요약, 추론 등 7가지 인지 목적에 맞는 전략을 찾아보세요!
                    </p>
                </div>

                {/* 이미지 */}
                <div className="mb-8">
                    <ImageModal
                        src="/assets/table3.png"
                        alt="독서전략 참조표"
                        fallbackText="독서전략 참조표"
                    />
                </div>

                {/* 필터 */}
                <FilterBar
                    title="인지 목적"
                    options={cognitiveOptions}
                    selectedValues={selectedCognitive}
                    onFilterChange={setSelectedCognitive}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* 전략 카드 리스트 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStrategies.length > 0 ? (
                        filteredStrategies.map((strategy) => (
                            <StrategyCard key={strategy.id} strategy={strategy} sourceMenu="cognitive" />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-[var(--color-text-muted)]">
                                검색 결과가 없습니다. 필터를 변경해 보세요.
                            </p>
                        </div>
                    )}
                </div>

                {/* 전략 개수 표시 */}
                <div className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
                    전체 {strategies.length}개 중 {filteredStrategies.length}개 표시
                </div>
            </div>
        </div>
    );
}
