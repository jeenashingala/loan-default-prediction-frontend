import React from 'react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatNumber } from '../../utils/formatters';

export default function ApplicationChart({ data = [] }) {
  const chartData = data;
  const totalApps = chartData.reduce((acc, curr) => acc + (curr.applications || 0), 0);
  const totalDefaults = chartData.reduce((acc, curr) => acc + (curr.defaults || 0), 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 backdrop-blur-md text-white text-xs rounded-xl p-3 shadow-2xl border border-slate-800 min-w-[170px]">
          <p className="font-bold text-slate-200 border-b border-slate-800 pb-1.5 mb-2">{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-blue-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Applications:</span>
              </span>
              <span className="font-mono font-bold text-white">
                {formatNumber(payload[0]?.value)}
              </span>
            </div>
            <div className="flex items-center justify-between text-rose-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Defaults:</span>
              </span>
              <span className="font-mono font-bold text-white">
                {formatNumber(payload[1]?.value)}
              </span>
            </div>
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
          <h3 className="text-base font-bold text-slate-900">Applications Over Time</h3>
          <p className="text-xs text-slate-500 mt-0.5">7-day volume trend vs predicted default volume</p>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
          Last 7 Days
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="h-64 sm:h-72 w-full my-2 flex flex-col items-center justify-center text-slate-400">
          <p className="text-sm font-semibold">No timeline data available</p>
          <p className="text-xs text-slate-400 mt-1">Applications evaluated will appear on this 7-day timeline.</p>
        </div>
      ) : (
        <div className="h-64 sm:h-72 w-full my-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="defGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="applications"
                name="Applications"
                stroke="#2563EB"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#appGradient)"
                dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="defaults"
                name="Predicted Defaults"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#defGradient)"
                dot={{ r: 3.5, fill: '#EF4444', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-blue-600 rounded"></span>
            <span>Total Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-rose-500 rounded border border-dashed border-rose-500"></span>
            <span>Predicted Defaults</span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          7-Day Volume: {formatNumber(totalApps)}
        </div>
      </div>
    </div>
  );
}
