
import type { FC } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const SortingStep: FC = () => {
  return (
    <div className="text-center p-8 flex flex-col items-center justify-center animate-fadeIn">
      <Image
        src="https://gimgs2.nohat.cc/thumb/f/640/computer-icons-sorting-hat-harry-potter-ron-weasley-harry-potter--comdlpng6968665.jpg"
        alt="Sorting Hat"
        width={96}
        height={96}
        className="mb-6 animate-bounce"
        data-ai-hint="sorting hat"
        priority
      />
      <h2 className="text-4xl font-bold mb-4 font-cinzel">The Sorting Hat Ponders...</h2>
      <p className="text-xl text-foreground/80 mb-6">
        Delving deep into your thoughts, seeking the courage, ambition, wisdom, or loyalty within...
      </p>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default SortingStep;
