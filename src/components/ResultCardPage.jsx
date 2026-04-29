import { useState, useEffect } from 'react';
import { questionTypes } from '../mockData';

export default function ResultCardPage({ playerName, personality, answers, onShare, onBack }) {
  const [flipped, setFlipped] = useState(false);
  const [show, setShow]       = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 100);
    const t2 = setTimeout(() => setFlipped(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // 統計投票分佈
  const typeCounts = {};
  answers.forEach(({ questionType }) => {
    typeCounts[questionType] = (typeCounts[questionType] || 0) + 1;
  });
  const topTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 page-enter relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest/8 via-rice to-gold/8 pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center gap-6 z-10">
        {/* 標題 */}
        <div className={`text-center transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">專屬結果</p>
          <h2 className="text-2xl font-black text-forest">{playerName} 的粽子卡</h2>
        </div>

        {/* 3D 翻轉卡片 */}
        <div
          className={`
            w-full aspect-[3/4] perspective-1000
            transition-all duration-500 delay-100
            ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        >
          <div className={`card-flip-inner w-full h-full relative ${flipped ? 'flipped' : ''}`}>
            {/* 正面：問號卡 */}
            <div className="backface-hidden absolute inset-0 rounded-3xl bg-forest shadow-2xl overflow-hidden flex flex-col items-center justify-center gap-4 cursor-pointer"
              onClick={() => !flipped && setFlipped(true)}
            >
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #FAF8F3 0, #FAF8F3 2px, transparent 0, transparent 50%)',
                  backgroundSize: '20px 20px',
                }}
              />
              <span className="text-8xl animate-bounce-soft relative z-10">🎋</span>
              <p className="text-white/80 font-black text-xl relative z-10">點擊翻開</p>
              <p className="text-white/50 text-xs relative z-10">你的專屬粽子卡正在等你</p>
              <div className="absolute top-4 right-4 text-white/30 text-5xl font-black">?</div>
              <div className="absolute bottom-4 left-4 text-white/30 text-5xl font-black">?</div>
            </div>

            {/* 背面：人格卡 */}
            <div
              className="backface-hidden rotate-y-180 absolute inset-0 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                background: `linear-gradient(135deg, ${personality.color}ee, ${personality.color}aa)`,
              }}
            >
              {/* 頂部裝飾 */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 30%, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="flex-1 flex flex-col items-center justify-center p-7 gap-4 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg">
                  {personality.emoji}
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">你是</p>
                  <h3 className="text-3xl font-black text-white drop-shadow-sm">{personality.title}</h3>
                  <p className="text-white/85 text-sm font-medium mt-1 italic">"{personality.tagline}"</p>
                </div>
                <div className="w-full bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-white/90 text-sm leading-relaxed text-center">
                    {personality.description}
                  </p>
                </div>
              </div>

              {/* 底部 badge */}
              <div className="px-6 pb-6 relative z-10 flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-xs">{playerName}</p>
                  <p className="text-white/40 text-xs">端午粽子觀察室 2025</p>
                </div>
                <div className="text-white/40 text-3xl">🎋</div>
              </div>
            </div>
          </div>
        </div>

        {/* 投票傾向標籤 */}
        {flipped && (
          <div className="w-full bg-white rounded-2xl shadow-md border border-gold/20 p-4 animate-slide-up">
            <p className="text-xs text-gray-400 font-medium mb-3 text-center">你最在乎的特質</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {topTypes.map(([type, count]) => {
                const t = questionTypes[type];
                return (
                  <div
                    key={type}
                    className="flex items-center gap-1.5 bg-sage px-3 py-1.5 rounded-full"
                  >
                    <span>{t?.icon}</span>
                    <span className="text-xs font-bold text-forest">{t?.label}</span>
                    <span className="text-xs text-gold font-black">×{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 按鈕 */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onShare}
            className="w-full py-4 rounded-2xl font-black text-lg text-white bg-forest shadow-lg btn-float hover:bg-forest-light"
          >
            📤 分享我的粽子卡
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 rounded-2xl font-medium text-sm text-gray-400 btn-float"
          >
            ← 返回
          </button>
        </div>
      </div>
    </div>
  );
}
