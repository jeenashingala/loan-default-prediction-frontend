import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { formatNumber } from '../../utils/formatters';

export function EmploymentRiskChart({ data = [] }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700">
          <p className="font-bold text-slate-200 border-b border-slate-700 pb-1 mb-1.5">
            {item.employment}
          </p>
          <p className="text-slate-400">
            Total Cohort: <span className="font-mono text-white">{formatNumber(item.total)}</span>
          </p>
          <p className="text-slate-400">
            Defaults: <span className="font-mono text-rose-400 font-bold">{formatNumber(item.defaults)}</span>
          </p>
          <p className="text-slate-400">
            Default Rate: <span className="font-bold text-white">{item.defaultRate}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Default Rate by Employment Type</h3>
          <p className="text-xs text-slate-500 mt-0.5">Comparative default likelihood across employment contracts</p>
        </div>
        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          Cohort Analysis
        </span>
      </div>

      {data.length === 0 ? (
        <div className="h-64 sm:h-72 w-full mt-4 flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm font-semibold">No cohort data available yet</p>
          <p className="text-xs text-slate-400 mt-1">Evaluations will segment default propensity across employment categories.</p>
        </div>
      ) : (
        <div className="h-64 sm:h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="employment"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="defaultRate"
                name="Default Rate (%)"
                fill="#2563EB"
                radius={[6, 6, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.defaultRate > 25 ? '#DC2626' : entry.defaultRate > 15 ? '#F59E0B' : '#2563EB'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span> Standard (&lt;15%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Moderate (15-25%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-600"></span> Elevated (&gt;25%)
          </span>
        </div>
      </div>
    </div>
  );
}

export function PurposeRiskChart({ data = [] }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700">
          <p className="font-bold text-slate-200 border-b border-slate-700 pb-1 mb-1.5">
            {item.purpose} Loan
          </p>
          <p className="text-slate-400">
            Total Cohort: <span className="font-mono text-white">{formatNumber(item.total)}</span>
          </p>
          <p className="text-slate-400">
            Defaults: <span className="font-mono text-rose-400 font-bold">{formatNumber(item.defaults)}</span>
          </p>
          <p className="text-slate-400">
            Default Rate: <span className="font-bold text-white">{item.defaultRate}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const sorted = [...data].sort((a, b) => (a.defaultRate || 0) - (b.defaultRate || 0));
  const safest = sorted.length > 0 ? sorted[0] : null;
  const riskiest = sorted.length > 0 ? sorted[sorted.length - 1] : null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Default Rate by Loan Purpose</h3>
          <p className="text-xs text-slate-500 mt-0.5">Historical credit failure frequency by loan purpose</p>
        </div>
        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          Segment Risk
        </span>
      </div>

      {data.length === 0 ? (
        <div className="h-64 sm:h-72 w-full mt-4 flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm font-semibold">No purpose segmentation data available yet</p>
          <p className="text-xs text-slate-400 mt-1">Applications evaluated will populate purpose distribution analysis.</p>
        </div>
      ) : (
        <div className="h-64 sm:h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 10, right: 25, left: 15, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis
                type="number"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                tickFormatter={(val) => `${val}%`}
              />
              <YAxis
                dataKey="purpose"
                type="category"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="defaultRate"
                name="Default Rate (%)"
                fill="#1E293B"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        {safest && (
          <span>Safest: <strong>{safest.purpose} ({safest.defaultRate}%)</strong></span>
        )}
        {riskiest && riskiest !== safest && (
          <span>Highest Risk: <strong>{riskiest.purpose} ({riskiest.defaultRate}%)</strong></span>
        )}
        {!safest && <span>Evaluation data will compute category risk benchmarks.</span>}
      </div>
    </div>
  );
}

export function CreditScoreScatterChart({ data = [] }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700">
          <p className="font-bold text-blue-400 border-b border-slate-700 pb-1 mb-1.5">
            {item.applicant}
          </p>
          <p className="text-slate-400">
            Credit Score: <span className="font-mono font-bold text-white">{item.creditScore}</span>
          </p>
          <p className="text-slate-400">
            Default Probability: <span className="font-bold text-rose-400">{item.probability}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Credit Score vs. Default Probability</h3>
          <p className="text-xs text-slate-500 mt-0.5">Inverse correlation between credit bureau score and modeled probability</p>
        </div>
        <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
          Regression Trend
        </span>
      </div>

      {data.length === 0 ? (
        <div className="h-64 sm:h-72 w-full mt-4 flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm font-semibold">No prediction scatter points available yet</p>
          <p className="text-xs text-slate-400 mt-1">Submitted applications will display on the credit score vs risk scatter map.</p>
        </div>
      ) : (
        <div className="h-64 sm:h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 15, right: 20, bottom: 15, left: -5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                type="number"
                dataKey="creditScore"
                name="Credit Score"
                domain={[300, 850]}
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                type="number"
                dataKey="probability"
                name="Default Probability (%)"
                domain={[0, 100]}
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <ZAxis range={[50, 50]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                name="Evaluations"
                data={data}
                fill="#2563EB"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
        Inverse sigmoidal relationship validates feature weights in Balanced Logistic Regression model.
      </div>
    </div>
  );
}
