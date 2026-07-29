export function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <div className="font-headline text-headline-md tracking-tighter text-primary font-bold">
          FRAGATA
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-between items-center px-8 font-label text-label-md">
          <div className="flex gap-md">
            <a className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 px-4 py-2 rounded-lg active:scale-95 transition-transform" href="#">
              Serviços
            </a>
            <a className="text-primary font-bold border-b-2 border-primary pb-1 px-4 py-2 hover:bg-primary-container/20 rounded-t-lg active:scale-95 transition-transform" href="#">
              Soluções
            </a>
          </div>
          <div className="w-32" />
          <div className="flex gap-md">
            <a className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 px-4 py-2 rounded-lg active:scale-95 transition-transform" href="#">
              Sobre Nós
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 px-4 py-2 rounded-lg active:scale-95 transition-transform" href="#">
              Portfólio
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <button className="primary-glow-button bg-primary-container text-white font-label text-label-md px-6 py-2 rounded-lg font-semibold active:scale-95 transition-transform hidden md:block">
          Contato
        </button>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
