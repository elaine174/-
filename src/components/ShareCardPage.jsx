import { useState } from 'react';

export default function ShareCardPage({ playerName, personality, onBack }) {
  const [copied, setCopied] = useState(false);

  const shareText = `我在「端午粽子觀察室」中，發現自己是【${personality.title}】！\n\n${personality.emoji} ${personality.tagline}\n\n${personality.description}\n\n🎋 端午快樂！你也來測測看吧 ✨`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 page-enter">
      <div className="w-full max-w-sm flex flex-col items-center gap-5">
        {/* 頁首 */}
        <div className="text-center">
          <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">分享卡</p>
          <h2 className="text-2xl font-black text-forest">分享你的粽子卡</h2>
        </div>

        {/* 分享卡主體（截圖用） */}
        <div
          id="share-card"
          className="w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/30"
          style={{
            background: `linear-gradient(145deg, ${personality.color}f5, ${personality.color}bb)`,
          }}
        >
          {/* 頂部裝飾條 */}
          <div className="h-1.5 bg-gradient-to-r from-white/60 via-white/30 to-white/60" />

          <div className="p-7 flex flex-col items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎋</span>
              <div>
                <p className="text-white/70 text-xs font-bold tracking-widest">端午粽子觀察室</p>
                <p className="text-white/50 text-xs">2025 端午節特別企劃</p>
              </div>
            </div>

            {/* 人格圖示 */}
            <div className="w-24 h-24 rounded-2xl bg-white/25 flex items-center justify-center text-6xl shadow-lg">
              {personality.emoji}
            </div>

            {/* 名字 */}
            <div className="text-center">
              <p className="text-white/70 text-sm font-medium">{playerName} 是</p>
              <h3 className="text-3xl font-black text-white mt-1 drop-shadow">{personality.title}</h3>
              <p className="text-white/80 text-sm mt-1 italic">"{personality.tagline}"</p>
            </div>

            {/* 描述 */}
            <div className="w-full bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-white/90 text-sm leading-relaxed text-center">
                {personality.description}
              </p>
            </div>

            {/* 底部裝飾 */}
            <div className="flex items-center gap-2 mt-1">
              {['🎋', '🌿', '🎑', '🌾', '🎋'].map((e, i) => (
                <span key={i} className="text-lg opacity-60">{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 操作說明 */}
        <div className="w-full bg-white rounded-2xl shadow-md border border-sage p-4 space-y-3">
          <p className="text-xs text-gray-400 font-medium text-center">分享方式</p>

          <button
            onClick={handleCopy}
            className={`
              w-full py-3.5 rounded-xl font-black text-sm btn-float transition-all
              ${copied
                ? 'bg-forest text-white'
                : 'bg-sage text-forest hover:bg-forest/10'
              }
            `}
          >
            {copied ? '✓ 已複製到剪貼簿！' : '📋 複製分享文字'}
          </button>

          <div className="flex items-start gap-3 bg-gold/10 rounded-xl p-3">
            <span className="text-xl">📸</span>
            <p className="text-xs text-gray-500 leading-relaxed">
              長按上方卡片可截圖保存，直接分享到 LINE、Instagram 或任何社群平台！
            </p>
          </div>
        </div>

        {/* 複製文字預覽 */}
        <div className="w-full bg-white rounded-2xl border border-sage p-4">
          <p className="text-xs text-gray-400 font-medium mb-2">分享文字預覽</p>
          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{shareText}</p>
        </div>

        {/* 返回 */}
        <button
          onClick={onBack}
          className="w-full py-3 rounded-2xl font-medium text-sm text-gray-400 btn-float"
        >
          ← 返回結果卡
        </button>
      </div>
    </div>
  );
}
