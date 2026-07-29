import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Start with scale approach - simpler and guaranteed centered
      gsap.set(squareRef.current, {
        width: 1,
        height: 1,
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        borderRadius: 4,
        opacity: 0,
        scale: 1,
      })

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1.5,
        },
      })

      // Phase 1: Fade in
      tl.to(squareRef.current, {
        opacity: 1,
        duration: 0.05,
      })

      // Phase 2: Scale up to cover full viewport
      // Using scale avoids width/height calculation issues
      tl.to(squareRef.current, {
        scale: 2000,
        borderRadius: 0,
        duration: 1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      {/* Expanding square - fixed in viewport, grows on scroll */}
      <div
        ref={squareRef}
        className="fixed z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #04090E 0%, #071423 100%)',
        }}
      />
    </section>
  )
}
