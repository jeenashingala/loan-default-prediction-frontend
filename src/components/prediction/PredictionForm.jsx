import React, { useState } from 'react';
import {
  BrainCircuit,
  RotateCcw,
  Sparkles,
  User,
  Wallet,
  Landmark,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { validateLoanForm } from '../../utils/validation';

const INITIAL_FORM_STATE = {
  applicantName: '',
  Age: '35',
  Income: '750000',
  CreditScore: '720',
  MonthsEmployed: '48',
  NumCreditLines: '4',
  LoanAmount: '350000',
  InterestRate: '9.5',
  LoanTerm: '36',
  DTIRatio: '0.32',
  Education: "Bachelor's",
  EmploymentType: 'Full-time',
  MaritalStatus: 'Married',
  LoanPurpose: 'Home',
  HasMortgage: 'Yes',
  HasDependents: 'No',
  HasCoSigner: 'Yes',
};

const SAMPLE_PROFILES = {
  prime: {
    applicantName: 'Vikram Sengupta (Prime Low-Risk Profile)',
    Age: '42',
    Income: '1450000',
    CreditScore: '780',
    MonthsEmployed: '72',
    NumCreditLines: '3',
    LoanAmount: '400000',
    InterestRate: '8.2',
    LoanTerm: '36',
    DTIRatio: '0.22',
    Education: "Master's",
    EmploymentType: 'Full-time',
    MaritalStatus: 'Married',
    LoanPurpose: 'Home',
    HasMortgage: 'Yes',
    HasDependents: 'No',
    HasCoSigner: 'Yes',
  },
  subprime: {
    applicantName: 'Aman Verma (Subprime High-Risk Profile)',
    Age: '26',
    Income: '320000',
    CreditScore: '540',
    MonthsEmployed: '8',
    NumCreditLines: '7',
    LoanAmount: '650000',
    InterestRate: '18.5',
    LoanTerm: '60',
    DTIRatio: '0.62',
    Education: 'High School',
    EmploymentType: 'Part-time',
    MaritalStatus: 'Single',
    LoanPurpose: 'Business',
    HasMortgage: 'No',
    HasDependents: 'Yes',
    HasCoSigner: 'No',
  },
};

export default function PredictionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleToggle = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] === 'Yes' ? 'No' : 'Yes',
    }));
  };

  const handleReset = () => {
    setFormData({
      applicantName: '',
      Age: '',
      Income: '',
      CreditScore: '',
      MonthsEmployed: '',
      NumCreditLines: '',
      LoanAmount: '',
      InterestRate: '',
      LoanTerm: '36',
      DTIRatio: '',
      Education: '',
      EmploymentType: '',
      MaritalStatus: '',
      LoanPurpose: '',
      HasMortgage: 'No',
      HasDependents: 'No',
      HasCoSigner: 'No',
    });
    setErrors({});
  };

  const handleLoadSample = (key) => {
    setFormData(SAMPLE_PROFILES[key]);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateLoanForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Quick Demo Pre-fill helper banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-cyan-50/90 border border-blue-200/80 gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Quick Demonstration Profiles:
            </span>
            <span className="text-[11px] text-slate-500">
              One-click preset profiles configured for presentation and evaluation tests
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleLoadSample('prime')}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 rounded-xl border border-emerald-300 transition-all shadow-2xs hover:shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Load Prime (Low Risk)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('subprime')}
            className="px-3 py-1.5 text-xs font-bold text-rose-800 bg-white hover:bg-rose-50 rounded-xl border border-rose-300 transition-all shadow-2xs hover:shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Load Subprime (High Risk)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1 — PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-sm flex items-center justify-center shadow-2xs">
              1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Demographic background, age verification, and education credentials
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Step 1 of 4
          </span>
        </div>

        {/* Clean 2-column layout on desktop, 1-column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Applicant Name / Reference (Optional)"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            placeholder="e.g. Vikram Sengupta"
            helperText="Internal reference code or borrower name"
          />

          <Input
            label="Applicant Age"
            name="Age"
            type="number"
            value={formData.Age}
            onChange={handleChange}
            placeholder="35"
            min={18}
            max={100}
            required
            error={errors.Age}
            helperText="Applicant age (Permissible: 18 – 100 years)"
          />

          <Select
            label="Highest Education Attained"
            name="Education"
            value={formData.Education}
            onChange={handleChange}
            required
            error={errors.Education}
            options={[
              { value: 'High School', label: 'High School' },
              { value: "Bachelor's", label: "Bachelor's Degree" },
              { value: "Master's", label: "Master's Degree" },
              { value: 'PhD', label: 'Doctorate / PhD' },
            ]}
          />

          <Select
            label="Marital Status"
            name="MaritalStatus"
            value={formData.MaritalStatus}
            onChange={handleChange}
            required
            error={errors.MaritalStatus}
            options={[
              { value: 'Single', label: 'Single' },
              { value: 'Married', label: 'Married' },
              { value: 'Divorced', label: 'Divorced' },
            ]}
          />
        </div>
      </div>

      {/* SECTION 2 — FINANCIAL INFORMATION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center justify-center shadow-2xs">
              2
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Financial Information</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Annual income capacity, employment tenure, and existing real estate debt
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Step 2 of 4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Gross Annual Income"
            name="Income"
            type="number"
            prefix="₹"
            value={formData.Income}
            onChange={handleChange}
            placeholder="750000"
            required
            error={errors.Income}
            helperText="Total verified gross annual earnings in INR"
          />

          <Select
            label="Employment Type"
            name="EmploymentType"
            value={formData.EmploymentType}
            onChange={handleChange}
            required
            error={errors.EmploymentType}
            options={[
              { value: 'Full-time', label: 'Full-time Salaried' },
              { value: 'Part-time', label: 'Part-time Employment' },
              { value: 'Self-employed', label: 'Self-employed / Business' },
              { value: 'Unemployed', label: 'Unemployed' },
            ]}
          />

          <Input
            label="Months Employed"
            name="MonthsEmployed"
            type="number"
            value={formData.MonthsEmployed}
            onChange={handleChange}
            placeholder="48"
            min={0}
            required
            error={errors.MonthsEmployed}
            helperText="Current continuous employment tenure in months"
          />

          {/* Has Mortgage Toggle */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Has Mortgage</p>
              <p className="text-xs text-slate-500 mt-0.5">Existing home or property mortgage</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.HasMortgage === 'Yes'}
              onClick={() => handleToggle('HasMortgage')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                formData.HasMortgage === 'Yes' ? 'bg-brand-accent' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.HasMortgage === 'Yes' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3 — LOAN INFORMATION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold text-sm flex items-center justify-center shadow-2xs">
              3
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-cyan-600" />
                <h3 className="text-base font-bold text-slate-900">Loan Information</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Principal borrowing size, interest terms, repayment tenor, and intended purpose
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Step 3 of 4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Requested Loan Amount"
            name="LoanAmount"
            type="number"
            prefix="₹"
            value={formData.LoanAmount}
            onChange={handleChange}
            placeholder="350000"
            required
            error={errors.LoanAmount}
            helperText="Total requested borrowing principal"
          />

          <Input
            label="Interest Rate (APR)"
            name="InterestRate"
            type="number"
            step="0.1"
            suffix="%"
            value={formData.InterestRate}
            onChange={handleChange}
            placeholder="9.5"
            min={0}
            max={100}
            required
            error={errors.InterestRate}
            helperText="Annual percentage rate offered on facility"
          />

          <Select
            label="Loan Tenor (Repayment Term)"
            name="LoanTerm"
            value={formData.LoanTerm}
            onChange={handleChange}
            required
            error={errors.LoanTerm}
            options={[
              { value: '12', label: '12 months (1 Year)' },
              { value: '24', label: '24 months (2 Years)' },
              { value: '36', label: '36 months (3 Years)' },
              { value: '48', label: '48 months (4 Years)' },
              { value: '60', label: '60 months (5 Years)' },
              { value: '72', label: '72 months (6 Years)' },
              { value: '84', label: '84 months (7 Years)' },
            ]}
          />

          <Select
            label="Loan Purpose"
            name="LoanPurpose"
            value={formData.LoanPurpose}
            onChange={handleChange}
            required
            error={errors.LoanPurpose}
            options={[
              { value: 'Home', label: 'Home Purchase / Renovation' },
              { value: 'Auto', label: 'Auto / Vehicle Purchase' },
              { value: 'Business', label: 'Commercial / Business' },
              { value: 'Education', label: 'Higher Education' },
              { value: 'Other', label: 'Other General Liquidity' },
            ]}
          />
        </div>
      </div>

      {/* SECTION 4 — CREDIT / EMPLOYMENT INFORMATION */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-bold text-sm flex items-center justify-center shadow-2xs">
              4
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">Credit & Risk Information</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Bureau credit score, revolving accounts, leverage ratio, and co-obligor support
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Step 4 of 4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Bureau Credit Score (CIBIL / FICO)"
            name="CreditScore"
            type="number"
            value={formData.CreditScore}
            onChange={handleChange}
            placeholder="720"
            min={300}
            max={850}
            required
            error={errors.CreditScore}
            helperText="Credit bureau score (Permissible range: 300 to 850)"
          />

          <Input
            label="Active Credit Lines"
            name="NumCreditLines"
            type="number"
            value={formData.NumCreditLines}
            onChange={handleChange}
            placeholder="4"
            min={0}
            required
            error={errors.NumCreditLines}
            helperText="Total active credit cards and credit facilities"
          />

          <Input
            label="Debt-to-Income (DTI) Ratio"
            name="DTIRatio"
            type="number"
            step="0.01"
            value={formData.DTIRatio}
            onChange={handleChange}
            placeholder="0.32"
            min={0}
            max={1}
            required
            error={errors.DTIRatio}
            helperText="Monthly debt obligations divided by income (0.00 – 1.00)"
          />

          {/* Two toggles in a 2-col mini grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Has Dependents */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Has Dependents</p>
                <p className="text-[11px] text-slate-500">Financial dependants</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formData.HasDependents === 'Yes'}
                onClick={() => handleToggle('HasDependents')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                  formData.HasDependents === 'Yes' ? 'bg-brand-accent' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.HasDependents === 'Yes' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Has Co-Signer */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Has Co-Signer</p>
                <p className="text-[11px] text-slate-500">Guarantor present</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formData.HasCoSigner === 'Yes'}
                onClick={() => handleToggle('HasCoSigner')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                  formData.HasCoSigner === 'Yes' ? 'bg-brand-accent' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.HasCoSigner === 'Yes' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FORM ACTION BUTTONS */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={handleReset}
          disabled={isLoading}
          icon={RotateCcw}
          className="w-full sm:w-auto"
        >
          Reset Application Form
        </Button>

        <button
          type="submit"
          disabled={isLoading}
          id="predict-submit-button"
          className="w-full sm:w-auto min-w-[260px] relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/35 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none"
        >
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Running Inference Engine...</span>
            </div>
          ) : (
            <>
              <BrainCircuit className="w-5 h-5 text-cyan-200" />
              <span>Predict Default Risk</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
