import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const totalScroll = 3
const phraseDuration = 1 / totalScroll

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      const textEl = container.querySelector('.portfolio-text') as HTMLElement
      if (!textEl) return

      // --- Manual char split ---
      const text = 'PORTFÓLIO'
      textEl.innerHTML = text.split('').map((char, i) =>
        `<span class="char inline-block" style="--i:${i}">${char}</span>`
      ).join('')

      const chars = textEl.querySelectorAll('.char')
      const whiteRect = container.querySelector('.white-rect') as HTMLElement

      // --- Initial states ---
      gsap.set(chars, { yPercent: 100, opacity: 0 })
      gsap.set(whiteRect, { xPercent: 100 })

      // --- Timeline (pin + scrub) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScroll * 100}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Phase 1: Chars enter (yPercent 100 → 0, opacity 0 → 1)
      const phase1Start = 0
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: phraseDuration * 0.5,
        stagger: phraseDuration * 0.5 / (chars.length || 1) * 0.6,
        ease: 'power3.out',
      }, phase1Start)

      // Phase 2: Chars exit (yPercent 0 → -120, opacity 1 → 0)
      const phase2Start = phraseDuration
      tl.to(chars, {
        yPercent: -120,
        opacity: 0,
        duration: phraseDuration * 0.5,
        stagger: phraseDuration * 0.5 / (chars.length || 1) * 0.6,
        ease: 'power3.in',
      }, phase2Start)

      // Phase 3: White rectangle slides in from right (xPercent 100 → 0)
      const phase3Start = phraseDuration * 2
      tl.to(whiteRect, {
        xPercent: 0,
        duration: phraseDuration * 0.8,
        ease: 'power3.inOut',
      }, phase3Start)
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      id="portfolio"
      className="relative z-[65] w-full bg-black"
    >
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Texto PORTFÓLIO */}
        <h1
          className="absolute font-syne font-extrabold text-white tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 8vw, 7rem)' }}
        >
          <span className="portfolio-text inline-block overflow-hidden">
            PORTFÓLIO
          </span>
        </h1>

        {/* Retângulo branco — container para conteúdo futuro */}
        <div className="white-rect absolute bg-white w-full" style={{ height: '60%' }} />
      </section>
    </div>
  )
}
