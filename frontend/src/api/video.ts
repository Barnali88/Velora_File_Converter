import { api } from '@/api/client';

export async function convertVideo(file: File, targetFormat: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('target_format', targetFormat);

  const { data } = await api.post('/video/convert', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function compressVideo(file: File, level: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('level', level);

  const { data } = await api.post('/video/compress', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function videoToGif(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/video/to-gif', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function extractAudio(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/video/extract-audio', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
