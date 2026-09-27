import React, { useEffect, useState } from 'react';
import {
  Cpu,
  Layers,
  Binary,
  ArrowDown,
  Database,
  CheckCircle,
  FileCode,
  ShieldAlert,
  Sliders,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { getModelInfo } from '../services/analyticsApi';
import { SkeletonCard } from '../components/common/Loader';
import Button from '../components/common/Button';

export default function AboutModel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelData, setModelData] = useState(null);

  const fetchModelData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getModelInfo();
      setModelData(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to model service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModelData();
  }, []);

  const meta = modelData?.modelMeta;
  const workflowSteps = meta?.workflowSteps || [];
  const features = meta?.features || [];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Error state alert if API fails */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold">Backend Model Metadata Notice</p>
              <p>{error}</p>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={fetchModelData} icon={RefreshCw}>
            Retry
          </Button>
        </div>
      )}

      {/* Intro Overview Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3 shadow-2xs">
          <Cpu className="w-3.5 h-3.5 text-brand-accent" />
          <span>Machine Learning Systems Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About the Model & Predictive Pipeline
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
          <strong>Loan Default Prediction</strong> uses machine learning to estimate the
          probability that a loan applicant may fail to meet their contractual repayment obligations.
          By parsing multidimensional credit history, liquidity ratios, and employment tenure,
          the system equips underwriters with rapid, objective risk intelligence.
        </p>

        {/* Model Architecture Quick Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Deployed Model
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {modelData?.name || 'Balanced Logistic Regression'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Class Weighting
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {modelData?.class_weight || 'balanced'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Scaler Pipeline
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {modelData?.scaler || 'StandardScaler'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Encoded Model Features
            </span>
            <p className="text-sm font-bold text-blue-700 mt-0.5">
              {modelData?.features || 24} Features
            </p>
          </div>
        </div>

        {/* Target Interpretation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Problem Type
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">Binary Classification</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Target Variable
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">Default (0 or 1)</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Class 0 Interpretation
            </span>
            <p className="text-sm font-bold text-emerald-700 mt-0.5">No Default (Repay)</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Class 1 Interpretation
            </span>
            <p className="text-sm font-bold text-rose-700 mt-0.5">Default (Charge-Off)</p>
          </div>
        </div>
      </section>

      {/* MACHINE LEARNING WORKFLOW SECTION */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Machine Learning Workflow</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end data lifecycle from raw banking records to real-time API inference
          </p>
        </div>

        {loading ? (
          <SkeletonCard count={3} />
        ) : (
          <div className="relative">
            <div className="space-y-4">
              {workflowSteps.map((step, idx) => (
                <div key={step.step} className="flex flex-col items-start">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200 w-full hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-accent text-white font-bold text-xs shrink-0 shadow-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Stage {step.step} of {workflowSteps.length}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {idx < workflowSteps.length - 1 && (
                    <div className="flex items-center justify-center w-8 py-1">
                      <ArrowDown className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* INPUT FEATURES DICTIONARY */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Input Feature Dictionary</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              16 independent input attributes utilized during training and live inference
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
            {features.length} Engineered Features
          </span>
        </div>

        {loading ? (
          <SkeletonCard count={4} />
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Feature Name</th>
                  <th className="py-3 px-3">Data Type</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Permissible Range</th>
                  <th className="py-3 px-4">Business Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {features.map((feat) => (
                  <tr key={feat.name} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 text-xs">
                      {feat.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                        {feat.type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-700">{feat.category}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {feat.range}
                    </td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs">{feat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* JUPYTER NOTEBOOK INTEGRATION GOVERNANCE */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-blue-400">
          <FileCode className="w-5 h-5" />
          <h4 className="text-base font-bold text-slate-100">
            Machine Learning Governance & Source of Truth
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The Jupyter training notebook is the immutable source of truth for preprocessing weights,
          one-hot encodings, scaling factors, and regularized coefficients. The React frontend
          acts strictly as the <strong>presentation and inference telemetry interface</strong>,
          delegating mathematical scoring to the FastAPI service.
        </p>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 font-mono text-xs text-blue-300 flex items-center justify-between">
          <span>Inference Endpoint: POST /predict</span>
          <span className="text-emerald-400 font-bold">HTTP 200 OK Contract Active</span>
        </div>
      </section>
    </div>
  );
}
