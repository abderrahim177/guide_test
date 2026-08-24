import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import GuideSection from './components/GuideSection'
import GuideProfilePage from './components/GuideProfileModal'
import Footer from './components/footer'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <Routes>
        {/* الصفحة الرئيسية */}
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

        {/* صفحة البروفايل المستقلة */}
        <Route path="/guides/:id" element={<GuideProfilePage />} />
      </Routes>

      <footer id="footer" className="scroll-mt-16">
        <Footer />
      </footer>
    </div>
  )
}

export default App