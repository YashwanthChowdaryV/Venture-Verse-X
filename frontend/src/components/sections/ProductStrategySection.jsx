import React from 'react';
import { Layers, ListChecks, Map, Rocket, TrendingUp, Target, Calendar, RefreshCw, Gauge } from 'lucide-react';
import ScoreGauge from '../ui/ScoreGauge';

const ProductStrategySection = ({ data, startupId, onReRunAgent, reRunningAgent }) => {
  if (!data) return (
    <div className="p-6 text-center italic rounded-xl"
      style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
      No product strategy data available. Run an analysis to generate insights.
    </div>
  );

  const isReRunning = reRunningAgent === 'productStrategy';

  const moscowColumns = [
    { title: 'Must Have', items: data.mustHaveFeatures || [], color: '#FF7900' },
    { title: 'Should Have', items: data.shouldHaveFeatures || [], color: '#FFBF00' },
    { title: 'Could Have', items: data.couldHaveFeatures || [], color: '#F2CF7E' },
  ];

  const phases = [
    { title: 'Phase 1: Foundation', items: data.phase1Roadmap || [], color: '#FFBF00' },
    { title: 'Phase 2: Growth', items: data.phase2Roadmap || [], color: '#F2CF7E' },
    { title: 'Phase 3: Scale', items: data.phase3Roadmap || [], color: '#FF7900' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Product Strategy Command Center */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background:
            'linear-gradient(135deg,#FFF8E7 0%,#FCFAF5 50%,#FFF3D8 100%)',
          border: '1px solid rgba(255,191,0,0.15)',
        }}
      >

        {/* Background Glow */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: 'rgba(255,191,0,0.08)',
            transform: 'translate(35%,-35%)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-3">

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,191,0,0.12)',
                  border: '1px solid rgba(255,191,0,0.2)',
                }}
              >
                <Layers
                  className="w-7 h-7"
                  style={{ color: '#FFBF00' }}
                />
              </div>

              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.25em] font-bold"
                  style={{ color: '#FF7900' }}
                >
                  Product Command Center
                </p>

                <h1
                  className="text-2xl font-black"
                  style={{ color: '#1E1E1E' }}
                >
                  Product Strategy Workspace
                </h1>
              </div>

            </div>

            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: '#5C5C5C' }}
            >
              Translate startup vision into execution.
              Prioritize roadmap initiatives, validate assumptions,
              track milestones, and build a scalable product strategy.
            </p>

            {data.verdict && (
              <div
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                  border: '1px solid rgba(255,191,0,0.15)',
                  color: '#FF7900',
                }}
              >
                <span className="text-xs font-bold">
                  {data.verdict}
                </span>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <ScoreGauge
                score={data.score}
                size={110}
                label="Score"
              />
            </div>

            {startupId && onReRunAgent && (
              <button
                onClick={() => onReRunAgent('productStrategy')}
                disabled={isReRunning}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all hover:scale-105"
                style={{
                  background:
                    'linear-gradient(135deg,#FFBF00,#FF7900)',
                  color: '#fff',
                }}
              >
                <RefreshCw
                  className={`w-4 h-4 ${isReRunning ? 'animate-spin' : ''
                    }`}
                />
                <span>
                  {isReRunning
                    ? 'Generating...'
                    : 'Rebuild Strategy'}
                </span>
              </button>
            )}

          </div>

        </div>
      </div>
      {/* MVP Foundation */}
      {data.mvpFeatures && data.mvpFeatures.length > 0 && (
        <div
          className="rounded-3xl p-6"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-2.5 rounded-xl"
              style={{
                background: 'rgba(255,191,0,0.08)',
                border: '1px solid rgba(255,191,0,0.15)',
              }}
            >
              <Rocket
                className="w-5 h-5"
                style={{ color: '#FF7900' }}
              />
            </div>

            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                MVP Foundation
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                Core features required before market launch
              </p>
            </div>
          </div>

          {/* MVP Card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: '#F9F6EE',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4"
              style={{
                background: 'rgba(255,121,0,0.08)',
                borderBottom: '1px solid rgba(255,121,0,0.15)',
              }}
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: '#FF7900',
                    }}
                  />

                  <h4
                    className="font-bold"
                    style={{
                      color: '#1E1E1E',
                    }}
                  >
                    Launch Critical Features
                  </h4>

                </div>

                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{
                    background: '#FFFFFF',
                    color: '#FF7900',
                    border: '1px solid rgba(255,121,0,0.15)',
                  }}
                >
                  {data.mvpFeatures.length} Features
                </span>

              </div>
            </div>

            {/* Features */}
            <div className="p-5 space-y-3">

              {data.mvpFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: '#FCFAF5',
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                    style={{
                      background: 'rgba(255,121,0,0.08)',
                      color: '#FF7900',
                      border: '1px solid rgba(255,121,0,0.12)',
                    }}
                  >
                    {index + 1}
                  </div>

                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: '#1E1E1E',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </div>
      )}
      {/* MoSCoW Prioritization */}
      {moscowColumns.some((c) => c.items.length > 0) && (
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
              <ListChecks
                className="w-5 h-5"
                style={{ color: '#FFBF00' }}
              />
            </div>

            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                MoSCoW Prioritization
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                Strategic feature prioritization for product execution
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {moscowColumns.map((column, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >

                {/* Column Header */}
                <div
                  className="px-5 py-4"
                  style={{
                    background: `${column.color}12`,
                    borderBottom: `1px solid ${column.color}22`,
                  }}
                >
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: column.color,
                        }}
                      />

                      <h4
                        className="font-bold"
                        style={{
                          color: '#1E1E1E',
                        }}
                      >
                        {column.title}
                      </h4>

                    </div>

                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{
                        background: '#FFFFFF',
                        color: column.color,
                        border: `1px solid ${column.color}22`,
                      }}
                    >
                      {column.items.length} Features
                    </span>

                  </div>
                </div>

                {/* Column Body */}
                <div className="p-5 space-y-3">

                  {column.items.length > 0 ? (
                    column.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{
                          background: '#FCFAF5',
                          border: '1px solid rgba(0,0,0,0.05)',
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{
                            background: column.color,
                          }}
                        />

                        <span
                          className="text-sm leading-relaxed"
                          style={{
                            color: '#1E1E1E',
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      className="text-center py-8 text-xs italic"
                      style={{ color: '#5C5C5C' }}
                    >
                      No features assigned
                    </div>
                  )}

                </div>

                {/* Connector Arrow */}
                {index < moscowColumns.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-7 z-10 items-center justify-center w-14 h-14 rounded-full"
                    style={{
                      background: '#FCFAF5',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: '#FF7900' }}
                    >
                      →
                    </span>
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      )}

      {/* Product Roadmap Timeline */}
      {phases.some((p) => p.items.length > 0) && (
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
              <Map
                className="w-5 h-5"
                style={{ color: '#FF7900' }}
              />
            </div>

            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                Product Roadmap Timeline
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                Strategic execution milestones from MVP to scale
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {phases.map((phase, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: '#F9F6EE',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >

                {/* Phase Header */}
                <div
                  className="px-5 py-4"
                  style={{
                    background: `${phase.color}12`,
                    borderBottom: `1px solid ${phase.color}22`,
                  }}
                >
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: phase.color,
                        }}
                      />

                      <h4
                        className="font-bold"
                        style={{ color: '#1E1E1E' }}
                      >
                        {phase.title}
                      </h4>

                    </div>

                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{
                        background: '#FFFFFF',
                        color: phase.color,
                        border: `1px solid ${phase.color}22`,
                      }}
                    >
                      {phase.items.length} Tasks
                    </span>

                  </div>
                </div>

                {/* Phase Body */}
                <div className="p-5 space-y-3">

                  {phase.items.length > 0 ? (
                    phase.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{
                          background: '#FCFAF5',
                          border: '1px solid rgba(0,0,0,0.05)',
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{
                            background: phase.color,
                          }}
                        />

                        <span
                          className="text-sm leading-relaxed"
                          style={{
                            color: '#1E1E1E',
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      className="text-center py-8 text-xs italic"
                      style={{ color: '#5C5C5C' }}
                    >
                      No milestones defined
                    </div>
                  )}

                </div>

                {/* Connector Arrow */}
                {index < phases.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-7 z-10 items-center justify-center w-14 h-14 rounded-full"
                    style={{
                      background: '#FCFAF5',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: '#FF7900' }}
                    >
                      →
                    </span>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* GTM & Growth Engine */}
      {(data.gtmStrategy || data.growthStrategy) && (
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
              <Rocket
                className="w-5 h-5"
                style={{ color: '#FF7900' }}
              />
            </div>

            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                Market Entry & Growth Engine
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                Customer acquisition, expansion and scaling strategy
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* GTM */}
            {data.gtmStrategy && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,121,0,0.15)',
                  background: '#F9F6EE',
                }}
              >
                <div
                  className="px-5 py-4"
                  style={{
                    background: 'rgba(255,121,0,0.06)',
                    borderBottom: '1px solid rgba(255,121,0,0.12)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Rocket
                      className="w-5 h-5"
                      style={{ color: '#FF7900' }}
                    />

                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: '#1E1E1E' }}
                      >
                        Go-To-Market Strategy
                      </h4>

                      <p
                        className="text-xs"
                        style={{ color: '#5C5C5C' }}
                      >
                        Launch & customer acquisition plan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.gtmStrategy}
                  </p>
                </div>
              </div>
            )}

            {/* Growth */}
            {data.growthStrategy && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,191,0,0.15)',
                  background: '#F9F6EE',
                }}
              >
                <div
                  className="px-5 py-4"
                  style={{
                    background: 'rgba(255,191,0,0.06)',
                    borderBottom: '1px solid rgba(255,191,0,0.12)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp
                      className="w-5 h-5"
                      style={{ color: '#FFBF00' }}
                    />

                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: '#1E1E1E' }}
                      >
                        Growth Strategy
                      </h4>

                      <p
                        className="text-xs"
                        style={{ color: '#5C5C5C' }}
                      >
                        Expansion, retention & scale roadmap
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.growthStrategy}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Validation & KPI Command Center */}
      {(data.validationPlan || data.kpis) && (
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
              <Target
                className="w-5 h-5"
                style={{ color: '#FFBF00' }}
              />
            </div>

            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                Validation & KPI Command Center
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                Product validation framework and success measurement system
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Validation Plan */}
            {data.validationPlan && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,191,0,0.15)',
                  background: '#F9F6EE',
                }}
              >
                <div
                  className="px-5 py-4"
                  style={{
                    background: 'rgba(255,191,0,0.06)',
                    borderBottom: '1px solid rgba(255,191,0,0.12)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Target
                      className="w-5 h-5"
                      style={{ color: '#FFBF00' }}
                    />

                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: '#1E1E1E' }}
                      >
                        Validation Strategy
                      </h4>

                      <p
                        className="text-xs"
                        style={{ color: '#5C5C5C' }}
                      >
                        Market testing & product verification roadmap
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.validationPlan}
                  </p>
                </div>
              </div>
            )}

            {/* KPI Framework */}
            {data.kpis && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,121,0,0.15)',
                  background: '#F9F6EE',
                }}
              >
                <div
                  className="px-5 py-4"
                  style={{
                    background: 'rgba(255,121,0,0.06)',
                    borderBottom: '1px solid rgba(255,121,0,0.12)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Gauge
                      className="w-5 h-5"
                      style={{ color: '#FF7900' }}
                    />

                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: '#1E1E1E' }}
                      >
                        KPI Framework
                      </h4>

                      <p
                        className="text-xs"
                        style={{ color: '#5C5C5C' }}
                      >
                        Metrics, milestones & performance indicators
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.kpis}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 90-Day Execution Pipeline */}
      {data.next90Days && data.next90Days.length > 0 && (
        <div
          className="rounded-3xl p-6"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-2.5 rounded-xl"
              style={{
                background: 'rgba(255,191,0,0.08)',
                border: '1px solid rgba(255,191,0,0.15)',
              }}
            >
              <Calendar
                className="w-5 h-5"
                style={{ color: '#FFBF00' }}
              />
            </div>

            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                90-Day Execution Pipeline
              </h3>

              <p
                className="text-xs"
                style={{ color: '#5C5C5C' }}
              >
                Strategic milestones to achieve product-market readiness
              </p>
            </div>
          </div>

          {/* Scrollable Roadmap */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center gap-6 min-w-max">

              {data.next90Days.map((item, index) => (
                <React.Fragment key={index}>

                  {/* Milestone Card */}
                  <div
                    className="w-[320px] flex-shrink-0 rounded-3xl overflow-hidden"
                    style={{
                      background: '#F9F6EE',
                      border: '1px solid rgba(255,191,0,0.15)',
                    }}
                  >

                    {/* Card Header */}
                    <div
                      className="px-5 py-4"
                      style={{
                        background: 'rgba(255,191,0,0.05)',
                        borderBottom: '1px solid rgba(255,191,0,0.10)',
                      }}
                    >
                      <div className="flex items-center justify-between">

                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-bold"
                          style={{
                            background: 'rgba(255,191,0,0.08)',
                            color: '#FF7900',
                          }}
                        >
                          STEP {index + 1}
                        </span>

                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                          style={{
                            background: '#FFBF00',
                            color: '#1E1E1E',
                          }}
                        >
                          {index + 1}
                        </div>

                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">

                      <p
                        className="text-base leading-relaxed font-medium"
                        style={{
                          color: '#1E1E1E',
                        }}
                      >
                        {item}
                      </p>

                    </div>

                  </div>

                  {/* Arrow Connector */}
                  {index < data.next90Days.length - 1 && (
                    <div className="flex-shrink-0 flex items-center justify-center">

                      <svg
                        width="70"
                        height="24"
                        viewBox="0 0 70 24"
                        fill="none"
                      >
                        <path
                          d="M0 12 H55"
                          stroke="#FFBF00"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        <path
                          d="M48 5 L62 12 L48 19"
                          stroke="#FF7900"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>

                    </div>
                  )}

                </React.Fragment>
              ))}

            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-5 flex items-center justify-between px-4 py-3 rounded-xl"
            style={{
              background: 'rgba(255,191,0,0.05)',
              border: '1px solid rgba(255,191,0,0.10)',
            }}
          >
            <span
              className="text-xs font-semibold"
              style={{ color: '#5C5C5C' }}
            >
              Total Milestones
            </span>

            <span
              className="font-bold"
              style={{ color: '#FF7900' }}
            >
              {data.next90Days.length}
            </span>
          </div>
        </div>
      )}

      {/* Strategic Product Recommendation Memo */}
      {data.analysis && (
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: '#FCFAF5',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5"
            style={{
              background: 'linear-gradient(90deg, rgba(255,191,0,0.08), rgba(255,121,0,0.05))',
              borderBottom: '1px solid rgba(255,191,0,0.12)',
            }}
          >
            <div className="flex items-center gap-3">

              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(255,191,0,0.10)',
                  border: '1px solid rgba(255,191,0,0.15)',
                }}
              >
                <Layers
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: '#1E1E1E' }}
                >
                  Strategic Product Recommendation
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Executive product strategy assessment and recommendations
                </p>
              </div>

            </div>
          </div>

          {/* Executive Banner */}
          <div
            className="px-6 py-4"
            style={{
              background: 'rgba(255,191,0,0.04)',
              borderBottom: '1px solid rgba(255,191,0,0.08)',
            }}
          >
            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: '#FFBF00',
                  color: '#1E1E1E',
                }}
              >
                ✓
              </div>

              <div>
                <div
                  className="text-sm font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Product Strategy Executive Memo
                </div>

                <div
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  AI-generated strategic guidance for founders and leadership teams
                </div>
              </div>

            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div
              className="rounded-2xl p-5"
              style={{
                background: '#F9F6EE',
                border: '1px solid rgba(0,0,0,0.05)',
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
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              background: 'rgba(255,191,0,0.03)',
              borderTop: '1px solid rgba(255,191,0,0.08)',
            }}
          >
            <span
              className="text-xs font-semibold"
              style={{ color: '#5C5C5C' }}
            >
              Generated by VentureVerse Product Strategy Agent
            </span>

            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(255,191,0,0.08)',
                color: '#FF7900',
              }}
            >
              Strategic Recommendation
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStrategySection;
