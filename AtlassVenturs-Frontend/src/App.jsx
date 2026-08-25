import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GuideSection from './components/GuideSection';
import GuideProfilePage from './components/GuideProfileModal';
import Footer from './components/footer';
import LoginPage from './Auth/login';
import RegisterPage from './Auth/register';

// Dashboard Imports
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
          {/* Public Routes */}
          <Route path="/" element={<><HeroSection /><GuideSection /></>} />
          <Route path="/guides/:id" element={<GuideProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Guide Dashboard (Nested Routes) */}
          <Route path="/guide" element={<GuideDashboardLayout />}>
            {/* التوجيه التلقائي فاش يدخل لـ /guide يمشي لـ requests */}
            <Route index element={<Navigate to="/guide/requests" replace />} />
            
            <Route path="requests" element={<RequestsPage />} />
            <Route path="confirmed" element={<ConfirmedBookings />} />
            <Route path="equipment" element={<EquipmentRent />} />
            <Route path="calendar" element={<GuideCalendar />} />
            <Route path="settings" element={<GuideSettings />} />
          </Route>
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;