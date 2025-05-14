'use client';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface QuizStepProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: string) => void;
  isLoadingNextQuestion: boolean;
}

const QuizStep: FC<QuizStepProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmitAnswer,
  isLoadingNextQuestion,
}) => {
  const [answer, setAnswer] = useState('');
  const [showProcessing, setShowProcessing] = useState(false);

  useEffect(() => {
    // Reset answer when question changes
    setAnswer('');
    setShowProcessing(false); 
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() === '') return;
    setShowProcessing(true);
    onSubmitAnswer(answer);
  };

  const progressValue = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full max-w-xl p-6 md:p-8 animate-fadeIn">
      <div className="mb-6">
        <Label htmlFor="answer" className="text-2xl font-cinzel mb-4 block text-center">
          Question {questionNumber} of {totalQuestions}
        </Label>
        <p className="text-lg text-center mb-6 min-h-[6em] flex items-center justify-center">"{question}"</p>
        <Progress value={progressValue} className="w-full h-3 mb-2" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="answer" className="text-md font-medium sr-only">
            Your Answer
          </Label>
          <Textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Pen your thoughts here..."
            rows={5}
            className="shadow-sm text-base"
            disabled={isLoadingNextQuestion || showProcessing}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full shadow-md hover:shadow-lg transition-shadow" 
          disabled={answer.trim() === '' || isLoadingNextQuestion || showProcessing}
        >
          {(isLoadingNextQuestion || showProcessing) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : questionNumber === totalQuestions ? (
            'Reveal My Destiny'
          ) : (
            'Next Question'
          )}
        </Button>
      </form>
    </div>
  );
};

export default QuizStep;
