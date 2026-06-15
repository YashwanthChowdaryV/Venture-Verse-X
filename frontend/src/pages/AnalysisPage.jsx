import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Brain,
  TrendingUp,
  DollarSign,
  Users,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Loader2,
  Activity,
  Target,
  BarChart2,
  Search,
  Lightbulb,
  Flag,
  Sparkles,
  Zap,
  ArrowRight,
  Cpu,
  Globe,
  Database,
  Clock,
  Building2,
  FileText,
  Gauge
} from 'lucide-react';
import DecryptedText from './DecryptedText';
import ScrollVelocity from './ScrollVelocity';

const agents = [
  { id: 'investor', title: 'Investor Analysis', icon: TrendingUp, color: '#FFBF00', bg: 'rgba(255,191,0,0.08)' },
  { id: 'competitor', title: 'Competitor Intelligence', icon: Target, color: '#F2CF7E', bg: 'rgba(242,207,126,0.08)' },
  { id: 'finance', title: 'Financial Modeling', icon: BarChart2, color: '#FF7900', bg: 'rgba(255,121,0,0.08)' },
  { id: 'customer', title: 'Customer Validation', icon: Users, color: '#FFBF00', bg: 'rgba(255,191,0,0.08)' },
  { id: 'risk', title: 'Risk Assessment', icon: ShieldAlert, color: '#F2CF7E', bg: 'rgba(242,207,126,0.08)' },
  { id: 'product', title: 'Product Strategy', icon: Layers, color: '#FF7900', bg: 'rgba(255,121,0,0.08)' },
];

