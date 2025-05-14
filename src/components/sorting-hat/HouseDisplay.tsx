import type { FC } from 'react';
import Image from 'next/image';
import type { HouseDetails } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface HouseDisplayProps {
  house: HouseDetails;
}

const HouseDisplay: FC<HouseDisplayProps> = ({ house }) => {
  return (
    <Card className={`w-full shadow-xl border-2 ${house.colors.borderClass} ${house.colors.backgroundClass} transition-all duration-500 ease-in-out transform hover:scale-105`}>
      <CardHeader className="items-center text-center">
        <Image
          src={house.crestImage}
          alt={`${house.name} Crest`}
          width={120}
          height={120}
          className="mb-4 rounded-full"
          data-ai-hint={house.crestHint}
        />
        <CardTitle className={`text-5xl font-bold font-cinzel ${house.colors.textClass}`}>
          {house.name.toUpperCase()}!
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className={`text-lg ${house.colors.textClass} opacity-90`}>
          {house.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default HouseDisplay;
