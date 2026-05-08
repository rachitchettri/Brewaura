import { Heart, Play, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingState from '../components/LoadingState';
import { fallbackRecipes } from '../services/fallbackRecipes';
import { recipeService } from '../services/api';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [waterAmount, setWaterAmount] = useState(0);
  const [cups, setCups] = useState(1);
  const [favoriteIds, setFavoriteIds] = useState(() => JSON.parse(localStorage.getItem('brewaura:favorites') || '[]'));

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        const data = id.startsWith('local-') ? fallbackRecipes.find((item) => item._id === id) : await recipeService.getById(id);
        setRecipe(data);
        setWaterAmount(data.water_ml);
        setCups(data.cups);
      } catch (_error) {
        const data = fallbackRecipes.find((item) => item._id === id) || fallbackRecipes[0];
        setRecipe(data);
        setWaterAmount(data.water_ml);
        setCups(data.cups);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  const coffeeGrams = useMemo(() => {
    if (!recipe) return 0;
    return Math.max(1, Math.round((recipe.coffee_grams / recipe.water_ml) * waterAmount));
  }, [recipe, waterAmount]);

  const isFavorite = favoriteIds.includes(id);
  const toggleFavorite = () => {
    const nextFavorites = isFavorite ? favoriteIds.filter((item) => item !== id) : [...favoriteIds, id];
    setFavoriteIds(nextFavorites);
    localStorage.setItem('brewaura:favorites', JSON.stringify(nextFavorites));
  };

  if (loading) return <LoadingState label="Loading recipe details..." />;
  if (!recipe) return <div className="glass-card rounded-3xl p-8">Recipe not found.</div>;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="glass-card h-fit rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-latte/70">{recipe.cups}-cup recipe</p>
        <h1 className="mt-3 text-5xl font-black coffee-gradient">{recipe.name}</h1>
        <p className="mt-5 leading-8 text-crema/70">{recipe.description}</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Metric label="Water" value={`${waterAmount} ml`} />
          <Metric label="Coffee" value={`${coffeeGrams} g`} />
          <Metric label="Grind" value={recipe.grind_size} />
          <Metric label="Heat" value={recipe.heat_level} />
        </div>
        <div className="mt-8 rounded-3xl bg-crema/10 p-5">
          <div className="mb-4 flex items-center gap-2 font-bold"><SlidersHorizontal size={18} /> Brew variables</div>
          <label className="text-sm text-crema/70">Water amount: {waterAmount} ml</label>
          <input className="mt-3 w-full accent-copper" type="range" min="50" max="360" step="5" value={waterAmount} onChange={(event) => setWaterAmount(Number(event.target.value))} />
          <label className="mt-5 block text-sm text-crema/70">Cup target: {cups}</label>
          <input className="mt-3 w-full accent-copper" type="range" min="1" max="6" step="1" value={cups} onChange={(event) => setCups(Number(event.target.value))} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={`/recipes/${id}/animation`} className="inline-flex items-center gap-2 rounded-full bg-copper px-5 py-3 font-bold text-white transition hover:bg-latte hover:text-espresso">
            <Play size={18} /> Start Animation
          </Link>
          <button onClick={toggleFavorite} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold transition ${isFavorite ? 'bg-crema text-espresso' : 'bg-crema/10 text-crema hover:bg-crema/20'}`}>
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /> Favorite
          </button>
        </div>
      </aside>

      <section className="glass-card rounded-[2rem] p-6">
        <h2 className="text-3xl font-black">Step-by-step brew guide</h2>
        <ol className="mt-6 space-y-4">
          {recipe.steps.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-3xl bg-crema/10 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper font-black text-white">{index + 1}</span>
              <p className="leading-7 text-crema/80">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-crema/10 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-latte/70">{label}</p>
      <p className="mt-2 text-xl font-black capitalize text-crema">{value}</p>
    </div>
  );
}
