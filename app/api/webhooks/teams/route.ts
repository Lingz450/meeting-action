import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { extractActions, generateSummary } from '@/lib/openai';
import { headers } from 'next/headers';

/**
 * Microsoft Teams Webhook Handler
 * Receives meeting ended events and transcript data
 * Docs: https://learn.microsoft.com/en-us/graph/api/resources/calltranscript
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headersList = await headers();
    
    // Verify Microsoft webhook signature (if configured)
    // const validationToken = headersList.get('validationToken');
    // if (validationToken) {
    //   // Respond to subscription validation
    //   return NextResponse.json({ validationToken }, { status: 200 });
    // }

    const { value } = body;

    if (!value || !Array.isArray(value)) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Process each notification
    for (const notification of value) {
      await handleTeamsNotification(notification);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Teams webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleTeamsNotification(notification: any) {
  const { resourceData, changeType } = notification;

  // Handle meeting ended or transcript available
  if (changeType === 'created' && resourceData) {
    const meetingId = resourceData.id;
    const transcript = resourceData.content;

    if (!transcript) {
      console.log('No transcript available yet');
      return;
    }

    // Create meeting record
    const { data: meeting, error: meetingError } = await supabaseAdmin
      .from('meetings')
      .insert({
        external_id: meetingId,
        title: resourceData.meetingOrganizer?.displayName || 'Teams Meeting',
        host_id: resourceData.meetingOrganizer?.id,
        started_at: resourceData.createdDateTime,
        duration_minutes: Math.round((new Date(resourceData.endDateTime).getTime() - new Date(resourceData.createdDateTime).getTime()) / 60000),
        raw_transcript: transcript,
        status: 'processing',
        // TODO: Get workspace_id from Teams integration
        workspace_id: 'temp-workspace-id',
      })
      .select()
      .single();

    if (meetingError || !meeting) {
      console.error('Failed to create meeting:', meetingError);
      return;
    }

    // Process transcript with AI (async)
    processTranscript(meeting.id, transcript, meeting.title).catch(console.error);
  }
}

/**
 * Process transcript with AI to extract actions and generate summary
 */
async function processTranscript(meetingId: string, transcript: string, title: string) {
  try {
    // Extract actions with GPT-4
    const extractedActions = await extractActions(transcript, title);

    // Generate summary
    const summary = await generateSummary(transcript, title);

    // Update meeting with summary
    await supabaseAdmin
      .from('meetings')
      .update({
        summary,
        status: 'completed',
        processed_at: new Date().toISOString(),
      })
      .eq('id', meetingId);

    // Insert action items
    const actionsToInsert = extractedActions.map((action: any) => ({
      meeting_id: meetingId,
      workspace_id: 'temp-workspace-id',
      type: action.type,
      title: action.title,
      description: action.description,
      owner_name: action.owner_name,
      due_date: action.due_date,
      priority: action.priority,
      confidence_score: action.confidence_score,
      raw_text: action.raw_text,
      status: 'open',
    }));

    const { data: actions, error: actionsError } = await supabaseAdmin
      .from('actions')
      .insert(actionsToInsert)
      .select();

    if (actionsError) {
      console.error('Failed to insert actions:', actionsError);
      return;
    }

    console.log(`Processed Teams meeting ${meetingId}: ${actions?.length || 0} actions extracted`);

    // TODO: Post to Slack
    // TODO: Create tasks in Linear/Asana
  } catch (error) {
    console.error('Failed to process transcript:', error);
    
    // Mark meeting as failed
    await supabaseAdmin
      .from('meetings')
      .update({ status: 'failed' })
      .eq('id', meetingId);
  }
}

// Handle webhook subscription validation
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const validationToken = searchParams.get('validationToken');
  
  if (validationToken) {
    return new NextResponse(validationToken, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  
  return NextResponse.json({ message: 'Teams webhook endpoint' });
}

