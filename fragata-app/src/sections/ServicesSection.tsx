import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - 100vw width but scaled to 0 (invisible)
      gsap.set(lineRef.current, {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: '50%',
        xPercent: -50,
        scaleX: 0,
        opacity: 0,
      })

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.5,
        },
      })

      // Phase 1: Fade in
      tl.to(lineRef.current, {
        opacity: 1,
        duration: 0.05,
      })

      // Phase 2: Expand to full width using scaleX
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      {/* Expanding line - fixed in viewport, expands on scroll */}
      <div
        ref={lineRef}
        className="fixed z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #04090E 0%, #071423 100%)',
        }}
      />
    </section>
  )
}
