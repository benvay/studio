import type { FC } from 'react';
import type { HouseDetails } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

interface HouseDisplayProps {
  house: HouseDetails;
}

const HouseDisplay: FC<HouseDisplayProps> = ({ house }) => {
  return (
    <Card className={`w-full shadow-xl border-2 ${house.colors.borderClass} ${house.colors.backgroundClass} transition-all duration-500 ease-in-out transform hover:scale-105`}>
      <CardHeader className="items-center text-center pt-6 pb-4">
        <Image
          src={house.crestImage}
          alt={house.name + ' Crest'}
          width={150}
          height={150}
          className="mx-auto mb-4 rounded-md shadow-lg"
          data-ai-hint={house.crestHint}
          priority
        />
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
