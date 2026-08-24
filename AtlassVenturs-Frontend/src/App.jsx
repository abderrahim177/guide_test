import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import GuideSection from './components/GuideSection'
import GuideProfilePage from './components/GuideProfileModal'
import Footer from './components/footer'
import LoginPage from './Auth/login'
import RegisterPage from './Auth/register'

function App() {
  const location = useLocation();

  // تحديد المسارات التي يُخفى فيها الهيدر والفوتر
  const hideHeaderFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      {/* إظهار Navbar فقط إذا لم تكن في صفحات Auth */}
      {!hideHeaderFooter && <Navbar />}

      <main className="grow">
        <Routes>
          {/* الرئيسية */}
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

          {/* صفحة المرشد */}
          <Route path="/guides/:id" element={<GuideProfilePage />} />

          {/* مصادقة المستخدم */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {/* إظهار Footer فقط إذا لم تكن في صفحات Auth */}
      {!hideHeaderFooter && (
        <footer id="footer" className="scroll-mt-16">
          <Footer />
        </footer>
      )}
    </div>
  )
}

export default App;