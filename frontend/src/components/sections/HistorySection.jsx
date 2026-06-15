import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, ChevronRight, Award, History, TrendingUp, Target, BarChart2, Users, Shield, Layers, Play } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ScoreGauge from '../ui/ScoreGauge';

const TrendTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-2.5 shadow-md border" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Report #{payload[0].payload.id}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: '#FF7900' }}>Score: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const HistorySection = ({ history, startup, runFullAnalysis }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-16 rounded-xl border"
        style={{ color: '#5C5C5C', background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
        <History className="w-12 h-12 mx-auto mb-4" style={{ color: '#F2CF7E' }} />
        <h3 className="text-sm font-bold" style={{ color: '#1E1E1E' }}>No evaluations generated yet</h3>
        <p className="text-xs mt-1 mb-6" style={{ color: '#5C5C5C' }}>
          Trigger the orchestrator to conduct your first due diligence run.
        </p>
        <button
          onClick={runFullAnalysis}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-zinc-100 font-bold rounded-lg text-xs transition-colors cursor-pointer border"
          style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#1E1E1E' }}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run AI Orchestrator</span>
        </button>
      </div>
    );
  }

  // Calculate score trend data (oldest to newest for trend line)
  const trendData = [...history]
    .reverse()
    .map((r, i) => {
      const date = new Date(r.createdAt);
      const formattedDate = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      return {
        id: r.id,
        index: i + 1,
        date: formattedDate,
        score: r.overallScore ?? 0,
      };
    });

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = history.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(history.length / reportsPerPage);

  const getScoreColor = (score) => {
    if (score >= 80) return { text: '#22C55E', bg: 'rgba(34,197,94,0.08)' };
    if (score >= 60) return { text: '#FFBF00', bg: 'rgba(255,191,0,0.08)' };
    if (score >= 40) return { text: '#FF7900', bg: 'rgba(255,121,0,0.08)' };
    return { text: '#EF4444', bg: 'rgba(239,68,68,0.08)' };
  };

  const agentLinks = [
    { name: 'Summary', path: 'executive-summary', icon: FileText },
    { name: 'Investor', path: 'investor', icon: TrendingUp },
    { name: 'Competitor', path: 'competitor', icon: Target },
    { name: 'Finance', path: 'finance', icon: BarChart2 },
    { name: 'Customer', path: 'customer', icon: Users },
    { name: 'Risk', path: 'risk', icon: Shield },
    { name: 'Product', path: 'product-strategy', icon: Layers }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* History Command Center */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background:
            'linear-gradient(135deg, #FFF8E7 0%, #FCFAF5 50%, #FFF3D6 100%)',
          border: '1px solid rgba(255,191,0,0.15)',
        }}
      >
        {/* Decorative Glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'rgba(255,191,0,0.08)',
            transform: 'translate(30%,-30%)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,191,0,0.12)',
                  border: '1px solid rgba(255,191,0,0.2)',
                }}
              >
                <History
                  className="w-6 h-6"
                  style={{ color: '#FFBF00' }}
                />
              </div>

              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.25em] font-bold"
                  style={{ color: '#FF7900' }}
                >
                  Audit Trail
                </p>

                <h1
                  className="text-2xl font-black"
                  style={{ color: '#1E1E1E' }}
                >
                  Startup Evolution Timeline
                </h1>
              </div>
            </div>

            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: '#5C5C5C' }}
            >
              Track every AI evaluation, monitor readiness progression,
              compare historical reports, and analyze startup growth
              across multiple assessment cycles.
            </p>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-3 gap-3 min-w-fit">

            <div
              className="rounded-2xl p-4 text-center"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <p
                className="text-2xl font-black"
                style={{ color: '#FF7900' }}
              >
                {history.length}
              </p>
              <p
                className="text-[10px] uppercase font-bold"
                style={{ color: '#5C5C5C' }}
              >
                Reports
              </p>
            </div>

            <div
              className="rounded-2xl p-4 text-center"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <p
                className="text-2xl font-black"
                style={{ color: '#FFBF00' }}
              >
                {trendData.length}
              </p>
              <p
                className="text-[10px] uppercase font-bold"
                style={{ color: '#5C5C5C' }}
              >
                Runs
              </p>
            </div>

            <button
              onClick={runFullAnalysis}
              className="rounded-2xl p-4 transition-all hover:scale-105 cursor-pointer"
              style={{
                background:
                  'linear-gradient(135deg,#FFBF00,#FF7900)',
                color: '#fff',
              }}
            >
              <Play className="w-5 h-5 mx-auto mb-1 fill-current" />
              <p className="text-[10px] font-bold uppercase">
                New Run
              </p>
            </button>

          </div>
        </div>
      </div>

      {/* Startup Evolution Analytics */}
      {trendData.length > 1 && (
        <div
          className="rounded-3xl p-6 overflow-hidden relative"
          style={{
            background:
              'linear-gradient(135deg,#FFF8E7 0%,#FCFAF5 50%,#FFF4D9 100%)',
            border: '1px solid rgba(255,191,0,0.15)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: 'rgba(255,191,0,0.08)',
              transform: 'translate(30%,-30%)',
            }}
          />

          <div className="relative z-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.25em] font-bold"
                  style={{ color: '#FF7900' }}
                >
                  Growth Analytics
                </p>

                <h3
                  className="text-xl font-black mt-1"
                  style={{ color: '#1E1E1E' }}
                >
                  Startup Readiness Evolution
                </h3>

                <p
                  className="text-sm mt-2"
                  style={{ color: '#5C5C5C' }}
                >
                  Track how your venture score has evolved across
                  multiple AI assessment cycles.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3">

                <div
                  className="rounded-2xl px-4 py-3 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <p
                    className="text-xl font-black"
                    style={{ color: '#FF7900' }}
                  >
                    {trendData[trendData.length - 1]?.score ?? '--'}
                  </p>
                  <p
                    className="text-[10px] uppercase font-bold"
                    style={{ color: '#5C5C5C' }}
                  >
                    Current
                  </p>
                </div>

                <div
                  className="rounded-2xl px-4 py-3 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <p
                    className="text-xl font-black"
                    style={{ color: '#FFBF00' }}
                  >
                    {trendData.length}
                  </p>
                  <p
                    className="text-[10px] uppercase font-bold"
                    style={{ color: '#5C5C5C' }}
                  >
                    Runs
                  </p>
                </div>

              </div>
            </div>

            {/* Chart */}
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="rgba(0,0,0,0.05)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#5C5C5C', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: '#5C5C5C', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                  />

                  <Tooltip content={<TrendTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#FFBF00"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                      fill: '#FCFAF5',
                      stroke: '#FFBF00',
                      strokeWidth: 3,
                    }}
                    activeDot={{
                      r: 8,
                      fill: '#FCFAF5',
                      stroke: '#FF7900',
                      strokeWidth: 3,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}

      {/* Startup Evolution Timeline */}
      <div className="relative">

        {/* Vertical Line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-[2px]"
          style={{
            background:
              'linear-gradient(to bottom,#FFBF00,#FF7900)',
            opacity: 0.25
          }}
        />

        <div className="space-y-8">

          {currentReports.map((reportItem, index) => {

            const formattedDate = new Date(
              reportItem.createdAt
            ).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            const isLatest =
              index === 0 && currentPage === 1;

            const colors = getScoreColor(
              reportItem.overallScore
            );

            return (

              <div
                key={reportItem.id}
                className="relative pl-16"
              >

                {/* Timeline Node */}
                <div
                  className="absolute left-0 top-4 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: '#FCFAF5',
                    border: '2px solid #FFBF00',
                    boxShadow:
                      '0 10px 30px rgba(255,191,0,0.15)',
                  }}
                >
                  <History
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />
                </div>

                {/* Timeline Content */}
                <div
                  className="rounded-3xl p-6"
                  style={{
                    background: '#FCFAF5',
                    border:
                      '1px solid rgba(0,0,0,0.08)',
                  }}
                >

                  {/* Top Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3
                          className="text-lg font-black"
                          style={{ color: '#1E1E1E' }}
                        >
                          Report #{reportItem.id}
                        </h3>

                        {isLatest && (
                          <span
                            className="px-2 py-1 rounded-full text-[10px] font-bold"
                            style={{
                              background:
                                'rgba(34,197,94,0.12)',
                              color: '#22C55E',
                            }}
                          >
                            LATEST
                          </span>
                        )}

                        {reportItem.finalVerdict && (
                          <span
                            className="px-2 py-1 rounded-full text-[10px] font-bold"
                            style={{
                              background:
                                'rgba(255,191,0,0.12)',
                              color: '#FF7900',
                            }}
                          >
                            {reportItem.finalVerdict}
                          </span>
                        )}

                      </div>

                      <p
                        className="mt-2 text-sm"
                        style={{ color: '#5C5C5C' }}
                      >
                        {formattedDate}
                      </p>

                    </div>

                    <div className="flex items-center gap-4">

                      <div
                        className="px-5 py-3 rounded-2xl"
                        style={{
                          background: colors.bg,
                          color: colors.text,
                          border:
                            `1px solid ${colors.text}22`
                        }}
                      >
                        <div className="text-2xl font-black">
                          {reportItem.overallScore}
                        </div>

                        <div
                          className="text-[10px] uppercase"
                          style={{ color: '#5C5C5C' }}
                        >
                          Readiness Score
                        </div>
                      </div>

                      <Link
                        to={`/startups/${startup.id}/executive-summary?reportId=${reportItem.id}`}
                        className="px-4 py-3 rounded-xl text-xs font-bold transition-all hover:scale-105"
                        style={{
                          background:
                            'linear-gradient(135deg,#FFBF00,#FF7900)',
                          color: '#fff',
                        }}
                      >
                        View Report
                      </Link>

                    </div>
                  </div>

                  {/* Agent Quick Access */}
                  <div className="mt-5">

                    <div
                      className="text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#5C5C5C' }}
                    >
                      Explore Analysis Modules
                    </div>

                    <div className="flex flex-wrap gap-2">

                      {agentLinks.map((agent) => (

                        <Link
                          key={agent.name}
                          to={`/startups/${startup.id}/${agent.path}?reportId=${reportItem.id}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                          style={{
                            background: '#F9F6EE',
                            border:
                              '1px solid rgba(0,0,0,0.05)',
                            color: '#5C5C5C',
                          }}
                        >
                          <agent.icon className="w-3.5 h-3.5" />
                          <span>{agent.name}</span>
                        </Link>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            );
          })}
        </div>
      </div>

      {/* History Navigation */}
      {totalPages > 1 && (
        <div
          className="mt-8 rounded-2xl p-4 flex items-center justify-between"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
            style={{
              background: '#F9F6EE',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#5C5C5C',
            }}
          >
            ← Older Reports
          </button>

          <div className="text-center">
            <div
              className="text-lg font-black"
              style={{ color: '#FF7900' }}
            >
              {currentPage}
            </div>

            <div
              className="text-[10px] uppercase tracking-widest font-bold"
              style={{ color: '#5C5C5C' }}
            >
              of {totalPages} archives
            </div>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
            style={{
              background: '#F9F6EE',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#5C5C5C',
            }}
          >
            Newer Reports →
          </button>
        </div>
      )}

    </div>
  );
};

export default HistorySection;
