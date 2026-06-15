import React from 'react';
import { ShieldCheck, ShieldAlert, Award, Star, ListChecks, HelpCircle } from 'lucide-react';

const ExecutiveSummaryCard = ({ data }) => {
  if (!data) return null;

  const {
    startupReadinessScore,
    investmentRecommendation,
    fundraisingRecommendation,
    topStrengths = [],
    topWeaknesses = [],
    immediateActions = [],
    keyRisks = [],
    executiveSummary,
    finalRecommendation,
  } = data;

  return (
    <div className="space-y-6">
      {/* Executive Summary Narrative */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <Star className="w-5 h-5 text-indigo-400" />
          <span>Executive Overview</span>
        </h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm lg:text-base">
          {executiveSummary}
        </p>
      </div>

      {/* Highlights: Strengths, Weaknesses, Actions, Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Top Strengths</span>
          </h4>
          <ul className="space-y-3">
            {topStrengths.length > 0 ? (
              topStrengths.map((str, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-emerald-500 font-bold mr-1">•</span>
                  <span>{str}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500 italic">No key strengths reported.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <span>Top Weaknesses</span>
          </h4>
          <ul className="space-y-3">
            {topWeaknesses.length > 0 ? (
              topWeaknesses.map((weak, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-rose-500 font-bold mr-1">•</span>
                  <span>{weak}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500 italic">No key weaknesses reported.</li>
            )}
          </ul>
        </div>

        {/* Immediate Actions */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <ListChecks className="w-5 h-5 text-indigo-500" />
            <span>Immediate Actions</span>
          </h4>
          <ul className="space-y-3">
            {immediateActions.length > 0 ? (
              immediateActions.map((act, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-indigo-500 font-bold mr-1">{index + 1}.</span>
                  <span>{act}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500 italic">No actions recommended.</li>
            )}
          </ul>
        </div>

        {/* Key Risks */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Key Risks</span>
          </h4>
          <ul className="space-y-3">
            {keyRisks.length > 0 ? (
              keyRisks.map((risk, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-amber-500 font-bold mr-1">•</span>
                  <span>{risk}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500 italic">No major risks reported.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Strategic Advisor Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-400" />
          <span>Chief Advisor Verdict</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Investment Suitability
            </span>
            <p className="text-slate-200 font-semibold text-sm lg:text-base">
              {investmentRecommendation}
            </p>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Fundraising Blueprint
            </span>
            <p className="text-slate-200 font-semibold text-sm lg:text-base">
              {fundraisingRecommendation}
            </p>
          </div>
        </div>

        <div className="bg-indigo-650/10 border border-indigo-500/25 p-6 rounded-xl">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
            Strategic Direction
          </span>
          <p className="text-indigo-200 text-sm lg:text-base leading-relaxed">
            {finalRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryCard;
