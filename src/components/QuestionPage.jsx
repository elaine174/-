import { useState } from 'react';
import { questionTypes } from '../mockData';

export default function QuestionPage({
  question,
  employees,
  currentIndex,
  total,
  stars,
  onAnswer,
}) {
  const [selected, setSelected] = useState(null);
  const progressPct = ((currentIndex) / total) * 100;
  const qType = questionTypes[question.type];
  const optionEmployees = question.options.map((id) => employees.find((e) => e.id === id));

  const handleSelect = (empId) => {
    if (selected !== null) return;
    setSelected(empId);
    setTimeout(() => onAnswer(empId), 480);
  };

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* ── 頂部 Header ── */}
      <div className="bg-white border-b border-sage px-5 pt-safe sticky top-0 z-20 shadow-sm">
        {/* 進度條 */}
        <div className="h-1.5 bg-sage rounded-full overflow-hidden mb-3 mt-3">
          <div
            className="h-full bg-gradient-to-r from-forest to-gold rounded-full progress-bar-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between pb-3">
          {/* 題號 */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest bg-sage px-3 py-1 rounded-full">
              {currentIndex + 1} / {total}
            </span>
            <span className="text-xs text-gold font-medium">{qType.icon} {qType.label}</span>
          </div>

          {/* 星星累積 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`text-sm transition-all duration-300 ${
                  i < stars ? 'opacity-100 star-appear' : 'opacity-20'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 題目區 ── */}
      <div className="flex-1 flex flex-col px-5 py-6 gap-6 max-w-md mx-auto w-full">
        {/* 問題卡 */}
        <div className="bg-white rounded-3xl shadow-md border border-gold/15 p-6 text-center animate-slide-up">
          <div className="w-14 h-14 rounded-2xl bg-sage flex items-center justify-center mx-auto mb-4 text-3xl">
            {qType.icon}
          </div>
          <p className="text-lg font-black text-forest leading-relaxed">
            {question.text}
          </p>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            憑直覺選一位同事 ↓
          </p>
        </div>

        {/* 員工選項 */}
        <div className="flex flex-col gap-3">
          {optionEmployees.map((emp, idx) => {
            const isSelected = selected === emp.id;
            const isDimmed   = selected !== null && !isSelected;

            return (
              <button
                key={emp.id}
                onClick={() => handleSelect(emp.id)}
                disabled={selected !== null}
                className={`
                  employee-card w-full bg-white rounded-2xl border-2 p-4
                  flex items-center gap-4 text-left shadow-sm
                  animate-slide-up
                  ${isSelected
                    ? 'border-gold bg-gradient-to-r from-gold/10 to-sage selected-pulse scale-[1.02] shadow-lg'
                    : isDimmed
                    ? 'border-sage opacity-40'
                    : 'border-sage hover:border-forest/30'
                  }
                `}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* 頭像 */}
                <div className={`
                  w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0
                  ${isSelected ? 'bg-gold/20' : 'bg-sage'}
                `}>
                  {emp.avatar}
                </div>

                {/* 姓名 + 部門 */}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-forest text-base">{emp.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{emp.dept} · {emp.role}</p>
                </div>

                {/* 選中勾 */}
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0 star-appear">
                    <span className="text-white text-sm font-black">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
