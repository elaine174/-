import { useState } from 'react';

const FLOATERS = ['🎋', '🎑', '🌿', '🐉', '🎋', '🌾', '🎑', '🌿'];

export default function EntryPage({ onStart }) {
  const [name, setName] = useState('');
  const [pressed, setPressed] = useState(false);

  const handleStart = () => {
    setPressed(true);
    setTimeout(() => onStart(name), 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden page-enter">
      {/* 漂浮背景裝飾 */}
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="absolute text-2xl select-none pointer-events-none opacity-20"
          style={{
            top: `${8 + (i * 11) % 85}%`,
            left: `${3 + (i * 13) % 92}%`,
            animationName: 'float',
            animationDuration: `${3 + (i % 3)}s`,
            animationDelay: `${i * 0.4}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          {f}
        </span>
      ))}

      {/* 主卡片 */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gold/20 overflow-hidden z-10">
        {/* 頂部色帶 */}
        <div className="h-2 bg-gradient-to-r from-forest via-gold to-forest-light" />

        <div className="p-7 flex flex-col items-center gap-6">
          {/* 主圖示 */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-sage flex items-center justify-center animate-bounce-soft shadow-lg">
              <span className="text-5xl">🎋</span>
            </div>
            <span className="absolute -top-1 -right-1 text-xl animate-spin-slow">✨</span>
          </div>

          {/* 標題 */}
          <div className="text-center space-y-2">
            <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">端午限定</p>
            <h1 className="text-3xl font-black text-forest leading-tight">
              端午粽子<br />觀察室
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              12 道直覺題<br />
              發現你眼中最特別的同事們 🌿
            </p>
          </div>

          {/* 小提示卡 */}
          <div className="w-full bg-sage rounded-2xl p-4 space-y-2">
            {[
              { icon: '👀', text: '12 道觀察題，靠直覺作答' },
              { icon: '🎴', text: '完成後獲得你的專屬粽子卡' },
              { icon: '🏢', text: '解鎖公司全員觀察報告' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-lg w-7 text-center">{icon}</span>
                <span className="text-xs text-forest font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* 姓名輸入 */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wide">
              你叫什麼名字？（選填）
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="輸入你的名字…"
              maxLength={10}
              className="w-full px-4 py-3 rounded-xl border-2 border-sage bg-rice text-forest placeholder-gray-300 text-sm font-medium outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* 開始按鈕 */}
          <button
            onClick={handleStart}
            disabled={pressed}
            className={`w-full py-4 rounded-2xl font-black text-lg tracking-wide text-white shadow-lg btn-float transition-all
              ${pressed
                ? 'bg-gray-300 scale-95'
                : 'bg-forest hover:bg-forest-light active:scale-95 animate-pulse-gold'
              }`}
          >
            {pressed ? '載入中…' : '開始觀察 🎋'}
          </button>

          <p className="text-xs text-gray-300">不需登入 · 不儲存個資</p>
        </div>
      </div>

      {/* 底部裝飾文字 */}
      <p className="mt-8 text-xs text-gold/60 tracking-widest z-10">
        ✦ 2025 端午特別企劃 ✦
      </p>
    </div>
  );
}
