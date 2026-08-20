import { api } from '@/api/client';

export async function convertImage(formData: FormData) {
  const { data } = await api.post('/image/convert', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function resizeImage(formData: FormData) {
  const { data } = await api.post('/image/resize', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function compressImage(formData: FormData) {
  const { data } = await api.post('/image/compress', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function removeBackground(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/image/remove-background', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
