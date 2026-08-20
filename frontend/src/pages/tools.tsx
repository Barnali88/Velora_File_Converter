import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { tools } from '@/config/site';
import { ToolCard } from '@/components/tool/tool-card';
import { SectionHeading } from '@/components/shared/section-heading';

export function ToolsPage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => tools.filter((tool) => `${tool.name} ${tool.category} ${tool.description}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div>
      <SectionHeading eyebrow="Toolbox" title="Choose a soft little utility" description="Each tool opens a clean, focused page with only the options you need." />
      <div className="mb-8 flex items-center gap-3 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft dark:border-white/10 dark:bg-white/5">
        <Search size={18} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools" className="w-full bg-transparent outline-none placeholder:text-slate-400" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tool) => <ToolCard key={tool.slug} {...tool} />)}
      </div>
    </div>
  );
}
