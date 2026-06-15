import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ExportReportModal = ({ isOpen, onClose, startupName = 'Venture' }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [fileName, setFileName] = useState(`${startupName.replace(/\s+/g, '_')}_Diligence_Report_${currentDate}`);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [customStartupName, setCustomStartupName] = useState(startupName);
  const [exportType, setExportType] = useState('full'); // full, summary, investor, competitor, finance, customer, risk, product
  const [format, setFormat] = useState('PDF'); // PDF, JSON, CSV
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const exportOptions = [
    { id: 'full', label: 'Full Diligence Report', desc: 'Complete analysis containing all 7 agent evaluations.' },
    { id: 'summary', label: 'Executive Summary Only', desc: 'Readiness scores, immediate actions, and key risks.' },
    { id: 'investor', label: 'Investor Analysis', desc: 'TAM/SAM/SOM, VC appeal, and SWOT matrix.' },
    { id: 'competitor', label: 'Competitor Intelligence', desc: 'Direct/indirect registry, moats, and saturation.' },
    { id: 'finance', label: 'Financial CFO Report', desc: 'CAC, LTV, burn rate, runway, and projections.' },
    { id: 'customer', label: 'Customer Validation', desc: 'Target personas, pain points mapping, and PMF.' },
    { id: 'risk', label: 'Risk Command Assessment', desc: 'Threat vectors and structured mitigation steps.' },
    { id: 'product', label: 'Product Roadmap Workspace', desc: 'MoSCoW priorities and 90-day execution milestones.' },
  ];

  const handleExport = (e) => {
    e.preventDefault();
    setIsExporting(true);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsExporting(false);
      onClose();
      toast.custom(
        (t) => (
          <div className={`${t.visible ? 'animate-fade-in-up' : 'animate-leave'} max-w-md w-full shadow-lg rounded-xl pointer-events-auto flex border p-4`}
            style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="flex-1 w-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <AlertCircle className="h-5 w-5" style={{ color: '#FF7900' }} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-xs font-bold" style={{ color: '#1E1E1E' }}>Export Request Received</p>
                  <p className="text-[10px] mt-1" style={{ color: '#5C5C5C' }}>
                    Successfully configured <strong>{format}</strong> export. Note: PDF export backend integration coming soon.
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="rounded-lg inline-flex text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ),
        { duration: 5000 }
      );
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border flex flex-col md:flex-row"
          style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}
        >
          {/* Left panel: Info & Options selector */}
          <div className="flex-1 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4.5 h-4.5" style={{ color: '#FFBF00' }} />
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1E1E1E' }}>Report Options</h3>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {exportOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setExportType(opt.id)}
                    className="w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between cursor-pointer"
                    style={{
                      background: exportType === opt.id ? 'rgba(255,191,0,0.04)' : '#F9F6EE',
                      borderColor: exportType === opt.id ? '#FFBF00' : 'rgba(0,0,0,0.05)',
                    }}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold" style={{ color: '#1E1E1E' }}>{opt.label}</p>
                      <p className="text-[10px] mt-0.5 leading-normal" style={{ color: '#5C5C5C' }}>{opt.desc}</p>
                    </div>
                    {exportType === opt.id && (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFBF00' }}>
                        <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-[10px]" style={{ borderColor: 'rgba(0,0,0,0.08)', color: '#5C5C5C' }}>
              Select report type. Outputs are rendered in high-resolution, vector-accurate layouts.
            </div>
          </div>

          {/* Right panel: Settings & Actions */}
          <form onSubmit={handleExport} className="w-full md:w-[260px] p-6 flex flex-col justify-between bg-zinc-50/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Export Settings</span>
                <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-200/50">
                  <X className="w-4 h-4" style={{ color: '#5C5C5C' }} />
                </button>
              </div>

              {/* Startup Name */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Startup Name</label>
                <input
                  type="text"
                  required
                  value={customStartupName}
                  onChange={(e) => setCustomStartupName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border focus:outline-none"
                  style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                />
              </div>

              {/* File Name */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>File Name</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border focus:outline-none"
                  style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                />
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Date</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border focus:outline-none"
                  style={{ background: '#F9F6EE', borderColor: 'rgba(0,0,0,0.08)', color: '#1E1E1E' }}
                />
              </div>

              {/* Format selection */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>Format</label>
                <div className="grid grid-cols-3 gap-1 bg-[#F9F6EE] p-0.5 rounded border" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  {['PDF', 'JSON', 'CSV'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className="py-1 text-[9px] font-bold rounded transition-all cursor-pointer"
                      style={{
                        background: format === fmt ? '#FCFAF5' : 'transparent',
                        color: format === fmt ? '#FF7900' : '#5C5C5C',
                        boxShadow: format === fmt ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                      }}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isExporting}
              className="w-full mt-6 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border"
              style={{
                background: '#FFBF00',
                borderColor: 'rgba(0,0,0,0.08)',
                color: '#1E1E1E',
              }}
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-pulse' : ''}`} />
              <span>{isExporting ? 'Exporting...' : 'Confirm Export'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExportReportModal;
