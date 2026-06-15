import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Tag, Compass, Eye, History } from 'lucide-react';

const StartupCard = ({ startup }) => {
  return (
    <div className="rounded-xl p-5 flex flex-col justify-between group border transition-all"
      style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3.5">
          <div className="p-2 rounded-lg border" style={{ background: 'rgba(255,191,0,0.08)', borderColor: 'rgba(255,191,0,0.15)' }}>
            <Building2 className="w-4 h-4" style={{ color: '#FFBF00' }} />
          </div>
        </div>

        {/* Info */}
        <h3 className="text-sm font-bold mb-1 transition-all" style={{ color: '#1E1E1E' }}>
          {startup.startupName}
        </h3>
        <p className="text-xs line-clamp-2 mb-4 leading-relaxed" style={{ color: '#5C5C5C' }}>
          {startup.ideaDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border"
            style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.06)', color: '#5C5C5C' }}>
            <Tag className="w-2.5 h-2.5" />
            {startup.industry}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border"
            style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.06)', color: '#5C5C5C' }}>
            <Compass className="w-2.5 h-2.5" />
            {startup.targetMarket}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-3.5 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <Link
          to={`/startups/${startup.id}`}
          className="flex items-center justify-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all border"
          style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
        >
          <Eye className="w-3 h-3" />
          <span>Workspace</span>
        </Link>
        <Link
          to={`/startups/${startup.id}/history`}
          className="flex items-center justify-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all border"
          style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)', color: '#5C5C5C' }}
        >
          <History className="w-3 h-3" />
          <span>History</span>
        </Link>
      </div>
    </div>
  );
};

export default StartupCard;
