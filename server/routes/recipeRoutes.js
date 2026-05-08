import express from 'express';
import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from '../controllers/recipeController.js';

const router = express.Router();

router.route('/').get(getRecipes).post(createRecipe);
router.route('/:id').get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

export default router;
