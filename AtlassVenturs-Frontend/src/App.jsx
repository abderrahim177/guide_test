import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GuideSection from './components/GuideSection';
import GuideProfilePage from './components/GuideProfileModal';
import Footer from './components/footer';
import LoginPage from './Auth/login';
import RegisterPage from './Auth/register';

// ProtectedRoute Component Import
import ProtectedRoute from './components/ProtectedRoute';

// Dashboard Imports (خاصين بالـ Guide)
import GuideDashboardLayout from './Guides/GuideDashboardLayout';
import RequestsPage from './Guides/RequestsPage';
import ConfirmedBookings from './Guides/ConfirmedBookings';
import EquipmentRent from './Guides/EquipmentRent';
import GuideCalendar from './Guides/GuideCalendar';
import GuideSettings from './Guides/GuideSettings';

function App() {
  const location = useLocation();

  const hideHeaderFooter = 
    ['/login', '/register'].includes(location.pathname) || 
    location.pathname.startsWith('/guide');

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      {!hideHeaderFooter && <Navbar />}

      <main className="grow">
        <Routes>
          
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* 1. Routes خاصة فقط بالـ Visitor (role_id = 3) */}
          <Route element={<ProtectedRoute allowedRoles={[3]} />}>
            <Route path="/" element={<><HeroSection /><GuideSection /></>} />
            <Route path="/guides/:id" element={<GuideProfilePage />} />
          </Route>

          {/* 2. Routes خاصة فقط بالـ Guide (role_id = 2) */}
          <Route element={<ProtectedRoute allowedRoles={[2]} />}>
            <Route path="/guide" element={<GuideDashboardLayout />}>
              <Route index element={<Navigate to="/guide/requests" replace />} />
              <Route path="requests" element={<RequestsPage />} />
              <Route path="confirmed" element={<ConfirmedBookings />} />
              <Route path="equipment" element={<EquipmentRent />} />
              <Route path="calendar" element={<GuideCalendar />} />
              <Route path="settings" element={<GuideSettings />} />
            </Route>
          </Route>

          {/* 3. Catch-all Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;