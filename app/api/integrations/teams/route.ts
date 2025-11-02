import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const TEAMS_CLIENT_ID = process.env.TEAMS_CLIENT_ID;
const TEAMS_CLIENT_SECRET = process.env.TEAMS_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/teams/callback`;

/**
 * Microsoft Teams OAuth - Start Authorization
 * Uses Microsoft Graph API for Teams integration
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

  // Check if Teams credentials are configured
  if (!TEAMS_CLIENT_ID || !TEAMS_CLIENT_SECRET) {
    return NextResponse.json({ 
      error: 'Microsoft Teams integration not configured',
      message: 'Please add TEAMS_CLIENT_ID and TEAMS_CLIENT_SECRET to your environment variables'
    }, { status: 500 });
  }

  // Microsoft Graph API scopes for Teams
  const scopes = [
    'User.Read',
    'OnlineMeetings.Read',
    'OnlineMeetings.ReadWrite',
    'Calendars.Read',
    'offline_access'
  ].join(' ');

  // Build Microsoft OAuth URL
  const msAuthUrl = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
  msAuthUrl.searchParams.set('client_id', TEAMS_CLIENT_ID);
  msAuthUrl.searchParams.set('response_type', 'code');
  msAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  msAuthUrl.searchParams.set('response_mode', 'query');
  msAuthUrl.searchParams.set('scope', scopes);
  msAuthUrl.searchParams.set('state', workspaceId); // Pass workspace_id in state

  return NextResponse.redirect(msAuthUrl.toString());
}

