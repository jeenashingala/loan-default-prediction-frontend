import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Info, CheckCircle2, AlertTriangle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { calculateExplanatoryRiskFactors, getRiskTheme } from '../../utils/risk';

export default function RiskFactors({ applicantData, predictionResult }) {
  if (!applicantData) return null;

  const factors = calculateExplanatoryRiskFactors(applicantData);
  const probability = predictionResult?.probability ?? 0.5;

  const getRiskColor = (level) => {
    const l = String(level).toLowerCase();
    if (l === 'low' || l === 'good' || l === 'stable') {
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        bar: 'bg-emerald-500',
        dot: 'bg-emerald-500',
      };
    }
    if (l === 'medium' || l === 'fair' || l === 'moderate') {
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        bar: 'bg-amber-500',
        dot: 'bg-amber-500',
      };
    }
    return {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      bar: 'bg-rose-500',
      dot: 'bg-rose-500',
    };
  };

  return (
    <div className="space-y-6">
      {/* Risk Factors Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-base font-bold text-slate-900">Key Input Risk Indicators</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Heuristic appraisal of key applicant attributes
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            5 Core Indicators
          </span>
        </div>

        {/* Factors List */}
        <div className="divide-y divide-slate-100 mt-2">
          {factors.map((factor, idx) => {
            const colors = getRiskColor(factor.riskLevel);
            return (
              <motion.div
                key={factor.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: 'easeOut' }}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                    <span className="text-xs font-bold text-slate-900">{factor.label}</span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      ({factor.value})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 pl-4">{factor.detail}</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-56 shrink-0 pl-4 sm:pl-0">
                  {/* Progress bar with smooth animated fill */}
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.percentage}%` }}
                      transition={{ duration: 0.9, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${colors.bar}`}
                    />
                  </div>
                  {/* Badge */}
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-bold rounded-lg border text-center min-w-[70px] shadow-2xs ${colors.badge}`}
                  >
                    {factor.riskLevel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Guidance Note */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>Model Interpretability Note:</strong> These indicator levels represent rule-based UI heuristics calculated on raw applicant inputs for explanatory review. They serve as supportive underwriting context alongside the Balanced Logistic Regression scoring.
          </span>
        </div>
      </div>

      {/* Recommendation & Assessment Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-blue-50 text-brand-accent">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Underwriting Assessment & Recommendation
          </h4>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          {probability >= 0.5 ? (
            <p>
              The model identifies an <strong className="text-rose-700">elevated probability of loan default</strong>. It is strongly advised to conduct in-depth cash flow verification, require supplemental collateral/guarantor coverage, or adjust proposed interest terms prior to loan authorization.
            </p>
          ) : (
            <p>
              The model identifies a <strong className="text-emerald-700">favorable repayment propensity</strong>. Standard compliance checks, KYC document verification, and debt servicing validation are recommended as normal pre-disbursement steps.
            </p>
          )}
        </div>

        {/* Legal ML Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5 shadow-2xs">
          <div className="font-bold flex items-center gap-2 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Machine Learning Advisory Disclaimer</span>
          </div>
          <p className="text-amber-800 leading-relaxed text-[11px] sm:text-xs">
            This estimation is computed by an artificial intelligence model (Balanced Logistic Regression) trained on historical borrower portfolios. Predictions are probabilistic assessments and should never serve as the sole automated criterion for lending sanctions without qualified underwriter oversight.
          </p>
        </div>
      </div>
    </div>
  );
}
