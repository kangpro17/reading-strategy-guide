import { useState } from 'react';
import { Link } from 'react-router-dom';
import { filterStrategies, PROCESS_LABELS, TEXT_TYPE_LABELS, STRUCTURE_LABELS, COGNITIVE_LABELS } from '../data/strategies';
import StrategyCard from '../components/StrategyCard';
import Dashboard from '../components/Dashboard';

// SVG Icons (Lucide Style)
const Icons = {
    BookOpen: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    ),
    FileText: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
    ),
    Layout: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
        </svg>
    ),
    BrainCircuit: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .5 3.5 2.5 2.5 0 0 0-2.24 3.5 2.5 2.5 0 0 0 3.25 2.5 2.5 0 0 0 3.86 1.45" /><path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 3 2.5 2.5 0 0 1-.5 3.5 2.5 2.5 0 0 1 2.24 3.5 2.5 2.5 0 0 1-3.25 2.5 2.5 0 0 1-3.86 1.45" />
        </svg>
    )
};

const menuCards = [
    {
        title: '독서 과정',
        description: '읽기 전/중/후 전략',
        icon: <Icons.BookOpen />,
        path: '/process',
        accentColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        title: '글의 종류',
        description: '설명/설득/정서/친교',
        icon: <Icons.FileText />,
        path: '/text-type',
        accentColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
    },
    {
        title: '글의 구조',
        description: '원인-결과 등 8가지',
        icon: <Icons.Layout />,
        path: '/structure',
        accentColor: 'text-violet-600',
        bgColor: 'bg-violet-50',
    },
    {
        title: '인지전략',
        description: '목적/요약/추론 등',
        icon: <Icons.BrainCircuit />,
        path: '/cognitive',
        accentColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
    },
];