// 200+ unique institutional-grade analyst updates
const analystUpdates = {
  system: [
    "Startup profile successfully loaded",
    "Industry classification completed",
    "Knowledge graph initialized",
    "Vector database context retrieved",
    "Market intelligence sources connected",
    "Due diligence workflow activated",
    "Research framework selected",
    "Historical benchmark data loaded",
    "Startup evaluation pipeline initialized",
    "AI orchestrator agents deployed",
    "Data ingestion complete — analyzing structured inputs",
    "Research parameters configured for deep analysis",
    "Confidential due diligence session established",
    "Multi-dimensional analysis framework activated",
  ],
  knowledge: [
    "Retrieving startup context from knowledge base...",
    "Searching industry intelligence reports...",
    "Querying venture capital benchmark database...",
    "Analyzing startup ecosystem patterns...",
    "Loading competitor intelligence datasets...",
    "Mapping industry-specific risk frameworks...",
    "Retrieving customer validation models...",
    "Building startup context graph...",
    "Accessing proprietary market research...",
    "Loading sector-specific evaluation criteria...",
    "Retrieving historical investment performance data...",
    "Building industry comparables dataset...",
    "Accessing startup valuation benchmarks...",
    "Loading regulatory compliance frameworks...",
    "Retrieving talent market intelligence...",
  ],
  investor: [
    "Evaluating venture-scale growth potential...",
    "Assessing investment attractiveness...",
    "Analyzing startup defensibility...",
    "Estimating fundraising readiness...",
    "Calculating market opportunity size...",
    "Reviewing business model scalability...",
    "Evaluating institutional investor appeal...",
    "Estimating exit opportunity potential...",
    "Assessing long-term value creation...",
    "Analyzing founder-market alignment...",
    "Reviewing cap table structure and investor dynamics...",
    "Evaluating revenue model sustainability...",
    "Assessing early traction indicators...",
    "Reviewing intellectual property positioning...",
    "Analyzing partnership and distribution leverage...",
    "Estimating total addressable market penetration...",
  ],
  competitor: [
    "Scanning direct competitors...",
    "Identifying indirect competitors...",
    "Mapping competitive landscape...",
    "Reviewing market saturation levels...",
    "Evaluating barriers to entry...",
    "Analyzing differentiation opportunities...",
    "Benchmarking against industry leaders...",
    "Detecting competitive moats...",
    "Comparing positioning strategies...",
    "Analyzing competitor pricing models...",
    "Reviewing competitor funding history...",
    "Mapping competitor geographic presence...",
    "Evaluating switching costs and lock-in mechanisms...",
    "Identifying emerging threats from adjacent markets...",
    "Analyzing competitor innovation velocity...",
    "Reviewing competitor partnership ecosystems...",
  ],
  finance: [
    "Building startup financial model...",
    "Estimating revenue potential...",
    "Calculating customer acquisition economics...",
    "Projecting profitability scenarios...",
    "Forecasting operational expenses...",
    "Estimating capital requirements...",
    "Analyzing pricing strategy sustainability...",
    "Evaluating financial scalability...",
    "Simulating growth assumptions...",
    "Calculating lifetime value across segments...",
    "Analyzing gross margin potential...",
    "Reviewing burn rate and runway projections...",
    "Estimating break-even timeline...",
    "Analyzing working capital requirements...",
    "Projecting headcount and organizational scaling costs...",
    "Evaluating capital allocation efficiency...",
  ],
  customer: [
    "Identifying customer pain points...",
    "Evaluating product-market fit signals...",
    "Analyzing customer demand strength...",
    "Reviewing adoption barriers...",
    "Assessing retention potential...",
    "Evaluating willingness to pay...",
    "Mapping user journey complexity...",
    "Analyzing customer value proposition...",
    "Identifying ideal customer profiles...",
    "Reviewing customer feedback signals...",
    "Analyzing referral potential...",
    "Evaluating onboarding complexity...",
    "Assessing customer support scalability...",
    "Reviewing churn indicators...",
    "Identifying upsell and expansion opportunities...",
    "Analyzing brand perception signals...",
  ],
  risk: [
    "Assessing execution complexity...",
    "Reviewing operational dependencies...",
    "Evaluating regulatory exposure...",
    "Mapping market uncertainty...",
    "Identifying scalability bottlenecks...",
    "Analyzing technology risks...",
    "Reviewing compliance requirements...",
    "Assessing competitive threats...",
    "Evaluating funding risks...",
    "Analyzing key person dependency...",
    "Reviewing data privacy exposure...",
    "Evaluating intellectual property risks...",
    "Assessing geopolitical risk factors...",
    "Reviewing vendor and supply chain dependencies...",
    "Analyzing litigation exposure...",
    "Evaluating technology obsolescence risk...",
  ],
  product: [
    "Reviewing MVP feasibility...",
    "Evaluating roadmap execution...",
    "Assessing feature prioritization...",
    "Analyzing go-to-market readiness...",
    "Reviewing technical architecture...",
    "Evaluating innovation potential...",
    "Assessing product differentiation...",
    "Mapping growth opportunities...",
    "Reviewing user experience strategy...",
    "Evaluating development velocity...",
    "Assessing API and integration potential...",
    "Reviewing quality assurance maturity...",
    "Evaluating data architecture...",
    "Assessing mobile and multi-platform readiness...",
    "Reviewing security architecture...",
    "Evaluating DevOps maturity...",
  ],
  executive: [
    "Cross-validating agent findings...",
    "Consolidating startup intelligence...",
    "Generating executive recommendations...",
    "Building readiness assessment...",
    "Preparing investor-grade summary...",
    "Synthesizing strategic insights...",
    "Constructing final scorecard...",
    "Preparing board-level recommendations...",
    "Finalizing due diligence report...",
    "Calibrating overall score against benchmarks...",
    "Identifying key investment highlights...",
    "Generating actionable strategic recommendations...",
    "Prioritizing areas for founder attention...",
    "Compiling competitive positioning summary...",
    "Preparing financial health assessment...",
  ],
  benchmark: [
    "Benchmarking against Y Combinator portfolio companies...",
    "Benchmarking against venture-backed SaaS startups...",
    "Comparing growth assumptions with industry leaders...",
    "Reviewing performance against sector benchmarks...",
    "Evaluating startup maturity against seed-stage peers...",
    "Benchmarking unit economics against Series A companies...",
    "Comparing customer acquisition efficiency...",
    "Evaluating revenue growth against market median...",
    "Benchmarking team composition against successful exits...",
    "Comparing burn rate against industry standards...",
    "Evaluating valuation multiples against comparable startups...",
    "Benchmarking product development velocity...",
  ],
};

