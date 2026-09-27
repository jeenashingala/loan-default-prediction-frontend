import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  BrainCircuit,
  FileSpreadsheet,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { SkeletonTable } from '../components/common/Loader';
import PredictionDetails from '../components/prediction/PredictionDetails';
import { getPredictions, deletePrediction } from '../services/predictionApi';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';

export default function PredictionHistory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');

  // Modal State
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPredictions({
        search: searchQuery,
        risk: riskFilter,
        sortBy,
        page: currentPage,
        limit: pageSize,
      });
      setPredictions(data.items || []);
      setTotalRecords(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Unable to load prediction history. Please ensure the FastAPI backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [currentPage, riskFilter, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchHistory();
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove record ${id}?`)) {
      try {
        await deletePrediction(id);
        fetchHistory();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // CSV Export function
  const handleExportCSV = () => {
    if (predictions.length === 0) return;

    const headers = [
      'Application ID',
      'Applicant Name',
      'Age',
      'Income',
      'Loan Amount',
      'Credit Score',
      'Interest Rate',
      'Loan Term',
      'DTI Ratio',
      'Education',
      'Employment Type',
      'Prediction Class',
      'Default Probability',
      'Risk Level',
      'Evaluation Date',
    ];

    const rows = predictions.map((p) => [
      p.id,
      p.applicantName || 'N/A',
      p.Age || '',
      p.Income || '',
      p.LoanAmount || '',
      p.CreditScore || '',
      p.InterestRate || '',
      p.LoanTerm || '',
      p.DTIRatio || '',
      p.Education || '',
      p.EmploymentType || '',
      p.prediction !== undefined ? p.prediction : (p.probability >= 0.5 ? 1 : 0),
      p.probability || '',
      p.risk_level || '',
      p.date || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `loan_predictions_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Error state alert if API fails */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold">Backend Service Error</p>
              <p>{error}</p>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={fetchHistory} icon={RefreshCw}>
            Retry
          </Button>
        </div>
      )}

      {/* Top Controls: Search, Risk Filter, Sort, Export */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by application ID or applicant name..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all placeholder:text-slate-400"
              />
            </div>
          </form>

          {/* Controls: Risk Filter, Sort, Export */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Risk Filter */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold text-slate-700">Risk:</span>
              <select
                value={riskFilter}
                onChange={(e) => {
                  setRiskFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="all">All Tiers</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold text-slate-700">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="prob_desc">Probability (High to Low)</option>
                <option value="prob_asc">Probability (Low to High)</option>
                <option value="amount_desc">Loan Amount (Highest)</option>
                <option value="score_desc">Credit Score (Highest)</option>
              </select>
            </div>

            {/* Export CSV Button */}
            <Button
              variant="secondary"
              size="sm"
              icon={FileSpreadsheet}
              onClick={handleExportCSV}
              disabled={predictions.length === 0}
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        {loading ? (
          <SkeletonTable rows={8} cols={8} />
        ) : predictions.length === 0 ? (
          <EmptyState
            icon={BrainCircuit}
            title="No predictions found"
            description={
              searchQuery || riskFilter !== 'all'
                ? 'No loan applications match your active search or filter parameters.'
                : 'No predictions yet. Run your first loan prediction to see results here.'
            }
            actionLabel="Make a Prediction"
            onAction={() => navigate('/predict')}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-6">ID & Applicant</th>
                    <th className="py-3.5 px-4">Credit Score</th>
                    <th className="py-3.5 px-4">Income</th>
                    <th className="py-3.5 px-4">Loan Amount</th>
                    <th className="py-3.5 px-4">Risk Tier</th>
                    <th className="py-3.5 px-4">Probability</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {predictions.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-accent bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {item.id}
                          </span>
                          <span className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">
                            {item.applicantName || 'Applicant'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-slate-800">
                        {item.CreditScore}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                        {formatCurrency(item.Income)}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-bold text-slate-900">
                        {formatCurrency(item.LoanAmount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge>{item.risk_level}</Badge>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-slate-800">
                        {formatPercentage(item.probability)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(item.date)}
                      </td>
                      <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedItem(item)}
                            title="View full record"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-brand-accent hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDelete(item.id, e)}
                            title="Delete record"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-semibold text-slate-800">
                  {Math.min(currentPage * pageSize, totalRecords)}
                </span>{' '}
                of <span className="font-semibold text-slate-800">{totalRecords}</span> evaluations
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage <= 1}
                  icon={ChevronLeft}
                >
                  Previous
                </Button>
                <span className="px-2 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Prediction Details Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Prediction Details"
        subtitle={`Evaluation ID: ${selectedItem?.id}`}
      >
        <PredictionDetails
          prediction={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </Modal>
    </div>
  );
}
