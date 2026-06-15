import React from 'react';

const ScoreCard = ({ title, score, verdict, color = 'indigo' }) => {
  const getColorClasses = (col) => {
    switch (col) {
      case 'emerald':
        return { bg: 'bg-emerald-500/10 border-emerald-500/15', text: 'text-emerald-400', bar: 'bg-emerald-500' };
      case 'rose':
        return { bg: 'bg-rose-500/10 border-rose-500/15', text: 'text-rose-400', bar: 'bg-rose-500' };
      case 'amber':
        return { bg: 'bg-amber-500/10 border-amber-500/15', text: 'text-amber-400', bar: 'bg-amber-500' };
      case 'purple':
        return { bg: 'bg-purple-500/10 border-purple-500/15', text: 'text-purple-400', bar: 'bg-purple-500' };
      case 'cyan':
        return { bg: 'bg-cyan-500/10 border-cyan-500/15', text: 'text-cyan-400', bar: 'bg-cyan-500' };
      case 'indigo': default:
        return { bg: 'bg-indigo-500/10 border-indigo-500/15', text: 'text-indigo-400', bar: 'bg-indigo-500' };
    }
  };

  const theme = getColorClasses(color);

  return (
    <div className={`p-5 rounded-xl border bg-slate-900/60 card-hover ${theme.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400">{title}</h4>
        {verdict && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${theme.bg} ${theme.text} border`}>{verdict}</span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-extrabold tracking-tight ${theme.text}`}>
          {score !== undefined && score !== null ? score : '—'}
        </span>
        <span className="text-slate-600 text-xs">/100</span>
      </div>
      {score !== undefined && score !== null && (
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${theme.bar}`}
            style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
