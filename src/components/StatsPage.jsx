import { useMemo } from 'react';
import {
  getEmployeePersonality,
  getTotalVotes,
  questionTypes,
  personalityCards,
} from '../mockData';

const PERSONALITY_ORDER = [
  'dragon_captain',
  'action_warrior',
  'creative_zongzi',
  'wise_guardian',
  'warm_wormwood',
  'sunshine_angel',
  'mystery_mage',
];

export default function StatsPage({ mergedVotes, employees, onBack }) {
  // 計算每位員工的人格與票數（過濾掉0票）
  const employeeResults = useMemo(() => {
    return employees
      .map((emp) => {
        const voteMap = mergedVotes[emp.id] || {};
        const total   = getTotalVotes(voteMap);
        if (total === 0) return null;
        const personality = getEmployeePersonality(voteMap);
        return { emp, voteMap, total, personality };
      })
      .filter(Boolean)
      .sort((a, b) => b.total - a.total);
  }, [mergedVotes, employees]);

  // 人格分組
  const grouped = useMemo(() => {
    const map = {};
    PERSONALITY_ORDER.forEach((k) => { map[k] = []; });
    employeeResults.forEach((item) => {
      const key = Object.keys(personalityCards).find(
        (k) => personalityCards[k].title === item.personality.title
      );
      if (key && map[key]) map[key].push(item);
    });
    return map;
  }, [employeeResults]);

  // 統計數字
  const totalVotes = employeeResults.reduce((s, r) => s + r.total, 0);
  const activeEmps = employeeResults.length;

  // 各人格類型佔比
  const personalityCounts = PERSONALITY_ORDER.map((k) => ({
    key: k,
    card: personalityCards[k],
    count: grouped[k].length,
  })).filter((p) => p.count > 0);

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* ── Header ── */}
      <div className="bg-forest px-5 pt-safe pb-5 sticky top-0 z-20 shadow-lg">
        <div className="flex items-center gap-3 mb-4 mt-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white text-sm"
          >
            ←
          </button>
          <div>
            <h2 className="text-xl font-black text-white">公司全員觀察室</h2>
            <p className="text-white/60 text-xs">端午粽子觀察 · 2025</p>
          </div>
          <span className="ml-auto text-3xl">🏢</span>
        </div>

        {/* 統計數字 */}
        <div className="flex gap-3">
          {[
            { label: '參與人次', value: '47', icon: '👥' },
            { label: '觀察票數', value: totalVotes, icon: '⭐' },
            { label: '活躍同事', value: activeEmps, icon: '✨' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex-1 bg-white/15 rounded-2xl p-3 text-center">
              <p className="text-lg">{icon}</p>
              <p className="text-white font-black text-lg leading-none">{value}</p>
              <p className="text-white/60 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 max-w-md mx-auto w-full">
        {/* 人格分布圓餅圖（簡化版色條） */}
        <div className="bg-white rounded-3xl shadow-md border border-gold/15 p-5">
          <h3 className="font-black text-forest text-base mb-4">人格類型分布</h3>
          <div className="space-y-3">
            {personalityCounts.map(({ key, card, count }) => {
              const pct = Math.round((count / activeEmps) * 100);
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{card.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold text-forest">{card.title}</span>
                      <span className="text-xs text-gold font-black">{count} 人</span>
                    </div>
                    <div className="h-2 bg-sage rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${card.gradientFrom}, ${card.gradientTo})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 各人格類型員工卡片 */}
        {PERSONALITY_ORDER.map((key) => {
          const group = grouped[key];
          if (group.length === 0) return null;
          const card = personalityCards[key];

          return (
            <div key={key} className="space-y-3">
              {/* 類型標頭 */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${card.gradientFrom}22, ${card.gradientTo}11)`,
                  borderLeft: `4px solid ${card.gradientFrom}`,
                }}
              >
                <span className="text-2xl">{card.emoji}</span>
                <div>
                  <p className="font-black text-forest text-base">{card.title}</p>
                  <p className="text-xs text-gray-400">{card.tagline}</p>
                </div>
                <span
                  className="ml-auto text-xs font-black px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: card.gradientFrom }}
                >
                  {group.length} 人
                </span>
              </div>

              {/* 員工卡片列表 */}
              <div className="grid grid-cols-1 gap-2">
                {group.map(({ emp, voteMap, total: empTotal }) => {
                  const topType = Object.entries(voteMap)
                    .sort((a, b) => b[1] - a[1])[0];
                  const topQType = questionTypes[topType?.[0]];

                  return (
                    <div
                      key={emp.id}
                      className="bg-white rounded-2xl border border-sage shadow-sm p-4 flex items-center gap-3"
                    >
                      {/* 頭像 */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${card.gradientFrom}30, ${card.gradientTo}20)`,
                        }}
                      >
                        {emp.avatar}
                      </div>

                      {/* 資訊 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-forest text-sm">{emp.name}</p>
                          {topQType && (
                            <span className="text-xs bg-sage text-forest px-2 py-0.5 rounded-full font-medium">
                              {topQType.icon} {topQType.label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{emp.dept}</p>

                        {/* 票數視覺化（星星，不顯示數字排名） */}
                        <div className="flex items-center gap-0.5 mt-1.5">
                          {Array.from({ length: Math.min(empTotal, 12) }).map((_, i) => (
                            <span key={i} className="text-xs">⭐</span>
                          ))}
                          {empTotal > 12 && (
                            <span className="text-xs text-gold font-bold ml-1">+{empTotal - 12}</span>
                          )}
                        </div>
                      </div>

                      {/* 人格 badge */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})`,
                        }}
                      >
                        {card.emoji}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* 底部 */}
        <div className="text-center py-4 space-y-2">
          <p className="text-xs text-gray-300">以上資料為端午節觀察統計</p>
          <p className="text-xs text-gold/60">🎋 端午快樂！</p>
        </div>
      </div>
    </div>
  );
}
