
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { HOUSES, type HouseName } from '@/lib/constants';
import HouseDisplay from './HouseDisplay';
import ShareButton from './ShareButton';
import { RefreshCw } from 'lucide-react';

interface ResultStepProps {
  houseName: HouseName;
  reasoning: string;
  onSortAgain: () => void;
}

const ResultStep: FC<ResultStepProps> = ({ houseName, reasoning, onSortAgain }) => {
  const houseDetails = HOUSES[houseName];

  if (!houseDetails) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Hmm, something went awry...</h2>
        <p className="mb-6">The Sorting Hat seems to be a bit confused. Please try again.</p>
        <Button onClick={onSortAgain} size="lg">
          <RefreshCw className="mr-2 h-5 w-5" />
          Sort Again
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center p-4 md:p-8 w-full max-w-2xl animate-fadeIn space-y-8">
      <HouseDisplay house={houseDetails} />
      
      <div className="bg-card/80 p-6 rounded-lg shadow-md border border-border">
        <h3 className="text-2xl font-cinzel font-semibold mb-3">The Sorting Hat's Wisdom:</h3>
        <p className="text-card-foreground/90 italic">"{reasoning}"</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <ShareButton houseName={houseName} />
        <Button onClick={onSortAgain} size="lg" variant="default" className="shadow-lg hover:shadow-xl transition-shadow">
          <RefreshCw className="mr-2 h-5 w-5" />
          Sort Another Student
        </Button>
      </div>
    </div>
  );
};

export default ResultStep;
