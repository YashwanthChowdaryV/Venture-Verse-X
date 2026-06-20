import React from 'react';
import { AlertTriangle, Shield, Zap, RefreshCw, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ScoreGauge from '../ui/ScoreGauge';

const RiskTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-2.5 shadow-md border" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>{payload[0].payload.name}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: '#FF7900' }}>Risk Level: {payload[0].payload.label}</p>
      </div>
    );
  }
  return null;
};

const parseRiskLevel = (text) => {
  if (!text) return { level: 50, color: '#F2CF7E', label: 'Unknown', bg: 'rgba(242,207,126,0.1)', textColor: '#5C5C5C' };
  const lower = text.toLowerCase();
  if (lower.includes('critical') || lower.includes('very high') || lower.includes('extreme'))
    return { level: 95, color: '#FF7900', label: 'Critical', bg: 'rgba(255,121,0,0.08)', textColor: '#FF7900' };
  if (lower.includes('high') || lower.includes('severe') || lower.includes('significant'))
    return { level: 75, color: '#FFBF00', label: 'High', bg: 'rgba(255,191,0,0.08)', textColor: '#FFBF00' };
  if (lower.includes('medium') || lower.includes('moderate'))
    return { level: 50, color: '#F2CF7E', label: 'Medium', bg: 'rgba(242,207,126,0.08)', textColor: '#FF7900' };
  if (lower.includes('low') || lower.includes('minimal') || lower.includes('mild'))
    return { level: 25, color: '#FFE642', label: 'Low', bg: 'rgba(255,230,66,0.15)', textColor: '#5C5C5C' };
  if (lower.includes('very low') || lower.includes('negligible'))
    return { level: 10, color: '#FFE642', label: 'Very Low', bg: 'rgba(255,230,66,0.1)', textColor: '#5C5C5C' };
  return { level: 50, color: '#F2CF7E', label: 'Assessed', bg: 'rgba(242,207,126,0.08)', textColor: '#FF7900' };
};

