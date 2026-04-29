import { useEffect, useState } from 'react';

const CONFETTI_COLORS = [
  '#C9A84C', '#2D5A3D', '#F59E0B', '#7C3AED',
  '#E8F4ED', '#D97706', '#3A7A54', '#A78BFA',
];

function Confetti() {
  const pieces = Array.from({ length: 28 });
  return (
    <>
      {pieces.map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${3 + (i * 3.4) % 94}%`,
            backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            width: i % 3 === 0 ? '8px' : '10px',
            height: i % 3 === 0 ? '8px' : '6px',
            borderRadius: i % 2 === 0 ? '50%' : '2px',
            animationDuration: `${1.8 + (i % 5) * 0.3}s`,
            animationDelay: `${(i * 0.07) % 1.2}s`,
          }}
        />
      ))}
    </>
  );
}

export default function CompletePage({
  playerName,
  stars,
  total,
  onViewResult,
  onViewStats,
  onRestart,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const pct = Math.round((stars / total) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden page-enter">
      {show && <Confetti />}

      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/5 via-rice to-gold/5 pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center gap-6 z-10">
        {/* 主圖示 */}
        <div
          className={`
            w-28 h-28 rounded-full bg-white shadow-xl border-4 border-gold
            flex items-center justify-center text-6xl
            transition-all duration-700
            ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}
          style={{ animation: show ? 'bounce-soft 2s ease-in-out infinite' : 'none' }}
        >
          🎊
        </div>

        {/* 標題 */}
        <div
          className={`text-center transition-all duration-500 delay-200 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">觀察完成</p>
          <h2 className="text-3xl font-black text-forest">
            {playerName}！
          </h2>
          <p className="text-base text-gray-500 mt-2 leading-relaxed">
            你完成了所有 {total} 道觀察題<br />
            貢獻了 {stars} 顆觀察星星 ✨
          </p>
        </div>

        {/* 星星展示 */}
        <div
          className={`
            w-full bg-white rounded-3xl shadow-md border border-gold/20 p-5
            transition-all duration-500 delay-300
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <p className="text-center text-xs text-gray-400 font-medium mb-3 tracking-wide">你收集的觀察星星</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl transition-all duration-300 ${
                  i < stars ? 'opacity-100' : 'opacity-15'
                }`}
                style={
                  i < stars
                    ? {
                        animationName: 'star-appear',
                        animationDuration: '0.4s',
                        animationDelay: `${0.4 + i * 0.08}s`,
                        animationFillMode: 'backwards',
                      }
                    : {}
                }
              >
                ⭐
              </span>
            ))}
          </div>
          <div className="mt-3 h-2 bg-sage rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-forest to-gold rounded-full transition-all duration-1000"
              style={{ width: show ? `${pct}%` : '0%' }}
            />
          </div>
          <p className="text-center text-xs text-forest font-bold mt-2">{pct}% 完成度</p>
        </div>

        {/* 行動按鈕 */}
        <div
          className={`
            w-full flex flex-col gap-3
            transition-all duration-500 delay-500
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <button
            onClick={onViewResult}
            className="w-full py-4 rounded-2xl font-black text-lg text-white bg-forest shadow-lg btn-float hover:bg-forest-light"
          >
            🎴 查看我的粽子卡
          </button>
          <button
            onClick={onViewStats}
            className="w-full py-4 rounded-2xl font-black text-base text-forest bg-sage shadow-sm btn-float border border-forest/20 hover:bg-forest/10"
          >
            🏢 公司全員觀察室
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-2xl font-medium text-sm text-gray-400 bg-transparent btn-float hover:text-gray-600"
          >
            ↺ 重新開始
          </button>
        </div>
      </div>
    </div>
  );
}
