import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, Outlet, useNavigate } from 'react-router-dom';
import { startupAPI, orchestratorAPI, agentAPI } from '../api/api';
import { toast } from 'react-hot-toast';
import { SkeletonReport } from '../components/ui/SkeletonLoader';
import AnalysisLoadingWorkspace from '../components/ui/AnalysisLoadingWorkspace';
import Lightfall from '../components/Lightfall';

const StartupWorkspaceLayout = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [startup, setStartup] = useState(null);
    const [report, setReport] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [reRunningAgent, setReRunningAgent] = useState(null);

    const reportIdFromQuery = searchParams.get('reportId');
    const isHistorical = !!reportIdFromQuery;

    // Fetch startup + history on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [startupData, historyData] = await Promise.all([
                    startupAPI.getStartupById(id),
                    orchestratorAPI.getReportHistory(id)
                ]);
                setStartup(startupData);
                setHistory(historyData || []);

                // Load specific report or latest
                if (reportIdFromQuery) {
                    const reportData = await orchestratorAPI.getReport(reportIdFromQuery);
                    setReport(reportData);
                } else if (historyData && historyData.length > 0) {
                    const latestId = historyData[0].reportId || historyData[0].id;
                    try {
                        const reportData = await orchestratorAPI.getReport(latestId);
                        setReport(reportData);
                    } catch {
                        setReport(null);
                    }
                }
            } catch (err) {
                console.error('Failed to load workspace data:', err);
                toast.error('Failed to load startup workspace');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, reportIdFromQuery]);

    // Full analysis orchestrator
    const runFullAnalysis = useCallback(async () => {
        setAnalyzing(true);
        const loadToast = toast.loading('Running AI Orchestrator — analyzing all dimensions...');
        try {
            const data = await orchestratorAPI.analyzeStartup(id);
            setReport(data);
            const updatedHistory = await orchestratorAPI.getReportHistory(id);
            setHistory(updatedHistory || []);
            toast.success('AI analysis complete!', { id: loadToast });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || 'Analysis failed';
            toast.error(`Error: ${errMsg}`, { id: loadToast });
        } finally {
            setAnalyzing(false);
        }
    }, [id]);

    // Individual agent re-run
    const handleReRunAgent = useCallback(async (agentType) => {
        setReRunningAgent(agentType);
        const runToast = toast.loading(`Running ${agentType} evaluation...`);
        try {
            let data, scoreField, detailsField;
            switch (agentType) {
                case 'investor':
                    data = await agentAPI.analyzeInvestor(id);
                    scoreField = 'investmentScore'; detailsField = 'investorDetails'; break;
                case 'competitor':
                    data = await agentAPI.analyzeCompetitor(id);
                    scoreField = 'competitionScore'; detailsField = 'competitorDetails'; break;
                case 'customer':
                    data = await agentAPI.analyzeCustomer(id);
                    scoreField = 'customerScore'; detailsField = 'customerDetails'; break;
                case 'finance':
                    data = await agentAPI.analyzeFinance(id);
                    scoreField = 'financialScore'; detailsField = 'financeDetails'; break;
                case 'risk':
                    data = await agentAPI.analyzeRisk(id);
                    scoreField = 'riskScore'; detailsField = 'riskDetails'; break;
                case 'productStrategy':
                    data = await agentAPI.analyzeProductStrategy(id);
                    scoreField = 'productStrategyScore'; detailsField = 'productStrategyDetails'; break;
                default: throw new Error('Unknown agent type');
            }

            setReport((prev) => {
                if (!prev) return prev;
                const next = { ...prev };
                next[detailsField] = data;
                next[scoreField] = data.score;
                // Recalculate overall
                const inv = next.investmentScore ?? next.investorDetails?.score ?? 0;
                const comp = next.competitionScore ?? next.competitorDetails?.score ?? 0;
                const fin = next.financialScore ?? next.financeDetails?.score ?? 0;
                const cust = next.customerScore ?? next.customerDetails?.score ?? 0;
                const rsk = next.riskScore ?? next.riskDetails?.score ?? 0;
                const prod = next.productStrategyScore ?? next.productStrategyDetails?.score ?? 0;
                next.overallScore = Math.round((inv + comp + fin + cust + rsk + prod) / 6);
                if (next.executiveSummary) {
                    next.executiveSummary.startupReadinessScore = next.overallScore;
                }
                return next;
            });

            toast.success(`${agentType} analysis updated!`, { id: runToast });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || 'Analysis failed';
            toast.error(`Error: ${errMsg}`, { id: runToast });
        } finally {
            setReRunningAgent(null);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-8 px-4">
                <SkeletonReport />
            </div>
        );
    }

    if (!startup) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-sm" style={{ color: '#5C5C5C' }}>Startup not found.</p>
            </div>
        );
    }

    if (analyzing) {
        return <AnalysisLoadingWorkspace startupName={startup.startupName} />;
    }

    const currentReportId = reportIdFromQuery || (history.length > 0 ? (history[0].reportId || history[0].id) : null);
    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* Animated Background */}
            <div className="fixed inset-0" style={{
                opacity: 0.35
            }}
            >

                <Lightfall
                    colors={[
                        '#FFBF00',
                        '#F2CF7E',
                        '#FFF4CC'
                    ]}
                    backgroundColor="#FCFAF5"
                    speed={0.12}
                    streakCount={1}
                    streakWidth={0.7}
                    streakLength={1.5}
                    glow={0.4}
                    density={0.18}
                    twinkle={0.2}
                    zoom={1.8}
                    backgroundGlow={0.03}
                    opacity={0.25}
                    mouseInteraction
                    mouseStrength={0.08}
                    mouseRadius={0.6}
                />
            </div>

            {/* Page Content */}
            <div
                className="relative z-10 min-h-screen"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(252,250,245,0.75) 0%, rgba(252,250,245,0.88) 100%)'
                }}
            >
                <Outlet
                    context={{
                        startup,
                        report,
                        history,
                        isHistorical,
                        currentReportId,
                        analyzing,
                        reRunningAgent,
                        runFullAnalysis,
                        handleReRunAgent,
                    }}
                />
            </div>

        </div>
    );
};

export default StartupWorkspaceLayout;
