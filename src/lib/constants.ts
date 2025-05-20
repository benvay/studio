
export type HouseName = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';

export interface HouseDetails {
  name: HouseName;
  colors: {
    textClass: string;
    backgroundClass: string;
    borderClass: string;
  };
  crestImage: string;
  crestHint: string;
  description: string;
  traits: string;
}

export const HOUSE_TRAITS_FOR_AI = {
  Gryffindor: "courage, bravery, nerve, and chivalry",
  Slytherin: "ambition, cunning, leadership, and resourcefulness",
  Ravenclaw: "intelligence, learning, wisdom, and wit",
  Hufflepuff: "hard work, dedication, patience, loyalty, and fair play",
};

export const HOUSES: Record<HouseName, HouseDetails> = {
  Gryffindor: {
    name: 'Gryffindor',
    colors: {
      textClass: 'text-gryffindor-secondary',
      backgroundClass: 'bg-gryffindor-primary',
      borderClass: 'border-gryffindor-secondary',
    },
    crestImage: 'https://placehold.co/150x150/7F0909/FFC500.png?text=%20',
    crestHint: 'lion shield',
    description: 'Gryffindor values courage, bravery, nerve, and chivalry. Its emblematic animal is the lion.',
    traits: HOUSE_TRAITS_FOR_AI.Gryffindor,
  },
  Slytherin: {
    name: 'Slytherin',
    colors: {
      textClass: 'text-slytherin-secondary',
      backgroundClass: 'bg-slytherin-primary',
      borderClass: 'border-slytherin-secondary',
    },
    crestImage: 'https://placehold.co/150x150/1A472A/AAAAAA.png?text=%20',
    crestHint: 'serpent shield',
    description: 'Slytherin values ambition, cunning, leadership, and resourcefulness. Its emblematic animal is the serpent.',
    traits: HOUSE_TRAITS_FOR_AI.Slytherin,
  },
  Ravenclaw: {
    name: 'Ravenclaw',
    colors: {
      textClass: 'text-ravenclaw-secondary',
      backgroundClass: 'bg-ravenclaw-primary',
      borderClass: 'border-ravenclaw-secondary',
    },
    crestImage: 'https://placehold.co/150x150/0E1A40/946B2D.png?text=%20',
    crestHint: 'eagle shield',
    description: 'Ravenclaw values intelligence, learning, wisdom, and wit. Its emblematic animal is the eagle.',
    traits: HOUSE_TRAITS_FOR_AI.Ravenclaw,
  },
  Hufflepuff: {
    name: 'Hufflepuff',
    colors: {
      textClass: 'text-hufflepuff-secondary',
      backgroundClass: 'bg-hufflepuff-primary',
      borderClass: 'border-hufflepuff-secondary',
    },
    crestImage: 'https://placehold.co/150x150/FFDB00/333333.png?text=%20',
    crestHint: 'badger shield',
    description: 'Hufflepuff values hard work, dedication, patience, loyalty, and fair play. Its emblematic animal is the badger.',
    traits: HOUSE_TRAITS_FOR_AI.Hufflepuff,
  },
};

export const MAX_QUESTIONS = 3;
