import { api, handleApiError } from './api';

/**
 * Format payload to match the expected FastAPI contract
 */
export function formatPredictionPayload(formData) {
  return {
    applicantName: formData.applicantName ? String(formData.applicantName).trim() : null,
    Age: Number(formData.Age),
    Income: Number(formData.Income),
    LoanAmount: Number(formData.LoanAmount),
    CreditScore: Number(formData.CreditScore),
    MonthsEmployed: Number(formData.MonthsEmployed),
    NumCreditLines: Number(formData.NumCreditLines),
    InterestRate: Number(formData.InterestRate),
    LoanTerm: Number(formData.LoanTerm),
    DTIRatio: Number(formData.DTIRatio),
    Education: String(formData.Education),
    EmploymentType: String(formData.EmploymentType),
    MaritalStatus: String(formData.MaritalStatus),
    HasMortgage: String(formData.HasMortgage),
    HasDependents: String(formData.HasDependents),
    LoanPurpose: String(formData.LoanPurpose),
    HasCoSigner: String(formData.HasCoSigner),
  };
}

/**
 * Send loan application for ML default prediction
 * @param {object} formData 
 * @returns {Promise<object>} Prediction result object
 */
export async function predictLoan(formData) {
  const payload = formatPredictionPayload(formData);

  try {
    const response = await api.post('/predict', payload);
    const data = response.data;

    return {
      id: data.id,
      prediction: data.prediction,
      prediction_label: data.prediction_label,
      probability: data.probability,
      default_probability: data.default_probability,
      no_default_probability: data.no_default_probability,
      risk_level: data.risk_level,
      model: data.model,
      created_at: data.created_at,
      applicantName: data.applicantName || formData.applicantName,
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Get all predictions history with optional filters from FastAPI / SQLite
 * @param {object} params 
 * @returns {Promise<object>} Paginated prediction records
 */
export async function getPredictions(params = {}) {
  try {
    const response = await api.get('/predictions', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Get single prediction details by ID from FastAPI / SQLite
 * @param {string} id 
 * @returns {Promise<object>} Prediction record
 */
export async function getPredictionById(id) {
  try {
    const response = await api.get(`/predictions/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Delete a prediction record from FastAPI / SQLite
 * @param {string} id 
 * @returns {Promise<object>} Success status
 */
export async function deletePrediction(id) {
  try {
    const response = await api.delete(`/predictions/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
