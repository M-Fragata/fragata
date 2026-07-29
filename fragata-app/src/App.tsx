import { Header } from './components/Header'
import { HeroSection } from './sections/HeroSection'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body relative overflow-x-hidden">
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
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <Header />
      <HeroSection />
    </div>
  )
}

export default App
