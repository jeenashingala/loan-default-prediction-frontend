import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, AlertCircle, ShieldAlert, Cpu, Sparkles, HelpCircle } from 'lucide-react';
import { getRiskTheme, RISK_LEVELS } from '../../utils/risk';
import { formatPercentage } from '../../utils/formatters';

export default function ResultCard({ result }) {
  if (!result) return null;

  const probability = result.probability ?? 0;
  const riskTheme = getRiskTheme(result.risk_level || probability);
  // Ensure probability is 0-100 formatted correctly
  const percentage = Math.round(probability > 1 ? probability : probability * 100);

  // SVG circular gauge math
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isLow = riskTheme.level === RISK_LEVELS.LOW;
  const isMed = riskTheme.level === RISK_LEVELS.MEDIUM;
  const isHigh = riskTheme.level === RISK_LEVELS.HIGH;

  const getStatusIcon = () => {
    if (isLow) return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    if (isMed) return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    return <AlertCircle className="w-5 h-5 text-rose-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, type: 'spring', stiffness: 240, damping: 22 }}
      className={`relative overflow-hidden rounded-3xl border-2 ${
        isLow ? 'border-emerald-500/40 shadow-glow-emerald' : isMed ? 'border-amber-500/40' : 'border-rose-500/40 shadow-glow-rose'
      } bg-white shadow-2xl`}
    >
      {/* Top Banner Accent Gradient */}
      <div className={`h-3 w-full bg-gradient-to-r ${riskTheme.gradient}`} />

      <div className="p-6 sm:p-8 text-center flex flex-col items-center">
        {/* Subtitle tag */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span>Machine Learning Prediction Result</span>
        </div>

        {/* Risk Category Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest border shadow-xs mb-6 ${riskTheme.badge}`}
        >
          {getStatusIcon()}
          <span>{riskTheme.level}</span>
        </div>

        {/* Large Circular Progress / Risk Indicator Gauge */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 150 150">
            {/* Background circular track */}
            <circle
              cx="75"
              cy="75"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            {/* Animated risk stroke fill */}
            <motion.circle
              cx="75"
              cy="75"
              r={radius}
              stroke={riskTheme.fill}
              strokeWidth="12"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Centered Large Percentage & Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className={`text-4xl sm:text-5xl font-black tracking-tight font-mono ${riskTheme.text}`}
            >
              {formatPercentage(probability, 1)}
            </motion.span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">
              Default Probability
            </span>
          </div>
        </div>

        {/* Prediction Class Decision Banner */}
        <div
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold mb-4 flex items-center justify-center gap-2 border ${
            result.prediction === 1
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <span>Model Binary Decision:</span>
          <span className="font-extrabold uppercase font-mono">
            {result.prediction === 1 ? 'Class 1 • Default Likely' : 'Class 0 • Repayment Likely'}
          </span>
        </div>

        {/* Short Explanation of Result */}
        <div className="max-w-md mx-auto space-y-2">
          <h4 className="text-base font-bold text-slate-900">
            {isLow && 'Low Default Propensity Detected'}
            {isMed && 'Moderate Risk Indicators Detected'}
            {isHigh && 'Elevated Default Risk Indicators'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isLow &&
              'This applicant demonstrates strong debt coverage and solid bureau history. Based on historical data, the statistical probability of loan default is low.'}
            {isMed &&
              'This applicant displays balanced risk attributes. Additional verification of debt-to-income and employment consistency is recommended before approval.'}
            {isHigh &&
              'This applicant displays high-risk indicators associated with loan charge-off. Rigorous underwriter scrutiny or collateral guarantees are advised.'}
          </p>
        </div>

        {/* Model Classification Metadata Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 w-full flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-brand-accent" />
            <span className="text-slate-400">Model:</span>
            <span className="font-semibold text-slate-700">
              {result.model || 'Balanced Logistic Regression'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Confidence Cutoff:</span>
            <span className="font-mono font-bold text-slate-700">0.50 Threshold</span>
          </div>
        </div>

        {/* Legal Disclaimer Pill */}
        <div className="mt-3 text-[10px] text-slate-400 leading-tight">
          Machine Learning Probabilistic Estimate • Not a guaranteed financial decision
        </div>
      </div>
    </motion.div>
  );
}
