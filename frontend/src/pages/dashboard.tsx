import { useQuery } from '@tanstack/react-query';
import { getRecentJobs } from '@/api/jobs';
import type { Job } from '@/types/job';

export function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['recent-jobs'], queryFn: getRecentJobs });
  const jobs: Job[] = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-velora-violet">Dashboard</p>
        <h1 className="text-4xl font-semibold tracking-tight">Recent conversions</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">View your recent conversions and download finished files in one place.</p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="grid grid-cols-[90px_1fr_130px_150px] gap-4 border-b border-slate-200/70 px-6 py-4 text-sm font-medium text-slate-500 dark:border-white/10 dark:text-slate-400">
          <p>ID</p>
          <p>File</p>
          <p>Status</p>
          <p>Download</p>
        </div>
        {isLoading ? (
          <p className="px-6 py-8 text-sm text-slate-500">Loading recent jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="px-6 py-8 text-sm text-slate-500">No completed conversions yet. Run a conversion from a tool page.</p>
        ) : (
          jobs.map((job) => {
            const href = job.id ? `http://127.0.0.1:8000/api/v1/jobs/${job.id}/download` : undefined;
            const canDownload = job.status === 'completed' && !!job.output_filename;
            return (
              <div key={job.id} className="grid grid-cols-[90px_1fr_130px_150px] gap-4 px-6 py-4 text-sm">
                <p>#{job.id}</p>
                <div>
                  <p className="truncate">{job.original_filename}</p>
                  {job.output_filename && <p className="truncate text-xs text-slate-500 dark:text-slate-400">{job.output_filename}</p>}
                </div>
                <p>
                  <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-emerald-600 dark:text-emerald-400">{job.status}</span>
                </p>
                <div>
                  {canDownload ? (
                    <a href={href} target="_blank" rel="noreferrer" className="inline-flex rounded-2xl bg-velora-violet px-4 py-2 text-xs font-medium text-white shadow-glow transition hover:-translate-y-0.5">
                      Download
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Not ready</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
