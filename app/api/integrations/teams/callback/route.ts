import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

const TEAMS_CLIENT_ID = process.env.TEAMS_CLIENT_ID;
const TEAMS_CLIENT_SECRET = process.env.TEAMS_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/teams/callback`;

/**
 * Microsoft Teams OAuth Callback
 * Exchanges code for access token and stores it
 */
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/sign-in`);
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // workspace_id
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=${error}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=missing_params`
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: TEAMS_CLIENT_ID!,
        client_secret: TEAMS_CLIENT_SECRET!,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('No access token received');
    }

    // Get user info from Microsoft Graph
    const userResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // Store integration in database
    const { error: dbError } = await supabaseAdmin
      .from('integrations')
      .upsert({
        workspace_id: state,
        type: 'teams',
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        team_id: userData.id,
        team_name: userData.displayName || 'Microsoft Teams',
        metadata: {
          user_email: userData.userPrincipalName || userData.mail,
          user_id: userData.id,
          scope: tokenData.scope,
        },
        connected_by: userId,
        connected_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Failed to store Teams integration:', dbError);
      throw new Error('Failed to store integration');
    }

    // Success - redirect to integrations page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?success=teams`
    );
  } catch (error) {
    console.error('Microsoft Teams OAuth error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=oauth_failed`
    );
  }
}

