
import type { FC } from 'react';
import type { HouseDetails } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Image component is no longer imported or used

interface HouseDisplayProps {
  house: HouseDetails;
}

const HouseDisplay: FC<HouseDisplayProps> = ({ house }) => {
  // Determine the background color class for the crest placeholder div
  // We can use house.colors.backgroundClass which should map to bg-gryffindor-primary etc.
  // Or we can be more direct if needed, but let's try this first.
  const crestPlaceholderColorClass = house.colors.backgroundClass;

  return (
    <Card className={`w-full shadow-xl border-2 ${house.colors.borderClass} bg-background transition-all duration-500 ease-in-out transform hover:scale-105`}>
      <CardHeader className="items-center text-center pt-6 pb-4">
        <div 
          className={`w-24 h-24 md:w-28 md:h-28 mb-4 rounded-md ${crestPlaceholderColorClass} border-2 ${house.colors.borderClass} shadow-inner flex items-center justify-center`}
          aria-label={`${house.name} color swatch`}
          data-ai-hint={`${house.crestHint} color`}
        >
          {/* Optionally, you could put the first letter of the house here or a very simple SVG icon if available */}
        </div>
        <CardTitle className={`text-5xl font-bold font-cinzel ${house.colors.textClass}`}>
          {house.name.toUpperCase()}!
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center pb-6">
        <CardDescription className={`text-lg ${house.colors.textClass} opacity-90`}>
          {house.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default HouseDisplay;
