import { useSurvey } from '../context/SurveyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import TagCloud from './TagCloud';

const COLORS = ['#1A1F2C', '#6B7280', '#C5A47E', '#8D6E63', '#558B2F'];

export default function Dashboard() {
    const { surveys, getTopBenefits, getTopOutcomes, getAverageMetrics, getTopStrategies } = useSurvey();

    const topBenefits = getTopBenefits();
    const topOutcomes = getTopOutcomes();
    const averageMetrics = getAverageMetrics();
    const topStrategies = getTopStrategies();

    if (surveys.length === 0) {
        return <div className="p-8 text-center text-gray-500">아직 데이터가 없습니다.</div>;
    }

    return (
        <section className="py-12 px-4 bg-gray-50/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-serif font-bold text-[var(--color-primary)]">
                        나의 독서 분석 대시보드 📊
                    </h2>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        총 누적 기록: {surveys.length}건
                    </span>
                </div>

                {/* 1. 요약 카드 행 (난이도, 효과, Top 전략) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* 난이도 카드 */}
                    <div className="glass rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">💪</div>
                        <h3 className="text-sm text-gray-500 mb-1">평균 수행 난이도</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-[var(--color-primary)]">{averageMetrics.ease}</span>
                            <span className="text-sm text-gray-400 mb-1">/ 5.0</span>
                        </div>
                        <p className="text-xs text-green-600 mt-2 font-medium">
                            {averageMetrics.ease >= 4 ? '아주 쉬워요!' : averageMetrics.ease >= 3 ? '할 만해요' : '조금 어려워요'}
                        </p>
                    </div>

                    {/* 효과 카드 */}
                    <div className="glass rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">✨</div>
                        <h3 className="text-sm text-gray-500 mb-1">평균 전략 효과</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-blue-600">{averageMetrics.effectiveness}</span>
                            <span className="text-sm text-gray-400 mb-1">/ 5.0</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-2 font-medium">
                            {averageMetrics.effectiveness >= 4 ? '효과 만점!' : '꾸준히 해보세요'}
                        </p>
                    </div>

                    {/* 즐겨찾는 전략 TOP 5 */}
                    <div className="glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                        <h3 className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                            <span>🏆</span> 즐겨찾는 전략 TOP 5
                        </h3>
                        {topStrategies.length > 0 ? (
                            <ul className="space-y-2">
                                {topStrategies.map((strategy, index) => (
                                    <li key={strategy.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {index + 1}
                                            </span>
                                            <span className="font-medium text-[var(--color-primary)] truncate max-w-[120px]">{strategy.name}</span>
                                        </div>
                                        <span className="text-gray-400 text-xs">{strategy.count}회</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400">아직 전략을 사용하지 않았어요.</p>
                        )}
                    </div>
                </div>

                {/* 2. 차트 행 */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* 전략의 장점 분석 */}
                    <div className="glass rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-500 rounded-full" />
                            전략을 사용하니 이게 좋아요 👍
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topBenefits} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={120}
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                                        {topBenefits.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 결과물 현황 */}
                    <div className="glass rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full" />
                            내가 만든 결과물들 🎁
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topOutcomes} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} interval={0} height={50} angle={-15} textAnchor="end" />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    />
                                    <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} barSize={40}>
                                        {topOutcomes.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* 3. 태그 클라우드 (자유 의견) */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-amber-500 rounded-full" />
                        전략 사용 키워드 모음 💬
                    </h3>
                    <TagCloud />
                </div>
            </div>
        </section>
    );
}
