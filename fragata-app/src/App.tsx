import { useState } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './sections/HeroSection'
import { ServicesSection } from './sections/ServicesSection'
import { PortfolioSection } from './sections/PortfolioSection'
import { Preloader } from './components/Preloader'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && (
        <Preloader
          onComplete={handlePreloaderComplete}
          minDuration={3000}
        />
      )}

      <div className="min-h-screen bg-background text-on-surface font-body relative">
        {/* Video Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </div>

        {!isLoading && <Header />}
        {!isLoading && <HeroSection />}
      </div>

      {!isLoading && <ServicesSection />}
      {!isLoading && <PortfolioSection />}
    </>
  )
}

export default App
