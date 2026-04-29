import { useEffect, useState } from 'react';

const SPARKLES = ['✨', '⭐', '🌟', '💫', '✦'];

export default function FeedbackPage({ employee, feedback, isLast, onNext }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 page-enter relative overflow-hidden">
      {/* 背景漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage/60 via-rice to-rice pointer-events-none" />

      {/* 漂浮裝飾 */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute text-2xl pointer-events-none select-none opacity-30"
          style={{
            top: `${10 + (i * 17) % 75}%`,
            left: `${5 + (i * 19) % 88}%`,
            animationName: 'float',
            animationDuration: `${2.5 + i * 0.5}s`,
            animationDelay: `${i * 0.3}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          {s}
        </span>
      ))}

      <div className="w-full max-w-sm flex flex-col items-center gap-6 z-10">
        {/* 員工大頭像 */}
        <div
          className={`
            w-28 h-28 rounded-3xl bg-white shadow-xl border-4 border-gold
            flex items-center justify-center text-6xl
            transition-all duration-500
            ${show ? 'scale-100 opacity-100 animate-bounce-soft' : 'scale-50 opacity-0'}
          `}
        >
          {employee?.avatar}
        </div>

        {/* 姓名 */}
        <div
          className={`text-center transition-all duration-500 delay-100 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl font-black text-forest">{employee?.name}</p>
          <p className="text-sm text-gray-400 mt-1">{employee?.dept} · {employee?.role}</p>
        </div>

        {/* 反饋訊息卡 */}
        <div
          className={`
            w-full bg-white rounded-3xl shadow-lg border border-gold/20 p-6 text-center
            transition-all duration-500 delay-200
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <p className="text-lg font-bold text-forest leading-relaxed">{feedback}</p>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="text-xl"
                style={{
                  animationName: 'float',
                  animationDuration: `${1.5 + i * 0.3}s`,
                  animationDelay: `${i * 0.2}s`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'ease-in-out',
                }}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* 下一步按鈕 */}
        <button
          onClick={onNext}
          className={`
            w-full py-4 rounded-2xl font-black text-lg text-white shadow-lg btn-float
            bg-forest hover:bg-forest-light
            transition-all duration-500 delay-300
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {isLast ? '查看結果 🎊' : '下一題 →'}
        </button>

        {/* 進度提示 */}
        {!isLast && (
          <p
            className={`text-xs text-gray-400 transition-all duration-500 delay-400 ${
              show ? 'opacity-100' : 'opacity-0'
            }`}
          >
            繼續觀察，即將完成 🌿
          </p>
        )}
      </div>
    </div>
  );
}
