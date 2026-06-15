import React from 'react';

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 ${className}`}>
    <div className="flex items-center gap-3">
      <div className="skeleton w-10 h-10 rounded-lg"></div>
      <div className="space-y-2 flex-1">
        <div className="skeleton h-3 w-1/3 rounded"></div>
        <div className="skeleton h-2.5 w-1/2 rounded"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="skeleton h-2.5 w-full rounded"></div>
      <div className="skeleton h-2.5 w-4/5 rounded"></div>
      <div className="skeleton h-2.5 w-3/5 rounded"></div>
    </div>
  </div>
);

export const SkeletonChart = ({ className = '' }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-xl p-6 ${className}`}>
    <div className="skeleton h-3 w-1/4 rounded mb-4"></div>
    <div className="skeleton h-48 w-full rounded-lg"></div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2.5 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton h-2.5 rounded"
        style={{ width: `${100 - i * 15}%` }}
      ></div>
    ))}
  </div>
);

export const SkeletonGauge = ({ size = 120, className = '' }) => (
  <div
    className={`skeleton rounded-full ${className}`}
    style={{ width: size, height: size }}
  ></div>
);

export const SkeletonKPI = ({ count = 4, className = '' }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="skeleton w-9 h-9 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-2.5 w-2/3 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonReport = () => (
  <div className="space-y-8 animate-fade-in-up">
    {/* Hero skeleton */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex-1 space-y-3">
          <div className="skeleton h-4 w-1/4 rounded"></div>
          <div className="skeleton h-8 w-2/3 rounded"></div>
          <div className="skeleton h-3 w-1/2 rounded"></div>
        </div>
        <SkeletonGauge size={140} />
      </div>
    </div>
    {/* Score cards */}
    <SkeletonKPI count={6} />
    {/* Content sections */}
    <div className="space-y-6">
      <SkeletonCard />
      <SkeletonChart />
      <SkeletonCard />
    </div>
  </div>
);

export default SkeletonReport;
