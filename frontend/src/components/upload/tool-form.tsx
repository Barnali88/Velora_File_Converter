import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { convertImage, resizeImage, compressImage, removeBackground } from '@/api/image';
import { mergePdf, splitPdf } from '@/api/pdf';
import { convertVideo, compressVideo, videoToGif, extractAudio } from '@/api/video';
import { convertAudio } from '@/api/audio';
import { UploadZone } from '@/components/upload/upload-zone';
import { ResultPanel } from '@/components/upload/result-panel';
import { ConversionLoading } from '@/components/upload/conversion-loading';
import type { ToolItem } from '@/config/site';

const imageFormats = ['png', 'jpg', 'webp'];
const videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'webm'];
const audioFormats = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];
const compressionLevels = ['light', 'medium', 'strong'];

const acceptMap: Record<string, string> = {
  'image-convert': 'image/png,image/jpeg,image/webp',
  'image-resize': 'image/png,image/jpeg,image/webp',
  'image-compress': 'image/png,image/jpeg,image/webp',
  'image-background-remover': 'image/png,image/jpeg,image/webp',
  'pdf-merge': 'application/pdf',
  'pdf-split': 'application/pdf',
  'video-convert': 'video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm',
  'video-compress': 'video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm',
  'video-to-gif': 'video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm',
  'video-extract-audio': 'video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm',
  'audio-convert': 'audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4',
};

function getUploadTitle(slug: string) {
  switch (slug) {
    case 'pdf-merge':
      return 'Drop your PDF files for merging';
    case 'pdf-split':
      return 'Drop your PDF for splitting';
    case 'video-convert':
      return 'Drop your video for conversion';
    case 'video-compress':
      return 'Drop your video for compression';
    case 'video-to-gif':
      return 'Drop your video for GIF creation';
    case 'video-extract-audio':
      return 'Drop your video to extract audio';
    case 'audio-convert':
      return 'Drop your audio for conversion';
    case 'image-resize':
      return 'Drop your image for resizing';
    case 'image-compress':
      return 'Drop your image for compression';
    case 'image-background-remover':
      return 'Drop your image to remove the background';
    default:
      return 'Drop your file for conversion';
  }
}

