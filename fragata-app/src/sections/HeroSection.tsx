export function HeroSection() {
  return (
    <main className="relative z-10 flex flex-col justify-center px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen items-start">
      <div className="w-full md:w-[45%] text-center md:text-left">
        <div className="mb-10 flex flex-col items-center md:items-start">
          <h1 className="text-7xl md:text-9xl font-bold text-primary tracking-tighter leading-none font-headline">
            FRAGATA
          </h1>
          <div className="w-full flex justify-between text-white font-semibold tracking-widest uppercase text-xl mt-2 font-label">
            <span>S</span><span>O</span><span>L</span><span>U</span><span>Ç</span><span>Õ</span><span>E</span><span>S</span>
            <span className="mx-2" />
            <span>D</span><span>I</span><span>G</span><span>I</span><span>T</span><span>A</span><span>I</span><span>S</span>
          </div>
        </div>

        <p className="font-body text-body-lg text-secondary-fixed-dim/90 mb-10 max-w-2xl mx-auto md:mx-0">
          Desenvolvimento de software sob medida, arquitetura de sistemas escaláveis e infraestrutura robusta para acelerar o seu negócio.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
          <button className="primary-glow-button bg-primary-container text-white font-label text-label-md px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group">
            Solicitar Orçamento
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button className="glass-outline-button text-secondary font-label text-label-md px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
            Conhecer Soluções
          </button>
        </div>
      </div>
    </main>
  )
}
