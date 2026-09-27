import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, ShieldCheck, Calendar, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCurrency, formatPercentage, formatDate } from '../../utils/formatters';

export default function RecentPredictions({ predictions = [], onSelectPrediction }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-50 text-brand-accent">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">Recent Prediction Inferences</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest inference assessments processed by the machine learning pipeline
          </p>
        </div>
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-accent bg-blue-50 hover:bg-blue-100 border border-blue-200/70 transition-colors group self-start sm:self-center"
        >
          <span>View All In History</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-6">Application ID</th>
              <th className="py-3.5 px-4">Applicant</th>
              <th className="py-3.5 px-4">Credit Score</th>
              <th className="py-3.5 px-4">Loan Amount</th>
              <th className="py-3.5 px-4">Risk Tier</th>
              <th className="py-3.5 px-4">Probability</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-6 text-right">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
            {predictions.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ShieldCheck className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No prediction evaluations available yet</p>
                    <p className="text-[11px] text-slate-400">Make your first loan prediction to populate this telemetry table.</p>
                  </div>
                </td>
              </tr>
            ) : (
              predictions.slice(0, 5).map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectPrediction && onSelectPrediction(item)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors duration-100 group"
                >
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    <span className="font-mono text-xs font-bold text-brand-accent bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {item.id}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <span className="text-xs truncate max-w-[130px] block">
                      {item.applicantName || 'Applicant Profile'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-slate-800">
                    {item.CreditScore}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 text-xs">
                    {formatCurrency(item.LoanAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge>{item.risk_level}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 text-xs">
                    {formatPercentage(item.probability)}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                    {formatDate(item.date)}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPrediction && onSelectPrediction(item);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 group-hover:text-brand-accent bg-slate-50 group-hover:bg-blue-50 rounded-lg transition-colors border border-slate-200 group-hover:border-blue-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
