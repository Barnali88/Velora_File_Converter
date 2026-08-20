import { api } from '@/api/client';

export async function getRecentJobs() {
  const { data } = await api.get('/jobs/recent');
  return data;
}
