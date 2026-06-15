import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, Flame, CreditCard, BarChart2, RefreshCw, PiggyBank, Target, Activity, ArrowUpRight, ShieldCheck, Sparkles, ArrowUp, ArrowDown, Minus, Layers, Zap, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';
import ScoreGauge from '../ui/ScoreGauge';
import ExportReportModal from '../ui/ExportReportModal';

const parseToNumeric = (val) => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const cleaned = val.toString().replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  if (val.toString().toLowerCase().includes('k')) return parsed * 1000;
  if (val.toString().toLowerCase().includes('m')) return parsed * 1000000;
  return isNaN(parsed) ? 0 : parsed;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3 shadow-lg border" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#5C5C5C' }}>{label}</p>
        <p className="text-sm font-black" style={{ color: '#FF7900' }}>{payload[0].payload.formattedValue}</p>
        {payload[0].payload.growth && (
          <p className="text-[10px] font-bold mt-1" style={{ color: '#FFBF00' }}>↑ {payload[0].payload.growth}</p>
        )}
      </div>
    );
  }
  return null;
};

const renderCustomLabel = (props) => {
  const { x, y, width, formattedValue } = props;
  return (
    <text x={x + width / 2} y={y - 8} fill="#1E1E1E" textAnchor="middle" fontSize="11" fontWeight="900">
      {formattedValue}
    </text>
  );
};

