import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, TrendingUp, Target, BarChart2, Users, Shield, Layers, Sparkles, Clock, ArrowRight, Gauge, Database, Globe, Cpu, Zap, Activity, DollarSign, Search, Lightbulb, Flag, CheckCircle2, Brain, Building2, FileText, Radio } from 'lucide-react';
import DecryptedText from '../DecryptedText';
import ScrollVelocity from '../ScrollVelocity';

const STEPS = [
  { id: 'investor', name: 'Investor Analysis', icon: TrendingUp, desc: 'TAM, SAM, SOM & fundability', color: '#FFBF00' },
  { id: 'competitor', name: 'Competitor Intelligence', icon: Target, desc: 'Moats & market position evaluation', color: '#F2CF7E' },
  { id: 'finance', name: 'Financial Modeling', icon: BarChart2, desc: 'CAC, LTV & runway estimation', color: '#FF7900' },
  { id: 'customer', name: 'Customer Validation', icon: Users, desc: 'Personas & pain point validation', color: '#FFBF00' },
  { id: 'risk', name: 'Risk Assessment', icon: Shield, desc: 'Threat vector intelligence & mitigations', color: '#F2CF7E' },
  { id: 'productStrategy', name: 'Product Strategy', icon: Layers, desc: 'MoSCoW roadmap & validation milestones', color: '#FF7900' },
  { id: 'chiefAdvisor', name: 'Executive Synthesis', icon: Sparkles, desc: 'Synthesizing report & readiness summary', color: '#FFBF00' },
];

const agentSubtitles = {
  investor: ["Evaluating venture-scale growth potential...", "Assessing fundraising readiness...", "Estimating market opportunity size...", "Reviewing investor attractiveness...", "Analyzing business model scalability...", "Calculating exit opportunity potential..."],
  competitor: ["Scanning direct competitors...", "Mapping competitive landscape...", "Evaluating barriers to entry...", "Identifying differentiation opportunities...", "Benchmarking against industry leaders...", "Analyzing competitor positioning..."],
  finance: ["Building startup financial model...", "Analyzing unit economics...", "Forecasting capital requirements...", "Estimating profitability scenarios...", "Calculating customer acquisition costs...", "Reviewing revenue sustainability..."],
  customer: ["Identifying customer pain points...", "Evaluating willingness to pay...", "Assessing retention potential...", "Mapping customer journeys...", "Analyzing adoption barriers...", "Reviewing user value proposition..."],
  risk: ["Assessing operational dependencies...", "Evaluating regulatory exposure...", "Identifying scalability bottlenecks...", "Reviewing execution complexity...", "Analyzing technology risks...", "Mapping market uncertainty..."],
  productStrategy: ["Reviewing MVP feasibility...", "Evaluating roadmap execution...", "Assessing feature prioritization...", "Mapping growth opportunities...", "Reviewing technical architecture...", "Analyzing go-to-market readiness..."],
  chiefAdvisor: ["Cross-validating findings...", "Building readiness assessment...", "Preparing executive recommendations...", "Finalizing due diligence report...", "Synthesizing agent intelligence...", "Constructing board-level summary..."],
};

const finalizationMessages = ["Cross-validating agent findings...", "Generating executive recommendations...", "Preparing investor summary...", "Constructing startup readiness score...", "Building board-level recommendations...", "Consolidating market intelligence...", "Finalizing due diligence report...", "Calibrating final assessment scores...", "Synthesizing multi-agent insights...", "Preparing confidential investor document..."];

