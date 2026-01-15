import { useState } from 'react';
import { strategies, STRUCTURE_LABELS, filterStrategies } from '../data/strategies';
import StrategyCard from '../components/StrategyCard';
import FilterBar from '../components/FilterBar';
import ImageModal from '../components/ImageModal';

export default function TextStructurePage() {
    const [selectedStructure, setSelectedStructure] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStrategies = filterStrategies(
        selectedStructure.length > 0 ? selectedStructure : undefined,
        undefined,
        undefined,
        undefined,
        searchQuery
    );

    const structureOptions = Object.entries(STRUCTURE_LABELS).map(([key, label]) => ({
        value: Number(key),
        label,
    }));

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold gradient-text mb-2">🏗️ 글의 구조별 전략</h1>
                    <p className="text-[var(--color-text-muted)]">
                        원인/결과, 비교/대조, 서사 등 8가지 구조에 맞는 전략을 찾아보세요!
                    </p>
                </div>

                {/* 이미지 */}
                <div className="mb-8">
                    <ImageModal
                        src="/assets/strategy-map.png"
                        alt="독서전략 안내도"
                        fallbackText="독서전략 안내도"
                    />
                </div>

                {/* 필터 */}
                <FilterBar
                    title="글의 구조"
                    options={structureOptions}
                    selectedValues={selectedStructure}
                    onFilterChange={setSelectedStructure}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* 전략 카드 리스트 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStrategies.length > 0 ? (
                        filteredStrategies.map((strategy) => (
                            <StrategyCard key={strategy.id} strategy={strategy} sourceMenu="structure" />
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
