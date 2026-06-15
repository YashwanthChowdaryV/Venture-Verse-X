import React, { useState } from 'react';
import {
    FileText, Zap, AlertTriangle, CheckCircle, XCircle, ArrowRight, Shield, Target
} from 'lucide-react';
import ExportReportModal from '../ui/ExportReportModal';

const ExecutiveSummarySection = ({ data, overallScore, finalVerdict, startupName = 'Venture' }) => {
    if (!data) return (
        <div className="p-6 text-center italic rounded-xl"
            style={{ color: '#5C5C5C', background: '#FCFAF5', border: '1px solid rgba(0,0,0,0.08)' }}>
            No executive summary data available. Run an analysis to generate insights.
        </div>
    );

    const [isExportOpen, setIsExportOpen] = useState(false);

    return (
        <div className="space-y-5 animate-fade-in-up">

            {/* Capital Strategy & Investor Decision */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {data.investmentRecommendation && (
                    <div
                        className="relative overflow-hidden rounded-[26px] p-6"
                        style={{
                            background: '#FCFAF5',
                            border: '1px solid rgba(242,207,126,0.35)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                        }}
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="p-2.5 rounded-xl"
                                    style={{
                                        background: 'rgba(255,121,0,0.08)',
                                        border: '1px solid rgba(255,121,0,0.12)'
                                    }}
                                >
                                    <Target className="w-5 h-5" style={{ color: '#FF7900' }} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                        Investor Decision
                                    </p>
                                    <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#1E1E1E' }}>
                                        Investment Recommendation
                                    </h3>
                                </div>
                            </div>

                            <div className="rounded-xl p-5" style={{ background: '#F9F6EE' }}>
                                <p className="text-sm leading-7 whitespace-pre-line font-medium" style={{ color: '#1E1E1E' }}>
                                    {data.investmentRecommendation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {data.fundraisingRecommendation && (
                    <div
                        className="relative overflow-hidden rounded-[26px] p-6"
                        style={{
                            background: '#FCFAF5',
                            border: '1px solid rgba(242,207,126,0.35)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                        }}
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="p-2.5 rounded-xl"
                                    style={{
                                        background: 'rgba(255,191,0,0.08)',
                                        border: '1px solid rgba(255,191,0,0.12)'
                                    }}
                                >
                                    <Zap className="w-5 h-5" style={{ color: '#FFBF00' }} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                        Capital Strategy
                                    </p>
                                    <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#1E1E1E' }}>
                                        Fundraising Recommendation
                                    </h3>
                                </div>
                            </div>

                            <div className="rounded-xl p-5" style={{ background: '#F9F6EE' }}>
                                <p className="text-sm leading-7 whitespace-pre-line font-medium" style={{ color: '#1E1E1E' }}>
                                    {data.fundraisingRecommendation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Executive SWOT Snapshot */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {data.topStrengths?.length > 0 && (
                    <div
                        className="relative overflow-hidden rounded-[26px] p-6"
                        style={{
                            background: '#FCFAF5',
                            border: '1px solid rgba(242,207,126,0.35)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                        }}
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="p-2.5 rounded-xl"
                                    style={{
                                        background: 'rgba(34,197,94,0.08)',
                                        border: '1px solid rgba(34,197,94,0.15)'
                                    }}
                                >
                                    <CheckCircle className="w-5 h-5" style={{ color: '#22C55E' }} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                        Strategic Advantages
                                    </p>
                                    <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#22C55E' }}>
                                        Top Strengths
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {data.topStrengths.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 p-4 rounded-xl"
                                        style={{
                                            background: '#F9F6EE',
                                            border: '1px solid rgba(242,207,126,0.15)'
                                        }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                                            style={{
                                                background: 'rgba(34,197,94,0.12)',
                                                color: '#22C55E'
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                        <p className="text-sm leading-relaxed font-medium" style={{ color: '#1E1E1E' }}>
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {data.topWeaknesses?.length > 0 && (
                    <div
                        className="relative overflow-hidden rounded-[26px] p-6"
                        style={{
                            background: '#FCFAF5',
                            border: '1px solid rgba(242,207,126,0.35)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                        }}
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="p-2.5 rounded-xl"
                                    style={{
                                        background: 'rgba(255,121,0,0.08)',
                                        border: '1px solid rgba(255,121,0,0.15)'
                                    }}
                                >
                                    <XCircle className="w-5 h-5" style={{ color: '#FF7900' }} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                        Critical Concerns
                                    </p>
                                    <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#FF7900' }}>
                                        Top Weaknesses
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {data.topWeaknesses.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 p-4 rounded-xl"
                                        style={{
                                            background: '#F9F6EE',
                                            border: '1px solid rgba(242,207,126,0.15)'
                                        }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                                            style={{
                                                background: 'rgba(255,121,0,0.12)',
                                                color: '#FF7900'
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                        <p className="text-sm leading-relaxed font-medium" style={{ color: '#1E1E1E' }}>
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* CEO Action Plan */}
            {data.immediateActions?.length > 0 && (
                <div
                    className="relative overflow-hidden rounded-[26px] p-6"
                    style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(242,207,126,0.35)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="p-2.5 rounded-xl"
                                style={{
                                    background: 'rgba(255,121,0,0.08)',
                                    border: '1px solid rgba(255,121,0,0.15)'
                                }}
                            >
                                <ArrowRight className="w-5 h-5" style={{ color: '#FF7900' }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                    Execution Blueprint
                                </p>
                                <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#1E1E1E' }}>
                                    Immediate Actions Required
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {data.immediateActions.map((action, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl p-4"
                                    style={{
                                        background: '#F9F6EE',
                                        border: '1px solid rgba(242,207,126,0.15)'
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black"
                                            style={{
                                                background: 'rgba(255,121,0,0.12)',
                                                color: '#FF7900',
                                                border: '1px solid rgba(255,121,0,0.15)'
                                            }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: '#FF7900' }}>
                                                Priority Task
                                            </div>
                                            <p className="text-sm leading-7 font-medium" style={{ color: '#1E1E1E' }}>
                                                {action}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Executive Risk Radar */}
            {data.keyRisks?.length > 0 && (
                <div
                    className="relative overflow-hidden rounded-[26px] p-6"
                    style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(242,207,126,0.35)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="p-2.5 rounded-xl"
                                style={{
                                    background: 'rgba(239,68,68,0.08)',
                                    border: '1px solid rgba(239,68,68,0.15)'
                                }}
                            >
                                <AlertTriangle className="w-5 h-5" style={{ color: '#EF4444' }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                    Board Alert
                                </p>
                                <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#1E1E1E' }}>
                                    Critical Risks & Watchpoints
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {data.keyRisks.map((risk, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl p-4"
                                    style={{
                                        background: '#F9F6EE',
                                        border: '1px solid rgba(242,207,126,0.15)'
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: 'rgba(239,68,68,0.12)',
                                                border: '1px solid rgba(239,68,68,0.15)'
                                            }}
                                        >
                                            <Shield className="w-4 h-4" style={{ color: '#EF4444' }} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: '#EF4444' }}>
                                                Risk #{String(i + 1).padStart(2, '0')}
                                            </div>
                                            <p className="text-sm leading-7 font-medium" style={{ color: '#1E1E1E' }}>
                                                {risk}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Executive Narrative */}
            {data.executiveSummary && (
                <div
                    className="relative overflow-hidden rounded-[26px] p-6"
                    style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(242,207,126,0.35)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 8px 24px rgba(30,30,30,0.03)'
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="p-2.5 rounded-xl"
                                style={{
                                    background: 'rgba(255,191,0,0.08)',
                                    border: '1px solid rgba(255,191,0,0.15)'
                                }}
                            >
                                <FileText className="w-5 h-5" style={{ color: '#FFBF00' }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                                    Board Assessment
                                </p>
                                <h3 className="text-lg font-black tracking-[-0.02em]" style={{ color: '#1E1E1E' }}>
                                    Executive Investment Narrative
                                </h3>
                            </div>
                        </div>

                        <div className="rounded-xl p-5" style={{ background: '#F9F6EE', border: '1px solid rgba(242,207,126,0.12)' }}>
                            <p className="text-sm leading-8 whitespace-pre-line font-medium" style={{ color: '#1E1E1E' }}>
                                {data.executiveSummary}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Investment Committee Recommendation */}
            {data.finalRecommendation && (
                <div
                    className="relative overflow-hidden rounded-[26px] p-7"
                    style={{
                        background: '#FCFAF5',
                        border: '1px solid rgba(242,207,126,0.40)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.015), 0 16px 48px rgba(30,30,30,0.05), 0 24px 70px rgba(255,121,0,0.04)'
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="p-3 rounded-xl"
                                style={{
                                    background: 'rgba(255,191,0,0.10)',
                                    border: '1px solid rgba(255,191,0,0.18)'
                                }}
                            >
                                <Zap className="w-6 h-6" style={{ color: '#FFBF00' }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#FF7900' }}>
                                    Investment Committee Decision
                                </p>
                                <h3 className="text-xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>
                                    Final Recommendation
                                </h3>
                            </div>
                        </div>

                        <div className="rounded-xl p-5" style={{ background: '#F9F6EE', border: '1px solid rgba(242,207,126,0.12)' }}>
                            <p className="text-base leading-8 font-medium" style={{ color: '#1E1E1E' }}>
                                {data.finalRecommendation}
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

export default ExecutiveSummarySection;