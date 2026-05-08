import mongoose from 'mongoose';

const animationStages = [
  'fill_water',
  'add_coffee',
  'assemble',
  'heat',
  'brew',
  'serve',
];

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true,
      maxlength: 120,
    },
    cups: {
      type: Number,
      required: [true, 'Cup count is required'],
      min: 1,
    },
    water_ml: {
      type: Number,
      required: [true, 'Water amount is required'],
      min: 1,
    },
    coffee_grams: {
      type: Number,
      required: [true, 'Coffee amount is required'],
      min: 1,
    },
    grind_size: {
      type: String,
      required: true,
      enum: ['fine', 'medium-fine', 'medium', 'coarse'],
      default: 'medium-fine',
    },
    heat_level: {
      type: String,
      required: true,
      enum: ['low', 'medium-low', 'medium', 'medium-high'],
      default: 'medium',
    },
    steps: {
      type: [String],
      required: true,
      validate: {
        validator: (steps) => steps.length > 0,
        message: 'At least one brewing step is required',
      },
    },
    animationStages: {
      type: [String],
      enum: animationStages,
      default: animationStages,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
  },
  { timestamps: true }
);

recipeSchema.index({ cups: 1, name: 1 });

export default mongoose.model('Recipe', recipeSchema);
export { animationStages };
