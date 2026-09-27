import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = 'default', // 'default' | 'danger' | 'success' | 'accent'
  delay = 0,
}) {
  const variantStyles = {
    default: {
      border: 'border-slate-200/80',
      topBar: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      valueColor: 'text-slate-900',
    },
    danger: {
      border: 'border-rose-200/90',
      topBar: 'bg-gradient-to-r from-rose-500 to-red-600',
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
      valueColor: 'text-rose-600',
    },
    success: {
      border: 'border-emerald-200/90',
      topBar: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      valueColor: 'text-emerald-600',
    },
    accent: {
      border: 'border-cyan-200/90',
      topBar: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
      valueColor: 'text-slate-900',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`relative overflow-hidden bg-white rounded-2xl p-6 border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between ${currentVariant.border}`}
    >
      {/* Subtle top indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${currentVariant.topBar}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className={`text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight ${currentVariant.valueColor}`}>
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${currentVariant.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-600">{description}</span>
      </div>
    </motion.div>
  );
}
