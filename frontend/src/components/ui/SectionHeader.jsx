import React from 'react';

const SectionHeader = ({ icon: Icon, title, score, verdict, color = 'honeycomb', id }) => {
  const colorMap = {
    // Honeycomb
    honeycomb: { badge: 'bg-[#FFC107]/5 text-[#FFC107] border-[#FFC107]/10', accent: 'text-[#FFC107]' },
    indigo: { badge: 'bg-[#FFC107]/5 text-[#FFC107] border-[#FFC107]/10', accent: 'text-[#FFC107]' },
    amber: { badge: 'bg-[#F9E076]/5 text-[#F9E076] border-[#F9E076]/10', accent: 'text-[#F9E076]' },
    purple: { badge: 'bg-[#895129]/5 text-[#895129] border-[#895129]/10', accent: 'text-[#895129]' },

    // Cherry Blossom
    cherry: { badge: 'bg-[#FFB7C5]/5 text-[#FFB7C5] border-[#FFB7C5]/10', accent: 'text-[#FFB7C5]' },
    rose: { badge: 'bg-[#FFB7C5]/5 text-[#FFB7C5] border-[#FFB7C5]/10', accent: 'text-[#FFB7C5]' },
    emerald: { badge: 'bg-[#D5F3D8]/5 text-[#D5F3D8] border-[#D5F3D8]/10', accent: 'text-[#D5F3D8]' },
    cyan: { badge: 'bg-[#F2C7C7]/5 text-[#F2C7C7] border-[#F2C7C7]/10', accent: 'text-[#F2C7C7]' },
  };

  const c = colorMap[color] || colorMap.honeycomb;

  return (
    <div id={id} className="report-section flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-zinc-800/80">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`p-2 rounded-lg ${c.badge} border`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight leading-none">{title}</h2>
          {verdict && (
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold ${c.badge} border`}>
              {verdict}
            </span>
          )}
        </div>
      </div>
      {score !== undefined && score !== null && (
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Score</span>
          <span className={`text-base font-black ${c.accent}`}>{score}</span>
          <span className="text-zinc-650 text-xs">/100</span>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
