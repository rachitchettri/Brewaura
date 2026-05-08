import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BrewingSimulator from '../animations/BrewingSimulator';
import LoadingState from '../components/LoadingState';
import { fallbackRecipes } from '../services/fallbackRecipes';
import { recipeService } from '../services/api';

export default function AnimationPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = id.startsWith('local-') ? fallbackRecipes.find((item) => item._id === id) : await recipeService.getById(id);
        setRecipe(data);
      } catch (_error) {
        setRecipe(fallbackRecipes.find((item) => item._id === id) || fallbackRecipes[0]);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  if (loading) return <LoadingState label="Preparing animation controls..." />;

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Link to={`/recipes/${id}`} className="mb-4 inline-flex items-center gap-2 text-latte hover:text-crema"><ArrowLeft size={18} /> Back to recipe</Link>
          <h1 className="text-5xl font-black coffee-gradient">{recipe.name}</h1>
          <p className="mt-3 max-w-3xl text-crema/70">Control each animation state from the recipe data: water, coffee, assembly, pressure, extraction, and serving.</p>
        </div>
      </div>
      <BrewingSimulator recipe={recipe} />
    </div>
  );
}