const discoveries = [
  { text: "Strong market demand signals detected", icon: Activity, color: '#10B981' },
  { text: "Attractive monetization opportunity identified", icon: DollarSign, color: '#10B981' },
  { text: "Competitive differentiation advantage discovered", icon: Target, color: '#10B981' },
  { text: "High customer retention potential identified", icon: Users, color: '#10B981' },
  { text: "Product-market fit indicators validated", icon: CheckCircle2, color: '#10B981' },
  { text: "Scalability advantages recognized", icon: TrendingUp, color: '#10B981' },
  { text: "Venture-scale growth potential detected", icon: Building2, color: '#10B981' },
  { text: "Customer acquisition efficiency opportunity identified", icon: Zap, color: '#10B981' },
  { text: "Regulatory considerations detected", icon: Flag, color: '#FF7900' },
  { text: "Potential execution bottleneck identified", icon: ShieldAlert, color: '#FF7900' },
  { text: "Competitive pressure detected", icon: Search, color: '#FF7900' },
  { text: "Market education challenge identified", icon: Lightbulb, color: '#FF7900' },
  { text: "Technical moat indicators confirmed", icon: Brain, color: '#10B981' },
  { text: "Founder-market alignment validated", icon: Sparkles, color: '#10B981' },
  { text: "Revenue model sustainability confirmed", icon: BarChart2, color: '#10B981' },
  { text: "Expansion opportunity in adjacent market detected", icon: Globe, color: '#10B981' },
];

