
import type { FC } from 'react';
import type { HouseDetails } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface HouseDisplayProps {
  house: HouseDetails;
}

const HouseDisplay: FC<HouseDisplayProps> = ({ house }) => {
  const crestPlaceholderColorClass = house.colors.backgroundClass;

  return (
    <Card className={`w-full shadow-xl border-2 ${house.colors.borderClass} bg-background transition-all duration-500 ease-in-out transform hover:scale-105`}>
      <CardHeader className="items-center text-center pt-6 pb-4">
        <div
          className={`w-24 h-24 md:w-28 md:h-28 mb-4 rounded-md ${crestPlaceholderColorClass} border-2 ${house.colors.borderClass} shadow-inner flex items-center justify-center text-5xl font-bold ${house.colors.textClass} opacity-90`}
          aria-label={`${house.name} crest placeholder with initial`}
          data-ai-hint={`${house.name.charAt(0)} initial`}
        >
          {house.name.charAt(0)}
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
