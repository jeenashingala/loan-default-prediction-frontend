import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  History,
  BarChart3,
  Cpu,
  ShieldCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { getHealthStatus } from '../../services/analyticsApi';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/predict', label: 'Predict Loan Risk', icon: BrainCircuit },
  { path: '/history', label: 'Prediction History', icon: History },
  { path: '/analytics', label: 'Model Analytics', icon: BarChart3 },
  { path: '/about', label: 'About the Model', icon: Cpu },
];

export default function Sidebar({ isOpen, onClose }) {
  const [health, setHealth] = useState({ connected: false, model: 'Balanced Logistic Regression' });

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      const status = await getHealthStatus();
      if (isMounted) {
        setHealth(status);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#0B1120] text-white border-r border-slate-800/90 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-[#080D1A]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent via-blue-500 to-cyan-400 shadow-md shadow-blue-500/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white">
                  LoanGuard
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Loan Risk Intelligence
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Navigation Menu</span>
            <span className="text-[9px] text-slate-400">FINTECH</span>
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-600/30 font-semibold border-l-2 border-cyan-300'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Metadata & System Status */}
        <div className="p-4 border-t border-slate-800/90 space-y-3 bg-[#080D1A]">
          {/* Subtle ML Model Badge */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 text-xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>ML Pipeline</span>
              </span>
              <span className="text-cyan-400 font-mono">v1.0 Ready</span>
            </div>
            <div className="font-bold text-slate-200 truncate text-xs" title={health.model || 'Balanced Logistic Regression'}>
              {health.model || 'Balanced Logistic Regression'}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
              <span>Weights: balanced</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-400 font-mono">24 feats</span>
            </div>
          </div>

          {/* API Status Indicator */}
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <div className="flex items-center gap-2">
              {health.connected ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              ) : (
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
              <span className="text-slate-300 font-medium">FastAPI Engine</span>
            </div>
            {health.connected ? (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/60">
                Connected
              </span>
            ) : (
              <span className="text-[10px] font-bold text-rose-400 bg-rose-950/70 px-2 py-0.5 rounded border border-rose-800/60">
                Offline
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
