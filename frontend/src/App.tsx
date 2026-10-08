import React, { useState } from 'react';
import { 
  NavigationTab, 
  UserProfile, 
  SecurityAlert, 
  UnifiedThreatResult, 
  RealTimeFeedEvent 
} from './types';
import { 
  INITIAL_USER_PROFILE, 
  DEFAULT_SECURITY_SCORE, 
  INITIAL_SUMMARY_STATS, 
  INITIAL_REALTIME_FEED,
  INITIAL_ALERTS
} from './services/mockData';
import { analyzeUnifiedInput } from './services/cyberEngine';

import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DemoDisclaimerBanner } from './components/common/DemoDisclaimerBanner';
import { CyberShieldCopilot } from './components/copilot/CyberShieldCopilot';
import { InvestigateModal } from './components/modals/InvestigateModal';
import { AuthModal } from './components/modals/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { ThreatDetectionPage } from './pages/ThreatDetectionPage';
import { AIContentDetectionPage } from './pages/AIContentDetectionPage';
import { FakeAccountDetectionPage } from './pages/FakeAccountDetectionPage';
import { PhishingScannerPage } from './pages/PhishingScannerPage';
import { BotDetectionPage } from './pages/BotDetectionPage';
import { DeepfakeDetectionPage } from './pages/DeepfakeDetectionPage';
import { AttackVisualizationPage } from './pages/AttackVisualizationPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [securityScore, setSecurityScore] = useState(DEFAULT_SECURITY_SCORE);
  const [stats, setStats] = useState(INITIAL_SUMMARY_STATS);
  const [feedEvents, setFeedEvents] = useState<RealTimeFeedEvent[]>(INITIAL_REALTIME_FEED);
  
  const [investigateItem, setInvestigateItem] = useState<SecurityAlert | UnifiedThreatResult | null>(null);
  const [currentScanResult, setCurrentScanResult] = useState<UnifiedThreatResult | null>(null);

  const activeAlertCount = INITIAL_ALERTS.filter((a) => a.status === 'active').length;

  const handleQuickSearch = (query: string) => {
    const res = analyzeUnifiedInput(query, 'url');
    setCurrentScanResult(res);
    setActiveTab('threat-detection');
  };

  const handleRunScan = (res: UnifiedThreatResult) => {
    setCurrentScanResult(res);
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        toggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        isCopilotOpen={isCopilotOpen}
        alertCount={activeAlertCount}
        onQuickSearch={handleQuickSearch}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Area */}
      {activeTab === 'landing' ? (
        <main className="flex-1">
          <LandingPage
            setActiveTab={setActiveTab}
            onRunScan={handleRunScan}
          />
        </main>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* SOC Navigation Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            alertCount={activeAlertCount}
          />

          {/* Main Dashboard Content Body */}
          <main className="flex-1 overflow-y-auto flex flex-col bg-[#070A11]">
            <DemoDisclaimerBanner />

            <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
              {activeTab === 'overview' && (
                <DashboardOverview
                  setActiveTab={setActiveTab}
                  securityScore={securityScore}
                  stats={stats}
                  feedEvents={feedEvents}
                  onInvestigateAlert={(item) => setInvestigateItem(item)}
                />
              )}

              {activeTab === 'threat-detection' && (
                <ThreatDetectionPage
                  initialResult={currentScanResult}
                  onRunScan={handleRunScan}
                  onInvestigate={(res) => setInvestigateItem(res)}
                />
              )}

              {activeTab === 'ai-content' && <AIContentDetectionPage />}

              {activeTab === 'fake-account' && <FakeAccountDetectionPage />}

              {activeTab === 'phishing' && <PhishingScannerPage />}

              {activeTab === 'bot-detection' && <BotDetectionPage />}

              {activeTab === 'deepfake' && <DeepfakeDetectionPage />}

              {activeTab === 'attack-map' && <AttackVisualizationPage />}

              {activeTab === 'alerts' && (
                <AlertsPage onInvestigate={(alert) => setInvestigateItem(alert)} />
              )}

              {activeTab === 'analytics' && <AnalyticsPage />}

              {activeTab === 'settings' && (
                <SettingsPage
                  user={user}
                  onUpdateUser={(updated) => setUser(updated)}
                  onOpenAuth={() => setIsAuthOpen(true)}
                />
              )}
            </div>
          </main>
        </div>
      )}

      {/* Slide-Over CyberShield Copilot Assistant */}
      <CyberShieldCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Investigation Details Modal */}
      <InvestigateModal
        targetAlert={investigateItem}
        onClose={() => setInvestigateItem(null)}
        onResolve={(id) => {
          setInvestigateItem(null);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </div>
  );
}

export default App;