const analystUpdates = {
  system: ["Startup profile successfully loaded", "Industry classification completed", "Knowledge graph initialized", "Vector database context retrieved", "Market intelligence sources connected", "Due diligence workflow activated", "Research framework selected", "Historical benchmark data loaded", "Startup evaluation pipeline initialized", "AI orchestrator agents deployed", "Data ingestion complete — analyzing structured inputs", "Research parameters configured for deep analysis", "Confidential due diligence session established", "Multi-dimensional analysis framework activated"],
  knowledge: ["Retrieving startup context from knowledge base...", "Searching industry intelligence reports...", "Querying venture capital benchmark database...", "Analyzing startup ecosystem patterns...", "Loading competitor intelligence datasets...", "Mapping industry-specific risk frameworks...", "Retrieving customer validation models...", "Building startup context graph...", "Accessing proprietary market research...", "Loading sector-specific evaluation criteria...", "Retrieving historical investment performance data...", "Building industry comparables dataset..."],
  investor: ["Evaluating venture-scale growth potential...", "Assessing investment attractiveness...", "Analyzing startup defensibility...", "Estimating fundraising readiness...", "Calculating market opportunity size...", "Reviewing business model scalability...", "Evaluating institutional investor appeal...", "Estimating exit opportunity potential...", "Assessing long-term value creation...", "Analyzing founder-market alignment...", "Reviewing cap table structure and investor dynamics...", "Evaluating revenue model sustainability..."],
  competitor: ["Scanning direct competitors...", "Identifying indirect competitors...", "Mapping competitive landscape...", "Reviewing market saturation levels...", "Evaluating barriers to entry...", "Analyzing differentiation opportunities...", "Benchmarking against industry leaders...", "Detecting competitive moats...", "Comparing positioning strategies...", "Analyzing competitor pricing models...", "Reviewing competitor funding history...", "Mapping competitor geographic presence..."],
  finance: ["Building startup financial model...", "Estimating revenue potential...", "Calculating customer acquisition economics...", "Projecting profitability scenarios...", "Forecasting operational expenses...", "Estimating capital requirements...", "Analyzing pricing strategy sustainability...", "Evaluating financial scalability...", "Simulating growth assumptions...", "Calculating lifetime value across segments...", "Analyzing gross margin potential...", "Reviewing burn rate and runway projections..."],
  customer: ["Identifying customer pain points...", "Evaluating product-market fit signals...", "Analyzing customer demand strength...", "Reviewing adoption barriers...", "Assessing retention potential...", "Evaluating willingness to pay...", "Mapping user journey complexity...", "Analyzing customer value proposition...", "Identifying ideal customer profiles...", "Reviewing customer feedback signals...", "Analyzing referral potential...", "Evaluating onboarding complexity..."],
  risk: ["Assessing execution complexity...", "Reviewing operational dependencies...", "Evaluating regulatory exposure...", "Mapping market uncertainty...", "Identifying scalability bottlenecks...", "Analyzing technology risks...", "Reviewing compliance requirements...", "Assessing competitive threats...", "Evaluating funding risks...", "Analyzing key person dependency...", "Reviewing data privacy exposure...", "Evaluating intellectual property risks..."],
  product: ["Reviewing MVP feasibility...", "Evaluating roadmap execution...", "Assessing feature prioritization...", "Analyzing go-to-market readiness...", "Reviewing technical architecture...", "Evaluating innovation potential...", "Assessing product differentiation...", "Mapping growth opportunities...", "Reviewing user experience strategy...", "Evaluating development velocity...", "Assessing API and integration potential...", "Reviewing quality assurance maturity..."],
  executive: ["Cross-validating agent findings...", "Consolidating startup intelligence...", "Generating executive recommendations...", "Building readiness assessment...", "Preparing investor-grade summary...", "Synthesizing strategic insights...", "Constructing final scorecard...", "Preparing board-level recommendations...", "Finalizing due diligence report...", "Calibrating overall score against benchmarks...", "Identifying key investment highlights...", "Generating actionable strategic recommendations..."],
  benchmark: ["Benchmarking against Y Combinator portfolio companies...", "Benchmarking against venture-backed SaaS startups...", "Comparing growth assumptions with industry leaders...", "Reviewing performance against sector benchmarks...", "Evaluating startup maturity against seed-stage peers...", "Benchmarking unit economics against Series A companies...", "Comparing customer acquisition efficiency...", "Evaluating revenue growth against market median...", "Benchmarking team composition against successful exits...", "Comparing burn rate against industry standards..."],
};

