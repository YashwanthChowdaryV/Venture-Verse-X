import React from 'react';
import { Target, TrendingUp, DollarSign, Users, AlertTriangle, ShieldCheck, ListPlus, MapPin, Zap, RefreshCw } from 'lucide-react';

const AgentTab = ({ agentType, data, startupId, onReRunAgent, reRunningAgent }) => {
  if (!data) {
    return (
      <div className="p-8 text-center text-slate-500 italic bg-slate-900/40 rounded-2xl border border-slate-800">
        No report data received from this Agent.
      </div>
    );
  }

  const isReRunning = reRunningAgent === agentType;

  // Helper to render individual agent action header
  const renderAgentHeader = (agentLabel) => {
    if (!startupId || !onReRunAgent) return null;
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-850/80 mb-6">
        <div>
          <h4 className="text-sm font-bold text-slate-350">Independent {agentLabel} Evaluation</h4>
          <p className="text-xs text-slate-500 mt-0.5">Run this single agent's assessment independently using the latest venture parameters.</p>
        </div>
        <button
          onClick={() => onReRunAgent(agentType)}
          disabled={isReRunning}
          className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-indigo-650 hover:bg-indigo-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReRunning ? 'animate-spin' : ''}`} />
          <span>{isReRunning ? 'Re-running...' : 'Re-run Agent'}</span>
        </button>
      </div>
    );
  };

  // Helper to render string, lists or numbers
  const renderField = (label, value, icon) => {
    if (value === undefined || value === null) return null;

    return (
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 hover:border-slate-800 transition-colors">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
          {icon && <span className="text-indigo-400">{icon}</span>}
          <span>{label}</span>
        </span>
        {Array.isArray(value) ? (
          <ul className="space-y-2 mt-1">
            {value.map((item, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start space-x-2">
                <span className="text-indigo-500 font-bold mr-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {value}
          </p>
        )}
      </div>
    );
  };

  const renderSectionHeader = (title, icon) => (
    <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800/80 mb-4">
      {icon && <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-400">{icon}</div>}
      <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
    </div>
  );

  switch (agentType) {
    case 'investor':
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          {renderAgentHeader('Investor')}
          
          {/* Main highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Investment Attractiveness', data.investmentAttractiveness, <Zap className="w-4 h-4" />)}
            {renderField('Fundability Rating', data.fundability, <DollarSign className="w-4 h-4" />)}
            {renderField('VC Appeal', data.vcAppeal, <TrendingUp className="w-4 h-4" />)}
            {renderField('Startup Stage Fit', data.startupStageFit, <Target className="w-4 h-4" />)}
          </div>

          {/* Market Sizing */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Market Sizing & TAM', <Target className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField('TAM (Total Addressable Market)', data.tam)}
              {renderField('SAM (Serviceable Addressable Market)', data.sam)}
              {renderField('SOM (Serviceable Obtainable Market)', data.som)}
            </div>
            {renderField('Market Size Context', data.marketSize)}
          </div>

          {/* SWOT-like strengths / weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Strengths', data.strengths)}
            {renderField('Weaknesses', data.weaknesses)}
            {renderField('Opportunities', data.opportunities)}
            {renderField('Threats', data.threats)}
          </div>

          {/* Long Term */}
          <div className="space-y-6">
            {renderField('Long Term Opportunity', data.longTermOpportunity)}
            {renderField('Detailed Investor Analysis Narrative', data.analysis)}
          </div>
        </div>
      );

    case 'competitor':
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          {renderAgentHeader('Competitor')}

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Market Saturation', data.marketSaturation, <Zap className="w-4 h-4" />)}
            {renderField('Competitive Position', data.competitivePosition, <TrendingUp className="w-4 h-4" />)}
          </div>

          {/* Competitors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Direct Competitors', data.directCompetitors)}
            {renderField('Indirect Competitors', data.indirectCompetitors)}
          </div>

          {/* Moats and Barriers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Defensive Moats', data.moats)}
            {renderField('Barriers to Entry', data.barriersToEntry)}
          </div>

          {/* Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Competitive Gaps', data.competitiveGaps)}
            {renderField('Market Gaps', data.marketGaps)}
          </div>

          {/* Strengths / Threats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Competitive Strengths', data.strengths)}
            {renderField('Competitive Threats', data.threats)}
          </div>

          {renderField('Competitor Analysis Narrative', data.analysis)}
        </div>
      );

    case 'finance':
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          {renderAgentHeader('Finance')}

          {/* Unit Economics */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Unit Economics', <DollarSign className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {renderField('CAC (Customer Acquisition Cost)', data.cac)}
              {renderField('LTV (Lifetime Value)', data.ltv)}
              {renderField('LTV / CAC Ratio', data.ltvCacRatio)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {renderField('Pricing Strategy', data.pricingStrategy)}
              {renderField('Unit Economics Summary', data.unitEconomics)}
            </div>
          </div>

          {/* Financial Performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField('Year 1 Revenue Projection', data.year1Revenue)}
            {renderField('Year 2 Revenue Projection', data.year2Revenue)}
            {renderField('Year 3 Revenue Projection', data.year3Revenue)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Burn Rate', data.burnRate)}
            {renderField('Financial Runway', data.runway)}
          </div>

          {/* Revenue Streams */}
          {renderField('Revenue Streams', data.revenueStreams)}

          {/* Fundraising Details */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Fundraising & Cash Plan', <TrendingUp className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('Required Capital', data.requiredCapital)}
              {renderField('Fundraising Needs', data.fundraisingNeed)}
            </div>
            {renderField('Use of Funds Breakdown', data.useOfFunds)}
          </div>

          {/* Sustainability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Profitability Timeline', data.profitabilityTimeline)}
            {renderField('Financial Sustainability Plan', data.financialSustainability)}
          </div>

          {renderField('Financial Analysis Narrative', data.analysis)}
        </div>
      );

    case 'customer':
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          {renderAgentHeader('Customer')}

          {/* Personas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Primary Target Persona', data.primaryPersona, <Users className="w-4 h-4" />)}
            {renderField('Secondary Target Persona', data.secondaryPersona, <Users className="w-4 h-4" />)}
          </div>

          {/* Customer Pain Points */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Customer Pain Validation', <Zap className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField('Pain Severity', data.painSeverity)}
              {renderField('Pain Frequency', data.painFrequency)}
              {renderField('Pain Urgency', data.painUrgency)}
            </div>
          </div>

          {/* Retention & PMF */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField('Adoption Likelihood', data.adoptionLikelihood)}
            {renderField('Retention Potential', data.retentionPotential)}
            {renderField('Product Market Fit Path', data.productMarketFit)}
          </div>

          {/* Customer Journey */}
          {renderField('Customer Journey Map', data.customerJourney)}

          {/* Channels & Objections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Customer Channels', data.customerChannels)}
            {renderField('Key Objections & Counterstrategies', data.customerObjections)}
          </div>

          {/* Market validation */}
          {renderField('Market Demand Validation', data.marketDemandValidation)}

          {renderField('Customer Analysis Narrative', data.analysis)}
        </div>
      );

    case 'risk':
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          {renderAgentHeader('Risk')}

          {/* Risk vectors */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Risk Matrix Indicators', <AlertTriangle className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {renderField('Market Risk', data.marketRisk)}
              {renderField('Execution Risk', data.executionRisk)}
              {renderField('Financial Risk', data.financialRisk)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {renderField('Regulatory Risk', data.regulatoryRisk)}
              {renderField('Operational Risk', data.operationalRisk)}
              {renderField('Technology Risk', data.technologyRisk)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {renderField('Scalability Risk', data.scalabilityRisk)}
              {renderField('Adoption Risk', data.adoptionRisk)}
              {renderField('Founder Risk', data.founderRisk)}
            </div>
          </div>

          {/* Risks lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Top Risks Identified', data.topRisks)}
            {renderField('Mitigation Strategies', data.mitigationStrategies)}
          </div>

          {renderField('Risk Assessment Narrative', data.analysis)}
        </div>
      );

    case 'productStrategy':
      return (
        <div className="space-y-8 animate-in fade-in duration-200">
          {renderAgentHeader('Product Strategy')}

          {/* Features MoSCoW */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Product Scope (MoSCoW)', <ListPlus className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {renderField('MVP Core Features', data.mvpFeatures)}
              {renderField('Must Have Features', data.mustHaveFeatures)}
              {renderField('Should Have Features', data.shouldHaveFeatures)}
              {renderField('Could Have Features', data.couldHaveFeatures)}
            </div>
          </div>

          {/* Roadmap */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            {renderSectionHeader('Phased Implementation Roadmap', <MapPin className="w-4.5 h-4.5" />)}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderField('Phase 1: Foundation', data.phase1Roadmap)}
              {renderField('Phase 2: Growth', data.phase2Roadmap)}
              {renderField('Phase 3: Scale', data.phase3Roadmap)}
            </div>
          </div>

          {/* GTM & Growth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Go-To-Market (GTM) Strategy', data.gtmStrategy)}
            {renderField('Growth Strategy', data.growthStrategy)}
          </div>

          {/* Validation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('Validation & Experimentation Plan', data.validationPlan)}
            {renderField('KPIs & Metrics to Track', data.kpis)}
          </div>

          {/* Next 90 Days Actions */}
          {renderField('Next 90 Days Execution Plan', data.next90Days)}

          {renderField('Product Strategy Narrative', data.analysis)}
        </div>
      );

    default:
      return null;
  }
};

export default AgentTab;
