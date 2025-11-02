import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { extractActions, generateSummary } from '@/lib/openai';
import { headers } from 'next/headers';

/**
 * Zoom Webhook Handler
 * Receives meeting ended events and transcript data
 * Docs: https://developers.zoom.us/docs/api/rest/webhook-reference/
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headersList = await headers();
    
    // Verify Zoom webhook signature
    const signature = headersList.get('x-zm-signature');
    const timestamp = headersList.get('x-zm-request-timestamp');
    
    // TODO: Implement signature verification
    // const isValid = verifyZoomSignature(body, signature, timestamp);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const { event, payload } = body;

    // Handle different Zoom events
    if (event === 'recording.completed') {
      return await handleRecordingCompleted(payload);
    } else if (event === 'meeting.ended') {
      return await handleMeetingEnded(payload);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Zoom webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleRecordingCompleted(payload: any) {
  const {
    object: {
      id: meetingId,
      topic: title,
      host_id: hostId,
      start_time: startTime,
      duration,
      recording_files,
    },
  } = payload;

  // Find transcript file
  const transcriptFile = recording_files.find(
    (file: any) => file.file_type === 'TRANSCRIPT'
  );

  if (!transcriptFile) {
    return NextResponse.json({ message: 'No transcript found' });
  }

  // Download transcript
  const transcriptUrl = transcriptFile.download_url;
  const transcriptResponse = await fetch(transcriptUrl);
  const transcript = await transcriptResponse.text();

  // Create meeting record
  const { data: meeting, error: meetingError } = await supabaseAdmin
    .from('meetings')
    .insert({
      external_id: meetingId.toString(),
      title,
      host_id: hostId,
      started_at: startTime,
      duration_minutes: duration,
      transcript_url: transcriptUrl,
      raw_transcript: transcript,
      status: 'processing',
      // TODO: Get workspace_id from Zoom integration
      workspace_id: 'temp-workspace-id',
    })
    .select()
    .single();

  if (meetingError || !meeting) {
    console.error('Failed to create meeting:', meetingError);
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }

  // Process transcript with AI (async)
  processTranscript(meeting.id, transcript, title).catch(console.error);

  return NextResponse.json({ 
    success: true, 
    meeting_id: meeting.id 
  });
}

async function handleMeetingEnded(payload: any) {
  // Handle real-time meeting ended event
  // Can be used to show "processing" status immediately
  return NextResponse.json({ received: true });
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
      // TODO: Get workspace_id from meeting
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

    console.log(`Processed meeting ${meetingId}: ${actions?.length || 0} actions extracted`);

    // TODO: Post to Slack
    // TODO: Create tasks in Linear/Asana
    // await postToSlack(meetingId, summary, actions);
    // await createLinearTasks(actions);

  } catch (error) {
    console.error('Failed to process transcript:', error);
    
    // Mark meeting as failed
    await supabaseAdmin
      .from('meetings')
      .update({ status: 'failed' })
      .eq('id', meetingId);
  }
}

// Verify webhook endpoint (Zoom sends this on setup)
export async function GET() {
  return NextResponse.json({ message: 'Zoom webhook endpoint' });
}

