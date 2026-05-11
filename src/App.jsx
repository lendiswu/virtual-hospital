import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider, useI18n } from './i18n';
import Layout from './components/layout/Layout';
import LearnerDashboard from './pages/LearnerDashboard';
import MissionWorkflow from './pages/MissionWorkflow';
import FacultyDashboard from './pages/FacultyDashboard';
import MissionBuilder from './pages/MissionBuilder';
import MissionsPage from './pages/MissionsPage';
import PortfolioPage from './pages/PortfolioPage';
import AdvancingProjectPage from './pages/AdvancingProjectPage';

const AppContent = () => {
  const { role } = useI18n();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {role === 'learner' ? (
            <>
              <Route index element={<LearnerDashboard />} />
              <Route path="missions" element={<MissionsPage />} />
              <Route path="missions/:id" element={<MissionWorkflow />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="advancing" element={<AdvancingProjectPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="faculty" element={<FacultyDashboard />} />
              <Route path="faculty/builder" element={<MissionBuilder />} />
              <Route path="*" element={<Navigate to="/faculty" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
