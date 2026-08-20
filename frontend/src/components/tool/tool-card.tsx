import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getToolIcon, getToolTheme } from '@/lib/tool-icons';

export function ToolCard({ slug, name, category, description }: { slug: string; name: string; category: string; description: string }) {
  const Icon = getToolIcon(slug);
  const theme = getToolTheme(slug);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`group relative overflow-hidden rounded-4xl border border-white/70 bg-white/75 p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 ${theme.hoverBorder} ${theme.hoverGlow} ${theme.hoverTint}`}
    >
      <div className="pointer-events-none absolute -inset-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={`absolute -right-16 top-0 h-32 w-32 rounded-full bg-gradient-to-br ${theme.iconBg} opacity-30 blur-3xl`} />
        <div className={`absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-gradient-to-br ${theme.iconBg} opacity-30 blur-3xl`} />
      </div>

      <div className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.iconBg} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={20} />
      </div>
      <p className="relative mb-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{category}</p>
      <h3 className="relative text-xl font-semibold">{name}</h3>
      <p className="relative mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <Link to={`/tools/${slug}`} className={`relative mt-6 inline-flex items-center gap-2 text-sm font-medium ${theme.link}`}>
        Open tool <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}
