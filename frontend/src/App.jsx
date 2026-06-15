import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

import MainLayout from './layouts/MainLayout';
import StartupWorkspaceLayout from './layouts/StartupWorkspaceLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import CreateStartupPage from './pages/CreateStartupPage';

import StartupDetailsPage from './pages/StartupDetailsPage';
import ExecutiveSummaryPage from './pages/ExecutiveSummaryPage';
import InvestorPage from './pages/InvestorPage';
import CompetitorPage from './pages/CompetitorPage';
import FinancePage from './pages/FinancePage';
import CustomerPage from './pages/CustomerPage';
import RiskPage from './pages/RiskPage';
import ProductStrategyPage from './pages/ProductStrategyPage';
import ReportHistoryPage from './pages/ReportHistoryPage';

import KnowledgePage from './pages/KnowledgePage';
import SettingsPage from './pages/SettingsPage';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>

              <Route
                path="/dashboard"
                element={<DashboardPage />}
              />

              <Route
                path="/create-startup"
                element={<CreateStartupPage />}
              />

              {/* Startup Workspace */}
              <Route
                path="/startups/:id"
                element={<StartupWorkspaceLayout />}
              >
                <Route
                  index
                  element={<StartupDetailsPage />}
                />

                <Route
                  path="executive-summary"
                  element={<ExecutiveSummaryPage />}
                />

                <Route
                  path="investor"
                  element={<InvestorPage />}
                />

                <Route
                  path="competitor"
                  element={<CompetitorPage />}
                />

                <Route
                  path="finance"
                  element={<FinancePage />}
                />

                <Route
                  path="customer"
                  element={<CustomerPage />}
                />

                <Route
                  path="risk"
                  element={<RiskPage />}
                />

                <Route
                  path="product-strategy"
                  element={<ProductStrategyPage />}
                />

                <Route
                  path="history"
                  element={<ReportHistoryPage />}
                />
              </Route>

              <Route
                path="/knowledge"
                element={<KnowledgePage />}
              />

              <Route
                path="/settings"
                element={<SettingsPage />}
              />

            </Route>
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FCFAF5',
            color: '#1E1E1E',
            border: '1px solid rgba(0,0,0,0.08)',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;