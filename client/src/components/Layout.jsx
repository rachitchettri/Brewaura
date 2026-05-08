import { Coffee, Heart, Home } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Recipes', icon: Home },
  { to: '/favorites', label: 'Favorites', icon: Heart },
];

export default function Layout() {
  return (
    <div className="min-h-screen text-crema">
      <header className="sticky top-0 z-30 border-b border-crema/10 bg-espresso/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3 text-xl font-black tracking-tight">
            <span className="rounded-2xl bg-copper/20 p-2 text-latte ring-1 ring-latte/20">
              <Coffee />
            </span>
            Brewaura
          </NavLink>
          <div className="flex gap-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-crema text-espresso' : 'text-crema/75 hover:bg-crema/10 hover:text-crema'
                  }`
                }
              >
                <Icon size={16} /> {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