export default function HomePage() {
    const [processFilter, setProcessFilter] = useState<number[]>([]);
    const [textTypeFilter, setTextTypeFilter] = useState<number[]>([]);
    const [structureFilter, setStructureFilter] = useState<number[]>([]);
    const [cognitiveFilter, setCognitiveFilter] = useState<number[]>([]);

    const filteredStrategies = filterStrategies(
        structureFilter.length > 0 ? structureFilter : undefined,
        cognitiveFilter.length > 0 ? cognitiveFilter : undefined,
        processFilter.length > 0 ? processFilter : undefined,
        textTypeFilter.length > 0 ? textTypeFilter : undefined
    );

    const hasActiveFilter = processFilter.length > 0 || textTypeFilter.length > 0 || structureFilter.length > 0 || cognitiveFilter.length > 0;

    const toggleFilter = (
        value: number,
        current: number[],
        setter: React.Dispatch<React.SetStateAction<number[]>>
    ) => {
        if (current.includes(value)) {
            setter(current.filter((v) => v !== value));
        } else {
            setter([...current, value]);
        }
    };

    const clearAllFilters = () => {
        setProcessFilter([]);
        setTextTypeFilter([]);
        setStructureFilter([]);
        setCognitiveFilter([]);
    };

    return (
        <div className="min-h-screen pb-20">
            {/* 히어로 섹션 */}
            <section className="py-24 px-4 relative overflow-hidden bg-[var(--color-surface-light)]">
                {/* 배경 장식 */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-text-muted)] to-transparent opacity-10" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] text-sm font-medium mb-6 animate-fadeIn tracking-wide bg-white/50 backdrop-blur-sm">
                        중학생을 위한 독서 전략 가이드
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn leading-tight text-[var(--color-primary)]">
                        <span className="gradient-text font-serif">글자만 읽는 바보 탈출</span>
                        <br />
                        <span className="text-2xl md:text-4xl font-light mt-2 block opacity-90">
                            문해력 폭발시키는 독서 빌드업
                        </span>
                    </h1>

                    <p className="text-[var(--color-text-muted)] text-base md:text-lg mb-10 max-w-2xl mx-auto">
                        더 이상 읽어도 무슨 말인지 모르겠다면? <br className="hidden md:inline" />
                        14가지 비밀 전략으로 똑똑하게 읽자! 🚀
                    </p>

                    <button
                        onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary animate-fadeIn hover:scale-105 active:scale-95"
                        style={{ animationDelay: '0.2s' }}
                    >
                        내 전략 분석하기
                    </button>
                </div>
            </section>

            {/* 대시보드 */}
            <div id="dashboard" className="scroll-mt-20 mb-12">
                <Dashboard />
            </div>

            {/* 메뉴 카드 (Redesigned) */}
            <section className="px-4 mb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-bold font-serif text-[var(--color-primary)]">독서 전략 메뉴</h2>
                        <span className="text-sm text-[var(--color-text-muted)]">원하는 카테고리를 선택하세요</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {menuCards.map((card) => (
                            <Link
                                key={card.path}
                                to={card.path}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center aspect-[4/5] justify-center overflow-hidden"
                            >
                                {/* 아이콘 배경 원 */}
                                <div className={`w-16 h-16 rounded-full ${card.bgColor} ${card.accentColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    {card.icon}
                                </div>
                                <h3 className="font-bold text-lg text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed opacity-80">
                                    {card.description}
                                </p>

                                {/* Hover Indicator */}
                                <div className={`absolute bottom-0 inset-x-0 h-1 ${card.bgColor.replace('bg-', 'bg-')}-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 30초 전략 찾기 */}
            <section className="px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="glass rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                        {/* 배경 데코 */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-surface-dark)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--color-primary)] mb-2">⚡ 30초 전략 찾기</h2>
                                    <p className="text-[var(--color-text-muted)] text-sm">상황에 딱 맞는 전략을 빠르게 찾아보세요.</p>
                                </div>
                                {hasActiveFilter && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        초기화
                                    </button>
                                )}
                            </div>

                            {/* 필터 그룹 */}
                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <FilterGroup title="독서 과정" items={PROCESS_LABELS} selected={processFilter} toggle={id => toggleFilter(id, processFilter, setProcessFilter)} colorClass="bg-blue-100 text-blue-700 hover:bg-blue-200" selectedClass="!bg-blue-600 !text-white" />
                                <FilterGroup title="글의 종류" items={TEXT_TYPE_LABELS} selected={textTypeFilter} toggle={id => toggleFilter(id, textTypeFilter, setTextTypeFilter)} colorClass="bg-emerald-100 text-emerald-700 hover:bg-emerald-200" selectedClass="!bg-emerald-600 !text-white" />
                                <FilterGroup title="글의 구조" items={STRUCTURE_LABELS} selected={structureFilter} toggle={id => toggleFilter(id, structureFilter, setStructureFilter)} colorClass="bg-violet-100 text-violet-700 hover:bg-violet-200" selectedClass="!bg-violet-600 !text-white" />
                                <FilterGroup title="인지 목적" items={COGNITIVE_LABELS} selected={cognitiveFilter} toggle={id => toggleFilter(id, cognitiveFilter, setCognitiveFilter)} colorClass="bg-amber-100 text-amber-700 hover:bg-amber-200" selectedClass="!bg-amber-600 !text-white" />
                            </div>

                            {/* 결과 리스트 */}
                            {hasActiveFilter ? (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                                        {filteredStrategies.length}개의 전략을 발견했습니다!
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {filteredStrategies.slice(0, 5).map((strategy) => (
                                            <StrategyCard key={strategy.id} strategy={strategy} sourceMenu="home" />
                                        ))}
                                    </div>
                                    {filteredStrategies.length > 5 && (
                                        <div className="text-center mt-6">
                                            <Link to="/process" className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] font-medium text-sm border-b border-transparent hover:border-current transition-all">
                                                더 많은 전략 보기 &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-[var(--color-surface-light)]/50">
                                    <p className="text-[var(--color-text-muted)] text-lg mb-2">
                                        위의 태그를 클릭해보세요! 👆
                                    </p>
                                    <p className="text-sm text-[var(--color-text-light)]">
                                        현재 상황에 가장 효과적인 독서 전략을 추천해 드립니다.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// 헬퍼 컴포넌트: 필터 그룹
function FilterGroup({ title, items, selected, toggle, colorClass, selectedClass }: {
    title: string,
    items: Record<string, string>,
    selected: number[],
    toggle: (id: number) => void,
    colorClass: string,
    selectedClass: string
}) {
    return (
        <div>
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 block opacity-70">{title}</span>
            <div className="flex flex-wrap gap-2">
                {Object.entries(items).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => toggle(Number(key))}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${selected.includes(Number(key)) ? selectedClass : colorClass
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
