
'use server';
/**
 * @fileOverview Generates a personalized welcome message from the Head of the student's assigned Hogwarts house.
 *
 * - generateWelcomeMessage - A function that generates the welcome message.
 * - GenerateWelcomeMessageInput - The input type for the generateWelcomeMessage function.
 * - GenerateWelcomeMessageOutput - The return type for the generateWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { HouseName } from '@/lib/constants';

const GenerateWelcomeMessageInputSchema = z.object({
  houseName: z.enum(['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff']).describe('The Hogwarts house the student was sorted into.'),
  studentName: z.string().describe('The name of the student.').default('student'),
});
export type GenerateWelcomeMessageInput = z.infer<typeof GenerateWelcomeMessageInputSchema>;

const GenerateWelcomeMessageOutputSchema = z.object({
  welcomeMessage: z.string().describe('A short, characteristic welcome message from the Head of House.'),
});
export type GenerateWelcomeMessageOutput = z.infer<typeof GenerateWelcomeMessageOutputSchema>;

export async function generateWelcomeMessage(input: GenerateWelcomeMessageInput): Promise<GenerateWelcomeMessageOutput> {
  return generateWelcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWelcomeMessagePrompt',
  input: {schema: GenerateWelcomeMessageInputSchema},
  output: {schema: GenerateWelcomeMessageOutputSchema},
  prompt: `You are to craft a brief (1-2 sentences) and characteristic welcome message from the Head of a Hogwarts House to a newly sorted student named {{{studentName}}}.
The student has just been sorted into {{{houseName}}}.

Adopt the persona of the respective Head of House:
- Gryffindor: Minerva McGonagall (Stern, fair, proud of bravery and nerve)
- Slytherin: Severus Snape (Sarcastic, values ambition and cunning, subtle)
- Ravenclaw: Filius Flitwick (Cheerful, enthusiastic, values intelligence and learning)
- Hufflepuff: Pomona Sprout (Warm, kind, values hard work and loyalty)

Generate only the welcome message.

House: {{{houseName}}}
Student: {{{studentName}}}
Welcome Message:`,
});

const generateWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'generateWelcomeMessageFlow',
    inputSchema: GenerateWelcomeMessageInputSchema,
    outputSchema: GenerateWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
