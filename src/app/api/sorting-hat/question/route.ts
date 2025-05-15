
import { type NextRequest, NextResponse } from 'next/server';
import { generateQuestion, type GenerateQuestionInput, type GenerateQuestionOutput } from '@/ai/flows/generate-questions';
import { HOUSE_TRAITS_FOR_AI } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const previousQuestionsParam = searchParams.getAll('previousQuestions');
    
    const input: GenerateQuestionInput = {
      houseTraits: HOUSE_TRAITS_FOR_AI,
      previousQuestions: previousQuestionsParam.length > 0 ? previousQuestionsParam : undefined,
    };

    const result: GenerateQuestionOutput = await generateQuestion(input);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Error generating question via API:", e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return NextResponse.json({ error: 'Failed to generate a question.', details: errorMessage }, { status: 500 });
  }
}
