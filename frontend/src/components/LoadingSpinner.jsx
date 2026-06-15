import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
        {/* Middle Ring */}
        <div className="absolute inset-2 rounded-full border-4 border-slate-900 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        {/* Inner Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-slate-300 font-semibold tracking-wide text-sm">{message}</p>
        <p className="text-slate-500 text-xs">Powered by multi-agent AI</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