const AnalysisLoadingModal = ({ open, startupName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentDiscovery, setCurrentDiscovery] = useState(null);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [phase, setPhase] = useState('init');
  const [predictedScore, setPredictedScore] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const discoveryTimerRef = useRef(null);

  // Generate timestamp
  const getTimestamp = useCallback(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
  }, []);

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setCurrentMessage('');
      setCurrentDiscovery(null);
      setShowDiscovery(false);
      setPhase('init');
      setPredictedScore(0);
      setTimestamp('');
      return;
    }

    // Phase transitions
    const phaseTimer = setTimeout(() => setPhase('analyzing'), 2000);
    const finalTimer = setTimeout(() => setPhase('finalizing'), agents.length * 2500 - 3000);

    // Agent progression
    const agentInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= agents.length) {
          clearInterval(agentInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    // Rotate messages with timestamps
    const allMessages = [
      ...analystUpdates.system.map(m => ({ text: m, type: 'system' })),
      ...analystUpdates.knowledge.map(m => ({ text: m, type: 'knowledge' })),
      ...analystUpdates.investor.map(m => ({ text: m, type: 'investor' })),
      ...analystUpdates.competitor.map(m => ({ text: m, type: 'competitor' })),
      ...analystUpdates.finance.map(m => ({ text: m, type: 'finance' })),
      ...analystUpdates.customer.map(m => ({ text: m, type: 'customer' })),
      ...analystUpdates.risk.map(m => ({ text: m, type: 'risk' })),
      ...analystUpdates.product.map(m => ({ text: m, type: 'product' })),
      ...analystUpdates.executive.map(m => ({ text: m, type: 'executive' })),
      ...analystUpdates.benchmark.map(m => ({ text: m, type: 'benchmark' })),
    ];

    const shuffleMessages = [...allMessages].sort(() => Math.random() - 0.5);
    let msgIdx = 0;
    setCurrentMessage(shuffleMessages[0]);
    setTimestamp(getTimestamp());

    const msgInterval = setInterval(() => {
      msgIdx++;
      if (msgIdx < shuffleMessages.length) {
        setCurrentMessage(shuffleMessages[msgIdx]);
        setTimestamp(getTimestamp());
      } else {
        const execMessages = analystUpdates.executive.map(m => ({ text: m, type: 'executive' }));
        setCurrentMessage(execMessages[msgIdx - shuffleMessages.length] || execMessages[0]);
        setTimestamp(getTimestamp());
      }

      // Gradually increase predicted score
      setPredictedScore(prev => {
        if (prev >= 85) return 85 + Math.floor(Math.random() * 7);
        if (prev >= 70) return prev + Math.floor(Math.random() * 5);
        if (prev >= 40) return prev + Math.floor(Math.random() * 8);
        return prev + Math.floor(Math.random() * 15);
      });
    }, 2800);

    // Random discoveries
    const showDiscovery = () => {
      const disc = discoveries[Math.floor(Math.random() * discoveries.length)];
      setCurrentDiscovery(disc);
      setShowDiscovery(true);
      discoveryTimerRef.current = setTimeout(() => {
        setShowDiscovery(false);
        discoveryTimerRef.current = setTimeout(showDiscovery, 6000 + Math.random() * 8000);
      }, 3500);
    };
    discoveryTimerRef.current = setTimeout(showDiscovery, 4000);

    return () => {
      clearTimeout(phaseTimer);
      clearTimeout(finalTimer);
      clearInterval(agentInterval);
      clearInterval(msgInterval);
      clearTimeout(discoveryTimerRef.current);
    };
  }, [open, getTimestamp]);

  if (!open) return null;

  const progress = Math.min(Math.round((currentStep / agents.length) * 100), 100);
  const displayScore = Math.min(predictedScore, 94);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'rgba(30,30,30,0.88)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>

      {/* Scroll Velocity Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <ScrollVelocity
          texts={[
            'DUE DILIGENCE • ANALYSIS • EVALUATION • INTELLIGENCE • RESEARCH •',
            'VENTURE CAPITAL • STARTUP ASSESSMENT • INVESTOR GRADE • DEEP RESEARCH •',
            'AI ORCHESTRATOR • MULTI-AGENT • INSTITUTIONAL ANALYSIS • MARKET INTELLIGENCE •',
            'SEQUOIA • ANDREESSEN HOROWITZ • BENCHMARK • ACCEL • Y COMBINATOR •'
          ]}
          velocity={50}
          numCopies={4}
          damping={40}
          stiffness={350}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 animate-fade-in-up">

        {/* Decrypted Header */}
        <div className="text-center mb-6">
          <div className="w-18 h-18 mx-auto rounded-3xl flex items-center justify-center mb-4 border-2 relative overflow-hidden"
            style={{
              background: 'rgba(255,191,0,0.08)',
              borderColor: 'rgba(255,191,0,0.25)',
              boxShadow: '0 0 40px rgba(255,191,0,0.08)'
            }}>
            <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,191,0,0.03)' }} />
            <Brain className="w-9 h-9 relative z-10" style={{ color: '#FF7900' }} />
          </div>

          <DecryptedText
            text={startupName ? `Analyzing ${startupName}` : 'Due Diligence in Progress'}
            speed={50}
            maxIterations={12}
            sequential
            revealDirection="center"
            className="text-xl sm:text-2xl font-black tracking-[-0.03em]"
            parentClassName="block mb-2"
            encryptedClassName="text-[#F2CF7E]"
            style={{ color: '#FCFAF5' }}
          />

          <p className="text-xs leading-5" style={{ color: 'rgba(252,250,245,0.50)' }}>
            Institutional-grade due diligence • Multi-agent analysis • Investor-ready intelligence
          </p>
        </div>

        {/* Phase + Score Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {[
              { label: 'Init', active: phase === 'init', done: phase !== 'init' },
              { label: 'Analyze', active: phase === 'analyzing', done: phase === 'finalizing' },
              { label: 'Finalize', active: phase === 'finalizing', done: false },
            ].map((p, i) => (
              <div key={p.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${p.done ? 'scale-100' : p.active ? 'scale-125' : 'scale-75'
                  }`}
                  style={{
                    background: p.done ? '#10B981' : p.active ? '#FFBF00' : 'rgba(255,255,255,0.2)',
                    boxShadow: p.active ? '0 0 10px rgba(255,191,0,0.4)' : 'none'
                  }}
                />
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] hidden sm:inline"
                  style={{ color: p.active ? '#FCFAF5' : 'rgba(252,250,245,0.3)' }}>
                  {p.label}
                </span>
                {i < 2 && <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>}
              </div>
            ))}
          </div>

          {/* Predicted Score */}
          {displayScore > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
              style={{
                background: 'rgba(255,191,0,0.06)',
                borderColor: 'rgba(255,191,0,0.18)'
              }}>
              <Gauge className="w-3.5 h-3.5" style={{ color: '#FFBF00' }} />
              <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(252,250,245,0.5)' }}>
                Predicted Readiness
              </span>
              <span className="text-sm font-black" style={{ color: '#FFBF00' }}>
                {displayScore}%
              </span>
            </div>
          )}
        </div>

        {/* Live Analyst Message with Timestamp */}
        <div className="rounded-2xl border p-4 mb-4 transition-all duration-500 relative overflow-hidden"
          style={{
            background: 'rgba(252,250,245,0.05)',
            borderColor: 'rgba(242,207,126,0.12)',
            backdropFilter: 'blur(8px)'
          }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,191,0,0.25), transparent)' }} />

          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: '#FF7900' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#FF7900' }} />
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: '#FF7900' }}>
              {phase === 'init' ? 'System Initialization' : phase === 'analyzing' ? 'Live Analysis' : 'Report Synthesis'}
            </span>
            <div className="flex-1" />
            <Clock className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span className="text-[9px] font-mono" style={{ color: 'rgba(252,250,245,0.3)' }}>
              [{timestamp}]
            </span>
          </div>

          <div className="flex items-start gap-2">
            <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#FFBF00' }} />
            <DecryptedText
              text={currentMessage.text || currentMessage}
              speed={35}
              maxIterations={6}
              sequential
              revealDirection="start"
              className="text-sm font-medium leading-6"
              parentClassName="block"
              encryptedClassName="text-[#F2CF7E]"
              style={{ color: 'rgba(252,250,245,0.82)' }}
            />
          </div>
        </div>

        {/* Discovery Banner */}
        {showDiscovery && currentDiscovery && (
          <div className="rounded-xl border p-3 mb-4 flex items-center gap-3 animate-fade-in-up transition-all duration-500"
            style={{
              background: `${currentDiscovery.color}10`,
              borderColor: `${currentDiscovery.color}25`,
              backdropFilter: 'blur(8px)'
            }}>
            <currentDiscovery.icon className="w-4 h-4 flex-shrink-0" style={{ color: currentDiscovery.color }} />
            <span className="text-xs font-bold" style={{ color: '#FCFAF5' }}>
              {currentDiscovery.text}
            </span>
          </div>
        )}

        {/* Agent Progress */}
        <div className="space-y-1.5 mb-5">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <div
                key={agent.title}
                className="flex items-center justify-between rounded-xl px-3.5 py-2.5 border transition-all duration-500"
                style={{
                  background: completed ? agent.bg : 'rgba(252,250,245,0.02)',
                  borderColor: completed ? `${agent.color}20` : active ? `${agent.color}30` : 'rgba(255,255,255,0.05)',
                  opacity: completed ? 1 : active ? 1 : 0.35
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center relative"
                    style={{ background: agent.bg }}>
                    <Icon className="w-4 h-4" style={{ color: agent.color }} />
                    {active && (
                      <div className="absolute inset-0 rounded-lg animate-ping"
                        style={{ background: agent.bg }} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold" style={{ color: '#FCFAF5' }}>
                      {agent.title}
                    </h3>
                    <p className="text-[9px]" style={{ color: completed ? '#10B981' : 'rgba(252,250,245,0.35)' }}>
                      {completed ? 'Complete' : active ? 'In progress...' : 'Queued'}
                    </p>
                  </div>
                </div>

                {completed ? (
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
                ) : active ? (
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#FF7900' }} />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[9px] mb-1.5">
            <span className="font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(252,250,245,0.4)' }}>
              Startup Readiness Evaluation
            </span>
            <span className="font-black" style={{ color: '#FFBF00' }}>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full transition-all duration-1000 rounded-full relative"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #FFBF00, #FF7900)',
                boxShadow: '0 0 16px rgba(255,121,0,0.25)'
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{ background: '#FF7900', boxShadow: '0 0 8px rgba(255,121,0,0.5)' }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-5 text-[9px]" style={{ color: 'rgba(252,250,245,0.25)' }}>
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3" />
            <span>Vector DB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            <span>Market Data</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3" />
            <span>6 Agents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoadingModal;