import axios from 'axios';
import { Repository, PullRequest, SecurityFinding, ArchitectureFinding, DashboardMetrics, ReviewComment } from '../types';

const API_BASE = '/api/v1';

export const api = {
  // Dashboard
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const res = await axios.get(`${API_BASE}/analytics/dashboard`);
    return res.data;
  },

  // Repositories
  getRepositories: async (): Promise<Repository[]> => {
    const res = await axios.get(`${API_BASE}/repositories`);
    return res.data;
  },

  connectRepository: async (repoData: { name: string; full_name: string; owner: string; description?: string; language?: string }): Promise<Repository> => {
    const res = await axios.post(`${API_BASE}/repositories`, repoData);
    return res.data;
  },

  // Pull Requests
  getPullRequests: async (repository_id?: number): Promise<PullRequest[]> => {
    const res = await axios.get(`${API_BASE}/pull-requests`, { params: { repository_id } });
    return res.data;
  },

  getPullRequestDetail: async (prId: number): Promise<PullRequest> => {
    const res = await axios.get(`${API_BASE}/pull-requests/${prId}`);
    return res.data;
  },

  analyzePullRequest: async (prId: number): Promise<any> => {
    const res = await axios.post(`${API_BASE}/pull-requests/${prId}/analyze`);
    return res.data;
  },

  // Security
  getSecurityFindings: async (repository_id?: number, severity?: string): Promise<SecurityFinding[]> => {
    const res = await axios.get(`${API_BASE}/security/findings`, { params: { repository_id, severity } });
    return res.data;
  },

  // Architecture
  getArchitectureFindings: async (repository_id?: number): Promise<ArchitectureFinding[]> => {
    const res = await axios.get(`${API_BASE}/architecture/findings`, { params: { repository_id } });
    return res.data;
  },

  // Reviews
  resolveComment: async (commentId: number): Promise<ReviewComment> => {
    const res = await axios.patch(`${API_BASE}/reviews/${commentId}/resolve`);
    return res.data;
  },

  // Chat
  askAIChat: async (prId: number, question: string): Promise<string> => {
    const res = await axios.post(`${API_BASE}/chat`, { pr_id: prId, question });
    return res.data.answer;
  },

  // Reports
  generatePDFReport: async (prId: number): Promise<any> => {
    const res = await axios.post(`${API_BASE}/reports/pr/${prId}/generate`);
    return res.data;
  },

  getPDFDownloadUrl: (filename: string): string => {
    return `${API_BASE}/reports/download/${filename}`;
  }
};
