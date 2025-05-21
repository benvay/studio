
'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { analyzeAnswers, type AnalyzeAnswersInput, type AnalyzeAnswersOutput } from '@/ai/flows/analyze-answers';
import type { HouseName } from '@/lib/constants';

interface StoredSubmission {
  id: string;
  answers: string[];
  house: HouseName;
  reasoning: string;
  timestamp: Date;
}

// In-memory store (Replace with a real database for persistence)
let storedResults: StoredSubmission[] = [];
let submissionIdCounter = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers } = body as { answers: string[] };

    if (!answers || !Array.isArray(answers) || answers.some(a => typeof a !== 'string')) {
      return NextResponse.json({ error: 'Invalid input: answers array is required and must contain strings.' }, { status: 400 });
    }

    const analysisInput: AnalyzeAnswersInput = { answers };
    const analysisOutput: AnalyzeAnswersOutput = await analyzeAnswers(analysisInput);

    if (!analysisOutput || !analysisOutput.house || !analysisOutput.reasoning) {
        return NextResponse.json({ error: 'Failed to analyze answers or received invalid analysis.' }, { status: 500 });
    }
    
    const newSubmission: StoredSubmission = {
      id: `submission-${submissionIdCounter++}`,
      answers,
      house: analysisOutput.house as HouseName, // Ensure house is one of the defined HouseName types
      reasoning: analysisOutput.reasoning,
      timestamp: new Date(),
    };

    storedResults.push(newSubmission);

    // Return only the necessary info for the current user's result display
    return NextResponse.json({ house: newSubmission.house, reasoning: newSubmission.reasoning });

  } catch (error) {
    console.error('Error in POST /api/sorting-results:', error);
    let errorMessage = 'Failed to process sorting request.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const groupedResults: Record<HouseName, Omit<StoredSubmission, 'house'>[]> = {
      Gryffindor: [],
      Slytherin: [],
      Ravenclaw: [],
      Hufflepuff: [],
    };

    storedResults.forEach(submission => {
      // Ensure submission.house is a valid HouseName before trying to push
      if (groupedResults[submission.house]) {
        const { house, ...restOfSubmission } = submission;
        groupedResults[submission.house].push(restOfSubmission);
      }
    });
    
    // Sort submissions within each house by timestamp, newest first
    for (const house in groupedResults) {
        groupedResults[house as HouseName].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }


    return NextResponse.json(groupedResults);
  } catch (error) {
    console.error('Error in GET /api/sorting-results:', error);
    return NextResponse.json({ error: 'Failed to fetch sorting results.' }, { status: 500 });
  }
}
