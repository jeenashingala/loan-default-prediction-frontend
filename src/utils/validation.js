/**
 * Client-side validation for loan prediction form
 */

export function validateLoanForm(formData) {
  const errors = {};

  // Age: 18 - 100
  if (formData.Age === '' || formData.Age === null || formData.Age === undefined) {
    errors.Age = 'Age is required';
  } else {
    const age = Number(formData.Age);
    if (isNaN(age) || age < 18 || age > 100) {
      errors.Age = 'Age must be between 18 and 100';
    }
  }

  // Income: > 0
  if (formData.Income === '' || formData.Income === null || formData.Income === undefined) {
    errors.Income = 'Annual income is required';
  } else {
    const income = Number(formData.Income);
    if (isNaN(income) || income <= 0) {
      errors.Income = 'Income must be greater than 0';
    }
  }

  // Credit Score: 300 - 850
  if (formData.CreditScore === '' || formData.CreditScore === null || formData.CreditScore === undefined) {
    errors.CreditScore = 'Credit score is required';
  } else {
    const score = Number(formData.CreditScore);
    if (isNaN(score) || score < 300 || score > 850) {
      errors.CreditScore = 'Credit score must be between 300 and 850';
    }
  }

  // Months Employed: >= 0
  if (formData.MonthsEmployed === '' || formData.MonthsEmployed === null || formData.MonthsEmployed === undefined) {
    errors.MonthsEmployed = 'Months employed is required';
  } else {
    const months = Number(formData.MonthsEmployed);
    if (isNaN(months) || months < 0) {
      errors.MonthsEmployed = 'Months employed must be 0 or greater';
    }
  }

  // Number of Credit Lines: >= 0
  if (formData.NumCreditLines === '' || formData.NumCreditLines === null || formData.NumCreditLines === undefined) {
    errors.NumCreditLines = 'Number of credit lines is required';
  } else {
    const lines = Number(formData.NumCreditLines);
    if (isNaN(lines) || lines < 0) {
      errors.NumCreditLines = 'Credit lines must be 0 or greater';
    }
  }

  // Loan Amount: > 0
  if (formData.LoanAmount === '' || formData.LoanAmount === null || formData.LoanAmount === undefined) {
    errors.LoanAmount = 'Loan amount is required';
  } else {
    const loan = Number(formData.LoanAmount);
    if (isNaN(loan) || loan <= 0) {
      errors.LoanAmount = 'Loan amount must be greater than 0';
    }
  }

  // Interest Rate: 0 - 100
  if (formData.InterestRate === '' || formData.InterestRate === null || formData.InterestRate === undefined) {
    errors.InterestRate = 'Interest rate is required';
  } else {
    const rate = Number(formData.InterestRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      errors.InterestRate = 'Interest rate must be between 0% and 100%';
    }
  }

  // Loan Term: positive integer
  if (!formData.LoanTerm) {
    errors.LoanTerm = 'Loan term is required';
  } else {
    const term = Number(formData.LoanTerm);
    if (isNaN(term) || term <= 0) {
      errors.LoanTerm = 'Select a valid loan term';
    }
  }

  // DTI Ratio: 0 - 1
  if (formData.DTIRatio === '' || formData.DTIRatio === null || formData.DTIRatio === undefined) {
    errors.DTIRatio = 'DTI ratio is required';
  } else {
    const dti = Number(formData.DTIRatio);
    if (isNaN(dti) || dti < 0 || dti > 1) {
      errors.DTIRatio = 'DTI ratio must be between 0.0 and 1.0 (e.g. 0.35)';
    }
  }

  // Education
  if (!formData.Education) {
    errors.Education = 'Please select education level';
  }

  // Employment Type
  if (!formData.EmploymentType) {
    errors.EmploymentType = 'Please select employment type';
  }

  // Marital Status
  if (!formData.MaritalStatus) {
    errors.MaritalStatus = 'Please select marital status';
  }

  // Loan Purpose
  if (!formData.LoanPurpose) {
    errors.LoanPurpose = 'Please select loan purpose';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
