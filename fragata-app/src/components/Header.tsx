import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Header() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states - hidden above
      gsap.set(logoRef.current, { opacity: 0, y: -30 })
      gsap.set(navLinksRef.current, { opacity: 0, y: -30 })
      gsap.set(ctaRef.current, { opacity: 0, y: -30 })
      gsap.set(mobileMenuRef.current, { opacity: 0, y: -30 })

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      tl.to(
        navLinksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      tl.to(
        mobileMenuRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <div
          ref={logoRef}
          className="font-headline text-headline-md tracking-tighter text-primary font-bold"
        >
          FRAGATA
        </div>

        {/* Desktop Navigation */}
        <div
          ref={navLinksRef}
          className="hidden md:flex flex-grow justify-between items-center px-8 font-label text-label-md"
        >
          <div className="flex gap-md">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 px-4 py-2 rounded-lg active:scale-95 transition-transform"
              href="#"
            >
              Serviços
            </a>
            <a
              className="text-primary font-bold border-b-2 border-primary pb-1 px-4 py-2 hover:bg-primary-container/20 rounded-t-lg active:scale-95 transition-transform"
              href="#"
            >
              Soluções
            </a>
          </div>
          <div className="w-32" />
          <div className="flex gap-md">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 px-4 py-2 rounded-lg active:scale-95 transition-transform"
              href="#"
            >
              Sobre Nós
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors hover:bg-primary-container/20 px-4 py-2 rounded-lg active:scale-95 transition-transform"
              href="#"
            >
              Portfólio
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="primary-glow-button bg-primary-container text-white font-label text-label-md px-6 py-2 rounded-lg font-semibold active:scale-95 transition-transform hidden md:block"
        >
          Contato
        </button>

        {/* Mobile Menu Icon */}
        <button ref={mobileMenuRef} className="md:hidden text-primary">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}
