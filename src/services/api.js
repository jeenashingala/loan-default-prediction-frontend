import axios from 'axios';

// Central configuration for API connection
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create configured Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Centralized error handling: Never expose raw network errors to UI
export function handleApiError(error) {
  if (error.response) {
    const data = error.response.data;
    // Check if FastAPI returned validation errors (HTTP 422 list format)
    if (data && Array.isArray(data.detail)) {
      const messages = data.detail.map((err) => {
        const field = err.loc && err.loc.length > 0 ? err.loc[err.loc.length - 1] : 'Field';
        return `${field}: ${err.msg}`;
      });
      return new Error(messages.join(' | '));
    }
    
    // Check if error response contains string detail or message
    const serverMessage = data?.detail || data?.message;
    return new Error(
      typeof serverMessage === 'string'
        ? serverMessage
        : 'Prediction service returned an error. Please verify input data.'
    );
  } else if (error.request) {
    // The request was made but no response was received (FastAPI backend down)
    return new Error(
      'Unable to connect to prediction service. Please ensure the FastAPI backend is running on http://localhost:8000.'
    );
  } else {
    // Other client-side errors
    return new Error(
      error.message || 'An unexpected error occurred while communicating with the service.'
    );
  }
}
