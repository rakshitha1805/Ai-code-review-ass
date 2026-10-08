import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Repositories } from './pages/Repositories';
import { PullRequests } from './pages/PullRequests';
import { PRDetail } from './pages/PRDetail';
import { SecurityFindings } from './pages/SecurityFindings';
import { ArchitecturalReview } from './pages/ArchitecturalReview';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/repositories" element={<Repositories />} />
              <Route path="/pull-requests" element={<PullRequests />} />
              <Route path="/pull-requests/:id" element={<PRDetail />} />
              <Route path="/security" element={<SecurityFindings />} />
              <Route path="/architecture" element={<ArchitecturalReview />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
