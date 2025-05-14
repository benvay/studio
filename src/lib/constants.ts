
export type HouseName = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';

export interface HouseDetails {
  name: HouseName;
  colors: { 
    textClass: string; 
    backgroundClass: string; 
    borderClass: string; 
  };
  crestImage: string; // placeholder URL
  crestHint: string; // For AI image generation
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
    crestImage: 'https://placehold.co/150x150/7F0909/FFC500.png', // Placeholder with actual hex for visual cue if needed
    crestHint: 'lion shield',
    description: 'Gryffindor values courage, bravery, nerve, and chivalry. Its emblematic animal is the lion, and its colours are scarlet and gold.',
    traits: HOUSE_TRAITS_FOR_AI.Gryffindor,
  },
  Slytherin: {
    name: 'Slytherin',
    colors: { 
      textClass: 'text-slytherin-secondary',
      backgroundClass: 'bg-slytherin-primary',
      borderClass: 'border-slytherin-secondary',
    },
    crestImage: 'https://placehold.co/150x150/1A472A/AAAAAA.png',
    crestHint: 'serpent shield',
    description: 'Slytherin values ambition, cunning, leadership, and resourcefulness. Its emblematic animal is the serpent, and its colours are emerald green and silver.',
    traits: HOUSE_TRAITS_FOR_AI.Slytherin,
  },
  Ravenclaw: {
    name: 'Ravenclaw',
    colors: { 
      textClass: 'text-ravenclaw-secondary',
      backgroundClass: 'bg-ravenclaw-primary', 
      borderClass: 'border-ravenclaw-secondary',
    },
    crestImage: 'https://placehold.co/150x150/0E1A40/946B2D.png',
    crestHint: 'eagle shield',
    description: 'Ravenclaw values intelligence, learning, wisdom, and wit. Its emblematic animal is the eagle, and its colours are blue and bronze.',
    traits: HOUSE_TRAITS_FOR_AI.Ravenclaw,
  },
  Hufflepuff: {
    name: 'Hufflepuff',
    colors: { 
      textClass: 'text-hufflepuff-secondary', 
      backgroundClass: 'bg-hufflepuff-primary',
      borderClass: 'border-hufflepuff-secondary',
    },
    crestImage: 'https://placehold.co/150x150/FFDB00/333333.png',
    crestHint: 'badger shield',
    description: 'Hufflepuff values hard work, dedication, patience, loyalty, and fair play. Its emblematic animal is the badger, and its colours are yellow and black.',
    traits: HOUSE_TRAITS_FOR_AI.Hufflepuff,
  },
};

export const MAX_QUESTIONS = 3;
