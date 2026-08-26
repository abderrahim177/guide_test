import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HeroSection from './components/HeroSection';
import GuideSection from './components/GuideSection';
import GuideProfilePage from './components/GuideProfileModal';
import LoginPage from './Auth/login';
import RegisterPage from './Auth/register';

import ProtectedRoute from './components/ProtectedRoute';
import ClientLayout from './components/ClientLayout'; // <--- Import Layout الجديد

import GuideDashboardLayout from './Guides/GuideDashboardLayout';
import RequestsPage from './Guides/RequestsPage';
import ConfirmedBookings from './Guides/ConfirmedBookings';
import EquipmentRent from './Guides/EquipmentRent';
import GuideCalendar from './Guides/GuideCalendar';
import GuideSettings from './Guides/GuideSettings';

function App() {
  return (
    <Routes>
      {/* 1. Auth Routes (بلا Navbar / Footer) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute allowedRoles={[3]} />}>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<><HeroSection /><GuideSection /></>} />
          <Route path="/guides/:id" element={<GuideProfilePage />} />
        </Route>
      </Route>

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

      {/* 4. Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;