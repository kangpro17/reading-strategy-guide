interface FilterOption {
    value: number;
    label: string;
}

interface FilterBarProps {
    title: string;
    options: FilterOption[];
    selectedValues: number[];
    onFilterChange: (values: number[]) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    searchPlaceholder?: string;
}

export default function FilterBar({
    title,
    options,
    selectedValues,
    onFilterChange,
    searchQuery,
    onSearchChange,
    searchPlaceholder = '전략명으로 검색...',
}: FilterBarProps) {
    const toggleFilter = (value: number) => {
        if (selectedValues.includes(value)) {
            onFilterChange(selectedValues.filter((v) => v !== value));
        } else {
            onFilterChange([...selectedValues, value]);
        }
    };

    const clearFilters = () => {
        onFilterChange([]);
        onSearchChange('');
    };

    return (
        <div className="glass rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* 필터 제목 */}
                <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text)] font-semibold whitespace-nowrap">{title}</span>
                </div>

                {/* 필터 버튼들 */}
                <div className="flex flex-wrap gap-2 flex-1">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => toggleFilter(option.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedValues.includes(option.value)
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-light)]/80'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* 검색 */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="px-4 py-2 rounded-lg bg-[var(--color-surface-light)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] border border-transparent focus:border-[var(--color-primary)] focus:outline-none text-sm w-full md:w-48"
                    />
                    {(selectedValues.length > 0 || searchQuery) && (
                        <button
                            onClick={clearFilters}
                            className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm whitespace-nowrap"
                        >
                            초기화
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
