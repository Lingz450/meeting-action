import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/slack/callback`;

/**
 * Slack OAuth - Start Authorization
 */
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const workspaceId = searchParams.get('workspace_id');

  if (!workspaceId) {
    return NextResponse.json({ error: 'Missing workspace_id' }, { status: 400 });
  }

  // Build Slack OAuth URL
  const slackAuthUrl = new URL('https://slack.com/oauth/v2/authorize');
  slackAuthUrl.searchParams.set('client_id', SLACK_CLIENT_ID!);
  slackAuthUrl.searchParams.set('scope', 'chat:write,channels:read,groups:read');
  slackAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  slackAuthUrl.searchParams.set('state', workspaceId); // Pass workspace_id in state

  return NextResponse.redirect(slackAuthUrl.toString());
}

/**
 * Post a message to Slack channel
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { workspace_id, channel_id, text, blocks } = await request.json();

  // Get Slack integration
  const { data: integration, error } = await supabaseAdmin
    .from('integrations')
    .select('*')
    .eq('workspace_id', workspace_id)
    .eq('type', 'slack')
    .single();

  if (error || !integration) {
    return NextResponse.json({ error: 'Slack not connected' }, { status: 400 });
  }

  // Post to Slack
  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${integration.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: channel_id,
      text,
      blocks,
    }),
  });

  const result = await response.json();

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, message_ts: result.ts });
}

