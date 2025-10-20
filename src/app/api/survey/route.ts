import { NextRequest, NextResponse } from 'next/server';
import { createSurvey, createBulkResponses } from '@/lib/db';
import { RespondentRole } from '@/lib/questions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, answers, organisationName } = body;

    // Validate role
    if (role !== 'leader' && role !== 'staff') {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Validate answers
    if (!Array.isArray(answers) || answers.length !== 30) {
      return NextResponse.json(
        { error: 'Invalid answers format' },
        { status: 400 }
      );
    }

    // Create survey
    const survey = await createSurvey(organisationName);

    // Create responses
    await createBulkResponses(survey.id, role as RespondentRole, answers);

    return NextResponse.json({
      success: true,
      surveyId: survey.id,
      message: 'Survey submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting survey:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
