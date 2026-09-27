import { api, handleApiError } from './api';

/**
 * Fetch dashboard overview statistics and chart telemetry from FastAPI / SQLite
 */
export async function getDashboardStats() {
  try {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Fetch detailed analytics for model performance and segmentation from FastAPI / SQLite
 */
export async function getAnalytics() {
  try {
    const response = await api.get('/analytics/metrics');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Fetch ML Model architecture and feature metadata from FastAPI
 */
export async function getModelInfo() {
  try {
    const response = await api.get('/model');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Fetch real-time health status of backend API
 */
export async function getHealthStatus() {
  try {
    const response = await api.get('/health');
    return {
      connected: true,
      ...response.data,
    };
  } catch (error) {
    return {
      connected: false,
      status: 'offline',
      error: error.message,
    };
  }
}
