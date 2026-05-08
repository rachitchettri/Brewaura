import Recipe from '../models/Recipe.js';

const sendNotFound = (res) => res.status(404).json({ message: 'Recipe not found' });

export const getRecipes = async (req, res, next) => {
  try {
    const { cups } = req.query;
    const filter = cups ? { cups: Number(cups) } : {};
    const recipes = await Recipe.find(filter).sort({ cups: 1, name: 1 });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return sendNotFound(res);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) return sendNotFound(res);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return sendNotFound(res);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};
