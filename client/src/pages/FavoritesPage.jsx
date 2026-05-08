import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { fallbackRecipes } from '../services/fallbackRecipes';
import { recipeService } from '../services/api';

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState([]);
  const favoriteIds = JSON.parse(localStorage.getItem('brewaura:favorites') || '[]');

  useEffect(() => {
    const loadFavorites = async () => {
      const loaded = await Promise.all(
        favoriteIds.map(async (id) => {
          try {
            return id.startsWith('local-') ? fallbackRecipes.find((recipe) => recipe._id === id) : await recipeService.getById(id);
          } catch (_error) {
            return fallbackRecipes.find((recipe) => recipe._id === id);
          }
        })
      );
      setRecipes(loaded.filter(Boolean));
    };
    loadFavorites();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-crema/10 px-4 py-2 text-latte"><Heart size={16} /> Saved locally</p>
        <h1 className="mt-4 text-5xl font-black coffee-gradient">Favorite Recipes</h1>
      </div>
      {recipes.length === 0 ? (
        <div className="glass-card rounded-[2rem] p-10 text-center text-crema/75">
          No favorites yet. Open a recipe and tap Favorite to save it in this browser.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
        </div>
      )}
    </div>
  );
}
