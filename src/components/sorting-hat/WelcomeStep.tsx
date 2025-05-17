import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

const WelcomeStep: FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 animate-fadeIn">
      <h1 className="text-5xl font-bold mb-6 animate-float">The Hogwarts Sorting Ceremony</h1>
      <div className="mb-8 text-xl text-foreground/80">
        <p>
          Step forth and let the Sorting Hat discover where you truly belong.
        </p>
        <p className="mt-2">
          Answer truthfully, for the Hat sees all.
        </p>
      </div>
      <Button size="lg" onClick={onStart} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Wand2 className="mr-2 h-6 w-6" />
        Begin the Sorting
      </Button>
    </div>
  );
};

export default WelcomeStep;
