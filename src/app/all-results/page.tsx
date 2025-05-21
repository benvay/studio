
'use client';

import { useState, useEffect } from 'react';
import { type HouseName, HOUSES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';


interface SubmissionEntry {
  id: string;
  answers: string[];
  reasoning: string;
  timestamp: string; // Comes as string from JSON, will be parsed to Date
}

type GroupedResults = Record<HouseName, SubmissionEntry[]>;

export default function AllResultsPage() {
  const [results, setResults] = useState<GroupedResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/sorting-results');
        if (!response.ok) {
          throw new Error('Failed to fetch sorting results.');
        }
        const data: GroupedResults = await response.json();
        setResults(data);
      } catch (e) {
        console.error("Error fetching results:", e);
        setError(e instanceof Error ? e.message : 'Could not load results.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchResults();
  }, []);

  const getTotalSortings = () => {
    if (!results) return 0;
    return Object.values(results).reduce((total, houseSubmissions) => total + houseSubmissions.length, 0);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl">Fetching ancient scrolls of sorted students...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-destructive">
        <h1 className="text-3xl font-bold mb-4 font-cinzel">A Magical Mishap!</h1>
        <p className="text-xl mb-6">{error}</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Sorting
          </Link>
        </Button>
      </main>
    );
  }

  if (!results || getTotalSortings() === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4 font-cinzel">The Great Hall Archives</h1>
        <p className="text-xl mb-6">No students have been sorted yet. The scrolls are empty!</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Be the First to Sort
          </Link>
        </Button>
      </main>
    );
  }
  
  const houseOrder: HouseName[] = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];


  return (
    <main 
      className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8"
      style={{ 
        backgroundImage: "url('https://preview.redd.it/random-scenes-from-inside-of-hogwarts-castle-to-show-off-v0-0emhk3lovf5c1.jpg?width=1080&crop=smart&auto=webp&s=f0ec14944f8fd495de139407685575e91785f469')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-ai-hint="Hogwarts library archives"
    >
      <Card className="w-full max-w-4xl bg-card/80 shadow-2xl border-2 border-border/70 backdrop-blur-md mt-8 mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-cinzel">Hogwarts Sorting Archives</CardTitle>
          <CardDescription className="text-lg">
            A record of all students sorted. Total: {getTotalSortings()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Accordion type="multiple" className="w-full">
            {houseOrder.map((houseName) => {
              const houseDetails = HOUSES[houseName];
              const submissions = results[houseName] || [];
              if (!houseDetails) return null;

              return (
                <AccordionItem value={houseName} key={houseName} className={`mb-2 rounded-lg border-2 ${houseDetails.colors.borderClass} bg-background/70 overflow-hidden`}>
                  <AccordionTrigger className={`px-6 py-4 text-2xl font-cinzel hover:no-underline ${houseDetails.colors.textClass}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-sm ${houseDetails.colors.backgroundClass} flex items-center justify-center text-lg font-bold ${houseDetails.colors.textClass} border ${houseDetails.colors.borderClass}`}>
                            {houseName.charAt(0)}
                        </div>
                        {houseName} ({submissions.length})
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-card/50">
                    {submissions.length === 0 ? (
                      <p className="text-muted-foreground">No students sorted into {houseName} yet.</p>
                    ) : (
                      <ul className="space-y-4">
                        {submissions.map((sub, index) => (
                          <li key={sub.id || index} className="p-4 border rounded-md shadow-sm bg-background/90">
                            <p className="text-xs text-muted-foreground mb-1">
                              Sorted {formatDistanceToNow(new Date(sub.timestamp), { addSuffix: true })}
                            </p>
                            <p className="font-semibold text-card-foreground mb-1">Sorting Hat's Reasoning:</p>
                            <p className="italic text-sm text-card-foreground/80 mb-2">"{sub.reasoning}"</p>
                            <details>
                                <summary className="text-sm font-medium text-primary hover:underline cursor-pointer">View Answers ({sub.answers.length})</summary>
                                <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-xs text-card-foreground/70">
                                {sub.answers.map((ans, ansIndex) => (
                                    <li key={ansIndex}>{ans}</li>
                                ))}
                                </ul>
                            </details>
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Sorting Ceremony
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
       <p className="text-xs text-center text-background/70 mt-4 pb-4">
         Note: Sorting data is stored in-memory and will be lost if the server restarts.
       </p>
    </main>
  );
}

