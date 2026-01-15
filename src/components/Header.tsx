import { Link, useLocation } from 'react-router-dom';
import { useMyStrategy } from '../context/MyStrategyContext';

export default function Header() {
    const location = useLocation();
    const { savedStrategies } = useMyStrategy();

    const navItems = [
        { path: '/', label: '홈' },
        { path: '/process', label: '독서 과정' },
        { path: '/text-type', label: '글의 종류' },
        { path: '/structure', label: '글의 구조' },
        { path: '/cognitive', label: '인지전략' },
    ];

    return (
        <header className="glass sticky top-0 z-40 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* 로고 */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        <span className="font-bold text-lg gradient-text hidden sm:inline">독서전략 안내</span>
                    </Link>

                    {/* 네비게이션 */}
                    <nav className="flex items-center gap-1 md:gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${location.pathname === item.path
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-light)]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* 내 전략 버튼 */}
                        <Link
                            to="/my-strategy"
                            className={`relative px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${location.pathname === '/my-strategy'
                                    ? 'btn-secondary text-white'
                                    : 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/30'
                                }`}
                        >
                            내 전략
                            {savedStrategies.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent)] text-white text-xs rounded-full flex items-center justify-center">
                                    {savedStrategies.length}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
