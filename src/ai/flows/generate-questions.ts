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
  prompt: `You are the Hogwarts Sorting Hat, and your task is to generate a single, engaging, and insightful personality question to help determine which Hogwarts house a student belongs to. Your goal is to create a multitude of varied questions over time.

Consider the core values of each house:
Gryffindor: Courage, bravery, nerve, determination ({{{houseTraits.Gryffindor}}})
Slytherin: Ambition, cunning, leadership, resourcefulness ({{{houseTraits.Slytherin}}})
Ravenclaw: Intelligence, learning, wisdom, wit ({{{houseTraits.Ravenclaw}}})
Hufflepuff: Hard work, dedication, patience, loyalty, fairness ({{{houseTraits.Hufflepuff}}})

The question should encourage introspection and reveal the student's true nature, preferences, or decision-making style in a subtle way. Aim for questions that probe deeper than surface-level answers.

Here are some types of questions to inspire variety:
1.  **Scenario-based:** "A valuable, but forbidden, artifact is discovered. It could bring you great power, but at significant risk. What is your primary consideration?"
2.  **Preference-based:** "Would you rather be known for your groundbreaking discoveries, your unwavering loyalty to friends, your fearless leadership, or your ability to achieve any goal you set your mind to?"
3.  **Moral/Ethical Dilemma:** "You witness an injustice. Do you confront it directly, even if it means trouble for you; find a clever way to undermine it; report it to the authorities; or support those affected by it?"
4.  **Aspirational:** "What kind of legacy do you hope to leave behind?"
5.  **Reaction to Challenge:** "When faced with a difficult, complex problem with no clear solution, what is your first instinct?"
6.  **Value Prioritization:** "Is it more important to be right, to be kind, to be successful, or to be brave?"

Avoid questions that are too obvious, leading, or easily answered with a "yes/no" or a single house trait. The question should be open-ended enough to allow for a thoughtful response.

{{#if previousQuestions}}
Ensure this new question is distinct from the following previously asked questions:
{{#each previousQuestions}}
- {{{this}}}
{{/each}}
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

