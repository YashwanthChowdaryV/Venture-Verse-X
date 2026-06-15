import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import ExecutiveSummarySection from '../components/sections/ExecutiveSummarySection';
import ShapeGrid from '../components/ShapeGrid';
import { Play, FileText, TrendingUp, Download, CheckCircle2, Share2, Target, Activity } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { orchestratorAPI } from '../api/api';

const API_BASE_URL = 'http://localhost:8080';

const ExecutiveSummaryPage = () => {
  const { report, startup, runFullAnalysis } = useOutletContext();
  const { id: startupId } = useParams();
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [reportId, setReportId] = useState(null);

  useEffect(() => {
    const fetchReportId = async () => {
      if (!startupId) return;
      try {
        const history = await orchestratorAPI.getReportHistory(startupId);
        if (history && history.length > 0) {
          const sorted = history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setReportId(sorted[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch report history:', err);
      }
    };
    fetchReportId();
  }, [startupId]);

  const handleDownloadReport = async () => {
    if (!reportId) {
      toast.error('No report ID found. Please generate a report first.');
      return;
    }

    setDownloading(true);
    setDownloadComplete(false);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/reports/export/${reportId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const safeName = (startup?.startupName || 'Venture')
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_');

      link.setAttribute('download', `VentureVerseX_${safeName}_Due_Diligence_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadComplete(true);
      toast.success('Report downloaded successfully!');

      setTimeout(() => setDownloadComplete(false), 2000);
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Failed to download report. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShareReport = () => {
    if (!reportId) {
      toast.error('No report ID found. Please generate a report first.');
      return;
    }
    const shareUrl = `${window.location.origin}/startups/${startupId}/executive-summary?reportId=${reportId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Report link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link.');
    });
  };

  const getScoreGrade = (score) => {
    if (!score && score !== 0) return { grade: 'N/A', color: '#5C5C5C', label: 'Not Scored' };
    if (score >= 90) return { grade: 'A+', color: '#10B981', label: 'Exceptional' };
    if (score >= 80) return { grade: 'A', color: '#10B981', label: 'Strong' };
    if (score >= 70) return { grade: 'B+', color: '#FFBF00', label: 'Promising' };
    if (score >= 60) return { grade: 'B', color: '#FFBF00', label: 'Developing' };
    if (score >= 50) return { grade: 'C', color: '#FF7900', label: 'Needs Work' };
    return { grade: 'D', color: '#EF4444', label: 'Critical' };
  };

  const overallGrade = getScoreGrade(report?.overallScore);

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

        <div className="flex min-h-[60vh] items-center justify-center">
          <div
            className="relative overflow-hidden rounded-[28px] border p-10 text-center max-w-2xl mx-auto space-y-8 shadow-[0_20px_60px_rgba(30,30,30,0.06)]"
            style={{
              background: 'linear-gradient(145deg, #FCFAF5 55%, rgba(255,191,0,0.08) 100%)',
              borderColor: 'rgba(242,207,126,0.48)'
            }}
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl" style={{ background: 'rgba(255,191,0,0.15)' }} />
            <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full blur-3xl" style={{ background: 'rgba(255,230,66,0.18)' }} />

            <div className="relative z-10 space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border"
                style={{ background: 'rgba(255,191,0,0.12)', borderColor: 'rgba(255,191,0,0.25)', color: '#FF7900' }}>
                <FileText className="h-7 w-7" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ background: '#FF7900' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#FF7900' }} />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#5C5C5C' }}>Executive Intelligence</span>
                </div>
                <h2 className="text-2xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>Diligence Report Required</h2>
                <p className="text-sm leading-6 max-w-lg mx-auto" style={{ color: '#5C5C5C' }}>
                  The Executive Summary assessment has not been generated yet. Run the AI due diligence orchestrator to evaluate this venture.
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
      <div
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #FCFAF5 42%, #FFF8E6 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.18]">
          <ShapeGrid speed={0.35} squareSize={42} direction="diagonal" borderColor="#F2CF7E" hoverFillColor="#FFE642" shape="square" hoverTrailAmount={0} />
        </div>
      </div>

      {/* Executive Command Center Bar */}
      <div className="relative z-20 mb-6">
        <div className="rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: 'rgba(252,250,245,0.80)',
            borderColor: 'rgba(242,207,126,0.35)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)',
            backdropFilter: 'blur(12px)'
          }}>

          {/* Left: Title + Verdict */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="rounded-xl p-2.5 shrink-0"
              style={{ background: 'rgba(255,191,0,0.10)', border: '1px solid rgba(255,191,0,0.18)' }}>
              <Target className="w-5 h-5" style={{ color: '#FF7900' }} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                  style={{ background: 'rgba(255,191,0,0.08)', borderColor: 'rgba(255,191,0,0.15)', color: '#FF7900' }}>
                  Board Report
                </span>
                {report?.finalVerdict && (
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                    style={{ background: 'rgba(255,121,0,0.08)', borderColor: 'rgba(255,121,0,0.15)', color: '#FF7900' }}>
                    {report.finalVerdict}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-[-0.03em] truncate" style={{ color: '#1E1E1E' }}>
                Executive Command Center
              </h2>
              <p className="text-xs font-medium mt-0.5" style={{ color: '#5C5C5C' }}>
                Consolidated strategic assessment across all AI agents
              </p>
            </div>
          </div>

          {/* Right: Score + Grade + Actions */}
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black tracking-[-0.03em]" style={{ color: '#1E1E1E' }}>
                  {report?.overallScore || '--'}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Readiness</span>
              </div>
              <div className="w-px h-10" style={{ background: 'rgba(0,0,0,0.06)' }} />
              <div className="flex flex-col items-center">
                <span className="text-lg font-black tracking-[-0.02em]" style={{ color: overallGrade.color }}>{overallGrade.grade}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Grade</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10" style={{ background: 'rgba(0,0,0,0.06)' }} />

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleDownloadReport}
                disabled={downloading || !reportId}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 hover:-translate-y-0.5 border disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                style={{
                  background: downloadComplete ? '#10B981' : '#FFBF00',
                  borderColor: 'rgba(0,0,0,0.08)',
                  color: '#1E1E1E'
                }}
              >
                {downloading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#1E1E1E] border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Generating...</span>
                  </>
                ) : downloadComplete ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareReport}
                disabled={!reportId}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 hover:-translate-y-0.5 border disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)', color: '#5C5C5C' }}
              >
                <Share2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                <span>Share Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative space-y-6">
        <ExecutiveSummarySection
          data={report.executiveSummary}
          overallScore={report.overallScore}
          finalVerdict={report.finalVerdict}
          startupName={startup?.startupName}
        />
      </div>
    </div>
  );
};

export default ExecutiveSummaryPage;