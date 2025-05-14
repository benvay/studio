'use server';

/**
 * @fileOverview Determines the Hogwarts house best suited to the user's personality based on their answers.
 *
 * - analyzeAnswers - A function that handles the house assignment process.
 * - AnalyzeAnswersInput - The input type for the analyzeAnswers function.
 * - AnalyzeAnswersOutput - The return type for the analyzeAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAnswersInputSchema = z.object({
  answers: z
    .array(z.string())
    .describe('An array of answers to the personality questions.'),
});
export type AnalyzeAnswersInput = z.infer<typeof AnalyzeAnswersInputSchema>;

const AnalyzeAnswersOutputSchema = z.object({
  house: z.enum(['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff']).describe('The Hogwarts house the user is assigned to.'),
  reasoning: z.string().describe('The reasoning behind the house assignment.'),
});
export type AnalyzeAnswersOutput = z.infer<typeof AnalyzeAnswersOutputSchema>;

export async function analyzeAnswers(input: AnalyzeAnswersInput): Promise<AnalyzeAnswersOutput> {
  return analyzeAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAnswersPrompt',
  input: {schema: AnalyzeAnswersInputSchema},
  output: {schema: AnalyzeAnswersOutputSchema},
  prompt: `You are the Sorting Hat from Hogwarts. You will analyze the user's answers to determine which Hogwarts house they belong to. The houses are Gryffindor (courage, bravery, determination), Slytherin (ambition, cunning, leadership), Ravenclaw (intelligence, learning, wisdom), and Hufflepuff (loyalty, hard work, fairness). Provide a brief reasoning for your choice.\n\nAnswers:\n{{#each answers}}\n- {{{this}}}\n{{/each}}`,
});

const analyzeAnswersFlow = ai.defineFlow(
  {
    name: 'analyzeAnswersFlow',
    inputSchema: AnalyzeAnswersInputSchema,
    outputSchema: AnalyzeAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
