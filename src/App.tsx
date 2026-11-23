import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DesktopDeviceFrame } from './components/layout/DesktopDeviceFrame';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CampsPage } from './pages/CampsPage';
import { PartiesPage } from './pages/PartiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { AiGrowthHubPage } from './pages/AiGrowthHubPage';
import { MorePage } from './pages/MorePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const location = useLocation();

  // Bi-directional Route & History Synchronization:
  // As the user navigates inside the iframe, reflect the route in the outer browser's address bar
  useEffect(() => {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      try {
        const fullPath = location.pathname + location.search + location.hash;
        if (window.top && (window.top.location.pathname + window.top.location.search + window.top.location.hash) !== fullPath) {
          window.top.history.replaceState(null, '', fullPath);
        }
      } catch {
        // Cross-origin safety
      }
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <DesktopDeviceFrame>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="programs" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="programs/:slug" element={<ServiceDetailPage />} />
          <Route path="camps" element={<CampsPage />} />
          <Route path="parties" element={<PartiesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="ai-hub" element={<AiGrowthHubPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </DesktopDeviceFrame>
  );
}

export default App;
