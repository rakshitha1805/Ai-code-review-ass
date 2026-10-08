import { 
  SecurityAlert, 
  RealTimeFeedEvent, 
  AttackNode, 
  BotTrafficMetrics, 
  UserProfile, 
  UnifiedThreatResult,
  AIContentAnalysisResult,
  FakeAccountResult,
  PhishingScanResult,
  DeepfakeAnalysisResult
} from '../types';

export const DEFAULT_SECURITY_SCORE = 92;

export const INITIAL_SUMMARY_STATS = {
  criticalThreats: 3,
  highRiskThreats: 8,
  suspiciousActivities: 24,
  blockedAttacks: 1482,
  phishingAttempts: 142,
  detectedBots: 389,
};

export const INITIAL_REALTIME_FEED: RealTimeFeedEvent[] = [
  {
    id: 'evt-101',
    timestamp: 'Just now',
    threatType: 'Phishing URL Identified',
    severity: 'CRITICAL',
    source: '185.220.101.45 (Domain: accounts-verify-auth.com)',
    status: 'Blocked',
    action: 'Domain sinkholed & blacklisted',
  },
  {
    id: 'evt-102',
    timestamp: '2 mins ago',
    threatType: 'AI-Generated Content Detected',
    severity: 'MEDIUM',
    source: 'Executive Email Scanner (ID: #8821)',
    status: 'Flagged',
    action: 'Marked for SOC audit',
  },
  {
    id: 'evt-103',
    timestamp: '5 mins ago',
    threatType: 'Fake Account Flagged',
    severity: 'HIGH',
    source: 'Social Sentinel (Handle: @crypto_admin_support)',
    status: 'Flagged',
    action: 'Impersonation report filed',
  },
  {
    id: 'evt-104',
    timestamp: '8 mins ago',
    threatType: 'Botnet Credential Stuffing',
    severity: 'CRITICAL',
    source: 'Distributed Autonomous Botnet (2,400 IPs)',
    status: 'Quarantined',
    action: 'Rate limit & CAPTCHA enforced',
  },
  {
    id: 'evt-105',
    timestamp: '12 mins ago',
    threatType: 'Deepfake Media Detected',
    severity: 'HIGH',
    source: 'Corporate Press Release Media Scanner',
    status: 'Quarantined',
    action: 'Authenticity score 19% - Flagged',
  },
  {
    id: 'evt-106',
    timestamp: '18 mins ago',
    threatType: 'Suspicious Login Anomaly',
    severity: 'MEDIUM',
    source: '45.142.214.88 (Kyiv, Ukraine)',
    status: 'Monitoring',
    action: 'MFA re-challenge requested',
  },
];

export const INITIAL_ATTACK_NODES: AttackNode[] = [
  {
    id: 'attack-01',
    source: { name: 'Frankfurt, DE', lat: 50.1109, lng: 8.6821, ip: '185.220.101.4', country: 'Germany' },
    target: { name: 'Washington D.C., US', lat: 38.9072, lng: -77.0369, ip: '192.168.1.1', country: 'United States' },
    type: 'phishing',
    severity: 'CRITICAL',
    timestamp: '10:42:01 UTC',
  },
  {
    id: 'attack-02',
    source: { name: 'Moscow, RU', lat: 55.7558, lng: 37.6173, ip: '45.142.214.88', country: 'Russia' },
    target: { name: 'Tokyo, JP', lat: 35.6762, lng: 139.6503, ip: '172.16.0.42', country: 'Japan' },
    type: 'ddos',
    severity: 'HIGH',
    timestamp: '10:42:04 UTC',
  },
  {
    id: 'attack-03',
    source: { name: 'Beijing, CN', lat: 39.9042, lng: 116.4074, ip: '103.22.180.12', country: 'China' },
    target: { name: 'London, UK', lat: 51.5074, lng: -0.1278, ip: '10.0.4.15', country: 'United Kingdom' },
    type: 'bot',
    severity: 'HIGH',
    timestamp: '10:42:09 UTC',
  },
  {
    id: 'attack-04',
    source: { name: 'Sao Paulo, BR', lat: -23.5505, lng: -46.6333, ip: '177.12.89.5', country: 'Brazil' },
    target: { name: 'New York, US', lat: 40.7128, lng: -74.0060, ip: '10.100.2.1', country: 'United States' },
    type: 'malware',
    severity: 'CRITICAL',
    timestamp: '10:42:15 UTC',
  },
  {
    id: 'attack-05',
    source: { name: 'Seoul, KR', lat: 37.5665, lng: 126.9780, ip: '211.23.10.99', country: 'South Korea' },
    target: { name: 'San Francisco, US', lat: 37.7749, lng: -122.4194, ip: '10.0.10.88', country: 'United States' },
    type: 'deepfake',
    severity: 'MEDIUM',
    timestamp: '10:42:22 UTC',
  },
  {
    id: 'attack-06',
    source: { name: 'Amsterdam, NL', lat: 52.3676, lng: 4.9041, ip: '94.23.14.88', country: 'Netherlands' },
    target: { name: 'Sydney, AU', lat: -33.8688, lng: 151.2093, ip: '192.168.10.5', country: 'Australia' },
    type: 'account',
    severity: 'LOW',
    timestamp: '10:42:28 UTC',
  }
];

