import { BookOpenText, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import type { ToolItem } from '@/config/site';

export function ToolGuideCard({ tool }: { tool: ToolItem }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-velora-violet/20 bg-velora-violet/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-velora-violet">
          <BookOpenText size={14} /> Easy guide
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">How to use {tool.name}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {tool.bestFor}
        </p>

        <div className="mt-6 space-y-4">
          {tool.steps.map((step, index) => (
            <div key={step.title} className="flex gap-4 rounded-3xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-velora-violet to-velora-cyan text-sm font-semibold text-white shadow-glow">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
            <CheckCircle2 size={14} /> Supported formats
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-2 font-medium">Input</p>
              <div className="flex flex-wrap gap-2">
                {tool.inputFormats.map((format) => (
                  <span key={format} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                    {format}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-medium">Output</p>
              <div className="flex flex-wrap gap-2">
                {tool.outputFormats.map((format) => (
                  <span key={format} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">
            <Lightbulb size={14} /> Helpful tips
          </div>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {tool.tips.map((tip) => (
              <div key={tip} className="flex gap-3 rounded-2xl bg-slate-50/70 p-3 dark:bg-white/5">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-velora-violet" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
