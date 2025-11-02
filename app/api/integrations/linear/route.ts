import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

const LINEAR_CLIENT_ID = process.env.LINEAR_CLIENT_ID;
const LINEAR_CLIENT_SECRET = process.env.LINEAR_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/linear/callback`;

/**
 * Linear OAuth - Start Authorization
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

  // Build Linear OAuth URL
  const linearAuthUrl = new URL('https://linear.app/oauth/authorize');
  linearAuthUrl.searchParams.set('client_id', LINEAR_CLIENT_ID!);
  linearAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  linearAuthUrl.searchParams.set('response_type', 'code');
  linearAuthUrl.searchParams.set('scope', 'read,write');
  linearAuthUrl.searchParams.set('state', workspaceId);

  return NextResponse.redirect(linearAuthUrl.toString());
}

/**
 * Create an issue in Linear
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { workspace_id, team_id, title, description, priority, assignee_id } = await request.json();

  // Get Linear integration
  const { data: integration, error } = await supabaseAdmin
    .from('integrations')
    .select('*')
    .eq('workspace_id', workspace_id)
    .eq('type', 'linear')
    .single();

  if (error || !integration) {
    return NextResponse.json({ error: 'Linear not connected' }, { status: 400 });
  }

  // Create issue via Linear GraphQL API
  const mutation = `
    mutation IssueCreate($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue {
          id
          identifier
          title
          url
        }
      }
    }
  `;

  const variables = {
    input: {
      teamId: team_id,
      title,
      description,
      priority: priority ? priorityToLinear(priority) : undefined,
      assigneeId: assignee_id,
    },
  };

  const response = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'Authorization': integration.access_token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    return NextResponse.json({ error: result.errors[0].message }, { status: 400 });
  }

  const issue = result.data.issueCreate.issue;

  return NextResponse.json({
    success: true,
    issue_id: issue.id,
    issue_url: issue.url,
    identifier: issue.identifier,
  });
}

function priorityToLinear(priority: string): number {
  const map: Record<string, number> = {
    urgent: 1,
    high: 2,
    medium: 3,
    low: 4,
  };
  return map[priority] || 3;
}

