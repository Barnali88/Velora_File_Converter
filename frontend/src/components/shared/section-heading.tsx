import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-velora-violet">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
