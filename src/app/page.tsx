
'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateQuestion, type GenerateQuestionInput, type GenerateQuestionOutput } from '@/ai/flows/generate-questions';
import { analyzeAnswers, type AnalyzeAnswersInput, type AnalyzeAnswersOutput } from '@/ai/flows/analyze-answers';
import { MAX_QUESTIONS, HOUSE_TRAITS_FOR_AI, type HouseName } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import WelcomeStep from '@/components/sorting-hat/WelcomeStep';
import QuizStep from '@/components/sorting-hat/QuizStep';
import SortingStep from '@/components/sorting-hat/SortingStep';
import ResultStep from '@/components/sorting-hat/ResultStep';

type QuizPhase = 'welcome' | 'quiz' | 'sorting' | 'result';

export default function SortingHatPage() {
  const [phase, setPhase] = useState<QuizPhase>('welcome');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sortedHouse, setSortedHouse] = useState<AnalyzeAnswersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchQuestion = useCallback(async () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setIsLoading(true);
    setError(null);
    try {
      const input: GenerateQuestionInput = {
        houseTraits: HOUSE_TRAITS_FOR_AI,
        previousQuestions: questions,
      };
      const result: GenerateQuestionOutput = await generateQuestion(input);
      setQuestions(prev => [...prev, result.question]);
    } catch (e) {
      console.error("Error generating question:", e);
      setError('The Sorting Hat is gathering its thoughts... please try again in a moment.');
      toast({ variant: "destructive", title: "Error", description: "Failed to generate a question." });
    } finally {
      setIsLoading(false);
    }
  }, [questions, toast]);

  useEffect(() => {
    if (phase === 'quiz' && questions.length === 0 && currentQuestionIndex === 0) {
      fetchQuestion();
    }
  }, [phase, questions.length, currentQuestionIndex, fetchQuestion]);

  const handleStartQuiz = () => {
    setPhase('quiz');
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSortedHouse(null);
    setError(null);
    // Initial question fetch is handled by useEffect if questions are empty
  };

  const handleSubmitAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < MAX_QUESTIONS) {
      setCurrentQuestionIndex(nextQuestionIndex);
      // Fetch next question only if we are moving to a new question index and not already loading
      if (questions.length === nextQuestionIndex) { // only fetch if this is a new question
         await fetchQuestion();
      }
    } else {
      setPhase('sorting');
      setIsLoading(true);
      setError(null);
      try {
        const analysisInput: AnalyzeAnswersInput = { answers: newAnswers };
        const result = await analyzeAnswers(analysisInput);
        setSortedHouse(result);
        setPhase('result');
      } catch (e) {
        console.error("Error analyzing answers:", e);
        setError('The Sorting Hat encountered a magical mishap... please try sorting again.');
        toast({ variant: "destructive", title: "Error", description: "Failed to analyze answers." });
        setPhase('quiz'); 
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSortAgain = () => {
    setPhase('welcome');
  };
  
  const currentQuestionText = questions[currentQuestionIndex] || (isLoading && currentQuestionIndex < MAX_QUESTIONS ? "Conjuring next question..." : "");

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
      style={{ 
        backgroundImage: "url('https://preview.redd.it/random-scenes-from-inside-of-hogwarts-castle-to-show-off-v0-0emhk3lovf5c1.jpg?width=1080&crop=smart&auto=webp&s=f0ec14944f8fd495de139407685575e91785f469')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-ai-hint="Hogwarts interior"
    >
      <Card className="relative z-10 w-full max-w-3xl bg-card/60 shadow-2xl border-2 border-border/70 backdrop-blur-md">
        <CardContent className="p-0 flex items-center justify-center min-h-[320px] md:min-h-[380px]">
          {phase === 'welcome' && <WelcomeStep onStart={handleStartQuiz} />}
          
          {phase === 'quiz' && (questions.length > 0 || isLoading) && currentQuestionIndex < MAX_QUESTIONS && (
             <QuizStep
              question={currentQuestionText}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={MAX_QUESTIONS}
              onSubmitAnswer={handleSubmitAnswer}
              isLoadingNextQuestion={isLoading && currentQuestionIndex < MAX_QUESTIONS -1 && questions.length <= currentQuestionIndex + 1}
            />
          )}

          {phase === 'quiz' && isLoading && currentQuestionIndex === questions.length && questions.length < MAX_QUESTIONS && questions.length === 0 && (
            <div className="min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center p-8">
                <SortingStep /> 
                <p className="mt-4 text-lg">Preparing the first incantation...</p>
            </div>
          )}

          {phase === 'sorting' && <SortingStep />}
          
          {phase === 'result' && sortedHouse && (
            <ResultStep
              houseName={sortedHouse.house as HouseName}
              reasoning={sortedHouse.reasoning}
              onSortAgain={handleSortAgain}
            />
          )}
          
          {error && (
            <div className="text-center p-8 text-destructive">
              <h2 className="text-2xl font-bold mb-2">Oh dear!</h2>
              <p>{error}</p>
              <Button onClick={handleStartQuiz} className="mt-4">Try Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

