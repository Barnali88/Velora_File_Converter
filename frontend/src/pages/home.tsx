import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, WandSparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/shared/section-heading';
import { ToolCard } from '@/components/tool/tool-card';
import { tools } from '@/config/site';

const orbitCards = [
  {
    label: 'PDF → Merge',
    className: 'right-8 top-16',
    animation: { x: [0, 14, -6, 0], y: [0, -12, 10, 0], rotate: [0, 2, -2, 0] },
    duration: 7.8,
  },
  {
    label: 'WEBP → PNG',
    className: 'left-2 bottom-16',
    animation: { x: [0, -10, 16, 0], y: [0, 10, -8, 0], rotate: [0, -2, 2, 0] },
    duration: 8.6,
  },
  {
    label: 'MP4 → GIF',
    className: 'bottom-4 right-10',
    animation: { x: [0, 8, -14, 0], y: [0, -10, 12, 0], rotate: [0, 1.5, -1.5, 0] },
    duration: 7.2,
  },
];

export function HomePage() {
  return (
    <div className="space-y-24 pb-10">
      <section className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:pt-10">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-velora-violet/20 bg-white/70 px-4 py-2 text-sm text-velora-violet shadow-soft dark:bg-white/5">
            <Sparkles size={16} /> Soft, magical, useful
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            File conversion that feels like Magic.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Velora blends premium gradients, gentle animation, and practical conversion tools into a cleaner experience than typical utility sites.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/tools" className="inline-flex items-center gap-2 rounded-2xl bg-velora-violet px-6 py-4 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5">
              Explore tools <ArrowRight size={16} />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 text-sm font-medium shadow-soft dark:border-white/10 dark:bg-white/5">
              Recent conversions
            </Link>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="absolute -left-8 top-16 h-32 w-32 rounded-full bg-velora-cyan/35 blur-3xl" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-velora-violet/25 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/55 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_22%),linear-gradient(135deg,_rgba(222,216,232,0.98)_0%,_rgba(208,204,228,0.97)_34%,_rgba(194,205,226,0.96)_68%,_rgba(224,219,232,0.98)_100%)] p-8 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_20%),linear-gradient(135deg,_rgba(36,34,48,0.96)_0%,_rgba(41,38,59,0.95)_38%,_rgba(31,42,61,0.95)_68%,_rgba(36,35,47,0.96)_100%)]">
            <div className="absolute inset-x-12 top-6 h-44 rounded-full bg-gradient-to-r from-fuchsia-200/18 via-violet-200/18 to-cyan-200/16 blur-3xl dark:from-fuchsia-400/10 dark:via-violet-400/15 dark:to-cyan-400/12" />
            <div className="absolute bottom-0 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-violet-300/10 blur-3xl dark:bg-violet-400/10" />

            <div className="relative grid min-h-[420px] place-items-center">
              <div className="relative h-72 w-72">
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-velora-violet/55 via-fuchsia-300/38 to-velora-cyan/40 blur-2xl" />

                  <div className="absolute inset-4 rounded-full">
                    <div className="absolute inset-0 rounded-full border border-violet-200/35 opacity-90 dark:border-violet-300/20" />
                    <div className="absolute inset-0 animate-spin-slow rounded-full">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(167,139,250,0.98) 326deg, rgba(236,72,153,0.98) 342deg, transparent 360deg)',
                          WebkitMask:
                            'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                          mask:
                            'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                          filter: 'drop-shadow(0 0 8px rgba(192,132,252,0.55))',
                        }}
                      />
                    </div>
                  </div>

                  <div className="absolute inset-6 rounded-full border border-white/60 bg-white/70 dark:bg-white/10" />

                  <motion.div
                    animate={{ y: [0, -10, 0], x: [0, 3, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-10 top-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-velora-violet text-white shadow-glow"
                  >
                    <WandSparkles />
                  </motion.div>
                </motion.div>

                {orbitCards.map((card) => (
                  <motion.div
                    key={card.label}
                    animate={card.animation}
                    transition={{ duration: card.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    className={`absolute ${card.className} rounded-3xl bg-white px-4 py-3 text-sm shadow-soft dark:bg-[#171A2B]`}
                  >
                    {card.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <SectionHeading eyebrow="Featured" title="Gentle tools for everyday conversions" description="Start with simple, practical tools for everyday file conversions." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => <ToolCard key={tool.slug} {...tool} />)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          ['Storybook polish', 'Large spacing, glowing gradients, and floating panels inspired by polished event pages.'],
          ['Utility with charm', 'The product still feels fast and practical instead of becoming a theme-only concept.'],
          ['Ready for scale', 'This layout leaves space for later video, audio, and richer upload flows.'],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-4xl border border-white/70 bg-white/75 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}