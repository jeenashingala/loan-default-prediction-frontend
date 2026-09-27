import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function MetricCard({ title, value, description, formula, isAvailable = true }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              isAvailable && value !== null && value !== undefined
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {isAvailable && value !== null && value !== undefined ? 'Verified' : 'Pending API'}
          </span>
        </div>

        <div className="text-2xl sm:text-3xl font-black font-mono mt-3 text-slate-900 tracking-tight">
          {isAvailable && value !== null && value !== undefined
            ? typeof value === 'number'
              ? `${(value * 100).toFixed(1)}%`
              : value
            : '--'}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500 leading-snug">{description}</p>
        {formula && (
          <p className="text-[11px] font-mono text-slate-400 mt-1 truncate">
            {formula}
          </p>
        )}
      </div>
    </div>
  );
}
