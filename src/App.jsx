import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PredictLoan from './pages/PredictLoan';
import PredictionHistory from './pages/PredictionHistory';
import Analytics from './pages/Analytics';
import AboutModel from './pages/AboutModel';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Opens directly on the main dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="predict" element={<PredictLoan />} />
        <Route path="history" element={<PredictionHistory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="about" element={<AboutModel />} />
        {/* Fallback route directly to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
