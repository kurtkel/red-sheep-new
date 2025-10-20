import fs from 'fs/promises';
import path from 'path';
import { RespondentRole } from './questions';

const DB_DIR = path.join(process.cwd(), 'data');
const SURVEYS_FILE = path.join(DB_DIR, 'surveys.json');
const RESPONSES_FILE = path.join(DB_DIR, 'responses.json');

export interface Survey {
  id: number;
  organisationName?: string;
  createdAt: string;
}

export interface Response {
  id: number;
  surveyId: number;
  respondentRole: RespondentRole;
  questionNumber: number;
  sectionName: string;
  score: number;
  submittedAt: string;
}

// Initialize database
async function initDb() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });

    try {
      await fs.access(SURVEYS_FILE);
    } catch {
      await fs.writeFile(SURVEYS_FILE, JSON.stringify([], null, 2));
    }

    try {
      await fs.access(RESPONSES_FILE);
    } catch {
      await fs.writeFile(RESPONSES_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Read data
async function readSurveys(): Promise<Survey[]> {
  await initDb();
  const data = await fs.readFile(SURVEYS_FILE, 'utf-8');
  return JSON.parse(data);
}

async function readResponses(): Promise<Response[]> {
  await initDb();
  const data = await fs.readFile(RESPONSES_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write data
async function writeSurveys(surveys: Survey[]): Promise<void> {
  await fs.writeFile(SURVEYS_FILE, JSON.stringify(surveys, null, 2));
}

async function writeResponses(responses: Response[]): Promise<void> {
  await fs.writeFile(RESPONSES_FILE, JSON.stringify(responses, null, 2));
}

// Survey operations
export async function createSurvey(organisationName?: string): Promise<Survey> {
  const surveys = await readSurveys();
  const newSurvey: Survey = {
    id: surveys.length > 0 ? Math.max(...surveys.map(s => s.id)) + 1 : 1,
    organisationName,
    createdAt: new Date().toISOString(),
  };
  surveys.push(newSurvey);
  await writeSurveys(surveys);
  return newSurvey;
}

export async function getSurvey(id: number): Promise<Survey | null> {
  const surveys = await readSurveys();
  return surveys.find(s => s.id === id) || null;
}

export async function getAllSurveys(): Promise<Survey[]> {
  return await readSurveys();
}

// Response operations
export async function createResponse(responseData: Omit<Response, 'id' | 'submittedAt'>): Promise<Response> {
  const responses = await readResponses();
  const newResponse: Response = {
    ...responseData,
    id: responses.length > 0 ? Math.max(...responses.map(r => r.id)) + 1 : 1,
    submittedAt: new Date().toISOString(),
  };
  responses.push(newResponse);
  await writeResponses(responses);
  return newResponse;
}

export async function getResponsesBySurvey(surveyId: number): Promise<Response[]> {
  const responses = await readResponses();
  return responses.filter(r => r.surveyId === surveyId);
}

export async function getResponsesByRole(surveyId: number, role: RespondentRole): Promise<Response[]> {
  const responses = await readResponses();
  return responses.filter(r => r.surveyId === surveyId && r.respondentRole === role);
}

export async function getAllResponses(): Promise<Response[]> {
  return await readResponses();
}

// Bulk create responses (for survey submission)
export async function createBulkResponses(
  surveyId: number,
  role: RespondentRole,
  answers: { questionNumber: number; sectionName: string; score: number }[]
): Promise<Response[]> {
  const responses = await readResponses();
  const baseId = responses.length > 0 ? Math.max(...responses.map(r => r.id)) + 1 : 1;

  const newResponses: Response[] = answers.map((answer, index) => ({
    id: baseId + index,
    surveyId,
    respondentRole: role,
    questionNumber: answer.questionNumber,
    sectionName: answer.sectionName,
    score: answer.score,
    submittedAt: new Date().toISOString(),
  }));

  responses.push(...newResponses);
  await writeResponses(responses);
  return newResponses;
}
