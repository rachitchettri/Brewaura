import { animationStages } from '../models/Recipe.js';

export const recipes = [
  {
    name: 'Solo Sunrise Moka',
    cups: 1,
    water_ml: 60,
    coffee_grams: 8,
    grind_size: 'medium-fine',
    heat_level: 'medium-low',
    description:
      'A compact, bright moka pot brew for one cup with a gentle heat profile and silky finish.',
    steps: [
      'Fill the bottom chamber with hot water just below the safety valve.',
      'Load the basket with medium-fine coffee and level it without tamping.',
      'Assemble the moka pot carefully with a towel because the base is warm.',
      'Place it on medium-low heat with the lid open and listen for a soft gurgle.',
      'Remove from heat when honey-colored coffee begins to lighten.',
      'Stir the top chamber and pour immediately into a warmed demitasse.',
    ],
    animationStages,
  },
  {
    name: 'Classic 3-Cup Crema Ritual',
    cups: 3,
    water_ml: 150,
    coffee_grams: 18,
    grind_size: 'medium-fine',
    heat_level: 'medium',
    description:
      'The balanced everyday moka pot recipe: aromatic, full-bodied, and ideal for sharing.',
    steps: [
      'Preheat filtered water and fill the boiler to just below the valve.',
      'Fill the filter basket with fresh coffee, then sweep the surface flat.',
      'Screw the top and bottom together until sealed, avoiding over-tightening.',
      'Heat on medium and watch for the first stream of coffee through the column.',
      'Lower the heat once extraction accelerates to prevent bitterness.',
      'When the stream turns pale, cool the base under a damp towel and serve.',
    ],
    animationStages,
  },
  {
    name: 'Brunch 6-Cup Velvet Batch',
    cups: 6,
    water_ml: 300,
    coffee_grams: 35,
    grind_size: 'medium',
    heat_level: 'medium',
    description:
      'A larger moka pot recipe tuned for an even extraction and smooth cups at the breakfast table.',
    steps: [
      'Fill the boiler with hot water to the safety valve line.',
      'Dose the basket generously with coffee and distribute it evenly.',
      'Assemble firmly and place the pot slightly off-center on medium heat.',
      'Keep the lid open and wait for the coffee to rise in a steady stream.',
      'Reduce heat when the top chamber is half full to avoid a harsh finish.',
      'Stop extraction before sputtering, stir the brew, and divide into cups.',
    ],
    animationStages,
  },
  {
    name: 'Iced Moka Tonic Base',
    cups: 3,
    water_ml: 135,
    coffee_grams: 20,
    grind_size: 'medium-fine',
    heat_level: 'medium-high',
    description:
      'A concentrated moka brew designed to pour over ice or mix with tonic water.',
    steps: [
      'Fill the boiler slightly below the valve with hot water for a stronger concentrate.',
      'Use a full basket of medium-fine coffee and level it lightly.',
      'Assemble and set over medium-high heat for an assertive start.',
      'Pull the pot from heat as soon as the flow becomes golden and fast.',
      'Cool the lower chamber with a wet towel to halt extraction quickly.',
      'Pour over ice, then top with tonic or chilled milk as desired.',
    ],
    animationStages,
  },
];
