import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const navItems = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Sobre Nós', href: '#sobre' },
]

export function Header() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLButtonElement>(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      const sections = ['home', 'servicos', 'solucoes', 'sobre', 'portfolio']

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          // Use pin-spacer parent for GSAP-pinned sections
          const pinSpacer = element.closest('.pin-spacer')
          const target = (pinSpacer || element) as HTMLElement
          if (scrollPosition >= target.offsetTop && scrollPosition < target.offsetTop + target.offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, { opacity: 0, y: -30 })
      gsap.set(navLinksRef.current, { opacity: 0, y: -30 })
      gsap.set(ctaRef.current, { opacity: 0, y: -30 })
      gsap.set(mobileMenuRef.current, { opacity: 0, y: -30 })

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

  const isActive = (href: string) => {
    const sectionId = href.replace('#', '')
    return activeSection === sectionId
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const sectionId = href.replace('#', '')

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.getElementById(sectionId)
    if (!element) return

    // GSAP pin spacers hold the correct offsetTop
    const pinSpacer = element.closest('.pin-spacer')
    const target = (pinSpacer || element) as HTMLElement

    // Small offset to enter the scrub so the first text is visible
    const offset = window.innerHeight * 0.6

    window.scrollTo({
      top: target.offsetTop + offset,
      behavior: 'smooth',
    })
  }

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-[70]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-headline text-headline-md tracking-tighter text-primary font-bold hover:opacity-80 transition-opacity opacity-0"
        >
          FRAGATA
        </a>

        {/* Desktop Navigation */}
        <div
          ref={navLinksRef}
          className="hidden md:flex grow justify-between items-center px-8 font-label text-label-md opacity-0"
        >
          <div className="flex gap-md">
            {navItems.slice(0, 2).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`
                  px-4 py-2 rounded-lg active:scale-95 transition-all
                  ${isActive(item.href)
                    ? 'text-primary font-bold border-b-2 border-primary rounded-t-lg'
                    : 'text-on-surface hover:text-primary hover:bg-primary-container/20'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="w-32" />
          <div className="flex gap-md">
            {navItems.slice(2).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`
                  px-4 py-2 rounded-lg active:scale-95 transition-all
                  ${isActive(item.href)
                    ? 'text-primary font-bold border-b-2 border-primary rounded-t-lg'
                    : 'text-on-surface hover:text-primary hover:bg-primary-container/20'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="cursor-pointer primary-glow-button bg-primary-container text-white font-label text-label-md px-6 py-2 rounded-lg font-semibold active:scale-95 transition-transform hidden md:block opacity-0"
        >
          Contato
        </button>

        {/* Mobile Menu Icon*/}

        <button ref={mobileMenuRef} className="md:hidden cursor-pointer primary-glow-button bg-primary-container text-white font-label text-label-md px-6 py-2 rounded-lg font-semibold active:scale-95 transition-transform opacity-0">
          Contato
        </button>

      </div>
    </nav>
  )
}
