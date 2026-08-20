import type { PropsWithChildren } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-velora-light text-velora-ink transition-colors dark:bg-velora-dark dark:text-white">
      <div className="absolute inset-0 -z-10 bg-velora-light dark:bg-velora-dark" />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
