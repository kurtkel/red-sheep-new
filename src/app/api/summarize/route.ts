import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided for summarization' },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that creates concise, well-structured summaries of conversations.
          Your summaries should:
          - Capture the main topics and key points discussed
          - Highlight any decisions made or action items
          - Be organized with clear sections
          - Use bullet points for clarity
          - Be concise but comprehensive`,
        },
        {
          role: 'user',
          content: `Please summarize the following conversation transcript:\n\n${text}`,
        },
      ],
      model: 'llama-3.3-70b-versatile', // Using Llama 3.3 70B - fast and free on Groq
      temperature: 0.3,
      max_tokens: 1024,
    });

    const summary = completion.choices[0]?.message?.content || 'No summary generated';

    return NextResponse.json({
      summary,
      success: true,
      model: 'llama-3.3-70b-versatile',
    });
  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
