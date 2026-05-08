import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Recipe from '../models/Recipe.js';
import { recipes } from './recipes.js';

dotenv.config();

const seedRecipes = async () => {
  try {
    await connectDB();
    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);
    console.log(`Seeded ${recipes.length} moka pot recipes.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedRecipes();
