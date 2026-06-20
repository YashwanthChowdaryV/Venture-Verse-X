import React, { useState } from 'react';
import {
    TrendingUp, DollarSign, BarChart2, Zap, Target,
    ArrowUpRight, ArrowDownRight, Lightbulb, AlertTriangle
} from 'lucide-react';
import ScoreGauge from '../ui/ScoreGauge';
import ExportReportModal from '../ui/ExportReportModal';

const InvestorSection = ({ data, startupName = 'Venture' }) => {
    if (!data) return (
        <div className="p-6 text-center italic rounded-xl"
            style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
            No investor analysis data available. Run an analysis to generate insights.
        </div>
    );

    const [isExportOpen, setIsExportOpen] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in-up">

            {/* Executive Investment Verdict Hero */}
            <div
                className="rounded-3xl p-8"
                style={{
                    background: 'linear-gradient(135deg, #FCFAF5 0%, rgba(242,207,126,0.18) 100%)',
                    border: '1px solid rgba(242,207,126,0.45)',
                }}
            >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                    <div className="flex-1">

                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className="p-3 rounded-2xl"
                                style={{
                                    background: 'rgba(255,191,0,0.10)',
                                    border: '1px solid rgba(255,191,0,0.25)',
                                }}
                            >
                                <TrendingUp
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
                                    Investment Verdict
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-5">
                            <span
                                className="px-4 py-1.5 rounded-full text-xs font-bold"
                                style={{
                                    background: 'rgba(255,191,0,0.10)',
                                    color: '#FF7900',
                                    border: '1px solid rgba(255,191,0,0.25)',
                                }}
                            >
                                {data.verdict || 'Investment Assessment'}
                            </span>

                            <span
                                className="px-4 py-1.5 rounded-full text-xs font-bold"
                                style={{
                                    background: 'rgba(255,191,0,0.10)',
                                    color: '#FF7900',
                                    border: '1px solid rgba(255,191,0,0.25)',
                                }}
                            >
                                {startupName}
                            </span>
                        </div>

                        <p
                            className="text-sm leading-7 max-w-3xl"
                            style={{ color: '#5C5C5C' }}
                        >
                            {data.investmentAttractiveness ||
                                'AI-powered investment assessment generated using market opportunity, scalability, fundability, competition, and growth potential.'}
                        </p>

                    </div>

                    <div className="flex flex-col items-center gap-4">

                        <ScoreGauge
                            score={data.score}
                            size={110}
                            label="Score"
                        />

                    </div>

                </div>
            </div>

            {/* Investment Score Breakdown */}
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
                                Investment Score Breakdown
                            </h3>
                            <p
                                className="text-xs"
                                style={{ color: '#5C5C5C' }}
                            >
                                Detailed scoring across key investment dimensions
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {[
                        {
                            label: 'Market Potential',
                            score: Math.min(100, Math.max(60, (data.score || 70) + 8)),
                        },
                        {
                            label: 'Scalability',
                            score: Math.min(100, Math.max(55, (data.score || 70))),
                        },
                        {
                            label: 'Revenue Potential',
                            score: Math.min(100, Math.max(50, (data.score || 70) - 3)),
                        },
                        {
                            label: 'Fundability',
                            score: Math.min(100, Math.max(60, (data.score || 70) + 4)),
                        },
                        {
                            label: 'Competitive Position',
                            score: Math.min(100, Math.max(50, (data.score || 70) - 8)),
                        },
                    ].map((item) => (
                        <div key={item.label} className="mb-5 last:mb-0">
                            <div className="flex justify-between mb-2">
                                <span
                                    className="text-sm font-semibold"
                                    style={{ color: '#1E1E1E' }}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className="text-sm font-bold"
                                    style={{ color: '#FF7900' }}
                                >
                                    {item.score}/100
                                </span>
                            </div>
                            <div
                                className="w-full h-3 rounded-full overflow-hidden"
                                style={{ background: 'rgba(242,207,126,0.25)' }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${item.score}%`,
                                        background: '#FFBF00',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market Opportunity */}
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
                                style={{ color: '#FF7900' }}
                            />
                        </div>
                        <div>
                            <h3
                                className="text-lg font-bold"
                                style={{ color: '#1E1E1E' }}
                            >
                                Market Opportunity
                            </h3>
                            <p
                                className="text-xs"
                                style={{ color: '#5C5C5C' }}
                            >
                                TAM, SAM, SOM analysis and investor metrics
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* TAM SAM SOM */}
                        <div className="space-y-4">
                            {data.tam && (
                                <div
                                    className="rounded-2xl p-5"
                                    style={{
                                        background: 'rgba(255,191,0,0.08)',
                                        border: '1px solid rgba(255,191,0,0.15)',
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart2 className="w-4 h-4" style={{ color: '#FF7900' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#5C5C5C' }}>
                                            Total Addressable Market (TAM)
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold" style={{ color: '#1E1E1E' }}>{data.tam}</p>
                                </div>
                            )}

                            {data.sam && (
                                <div
                                    className="rounded-2xl p-5 ml-6"
                                    style={{
                                        background: 'rgba(255,121,0,0.05)',
                                        border: '1px solid rgba(255,121,0,0.12)',
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4" style={{ color: '#FF7900' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#5C5C5C' }}>
                                            Serviceable Available Market (SAM)
                                        </span>
                                    </div>
                                    <p className="text-base font-bold" style={{ color: '#1E1E1E' }}>{data.sam}</p>
                                </div>
                            )}

                            {data.som && (
                                <div
                                    className="rounded-2xl p-5 ml-12"
                                    style={{
                                        background: 'rgba(34,197,94,0.05)',
                                        border: '1px solid rgba(34,197,94,0.15)',
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4" style={{ color: '#22C55E' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#5C5C5C' }}>
                                            Serviceable Obtainable Market (SOM)
                                        </span>
                                    </div>
                                    <p className="text-base font-bold" style={{ color: '#1E1E1E' }}>{data.som}</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Investor Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>Fundability</p>
                                <p className="text-sm font-semibold" style={{ color: '#1E1E1E' }}>{data.fundability || 'Moderate'}</p>
                            </div>
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>VC Appeal</p>
                                <p className="text-sm font-semibold" style={{ color: '#1E1E1E' }}>{data.vcAppeal || 'Medium'}</p>
                            </div>
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>Startup Stage</p>
                                <p className="text-sm font-semibold" style={{ color: '#1E1E1E' }}>{data.startupStageFit || 'Early Stage'}</p>
                            </div>
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>Investor Interest</p>
                                <p className="text-sm font-semibold" style={{ color: '#FF7900' }}>
                                    {data.score >= 80 ? 'High' : data.score >= 60 ? 'Moderate' : 'Low'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fundraising Readiness & Investor Signals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fundraising Readiness */}
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
                                <DollarSign className="w-5 h-5" style={{ color: '#FF7900' }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Fundraising Readiness</h3>
                                <p className="text-xs" style={{ color: '#5C5C5C' }}>Capital readiness and investor appeal metrics</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {[
                            { label: 'Fundability', value: data.fundability || 'Moderate' },
                            { label: 'VC Appeal', value: data.vcAppeal || 'Medium' },
                            { label: 'Stage Fit', value: data.startupStageFit || 'Early Stage' },
                        ].map((item) => (
                            <div key={item.label} className="mb-5 last:mb-0">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold" style={{ color: '#1E1E1E' }}>{item.label}</span>
                                    <span className="text-xs font-bold" style={{ color: '#FF7900' }}>{item.value}</span>
                                </div>
                                <div
                                    className="w-full h-2 rounded-full overflow-hidden"
                                    style={{ background: 'rgba(242,207,126,0.25)' }}
                                >
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: item.label === 'Fundability'
                                                ? `${Math.min(100, Math.max(50, data.score || 70))}%`
                                                : item.label === 'VC Appeal'
                                                    ? `${Math.min(100, Math.max(55, (data.score || 70) - 5))}%`
                                                    : `${Math.min(100, Math.max(60, (data.score || 70) + 3))}%`,
                                            background: '#FFBF00',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Investor Signals */}
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
                                <AlertTriangle className="w-5 h-5" style={{ color: '#FF7900' }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Investor Signals</h3>
                                <p className="text-xs" style={{ color: '#5C5C5C' }}>Key indicators for investment decision-making</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div
                            className="rounded-2xl p-4"
                            style={{
                                background: 'rgba(34,197,94,0.05)',
                                border: '1px solid rgba(34,197,94,0.12)',
                            }}
                        >
                            <h4 className="text-sm font-bold mb-2" style={{ color: '#22C55E' }}>Positive Signals</h4>
                            <ul className="space-y-2 text-sm" style={{ color: '#1E1E1E' }}>
                                <li>✓ Market opportunity identified</li>
                                <li>✓ Investor score generated</li>
                                <li>✓ Venture scalability assessed</li>
                            </ul>
                        </div>

                        <div
                            className="rounded-2xl p-4"
                            style={{
                                background: 'rgba(239,68,68,0.05)',
                                border: '1px solid rgba(239,68,68,0.12)',
                            }}
                        >
                            <h4 className="text-sm font-bold mb-2" style={{ color: '#EF4444' }}>Watch Areas</h4>
                            <ul className="space-y-2 text-sm" style={{ color: '#1E1E1E' }}>
                                <li>⚠ Traction validation required</li>
                                <li>⚠ Competitive pressure assessment</li>
                                <li>⚠ Revenue execution risk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Invest vs Why Not Invest */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Why Investors Would Invest */}
                <div
                    className="rounded-3xl overflow-hidden"
                    style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(34,197,94,0.20)',
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
                                    background: 'rgba(34,197,94,0.08)',
                                }}
                            >
                                <TrendingUp className="w-5 h-5" style={{ color: '#22C55E' }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Why Investors Would Invest</h3>
                                <p className="text-xs" style={{ color: '#5C5C5C' }}>Key investment strengths and opportunities</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,197,94,0.05)' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: '#22C55E', color: '#fff' }}>✓</div>
                                <div>
                                    <h4 className="font-semibold mb-1" style={{ color: '#1E1E1E' }}>Investment Attractiveness</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
                                        {data.investmentAttractiveness || 'Strong investment potential identified by AI evaluation.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,197,94,0.05)' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: '#22C55E', color: '#fff' }}>✓</div>
                                <div>
                                    <h4 className="font-semibold mb-1" style={{ color: '#1E1E1E' }}>Market Opportunity</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
                                        {data.marketSize || 'Large addressable market with meaningful growth opportunity.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,197,94,0.05)' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: '#22C55E', color: '#fff' }}>✓</div>
                                <div>
                                    <h4 className="font-semibold mb-1" style={{ color: '#1E1E1E' }}>Scalability Potential</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
                                        Business model demonstrates potential for scalable growth and expansion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Potential Reasons For Rejection */}
                <div
                    className="rounded-3xl overflow-hidden"
                    style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(239,68,68,0.20)',
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
                                    background: 'rgba(239,68,68,0.08)',
                                }}
                            >
                                <AlertTriangle className="w-5 h-5" style={{ color: '#EF4444' }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Potential Reasons For Rejection</h3>
                                <p className="text-xs" style={{ color: '#5C5C5C' }}>Risk factors and concerns for investors</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="rounded-2xl p-4" style={{ background: 'rgba(239,68,68,0.05)' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: '#EF4444', color: '#fff' }}>!</div>
                                <div>
                                    <h4 className="font-semibold mb-1" style={{ color: '#1E1E1E' }}>Execution Risk</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
                                        Market opportunity exists, but successful execution remains critical.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl p-4" style={{ background: 'rgba(239,68,68,0.05)' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: '#EF4444', color: '#fff' }}>!</div>
                                <div>
                                    <h4 className="font-semibold mb-1" style={{ color: '#1E1E1E' }}>Competitive Pressure</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
                                        Competitive differentiation must remain sustainable over time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl p-4" style={{ background: 'rgba(239,68,68,0.05)' }}>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ background: '#EF4444', color: '#fff' }}>!</div>
                                <div>
                                    <h4 className="font-semibold mb-1" style={{ color: '#1E1E1E' }}>Traction Validation</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
                                        Investors may require stronger customer validation and market proof.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic SWOT Intelligence */}
            {(data.strengths?.length > 0 ||
                data.weaknesses?.length > 0 ||
                data.opportunities?.length > 0 ||
                data.threats?.length > 0) && (
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
                                    <Target className="w-5 h-5" style={{ color: '#FF7900' }} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Strategic SWOT Analysis</h3>
                                    <p className="text-xs" style={{ color: '#5C5C5C' }}>AI-generated competitive positioning assessment</p>
                                </div>
                            </div>
                            <div
                                className="px-3 py-1 rounded-full text-xs font-bold"
                                style={{
                                    background: 'rgba(255,191,0,0.08)',
                                    color: '#FF7900',
                                }}
                            >
                                {[...(data.strengths || []), ...(data.weaknesses || []), ...(data.opportunities || []), ...(data.threats || [])].length} Insights
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-6">
                            {/* Strengths */}
                            <div
                                className="rounded-2xl p-5"
                                style={{
                                    background: 'rgba(34,197,94,0.04)',
                                    border: '1px solid rgba(34,197,94,0.12)',
                                }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <ArrowUpRight className="w-5 h-5" style={{ color: '#22C55E' }} />
                                        <h4 className="font-bold" style={{ color: '#22C55E' }}>Strengths</h4>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                                        style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>
                                        {(data.strengths || []).length}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {(data.strengths || []).map((item, index) => (
                                        <div key={index} className="flex gap-3 text-sm">
                                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#22C55E' }} />
                                            <span style={{ color: '#1E1E1E' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Weaknesses */}
                            <div
                                className="rounded-2xl p-5"
                                style={{
                                    background: 'rgba(239,68,68,0.04)',
                                    border: '1px solid rgba(239,68,68,0.12)',
                                }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <ArrowDownRight className="w-5 h-5" style={{ color: '#EF4444' }} />
                                        <h4 className="font-bold" style={{ color: '#EF4444' }}>Weaknesses</h4>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                                        style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
                                        {(data.weaknesses || []).length}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {(data.weaknesses || []).map((item, index) => (
                                        <div key={index} className="flex gap-3 text-sm">
                                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#EF4444' }} />
                                            <span style={{ color: '#1E1E1E' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Opportunities */}
                            <div
                                className="rounded-2xl p-5"
                                style={{
                                    background: 'rgba(255,191,0,0.04)',
                                    border: '1px solid rgba(255,191,0,0.12)',
                                }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5" style={{ color: '#FFBF00' }} />
                                        <h4 className="font-bold" style={{ color: '#FF7900' }}>Opportunities</h4>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                                        style={{ background: 'rgba(255,191,0,0.12)', color: '#FF7900' }}>
                                        {(data.opportunities || []).length}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {(data.opportunities || []).map((item, index) => (
                                        <div key={index} className="flex gap-3 text-sm">
                                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#FFBF00' }} />
                                            <span style={{ color: '#1E1E1E' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Threats */}
                            <div
                                className="rounded-2xl p-5"
                                style={{
                                    background: 'rgba(255,121,0,0.04)',
                                    border: '1px solid rgba(255,121,0,0.12)',
                                }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" style={{ color: '#FF7900' }} />
                                        <h4 className="font-bold" style={{ color: '#FF7900' }}>Threats</h4>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                                        style={{ background: 'rgba(255,121,0,0.12)', color: '#FF7900' }}>
                                        {(data.threats || []).length}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {(data.threats || []).map((item, index) => (
                                        <div key={index} className="flex gap-3 text-sm">
                                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#FF7900' }} />
                                            <span style={{ color: '#1E1E1E' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* Long-Term Growth Opportunity */}
            {data.longTermOpportunity && (
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
                                <Zap className="w-5 h-5" style={{ color: '#FF7900' }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Long-Term Growth Opportunity</h3>
                                <p className="text-xs" style={{ color: '#5C5C5C' }}>Strategic outlook and future expansion potential</p>
                            </div>
                        </div>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                                background: 'rgba(255,191,0,0.08)',
                                color: '#FF7900',
                            }}
                        >
                            Future Outlook
                        </span>
                    </div>

                    <div className="p-6">
                        <div className="rounded-2xl p-5" style={{ background: '#F9F6EE' }}>
                            <p className="text-sm leading-8 whitespace-pre-line" style={{ color: '#1E1E1E' }}>
                                {data.longTermOpportunity}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs font-bold uppercase mb-2" style={{ color: '#5C5C5C' }}>Growth Potential</p>
                                <p className="font-bold" style={{ color: '#22C55E' }}>High</p>
                            </div>
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs font-bold uppercase mb-2" style={{ color: '#5C5C5C' }}>Market Expansion</p>
                                <p className="font-bold" style={{ color: '#FF7900' }}>Scalable</p>
                            </div>
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background: '#F9F6EE',
                                    border: '1px solid rgba(242,207,126,0.25)',
                                }}
                            >
                                <p className="text-xs font-bold uppercase mb-2" style={{ color: '#5C5C5C' }}>Investor Outlook</p>
                                <p className="font-bold" style={{ color: '#FF7900' }}>
                                    {data.score >= 80 ? 'Strong' : data.score >= 60 ? 'Promising' : 'Uncertain'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Executive Investment Memo */}
            {data.analysis && (
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
                                <TrendingUp className="w-5 h-5" style={{ color: '#FF7900' }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Executive Investment Memo</h3>
                                <p className="text-xs" style={{ color: '#5C5C5C' }}>Comprehensive investor recommendation generated by VentureVerse AI</p>
                            </div>
                        </div>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                                background: 'rgba(255,191,0,0.08)',
                                color: '#FF7900',
                            }}
                        >
                            {data.verdict || 'Assessment'}
                        </span>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6"
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,0.06)',
                        }}
                    >
                        <div className="rounded-2xl p-4" style={{ background: '#F9F6EE' }}>
                            <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>Investment Verdict</p>
                            <p className="font-bold" style={{ color: '#FF7900' }}>{data.verdict || 'Review Required'}</p>
                        </div>
                        <div className="rounded-2xl p-4" style={{ background: '#F9F6EE' }}>
                            <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>Investor Score</p>
                            <p className="font-bold" style={{ color: '#1E1E1E' }}>{data.score}/100</p>
                        </div>
                        <div className="rounded-2xl p-4" style={{ background: '#F9F6EE' }}>
                            <p className="text-xs uppercase font-bold mb-2" style={{ color: '#5C5C5C' }}>Investment Outlook</p>
                            <p className="font-bold" style={{ color: '#FF7900' }}>
                                {data.score >= 80 ? 'Strong' : data.score >= 60 ? 'Promising' : 'High Risk'}
                            </p>
                        </div>
                    </div>

                    <div className="p-6">
                        <div
                            className="rounded-2xl p-6"
                            style={{
                                background: '#F9F6EE',
                                border: '1px solid rgba(242,207,126,0.25)',
                            }}
                        >
                            <p className="text-sm leading-8 whitespace-pre-line" style={{ color: '#1E1E1E' }}>
                                {data.analysis}
                            </p>
                        </div>

                        <div
                            className="mt-5 rounded-2xl p-5"
                            style={{
                                background: 'rgba(255,191,0,0.05)',
                                border: '1px solid rgba(255,191,0,0.15)',
                            }}
                        >
                            <h4 className="font-bold mb-3" style={{ color: '#FF7900' }}>Strategic Recommendation</h4>
                            <p className="text-sm leading-7" style={{ color: '#1E1E1E' }}>
                                Based on the investor analysis, focus on strengthening market positioning, building defensible competitive advantages, and demonstrating clear traction metrics to improve investor confidence and maximize fundraising potential.
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

export default InvestorSection;