import { Response } from './db';
import { questions } from './questions';

export interface QuestionAnalysis {
  questionNumber: number;
  sectionName: string;
  questionText: {
    leader: string;
    staff: string;
  };
  leaderMean: number;
  staffMean: number;
  gap: number;
  riskLevel: 'high' | 'moderate' | 'low' | 'insufficient-data';
  leaderCount: number;
  staffCount: number;
}

export interface SectionAnalysis {
  sectionName: string;
  sectionNumber: number;
  leaderMean: number;
  staffMean: number;
  gap: number;
  questionCount: number;
  riskLevel: 'high' | 'moderate' | 'low' | 'insufficient-data';
}

export interface OverallAnalysis {
  totalResponses: number;
  leaderResponses: number;
  staffResponses: number;
  overallLeaderMean: number;
  overallStaffMean: number;
  overallGap: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  questionAnalyses: QuestionAnalysis[];
  sectionAnalyses: SectionAnalysis[];
}

function calculateMean(scores: number[]): number {
  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function determineRiskLevel(staffMean: number, gap: number): 'high' | 'moderate' | 'low' | 'insufficient-data' {
  if (staffMean === 0) return 'insufficient-data';

  // High Risk: Staff scores ≤3 AND gap ≥2 points
  if (staffMean <= 3 && Math.abs(gap) >= 2) return 'high';

  // Moderate Risk: Staff scores 3-4 OR gap 1-2 points
  if ((staffMean > 3 && staffMean <= 4) || (Math.abs(gap) >= 1 && Math.abs(gap) < 2)) return 'moderate';

  // Low Risk: Staff scores ≥5 AND gap <1 point
  if (staffMean >= 5 && Math.abs(gap) < 1) return 'low';

  // Default to moderate for other cases
  return 'moderate';
}

export function analyzeResponses(responses: Response[]): OverallAnalysis {
  const leaderResponses = responses.filter(r => r.respondentRole === 'leader');
  const staffResponses = responses.filter(r => r.respondentRole === 'staff');

  // Analyze each question
  const questionAnalyses: QuestionAnalysis[] = questions.map(q => {
    const leaderScores = leaderResponses
      .filter(r => r.questionNumber === q.id)
      .map(r => r.score);
    const staffScores = staffResponses
      .filter(r => r.questionNumber === q.id)
      .map(r => r.score);

    const leaderMean = calculateMean(leaderScores);
    const staffMean = calculateMean(staffScores);
    const gap = leaderMean - staffMean;

    return {
      questionNumber: q.id,
      sectionName: q.section,
      questionText: {
        leader: q.leaderText,
        staff: q.staffText,
      },
      leaderMean,
      staffMean,
      gap,
      riskLevel: determineRiskLevel(staffMean, gap),
      leaderCount: leaderScores.length,
      staffCount: staffScores.length,
    };
  });

  // Analyze by section
  const sectionNames = [...new Set(questions.map(q => q.section))];
  const sectionAnalyses: SectionAnalysis[] = sectionNames.map(sectionName => {
    const sectionQuestions = questions.filter(q => q.section === sectionName);
    const sectionNumber = sectionQuestions[0]?.sectionNumber || 0;

    const sectionQuestionAnalyses = questionAnalyses.filter(
      qa => qa.sectionName === sectionName
    );

    const leaderMean = calculateMean(sectionQuestionAnalyses.map(qa => qa.leaderMean));
    const staffMean = calculateMean(sectionQuestionAnalyses.map(qa => qa.staffMean));
    const gap = leaderMean - staffMean;

    return {
      sectionName,
      sectionNumber,
      leaderMean,
      staffMean,
      gap,
      questionCount: sectionQuestions.length,
      riskLevel: determineRiskLevel(staffMean, gap),
    };
  });

  // Overall statistics
  const overallLeaderMean = calculateMean(questionAnalyses.map(qa => qa.leaderMean));
  const overallStaffMean = calculateMean(questionAnalyses.map(qa => qa.staffMean));
  const overallGap = overallLeaderMean - overallStaffMean;

  const highRiskCount = questionAnalyses.filter(qa => qa.riskLevel === 'high').length;
  const moderateRiskCount = questionAnalyses.filter(qa => qa.riskLevel === 'moderate').length;
  const lowRiskCount = questionAnalyses.filter(qa => qa.riskLevel === 'low').length;

  return {
    totalResponses: responses.length,
    leaderResponses: leaderResponses.length / 30, // Number of complete surveys
    staffResponses: staffResponses.length / 30,
    overallLeaderMean,
    overallStaffMean,
    overallGap,
    highRiskCount,
    moderateRiskCount,
    lowRiskCount,
    questionAnalyses,
    sectionAnalyses,
  };
}

export function getTopRisks(analysis: OverallAnalysis, limit: number = 5): QuestionAnalysis[] {
  return [...analysis.questionAnalyses]
    .filter(qa => qa.riskLevel === 'high' || qa.riskLevel === 'moderate')
    .sort((a, b) => {
      // Sort by risk level first (high > moderate), then by gap size
      if (a.riskLevel === 'high' && b.riskLevel !== 'high') return -1;
      if (a.riskLevel !== 'high' && b.riskLevel === 'high') return 1;
      return Math.abs(b.gap) - Math.abs(a.gap);
    })
    .slice(0, limit);
}