const RiskSection = ({ data, startupId }) => {
  if (!data) return (
    <div className="p-6 text-center italic rounded-xl"
      style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
      No risk analysis data available. Run an analysis to generate insights.
    </div>
  );

  const riskDimensions = [
    { key: 'marketRisk', name: 'Market', value: data.marketRisk },
    { key: 'executionRisk', name: 'Execution', value: data.executionRisk },
    { key: 'financialRisk', name: 'Financial', value: data.financialRisk },
    { key: 'regulatoryRisk', name: 'Regulatory', value: data.regulatoryRisk },
    { key: 'operationalRisk', name: 'Operational', value: data.operationalRisk },
    { key: 'technologyRisk', name: 'Technology', value: data.technologyRisk },
    { key: 'scalabilityRisk', name: 'Scalability', value: data.scalabilityRisk },
    { key: 'adoptionRisk', name: 'Adoption', value: data.adoptionRisk },
    { key: 'founderRisk', name: 'Founder', value: data.founderRisk },
  ].filter(d => d.value);

  const chartData = riskDimensions.map(d => {
    const parsed = parseRiskLevel(d.value);
    return { name: d.name, level: parsed.level, color: parsed.color, label: parsed.label };
  });

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Executive Risk Dashboard */}
      <div
        className="rounded-3xl p-8"
        style={{
          background:
            'linear-gradient(135deg, #FCFAF5 0%, rgba(242,207,126,0.18) 100%)',
          border: '1px solid rgba(242,207,126,0.45)',
        }}
      >
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">

          {/* Left Section */}
          <div className="flex-1">

            <div className="flex items-center gap-4 mb-5">

              <div
                className="p-3 rounded-2xl"
                style={{
                  background: 'rgba(255,191,0,0.10)',
                  border: '1px solid rgba(255,191,0,0.25)',
                }}
              >
                <AlertTriangle
                  className="w-6 h-6"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>

                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: '#5C5C5C' }}
                >
                  VentureVerseX Risk Intelligence
                </p>

                <h2
                  className="text-2xl font-extrabold"
                  style={{ color: '#1E1E1E' }}
                >
                  Executive Risk Command Center
                </h2>

              </div>

            </div>

            <p
              className="text-sm leading-7 max-w-3xl"
              style={{ color: '#5C5C5C' }}
            >
              Comprehensive venture risk assessment across market,
              execution, financial, operational, regulatory,
              technology, scalability and adoption dimensions.
            </p>

            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">

              <div
                className="rounded-xl p-3"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(242,207,126,0.25)',
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase"
                  style={{ color: '#5C5C5C' }}
                >
                  Risk Score
                </p>

                <p
                  className="text-xl font-bold mt-1"
                  style={{ color: '#FF7900' }}
                >
                  {data.score || '--'}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(242,207,126,0.25)',
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase"
                  style={{ color: '#5C5C5C' }}
                >
                  Risk Grade
                </p>

                <p
                  className="text-xl font-bold mt-1"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.verdict || 'Assessed'}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(242,207,126,0.25)',
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase"
                  style={{ color: '#5C5C5C' }}
                >
                  Risk Areas
                </p>

                <p
                  className="text-xl font-bold mt-1"
                  style={{ color: '#FFBF00' }}
                >
                  {riskDimensions.length}
                </p>
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(242,207,126,0.25)',
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase"
                  style={{ color: '#5C5C5C' }}
                >
                  Mitigation Plan
                </p>

                <p
                  className="text-xl font-bold mt-1"
                  style={{ color: '#22C55E' }}
                >
                  Ready
                </p>
              </div>

            </div>

          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center gap-4">

            <ScoreGauge
              score={data.score}
              size={110}
              label="Score"
            />

            {data.verdict && (
              <div
                className="px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                  color: '#FF7900',
                  border: '1px solid rgba(255,191,0,0.20)',
                }}
              >
                {data.verdict}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Risk Command Center */}
      <div className="space-y-6">

        {/* Risk Distribution */}
        {chartData.length > 0 && (
          <div
            className="rounded-3xl p-6"
            style={{
              background: '#FCFAF5',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                  border: '1px solid rgba(255,191,0,0.15)',
                }}
              >
                <Activity
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: '#1E1E1E' }}
                >
                  Risk Exposure Dashboard
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Cross-functional risk distribution across startup operations
                </p>
              </div>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.05)"
                  />

                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{
                      fill: '#5C5C5C',
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{
                      fill: '#1E1E1E',
                      fontSize: 11,
                    }}
                    width={120}
                  />

                  <Tooltip content={<RiskTooltip />} />

                  <Bar
                    dataKey="level"
                    radius={[0, 10, 10, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Risk Heatmap Cards */}
        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                background: 'rgba(255,191,0,0.08)',
                border: '1px solid rgba(255,191,0,0.15)',
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
                Risk Assessment Matrix
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                AI-evaluated startup risk profile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {riskDimensions.map((risk) => {

              const parsed = parseRiskLevel(risk.value);

              const progress =
                parsed.label === 'Critical'
                  ? 95
                  : parsed.label === 'High'
                    ? 80
                    : parsed.label === 'Medium'
                      ? 60
                      : 35;

              return (
                <div
                  key={risk.key}
                  className="rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: '#FCFAF5',
                    border: `1px solid ${parsed.color}22`,
                  }}
                >

                  <div
                    className="px-5 py-4"
                    style={{
                      background: parsed.bg,
                      borderBottom: `1px solid ${parsed.color}22`,
                    }}
                  >
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: parsed.color,
                          }}
                        />

                        <h4
                          className="font-bold"
                          style={{ color: '#1E1E1E' }}
                        >
                          {risk.name}
                        </h4>

                      </div>

                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold"
                        style={{
                          background: '#FFFFFF',
                          color: parsed.textColor,
                          border: `1px solid ${parsed.color}33`,
                        }}
                      >
                        {parsed.label}
                      </span>

                    </div>
                  </div>

                  <div className="p-5">

                    <div className="mb-4">

                      <div
                        className="w-full h-2.5 rounded-full overflow-hidden"
                        style={{
                          background: 'rgba(0,0,0,0.05)',
                        }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${progress}%`,
                            background: parsed.color,
                          }}
                        />
                      </div>

                    </div>

                    <p
                      className="text-sm leading-7"
                      style={{
                        color: '#1E1E1E',
                      }}
                    >
                      {risk.value}
                    </p>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Risk Response Center */}
      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: 'rgba(255,191,0,0.08)',
              border: '1px solid rgba(255,191,0,0.15)',
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
              Risk Response Center
            </h3>

            <p
              className="text-xs"
              style={{ color: '#5C5C5C' }}
            >
              Key threats and recommended mitigation roadmap
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* Top Risks */}
          {data.topRisks && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(239,68,68,0.15)',
              }}
            >

              <div
                className="px-5 py-4"
                style={{
                  background: 'rgba(239,68,68,0.04)',
                  borderBottom: '1px solid rgba(239,68,68,0.10)',
                }}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    className="w-5 h-5"
                    style={{ color: '#EF4444' }}
                  />

                  <h4
                    className="font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Critical Risk Factors
                  </h4>
                </div>
              </div>

              <div className="p-5">
                <p
                  className="text-sm leading-7 whitespace-pre-line"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.topRisks}
                </p>
              </div>

            </div>
          )}

          {/* Mitigation Strategies */}
          {data.mitigationStrategies && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >

              <div
                className="px-5 py-4"
                style={{
                  background: 'rgba(34,197,94,0.04)',
                  borderBottom: '1px solid rgba(34,197,94,0.10)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Shield
                    className="w-5 h-5"
                    style={{ color: '#22C55E' }}
                  />

                  <h4
                    className="font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Mitigation Playbook
                  </h4>
                </div>
              </div>

              <div className="p-5">
                <p
                  className="text-sm leading-7 whitespace-pre-line"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.mitigationStrategies}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Executive Risk Memo */}
      {data.analysis && (
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >

          <div
            className="px-6 py-4"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,191,0,0.06), rgba(255,121,0,0.03))',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-3">

              <div
                className="p-2 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.10)',
                }}
              >
                <AlertTriangle
                  className="w-4 h-4"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Executive Risk Assessment Memo
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Consolidated AI-generated risk intelligence report
                </p>
              </div>

            </div>
          </div>

          <div className="p-6">
            <p
              className="text-sm leading-8 whitespace-pre-line"
              style={{ color: '#1E1E1E' }}
            >
              {data.analysis}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default RiskSection;