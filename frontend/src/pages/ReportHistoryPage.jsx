import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HistorySection from '../components/sections/HistorySection';

const ReportHistoryPage = () => {
  const { startup, history, runFullAnalysis } = useOutletContext();

  return (
    <div className="space-y-6">
      <HistorySection
        history={history}
        startup={startup}
        runFullAnalysis={runFullAnalysis}
      />
    </div>
  );
};

export default ReportHistoryPage;
