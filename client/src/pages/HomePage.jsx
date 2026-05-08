import { motion } from 'framer-motion';
import { Coffee, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import LoadingState from '../components/LoadingState';
import { fallbackRecipes } from '../services/fallbackRecipes';
import { recipeService } from '../services/api';

const cupOptions = ['all', 1, 3, 6];

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCups, setSelectedCups] = useState('all');
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await recipeService.getAll();
        setRecipes(data);
        setUsingFallback(false);
      } catch (_error) {
        setRecipes(fallbackRecipes);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  const filteredRecipes = useMemo(
    () => selectedCups === 'all' ? recipes : recipes.filter((recipe) => recipe.cups === Number(selectedCups)),
    [recipes, selectedCups]
  );

  return (
    <div>
      <section className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mb-4 inline-flex rounded-full border border-latte/25 bg-crema/10 px-4 py-2 text-sm text-latte">
            Interactive moka pot recipes and animated brewing flow
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-7xl">
            Brew Perfect <span className="coffee-gradient">Moka Pot Coffee</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-crema/70">
            Learn every stage of stovetop espresso brewing with precise ratios, step-by-step guidance, and a visual simulator driven by each recipe's brewing stages.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-[2rem] p-8 shadow-glow">
          <Coffee className="mb-6 text-latte" size={56} />
          <h2 className="text-3xl font-black">Dial in your brew</h2>
          <div className="mt-6 grid gap-4 text-sm text-crema/75">
            <div className="rounded-2xl bg-crema/10 p-4">Adjust cup size, water, coffee dose, and grind target.</div>
            <div className="rounded-2xl bg-crema/10 p-4">Step through water, pressure, extraction, and serving animations.</div>
            <div className="rounded-2xl bg-crema/10 p-4">Save your favorite recipes locally for quick repeats.</div>
          </div>
        </motion.div>
      </section>

      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-black">Recipe Library</h2>
          {usingFallback && <p className="mt-2 text-sm text-latte">Showing built-in recipes until the API is connected.</p>}
        </div>
        <div className="glass-card flex flex-wrap items-center gap-2 rounded-full p-2">
          <SlidersHorizontal className="ml-2 text-latte" size={18} />
          {cupOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedCups(option)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedCups === option ? 'bg-crema text-espresso' : 'text-crema/70 hover:bg-crema/10'
              }`}
            >
              {option === 'all' ? 'All' : `${option}-cup`}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <LoadingState />
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
        </motion.div>
      )}
    </div>
  );
}
