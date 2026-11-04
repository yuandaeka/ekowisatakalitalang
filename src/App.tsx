import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/admin/Toast';
import { SmoothScrollWrapper } from './components/layout/SmoothScrollWrapper';

// Public Layout & Pages
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/public/HomePage';
import { TrailsPage } from './pages/public/TrailsPage';
import { TrailDetailPage } from './pages/public/TrailDetailPage';
import { EventsPage } from './pages/public/EventsPage';
import { EventDetailPage } from './pages/public/EventDetailPage';
import { AboutGalleryPage } from './pages/public/AboutGalleryPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminTrailsPage } from './pages/admin/AdminTrailsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastProvider>
          <SmoothScrollWrapper>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/trails" element={<TrailsPage />} />
                <Route path="/trails/:slug" element={<TrailDetailPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:slug" element={<EventDetailPage />} />
                <Route path="/about" element={<AboutGalleryPage />} />
              </Route>

              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin CMS Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="trails" element={<AdminTrailsPage />} />
                <Route path="gallery" element={<AdminGalleryPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SmoothScrollWrapper>
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;