export const INITIAL_ALERTS: SecurityAlert[] = [
  {
    id: 'ALT-8901',
    name: 'Phishing Credential Harvesting Domain Active',
    timestamp: '10:35 AM',
    source: 'Phishing Sentinel',
    target: 'Corporate SSO Login Portal',
    riskScore: 96,
    severity: 'CRITICAL',
    status: 'active',
    category: 'phishing',
    recommendedAction: 'Immediately block URL domain at DNS firewall and notify users who received email links.',
    iocs: [
      'Domain: paypa1-security-verification.com',
      'IP: 185.220.101.45',
      'SSL Issuer: Let\'s Encrypt (Issued 2 hours ago)',
      'Redirect entropy: 4.85 (Obfuscated base64 payload)'
    ],
  },
  {
    id: 'ALT-8902',
    name: 'Distributed Botnet Surge on Auth Endpoint',
    timestamp: '10:18 AM',
    source: 'Bot Detection Engine',
    target: '/api/v1/auth/login',
    riskScore: 89,
    severity: 'HIGH',
    status: 'investigating',
    category: 'bot',
    recommendedAction: 'Enable Cloudflare Enterprise Challenge Mode and restrict requests per minute per ASN.',
    iocs: [
      'Top IP Subnet: 45.142.214.0/24',
      'User-Agent: Mozilla/5.0 (Headless Chrome/118.0.0.0)',
      'Request Burst Rate: 4,200 req/min',
      'Canvas Fingerprint Duplicate Count: 840'
    ],
  },
  {
    id: 'ALT-8903',
    name: 'Executive Impersonation Social Media Account',
    timestamp: '09:45 AM',
    source: 'Social Sentinel AI',
    target: 'CEO Public Profile (@JaneDoe_CEO)',
    riskScore: 78,
    severity: 'HIGH',
    status: 'active',
    category: 'account',
    recommendedAction: 'Issue takedown request via Twitter/X API & notify Brand Protection team.',
    iocs: [
      'Handle: @JaneDoe_CEO_Official',
      'Account Creation: 3 days ago',
      'Bio: Official CEO Support & Crypto Giveaways',
      'Follower/Following Ratio: 0.02 (12 followers, 600 following)'
    ],
  },
  {
    id: 'ALT-8904',
    name: 'Deepfake Audio-Visual Asset Injected in PR Portal',
    timestamp: '08:30 AM',
    source: 'Deepfake Scanner',
    target: 'Press Room Upload Storage',
    riskScore: 84,
    severity: 'HIGH',
    status: 'investigating',
    category: 'deepfake',
    recommendedAction: 'Quarantine media asset and run forensic pixel-consistency verification.',
    iocs: [
      'File: Q3_Earnings_Video_Statement.mp4',
      'Facial Inconsistency Score: 82%',
      'Audio-Visual Lip Sync Deviation: 140ms',
      'GAN Generator Fingerprint: Model_v4_Diffusion'
    ],
  },
  {
    id: 'ALT-8905',
    name: 'AI Synthesized Phishing Mail in Inbound Queue',
    timestamp: '07:12 AM',
    source: 'AI Content Auditor',
    target: 'finance-dept@cybershield.io',
    riskScore: 68,
    severity: 'MEDIUM',
    status: 'resolved',
    category: 'ai-generated',
    recommendedAction: 'Quarantined. Recipient educated on AI wire-transfer scams.',
    iocs: [
      'AI Probability: 94%',
      'Perplexity Score: 12.4 (Ultra-smooth LLM generation)',
      'Urgency Keyword Pattern: "Immediate Wire Transfer Needed"'
    ],
  },
  {
    id: 'ALT-8906',
    name: 'Subtle Port Scan Detected from External IP',
    timestamp: '05:00 AM',
    source: 'Network Intrusion Sensor',
    target: 'Edge Router 02',
    riskScore: 32,
    severity: 'LOW',
    status: 'ignored',
    category: 'malware',
    recommendedAction: 'Automatic IP block for 24 hours.',
    iocs: ['IP: 198.51.100.14', 'Ports Scanned: 22, 80, 443, 8080'],
  }
];

export const INITIAL_BOT_METRICS: BotTrafficMetrics = {
  humanPercent: 74,
  automatedPercent: 18,
  suspiciousPercent: 8,
  requestsPerMin: 3840,
  topAnomalies: [
    { ip: '185.220.101.45', country: 'Germany', rpm: 1250, botType: 'Credential Stuffer', status: 'Blocked' },
    { ip: '45.142.214.88', country: 'Russia', rpm: 980, botType: 'Headless Crawler', status: 'Challenged' },
    { ip: '103.22.180.12', country: 'China', rpm: 640, botType: 'Scraper Bot', status: 'Rate Limited' },
    { ip: '177.12.89.5', country: 'Brazil', rpm: 420, botType: 'Vulnerability Scanner', status: 'Blocked' },
  ],
  trafficGraphData: [
    { time: '00:00', human: 1200, bot: 300, suspicious: 80 },
    { time: '04:00', human: 900, bot: 450, suspicious: 120 },
    { time: '08:00', human: 2800, bot: 500, suspicious: 150 },
    { time: '12:00', human: 4200, bot: 780, suspicious: 310 },
    { time: '16:00', human: 3900, bot: 620, suspicious: 200 },
    { time: '20:00', human: 2400, bot: 400, suspicious: 110 },
    { time: '24:00', human: 1800, bot: 350, suspicious: 90 },
  ],
};

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Vance',
  email: 'alex.vance@cybershield.ai',
  role: 'Senior SOC Lead Analyst',
  organization: 'CyberShield Global SOC',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  twoFactorEnabled: true,
  apiKey: 'cs_live_9948a72b109e4a81bc920f',
  notificationPreferences: {
    criticalEmail: true,
    slackWebhook: true,
    weeklyReport: true,
  }
};

// Preset demo options for instant testing
export const DEMO_PRESETS = {
  phishingUrl: 'https://security-verify-bank-update.com/login/auth?user_ref=8841',
  aiText: 'Dear Valued Client, We have detected anomalous activity regarding your account funds. You are requested to verify your credentials immediately to prevent account termination within 24 hours.',
  fakeProfile: '@crypto_support_official_2026',
  deepfakeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
};
