import React from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency, formatPercentage, formatDate } from '../../utils/formatters';
import { User, Landmark, BrainCircuit, Calendar, ShieldCheck } from 'lucide-react';

export default function PredictionDetails({ prediction, onClose }) {
  if (!prediction) return null;

  return (
    <div className="space-y-6">
      {/* Top Prediction Overview Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-brand-accent bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              {prediction.id}
            </span>
            <span className="text-sm font-bold text-slate-800">
              {prediction.applicantName || 'Applicant Profile'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Analyzed: {formatDate(prediction.date)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge size="md">{prediction.risk_level}</Badge>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Default Probability</div>
            <div className="text-base font-extrabold text-slate-900 font-mono">
              {formatPercentage(prediction.probability)}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Applicant Section */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
            <User className="w-4 h-4 text-blue-600" />
            <span>Applicant Information</span>
          </div>
          <dl className="grid grid-cols-2 gap-y-2.5 text-xs">
            <div>
              <dt className="text-slate-400">Age</dt>
              <dd className="font-semibold text-slate-800">{prediction.Age} yrs</dd>
            </div>
            <div>
              <dt className="text-slate-400">Gross Income</dt>
              <dd className="font-semibold text-slate-800">{formatCurrency(prediction.Income)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Credit Score</dt>
              <dd className="font-mono font-bold text-slate-800">{prediction.CreditScore}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Employment</dt>
              <dd className="font-semibold text-slate-800">{prediction.EmploymentType || 'Full-time'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Months Employed</dt>
              <dd className="font-semibold text-slate-800">{prediction.MonthsEmployed} mos</dd>
            </div>
            <div>
              <dt className="text-slate-400">Education</dt>
              <dd className="font-semibold text-slate-800">{prediction.Education || "Bachelor's"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Marital Status</dt>
              <dd className="font-semibold text-slate-800">{prediction.MaritalStatus || 'Single'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Dependents</dt>
              <dd className="font-semibold text-slate-800">{prediction.HasDependents || 'No'}</dd>
            </div>
          </dl>
        </div>

        {/* Loan Section */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Landmark className="w-4 h-4 text-blue-600" />
            <span>Loan Parameters</span>
          </div>
          <dl className="grid grid-cols-2 gap-y-2.5 text-xs">
            <div>
              <dt className="text-slate-400">Loan Amount</dt>
              <dd className="font-semibold text-slate-800">{formatCurrency(prediction.LoanAmount)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Interest Rate</dt>
              <dd className="font-semibold text-slate-800">{prediction.InterestRate}%</dd>
            </div>
            <div>
              <dt className="text-slate-400">Loan Term</dt>
              <dd className="font-semibold text-slate-800">{prediction.LoanTerm} months</dd>
            </div>
            <div>
              <dt className="text-slate-400">DTI Ratio</dt>
              <dd className="font-semibold text-slate-800 font-mono">{prediction.DTIRatio}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Loan Purpose</dt>
              <dd className="font-semibold text-slate-800">{prediction.LoanPurpose || 'General'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Has Mortgage</dt>
              <dd className="font-semibold text-slate-800">{prediction.HasMortgage || 'No'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Has Co-Signer</dt>
              <dd className="font-semibold text-slate-800">{prediction.HasCoSigner || 'No'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Credit Lines</dt>
              <dd className="font-semibold text-slate-800">{prediction.NumCreditLines || '0'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Model & Classification Metadata */}
      <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-slate-200">ML Classification Details</span>
          </div>
          <span className="text-[11px] text-slate-400">Binary Logistic Classifier</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">MODEL</span>
            <span className="font-medium text-slate-200">{prediction.model || 'Balanced Logistic Regression'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">PREDICTION CODE</span>
            <span className="font-mono font-bold text-blue-400">
              {prediction.prediction !== undefined ? prediction.prediction : (prediction.probability >= 0.5 ? 1 : 0)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">RISK CLASSIFICATION</span>
            <span className="font-semibold text-slate-200">{prediction.risk_level}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">PROBABILITY</span>
            <span className="font-mono font-bold text-slate-200">
              {formatPercentage(prediction.probability)}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Actions */}
      <div className="flex items-center justify-end pt-2">
        <Button variant="secondary" onClick={onClose}>
          Close Details
        </Button>
      </div>
    </div>
  );
}
