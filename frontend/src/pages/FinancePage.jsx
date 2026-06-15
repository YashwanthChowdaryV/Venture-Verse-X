import React from 'react';
import { useOutletContext } from 'react-router-dom';
import FinanceSection from '../components/sections/FinanceSection';
import ShapeGrid from '../components/ShapeGrid';
import { Sparkles, Play, DollarSign, TrendingUp } from 'lucide-react';

const FinancePage = () => {
  const { report, startup, handleReRunAgent, reRunningAgent, runFullAnalysis } = useOutletContext();

  if (!report) {
    return (
      <div className="relative isolate -m-4 p-4 pt-8 animate-fade-in-up sm:-m-6 sm:p-6 sm:pt-10">
        {/* Background gradient overlay */}
        <div
          className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FCFAF5 42%, #FFF8E6 100%)' }}
        >
          <div className="absolute inset-0 opacity-[0.18]">
            <ShapeGrid
              speed={0.35}
              squareSize={42}
              direction="diagonal"
              borderColor="#F2CF7E"
              hoverFillColor="#FFE642"
              shape="square"
              hoverTrailAmount={0}
            />
          </div>
        </div>

        <div className="flex min-h-[60vh] items-center justify-center">
          <div
            className="relative overflow-hidden rounded-[28px] border p-10 text-center max-w-2xl mx-auto space-y-8 shadow-[0_20px_60px_rgba(30,30,30,0.06)]"
            style={{
              background: 'linear-gradient(145deg, #FCFAF5 55%, rgba(255,191,0,0.08) 100%)',
              borderColor: 'rgba(242,207,126,0.48)'
            }}
          >
            {/* Decorative blur circles */}
            <div
              className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
              style={{ background: 'rgba(255,191,0,0.15)' }}
            />
            <div
              className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'rgba(255,230,66,0.18)' }}
            />

            <div className="relative z-10 space-y-6">
              {/* Icon container */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border"
                style={{
                  background: 'rgba(255,191,0,0.12)',
                  borderColor: 'rgba(255,191,0,0.25)',
                  color: '#FF7900'
                }}>
                <DollarSign className="h-7 w-7" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ background: '#FF7900' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#FF7900' }} />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#5C5C5C' }}>
                    Finance Intelligence
                  </span>
                </div>

                <h2 className="text-2xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>
                  Finance Assessment Required
                </h2>

                <p className="text-sm leading-6 max-w-lg mx-auto" style={{ color: '#5C5C5C' }}>
                  The Finance assessment has not been generated yet. Run the AI due diligence orchestrator to evaluate this venture's financial health, revenue potential, and investment readiness.
                </p>
              </div>

              <button
                onClick={runFullAnalysis}
                className="group inline-flex items-center gap-2.5 px-6 py-3 font-black rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,121,0,0.28)] border"
                style={{ background: '#FFBF00', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
              >
                <Play className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" />
                <span>Run AI Orchestrator</span>
                <TrendingUp className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate -m-4 p-4 pt-8 pb-12 animate-fade-in-up sm:-m-6 sm:p-6 sm:pt-10 sm:pb-14">
      {/* Background gradient overlay with ShapeGrid */}
      <div
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FCFAF5 42%, #FFF8E6 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.18]">
          <ShapeGrid
            speed={0.35}
            squareSize={42}
            direction="diagonal"
            borderColor="#F2CF7E"
            hoverFillColor="#FFE642"
            shape="square"
            hoverTrailAmount={0}
          />
        </div>
      </div>

      <div className="relative space-y-6">
        <FinanceSection
          data={report.financeDetails}
          startupId={startup.id}
          onReRunAgent={handleReRunAgent}
          reRunningAgent={reRunningAgent}
        />
      </div>
    </div>
  );
};

export default FinancePage;