const discoveries = [
  { text: "Strong market demand signals detected", icon: Activity, color: '#10B981' }, { text: "Attractive monetization opportunity identified", icon: DollarSign, color: '#10B981' }, { text: "Competitive differentiation advantage discovered", icon: Target, color: '#10B981' }, { text: "High customer retention potential identified", icon: Users, color: '#10B981' }, { text: "Product-market fit indicators validated", icon: CheckCircle2, color: '#10B981' }, { text: "Scalability advantages recognized", icon: TrendingUp, color: '#10B981' }, { text: "Venture-scale growth potential detected", icon: Building2, color: '#10B981' }, { text: "Customer acquisition efficiency opportunity identified", icon: Zap, color: '#10B981' }, { text: "Regulatory considerations detected", icon: Flag, color: '#FF7900' }, { text: "Potential execution bottleneck identified", icon: Shield, color: '#FF7900' }, { text: "Competitive pressure detected", icon: Search, color: '#FF7900' }, { text: "Market education challenge identified", icon: Lightbulb, color: '#FF7900' }, { text: "Technical moat indicators confirmed", icon: Brain, color: '#10B981' }, { text: "Founder-market alignment validated", icon: Sparkles, color: '#10B981' }, { text: "Revenue model sustainability confirmed", icon: BarChart2, color: '#10B981' }, { text: "Expansion opportunity in adjacent market detected", icon: Globe, color: '#10B981' },
];

const intelligenceSources = ["Startup Profile", "Industry Benchmarks", "Competitor Intelligence", "Financial Models", "Customer Validation Frameworks", "Product Strategy Frameworks", "Risk Assessment Libraries", "Venture Capital Benchmarks"];

const TOTAL_DURATION = 330000;

