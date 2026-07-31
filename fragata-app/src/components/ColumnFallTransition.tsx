import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ColumnFallTransitionProps {
  triggerRef: React.RefObject<HTMLDivElement | null>
}

export function ColumnFallTransition({ triggerRef }: ColumnFallTransitionProps) {
  useEffect(() => {
    if (!triggerRef.current) return

    // Create columns container
    const columnsContainer = document.createElement('div')
    columnsContainer.className = 'absolute inset-0 flex'
    columnsContainer.style.cssText = 'position: absolute; inset: 0; display: flex;'

    for (let i = 0; i < 12; i++) {
      const col = document.createElement('div')
      col.className = 'fall-column flex-1 min-w-0 h-full'
      col.style.cssText = `
        background: linear-gradient(to bottom, #030712 0%, #1d4ed8 50%, #3b82f6 100%);
        transform: translateY(-100%);
        border-right: 1px solid rgba(30, 58, 138, 0.1);
      `
      columnsContainer.appendChild(col)
    }

    // Create background element
    const bg = document.createElement('div')
    bg.className = 'fall-bg absolute inset-0 bg-[#020617] opacity-0'
    bg.style.cssText = 'position: absolute; inset: 0; background: #020617; opacity: 0; z-index: -1;'

    // Create container to hold everything
    const container = document.createElement('div')
    container.className = 'fixed inset-0 z-[60] pointer-events-none overflow-hidden bg-[#020617]'
    container.style.opacity = '0'
    container.appendChild(bg)
    container.appendChild(columnsContainer)
    document.body.appendChild(container)

    // Animate columns falling
    const columns = columnsContainer.querySelectorAll('.fall-column')

    const tlAnim = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          gsap.set(bg, { opacity: 1 })
        },
      },
    })

    gsap.set(columns, { y: '-100%' })

    tlAnim.to(Array.from(columns), {
      y: '100vh',
      duration: 1.2,
      ease: 'power3.in',
      stagger: {
        each: 0.06,
        from: 'start',
      },
    })

    // Fade out columns after they fall
    tlAnim.to(Array.from(columns), {
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
    }, '+=0.1')

    // Keep black background
    tlAnim.set(bg, { opacity: 1 })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === triggerRef.current) {
          st.kill()
        }
      })
      container.remove()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden bg-[#020617]" style={{ opacity: 0 }}>
      <div className="fall-bg absolute inset-0 bg-[#020617] opacity-0" />
      <div className="fall-columns absolute inset-0 flex" />
    </div>
  )
}