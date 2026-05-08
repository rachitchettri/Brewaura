import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Flame, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="glass-card group overflow-hidden rounded-3xl"
    >
      <div className="h-2 bg-gradient-to-r from-copper via-latte to-crema" />
      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-latte/70">{recipe.cups}-cup moka</p>
            <h3 className="mt-2 text-2xl font-black text-crema">{recipe.name}</h3>
          </div>
          <span className="rounded-full bg-crema/10 px-3 py-1 text-sm font-bold text-latte">
            {recipe.cups} cup{recipe.cups > 1 ? 's' : ''}
          </span>
        </div>
        <p className="min-h-20 text-sm leading-6 text-crema/70">{recipe.description}</p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-crema/75">
          <span className="rounded-2xl bg-crema/10 p-3"><Droplets size={16} /> {recipe.water_ml} ml</span>
          <span className="rounded-2xl bg-crema/10 p-3"><Scale size={16} /> {recipe.coffee_grams} g</span>
          <span className="rounded-2xl bg-crema/10 p-3"><Flame size={16} /> {recipe.heat_level}</span>
        </div>
        <Link
          to={`/recipes/${recipe._id}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-5 py-3 font-bold text-white transition hover:bg-latte hover:text-espresso"
        >
          Brew this recipe <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
