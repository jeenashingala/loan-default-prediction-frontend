/**
 * Centralized Risk Configuration & Thresholds
 * All risk rules, thresholds, and labels must be defined here.
 */

export const RISK_THRESHOLDS = {
  LOW_MAX: 0.35,     // < 35% probability is Low Risk
  MEDIUM_MAX: 0.65,  // 35% to 65% is Medium Risk
  // >= 65% is High Risk
};

export const RISK_LEVELS = {
  LOW: 'Low Risk',
  MEDIUM: 'Medium Risk',
  HIGH: 'High Risk',
};

/**
 * Determine risk level based on default probability (0.0 to 1.0 or 0 to 100)
 * @param {number} probability - Probability between 0 and 1 (or 0 to 100)
 * @returns {string} Risk level ('Low Risk' | 'Medium Risk' | 'High Risk')
 */
export function getRiskLevel(probability) {
  // Normalize to 0-1 if passed as percentage > 1
  const prob = probability > 1 ? probability / 100 : probability;
  if (prob < RISK_THRESHOLDS.LOW_MAX) {
    return RISK_LEVELS.LOW;
  }
  if (prob < RISK_THRESHOLDS.MEDIUM_MAX) {
    return RISK_LEVELS.MEDIUM;
  }
  return RISK_LEVELS.HIGH;
}

/**
 * Get color styling details for a given risk level or probability
 */
export function getRiskTheme(riskLevelOrProbability) {
  let level = riskLevelOrProbability;
  if (typeof riskLevelOrProbability === 'number') {
    level = getRiskLevel(riskLevelOrProbability);
  }

  const normalized = String(level).toLowerCase();

  if (normalized.includes('low')) {
    return {
      level: RISK_LEVELS.LOW,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      text: 'text-emerald-600',
      fill: '#16A34A',
      border: 'border-emerald-500',
      bgLight: 'bg-emerald-50/50',
      gradient: 'from-emerald-500 to-teal-600',
      barColor: 'bg-emerald-500',
      label: 'Low Risk',
      indicatorColor: 'text-emerald-600',
      bgColor: 'bg-emerald-500',
    };
  }

  if (normalized.includes('med')) {
    return {
      level: RISK_LEVELS.MEDIUM,
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      text: 'text-amber-600',
      fill: '#F59E0B',
      border: 'border-amber-500',
      bgLight: 'bg-amber-50/50',
      gradient: 'from-amber-500 to-orange-500',
      barColor: 'bg-amber-500',
      label: 'Medium Risk',
      indicatorColor: 'text-amber-600',
      bgColor: 'bg-amber-500',
    };
  }

  return {
    level: RISK_LEVELS.HIGH,
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    text: 'text-rose-600',
    fill: '#DC2626',
    border: 'border-rose-500',
    bgLight: 'bg-rose-50/50',
    gradient: 'from-rose-500 to-red-600',
    barColor: 'bg-rose-500',
    label: 'High Risk',
    indicatorColor: 'text-rose-600',
    bgColor: 'bg-rose-500',
  };
}

/**
 * Computes explanatory UI risk factors based on applicant data.
 * IMPORTANT: As mandated by application requirements, the frontend treats
 * these strictly as explanatory UI guidance/heuristics and does NOT claim
 * that the ML model itself provides feature importance.
 */
export function calculateExplanatoryRiskFactors(data) {
  const factors = [];

  // 1. Interest Rate
  const interestRate = Number(data.InterestRate) || 0;
  let interestRisk = 'Low';
  let interestPct = 25;
  if (interestRate >= 16) {
    interestRisk = 'High';
    interestPct = 85;
  } else if (interestRate >= 10) {
    interestRisk = 'Medium';
    interestPct = 55;
  }
  factors.push({
    label: 'Interest Rate',
    value: `${interestRate.toFixed(1)}%`,
    riskLevel: interestRisk,
    percentage: interestPct,
    detail: interestRisk === 'High' ? 'Subprime rate threshold' : interestRisk === 'Medium' ? 'Moderate rate tier' : 'Prime rate tier',
  });

  // 2. Loan Amount
  const loanAmount = Number(data.LoanAmount) || 0;
  let loanRisk = 'Low';
  let loanPct = 30;
  if (loanAmount > 1000000) {
    loanRisk = 'High';
    loanPct = 80;
  } else if (loanAmount > 400000) {
    loanRisk = 'Medium';
    loanPct = 50;
  }
  factors.push({
    label: 'Loan Amount',
    value: `₹${loanAmount.toLocaleString('en-IN')}`,
    riskLevel: loanRisk,
    percentage: loanPct,
    detail: loanRisk === 'High' ? 'Substantial capital exposure' : loanRisk === 'Medium' ? 'Standard commercial tranche' : 'Conservative principal size',
  });

  // 3. DTI Ratio
  const dti = Number(data.DTIRatio) || 0;
  let dtiRisk = 'Low';
  let dtiPct = 20;
  if (dti >= 0.45) {
    dtiRisk = 'High';
    dtiPct = 85;
  } else if (dti >= 0.35) {
    dtiRisk = 'Medium';
    dtiPct = 55;
  }
  factors.push({
    label: 'DTI Ratio',
    value: `${(dti * 100).toFixed(1)}%`,
    riskLevel: dtiRisk,
    percentage: dtiPct,
    detail: dtiRisk === 'High' ? 'Elevated debt obligations' : dtiRisk === 'Medium' ? 'Acceptable leverage threshold' : 'Comfortable debt headroom',
  });

  // 4. Credit Score
  const score = Number(data.CreditScore) || 600;
  let scoreRisk = 'High';
  let scorePct = 85;
  let scoreQuality = 'Poor';
  if (score >= 740) {
    scoreRisk = 'Low';
    scorePct = 20;
    scoreQuality = 'Excellent';
  } else if (score >= 670) {
    scoreRisk = 'Medium';
    scorePct = 45;
    scoreQuality = 'Good';
  } else if (score >= 580) {
    scoreRisk = 'Medium';
    scorePct = 65;
    scoreQuality = 'Fair';
  }
  factors.push({
    label: 'Credit Score',
    value: `${score} (${scoreQuality})`,
    riskLevel: scoreRisk,
    percentage: scorePct,
    detail: scoreRisk === 'Low' ? 'Strong historical repayment' : scoreRisk === 'Medium' ? 'Average credit profile' : 'Subprime credit profile',
  });

  // 5. Employment Stability
  const months = Number(data.MonthsEmployed) || 0;
  let empRisk = 'High';
  let empPct = 80;
  let empStability = 'Tenure < 1 yr';
  if (months >= 36) {
    empRisk = 'Low';
    empPct = 20;
    empStability = 'Stable (> 3 yrs)';
  } else if (months >= 12) {
    empRisk = 'Medium';
    empPct = 45;
    empStability = 'Moderate (1-3 yrs)';
  }
  factors.push({
    label: 'Employment',
    value: `${months} mos (${empStability})`,
    riskLevel: empRisk,
    percentage: empPct,
    detail: empRisk === 'Low' ? 'Established employment tenure' : empRisk === 'Medium' ? 'Adequate track record' : 'Early probationary period',
  });

  return factors;
}
