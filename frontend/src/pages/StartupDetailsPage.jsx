import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  FileText, TrendingUp, Target, BarChart2, Users, Shield, Layers, History,
  Sparkles, Info, Award, Building2, Zap, Activity, Clock, CheckCircle2,
  ArrowUpRight, Gauge, Play
} from 'lucide-react';
import LetterGlitch from '../components/LetterGlitch';

const StartupDetailsPage = () => {
  const { startup, report, history, currentReportId, runFullAnalysis, analyzing } = useOutletContext();
  const navigate = useNavigate();

  const getScoreGrade = (score) => {
    if (!score && score !== 0) return { grade: 'N/A', color: '#5C5C5C' };
    if (score >= 90) return { grade: 'A+', color: '#10B981' };
    if (score >= 80) return { grade: 'A', color: '#10B981' };
    if (score >= 70) return { grade: 'B+', color: '#FFBF00' };
    if (score >= 60) return { grade: 'B', color: '#FFBF00' };
    if (score >= 50) return { grade: 'C', color: '#FF7900' };
    return { grade: 'D', color: '#EF4444' };
  };

  const getScoreColor = (score) => {
    if (!score && score !== 0) return '#5C5C5C';
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#FFBF00';
    return '#FF7900';
  };

  const overallGrade = getScoreGrade(report?.overallScore);

  const agentScores = [
    { label: 'Investor', score: report?.investmentScore, icon: TrendingUp, color: '#FFBF00' },
    { label: 'Competitor', score: report?.competitionScore, icon: Target, color: '#F2CF7E' },
    { label: 'Finance', score: report?.financialScore, icon: BarChart2, color: '#FF7900' },
    { label: 'Customer', score: report?.customerScore, icon: Users, color: '#FFBF00' },
    { label: 'Risk', score: report?.riskScore, icon: Shield, color: '#F2CF7E' },
    { label: 'Product', score: report?.productStrategyScore, icon: Layers, color: '#FF7900' },
  ];

  const navCards = [
    { title: 'Executive Summary', description: 'Overview, key risks, strengths, and weaknesses.', icon: FileText, path: 'executive-summary', score: report?.overallScore },
    { title: 'Investor Analysis', description: 'TAM, SAM, SOM, SWOT, and fundability.', icon: TrendingUp, path: 'investor', score: report?.investmentScore },
    { title: 'Competitor Intel', description: 'Market mapping, moats, and positioning.', icon: Target, path: 'competitor', score: report?.competitionScore },
    { title: 'Financial Planning', description: 'LTV, CAC, runway, revenue projections.', icon: BarChart2, path: 'finance', score: report?.financialScore },
    { title: 'Customer Validation', description: 'Personas, pain points, and PMF metrics.', icon: Users, path: 'customer', score: report?.customerScore },
    { title: 'Risk Command', description: 'Threat indexes, heatmaps, mitigations.', icon: Shield, path: 'risk', score: report?.riskScore },
    { title: 'Product Strategy', description: 'MoSCoW, roadmap, 90-day execution.', icon: Layers, path: 'product-strategy', score: report?.productStrategyScore },
    { title: 'Report History', description: 'Full history of AI evaluations.', icon: History, path: 'history', count: history?.length || 0 },
  ];

  const handleCardClick = (path) => {
    const query = currentReportId ? `?reportId=${currentReportId}` : '';
    navigate(`/startups/${startup.id}/${path}${query}`);
  };

  // Run orchestrator - redirect immediately to history page
  const handleRunOrchestrator = () => {
    navigate(`/startups/${startup.id}/history`);
    if (runFullAnalysis) runFullAnalysis();
  };

  const extractThesis = () => {
    const desc = startup?.ideaDescription || '';
    const sentences = desc.split('.').filter(s => s.trim());
    const what = sentences[0]?.trim() || 'No description available';
    const goal = sentences[sentences.length - 1]?.trim() || '';
    return { what, goal: goal || 'Objectives not specified' };
  };

  const thesis = extractThesis();

  return (
    <div className="relative -m-4 sm:-m-6">
      <div className="fixed inset-0 z-0 opacity-[0.10] pointer-events-none">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth
          speed={10}
          colors={["#F2CF7E", "#FFBF00", "#FF7900"]}
          showCenterVignette
          showOuterVignette={false}
        />
      </div>

      <div className="relative z-10 p-4 pb-12 animate-fade-in-up sm:p-6 sm:pb-14 space-y-8">

        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden rounded-[28px] border p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(30,30,30,0.06)]"
          style={{ background: 'linear-gradient(135deg, #FCFAF5 0%, rgba(255,191,0,0.12) 50%, #FCFAF5 100%)', borderColor: 'rgba(242,207,126,0.48)' }}>

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl" style={{ background: 'rgba(255,191,0,0.12)' }} />
          <div className="absolute -bottom-16 left-1/4 h-32 w-32 rounded-full blur-3xl" style={{ background: 'rgba(255,230,66,0.10)' }} />

          <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border"
                  style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)', color: '#10B981' }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#10B981' }} />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#10B981' }} />
                  </span>
                  AI Due Diligence Active
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border"
                  style={{ background: 'rgba(255,191,0,0.06)', borderColor: 'rgba(255,191,0,0.15)', color: '#FFBF00' }}>
                  {startup?.industry || 'Industry'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em]" style={{ color: '#1E1E1E' }}>
                {startup?.startupName || 'Venture'}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#5C5C5C' }}>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" style={{ color: '#FFBF00' }} />
                  <span>{startup?.industry || 'Industry'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" style={{ color: '#FFBF00' }} />
                  <span>Early Stage</span>
                </div>
              </div>
            </div>

            {/* Score Circle + Run Button */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center"
                style={{ borderColor: overallGrade.color, background: 'rgba(255,255,255,0.6)' }}>
                <span className="text-3xl font-black tracking-tight" style={{ color: '#1E1E1E' }}>
                  {report?.overallScore || '--'}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Out of 100</span>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full border"
                style={{ background: `${overallGrade.color}15`, borderColor: `${overallGrade.color}33`, color: overallGrade.color }}>
                Grade {overallGrade.grade}
              </span>

              {/* Run AI Orchestrator Button */}
              {runFullAnalysis && (
                <button
                  onClick={handleRunOrchestrator}
                  disabled={analyzing}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 font-black rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,121,0,0.28)] border disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                >
                  {analyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#1E1E1E] border-t-transparent rounded-full animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" />
                      <span>Run AI Orchestrator</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ========== THESIS + SCORE MATRIX ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border p-6 space-y-4"
            style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" style={{ color: '#FFBF00' }} />
              <h3 className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: '#5C5C5C' }}>Startup Thesis</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 border" style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.06)' }}>
                <p className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#5C5C5C' }}>What They Build</p>
                <p className="text-sm leading-6" style={{ color: '#1E1E1E' }}>{thesis.what}</p>
              </div>
              <div className="rounded-xl p-4 border" style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.06)' }}>
                <p className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#5C5C5C' }}>Core Objective</p>
                <p className="text-sm leading-6" style={{ color: '#1E1E1E' }}>{thesis.goal}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6 space-y-3"
            style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
            <h3 className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: '#5C5C5C' }}>Score Matrix</h3>
            {report ? (
              <div className="space-y-2">
                {agentScores.map((agent) => {
                  const sc = getScoreColor(agent.score);
                  return (
                    <div key={agent.label} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${agent.color}18` }}>
                        <agent.icon className="w-3.5 h-3.5" style={{ color: agent.color }} />
                      </div>
                      <span className="text-xs font-medium flex-1" style={{ color: '#5C5C5C' }}>{agent.label}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#F9F6EE' }}>
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${agent.score ?? 0}%`, background: sc }} />
                      </div>
                      <span className="text-xs font-bold w-8 text-right" style={{ color: sc }}>{agent.score ?? '--'}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                <Award className="w-8 h-8" style={{ color: '#F2CF7E' }} />
                <p className="text-xs font-semibold" style={{ color: '#1E1E1E' }}>No report yet</p>
                <p className="text-[10px]" style={{ color: '#5C5C5C' }}>Run AI Orchestrator to populate scores.</p>
                {runFullAnalysis && (
                  <button
                    onClick={handleRunOrchestrator}
                    disabled={analyzing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 font-bold rounded-lg text-xs transition-all border disabled:opacity-50"
                    style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run AI Orchestrator</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ========== STATUS CARDS ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Reports', value: history?.length || 0, icon: FileText, accent: '#FFBF00' },
            { label: 'Active Agents', value: '6 / 6', icon: Zap, accent: '#10B981' },
            { label: 'Avg Score', value: report?.overallScore ? `${report.overallScore}/100` : '--', icon: Gauge, accent: '#FF7900' },
            { label: 'Last Analysis', value: report?.createdAt ? new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending', icon: Clock, accent: '#F2CF7E' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: stat.accent }} />
                <stat.icon className="w-3.5 h-3.5" style={{ color: '#5C5C5C' }} />
              </div>
              <p className="text-lg font-black tracking-tight" style={{ color: '#1E1E1E' }}>{stat.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#5C5C5C' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ========== AGENT WORKSPACES ========== */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>Intelligence Workspaces</h2>
            <p className="text-xs" style={{ color: '#5C5C5C' }}>Access dedicated AI agent analysis modules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {navCards.map((card) => {
              const isHistory = card.title === 'Report History';
              const sc = getScoreColor(card.score);
              return (
                <div
                  key={card.title}
                  onClick={() => handleCardClick(card.path)}
                  className="group rounded-2xl border p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(30,30,30,0.08)]"
                  style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl border"
                      style={{ background: isHistory ? '#F9F6EE' : 'rgba(255,191,0,0.08)', borderColor: isHistory ? 'rgba(0,0,0,0.08)' : 'rgba(255,191,0,0.15)' }}>
                      <card.icon className="w-4 h-4" style={{ color: isHistory ? '#5C5C5C' : '#FFBF00' }} />
                    </div>
                    {isHistory ? (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md"
                        style={{ background: '#F9F6EE', color: '#5C5C5C' }}>
                        {card.count} runs
                      </span>
                    ) : (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md"
                        style={{ background: `${sc}15`, color: sc }}>
                        {card.score ?? '--'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold mb-1 transition-colors group-hover:text-[#FF7900]" style={{ color: '#1E1E1E' }}>
                    {card.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#5C5C5C' }}>{card.description}</p>
                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: 'rgba(0,0,0,0.08)', color: '#FF7900' }}>
                    <span>Open Workspace</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== PROGRESS TIMELINE ========== */}
        <div className="rounded-2xl border p-6"
          style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
          <h3 className="text-xs font-black uppercase tracking-[0.15em] mb-5" style={{ color: '#5C5C5C' }}>Due Diligence Progress</h3>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-4 h-0.5" style={{ background: 'rgba(0,0,0,0.08)' }} />
            {[
              { label: 'Registered', done: true },
              { label: 'Analysis', done: !!report },
              { label: 'Investor', done: !!report?.investmentScore },
              { label: 'Financial', done: !!report?.financialScore },
              { label: 'Validation', done: !!report?.customerScore },
              { label: 'Ready', done: (report?.overallScore || 0) >= 70 },
            ].map((step, i) => (
              <div key={step.label} className="relative flex flex-col items-center gap-2 z-10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                  style={{
                    background: step.done ? '#10B981' : '#F9F6EE',
                    borderColor: step.done ? '#10B981' : 'rgba(0,0,0,0.12)',
                    color: step.done ? '#FFFFFF' : '#5C5C5C'
                  }}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                </div>
                <span className="text-[9px] font-bold text-center" style={{ color: step.done ? '#1E1E1E' : '#5C5C5C' }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StartupDetailsPage;