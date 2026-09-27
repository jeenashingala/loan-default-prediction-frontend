import React from 'react';
import { getRiskTheme } from '../../utils/risk';

export default function Badge({ children, variant = 'neutral', size = 'md', className = '' }) {
  // If variant matches risk levels
  const lower = String(children || variant).toLowerCase();
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (lower.includes('low')) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
  } else if (lower.includes('med')) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200/80';
  } else if (lower.includes('high')) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200/80';
  } else if (variant === 'primary' || lower.includes('connected') || lower.includes('active')) {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200/80';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          lower.includes('low')
            ? 'bg-emerald-500'
            : lower.includes('med')
            ? 'bg-amber-500'
            : lower.includes('high')
            ? 'bg-rose-500'
            : 'bg-blue-500'
        }`}
      />
      {children}
    </span>
  );
}
