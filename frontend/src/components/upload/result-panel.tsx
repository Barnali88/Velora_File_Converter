import { CheckCircle2, Download, Sparkles } from 'lucide-react';

type ResultPanelProps = {
  title: string;
  subtitle: string;
  href?: string;
  filename?: string | null;
  onReset?: () => void;
};

export function ResultPanel({ title, subtitle, href, filename, onReset }: ResultPanelProps) {
  return (
    <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-400 text-white">
        <CheckCircle2 size={20} />
      </div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
      {filename && <p className="mt-3 truncate text-sm text-slate-500 dark:text-slate-400">Output: {filename}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        {href && (
          <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-velora-violet px-4 py-3 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5">
            <Download size={16} /> Download file
          </a>
        )}
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/5">
          <Sparkles size={16} /> Convert another
        </button>
      </div>
    </div>
  );
}
