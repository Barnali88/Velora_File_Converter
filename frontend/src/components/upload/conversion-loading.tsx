import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type ConversionLoadingProps = {
  progress: number;
  message: string;
};

export function ConversionLoading({ progress, message }: ConversionLoadingProps) {
  return (
    <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-velora-violet to-velora-cyan text-white shadow-glow"
        >
          <Sparkles size={24} />
        </motion.div>

        <h3 className="text-lg font-semibold">Converting your file...</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{message}</p>

        <div className="mt-5 w-full">
          <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-velora-violet via-fuchsia-400 to-velora-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-velora-violet [animation-delay:-0.2s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.1s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-velora-cyan" />
        </div>
      </div>
    </div>
  );
}