const FinanceSection = ({ data, startupId, onReRunAgent, reRunningAgent, startupName = 'Venture' }) => {
  const [isExportOpen, setIsExportOpen] = useState(false);

  if (!data) return (
    <div className="p-6 text-center italic rounded-xl"
      style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
      No finance analysis data available. Run an analysis to generate insights.
    </div>
  );

  const isReRunning = reRunningAgent === 'finance';

  const rawY1 = parseToNumeric(data.year1Revenue);
  const rawY2 = parseToNumeric(data.year2Revenue);
  const rawY3 = parseToNumeric(data.year3Revenue);

  const revenueData = [
    data.year1Revenue && {
      name: 'Year 1',
      value: rawY1,
      formattedValue: data.year1Revenue,
      fill: '#FFBF00',
      growth: null
    },
    data.year2Revenue && {
      name: 'Year 2',
      value: rawY2,
      formattedValue: data.year2Revenue,
      fill: '#F2CF7E',
      growth: rawY1 > 0 ? Math.round(((rawY2 - rawY1) / rawY1) * 100) : null
    },
    data.year3Revenue && {
      name: 'Year 3',
      value: rawY3,
      formattedValue: data.year3Revenue,
      fill: '#FF7900',
      growth: rawY2 > 0 ? Math.round(((rawY3 - rawY2) / rawY2) * 100) : null
    },
  ].filter(Boolean);

  const getGrowthIcon = (growth) => {
    if (growth === null || growth === undefined) return null;
    const num = parseInt(growth);
    if (num > 0) return <ArrowUp className="h-2.5 w-2.5" style={{ color: '#FFBF00' }} />;
    if (num < 0) return <ArrowDown className="h-2.5 w-2.5" style={{ color: '#FF7900' }} />;
    return <Minus className="h-2.5 w-2.5" style={{ color: '#5C5C5C' }} />;
  };

  const averageRevenue = revenueData.length > 0
    ? revenueData.reduce((sum, item) => sum + item.value, 0) / revenueData.length
    : 0;

  const cagr = revenueData.length >= 2 && rawY1 > 0
    ? Math.round((Math.pow(rawY3 || rawY2, 1 / (revenueData.length - 1)) / Math.pow(rawY1, 1 / (revenueData.length - 1)) - 1) * 100)
    : null;

  const lastGrowth = revenueData.length >= 2 ? revenueData[revenueData.length - 1].growth : null;

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Finance Intelligence Hero */}
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
                <DollarSign
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
                  Finance CFO Dashboard
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
              Analyze capital requirements, revenue growth, profitability,
              customer economics, burn rate, runway, and long-term financial
              sustainability to determine overall venture health.
            </p>

            {/* Quick Highlights */}
            <div className="grid grid-cols-3 gap-3 mt-6">

              {data.requiredCapital && (
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
                    Capital Required
                  </p>

                  <p
                    className="font-bold mt-1"
                    style={{ color: '#FF7900' }}
                  >
                    {data.requiredCapital}
                  </p>
                </div>
              )}

              {data.runway && (
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
                    Runway
                  </p>

                  <p
                    className="font-bold mt-1"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.runway}
                  </p>
                </div>
              )}

              {data.ltvCacRatio && (
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
                    LTV / CAC
                  </p>

                  <p
                    className="font-bold mt-1"
                    style={{ color: '#1E1E1E' }}
                  >
                    {data.ltvCacRatio}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Right */}
          <div className="flex flex-col items-center gap-4">

            <ScoreGauge
              score={data.score}
              size={110}
              label="Score"
            />

            <div className="flex gap-2">


              {startupId && onReRunAgent && (
                <button
                  onClick={() => onReRunAgent('finance')}
                  disabled={isReRunning}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  style={{
                    background: '#F9F6EE',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#5C5C5C',
                  }}
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isReRunning ? 'animate-spin' : ''}`}
                  />

                  {isReRunning ? 'Running...' : 'Re-Run'}
                </button>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* Core Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {[
          { label: 'Customer Acquisition Cost', short: 'CAC', value: data.cac, icon: CreditCard, color: '#FF7900', tint: 'rgba(255,121,0,0.08)' },
          { label: 'Lifetime Value', short: 'LTV', value: data.ltv, icon: TrendingUp, color: '#FFBF00', tint: 'rgba(255,191,0,0.08)' },
          { label: 'LTV / CAC Ratio', short: 'Ratio', value: data.ltvCacRatio, icon: BarChart2, color: '#FF7900', tint: 'rgba(255,121,0,0.08)' },
          { label: 'Cash Runway', short: 'Runway', value: data.runway, icon: Clock, color: '#FFBF00', tint: 'rgba(255,191,0,0.08)' },
        ].map((metric) =>
          metric.value && (
            <div
              key={metric.label}
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#FCFAF5',
                border: '1px solid rgba(242,207,126,0.35)',
              }}
            >
              <div className="p-5">

                <div className="flex items-center justify-between mb-4">

                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: metric.tint,
                    }}
                  >
                    <metric.icon
                      className="w-5 h-5"
                      style={{ color: metric.color }}
                    />
                  </div>

                  <span
                    className="px-2 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      background: 'rgba(255,191,0,0.08)',
                      color: '#FF7900',
                    }}
                  >
                    {metric.short}
                  </span>

                </div>

                <p
                  className="text-[11px] uppercase font-bold tracking-wider mb-2"
                  style={{ color: '#5C5C5C' }}
                >
                  {metric.label}
                </p>

                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  {metric.value}
                </h3>

              </div>
            </div>
          )
        )}

      </div>

      {/* Burn Rate & Pricing Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {data.burnRate && (
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
                  <Flame
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Burn Rate Analysis
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Cash consumption and operational efficiency
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
                  {data.burnRate}
                </p>
              </div>

            </div>
          </div>
        )}

        {data.pricingStrategy && (
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
                  <DollarSign
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Pricing Strategy
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Revenue model and monetization approach
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
                  {data.pricingStrategy}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Revenue Forecast Dashboard */}
      {revenueData.length > 0 && (
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
                <BarChart2
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Revenue Forecast Dashboard
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Growth projections and future revenue outlook
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">
              {cagr !== null && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(255,191,0,0.08)',
                    color: '#FF7900',
                  }}
                >
                  CAGR {cagr}%
                </span>
              )}
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                  color: '#FF7900',
                }}
              >
                {revenueData.length} Year Outlook
              </span>
            </div>
          </div>

          {/* Summary Cards */}
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
                Projection Period
              </p>

              <p
                className="font-bold text-lg"
                style={{ color: '#1E1E1E' }}
              >
                {revenueData.length} Years
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
                Avg Revenue
              </p>

              <p
                className="font-bold"
                style={{ color: '#1E1E1E' }}
              >
                ${(averageRevenue / 1000).toFixed(0)}k
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
                Growth Trend
              </p>

              <p
                className="font-bold"
                style={{ color: '#FFBF00' }}
              >
                {cagr !== null ? `CAGR ${cagr}%` : 'Positive Outlook'}
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
                Revenue Potential
              </p>

              <p
                className="font-bold"
                style={{ color: '#FF7900' }}
              >
                Scalable
              </p>
            </div>

          </div>

          {/* Chart + Details */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">

            {/* Chart */}
            <div className="xl:col-span-2">

              <div
                className="rounded-2xl p-4 h-[340px]"
                style={{
                  background: '#F9F6EE',
                }}
              >
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={revenueData}
                    margin={{
                      top: 25,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,0,0,0.05)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: '#5C5C5C',
                        fontSize: 11,
                      }}
                      axisLine={{
                        stroke: 'rgba(0,0,0,0.08)',
                      }}
                    />

                    <YAxis
                      tick={{
                        fill: '#5C5C5C',
                        fontSize: 11,
                      }}
                      axisLine={{
                        stroke: 'rgba(0,0,0,0.08)',
                      }}
                    />

                    <ReferenceLine y={averageRevenue} stroke="rgba(255,191,0,0.3)" strokeDasharray="6 6"
                      label={{ value: 'Average', position: 'right', fill: '#FFBF00', fontSize: 10, fontWeight: 700 }} />

                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        fill: 'rgba(255,191,0,0.04)',
                      }}
                    />

                    <Bar
                      dataKey="value"
                      radius={[8, 8, 0, 0]}
                      animationDuration={900}
                    >
                      <LabelList dataKey="formattedValue" content={renderCustomLabel} />
                      {revenueData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.fill}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Revenue Breakdown */}
            <div>

              <div
                className="rounded-2xl p-5 h-full"
                style={{
                  background: '#F9F6EE',
                }}
              >
                <h4
                  className="font-bold mb-4"
                  style={{ color: '#1E1E1E' }}
                >
                  Revenue Breakdown
                </h4>

                <div className="space-y-3">

                  {revenueData.map((entry) => (
                    <div
                      key={entry.name}
                      className="p-4 rounded-xl"
                      style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(242,207,126,0.25)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">

                        <div className="flex items-center gap-2">

                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: entry.fill,
                            }}
                          />

                          <span
                            className="font-semibold text-sm"
                            style={{ color: '#1E1E1E' }}
                          >
                            {entry.name}
                          </span>

                        </div>

                        <span
                          className="font-bold text-sm"
                          style={{ color: '#FF7900' }}
                        >
                          {entry.formattedValue}
                        </span>

                      </div>

                      {entry.growth !== null && (
                        <div className="flex items-center gap-1 ml-5">
                          {getGrowthIcon(entry.growth)}
                          <span className="text-[10px] font-bold" style={{
                            color: entry.growth < 0 ? '#FF7900' : '#FFBF00'
                          }}>
                            {entry.growth > 0 ? '+' : ''}{entry.growth}% YoY
                          </span>
                        </div>
                      )}

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Fundraising & Capital Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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
                <PiggyBank
                  className="w-5 h-5"
                  style={{ color: '#FFBF00' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Fundraising Requirement
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Capital needed to achieve growth objectives
                </p>
              </div>

            </div>
          </div>

          <div className="p-6">

            {data.requiredCapital && (
              <div
                className="rounded-2xl p-5 mb-5"
                style={{
                  background: 'rgba(255,191,0,0.08)',
                  border: '1px solid rgba(255,191,0,0.15)',
                }}
              >
                <p
                  className="text-xs uppercase font-bold mb-2"
                  style={{ color: '#5C5C5C' }}
                >
                  Required Capital
                </p>

                <h2
                  className="text-3xl font-extrabold"
                  style={{ color: '#FF7900' }}
                >
                  {data.requiredCapital}
                </h2>
              </div>
            )}

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
                {data.fundraisingNeed}
              </p>
            </div>

          </div>
        </div>

        {data.useOfFunds && (
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
                  <DollarSign
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Use Of Funds
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Planned allocation of raised capital
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
                  {data.useOfFunds}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Sustainability & Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {data.profitabilityTimeline && (
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
                  <Clock
                    className="w-5 h-5"
                    style={{ color: '#FFBF00' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Profitability Timeline
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Expected path toward profitability
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
                  className="text-sm leading-7"
                  style={{ color: '#1E1E1E' }}
                >
                  {data.profitabilityTimeline}
                </p>
              </div>

            </div>
          </div>
        )}

        {data.financialSustainability && (
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
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: '#FF7900' }}
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#1E1E1E' }}
                  >
                    Financial Sustainability
                  </h3>

                  <p
                    className="text-xs"
                    style={{ color: '#5C5C5C' }}
                  >
                    Long-term financial viability assessment
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
                  {data.financialSustainability}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Executive Financial Assessment */}
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
                <DollarSign
                  className="w-5 h-5"
                  style={{ color: '#FF7900' }}
                />
              </div>

              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#1E1E1E' }}
                >
                  Executive Financial Assessment
                </h3>

                <p
                  className="text-xs"
                  style={{ color: '#5C5C5C' }}
                >
                  Comprehensive CFO analysis of venture financial health
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
              Financial Analysis
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
                Finance Score
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
                Capital Required
              </p>

              <p
                className="font-bold"
                style={{ color: '#1E1E1E' }}
              >
                {data.requiredCapital || 'Not Specified'}
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
                Runway
              </p>

              <p
                className="font-bold"
                style={{ color: '#1E1E1E' }}
              >
                {data.runway || 'Not Specified'}
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

          {/* Analysis Content */}
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
                Based on the financial analysis, focus on optimizing capital allocation, extending runway through efficient burn management, and strengthening unit economics to improve LTV/CAC ratio. Prioritize revenue growth while maintaining sustainable margins to achieve investment-grade financial health.
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

export default FinanceSection;