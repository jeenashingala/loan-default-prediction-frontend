import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar (Desktop fixed, Tablet/Mobile responsive drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area: offset by 64 (16rem / 256px) on lg screens */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="py-6 px-6 border-t border-slate-200/80 bg-white/70 backdrop-blur-md text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-semibold text-slate-700">LoanGuard AI • Credit Risk Intelligence System</span>
              <span className="text-slate-400 block sm:inline sm:ml-2">Engine: Balanced Logistic Regression (v1.0)</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>StandardScaler Active</span>
              <span>•</span>
              <span>FastAPI Architecture</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">Production Ready</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
