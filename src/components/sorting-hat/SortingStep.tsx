import type { FC } from 'react';
import { Loader2 } from 'lucide-react';

const SortingHatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-24 h-24 text-primary fill-current mb-6 animate-bounce">
    <path d="M50 10 L10 50 Q15 45 20 50 L20 70 Q20 90 50 90 Q80 90 80 70 L80 50 Q85 45 90 50 L50 10 Z M40 60 Q50 55 60 60 L60 70 Q50 75 40 70 Z"/>
    <path d="M25 45 Q50 30 75 45 Q70 50 50 45 Q30 50 25 45Z" />
  </svg>
);


const SortingStep: FC = () => {
  return (
    <div className="text-center p-8 flex flex-col items-center justify-center animate-fadeIn">
      <SortingHatIcon />
      <h2 className="text-4xl font-bold mb-4 font-cinzel">The Sorting Hat Ponders...</h2>
      <p className="text-xl text-foreground/80 mb-6">
        Delving deep into your thoughts, seeking the courage, ambition, wisdom, or loyalty within...
      </p>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default SortingStep;
