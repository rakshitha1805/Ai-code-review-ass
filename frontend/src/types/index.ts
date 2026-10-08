export type NavigationTab = 
  | 'overview'
  | 'threat-detection'
  | 'ai-content'
  | 'fake-account'
  | 'phishing'
  | 'bot-detection'
  | 'deepfake'
  | 'attack-map'
  | 'alerts'
  | 'analytics'
  | 'settings'
  | 'landing';

export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';

export type ThreatCategory = 
  | 'phishing'
  | 'malware'
  | 'bot'
  | 'account'
  | 'deepfake'
  | 'ai-generated'
  | 'ddos'
  | 'zero-day';

export interface UnifiedThreatResult {
  inputType: 'text' | 'url' | 'image' | 'video' | 'social' | 'account';
  threatLevel: ThreatSeverity;
  riskScore: number;
  confidence: number;
  classification: string;
  explanation: string;
  indicators: string[];
  recommendation: string;
  evaluatedAt: string;
  targetSubject: string;
}

export interface AIContentAnalysisResult {
  aiProbability: number;
  humanProbability: number;
  confidence: number;
  perplexityScore: number;
  burstinessScore: number;
  indicators: { label: string; score: number; status: 'warning' | 'normal' }[];
  summary: string;
  syntaxPattern: string;
}

export interface FakeAccountResult {
  handle: string;
  platform: string;
  riskScore: number;
  classification: string;
  accountAgeDays: number;
  profileCompleteness: number; // percentage
  followerFollowingRatio: number;
  riskFactors: { name: string; severity: 'high' | 'medium' | 'low'; description: string }[];
  verdict: string;
}

export interface PhishingScanResult {
  urlOrMessage: string;
  urlStatus: 'Suspicious' | 'Malicious' | 'Clean';
  riskLevel: ThreatSeverity;
  riskScore: number;
  domainAge: string;
  httpsStatus: boolean;
  domainEntropy: number; // 0-5.0
  redirectCount: number;
  typosquattingMatch: string | null;
  suspiciousKeywords: string[];
  recommendation: string;
}

export interface BotTrafficMetrics {
  humanPercent: number;
  automatedPercent: number;
  suspiciousPercent: number;
  requestsPerMin: number;
  topAnomalies: { ip: string; country: string; rpm: number; botType: string; status: string }[];
  trafficGraphData: { time: string; human: number; bot: number; suspicious: number }[];
}

export interface DeepfakeAnalysisResult {
  fileName: string;
  mediaType: 'image' | 'video';
  authenticityScore: number;
  deepfakeProbability: number;
  riskLevel: ThreatSeverity;
  facialInconsistencyScore: number;
  compressionArtifactScore: number;
  aiGenerationScore: number;
  audioLipSyncScore: number;
  indicators: string[];
  disclaimer: string;
}

export interface AttackNode {
  id: string;
  source: { name: string; lat: number; lng: number; ip: string; country: string };
  target: { name: string; lat: number; lng: number; ip: string; country: string };
  type: ThreatCategory;
  severity: ThreatSeverity;
  timestamp: string;
}

export interface SecurityAlert {
  id: string;
  name: string;
  timestamp: string;
  source: string;
  target: string;
  riskScore: number;
  severity: ThreatSeverity;
  status: 'active' | 'investigating' | 'resolved' | 'ignored';
  recommendedAction: string;
  iocs: string[];
  category: ThreatCategory;
}

export interface RealTimeFeedEvent {
  id: string;
  timestamp: string;
  threatType: string;
  severity: ThreatSeverity;
  source: string;
  status: 'Flagged' | 'Quarantined' | 'Blocked' | 'Monitoring';
  action: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  organization: string;
  avatarUrl: string;
  twoFactorEnabled: boolean;
  apiKey: string;
  notificationPreferences: {
    criticalEmail: boolean;
    slackWebhook: boolean;
    weeklyReport: boolean;
  };
}
