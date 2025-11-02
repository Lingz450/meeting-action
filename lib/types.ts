// Type definitions for MeetingActions

export type PlanType = 'free' | 'pro' | 'team';
export type UserRole = 'owner' | 'admin' | 'member';
export type IntegrationType = 'zoom' | 'slack' | 'linear' | 'asana' | 'jira';
export type MeetingStatus = 'processing' | 'completed' | 'failed';
export type ActionType = 'task' | 'decision' | 'question' | 'followup';
export type ActionStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  plan: PlanType;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  subscription_status?: string;
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: UserRole;
  email: string;
  name?: string;
  avatar_url?: string;
  joined_at: string;
}

export interface Integration {
  id: string;
  workspace_id: string;
  type: IntegrationType;
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  team_id?: string;
  team_name?: string;
  metadata?: Record<string, any>;
  connected_by: string;
  connected_at: string;
  last_used_at?: string;
}

export interface Meeting {
  id: string;
  workspace_id: string;
  external_id?: string;
  title: string;
  host_id?: string;
  host_name?: string;
  started_at: string;
  ended_at?: string;
  duration_minutes?: number;
  participant_count?: number;
  transcript_url?: string;
  recording_url?: string;
  raw_transcript?: string;
  summary?: string;
  status: MeetingStatus;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MeetingParticipant {
  id: string;
  meeting_id: string;
  user_id?: string;
  name: string;
  email?: string;
  joined_at?: string;
  left_at?: string;
}

export interface Action {
  id: string;
  meeting_id: string;
  workspace_id: string;
  type: ActionType;
  title: string;
  description?: string;
  owner_id?: string;
  owner_name?: string;
  due_date?: string;
  priority?: Priority;
  status: ActionStatus;
  external_task_id?: string;
  external_task_url?: string;
  slack_message_ts?: string;
  slack_channel_id?: string;
  confidence_score?: number;
  raw_text?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface ActionActivity {
  id: string;
  action_id: string;
  user_id?: string;
  activity_type: 'created' | 'updated' | 'completed' | 'cancelled' | 'commented';
  details?: Record<string, any>;
  created_at: string;
}

export interface AuditLog {
  id: string;
  workspace_id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface UsageLog {
  id: string;
  workspace_id: string;
  action_type: 'meeting_processed' | 'action_created' | 'slack_message' | 'task_created';
  count: number;
  metadata?: Record<string, any>;
  created_at: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pricing tiers
export interface PricingTier {
  name: string;
  price: number;
  priceId?: string;
  features: string[];
  limits: {
    meetings: number;
    actions: number;
    integrations: number;
  };
  popular?: boolean;
}

