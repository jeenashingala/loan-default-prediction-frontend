import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatNumber } from '../../utils/formatters';

export default function PredictionChart({ data = [] }) {
  const chartData = data.map((d) => {
    // Ensure clean fintech colors
    const isRepay = d.name.toLowerCase().includes('repay') || d.name.toLowerCase().includes('no default');
    return {
      ...d,
      color: isRepay ? '#10B981' : '#EF4444',
    };
  });

  const total = chartData.reduce((acc, curr) => acc + (curr.value || 0), 0);
  const repayItem = chartData.find((d) => d.name.toLowerCase().includes('repay') || d.name.toLowerCase().includes('no default'));
  const repayPercentage = repayItem ? repayItem.percentage : (total > 0 ? 0 : 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const isSafe = item.name.toLowerCase().includes('repay');
      return (
        <div className="bg-slate-950/95 backdrop-blur-md text-white text-xs rounded-xl p-3 shadow-2xl border border-slate-800 min-w-[170px]">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <p className="font-bold text-slate-100">{item.name}</p>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-slate-400 flex items-center justify-between">
              <span>Applications:</span>
              <span className="font-mono text-white font-bold">{formatNumber(item.value)}</span>
            </p>
            <p className="text-slate-400 flex items-center justify-between">
              <span>Cohort Share:</span>
              <span className="font-bold text-cyan-400">{item.percentage}%</span>
            </p>
            <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
              {isSafe ? 'Predicted Safe / Approved' : 'Predicted Default Flag'}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Prediction Risk Distribution</h3>
          <p className="text-xs text-slate-500 mt-0.5">Overall binary risk classification breakdown</p>
        </div>
        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
          Total: {formatNumber(total)}
        </span>
      </div>

      {total === 0 ? (
        <div className="h-64 sm:h-72 w-full my-2 flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm font-semibold">No predictions recorded yet</p>
          <p className="text-xs text-slate-400 mt-1">Submit loan applications to generate risk distribution.</p>
        </div>
      ) : (
        <div className="relative h-64 sm:h-72 w-full my-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label inside donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-900 font-mono">{repayPercentage}%</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Repayment Rate</span>
          </div>
        </div>
      )}

      {/* Legend Badges */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-semibold text-slate-700 truncate max-w-[90px] sm:max-w-none">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-slate-900 font-mono">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
