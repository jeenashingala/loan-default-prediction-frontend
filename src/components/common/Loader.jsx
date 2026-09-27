import React from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ size = 'md', className = '', label = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-brand-accent`} />
      {label && <span className="text-xs text-slate-500 font-medium">{label}</span>}
    </div>
  );
}

export function SkeletonCard({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm animate-pulse space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-9 w-9 bg-slate-200 rounded-lg"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-36"></div>
          <div className="h-3 bg-slate-200 rounded w-44"></div>
        </div>
      ))}
    </>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-slate-200"></div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center p-4 gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className="h-4 bg-slate-200 rounded flex-1"
                style={{ width: `${80 - c * 5}%` }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart({ height = 'h-72' }) {
  return (
    <div
      className={`w-full ${height} bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between animate-pulse`}
    >
      <div className="flex items-center justify-between">
        <div className="h-5 bg-slate-200 rounded w-36"></div>
        <div className="h-4 bg-slate-200 rounded w-20"></div>
      </div>
      <div className="flex items-end justify-between h-40 gap-3 px-4 pt-6">
        <div className="w-full bg-slate-100 rounded-t h-3/5"></div>
        <div className="w-full bg-slate-200 rounded-t h-4/5"></div>
        <div className="w-full bg-slate-100 rounded-t h-2/5"></div>
        <div className="w-full bg-slate-200 rounded-t h-full"></div>
        <div className="w-full bg-slate-100 rounded-t h-3/4"></div>
        <div className="w-full bg-slate-200 rounded-t h-1/2"></div>
      </div>
      <div className="h-3 bg-slate-200 rounded w-48 mt-4"></div>
    </div>
  );
}

export default Spinner;