export function ToolForm({ tool }: { tool: ToolItem }) {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState('png');
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [width, setWidth] = useState('1200');
  const [height, setHeight] = useState('1200');
  const [quality, setQuality] = useState('70');
  const [startPage, setStartPage] = useState('1');
  const [endPage, setEndPage] = useState('1');
  const [showLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Preparing your file...');
  const finishTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setFiles([]);
    if (tool.slug === 'image-convert') setTargetFormat('png');
    if (tool.slug === 'video-convert') setTargetFormat('mp4');
    if (tool.slug === 'audio-convert') setTargetFormat('mp3');
    if (tool.slug === 'video-compress') setCompressionLevel('medium');
  }, [tool.slug]);

  useEffect(() => {
    return () => {
      if (finishTimerRef.current) {
        window.clearTimeout(finishTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showLoading) return;

    const messages = [
      'Preparing your file...',
      'Adding a little Velora magic...',
      'Converting gently...',
      'Polishing the result...',
      'Almost ready...',
    ];

    let messageIndex = 0;

    const messageInterval = window.setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 1700);

    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const step = prev < 28 ? 9 : prev < 58 ? 5 : 2;
        return Math.min(prev + step, 92);
      });
    }, 320);

    return () => {
      window.clearInterval(messageInterval);
      window.clearInterval(progressInterval);
    };
  }, [showLoading]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (files.length === 0) throw new Error('Please select a file first.');

      if (tool.slug === 'image-convert') {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('target_format', targetFormat);
        return convertImage(formData);
      }

      if (tool.slug === 'image-resize') {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('width', width);
        formData.append('height', height);
        return resizeImage(formData);
      }

      if (tool.slug === 'image-compress') {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('quality', quality);
        return compressImage(formData);
      }

      if (tool.slug === 'image-background-remover') {
        return removeBackground(files[0]);
      }

      if (tool.slug === 'pdf-merge') {
        if (files.length < 2) throw new Error('Please select at least two PDF files.');
        return mergePdf(files);
      }

      if (tool.slug === 'pdf-split') {
        return splitPdf(files[0], Number(startPage), Number(endPage));
      }

      if (tool.slug === 'video-convert') {
        return convertVideo(files[0], targetFormat);
      }

      if (tool.slug === 'video-compress') {
        return compressVideo(files[0], compressionLevel);
      }

      if (tool.slug === 'video-to-gif') {
        return videoToGif(files[0]);
      }

      if (tool.slug === 'video-extract-audio') {
        return extractAudio(files[0]);
      }

      if (tool.slug === 'audio-convert') {
        return convertAudio(files[0], targetFormat);
      }

      throw new Error('This tool is not wired yet.');
    },
  });

  const handleRun = async () => {
    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current);
    }

    setShowLoading(true);
    setProgress(8);
    setLoadingMessage('Preparing your file...');

    try {
      await mutation.mutateAsync();
      setProgress(100);
      setLoadingMessage('Your file is ready!');

      finishTimerRef.current = window.setTimeout(() => {
        setShowLoading(false);
        setProgress(0);
      }, 450);
    } catch (error) {
      setShowLoading(false);
      setProgress(0);
    }
  };

  const job = mutation.data as { id?: number; output_filename?: string | null } | undefined;
  const href = job?.id ? `http://127.0.0.1:8000/api/v1/jobs/${job.id}/download` : undefined;
  const multiple = tool.slug === 'pdf-merge';

  const helperNote = useMemo(() => {
    switch (tool.slug) {
      case 'video-convert':
        return 'MP4, MKV, and MOV usually keep better quality than AVI.';
      case 'video-compress':
        return 'Medium is the safest starting point for compression.';
      case 'video-to-gif':
        return 'Short clips work best because GIF files can get large quickly.';
      case 'video-extract-audio':
        return 'The backend exports extracted video audio as MP3.';
      case 'audio-convert':
        return 'Pick the output format you want before converting.';
      case 'pdf-split':
        return 'Choose a valid page range, such as 1 to 3.';
      case 'pdf-merge':
        return 'Upload at least two PDFs to merge into one file.';
      case 'image-compress':
        return 'Try quality 70 first for a balanced result.';
      case 'image-background-remover':
        return 'Best results come from images where the subject stands out clearly from the background.';
      default:
        return 'Run the tool and download the finished output from the panel.';
    }
  }, [tool.slug]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        <UploadZone onChange={setFiles} accept={acceptMap[tool.slug] ?? '*/*'} title={getUploadTitle(tool.slug)} multiple={multiple} />
        <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
          {(tool.slug === 'image-convert' || tool.slug === 'video-convert' || tool.slug === 'audio-convert') && (
            <div>
              <label className="mb-3 block text-sm font-medium">Target format</label>
              <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 dark:border-white/10 dark:bg-[#11162A]">
                {(tool.slug === 'image-convert' ? imageFormats : tool.slug === 'video-convert' ? videoFormats : audioFormats).map((format) => (
                  <option key={format} value={format}>{format.toUpperCase()}</option>
                ))}
              </select>
            </div>
          )}

          {tool.slug === 'image-resize' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium">Width</label>
                <input value={width} onChange={(e) => setWidth(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-[#11162A]" />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium">Height</label>
                <input value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-[#11162A]" />
              </div>
            </div>
          )}

          {tool.slug === 'image-compress' && (
            <div>
              <label className="mb-3 block text-sm font-medium">Quality</label>
              <input value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-[#11162A]" />
            </div>
          )}

          {tool.slug === 'pdf-split' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium">Start page</label>
                <input value={startPage} onChange={(e) => setStartPage(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-[#11162A]" />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium">End page</label>
                <input value={endPage} onChange={(e) => setEndPage(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-[#11162A]" />
              </div>
            </div>
          )}

          {tool.slug === 'video-compress' && (
            <div>
              <label className="mb-3 block text-sm font-medium">Compression level</label>
              <select value={compressionLevel} onChange={(e) => setCompressionLevel(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 dark:border-white/10 dark:bg-[#11162A]">
                {compressionLevels.map((level) => (
                  <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                ))}
              </select>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{helperNote}</p>

          <button onClick={handleRun} disabled={mutation.isPending || showLoading} className="mt-5 inline-flex rounded-2xl bg-velora-violet px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60">
            {showLoading ? 'Processing...' : 'Run tool'}
          </button>

          {mutation.isError && !showLoading && <p className="mt-3 text-sm text-red-500">{(mutation.error as Error).message}</p>}
          {files.length > 0 && (
            <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {files.length === 1 ? `Selected: ${files[0].name}` : `Selected files: ${files.map((file) => file.name).join(', ')}`}
            </div>
          )}
        </div>
      </div>
      {showLoading ? (
        <ConversionLoading progress={progress} message={loadingMessage} />
      ) : (
        <ResultPanel
          title={job ? 'Your file is ready' : 'Output will appear here'}
          subtitle={job ? 'Your converted file is ready to download.' : 'Run a conversion and download the result from here.'}
          href={href}
          filename={job?.output_filename}
          onReset={() => {
            mutation.reset();
            setFiles([]);
          }}
        />
      )}
    </div>
  );
}
