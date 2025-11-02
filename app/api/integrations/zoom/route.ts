import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/zoom/callback`;

/**
 * Zoom OAuth - Start Authorization
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

  // Check if Zoom credentials are configured
  if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    return NextResponse.json({ 
      error: 'Zoom integration not configured',
      message: 'Please add ZOOM_CLIENT_ID and ZOOM_CLIENT_SECRET to your environment variables'
    }, { status: 500 });
  }

  // Build Zoom OAuth URL
  const zoomAuthUrl = new URL('https://zoom.us/oauth/authorize');
  zoomAuthUrl.searchParams.set('client_id', ZOOM_CLIENT_ID);
  zoomAuthUrl.searchParams.set('response_type', 'code');
  zoomAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  zoomAuthUrl.searchParams.set('state', workspaceId); // Pass workspace_id in state

  return NextResponse.redirect(zoomAuthUrl.toString());
}