const AnalysisLoadingWorkspace = ({ startupName = 'Venture' }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState({ text: "Initializing due diligence workflow..." });
  const [timestamp, setTimestamp] = useState('');
  const [predictedScore, setPredictedScore] = useState(0);
  const [currentDiscovery, setCurrentDiscovery] = useState(null);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [phase, setPhase] = useState('init');
  const [discoveryHistory, setDiscoveryHistory] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [finalMessageIdx, setFinalMessageIdx] = useState(0);
  const [sourcesRevealed, setSourcesRevealed] = useState(0);
  const discoveryTimerRef = useRef(null);
  const subtitleIntervalRef = useRef(null);

  const getTimestamp = useCallback(() => { const now = new Date(); return now.toTimeString().slice(0, 8); }, []);
  const currentStep = useMemo(() => STEPS[currentStepIndex], [currentStepIndex]);

  useEffect(() => { const phaseTimer = setTimeout(() => setPhase('analyzing'), 5000); const finalTimer = setTimeout(() => setPhase('finalizing'), TOTAL_DURATION - 60000); return () => { clearTimeout(phaseTimer); clearTimeout(finalTimer); }; }, []);
  useEffect(() => { if (!currentStep) return; const subtitles = agentSubtitles[currentStep.id] || []; if (subtitles.length === 0) return; let idx = 0; setCurrentSubtitle(subtitles[0]); subtitleIntervalRef.current = setInterval(() => { idx = (idx + 1) % subtitles.length; setCurrentSubtitle(subtitles[idx]); }, 4000); return () => clearInterval(subtitleIntervalRef.current); }, [currentStep]);
  useEffect(() => { if (phase !== 'finalizing') return; const interval = setInterval(() => { setFinalMessageIdx(prev => (prev + 1) % finalizationMessages.length); }, 4000); return () => clearInterval(interval); }, [phase]);
  useEffect(() => { const interval = setInterval(() => { setSourcesRevealed(prev => Math.min(prev + 1, intelligenceSources.length)); }, 2500); return () => clearInterval(interval); }, []);
  useEffect(() => {
    const allMessages = [...analystUpdates.system.map(m => ({ text: m, type: 'system' })), ...analystUpdates.knowledge.map(m => ({ text: m, type: 'knowledge' })), ...analystUpdates.investor.map(m => ({ text: m, type: 'investor' })), ...analystUpdates.competitor.map(m => ({ text: m, type: 'competitor' })), ...analystUpdates.finance.map(m => ({ text: m, type: 'finance' })), ...analystUpdates.customer.map(m => ({ text: m, type: 'customer' })), ...analystUpdates.risk.map(m => ({ text: m, type: 'risk' })), ...analystUpdates.product.map(m => ({ text: m, type: 'product' })), ...analystUpdates.executive.map(m => ({ text: m, type: 'executive' })), ...analystUpdates.benchmark.map(m => ({ text: m, type: 'benchmark' }))];
    const shuffleMessages = [...allMessages].sort(() => Math.random() - 0.5); let msgIdx = 0; const ts = getTimestamp();
    setCurrentMessage(shuffleMessages[0]); setTimestamp(ts); setActivityFeed([{ text: shuffleMessages[0].text, timestamp: ts, id: Date.now() }]);
    const msgInterval = setInterval(() => { msgIdx++; const newTs = getTimestamp(); if (msgIdx < shuffleMessages.length) { setCurrentMessage(shuffleMessages[msgIdx]); setTimestamp(newTs); setActivityFeed(prev => { const updated = [{ text: shuffleMessages[msgIdx].text, timestamp: newTs, id: Date.now() }, ...prev]; return updated.slice(0, 15); }); } setPredictedScore(prev => { if (prev >= 88) return 88 + Math.floor(Math.random() * 4); if (prev >= 72) return prev + Math.floor(Math.random() * 3); if (prev >= 50) return prev + Math.floor(Math.random() * 4); if (prev >= 25) return prev + Math.floor(Math.random() * 5); return prev + Math.floor(Math.random() * 6); }); }, 3500);
    return () => clearInterval(msgInterval);
  }, [getTimestamp]);
  useEffect(() => { const showDiscovery = () => { const disc = discoveries[Math.floor(Math.random() * discoveries.length)]; setCurrentDiscovery(disc); setShowDiscovery(true); setDiscoveryHistory(prev => { const exists = prev.some(d => d.text === disc.text); if (exists) return prev; return [{ ...disc, id: Date.now() }, ...prev].slice(0, 5); }); discoveryTimerRef.current = setTimeout(() => { setShowDiscovery(false); discoveryTimerRef.current = setTimeout(showDiscovery, 10000 + Math.random() * 15000); }, 4000); }; discoveryTimerRef.current = setTimeout(showDiscovery, 6000); return () => clearTimeout(discoveryTimerRef.current); }, []);
  useEffect(() => { const intervalTime = 200; const increment = (100 / (TOTAL_DURATION / intervalTime)); const progressInterval = setInterval(() => { setProgress((prev) => { const next = Math.min(prev + increment, 99); const stepPct = 100 / STEPS.length; const newStepIdx = Math.min(Math.floor(next / stepPct), STEPS.length - 1); if (newStepIdx !== currentStepIndex) setCurrentStepIndex(newStepIdx); return next; }); }, intervalTime); return () => clearInterval(progressInterval); }, [currentStepIndex]);

  const displayScore = Math.min(predictedScore, 92);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: '#F6F3EA' }}>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <ScrollVelocity texts={['DUE DILIGENCE • ANALYSIS • EVALUATION • INTELLIGENCE • RESEARCH •', 'VENTURE CAPITAL • STARTUP ASSESSMENT • INVESTOR GRADE • DEEP RESEARCH •', 'AI ORCHESTRATOR • MULTI-AGENT • INSTITUTIONAL ANALYSIS • MARKET INTEL •', 'SEQUOIA • ANDREESSEN HOROWITZ • BENCHMARK • ACCEL • Y COMBINATOR •']} velocity={35} numCopies={4} damping={30} stiffness={250} />
      </div>

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 space-y-3 animate-fade-in-up">

          {/* ========== HEADER ========== */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 border-2 relative overflow-hidden"
              style={{ background: 'rgba(255,191,0,0.08)', borderColor: 'rgba(255,191,0,0.20)', boxShadow: '0 0 50px rgba(255,191,0,0.06)' }}>
              <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,191,0,0.03)' }} />
              <Brain className="w-8 h-8 relative z-10" style={{ color: '#FF7900' }} />
            </div>
            <DecryptedText
              text={startupName ? `Analyzing ${startupName}` : 'Due Diligence in Progress'}
              speed={50} maxIterations={12} sequential revealDirection="center"
              className="text-xl sm:text-2xl lg:text-3xl font-black tracking-[-0.03em]"
              parentClassName="block mb-2" encryptedClassName="text-[#F2CF7E]" style={{ color: '#1E1E1E' }}
            />
            <p className="text-xs sm:text-sm font-bold leading-5 max-w-2xl mx-auto" style={{ color: '#5C5C5C' }}>
              Institutional-grade due diligence • Multi-agent analysis • Investor-ready intelligence
            </p>
          </div>

          {/* ========== METRICS ROW ========== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border p-3.5 flex items-center gap-3"
              style={{ background: '#FCFAF5', borderColor: 'rgba(255,191,0,0.20)' }}>
              <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(255,191,0,0.08)' }}>
                <Gauge className="w-5 h-5" style={{ color: '#FF7900' }} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Predicted Readiness</p>
                <span className="text-xl font-black tracking-[-0.03em]" style={{ color: '#FF7900' }}>{displayScore}%</span>
              </div>
            </div>
            <div className="rounded-xl border p-3.5 flex items-center gap-3"
              style={{ background: '#FCFAF5', borderColor: 'rgba(242,207,126,0.20)' }}>
              <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path strokeWidth="3" stroke="rgba(0,0,0,0.04)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <motion.path strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" stroke="#FFBF00" fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" transition={{ duration: 0.5 }} />
                </svg>
                <span className="absolute text-[10px] font-black" style={{ color: '#1E1E1E' }}>{Math.round(progress)}%</span>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Analysis Progress</p>
                <span className="text-xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="rounded-xl border p-3.5 flex items-center gap-3"
              style={{ background: '#FCFAF5', borderColor: 'rgba(16,185,129,0.15)' }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: phase === 'init' ? '#FFBF00' : phase === 'analyzing' ? '#FF7900' : '#10B981', boxShadow: `0 0 10px ${phase === 'init' ? 'rgba(255,191,0,0.4)' : phase === 'analyzing' ? 'rgba(255,121,0,0.4)' : 'rgba(16,185,129,0.4)'}` }} />
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Current Phase</p>
                <span className="text-lg font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>{phase === 'init' ? 'Initializing' : phase === 'analyzing' ? 'Analyzing' : 'Finalizing'}</span>
              </div>
            </div>
          </div>

          {/* ========== ORCHESTRATOR CARD ========== */}
          <div className="rounded-xl border p-3.5 flex items-center justify-between gap-3"
            style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0"
                style={{ background: 'rgba(255,191,0,0.08)', color: '#FF7900', borderColor: 'rgba(255,191,0,0.15)' }}>AI Diligence Orchestrator</span>
              <span className="text-[10px] font-bold font-mono flex-shrink-0" style={{ color: '#5C5C5C' }}>[{timestamp}]</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#FFBF00' }} />
              <DecryptedText text={currentMessage.text || currentMessage} speed={30} maxIterations={5} sequential revealDirection="start"
                className="text-xs font-bold truncate" parentClassName="min-w-0 flex-1" encryptedClassName="text-[#F2CF7E]" style={{ color: '#1E1E1E' }} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0"
              style={{ background: 'rgba(255,121,0,0.06)', color: '#FF7900', borderColor: 'rgba(255,121,0,0.12)' }}>
              <Loader2 className="w-3 h-3 inline animate-spin mr-1" />Live
            </span>
          </div>

          {/* Discovery Banner */}
          {showDiscovery && currentDiscovery && (
            <div className="rounded-lg border p-2.5 flex items-center gap-2.5 animate-fade-in-up transition-all duration-500"
              style={{ background: `${currentDiscovery.color}08`, borderColor: `${currentDiscovery.color}25` }}>
              <currentDiscovery.icon className="w-4 h-4 flex-shrink-0" style={{ color: currentDiscovery.color }} />
              <span className="text-xs font-black" style={{ color: '#1E1E1E' }}>{currentDiscovery.text}</span>
            </div>
          )}

          {/* ========== ACTIVE AGENT + LATEST FINDINGS ========== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Active Agent Card - reduced height ~20% */}
            <AnimatePresence mode="wait">
              {STEPS.map((step, idx) => {
                if (idx !== currentStepIndex) return null;
                return (
                  <motion.div key={step.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }} className="rounded-xl border p-4 flex flex-col justify-between"
                    style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg border flex-shrink-0" style={{ background: 'rgba(255,191,0,0.08)', borderColor: 'rgba(255,191,0,0.15)' }}>
                          <step.icon className="w-5 h-5" style={{ color: '#FFBF00' }} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Active Agent</span>
                          <h3 className="text-sm font-black" style={{ color: '#1E1E1E' }}>{step.name}</h3>
                          <AnimatePresence mode="wait">
                            <motion.p key={currentSubtitle} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
                              transition={{ duration: 0.2 }} className="text-[11px] font-bold mt-0.5" style={{ color: '#FF7900' }}>{currentSubtitle}</motion.p>
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black border flex-shrink-0"
                        style={{ background: 'rgba(255,121,0,0.06)', color: '#FF7900', borderColor: 'rgba(255,121,0,0.12)' }}>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Evaluating...</span>
                      </div>
                    </div>
                    <div className="py-3 border-t border-b border-dashed my-3" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                      <p className="text-xs font-bold leading-relaxed" style={{ color: '#1E1E1E' }}>
                        Executing advanced strategic protocols across {step.desc.toLowerCase()}. Cross-referencing institutional benchmarks and venture capital evaluation frameworks.
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold" style={{ color: '#5C5C5C' }}>
                      <span>Step {idx + 1} of {STEPS.length}</span><span className="font-black">Investor-grade compliance active</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Latest Findings - given more visual importance */}
            <div className="rounded-xl border p-4 flex flex-col" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
              <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                <FileText className="w-4 h-4" style={{ color: '#FFBF00' }} />
                <h3 className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Latest Findings</h3>
                <span className="text-[9px] font-black ml-auto px-2 py-0.5 rounded-md" style={{ background: 'rgba(16,185,129,0.06)', color: '#10B981' }}>
                  {discoveryHistory.length} found
                </span>
              </div>
              <div className="space-y-2 flex-1">
                {discoveryHistory.length === 0 ? (
                  <p className="text-xs font-bold italic py-4 text-center" style={{ color: '#5C5C5C' }}>Awaiting discoveries...</p>
                ) : (
                  <AnimatePresence initial={false}>
                    {discoveryHistory.map((disc, i) => (
                      <motion.div key={disc.id} initial={i === 0 ? { opacity: 0, y: -4 } : false} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }} className="flex items-center gap-2.5 p-2.5 rounded-lg border"
                        style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.04)' }}>
                        <disc.icon className="w-4 h-4 flex-shrink-0" style={{ color: disc.color }} />
                        <span className="text-xs font-bold leading-relaxed" style={{ color: '#1E1E1E' }}>{disc.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

          {/* ========== TIMELINE (35%) + LIVE FEED (65%) ========== */}
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-3">
            {/* Pipeline Timeline */}
            <div className="rounded-xl border p-4 space-y-2" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
              <h3 className="text-[9px] font-black uppercase tracking-wider border-b pb-2 mb-1" style={{ color: '#5C5C5C', borderColor: 'rgba(0,0,0,0.08)' }}>Pipeline Timeline</h3>
              <div className="space-y-1.5">
                {STEPS.map((step, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isCompleted = idx < currentStepIndex;
                  return (
                    <div key={step.id} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0"
                        style={{ background: isCompleted ? '#FFBF00' : isActive ? '#FCFAF5' : '#F9F6EE', borderColor: isCompleted || isActive ? '#FFBF00' : 'rgba(0,0,0,0.08)' }}>
                        {isCompleted ? <Check className="w-2.5 h-2.5 text-white stroke-[4px]" /> : isActive ? <Loader2 className="w-2.5 h-2.5 animate-spin" style={{ color: '#FF7900' }} /> : <span className="text-[8px] font-bold" style={{ color: '#5C5C5C' }}>{idx + 1}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black truncate" style={{ color: isActive ? '#FF7900' : isCompleted ? '#1E1E1E' : '#5C5C5C' }}>{step.name}</h4>
                      </div>
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#10B981' }} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Intelligence Feed - largest information surface */}
            <div className="rounded-xl border overflow-hidden flex flex-col" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)', maxHeight: '320px' }}>
              <div className="px-4 py-2.5 border-b flex items-center gap-2 flex-shrink-0" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <Radio className="w-3.5 h-3.5" style={{ color: '#FF7900' }} />
                <h3 className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Live Intelligence Feed</h3>
                <span className="relative flex h-1.5 w-1.5 ml-auto">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#10B981' }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#10B981' }} />
                </span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {activityFeed.map((event, i) => (
                    <motion.div key={event.id} initial={i === 0 ? { opacity: 0, x: -6 } : false} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }} className="px-4 py-2 border-b last:border-b-0 flex items-start gap-2.5"
                      style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                      <span className="text-[9px] font-bold font-mono flex-shrink-0 mt-0.5" style={{ color: '#5C5C5C' }}>[{event.timestamp}]</span>
                      <span className="text-[11px] font-bold leading-relaxed" style={{ color: '#1E1E1E' }}>{event.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ========== INTELLIGENCE SOURCES + FOOTER (compact pills) ========== */}
          <div className="rounded-xl border p-3.5" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <Database className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#FFBF00' }} />
              <h3 className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Intelligence Sources</h3>
              <span className="text-[8px] font-black ml-auto px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: 'rgba(16,185,129,0.06)', color: '#10B981' }}>
                {sourcesRevealed}/{intelligenceSources.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {intelligenceSources.map((source, i) => (
                <motion.div key={source} initial={{ opacity: 0, scale: 0.95 }}
                  animate={i < sourcesRevealed ? { opacity: 1, scale: 1 } : { opacity: 0.25, scale: 0.95 }}
                  transition={{ duration: 0.3 }} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border"
                  style={{ background: i < sourcesRevealed ? '#F9F6EE' : '#F9F6EE', borderColor: i < sourcesRevealed ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.04)' }}>
                  {i < sourcesRevealed ? (
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: '#10B981' }} />
                  ) : (
                    <div className="w-3 h-3 rounded-full border flex-shrink-0" style={{ borderColor: 'rgba(0,0,0,0.08)' }} />
                  )}
                  <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: i < sourcesRevealed ? '#1E1E1E' : '#5C5C5C' }}>{source}</span>
                </motion.div>
              ))}
              {/* Footer integrated */}
              <span className="text-[9px] font-bold px-2 py-1.5 flex items-center gap-2 ml-auto" style={{ color: '#5C5C5C' }}>
                <span className="w-1 h-1 rounded-full" style={{ background: '#5C5C5C' }} />
                <Globe className="w-3 h-3" />Market Data
                <span className="w-1 h-1 rounded-full" style={{ background: '#5C5C5C' }} />
                <Cpu className="w-3 h-3" />7 Agents
                <span className="w-1 h-1 rounded-full" style={{ background: '#5C5C5C' }} />
                <Zap className="w-3 h-3" />AI Powered
              </span>
            </div>
          </div>

          {/* ========== FINAL REPORT ASSEMBLY ========== */}
          {phase === 'finalizing' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-4 flex items-center gap-3"
              style={{ background: '#FCFAF5', borderColor: 'rgba(255,191,0,0.25)' }}>
              <div className="p-2.5 rounded-lg relative flex-shrink-0" style={{ background: 'rgba(255,191,0,0.1)' }}>
                <Sparkles className="w-6 h-6 animate-pulse" style={{ color: '#FF7900' }} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black" style={{ color: '#1E1E1E' }}>Final Report Assembly</h3>
                <AnimatePresence mode="wait">
                  <motion.p key={finalMessageIdx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }} className="text-xs font-bold mt-1" style={{ color: '#FF7900' }}>
                    {finalizationMessages[finalMessageIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoadingWorkspace;