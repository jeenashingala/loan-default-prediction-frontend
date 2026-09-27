import React, { useEffect, useState } from 'react';
import { Database, AlertTriangle, Percent, Cpu, RefreshCw, BarChart2 } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import StatCard from '../components/dashboard/StatCard';
import PredictionChart from '../components/dashboard/PredictionChart';
import ApplicationChart from '../components/dashboard/ApplicationChart';
import ModelPerformanceCard from '../components/dashboard/ModelPerformanceCard';
import RecentPredictions from '../components/dashboard/RecentPredictions';
import { SkeletonCard, SkeletonChart, SkeletonTable } from '../components/common/Loader';
import Modal from '../components/common/Modal';
import PredictionDetails from '../components/prediction/PredictionDetails';
import Button from '../components/common/Button';
import { getDashboardStats } from '../services/analyticsApi';
import { getPredictions } from '../services/predictionApi';
import { formatNumber } from '../utils/formatters';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentList, setRecentList] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashStats, recentResp] = await Promise.all([
        getDashboardStats(),
        getPredictions({ limit: 5, sortBy: 'date_desc' }),
      ]);
      setDashboardData(dashStats);
      setRecentList(recentResp.items || []);
    } catch (err) {
      setError(err.message || 'Unable to connect to prediction service. Please ensure the FastAPI backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      {/* 1. HERO SECTION & VALUE PROPOSITION */}
      <section>
        <HeroSection />
      </section>

      {/* Error state alert if API fails */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold">Backend Service Connection Notice</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={fetchData} icon={RefreshCw}>
            Retry Connection
          </Button>
        </div>
      )}

      {/* 2. LIVE KPI SUMMARY CARDS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Real-Time Portfolio Intelligence
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated live underwriting metrics and model inference counters
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            Live Stream
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            <SkeletonCard count={4} />
          ) : (
            <>
              {/* Card 1: Total Applications */}
              <StatCard
                title="Total Applications"
                value={formatNumber(dashboardData?.stats?.totalApplications ?? 0)}
                description={dashboardData?.stats?.totalApplicationsLabel || "Applications evaluated by model"}
                icon={Database}
                variant="default"
                delay={0.05}
              />

              {/* Card 2: Default Predictions */}
              <StatCard
                title="Default Predictions"
                value={formatNumber(dashboardData?.stats?.defaultPredictions ?? 0)}
                description={dashboardData?.stats?.defaultPredictionsLabel || "Flagged high default propensity"}
                icon={AlertTriangle}
                variant="danger"
                delay={0.1}
              />

              {/* Card 3: Default Rate */}
              <StatCard
                title="Predicted Default Rate"
                value={`${dashboardData?.stats?.defaultRate ?? 0}%`}
                description={dashboardData?.stats?.defaultRateLabel || "Default to safe application ratio"}
                icon={Percent}
                variant="default"
                delay={0.15}
              />

              {/* Card 4: Model */}
              <StatCard
                title="Deployed ML Model"
                value={dashboardData?.stats?.modelName || "Balanced Logistic"}
                description={dashboardData?.stats?.modelLabel || "Production Classifier v1.0"}
                icon={Cpu}
                variant="accent"
                delay={0.2}
              />
            </>
          )}
        </div>
      </section>

      {/* 3. CHARTS SECTION (Risk Distribution Donut & Applications Timeline Area) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          {loading ? (
            <SkeletonChart height="h-88" />
          ) : (
            <PredictionChart data={dashboardData?.distribution || []} />
          )}
        </div>
        <div className="lg:col-span-7">
          {loading ? (
            <SkeletonChart height="h-88" />
          ) : (
            <ApplicationChart data={dashboardData?.applicationsOverTime || []} />
          )}
        </div>
      </section>

      {/* 4. MODEL PERFORMANCE & ACCURACY BENCHMARKS */}
      <section>
        <ModelPerformanceCard modelMeta={dashboardData?.modelMeta} />
      </section>

      {/* 5. RECENT PREDICTIONS TABLE */}
      <section>
        {loading ? (
          <SkeletonTable rows={5} cols={8} />
        ) : (
          <RecentPredictions
            predictions={recentList}
            onSelectPrediction={(item) => setSelectedPrediction(item)}
          />
        )}
      </section>

      {/* PREDICTION DETAILS MODAL */}
      <Modal
        isOpen={Boolean(selectedPrediction)}
        onClose={() => setSelectedPrediction(null)}
        title="Application Intelligence Dossier"
        size="lg"
      >
        {selectedPrediction && <PredictionDetails prediction={selectedPrediction} />}
      </Modal>
    </div>
  );
}
