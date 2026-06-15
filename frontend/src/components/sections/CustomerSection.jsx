import { Users, Zap, Heart, Target, MessageCircle, Megaphone, RefreshCw, UserCheck } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ScoreGauge from '../ui/ScoreGauge';

const PainTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-2.5 shadow-md border" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>{payload[0].payload.dimension}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: '#FF7900' }}>{payload[0].payload.label}</p>
      </div>
    );
  }
  return null;
};

const parsePainLevel = (text) => {
  if (!text) return 50;
  const lower = text.toLowerCase();
  if (lower.includes('critical') || lower.includes('very high') || lower.includes('extreme')) return 95;
  if (lower.includes('high') || lower.includes('severe') || lower.includes('strong')) return 80;
  if (lower.includes('medium') || lower.includes('moderate') || lower.includes('significant')) return 60;
  if (lower.includes('low') || lower.includes('mild') || lower.includes('minimal')) return 35;
  if (lower.includes('very low') || lower.includes('negligible') || lower.includes('none')) return 15;
  return 55;
};

const CustomerSection = ({ data, startupId, onReRunAgent, reRunningAgent }) => {
  if (!data) return (
    <div className="p-6 text-center italic rounded-xl"
      style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
      No customer analysis data available. Run an analysis to generate insights.
    </div>
  );

  const isReRunning = reRunningAgent === 'customer';

  const painData = [
    { dimension: 'Severity', value: parsePainLevel(data.painSeverity), label: data.painSeverity || 'N/A' },
    { dimension: 'Frequency', value: parsePainLevel(data.painFrequency), label: data.painFrequency || 'N/A' },
    { dimension: 'Urgency', value: parsePainLevel(data.painUrgency), label: data.painUrgency || 'N/A' },
    { dimension: 'Adoption', value: parsePainLevel(data.adoptionLikelihood), label: data.adoptionLikelihood || 'N/A' },
    { dimension: 'Retention', value: parsePainLevel(data.retentionPotential), label: data.retentionPotential || 'N/A' },
  ];

  return (
    <div className="relative z-10 space-y-6 animate-fade-in-up">

      {/* Executive Customer Intelligence Hero */}
      <div
        className="rounded-3xl p-8"
        style={{
          background:
            'linear-gradient(135deg, #FCFAF5 0%, rgba(242,207,126,0.18) 100%)',
          border: '1px solid rgba(242,207,126,0.45)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          {/* Left Side */}
          <div className="flex-1">

            <div className="flex items-center gap-4 mb-4">

              <div
                className="p-3 rounded-2xl"
                style={{
                  background: 'rgba(255,191,0,0.10)',
                  border: '1px solid rgba(255,191,0,0.25)',
                }}
              >
                <Users
                  className="w-6 h-6"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: '#5C5C5C' }}
                >
                  VentureVerseX Customer Intelligence
                </p>

                <h2
                  className="text-2xl font-extrabold"
                  style={{ color: '#1E1E1E' }}
                >
                  Exclusive Customer Insights
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
              Evaluate customer pain points, adoption likelihood,
              retention potential, product-market fit, and demand
              validation to determine long-term customer success.
            </p>

            {/* Quick Customer Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">

              {data.productMarketFit && (
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
                    Product Market Fit
                  </p>

                  <p
                    className="font-bold mt-1"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.productMarketFit}
                  </p>
                </div>
              )}

              {data.adoptionLikelihood && (
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
                    Adoption
                  </p>

                  <p
                    className="font-bold mt-1"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.adoptionLikelihood}
                  </p>
                </div>
              )}

              {data.retentionPotential && (
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
                    Retention
                  </p>

                  <p
                    className="font-bold mt-1"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.retentionPotential}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center gap-4">

            <ScoreGauge
              score={data.score}
              size={110}
              label="Score"
            />

            {startupId && onReRunAgent && (
              <button
                onClick={() => onReRunAgent('customer')}
                disabled={isReRunning}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(0,0,0,0.08)',
                  color: '#5C5C5C',
                }}
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isReRunning ? 'animate-spin' : ''
                    }`}
                />

                {isReRunning
                  ? 'Running...'
                  : 'Re-Run'}
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Customer Personas Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {data.primaryPersona && (
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

                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: 'rgba(255,191,0,0.08)',
                  }}
                >
                  <Users
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Primary Persona
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Core target customer segment
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
                  {data.primaryPersona}
                </p>
              </div>

            </div>
          </div>
        )}

        {data.secondaryPersona && (
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

                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: 'rgba(255,121,0,0.08)',
                  }}
                >
                  <UserCheck
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Secondary Persona
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Supporting customer segment
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
                  {data.secondaryPersona}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Customer Pain Intelligence Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Radar Card */}
        <div
          className="lg:col-span-2 rounded-3xl overflow-hidden"
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

              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                }}
              >
                <Zap
                  className="w-5 h-5"
                  style={{ color: '#FFBF00' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Customer Pain Intelligence
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Severity, urgency and adoption insights
                </p>
              </div>

            </div>
          </div>

          <div className="p-6">

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={painData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <PolarGrid stroke="rgba(0,0,0,0.08)" />

                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{
                      fill: '#5C5C5C',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />

                  <Tooltip content={<PainTooltip />} />

                  <Radar
                    dataKey="value"
                    stroke="#FFBF00"
                    fill="#FFBF00"
                    fillOpacity={0.18}
                    strokeWidth={3}
                    animationDuration={1000}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* KPI Cards */}
        <div className="space-y-4">

          {[
            {
              label: 'Pain Severity',
              value: data.painSeverity,
              icon: Zap,
              color: '#FF7900',
            },
            {
              label: 'Pain Frequency',
              value: data.painFrequency,
              icon: Heart,
              color: '#FFBF00',
            },
            {
              label: 'Pain Urgency',
              value: data.painUrgency,
              icon: Target,
              color: '#FF7900',
            },
          ].map(
            (kpi) =>
              kpi.value && (
                <div
                  key={kpi.label}
                  className="rounded-2xl p-5"
                  style={{
                    background: '#FCFAF5',
                    border: '1px solid rgba(242,207,126,0.25)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">

                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: `${kpi.color}15`,
                      }}
                    >
                      <kpi.icon
                        className="w-4 h-4"
                        style={{
                          color: kpi.color,
                        }}
                      />
                    </div>

                    <span
                      className="text-[10px] font-bold uppercase"
                      style={{
                        color: '#5C5C5C',
                      }}
                    >
                      KPI
                    </span>

                  </div>

                  <p
                    className="text-xs font-bold uppercase mb-2"
                    style={{
                      color: '#5C5C5C',
                    }}
                  >
                    {kpi.label}
                  </p>

                  <p
                    className="text-sm font-semibold leading-6"
                    style={{
                      color: '#1E1E1E',
                    }}
                  >
                    {kpi.value}
                  </p>
                </div>
              )
          )}

        </div>

      </div>

      {/* Customer Lifecycle Journey */}
      {data.customerJourney && (
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(242,207,126,0.35)',
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5"
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
                <Users
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Customer Lifecycle Journey
                </h3>
                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  End-to-end customer experience path
                </p>
              </div>
            </div>
          </div>

          {/* Journey Steps */}
          <div className="p-6">
            <div className="relative">
              {/* Desktop Connector */}
              <div
                className="hidden lg:block absolute left-0 right-0 top-6 h-[2px]"
                style={{
                  background: 'rgba(255,191,0,0.18)',
                }}
              />

              <div className={`grid grid-cols-1 gap-4 ${(() => {
                  const stages = data.customerJourney.match(/([A-Z][a-z]+):/g);
                  const count = stages ? stages.length : 1;
                  if (count === 2) return 'lg:grid-cols-2';
                  if (count === 3) return 'lg:grid-cols-3';
                  if (count === 4) return 'lg:grid-cols-4';
                  return 'lg:grid-cols-5';
                })()
                }`}>
                {(() => {
                  // Split by stage pattern: Word followed by colon
                  const stageRegex = /([A-Z][a-z]+):\s*([^:]*?)(?=\s*[A-Z][a-z]+:|$)/g;
                  const matches = [...data.customerJourney.matchAll(stageRegex)];

                  return matches.map((match, index) => {
                    const stageName = match[1].trim();
                    const description = match[2].trim();

                    return (
                      <div key={index} className="relative">
                        {/* Step Number */}
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto relative z-10"
                          style={{
                            background: '#FCFAF5',
                            border: '3px solid #FFBF00',
                          }}
                        >
                          <span
                            className="font-bold"
                            style={{ color: '#FF7900' }}
                          >
                            {index + 1}
                          </span>
                        </div>

                        {/* Card */}
                        <div
                          className="rounded-2xl p-4 h-full"
                          style={{
                            background: '#F9F6EE',
                            border: '1px solid rgba(242,207,126,0.25)',
                          }}
                        >
                          <p
                            className="text-xs font-bold uppercase mb-2"
                            style={{ color: '#5C5C5C' }}
                          >
                            {stageName}
                          </p>
                          <p
                            className="text-sm leading-6"
                            style={{ color: '#1E1E1E' }}
                          >
                            {description}
                          </p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Go-To-Market Intelligence Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Acquisition Channels */}
        {data.customerChannels && (
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

                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: 'rgba(255,191,0,0.08)',
                  }}
                >
                  <Megaphone
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Customer Acquisition Channels
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    High-performing growth and acquisition paths
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
                  style={{
                    color: '#1E1E1E',
                  }}
                >
                  {data.customerChannels}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Customer Objections */}
        {data.customerObjections && (
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

                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: 'rgba(255,121,0,0.08)',
                  }}
                >
                  <MessageCircle
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Customer Objections
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Risks, concerns and adoption barriers
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
                  style={{
                    color: '#1E1E1E',
                  }}
                >
                  {data.customerObjections}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Demand Validation Report */}
      {data.marketDemandValidation && (
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

              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                }}
              >
                <Target
                  className="w-5 h-5"
                  style={{ color: '#FFBF00' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Demand Validation Report
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Customer demand and market acceptance assessment
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
                className="text-sm leading-8 whitespace-pre-line"
                style={{
                  color: '#1E1E1E',
                }}
              >
                {data.marketDemandValidation}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Executive Customer Intelligence Memo */}
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
            className="px-6 py-5"
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
                <Users
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Executive Customer Intelligence Memo
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Strategic customer insights and adoption assessment
                </p>
              </div>

            </div>
          </div>

          {/* Memo Content */}
          <div className="p-6">

            <div
              className="rounded-2xl p-6"
              style={{
                background: '#F9F6EE',
                border: '1px solid rgba(242,207,126,0.20)',
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

            {/* Recommendation */}
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
                Customer Strategy Recommendation
              </h4>

              <p
                className="text-sm leading-7"
                style={{ color: '#1E1E1E' }}
              >
                Focus on validating customer pain intensity,
                accelerating product-market fit, reducing adoption
                friction, and strengthening retention mechanisms to
                maximize long-term customer value and sustainable growth.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerSection;