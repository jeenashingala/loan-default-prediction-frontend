# LoanGuard AI — Loan Risk Intelligence

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-green.svg)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.15-black.svg)](https://www.framer.com/motion/)

A production-quality React frontend for a **Loan Default Prediction Machine Learning application**. Built for financial intelligence, credit risk underwriting, and portfolio telemetry.

---

## 🌟 Key Highlights

- **Open Directly on Main Dashboard**: Direct entry to the analytical dashboard without login or authentication walls.
- **Enterprise Fintech UI/UX**: Polished slate/navy/blue palette with subtle glassmorphism and clear visual hierarchy.
- **Multi-Section Prediction Form**: Structured applicant, loan, personal, and financial collateral attributes with full client-side validation and quick sample profiles.
- **Rich Circular Probability Gauge**: High/Medium/Low risk visualization with centralized configurable risk thresholds (`src/utils/risk.js`).
- **Real-Time FastAPI Integration**: Integrated directly with FastAPI backend for live inference, SQLite history, and database-driven telemetry.

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will launch on `http://localhost:5173`.

### 3. Production Build

```bash
npm run build
npm run preview
```

---

## 🧭 Routes & Navigation

| Route | View | Description |
|---|---|---|
| `/` | **Dashboard** | KPI stat cards, prediction distribution donut chart, application volume over time line chart, recent predictions table. |
| `/predict` | **Predict Loan** | 4-section credit underwriting form, client-side validation, live ML inference, circular probability gauge, risk factors breakdown, and ML disclaimer. |
| `/history` | **Prediction History** | Search, filter by risk tier, sort, export to CSV, paginated records, and detailed application inspection modal. |
| `/analytics` | **Model Analytics** | Model specifications, evaluation metrics (Accuracy, Precision, Recall, F1, ROC-AUC), cohort default rate charts, and scatter plot. |
| `/about` | **About Model** | Visual 7-stage ML workflow, 16 input feature definitions, and Jupyter notebook source-of-truth governance. |

---

## 🔌 FastAPI Integration Contract

The service layer is located in `src/services/`. When your FastAPI backend is running, set:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Expected API Endpoint Contract

#### **`POST /predict`**

**Request Payload:**
```json
{
  "Age": 35,
  "Income": 75000,
  "LoanAmount": 250000,
  "CreditScore": 720,
  "MonthsEmployed": 60,
  "NumCreditLines": 4,
  "InterestRate": 8.5,
  "LoanTerm": 36,
  "DTIRatio": 0.32,
  "Education": "Bachelor's",
  "EmploymentType": "Full-time",
  "MaritalStatus": "Married",
  "HasMortgage": "Yes",
  "HasDependents": "No",
  "LoanPurpose": "Home",
  "HasCoSigner": "Yes"
}
```

**Response Payload:**
```json
{
  "prediction": 0,
  "probability": 0.18,
  "risk_level": "Low Risk",
  "model": "Logistic Regression"
}
```

---

## 🎨 Color System & Tokens

| Role | Color Hex | Usage |
|---|---|---|
| Primary Slate | `#0F172A` | Sidebar, primary headlines, active badges |
| Secondary Slate | `#1E293B` | Borders, table headers, elevated cards |
| Brand Accent | `#2563EB` | Buttons, active navigation pills, primary graphs |
| Low Risk | `#16A34A` | Probabilities `< 35%`, positive repayment indicators |
| Medium / Warning | `#F59E0B` | Probabilities `35% – 65%`, moderate leverage |
| High Risk | `#DC2626` | Probabilities `≥ 65%`, elevated default warnings |
| Background | `#F8FAFC` | Global viewport background |
| Surface Cards | `#FFFFFF` | Form containers, chart panels, metric cards |

---

## 📁 Directory Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx           # Fixed/collapsible brand navigation & status
│   │   ├── Header.jsx            # Dynamic page title, API health & notification popover
│   │   └── Layout.jsx            # Responsive layout wrapper
│   │
│   ├── dashboard/
│   │   ├── StatCard.jsx          # KPI metric cards with trends & icons
│   │   ├── PredictionChart.jsx   # Donut chart for repay vs default distribution
│   │   ├── ApplicationChart.jsx  # Line chart for 7-day volume trends
│   │   └── RecentPredictions.jsx # Dashboard preview table with modal trigger
│   │
│   ├── prediction/
│   │   ├── PredictionForm.jsx    # 4-section credit application form + validation
│   │   ├── ResultCard.jsx        # Circular progress gauge with risk level
│   │   ├── RiskFactors.jsx       # Explanatory UI factor indicators & ML disclaimer
│   │   └── PredictionDetails.jsx # Detailed modal for applicant & loan data
│   │
│   ├── analytics/
│   │   ├── MetricCard.jsx        # Model evaluation scorecards (Accuracy, F1, ROC-AUC)
│   │   └── AnalyticsCharts.jsx   # Employment, Purpose, and Scatter charts
│   │
│   └── common/
│       ├── Button.jsx            # Standardized button variants with loading state
│       ├── Input.jsx             # Currency, numeric, and text inputs with error display
│       ├── Select.jsx            # Custom styled dropdown inputs
│       ├── Modal.jsx             # Accessible animated dialog
│       ├── Badge.jsx             # Risk badges (Low, Medium, High)
│       ├── Loader.jsx            # Spinner and skeleton loading components
│       └── EmptyState.jsx        # Table & search empty state placeholders
│
├── pages/
│   ├── Dashboard.jsx             # Real-time portfolio overview
│   ├── PredictLoan.jsx           # Interactive inference engine
│   ├── PredictionHistory.jsx     # Searchable historical evaluations
│   ├── Analytics.jsx             # Statistical cohort analysis & model metrics
│   └── AboutModel.jsx            # ML workflow documentation & feature dictionary
│
├── services/
│   ├── api.js                   # Axios client and centralized error handling
│   ├── predictionApi.js         # predictLoan, getPredictions, deletePrediction
│   └── analyticsApi.js          # getDashboardStats, getAnalytics, getModelInfo, getHealthStatus
│
├── utils/
│   ├── formatters.js            # Currency (₹), percentages, dates
│   ├── validation.js            # Form field boundary & range checks
│   └── risk.js                  # Centralized risk thresholds & themes
│
├── App.jsx                      # React Router configuration
├── main.jsx                     # Application entry point
└── index.css                    # Tailwind CSS directives & scrollbar styling
```

---

## ⚖️ Machine Learning Source of Truth

As per machine learning engineering best practices:
- The Jupyter notebook (`.ipynb`) is the **immutable source of truth** for feature engineering, scaling transformers (`StandardScaler`), encoding mappings, and logistic regression weights.
- The React application is strictly responsible for **user interaction, input validation, API payload construction, and telemetry presentation**.
