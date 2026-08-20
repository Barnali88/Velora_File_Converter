import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UploadZone({
  onChange,
  accept,
  title = 'Drop your file here',
  multiple = false,
}: {
  onChange: (files: File[]) => void;
  accept: string;
  title?: string;
  multiple?: boolean;
}) {
  return (
    <label className={cn('flex cursor-pointer flex-col items-center justify-center rounded-4xl border border-dashed border-velora-violet/40 bg-white/70 p-10 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-white/5')}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-velora-violet to-velora-cyan text-white shadow-glow">
        <UploadCloud size={28} />
      </div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {multiple ? 'Tap to browse or drag supported files here.' : 'Tap to browse or drag a supported file into this area.'}
      </p>
      <input
        className="hidden"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onChange(Array.from(e.target.files ?? []))}
      />
    </label>
  );
}
