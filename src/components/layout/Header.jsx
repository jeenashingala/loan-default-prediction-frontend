import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Menu, Activity, ShieldCheck, CheckCircle2, AlertCircle, BrainCircuit, Sparkles } from 'lucide-react';
import { getHealthStatus } from '../../services/analyticsApi';

const PAGE_TITLES = {
  '/': { title: 'Loan Risk Dashboard', subtitle: 'Real-time portfolio monitoring and ML default probability intelligence.' },
  '/predict': { title: 'Predict Loan Default Risk', subtitle: 'Submit applicant parameters into the Balanced Logistic Regression pipeline.' },
  '/history': { title: 'Prediction History Logs', subtitle: 'Audit and review historical applicant evaluations and ML classifications.' },
  '/analytics': { title: 'Model Analytics & Validation', subtitle: 'Cohort risk breakdowns, distribution matrices, and statistical benchmarks.' },
  '/about': { title: 'ML Architecture & Dictionary', subtitle: 'Supervised pipeline, feature dictionary, StandardScaler, and governance.' },
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [health, setHealth] = useState({ connected: false, model: 'Balanced Logistic Regression' });

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      const res = await getHealthStatus();
      if (isMounted) {
        setHealth(res);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const current = PAGE_TITLES[location.pathname] || {
    title: 'Loan Default Prediction',
    subtitle: 'AI Credit Risk Intelligence',
  };

  const notifications = [
    {
      id: 1,
      title: 'Inference Pipeline Ready',
      time: 'Realtime',
      type: 'system',
      desc: `${health.model || 'Balanced Logistic Regression'} active with StandardScaler normalization.`,
    },
    {
      id: 2,
      title: 'Empirical Risk Tiers Active',
      time: 'Configured',
      type: 'config',
      desc: 'Three calibrated probability thresholds: <35% Low Risk, 35-65% Medium Risk, >65% High Risk.',
    },
    {
      id: 3,
      title: 'FastAPI Microservice',
      time: 'Live',
      type: 'api',
      desc: health.connected ? 'Connected to live FastAPI microservice on port 8000.' : 'FastAPI microservice currently offline.',
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 sm:px-8 glass-nav transition-all">
      {/* Left: Mobile Toggle & Page Header */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug truncate">
            {current.title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 font-medium truncate mt-0.5 max-w-md lg:max-w-xl">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Quick Action, API Status, Application Status, Notifications */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick New Prediction CTA (Hidden on small mobile) */}
        {location.pathname !== '/predict' && (
          <Link
            to="/predict"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-accent hover:bg-brand-accent-hover shadow-sm shadow-blue-500/25 transition-all active:scale-[0.98]"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-200" />
            <span>New Prediction</span>
          </Link>
        )}

        {/* System Health Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-semibold text-slate-700">
          <Activity className={`w-3.5 h-3.5 ${health.connected ? 'text-blue-600' : 'text-slate-400'}`} />
          <span>{health.connected ? 'Engine Healthy' : 'Engine Standby'}</span>
        </div>

        {/* API Status Badge */}
        {health.connected ? (
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] sm:text-xs font-bold text-emerald-800 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="whitespace-nowrap hidden sm:inline">API Connected</span>
            <span className="whitespace-nowrap sm:hidden">Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[11px] sm:text-xs font-bold text-rose-800 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="whitespace-nowrap hidden sm:inline">API Offline</span>
            <span className="whitespace-nowrap sm:hidden">Offline</span>
          </div>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View system notifications"
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-accent ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 bg-slate-50/90 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Telemetry & Alerts
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    3 active
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((item) => (
                    <div key={item.id} className="p-3.5 hover:bg-slate-50/70 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900">{item.title}</p>
                        <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
