import { api } from '@/api/client';

export async function mergePdf(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data } = await api.post('/pdf/merge', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function splitPdf(file: File, startPage: number, endPage: number) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('start_page', String(startPage));
  formData.append('end_page', String(endPage));

  const { data } = await api.post('/pdf/split', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
