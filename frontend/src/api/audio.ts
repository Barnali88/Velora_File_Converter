import { api } from '@/api/client';

export async function convertAudio(file: File, targetFormat: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('target_format', targetFormat);

  const { data } = await api.post('/audio/convert', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
