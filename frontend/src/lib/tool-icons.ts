import {
  AudioLines,
  Eraser,
  FileImage,
  FileOutput,
  Files,
  Film,
  Music4,
  Scissors,
  Shrink,
  Video,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';

export function getToolIcon(slug: string): LucideIcon {
  switch (slug) {
    case 'image-convert':
      return FileImage;
    case 'image-resize':
      return Shrink;
    case 'image-compress':
      return WandSparkles;
    case 'image-background-remover':
      return Eraser;
    case 'pdf-merge':
      return Files;
    case 'pdf-split':
      return Scissors;
    case 'video-convert':
      return Video;
    case 'video-compress':
      return Shrink;
    case 'video-to-gif':
      return Film;
    case 'video-extract-audio':
      return AudioLines;
    case 'audio-convert':
      return Music4;
    default:
      return FileOutput;
  }
}

export function getToolTheme(slug: string) {
  const map: Record<string, {
    iconBg: string;
    hoverBorder: string;
    hoverGlow: string;
    hoverTint: string;
    link: string;
  }> = {
    'image-convert': {
      iconBg: 'from-sky-500 to-cyan-400',
      hoverBorder: 'group-hover:border-sky-300/80 dark:group-hover:border-sky-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(56,189,248,0.38)]',
      hoverTint: 'group-hover:bg-sky-50 dark:group-hover:bg-sky-500/10',
      link: 'text-sky-500',
    },
    'image-resize': {
      iconBg: 'from-indigo-500 to-blue-400',
      hoverBorder: 'group-hover:border-indigo-300/80 dark:group-hover:border-indigo-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(99,102,241,0.40)]',
      hoverTint: 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10',
      link: 'text-indigo-500',
    },
    'image-compress': {
      iconBg: 'from-fuchsia-500 to-pink-400',
      hoverBorder: 'group-hover:border-fuchsia-300/80 dark:group-hover:border-fuchsia-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(217,70,239,0.40)]',
      hoverTint: 'group-hover:bg-fuchsia-50 dark:group-hover:bg-fuchsia-500/10',
      link: 'text-fuchsia-500',
    },
    'image-background-remover': {
      iconBg: 'from-emerald-500 to-teal-400',
      hoverBorder: 'group-hover:border-emerald-300/80 dark:group-hover:border-emerald-400/30',
      hoverGlow: 'group-hover:shadow-[0_26px_78px_rgba(16,185,129,0.42)]',
      hoverTint: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10',
      link: 'text-emerald-500',
    },
    'pdf-merge': {
      iconBg: 'from-rose-500 to-orange-400',
      hoverBorder: 'group-hover:border-rose-300/80 dark:group-hover:border-rose-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(244,63,94,0.36)]',
      hoverTint: 'group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10',
      link: 'text-rose-500',
    },
    'pdf-split': {
      iconBg: 'from-amber-500 to-orange-400',
      hoverBorder: 'group-hover:border-amber-300/80 dark:group-hover:border-amber-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(245,158,11,0.38)]',
      hoverTint: 'group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10',
      link: 'text-amber-500',
    },
    'video-convert': {
      iconBg: 'from-violet-500 to-purple-400',
      hoverBorder: 'group-hover:border-violet-300/80 dark:group-hover:border-violet-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(139,92,246,0.40)]',
      hoverTint: 'group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10',
      link: 'text-violet-500',
    },
    'video-compress': {
      iconBg: 'from-teal-500 to-emerald-400',
      hoverBorder: 'group-hover:border-teal-300/80 dark:group-hover:border-teal-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(20,184,166,0.38)]',
      hoverTint: 'group-hover:bg-teal-50 dark:group-hover:bg-teal-500/10',
      link: 'text-teal-500',
    },
    'video-to-gif': {
      iconBg: 'from-pink-500 to-rose-400',
      hoverBorder: 'group-hover:border-pink-300/80 dark:group-hover:border-pink-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(236,72,153,0.40)]',
      hoverTint: 'group-hover:bg-pink-50 dark:group-hover:bg-pink-500/10',
      link: 'text-pink-500',
    },
    'video-extract-audio': {
      iconBg: 'from-cyan-500 to-sky-400',
      hoverBorder: 'group-hover:border-cyan-300/80 dark:group-hover:border-cyan-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(6,182,212,0.38)]',
      hoverTint: 'group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10',
      link: 'text-cyan-500',
    },
    'audio-convert': {
      iconBg: 'from-emerald-500 to-lime-400',
      hoverBorder: 'group-hover:border-emerald-300/80 dark:group-hover:border-emerald-400/30',
      hoverGlow: 'group-hover:shadow-[0_24px_70px_rgba(16,185,129,0.38)]',
      hoverTint: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10',
      link: 'text-emerald-500',
    },
  };

  return map[slug] ?? {
    iconBg: 'from-velora-violet to-velora-cyan',
    hoverBorder: 'group-hover:border-velora-violet/40 dark:group-hover:border-velora-cyan/20',
    hoverGlow: 'group-hover:shadow-glow',
    hoverTint: 'group-hover:bg-white/90 dark:group-hover:bg-white/5',
    link: 'text-velora-violet',
  };
}
