import { PricingTier } from './types';

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      '10 meetings per month',
      'Basic action extraction',
      'Slack integration',
      'Email summaries',
      'Watermarked exports',
    ],
    limits: {
      meetings: 10,
      actions: 100,
      integrations: 2,
    },
  },
  {
    name: 'Pro',
    price: 19,
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    features: [
      'Unlimited meetings',
      'Advanced AI extraction',
      'All integrations (Slack, Linear, Asana, Jira)',
      'Priority support',
      'No watermarks',
      'Custom action types',
    ],
    limits: {
      meetings: -1, // unlimited
      actions: -1,
      integrations: -1,
    },
    popular: true,
  },
  {
    name: 'Team',
    price: 99,
    priceId: process.env.STRIPE_PRICE_ID_TEAM,
    features: [
      'Everything in Pro',
      'Shared workspace (up to 20 users)',
      'SSO (Google, Microsoft)',
      'Admin analytics dashboard',
      'Custom playbooks',
      'API access',
      'Dedicated support',
    ],
    limits: {
      meetings: -1,
      actions: -1,
      integrations: -1,
    },
  },
];

export const FEATURES = [
  {
    title: 'Auto-Extract Actions',
    description: 'AI identifies tasks, decisions, and owners from meeting transcripts in seconds.',
    icon: 'zap',
  },
  {
    title: 'Push to Your Tools',
    description: 'Auto-post summaries to Slack and create tasks in Linear, Asana, or Jira.',
    icon: 'target',
  },
  {
    title: 'Never Miss Follow-Ups',
    description: 'Every decision gets an owner, due date, and visibility—no more "we\'ll follow up."',
    icon: 'check-circle',
  },
  {
    title: 'Works with Zoom & Meet',
    description: 'Plugs into Zoom and Google Meet. Transcripts processed automatically.',
    icon: 'video',
  },
  {
    title: 'Built for Teams',
    description: 'Shared workspace, team analytics, and cross-platform action tracking.',
    icon: 'users',
  },
  {
    title: '2-Minute Setup',
    description: 'Connect Zoom + Slack. First summary arrives within 2 minutes of your next call.',
    icon: 'clock',
  },
];

export const APP_CONFIG = {
  name: 'MeetingActions',
  description: 'Turn meeting talk into shipped tasks—automatically.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  tagline: 'Every meeting → Clear actions → Posted to Slack → In your task tool.',
  email: 'support@meetingactions.com',
};

