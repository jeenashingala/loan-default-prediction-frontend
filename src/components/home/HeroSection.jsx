import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  TrendingDown,
  Sparkles,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function HeroSection() {
  const featureCards = [
    {
      icon: BrainCircuit,
      title: 'AI-Powered Prediction',
      description: 'Balanced Logistic Regression trained on historical borrower datasets with 24 engineered features.',
      badge: 'ML Engine',
      accent: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    },
    {
      icon: ShieldCheck,
      title: 'Risk Assessment',
      description: 'Three-tier probability stratification (Low, Medium, High) with calibrated underwriting bands.',
      badge: '3 Risk Tiers',
      accent: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    },
    {
      icon: Zap,
      title: 'Fast Results',
      description: 'Sub-second real-time inference via high-throughput FastAPI REST microservice pipeline.',
      badge: '< 100ms Inference',
      accent: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Analysis',
      description: 'Multidimensional evaluation across 16 applicant attributes including liquidity, bureau scores, and tenor.',
      badge: '16 Key Factors',
      accent: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* MAIN HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B132B] to-[#0A192F] border border-slate-800/80 shadow-2xl p-6 sm:p-10 lg:p-12 text-white">
        {/* Subtle Ambient Background Gradients / Orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" />

        {/* Subtle Fintech Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] fintech-grid" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="tracking-wide">AI-Powered Financial Intelligence</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">v1.0 Production Ready</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Loan Default{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  Prediction
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                Supervised machine learning system designed to estimate loan default risk with precision.
                Empowering loan officers and underwriting teams with objective, data-backed default probabilities in real time.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/predict">
                <button
                  type="button"
                  id="hero-predict-cta"
                  className="relative group px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 transition-all duration-200 flex items-center gap-2.5 active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                  <span>Predict Loan Risk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to="/analytics">
                <button
                  type="button"
                  id="hero-analytics-cta"
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800/80 hover:bg-slate-750 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all duration-150 flex items-center gap-2 backdrop-blur-md active:scale-[0.98]"
                >
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Model Analytics</span>
                </button>
              </Link>

              <Link to="/about">
                <button
                  type="button"
                  className="px-4 py-3.5 rounded-xl font-medium text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>
              </Link>
            </div>

            {/* Trust / Presentation Indicators */}
            <div className="pt-4 border-t border-slate-800/70 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Balanced Class Weights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>16 Input Attributes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Objective Risk Scoring</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI / FinTech Visual Card Component */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl animate-float"
            >
              {/* Header of Visual Widget */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Inference Telemetry</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                        LIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Balanced Logistic Classifier</p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  99.8% Uptime
                </span>
              </div>

              {/* Central Risk Gauge Preview */}
              <div className="py-6 flex items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-slate-800"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="56"
                      stroke="url(#hero-risk-gradient)"
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - 0.184)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="hero-risk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black tracking-tight text-white font-mono">
                      18.4%
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mt-0.5">
                      Low Risk • Prime
                    </span>
                    <span className="text-[9px] text-slate-400">Default Probability</span>
                  </div>
                </div>
              </div>

              {/* Sample Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-700/60 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-[10px] font-medium text-slate-400">Credit Score</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">780</div>
                  <div className="text-[9px] text-emerald-400 font-medium">Excellent</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-[10px] font-medium text-slate-400">DTI Ratio</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">0.22</div>
                  <div className="text-[9px] text-emerald-400 font-medium">Safe Margin</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-[10px] font-medium text-slate-400">Model Metric</div>
                  <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">88.4%</div>
                  <div className="text-[9px] text-cyan-400/80 font-medium">Accuracy</div>
                </div>
              </div>

              {/* Micro Status Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>Bank-Grade Prediction Protocol</span>
                </span>
                <span className="font-mono text-slate-500">HTTP/2 POST</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4 FEATURE CARDS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featureCards.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + idx * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${feat.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-brand-accent transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-brand-accent group-hover:translate-x-0.5 transition-transform">
                <span>View Capability</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
