import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { startupAPI, orchestratorAPI } from '../api/api';
import StartupCard from '../components/StartupCard';
import { SkeletonKPI, SkeletonCard } from '../components/ui/SkeletonLoader';
import ShapeGrid from '../components/ShapeGrid';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Layers,
  Sparkles,
  TrendingUp,
  Award,
  FileText,
  Clock,
  Building2,
  Activity,
  ArrowUpRight,
  Bot,
  CircleDot,
  Gauge,
  ShieldCheck,
  Zap,
  Play,
  History,
  Loader2,
  Brain,
  BookOpen,
  GraduationCap,
  Compass,
  Rocket,
  Globe,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

const DashboardPage = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [intelligenceData, setIntelligenceData] = useState({
    totalReports: 0,
    avgScore: 0,
    bestStartup: null,
    recentReports: [],
    scoreDistribution: [],
    avgScores: { investor: 0, competitor: 0, finance: 0, customer: 0, risk: 0, productStrategy: 0 },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await startupAPI.getMyStartups();
        const allStartups = data || [];
        setStartups(allStartups);

        if (allStartups.length > 0) {
          const reportResults = await Promise.allSettled(
            allStartups.map(async (s) => {
              const history = await orchestratorAPI.getReportHistory(s.id);
              if (history && history.length > 0) {
                const sorted = history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const latest = sorted[0];
                const reportDetails = await orchestratorAPI.getReport(latest.id);
                return { startup: s, history: sorted, latestReport: reportDetails };
              }
              return { startup: s, history: [], latestReport: null };
            })
          );

          let totalReports = 0;
          let allScores = [];
          let recentReports = [];
          let bestScore = -1;
          let bestStartup = null;
          let sumInvestor = 0, sumCompetitor = 0, sumFinance = 0, sumCustomer = 0, sumRisk = 0, sumProduct = 0;
          let countWithReports = 0;

          reportResults.forEach((result) => {
            if (result.status === 'fulfilled' && result.value) {
              const { startup, history, latestReport } = result.value;
              totalReports += history.length;

              history.forEach(r => {
                if (r.overallScore !== null && r.overallScore !== undefined) {
                  allScores.push(r.overallScore);
                  if (r.overallScore > bestScore) {
                    bestScore = r.overallScore;
                    bestStartup = { ...startup, score: r.overallScore };
                  }
                }
                recentReports.push({
                  ...r,
                  startupName: startup.startupName,
                  startupId: startup.id,
                });
              });

              if (latestReport) {
                sumInvestor += latestReport.investmentScore ?? latestReport.investorDetails?.score ?? 0;
                sumCompetitor += latestReport.competitionScore ?? latestReport.competitorDetails?.score ?? 0;
                sumFinance += latestReport.financialScore ?? latestReport.financeDetails?.score ?? 0;
                sumCustomer += latestReport.customerScore ?? latestReport.customerDetails?.score ?? 0;
                sumRisk += latestReport.riskScore ?? latestReport.riskDetails?.score ?? 0;
                sumProduct += latestReport.productStrategyScore ?? latestReport.productStrategyDetails?.score ?? 0;
                countWithReports++;
              }
            }
          });

          recentReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setIntelligenceData({
            totalReports,
            avgScore: allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0,
            bestStartup,
            recentReports: recentReports.slice(0, 8),
            avgScores: countWithReports > 0 ? {
              investor: Math.round(sumInvestor / countWithReports),
              competitor: Math.round(sumCompetitor / countWithReports),
              finance: Math.round(sumFinance / countWithReports),
              customer: Math.round(sumCustomer / countWithReports),
              risk: Math.round(sumRisk / countWithReports),
              productStrategy: Math.round(sumProduct / countWithReports),
            } : { investor: 0, competitor: 0, finance: 0, customer: 0, risk: 0, productStrategy: 0 },
          });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load startup intelligence data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRunOrchestrator = async (startupId) => {
    // Redirect immediately to history page where the loading UI will show
    navigate(`/startups/${startupId}/history`);

    // Then trigger the analysis
    try {
      await orchestratorAPI.analyzeStartup(startupId);
      toast.success('AI analysis complete!');
      // Refresh data after completion
      const data = await startupAPI.getMyStartups();
      setStartups(data || []);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Analysis failed';
      toast.error(`Error: ${errMsg}`);
    }
  };

  // Navigate to Knowledge Page
  const goToKnowledge = () => {
    navigate('/knowledge');
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <ShapeGrid speed={0.5} squareSize={40} direction="diagonal" borderColor="#F2CF7E" hoverFillColor="#FFE642" shape="square" hoverTrailAmount={0} />
        </div>
        <div className="relative space-y-8 animate-fade-in-up">
          <div className="skeleton h-72 w-full rounded-[28px]"></div>
          <SkeletonKPI count={4} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  const hasReports = intelligenceData.totalReports > 0;

  return (
    <div className="relative isolate -m-4 p-4 pb-12 animate-fade-in-up sm:-m-6 sm:p-6 sm:pb-14">
      <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FCFAF5 42%, #FFF8E6 100%)' }}>
        <div className="absolute inset-0 opacity-[0.18]">
          <ShapeGrid speed={0.35} squareSize={42} direction="diagonal" borderColor="#F2CF7E" hoverFillColor="#FFE642" shape="square" hoverTrailAmount={0} />
        </div>
      </div>

      <div className="space-y-10">
        {/* ========== HERO ========== */}
        <section className="relative isolate overflow-hidden rounded-[28px] border px-6 py-7 shadow-[0_24px_70px_rgba(255,121,0,0.12)] sm:px-8 sm:py-9 lg:px-10"
          style={{ background: 'linear-gradient(115deg, #FFBF00 0%, #F2CF7E 38%, #FFE642 70%, #FF7900 130%)', borderColor: 'rgba(30,30,30,0.12)' }}>
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full blur-3xl" style={{ background: 'rgba(255,121,0,0.30)' }} />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(255,230,66,0.48)' }} />
          <div className="absolute inset-0 opacity-[0.16] pointer-events-none">
            <ShapeGrid speed={0.35} squareSize={42} direction="diagonal" borderColor="#1E1E1E" hoverFillColor="#FF7900" shape="square" hoverTrailAmount={0} />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-xl"
                  style={{ background: 'rgba(255,255,255,0.42)', borderColor: 'rgba(30,30,30,0.14)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ background: '#FF7900' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#FF7900' }} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#1E1E1E' }}>Live startup intelligence</span>
                </div>
                <h1 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-5xl" style={{ color: '#1E1E1E' }}>VentureVerseX AI</h1>
                <p className="mt-5 max-w-xl text-sm font-medium leading-6 sm:text-base" style={{ color: 'rgba(30,30,30,0.68)' }}>
                  AI-Powered Venture Evaluation, Due Diligence & Investment Readiness Analysis
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Knowledge Button - Prominent */}
                <button
                  onClick={goToKnowledge}
                  className="group inline-flex w-fit items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,121,0,0.28)]"
                  style={{
                    background: 'linear-gradient(135deg, #1E1E1E, #2D2D2D)',
                    borderColor: '#1E1E1E',
                    color: '#FFE642'
                  }}
                >
                  <Brain className="h-4 w-4" />
                  <span className="flex items-center gap-2">
                    Dive Deep into AI Knowledge
                    <Rocket className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>

                {/* Create Startup Button */}
                <Link to="/create-startup"
                  className="group inline-flex w-fit items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,121,0,0.28)]"
                  style={{ background: '#1E1E1E', borderColor: '#1E1E1E', color: '#FFE642' }}>
                  <Plus className="h-4 w-4" /> Add New Venture
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5">
              {[
                { label: 'Total Ventures', value: startups.length, icon: Layers, accent: '#FFBF00' },
                { label: 'Reports Generated', value: intelligenceData.totalReports, icon: FileText, accent: '#F2CF7E' },
                { label: 'Average Readiness', value: intelligenceData.avgScore > 0 ? `${intelligenceData.avgScore}/100` : '--', icon: Gauge, accent: '#FFE642' },
                { label: 'AI Agents Online', value: '6 / 6', icon: Bot, accent: '#FF7900' },
                {
                  label: 'AI Knowledge',
                  value: 'Explore',
                  icon: Brain,
                  accent: '#FFBF00',
                  isClickable: true,
                  onClick: goToKnowledge
                },
              ].map((metric) => {
                const MetricIcon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    onClick={metric.isClickable ? metric.onClick : undefined}
                    className={`group rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 sm:p-5 ${metric.isClickable ? 'cursor-pointer hover:shadow-[0_12px_30px_rgba(255,121,0,0.25)]' : ''
                      }`}
                    style={{
                      background: metric.isClickable
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,191,0,0.15))'
                        : 'rgba(255,255,255,0.58)',
                      borderColor: metric.isClickable
                        ? 'rgba(255,121,0,0.3)'
                        : 'rgba(30,30,30,0.12)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: metric.accent }}>
                        <MetricIcon className="h-4 w-4" style={{ color: '#1E1E1E' }} />
                      </span>
                      {metric.isClickable && (
                        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#FF7900' }} />
                      )}
                    </div>
                    <p className="mt-5 text-xl font-black tracking-tight sm:text-2xl" style={{ color: '#1E1E1E' }}>{metric.value}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: 'rgba(30,30,30,0.58)' }}>{metric.label}</p>
                    {metric.isClickable && (
                      <p className="mt-1 text-[8px] font-medium text-[#FF7900] flex items-center gap-1">
                        <Rocket className="h-2.5 w-2.5" />
                        Discover AI insights
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========== OVERVIEW CARDS ========== */}
        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" style={{ color: '#FF7900' }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#FF7900' }}>Executive signals</p>
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>Startup Intelligence Overview</h2>
            </div>
            <div className="flex items-center gap-3">
              <p className="max-w-md text-xs leading-5 sm:text-right" style={{ color: '#5C5C5C' }}>
                Investor-grade signals across startup quality, diligence depth, risk, and investment readiness.
              </p>
              <button
                onClick={goToKnowledge}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-bold transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #1E1E1E, #2D2D2D)',
                  borderColor: '#1E1E1E',
                  color: '#FFE642'
                }}
              >
                <Brain className="h-3.5 w-3.5" />
                <span>AI Knowledge</span>
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: 'Startups Evaluated', value: startups.length, suffix: 'ventures',
                status: startups.length > 0 ? 'Intelligence active' : 'Awaiting startup',
                icon: Building2, color: '#FFBF00', tint: 'rgba(255,191,0,0.18)',
                surface: 'linear-gradient(145deg, #FCFAF5 55%, rgba(255,191,0,0.18) 100%)',
              },
              {
                label: 'Readiness Index', value: intelligenceData.avgScore > 0 ? intelligenceData.avgScore : '--',
                suffix: intelligenceData.avgScore > 0 ? 'out of 100' : 'No score yet',
                status: intelligenceData.avgScore >= 61 ? 'Fundable range' : hasReports ? 'Development range' : 'Awaiting reports',
                icon: TrendingUp, color: '#F2CF7E', tint: 'rgba(242,207,126,0.28)',
                surface: 'linear-gradient(145deg, #FCFAF5 55%, rgba(242,207,126,0.28) 100%)',
              },
              {
                label: 'Leading Venture', value: intelligenceData.bestStartup ? intelligenceData.bestStartup.startupName : '--',
                suffix: intelligenceData.bestStartup ? `Score ${intelligenceData.bestStartup.score}` : 'No ranking yet',
                status: intelligenceData.bestStartup ? 'Top evaluated startup' : 'Awaiting reports',
                icon: Award, color: '#FFE642', tint: 'rgba(255,230,66,0.22)',
                surface: 'linear-gradient(145deg, #FCFAF5 55%, rgba(255,230,66,0.22) 100%)',
              },
              {
                label: 'Knowledge Center',
                value: 'AI Powered',
                suffix: '290+ documents',
                status: 'Learn & discover',
                icon: BookOpen,
                color: '#FF7900',
                tint: 'rgba(255,121,0,0.14)',
                surface: 'linear-gradient(145deg, #FCFAF5 55%, rgba(255,121,0,0.14) 100%)',
                isClickable: true,
                onClick: goToKnowledge,
              },
            ].map((card) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={card.label}
                  onClick={card.isClickable ? card.onClick : undefined}
                  className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,30,30,0.08)] ${card.isClickable ? 'cursor-pointer hover:shadow-[0_18px_45px_rgba(255,121,0,0.15)]' : ''
                    }`}
                  style={{
                    background: card.surface,
                    borderColor: card.isClickable ? `${card.color}66` : `${card.color}55`
                  }}>
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-70 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: card.tint }} />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="rounded-xl border p-2.5" style={{ background: card.tint, borderColor: `${card.color}22` }}>
                        <CardIcon className="h-4 w-4" style={{ color: card.color }} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
                        <CircleDot className="h-3 w-3" style={{ color: card.color }} /> {card.status}
                      </span>
                    </div>
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: '#5C5C5C' }}>{card.label}</p>
                    <p className="mt-2 truncate text-2xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>{card.value}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <span className="text-[10px] font-semibold" style={{ color: '#5C5C5C' }}>{card.suffix}</span>
                      {card.isClickable ? (
                        <Rocket className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: card.color }} />
                      ) : (
                        <TrendingUp className="h-3.5 w-3.5 opacity-70" style={{ color: card.color }} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== YOUR VENTURES + ACTIVITY TIMELINE ========== */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* LEFT: Your Ventures (Detailed) */}
          <div className="overflow-hidden rounded-[26px] border shadow-[0_18px_50px_rgba(30,30,30,0.05)]"
            style={{ background: '#FCFAF5', borderColor: 'rgba(242,207,126,0.48)' }}>
            <div className="border-b px-6 py-5"
              style={{ background: 'linear-gradient(100deg, rgba(242,207,126,0.24), rgba(255,230,66,0.08) 60%, transparent)', borderColor: 'rgba(242,207,126,0.36)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg p-2" style={{ background: 'rgba(255,191,0,0.10)' }}>
                    <Building2 className="h-4 w-4" style={{ color: '#FFBF00' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: '#1E1E1E' }}>Your Ventures</h3>
                    <p className="mt-0.5 text-[10px]" style={{ color: '#5C5C5C' }}>{startups.length} venture{startups.length !== 1 ? 's' : ''} registered</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToKnowledge}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all hover:-translate-y-0.5 border"
                    style={{ background: 'rgba(255,121,0,0.08)', borderColor: 'rgba(255,121,0,0.2)', color: '#FF7900' }}
                  >
                    <Brain className="w-3 h-3" /> Knowledge
                  </button>
                  <Link to="/create-startup"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all hover:-translate-y-0.5 border"
                    style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}>
                    <Plus className="w-3 h-3" /> New Venture
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {startups.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(255,191,0,0.12)' }}>
                    <Layers className="h-5 w-5" style={{ color: '#FF7900' }} />
                  </div>
                  <p className="mt-3 text-sm font-bold" style={{ color: '#1E1E1E' }}>No ventures yet</p>
                  <p className="mt-1 text-xs" style={{ color: '#5C5C5C' }}>Register your first startup to begin AI-powered evaluation.</p>
                  <Link to="/create-startup"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-[10px] font-black transition-all hover:-translate-y-0.5"
                    style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}>
                    <Plus className="h-3 w-3" /> Create Venture
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {startups.map((startup) => (
                    <div key={startup.id}
                      className="rounded-2xl border p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,30,30,0.06)]"
                      style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <Link to={`/startups/${startup.id}`}
                            className="text-base font-black tracking-[-0.02em] hover:text-[#FF7900] transition-colors"
                            style={{ color: '#1E1E1E' }}>
                            {startup.startupName}
                          </Link>
                          <p className="text-xs leading-5 mt-1.5 line-clamp-2" style={{ color: '#5C5C5C' }}>
                            {startup.ideaDescription || 'No description provided'}
                          </p>
                          <div className="flex items-center gap-3 mt-3 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                              style={{ background: 'rgba(255,191,0,0.06)', borderColor: 'rgba(255,191,0,0.12)', color: '#FFBF00' }}>
                              {startup.industry || 'Industry'}
                            </span>
                            {startup.targetMarket && (
                              <span className="text-[10px] px-2 py-0.5 rounded-md border"
                                style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.06)', color: '#5C5C5C' }}>
                                {startup.targetMarket}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleRunOrchestrator(startup.id)}
                            disabled={analyzingId === startup.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all hover:-translate-y-0.5 border disabled:opacity-50 whitespace-nowrap"
                            style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                          >
                            {analyzingId === startup.id ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Running...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>Run Analysis</span>
                              </>
                            )}
                          </button>
                          <Link to={`/startups/${startup.id}`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:bg-zinc-100 border"
                            style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)', color: '#5C5C5C' }}>
                            <Building2 className="w-3 h-3" /> Workspace
                          </Link>
                          <Link to={`/startups/${startup.id}/history`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:bg-zinc-100 border"
                            style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)', color: '#5C5C5C' }}>
                            <History className="w-3 h-3" /> History
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Activity Timeline */}
          <div className="overflow-hidden rounded-[26px] border shadow-[0_18px_50px_rgba(30,30,30,0.05)] flex flex-col"
            style={{ background: '#FCFAF5', borderColor: 'rgba(255,121,0,0.24)' }}>
            <div className="border-b px-6 py-5 flex-shrink-0"
              style={{ background: 'linear-gradient(105deg, rgba(255,121,0,0.14), rgba(255,191,0,0.12))', borderColor: 'rgba(255,121,0,0.22)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg p-2" style={{ background: 'rgba(255,121,0,0.09)' }}>
                    <Zap className="h-4 w-4" style={{ color: '#FF7900' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black" style={{ color: '#1E1E1E' }}>Activity Timeline</h3>
                    <p className="mt-0.5 text-[10px]" style={{ color: '#5C5C5C' }}>Latest intelligence events</p>
                  </div>
                </div>
                <button
                  onClick={goToKnowledge}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:bg-[#FF7900]/10 border"
                  style={{ background: 'rgba(255,121,0,0.06)', borderColor: 'rgba(255,121,0,0.15)', color: '#FF7900' }}
                >
                  <Brain className="w-3 h-3" /> AI Knowledge
                </button>
              </div>
            </div>
            <div className="px-6 py-4 flex-1 overflow-y-auto max-h-[600px]">
              {intelligenceData.recentReports.length > 0 ? intelligenceData.recentReports.map((r) => (
                <div key={r.id} className="group relative flex gap-4 pb-5 last:pb-0">
                  <div className="relative flex w-7 shrink-0 justify-center">
                    <div className="absolute bottom-[-2px] top-7 w-px group-last:hidden" style={{ background: 'rgba(0,0,0,0.10)' }} />
                    <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: '#FF7900', borderColor: '#FCFAF5' }}>
                      <FileText className="h-3 w-3" style={{ color: '#1E1E1E' }} />
                    </div>
                  </div>
                  <Link to={`/startups/${r.startupId}/executive-summary?reportId=${r.id}`}
                    className="min-w-0 flex-1 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,30,30,0.06)]"
                    style={{ background: 'linear-gradient(135deg, rgba(242,207,126,0.20), rgba(255,230,66,0.08))', borderColor: 'rgba(242,207,126,0.42)' }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[8px] font-black uppercase tracking-[0.14em]" style={{ color: '#FF7900' }}>Report generated</p>
                        <p className="mt-0.5 truncate text-[11px] font-black" style={{ color: '#1E1E1E' }}>{r.startupName}</p>
                      </div>
                      {r.overallScore !== null && r.overallScore !== undefined && (
                        <span className="shrink-0 rounded-lg border px-1.5 py-0.5 text-[9px] font-black"
                          style={{ color: '#FF7900', background: 'rgba(255,121,0,0.08)', borderColor: 'rgba(255,121,0,0.15)' }}>
                          {r.overallScore}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-[8px] font-medium" style={{ color: '#5C5C5C' }}>
                        {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#5C5C5C' }} />
                    </div>
                  </Link>
                </div>
              )) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: '#F9F6EE' }}>
                    <Clock className="h-4 w-4" style={{ color: '#5C5C5C' }} />
                  </div>
                  <p className="mt-2 text-xs font-bold" style={{ color: '#1E1E1E' }}>No intelligence events yet</p>
                  <p className="mt-0.5 text-[9px]" style={{ color: '#5C5C5C' }}>Generated reports will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;