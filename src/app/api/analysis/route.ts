import { NextResponse } from 'next/server';
import { getAllResponses } from '@/lib/db';
import { analyzeResponses } from '@/lib/analysis';

export async function GET() {
  try {
    const responses = await getAllResponses();
    const analysis = analyzeResponses(responses);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing responses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
