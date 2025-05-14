// src/ai/flows/generate-questions.ts
'use server';

/**
 * @fileOverview Dynamically generates personality questions for the Hogwarts House Sorting Hat.
 *
 * - generateQuestion - A function that generates a question relevant to the sorting process.
 * - GenerateQuestionInput - The input type for the generateQuestion function.
 * - GenerateQuestionOutput - The return type for the generateQuestion function (a single question string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionInputSchema = z.object({
  houseTraits: z.object({
    Gryffindor: z.string().describe('Traits associated with Gryffindor house.'),
    Slytherin: z.string().describe('Traits associated with Slytherin house.'),
    Ravenclaw: z.string().describe('Traits associated with Ravenclaw house.'),
    Hufflepuff: z.string().describe('Traits associated with Hufflepuff house.'),
  }).describe('The traits of all four houses.'),
  previousQuestions: z.array(z.string()).optional().describe('Previously asked questions to avoid repetition.'),
});
export type GenerateQuestionInput = z.infer<typeof GenerateQuestionInputSchema>;

const GenerateQuestionOutputSchema = z.object({
  question: z.string().describe('A single personality question relevant to the Hogwarts house sorting process.'),
});
export type GenerateQuestionOutput = z.infer<typeof GenerateQuestionOutputSchema>;

export async function generateQuestion(input: GenerateQuestionInput): Promise<GenerateQuestionOutput> {
  return generateQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionPrompt',
  input: {schema: GenerateQuestionInputSchema},
  output: {schema: GenerateQuestionOutputSchema},
  prompt: `You are the Hogwarts Sorting Hat, and your task is to generate a single, engaging personality question to determine which Hogwarts house a student belongs to.

  Consider the core values of each house:
  Gryffindor: {{{houseTraits.Gryffindor}}}
  Slytherin: {{{houseTraits.Slytherin}}}
  Ravenclaw: {{{houseTraits.Ravenclaw}}}
  Hufflepuff: {{{houseTraits.Hufflepuff}}}

  Avoid asking questions that are too obvious or leading. The question should encourage introspection and reveal the student's true nature.

  {{#if previousQuestions}}
  Do not repeat the following questions: {{previousQuestions}}
  {{/if}}

  Generate only ONE question.
  The question should be phrased such that it could apply to a student of any gender or background.

  Question: `,
});

const generateQuestionFlow = ai.defineFlow(
  {
    name: 'generateQuestionFlow',
    inputSchema: GenerateQuestionInputSchema,
    outputSchema: GenerateQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {question: output!.question};
  }
);
