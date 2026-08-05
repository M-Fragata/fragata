import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ColumnGlowBg } from '../components/ColumnGlowBg'
import { ColumnFallTransition } from '../components/ColumnFallTransition'
import type { ColumnFallTransitionRef } from '../components/ColumnFallTransition'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const phrases = [
  ['Serviços'],
  ['Sistemas Web', 'de Alta', 'Performance.'],
  ['Interfaces', 'Fluidas &', 'Responsivas.'],
  ['Arquiteturas', 'Escaláveis', 'em Nuvem.'],
]

export function ServicesSection() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fallTransitionRef = useRef<ColumnFallTransitionRef>(null)
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phrasesEls = phraseRefs.current.filter(Boolean) as HTMLDivElement[]
      //const totalPhrases = phrasesEls.length
      const charsElements: HTMLElement[][] = []

      // --- Manual char split: select all .char elements within each phrase ---
      phrasesEls.forEach((phrase) => {
        const chars = Array.from(phrase.querySelectorAll('.char')) as HTMLElement[]
        charsElements.push(chars)
      })

      // --- Glow initial state: narrow, centered, invisible ---
      gsap.set(glowRef.current, {
        opacity: 0,
        width: '10vw',
        left: '50%',
        xPercent: -50,
      })

      // --- Set initial state: phrases invisible, chars below ---
      gsap.set(phrasesEls, { opacity: 0 })
      charsElements.forEach((chars) => {
        gsap.set(chars, { yPercent: 120, opacity: 0 })
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
        onComplete: () => {
          gsap.to(window, {
            scrollTo: { y: '+=' + window.innerHeight * 1.3, autoKill: false },
            duration: 1,
            ease: 'power2.inOut',
          })
        },
      })

      // --- Kinetic typography: pin + scrub on container ---
      // 4 fases: Serviços + 3 frases restantes
      const totalScroll = 4

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll * 100}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
        onComplete: () => {
          const fallTransition = fallTransitionRef.current
          if (fallTransition) {
            const { container, columns } = fallTransition

            // Show container
            gsap.set(container, { opacity: 1 })

            // Set columns above viewport
            gsap.set(columns, { yPercent: -100, opacity: 1 })

            // Columns fall with auto-complete
            gsap.to(columns, {
              yPercent: 0,
              duration: 1,
              stagger: {
                each: 1 / 12 * 0.8,
                from: 'start',
              },
              ease: 'power3.in',
              onComplete: () => {
                // Fade out glow
                gsap.to(glowRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                    // Auto-scroll to PortfolioSection
                    gsap.to(window, {
                      scrollTo: { y: '+=' + window.innerHeight * 1.5, autoKill: false },
                      duration: 1,
                      ease: 'power2.inOut',
                    })
                  },
                })
              },
            })
          }
        },
      })

      const phraseDuration = 1 / totalScroll

      phrasesEls.forEach((phrase, i) => {
        const chars = charsElements[i]
        const enterAt = phraseDuration * i
        const inDur = phraseDuration * 0.25
        const outDur = phraseDuration * 0.25

        // Phrase container becomes visible
        tl.to(phrase, {
          opacity: 1,
          duration: inDur * 0.1,
        }, enterAt)

        // Chars rise up with stagger
        tl.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: inDur,
          stagger: inDur / (chars.length || 1) * 0.6,
          ease: 'power3.out',
        }, enterAt)

        // Todas as frases saem (incluindo a última)
        // Chars exit with stagger — starts at 0.55 to complete before next phase
        tl.to(chars, {
          yPercent: -120,
          opacity: 0,
          duration: outDur,
          stagger: outDur / (chars.length || 1) * 0.6,
          ease: 'power3.in',
        }, enterAt + phraseDuration * 0.55)

        // Phrase container fades after chars complete
        tl.to(phrase, {
          opacity: 0,
          duration: outDur * 0.1,
        }, enterAt + phraseDuration * 0.85)
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
              className="absolute inset-0 flex items-center justify-center px-8 opacity-0 overflow-hidden"
            >
              <h2
                className="font-syne font-extrabold text-white text-left tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 8vw, 7rem)' }}
              >
                {phrase.map((line, li) => (
                  <span key={li} className="block whitespace-nowrap overflow-hidden">
                    {line.split('').map((char, ci) => (
                      <span key={ci} className="char inline-block">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </section>
      </div>

      {/* Column Fall Transition - fixed to viewport, stays after pin */}
      <ColumnFallTransition ref={fallTransitionRef} />
    </>
  )
}