import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, History, RotateCcw, ShieldCheck, BrainCircuit } from 'lucide-react';
import PredictionForm from '../components/prediction/PredictionForm';
import ResultCard from '../components/prediction/ResultCard';
import RiskFactors from '../components/prediction/RiskFactors';
import Button from '../components/common/Button';
import { predictLoan } from '../services/predictionApi';

export default function PredictLoan() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const resultRef = useRef(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await predictLoan(formData);
      setSubmittedData(formData);
      setPredictionResult(response);

      // Smooth scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setApiError(
        err.message ||
          'Unable to connect to prediction service. Please make sure the FastAPI backend is running on http://localhost:8000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetResults = () => {
    setPredictionResult(null);
    setSubmittedData(null);
    setApiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Intro Heading & Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Machine Learning Inference Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Predict Loan Default Risk
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Submit verified applicant parameters into the trained Balanced Logistic Regression model.
              The engine evaluates 16 input attributes to compute empirical default probability and classify risk tiers.
            </p>
          </div>

          <Link
            to="/history"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs self-start sm:self-center"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span>View Prior Logs</span>
          </Link>
        </div>
      </div>

      {/* Backend API Error Banner */}
      {apiError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 shadow-2xs animate-in fade-in">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-ping"></div>
          <div>
            <p className="font-bold">Prediction Request Notice</p>
            <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{apiError}</p>
          </div>
        </div>
      )}

      {/* MULTI-SECTION FORM */}
      <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />

      {/* PREDICTION RESULT SECTION */}
      {predictionResult && (
        <div ref={resultRef} className="pt-8 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-accent">
                  Inference Completed Successfully
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                Evaluation Output & Risk Profile
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                icon={RotateCcw}
                onClick={handleResetResults}
              >
                New Assessment
              </Button>
              <Link to="/history">
                <Button variant="primary" size="sm" icon={History}>
                  View in History
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Result Card with Circular Gauge */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ResultCard result={predictionResult} />
            </div>

            {/* Right: Explanatory Risk Factors & Underwriting Guidance */}
            <div className="lg:col-span-7">
              <RiskFactors
                applicantData={submittedData}
                predictionResult={predictionResult}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
