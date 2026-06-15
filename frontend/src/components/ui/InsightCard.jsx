import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const InsightCard = ({ icon: Icon, title, children, value, color = 'zinc', expandable = false, defaultExpanded = true }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const colorAccents = {
    // Honeycomb
    zinc: 'border-zinc-800 hover:border-zinc-700/80',
    slate: 'border-zinc-800 hover:border-zinc-700/80',
    honeycomb: 'border-[#FFC107]/10 hover:border-[#FFC107]/20',
    indigo: 'border-[#FFC107]/10 hover:border-[#FFC107]/20',
    amber: 'border-[#F9E076]/10 hover:border-[#F9E076]/20',
    purple: 'border-[#895129]/10 hover:border-[#895129]/20',

    // Cherry Blossom
    cherry: 'border-[#FFB7C5]/10 hover:border-[#FFB7C5]/20',
    rose: 'border-[#FFB7C5]/10 hover:border-[#FFB7C5]/20',
    emerald: 'border-[#D5F3D8]/10 hover:border-[#D5F3D8]/20',
    cyan: 'border-[#F2C7C7]/10 hover:border-[#F2C7C7]/20',
  };

  const iconColors = {
    zinc: 'text-zinc-400',
    slate: 'text-zinc-400',
    honeycomb: 'text-[#FFC107]',
    indigo: 'text-[#FFC107]',
    amber: 'text-[#F9E076]',
    purple: 'text-[#895129]',
    cherry: 'text-[#FFB7C5]',
    rose: 'text-[#FFB7C5]',
    emerald: 'text-[#D5F3D8]',
    cyan: 'text-[#F2C7C7]',
  };

  const borderClass = colorAccents[color] || colorAccents.zinc;
  const iconClass = iconColors[color] || iconColors.zinc;

  const content = children || (
    value !== undefined && value !== null ? (
      Array.isArray(value) ? (
        <ul className="space-y-1.5">
          {value.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-zinc-350">
              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${iconClass.replace('text-', 'bg-')}`}></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-medium">{value}</p>
      )
    ) : null
  );

  if (!content) return null;

  return (
    <div className={`bg-zinc-900 rounded-xl border ${borderClass} transition-all`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 ${expandable ? 'cursor-pointer' : ''}`}
        onClick={expandable ? () => setExpanded(!expanded) : undefined}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-3.5 h-3.5 ${iconClass}`} />}
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{title}</span>
        </div>
        {expandable && (
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        )}
      </div>

      {/* Content */}
      <div className={expandable ? `expandable-content ${expanded ? 'expanded' : ''}` : ''}>
        <div className="px-4 pb-4">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
