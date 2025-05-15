
import { type NextRequest, NextResponse } from 'next/server';
import { analyzeAnswers, type AnalyzeAnswersInput, type AnalyzeAnswersOutput } from '@/ai/flows/analyze-answers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers || !Array.isArray(answers) || !answers.every(ans => typeof ans === 'string')) {
      return NextResponse.json({ error: 'Invalid input: "answers" must be an array of strings.' }, { status: 400 });
    }

    const input: AnalyzeAnswersInput = { answers };
    const result: AnalyzeAnswersOutput = await analyzeAnswers(input);
    
    return NextResponse.json(result);
  } catch (e) {
    console.error("Error analyzing answers via API:", e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return NextResponse.json({ error: 'Failed to analyze answers.', details: errorMessage }, { status: 500 });
  }
}
