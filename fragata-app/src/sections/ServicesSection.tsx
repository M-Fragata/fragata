import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ColumnGlowBg } from '../components/ColumnGlowBg'

gsap.registerPlugin(ScrollTrigger)

const phrases = [
  'Sistemas Web de Alta Performance.',
  'Interfaces Fluidas & Responsivas.',
  'Arquiteturas Escaláveis em Nuvem.',
]

export function ServicesSection() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phrasesEls = phraseRefs.current.filter(Boolean) as HTMLDivElement[]
      const totalPhrases = phrasesEls.length

      // --- Glow initial state: narrow, centered, invisible ---
      gsap.set(glowRef.current, {
        opacity: 0,
        width: '10vw',
        left: '50%',
        xPercent: -50,
      })

      gsap.set(phrasesEls, {
        opacity: 0,
        y: 60,
        scale: 0.9,
      })

      // --- Glow transition: triggers on spacer, auto-completes (no pin, no scrub) ---
      gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }).to(glowRef.current, {
        opacity: 1,
        width: '100vw',
        duration: 0.8,
        ease: 'power2.inOut',
      })

      // --- Kinetic typography: pin + scrub on container (separate from glow) ---
      const totalScroll = totalPhrases

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll * 100}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      })

      const phraseDuration = 1 / totalPhrases

      phrasesEls.forEach((phrase, i) => {
        const enterAt = phraseDuration * i
        const inDur = phraseDuration * 0.2
        const outDur = phraseDuration * 0.2

        tl.to(phrase, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: inDur,
          ease: 'power2.out',
        }, enterAt)

        if (i < totalPhrases - 1) {
          tl.to(phrase, {
            opacity: 0,
            y: -60,
            scale: 0.95,
            duration: outDur,
            ease: 'power2.in',
          }, enterAt + phraseDuration * 0.75)
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Glow overlay: OUTSIDE the pinned container, fixed to viewport */}
      <div
        ref={glowRef}
        className="fixed top-0 h-screen z-30 pointer-events-none overflow-hidden"
        style={{ opacity: 0, width: '10vw' }}
      >
        <ColumnGlowBg />
      </div>

      {/* Spacer: creates scroll distance so glow triggers before pin */}
      <div ref={spacerRef} className="h-[30vh] w-full" />

      {/* Pinned container for kinetic typography */}
      <div ref={containerRef} className="relative z-40">
        <section id="servicos" className="relative h-screen w-full z-50">
          {phrases.map((phrase, i) => (
            <div
              key={i}
              ref={(el) => { phraseRefs.current[i] = el }}
              className="absolute inset-0 flex items-center justify-center px-8 opacity-0"
            >
              <h2
                className="font-syne text-5xl md:text-7xl lg:text-8xl font-extrabold text-white text-center tracking-tight max-w-5xl"
                style={{ textShadow: '0 0 40px rgba(0,0,0,0.6)' }}
              >
                {phrase}
              </h2>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
