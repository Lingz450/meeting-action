import OpenAI from 'openai';

// Lazy initialization to avoid errors during build
let _openai: OpenAI | null = null;

function getOpenAI() {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openai;
}

/**
 * Extract action items from meeting transcript using GPT-4
 */
export async function extractActions(transcript: string, meetingTitle: string) {
  const prompt = `You are an expert at analyzing meeting transcripts and extracting actionable items.

Meeting: ${meetingTitle}

Transcript:
${transcript}

Extract all action items, decisions, and follow-ups from this meeting. For each item:
1. Identify the type (task, decision, question, or followup)
2. Write a clear, concise title
3. Add a brief description if needed
4. Identify the owner (person responsible) from the transcript
5. Infer a due date if mentioned, otherwise leave blank
6. Assign priority (low, medium, high, urgent) based on context
7. Provide a confidence score (0-1) for how certain you are about this action item

Return a JSON array with this structure:
[
  {
    "type": "task" | "decision" | "question" | "followup",
    "title": "Clear action title",
    "description": "Additional context",
    "owner_name": "Person's name from transcript",
    "due_date": "YYYY-MM-DD" or null,
    "priority": "low" | "medium" | "high" | "urgent",
    "confidence_score": 0.95,
    "raw_text": "Original quote from transcript"
  }
]

Only include items with confidence_score > 0.6. Be precise and avoid hallucinating information not in the transcript.`;

  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert meeting assistant that extracts actionable items from transcripts. Return only valid JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content from OpenAI');
  }

  const parsed = JSON.parse(content);
  return parsed.actions || parsed;
}

/**
 * Generate a concise meeting summary
 */
export async function generateSummary(transcript: string, meetingTitle: string) {
  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at summarizing meetings concisely. Focus on key points, decisions, and outcomes.',
      },
      {
        role: 'user',
        content: `Summarize this meeting in 3-5 bullet points. Keep it concise and actionable.\n\nMeeting: ${meetingTitle}\n\nTranscript:\n${transcript}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 500,
  });

  return response.choices[0].message.content || '';
}

