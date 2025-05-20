
import type { FC } from 'react';
import { Loader2 } from 'lucide-react';

const SortingStep: FC = () => {
  return (
    <div className="text-center p-8 flex flex-col items-center justify-center animate-fadeIn">
      {/* Image component removed */}
      <h2 className="text-4xl font-bold mb-4 font-cinzel mt-12">The Sorting Hat Ponders...</h2>
      <p className="text-xl text-foreground/80 mb-6">
        Delving deep into your thoughts, seeking the courage, ambition, wisdom, or loyalty within...
      </p>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default SortingStep;
