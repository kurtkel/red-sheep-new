import { NextResponse } from 'next/server';
import { getAllResponses } from '@/lib/db';
import { analyzeResponses } from '@/lib/analysis';

export async function GET() {
  try {
    const responses = await getAllResponses();
    const analysis = analyzeResponses(responses);

    // Create CSV header
    const headers = [
      'Question Number',
      'Section',
      'Question Text (Staff)',
      'Leader Mean',
      'Staff Mean',
      'Gap',
      'Risk Level',
      'Leader Count',
      'Staff Count',
    ];

    // Create CSV rows
    const rows = analysis.questionAnalyses.map(q => [
      q.questionNumber,
      q.sectionName,
      `"${q.questionText.staff.replace(/"/g, '""')}"`,
      q.leaderMean.toFixed(2),
      q.staffMean.toFixed(2),
      q.gap.toFixed(2),
      q.riskLevel,
      q.leaderCount,
      q.staffCount,
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
      '',
      '--- Section Summary ---',
      'Section,Leader Mean,Staff Mean,Gap,Risk Level',
      ...analysis.sectionAnalyses.map(s =>
        `"${s.sectionName}",${s.leaderMean.toFixed(2)},${s.staffMean.toFixed(2)},${s.gap.toFixed(2)},${s.riskLevel}`
      ),
      '',
      '--- Overall Statistics ---',
      `Total Responses,${Math.round(analysis.leaderResponses + analysis.staffResponses)}`,
      `Leader Responses,${Math.round(analysis.leaderResponses)}`,
      `Staff Responses,${Math.round(analysis.staffResponses)}`,
      `Overall Leader Mean,${analysis.overallLeaderMean.toFixed(2)}`,
      `Overall Staff Mean,${analysis.overallStaffMean.toFixed(2)}`,
      `Overall Gap,${analysis.overallGap.toFixed(2)}`,
      `High Risk Count,${analysis.highRiskCount}`,
      `Moderate Risk Count,${analysis.moderateRiskCount}`,
      `Low Risk Count,${analysis.lowRiskCount}`,
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="survey-results-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
