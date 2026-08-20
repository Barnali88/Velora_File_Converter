import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '@/config/site';
import { ToolForm } from '@/components/upload/tool-form';
import { ToolGuideCard } from '@/components/tool/tool-guide-card';

export function ToolDetailPage() {
  const { slug } = useParams();
  const tool = useMemo(() => tools.find((item) => item.slug === slug), [slug]);

  if (!tool) {
    return (
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-velora-violet">Tool detail</p>
        <h1 className="text-4xl font-semibold tracking-tight">Tool not found</h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">This tool does not exist in the current frontend config.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-velora-violet">Tool detail</p>
        <h1 className="text-4xl font-semibold tracking-tight">{tool.name}</h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">{tool.description}</p>
      </div>
      <ToolForm tool={tool} />
      <ToolGuideCard tool={tool} />
    </div>
  );
}
