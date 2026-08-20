import { Link, NavLink } from 'react-router-dom';
import { MoonStar, Sparkles, SunMedium } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f1220]/65">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-velora-violet to-velora-cyan text-white shadow-glow">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">Velora</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Soft file magic</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {[
            ['/', 'Home'],
            ['/tools', 'Tools'],
            ['/dashboard', 'Dashboard'],
            ['/about', 'About'],
            ['/contact', 'Contact'],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-velora-violet font-medium' : 'text-slate-600 hover:text-velora-violet dark:text-slate-300'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 shadow-soft transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
        </button>
      </div>
    </header>
  );
}
