export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: string;
  default_branch: string;
  is_private: boolean;
  webhook_active: boolean;
  webhook_id?: string;
  description?: string;
  language?: string;
  quality_score: number;
  security_score: number;
  created_at: string;
  open_prs_count?: number;
}

export interface ReviewComment {
  id: number;
  pull_request_id: number;
  file_path: string;
  line_number?: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  title: string;
  description: string;
  why_it_matters: string;
  suggested_fix?: string;
  example_code?: string;
  status: 'open' | 'resolved' | 'ignored';
  created_at: string;
}

export interface SecurityFinding {
  id: number;
  repository_id: number;
  pull_request_id?: number;
  vulnerability_type: string;
  cve_id?: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  file_path: string;
  line_number?: number;
  raw_snippet?: string;
  description: string;
  recommendation: string;
  risk_score: number;
  status: string;
  created_at: string;
}

export interface ArchitectureFinding {
  id: number;
  repository_id: number;
  pull_request_id?: number;
  principle_violated: string;
  severity: 'High' | 'Medium' | 'Low';
  component: string;
  description: string;
  recommendation: string;
  design_pattern_suggested?: string;
  status: string;
  created_at: string;
}

export interface PullRequest {
  id: number;
  repository_id: number;
  number: number;
  title: string;
  body?: string;
  author: string;
  author_avatar?: string;
  head_branch: string;
  base_branch: string;
  state: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  quality_score: number;
  security_score: number;
  architecture_score: number;
  overall_score: number;
  summary?: string;
  diff_data?: {
    raw?: string;
    files?: Array<{
      filename: string;
      additions: number;
      deletions: number;
      added_lines: Array<{ line_number: number; content: string }>;
      removed_lines: Array<{ line_number: number; content: string }>;
    }>;
  };
  created_at: string;
  updated_at: string;
  review_comments: ReviewComment[];
  security_findings: SecurityFinding[];
  architecture_findings: ArchitectureFinding[];
}

export interface DashboardMetrics {
  total_repositories: number;
  total_pull_requests: number;
  total_issues_found: number;
  critical_security_alerts: number;
  avg_quality_score: number;
  avg_security_score: number;
  avg_architecture_score: number;
  technical_debt_hours: number;
  recent_prs: PullRequest[];
  security_summary: Record<string, number>;
}
