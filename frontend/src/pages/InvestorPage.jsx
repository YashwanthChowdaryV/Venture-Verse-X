import React from 'react';
import { useOutletContext } from 'react-router-dom';
import InvestorSection from '../components/sections/InvestorSection';
import ShapeGrid from '../components/ShapeGrid';
import { Sparkles, Play } from 'lucide-react';

const InvestorPage = () => {
  const { report, startup, handleReRunAgent, reRunningAgent, runFullAnalysis } = useOutletContext();

  if (!report) {
    return (
      <div className="relative isolate -m-4 p-4 pt-8 animate-fade-in-up sm:-m-6 sm:p-6 sm:pt-10">
        <div
          className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FCFAF5 42%, #FFF8E6 100%)' }}
        >
          <div className="absolute inset-0 opacity-[0.18]">
            <ShapeGrid speed={0.35} squareSize={42} direction="diagonal" borderColor="#F2CF7E" hoverFillColor="#FFE642" shape="square" hoverTrailAmount={0} />
          </div>
        </div>

        <div className="rounded-2xl p-8 text-center max-w-xl mx-auto my-12 space-y-6 animate-fade-in-up border"
          style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto border"
            style={{ background: 'rgba(255,191,0,0.08)', borderColor: 'rgba(255,191,0,0.15)', color: '#FFBF00' }}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold" style={{ color: '#1E1E1E' }}>Investor Analysis Required</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
              The Investor assessment has not been generated yet. Run the AI due diligence orchestrator to evaluate this venture.
            </p>
          </div>
          <button
            onClick={runFullAnalysis}
            className="inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl text-sm transition-all cursor-pointer border"
            style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run AI Orchestrator</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate -m-4 p-4 pt-8 pb-12 animate-fade-in-up sm:-m-6 sm:p-6 sm:pt-10 sm:pb-14">
      <div
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FCFAF5 42%, #FFF8E6 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.18]">
          <ShapeGrid speed={0.35} squareSize={42} direction="diagonal" borderColor="#F2CF7E" hoverFillColor="#FFE642" shape="square" hoverTrailAmount={0} />
        </div>
      </div>

      <div className="space-y-6">
        <InvestorSection
          data={report.investorDetails}
          startupId={startup.id}
          onReRunAgent={handleReRunAgent}
          reRunningAgent={reRunningAgent}
          startupName={startup?.startupName}
        />
      </div>
    </div>
  );
};

export default InvestorPage;