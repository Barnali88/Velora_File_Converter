import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { HomePage } from '@/pages/home';
import { ToolsPage } from '@/pages/tools';
import { ToolDetailPage } from '@/pages/tool-detail';
import { DashboardPage } from '@/pages/dashboard';
import { AboutPage } from '@/pages/about';
import { ContactPage } from '@/pages/contact';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:slug" element={<ToolDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
