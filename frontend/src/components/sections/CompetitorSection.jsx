import React, { useState } from 'react';
import { Target, Shield, Lock, Zap, TrendingUp, Layers, AlertTriangle, CheckCircle } from 'lucide-react';
import ScoreGauge from '../ui/ScoreGauge';
import ExportReportModal from '../ui/ExportReportModal';

const CompetitorSection = ({ data, startupId, startupName = 'Venture' }) => {
  if (!data) return (
    <div className="p-6 text-center italic rounded-xl"
      style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
      No competitor analysis data available. Run an analysis to generate insights.
    </div>
  );

  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header Card */}
      {/* Competitive Intelligence Hero */}
      <div
        className="rounded-3xl p-8"
        style={{
          background: 'linear-gradient(135deg, #FCFAF5 0%, rgba(242,207,126,0.18) 100%)',
          border: '1px solid rgba(242,207,126,0.45)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          {/* Left */}
          <div className="flex-1">

            <div className="flex items-center gap-4 mb-4">

              <div
                className="p-3 rounded-2xl"
                style={{
                  background: 'rgba(255,191,0,0.10)',
                  border: '1px solid rgba(255,191,0,0.25)',
                }}
              >
                <Target
                  className="w-6 h-6"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: '#5C5C5C' }}
                >
                  VentureVerseX Intelligence
                </p>

                <h2
                  className="text-2xl font-extrabold"
                  style={{ color: '#1E1E1E' }}
                >
                  Competitive Intelligence
                </h2>
              </div>

            </div>

            {data.verdict && (
              <div className="mb-5">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(255,191,0,0.10)',
                    color: '#FF7900',
                    border: '1px solid rgba(255,191,0,0.25)',
                  }}
                >
                  {data.verdict}
                </span>
              </div>
            )}

            <p
              className="max-w-3xl text-sm leading-7"
              style={{ color: '#5C5C5C' }}
            >
              Analyze market saturation, positioning, competitive advantages,
              barriers to entry, and strategic opportunities to understand how
              this venture performs against existing and emerging competitors.
            </p>

          </div>

          {/* Right */}
          <div className="flex flex-col items-center gap-4">

            <ScoreGauge
              score={data.score}
              size={110}
              label="Score"
            />

          </div>

        </div>
      </div>

      {/* Market Saturation & Competitive Position */}
      {/* Competitive Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Market Saturation */}
        {data.marketSaturation && (
          <div
            className="rounded-3xl p-6"
            style={{
              background: '#FCFAF5',
              border: '1px solid rgba(242,207,126,0.35)',
            }}
          >
            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,121,0,0.08)',
                  }}
                >
                  <Layers
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />
                </div>

                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#5C5C5C' }}
                  >
                    Market Saturation
                  </p>

                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Competitive Density
                  </h3>
                </div>
              </div>

              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(255,121,0,0.08)',
                  color: '#FF7900',
                }}
              >
                Market
              </div>

            </div>

            <p
              className="text-base font-semibold mb-4"
              style={{ color: '#1E1E1E' }}
            >
              {data.marketSaturation}
            </p>

            <div
              className="h-3 rounded-full overflow-hidden"
              style={{
                background: 'rgba(242,207,126,0.25)',
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '75%',
                  background: '#FF7900',
                }}
              />
            </div>

            <p
              className="text-xs mt-3"
              style={{ color: '#5C5C5C' }}
            >
              Indicates the level of existing competition within the target market.
            </p>
          </div>
        )}

        {/* Competitive Position */}
        {data.competitivePosition && (
          <div
            className="rounded-3xl p-6"
            style={{
              background: '#FCFAF5',
              border: '1px solid rgba(242,207,126,0.35)',
            }}
          >
            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,191,0,0.08)',
                  }}
                >
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />
                </div>

                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#5C5C5C' }}
                  >
                    Competitive Position
                  </p>

                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Market Standing
                  </h3>
                </div>
              </div>

              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                  color: '#FF7900',
                }}
              >
                Position
              </div>

            </div>

            <p
              className="text-base font-semibold mb-4"
              style={{ color: '#1E1E1E' }}
            >
              {data.competitivePosition}
            </p>

            <div
              className="h-3 rounded-full overflow-hidden"
              style={{
                background: 'rgba(242,207,126,0.25)',
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '82%',
                  background: '#FFBF00',
                }}
              />
            </div>

            <p
              className="text-xs mt-3"
              style={{ color: '#5C5C5C' }}
            >
              Reflects the startup's current positioning against competitors.
            </p>
          </div>
        )}

      </div>
      {/* Competitor Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Direct Competitors */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(242,207,126,0.35)',
          }}
        >
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,121,0,0.08)',
                }}
              >
                <Target
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Direct Competitors
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Companies targeting the same customers
                </p>
              </div>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(255,121,0,0.08)',
                color: '#FF7900',
              }}
            >
              {(data.directCompetitors || []).length}
            </span>
          </div>

          <div className="p-5 space-y-3">

            {(data.directCompetitors || []).length > 0 ? (
              (data.directCompetitors || []).map((competitor, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-2xl"
                  style={{
                    background: '#F9F6EE',
                    border: '1px solid rgba(242,207,126,0.25)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: '#FF7900',
                      color: '#FFFFFF',
                    }}
                  >
                    {index + 1}
                  </div>

                  <p
                    className="text-sm leading-6"
                    style={{ color: '#1E1E1E' }}
                  >
                    {competitor}
                  </p>
                </div>
              ))
            ) : (
              <div
                className="rounded-2xl p-5 text-center"
                style={{
                  background: '#F9F6EE',
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: '#5C5C5C' }}
                >
                  No direct competitors identified.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Indirect Competitors */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(242,207,126,0.35)',
          }}
        >
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                }}
              >
                <Layers
                  className="w-5 h-5"
                  style={{ color: '#FFBF00' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Indirect Competitors
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Alternative solutions addressing the problem
                </p>
              </div>
            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(255,191,0,0.08)',
                color: '#FF7900',
              }}
            >
              {(data.indirectCompetitors || []).length}
            </span>
          </div>

          <div className="p-5 space-y-3">

            {(data.indirectCompetitors || []).length > 0 ? (
              (data.indirectCompetitors || []).map((competitor, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-2xl"
                  style={{
                    background: '#F9F6EE',
                    border: '1px solid rgba(242,207,126,0.25)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: '#FFBF00',
                      color: '#1E1E1E',
                    }}
                  >
                    {index + 1}
                  </div>

                  <p
                    className="text-sm leading-6"
                    style={{ color: '#1E1E1E' }}
                  >
                    {competitor}
                  </p>
                </div>
              ))
            ) : (
              <div
                className="rounded-2xl p-5 text-center"
                style={{
                  background: '#F9F6EE',
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: '#5C5C5C' }}
                >
                  No indirect competitors identified.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
      {/* Competitive Advantage Dashboard */}
      <div className="space-y-6">

        {/* Moats + Barriers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {data.moats && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div
                className="px-6 py-5 flex items-center justify-between"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      background: 'rgba(255,191,0,0.08)',
                    }}
                  >
                    <Lock
                      className="w-5 h-5"
                      style={{ color: '#FFBF00' }}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: '#1E1E1E' }}
                    >
                      Defensive Moats
                    </h3>

                    <p
                      className="text-xs"
                      style={{ color: '#5C5C5C' }}
                    >
                      Sustainable competitive advantages
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: '#F9F6EE',
                  }}
                >
                  <p
                    className="text-sm leading-7 whitespace-pre-line"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.moats}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.barriersToEntry && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div
                className="px-6 py-5 flex items-center justify-between"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      background: 'rgba(255,121,0,0.08)',
                    }}
                  >
                    <Shield
                      className="w-5 h-5"
                      style={{ color: '#FF7900' }}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: '#1E1E1E' }}
                    >
                      Barriers To Entry
                    </h3>

                    <p
                      className="text-xs"
                      style={{ color: '#5C5C5C' }}
                    >
                      Protection against future competitors
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: '#F9F6EE',
                  }}
                >
                  <p
                    className="text-sm leading-7 whitespace-pre-line"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.barriersToEntry}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Market Opportunity Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {data.marketGaps && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div
                className="px-6 py-5"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Zap
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />

                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: '#1E1E1E' }}
                    >
                      Market Gaps
                    </h3>

                    <p
                      className="text-xs"
                      style={{ color: '#5C5C5C' }}
                    >
                      Untapped opportunities in the market
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p
                  className="text-sm leading-7 whitespace-pre-line"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.marketGaps}
                </p>
              </div>
            </div>
          )}

          {data.competitiveGaps && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div
                className="px-6 py-5"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Target
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />

                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: '#1E1E1E' }}
                    >
                      Positioning Gaps
                    </h3>

                    <p
                      className="text-xs"
                      style={{ color: '#5C5C5C' }}
                    >
                      Weak spots in competitor positioning
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p
                  className="text-sm leading-7 whitespace-pre-line"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.competitiveGaps}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Strengths vs Threats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {data.strengths && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div
                className="px-6 py-5"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />

                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Competitive Strengths
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p
                  className="text-sm leading-7 whitespace-pre-line"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.strengths}
                </p>
              </div>
            </div>
          )}

          {data.threats && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div
                className="px-6 py-5"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />

                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Competitive Threats
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p
                  className="text-sm leading-7 whitespace-pre-line"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.threats}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Executive Competitive Intelligence Memo */}
      {data.analysis && (
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(242,207,126,0.35)',
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-3">

              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                }}
              >
                <Target
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Executive Competitive Memo
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  AI-generated competitive assessment and strategic outlook
                </p>
              </div>

            </div>

            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(255,191,0,0.08)',
                color: '#FF7900',
              }}
            >
              Competition Analysis
            </span>
          </div>

          {/* Summary Metrics */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6"
            style={{
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >

            <div
              className="rounded-2xl p-4"
              style={{
                background: '#F9F6EE',
              }}
            >
              <p
                className="text-xs font-bold uppercase mb-2"
                style={{ color: '#5C5C5C' }}
              >
                Competition Score
              </p>

              <p
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                {data.score}/100
              </p>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{
                background: '#F9F6EE',
              }}
            >
              <p
                className="text-xs font-bold uppercase mb-2"
                style={{ color: '#5C5C5C' }}
              >
                Position
              </p>

              <p
                className="font-bold"
                style={{ color: '#1E1E1E' }}
              >
                {data.competitivePosition || 'Emerging'}
              </p>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{
                background: '#F9F6EE',
              }}
            >
              <p
                className="text-xs font-bold uppercase mb-2"
                style={{ color: '#5C5C5C' }}
              >
                Saturation
              </p>

              <p
                className="font-bold"
                style={{ color: '#1E1E1E' }}
              >
                {data.marketSaturation || 'Moderate'}
              </p>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{
                background: '#F9F6EE',
              }}
            >
              <p
                className="text-xs font-bold uppercase mb-2"
                style={{ color: '#5C5C5C' }}
              >
                Verdict
              </p>

              <p
                className="font-bold"
                style={{ color: '#FF7900' }}
              >
                {data.verdict || 'Review Required'}
              </p>
            </div>

          </div>

          {/* Memo */}
          <div className="p-6">

            <div
              className="rounded-2xl p-6"
              style={{
                background: '#F9F6EE',
                border: '1px solid rgba(242,207,126,0.25)',
              }}
            >
              <p
                className="text-sm leading-8 whitespace-pre-line"
                style={{
                  color: '#1E1E1E',
                }}
              >
                {data.analysis}
              </p>
            </div>

            {/* Strategic Recommendation */}
            <div
              className="mt-5 rounded-2xl p-5"
              style={{
                background: 'rgba(255,191,0,0.05)',
                border: '1px solid rgba(255,191,0,0.15)',
              }}
            >
              <h4
                className="font-bold mb-3"
                style={{ color: '#FF7900' }}
              >
                Strategic Recommendation
              </h4>

              <p
                className="text-sm leading-7"
                style={{ color: '#1E1E1E' }}
              >
                Focus on strengthening differentiation, expanding defensible
                advantages, and capturing underserved market segments to
                improve long-term competitive positioning and reduce market
                pressure from existing competitors.
              </p>
            </div>

          </div>
        </div>
      )}

      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        startupName={startupName}
      />
    </div>
  );
};

export default CompetitorSection;