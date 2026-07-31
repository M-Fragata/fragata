import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      const textEl = container.querySelector('.portfolio-text') as HTMLElement
      if (!textEl) return

      const text = 'PORTFÓLIO'
      textEl.innerHTML = text.split('').map((char, i) =>
        `<span class="char inline-block" style="--i:${i}">${char}</span>`
      ).join('')

      const chars = textEl.querySelectorAll('.char')

      gsap.set(chars, { opacity: 0 })

      gsap.to(chars, {
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      id="portfolio"
      className="relative z-[65] min-h-screen w-full flex items-center justify-center px-8 bg-black"
    >
      <h1 className="font-syne font-extrabold text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 10vw, 8rem)' }}>
        <span className="portfolio-text inline-block overflow-hidden">
          PORTFÓLIO
        </span>
      </h1>
    </div>
  )
}
