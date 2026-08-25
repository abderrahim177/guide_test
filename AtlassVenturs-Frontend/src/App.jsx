import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import GuideSection from './components/GuideSection'
import GuideProfilePage from './components/GuideProfileModal'
import Footer from './components/footer'
import LoginPage from './Auth/login'
import RegisterPage from './Auth/register'

// Guide Dashboard Single Page Component
import GuideDashboardLayout from './Guides/GuideDashboardLayout'

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
          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <>
                <section id="hero">
                  <HeroSection />
                </section>

                <section id="guides" className="scroll-mt-16">
                  <GuideSection />
                </section>
              </>
            } 
          />

          {/* Guide Public Profile */}
          <Route path="/guides/:id" element={<GuideProfilePage />} />

          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Guide Dashboard - Single Route */}
          <Route path="/guide" element={<GuideDashboardLayout />} />
        </Routes>
      </main>

      {!hideHeaderFooter && (
        <footer id="footer" className="scroll-mt-16">
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;